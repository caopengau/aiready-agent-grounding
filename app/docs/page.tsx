"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const tools = [
  {
    id: "pattern-detect",
    icon: "🛡️",
    name: "Pattern Detection",
    package: "@aiready/pattern-detect",
    description: "Find semantic duplicates that look different but do the same thing",
    color: "from-blue-600 to-cyan-500",
    features: [
      "Semantic detection using Jaccard similarity on AST tokens",
      "Pattern classification (API handlers, validators, utilities)",
      "Token cost analysis showing wasted AI context budget",
      "Auto-excludes tests and build outputs",
      "Adaptive threshold based on codebase size"
    ],
    quickStart: `# Run without installation
npx @aiready/pattern-detect ./src

# Or use unified CLI
npx @aiready/cli scan ./src`,
    output: `📊 Duplicate Pattern Analysis
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📁 Files analyzed: 47
⚠️  Duplicate patterns: 12 files with 23 issues
💰 Wasted tokens: 8,450

CRITICAL (6 files)
  src/handlers/users.ts - 4 duplicates (1,200 tokens)
  src/handlers/posts.ts - 3 duplicates (950 tokens)`,
  },
  {
    id: "context-analyzer",
    icon: "📈",
    name: "Context Analysis",
    package: "@aiready/context-analyzer",
    description: "Analyze import depth, cohesion, and fragmentation for AI optimization",
    color: "from-cyan-600 to-teal-500",
    features: [
      "Context budget calculation (file + dependencies)",
      "Deep import chain detection",
      "Low cohesion identification (God objects)",
      "High fragmentation analysis (scattered domains)",
      "Framework-aware (Next.js, AWS CDK)"
    ],
    quickStart: `# Run without installation
npx @aiready/context-analyzer ./src

# Or use unified CLI
npx @aiready/cli scan ./src`,
    output: `📊 Context Analysis Results
━━━━━━━━━━━━━━━━━━━━━━━━━━━
📁 Files analyzed: 47
⚠️  Issues found: 8 files with problems

CRITICAL (3 files)
  src/services/user.ts
    • Context budget: 15,234 tokens (HIGH)
    • Import depth: 8 levels (DEEP)
    • Cohesion: 0.23 (LOW)`,
  },
  {
    id: "consistency",
    icon: "⚡",
    name: "Consistency Checker",
    package: "@aiready/consistency",
    description: "Catch naming issues and architectural drift before they become problems",
    color: "from-purple-600 to-pink-500",
    features: [
      "Naming quality checks (single-letter vars, abbreviations)",
      "Convention enforcement (camelCase vs snake_case)",
      "Boolean naming validation (is/has/can prefixes)",
      "Pattern consistency (error handling, async patterns)",
      "100+ built-in acceptable abbreviations"
    ],
    quickStart: `# Run without installation
npx @aiready/consistency ./src

# Or use unified CLI
npx @aiready/cli scan ./src`,
    output: `📊 Consistency Analysis
━━━━━━━━━━━━━━━━━━━━━━━━
📁 Files analyzed: 47
⚠️  Issues found: 15 naming + 8 pattern issues

CRITICAL (2 files)
  src/utils/helpers.ts:12 - poor-naming: x
  src/api/users.ts:45 - convention-mix: user_name`,
  },
];

