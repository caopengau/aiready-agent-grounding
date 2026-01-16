import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

type Event = {
  requestContext?: { http?: { method?: string } };
  headers?: Record<string, string>;
  body?: string;
};

const bucket = process.env.SUBMISSIONS_BUCKET!;
const s3 = new S3Client({});
const sesToEmail = process.env.SES_TO_EMAIL || "";
const ses = new SESClient({});

export async function handler(event: Event) {
  const method = event.requestContext?.http?.method || "POST";

  // Handle CORS preflight
  if (method === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: ""
    };
  }

  try {
    if (!bucket) throw new Error("Bucket not configured");
    if (!event.body) throw new Error("Missing body");

    const data = JSON.parse(event.body);
    const email: string = (data.email || "").trim();
    const repoUrl: string = (data.repoUrl || "").trim();
    const notes: string = (data.notes || "").trim();

    // Basic validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json(400, { error: "Invalid email" });
    }
    if (!/^https:\/\/github.com\/.+\/.+/.test(repoUrl)) {
      return json(400, { error: "Invalid GitHub repo URL" });
    }

    const now = new Date();
    const id = `${now.toISOString()}_${Math.random().toString(36).slice(2,8)}`;
    const key = `submissions/${id}.json`;

    const payload = {
      email,
      repoUrl,
      notes,
      receivedAt: now.toISOString(),
      ip: extractIp(event.headers),
      userAgent: event.headers?.["user-agent"] || event.headers?.["User-Agent"] || "",
    };

    await s3.send(new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: Buffer.from(JSON.stringify(payload, null, 2)),
      ContentType: "application/json"
    }));

    // Optional: notify Slack
    if (slackWebhook) {
      try {
        await fetch(slackWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: `New AIReady report request\nEmail: ${email}\nRepo: ${repoUrl}`
          })
        });
      } catch {}
    }

    // Optional: notify via SES email (to founder)
    if (sesToEmail) {
      try {
        await ses.send(new SendEmailCommand({
          Destination: { ToAddresses: [sesToEmail] },
          Message: {
            Subject: { Data: "New AIReady Report Request" },
            Body: {
              Text: { Data: `Email: ${email}\nRepo: ${repoUrl}\nNotes: ${notes}\n\nS3 Key: ${key}` }
            }
          },
          Source: sesToEmail,
        }));
      } catch {}
    }

    return json(200, { ok: true });
  } catch (err: any) {
    console.error("request-report error", err);
    return json(500, { error: err?.message || "Internal error" });
  }
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
}

function json(statusCode: number, body: any) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json", ...corsHeaders() },
    body: JSON.stringify(body)
  };
}

function extractIp(headers?: Record<string, string>) {
  const h = headers || {};
  return (
    h["x-forwarded-for"] ||
    h["X-Forwarded-For"] ||
    h["x-real-ip"] ||
    h["X-Real-IP"] ||
    ""
  );
}
