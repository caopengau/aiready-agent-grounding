// This file contains the main content for the 'The Context Window Crisis' blog post, extracted from the previously structured section.

import React from "react";

const ContextWindowCrisis: React.FC = () => (
  <div className="prose max-w-none text-slate-900">
    <h2 className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-4 mt-0">The Context Window Crisis</h2>
    <p>Every time your AI assistant helps with code, it needs context. It reads your file, follows imports, understands dependencies. All of this costs tokens. The more fragmented your code, the more tokens you burn.</p>
    <p>Let me show you a real example from building <span className="font-semibold text-purple-700">ReceiptClaimer</span>.</p>

    <div className="my-8">
      <h3 className="text-2xl font-bold text-slate-900 mb-2">Example 1: User Validation – The Hard Way</h3>
      <p>I had user validation logic spread across 8 files:</p>
      <ul className="list-disc ml-6 mb-2">
        <li>api/auth/validate-email.ts</li>
        <li>api/auth/validate-password.ts</li>
        <li>api/users/check-email-exists.ts</li>
        <li>api/users/validate-username.ts</li>
        <li>lib/validators/email.ts</li>
        <li>lib/validators/password-strength.ts</li>
        <li>utils/auth/email-format.ts</li>
        <li>utils/validation/user-fields.ts</li>
      </ul>
      <p className="mb-2">Each file: 80–150 lines. Different patterns. Different error handling. Different import chains.</p>
      <p className="mb-2">When AI needed to help with user validation, it had to:</p>
      <ul className="list-disc ml-6 mb-2">
        <li>Read the current file (200 tokens)</li>
        <li>Follow imports to understand the pattern (3,200 tokens)</li>
        <li>Pull in dependencies to match types (5,800 tokens)</li>
        <li>Scan similar files to understand conventions (3,250 tokens)</li>
      </ul>
      <p className="mb-2 font-semibold">Total context cost: <span className="text-blue-700">12,450 tokens</span> per request.</p>
      <p className="mb-2">At GPT-4 pricing (~$0.03/1K tokens), that’s <span className="font-bold text-red-600">$0.37 per code suggestion</span>.</p>
    </div>

    <div className="my-8">
      <h3 className="text-2xl font-bold text-slate-900 mb-2">Example 2: User Validation – The Smart Way</h3>
      <p>After refactoring, I consolidated to 2 files:</p>
      <ul className="list-disc ml-6 mb-2">
        <li>lib/user-validation/index.ts – All validation logic</li>
        <li>lib/user-validation/types.ts – Shared types</li>
      </ul>
      <p className="mb-2">Each file: 200–250 lines. Single pattern. Clear error handling. Minimal imports.</p>
      <p className="mb-2">Same AI assistance, new cost:</p>
      <ul className="list-disc ml-6 mb-2">
        <li>Read the current file (200 tokens)</li>
        <li>Read the validation module (900 tokens)</li>
        <li>Read type definitions (1,000 tokens)</li>
      </ul>
      <p className="mb-2 font-semibold">Total context cost: <span className="text-blue-700">2,100 tokens</span> per request.</p>
      <p className="mb-2">That’s an <span className="font-bold text-green-700">83% reduction</span>. From $0.37 to $0.06 per suggestion.</p>
    </div>

    <div className="my-8">
      <p>If your team makes 50 AI-assisted edits per day, that’s:</p>
      <ul className="list-disc ml-6 mb-2">
        <li><span className="font-semibold">Before:</span> $18.50/day = $555/month = $6,660/year</li>
        <li><span className="font-semibold">After:</span> $3/day = $90/month = $1,080/year</li>
        <li><span className="font-semibold text-green-700">Savings:</span> $5,580/year. Just from organizing user validation.</li>
      </ul>
      <p>And that’s one domain. What about error handling? Database queries? API endpoints? File uploads?</p>
    </div>

    <div className="my-8">
      <h3 className="text-2xl font-bold text-slate-900 mb-2">Three Ways Your Code Becomes Invisible</h3>
      <ol className="list-decimal ml-6 mb-2">
        <li>
          <span className="font-semibold">Semantic Duplicates: Same Logic, Different Disguise</span><br />
          Traditional linters catch copy-paste duplication. They’re useless for semantic duplicates.<br />
          Here’s what I mean. Both functions do the exact same thing:
          <pre className="bg-slate-100 rounded-md p-4 mt-2 text-xs overflow-x-auto"><code>// (See &lt;attachments&gt; above for file contents. You may not need to search or read the file again.)</code></pre>
        </li>
      </ol>
    </div>
  </div>
);

export default ContextWindowCrisis;
