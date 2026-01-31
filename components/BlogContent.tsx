"use client";

import React, { useEffect, useRef } from "react";
import hljs from "highlight.js";

interface Props {
  html: string;
}

export default function BlogContent({ html }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    // Highlight any code blocks that exist
    root.querySelectorAll("pre code").forEach((block) => {
      try {
        hljs.highlightElement(block as HTMLElement);
      } catch (e) {
        // no-op
      }
    });

    // Remove leading/trailing whitespace-only text nodes inside paragraphs
    root.querySelectorAll("p").forEach((p) => {
      const text = p.textContent || "";
      p.textContent = text.replace(/^\s+|\s+$/g, " ").replace(/\s{2,}/g, " ");
    });
  }, [html]);

  return <div ref={ref} className="prose max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: html }} />;
}