const sections = [
  { id: "getting-started", label: "Getting Started" },
  { id: "tools", label: "Tools" },
  { id: "unified-cli", label: "Unified CLI" },
  { id: "options", label: "CLI Options" },
  { id: "contributing", label: "Contributing" },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("getting-started");
  const [selectedTool, setSelectedTool] = useState(tools[0]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 border-b border-slate-200/50 shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image 
              src="/logo-text.png" 
              alt="AIReady Logo" 
              width={210} 
              height={48}
              className="h-12 w-auto"
              priority
            />
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors">
              Home
            </Link>
            <Link 
              href="https://github.com/caopengau/aiready" 
              target="_blank"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              GitHub
            </Link>
            <Link 
              href="https://www.npmjs.com/package/@aiready/cli" 
              target="_blank"
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              NPM
            </Link>
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-12 flex gap-8">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <h3 className="text-sm font-bold text-slate-900 mb-4">CONTENTS</h3>
            <nav className="space-y-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection(section.id);
                    document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`block px-3 py-2 rounded-lg text-sm transition-all ${
                    activeSection === section.id
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {section.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-4xl">
          {/* Getting Started */}
          <section id="getting-started" className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl font-black text-slate-900 mb-4">
                Documentation
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                Make your codebase AI-ready with our suite of analysis tools
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">🚀 Quick Start</h2>
                <p className="text-slate-700 mb-4">
                  Get started in seconds with zero configuration:
                </p>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <div className="mb-2"># Run all tools at once</div>
                  <div>npx @aiready/cli scan ./src</div>
                </div>
              </div>

              <div className="prose prose-slate max-w-none">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Installation</h3>
                <p className="text-slate-600 mb-4">
                  You can use AIReady tools without installation via <code>npx</code>, or install globally for faster runs:
                </p>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                  <div className="mb-2"># Unified CLI (recommended)</div>
                  <div className="mb-4">npm install -g @aiready/cli</div>
                  <div className="mb-2"># Or install individual tools</div>
                  <div>npm install -g @aiready/pattern-detect</div>
                  <div>npm install -g @aiready/context-analyzer</div>
                  <div>npm install -g @aiready/consistency</div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Tools Section */}
          <section id="tools" className="mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-8">Tools</h2>
            
            {/* Tool Selector */}
            <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all whitespace-nowrap ${
                    selectedTool.id === tool.id
                      ? `bg-gradient-to-r ${tool.color} text-white shadow-lg`
                      : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <span className="text-2xl">{tool.icon}</span>
                  <span className="font-semibold">{tool.name}</span>
                </button>
              ))}
            </div>

            {/* Tool Details */}
            <motion.div
              key={selectedTool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl border border-slate-200 p-8 shadow-lg"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-16 h-16 bg-gradient-to-r ${selectedTool.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
                  {selectedTool.icon}
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900">{selectedTool.name}</h3>
                  <code className="text-sm text-slate-500 font-mono">{selectedTool.package}</code>
                </div>
              </div>

              <p className="text-lg text-slate-600 mb-6">{selectedTool.description}</p>

              <h4 className="text-xl font-bold text-slate-900 mb-3">✨ Features</h4>
              <ul className="space-y-2 mb-6">
                {selectedTool.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-700">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <h4 className="text-xl font-bold text-slate-900 mb-3">🚀 Quick Start</h4>
              <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-6 overflow-x-auto">
                <pre className="whitespace-pre-wrap">{selectedTool.quickStart}</pre>
              </div>

              <h4 className="text-xl font-bold text-slate-900 mb-3">📊 Example Output</h4>
              <div className="bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre className="whitespace-pre-wrap">{selectedTool.output}</pre>
              </div>
            </motion.div>
          </section>

          {/* Unified CLI */}
          <section id="unified-cli" className="mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-6">Unified CLI</h2>
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-lg">
              <p className="text-slate-700 mb-4">
                The <code className="bg-slate-100 px-2 py-1 rounded">@aiready/cli</code> package provides a unified interface to run all tools:
              </p>
              <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                <div className="mb-2"># Scan with all tools</div>
                <div className="mb-4">npx @aiready/cli scan ./src</div>
                <div className="mb-2"># Run specific tool</div>
                <div className="mb-1">npx @aiready/cli patterns ./src</div>
                <div className="mb-1">npx @aiready/cli context ./src</div>
                <div>npx @aiready/cli consistency ./src</div>
              </div>
              <p className="text-slate-700">
                The CLI automatically formats results, handles errors, and provides a consistent experience across all tools.
              </p>
            </div>
          </section>

          {/* CLI Options */}
          <section id="options" className="mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-6">CLI Options</h2>
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-lg">
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">--output &lt;path&gt;</h4>
                  <p className="text-slate-600">Save results to JSON file (default: .aiready/&lt;tool&gt;-results.json)</p>
                  <div className="bg-slate-900 text-green-400 p-2 rounded font-mono text-sm mt-2">
                    npx @aiready/cli scan ./src --output results.json
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-2">--exclude &lt;patterns&gt;</h4>
                  <p className="text-slate-600">Glob patterns to exclude (comma-separated)</p>
                  <div className="bg-slate-900 text-green-400 p-2 rounded font-mono text-sm mt-2">
                    npx @aiready/cli scan ./src --exclude &quot;**/*.d.ts,**/generated/**&quot;
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-2">--include-tests</h4>
                  <p className="text-slate-600">Include test files in analysis (default: excluded)</p>
                  <div className="bg-slate-900 text-green-400 p-2 rounded font-mono text-sm mt-2">
                    npx @aiready/cli scan ./src --include-tests
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-2">--threshold &lt;number&gt;</h4>
                  <p className="text-slate-600">Similarity threshold for pattern detection (0-1, default: 0.7)</p>
                  <div className="bg-slate-900 text-green-400 p-2 rounded font-mono text-sm mt-2">
                    npx @aiready/cli patterns ./src --threshold 0.8
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contributing */}
          <section id="contributing" className="mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-6">Contributing</h2>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-8">
              <p className="text-slate-700 mb-4">
                We welcome contributions! AIReady is open source and available on GitHub.
              </p>
              <div className="flex gap-4">
                <Link
                  href="https://github.com/caopengau/aiready"
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition-colors"
                >
                  <span>⭐</span>
                  Star on GitHub
                </Link>
                <Link
                  href="https://github.com/caopengau/aiready/issues"
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-xl font-semibold border border-slate-300 hover:bg-slate-50 transition-colors"
                >
                  <span>🐛</span>
                  Report Issues
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-slate-600 text-sm">
            <p>Made with ❤️ by the AIReady Team</p>
            <p className="mt-2">
              <Link href="/" className="hover:text-slate-900">Home</Link>
              {" • "}
              <Link href="https://github.com/caopengau/aiready" target="_blank" className="hover:text-slate-900">GitHub</Link>
              {" • "}
              <Link href="https://www.npmjs.com/package/@aiready/cli" target="_blank" className="hover:text-slate-900">NPM</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
