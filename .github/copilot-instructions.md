# Copilot Instructions for AIReady

**Use doc-mapping.json for loading relevant context and practices.**

## Project Overview

AIReady is a monorepo containing tools for assessing AI-readiness and visualizing tech debt in codebases. The goal is to help teams prepare repositories for better AI adoption by detecting issues that confuse AI models and identifying tech debt.

**Mission:** As AI becomes deeply integrated into SDLC, codebases accumulate tech debt faster due to knowledge cutoff limitations, different model preferences, duplicated patterns AI doesn't recognize, and context fragmentation. AIReady helps teams assess, visualize, and prepare repositories for better AI adoption.

**Packages:**
- **[@aiready/pattern-detect](packages/pattern-detect)** - Semantic duplicate detection for AI-generated patterns
- **[@aiready/context-analyzer](packages/context-analyzer)** - Context window cost & dependency fragmentation analysis
- **[@aiready/doc-drift](packages/doc-drift)** - Documentation freshness vs code churn tracking (Coming Soon)
- **[@aiready/consistency](packages/consistency)** - Naming & pattern consistency scoring (Coming Soon)
- **[@aiready/cli](packages/cli)** - Unified CLI for all analysis tools (Coming Soon)
- **[@aiready/deps](packages/deps)** - Dependency health (wraps madge/depcheck)

**Quick Start:**
```bash
# Detect semantic duplicates
npx @aiready/pattern-detect ./src

# Analyze context costs
npx @aiready/context-analyzer ./src --output json
```

**SaaS Platform:** Free tools provide basic analysis. AIReady Pro offers historical trend analysis, team benchmarking, custom rule engines, integration APIs, and automated fix suggestions.

## Architecture: Hub-and-Spoke Pattern

We follow a **hub-and-spoke** architecture to keep the codebase organized and maintainable:

```
@aiready/core (HUB)
    ↓
    ├─→ @aiready/pattern-detect (SPOKE)
    ├─→ @aiready/context-analyzer (SPOKE)
    ├─→ @aiready/doc-drift (SPOKE)
    ├─→ @aiready/consistency (SPOKE)
    └─→ @aiready/cli (SPOKE - aggregator)
```

### Hub: `@aiready/core`

**Purpose:** Shared utilities, types, and common functionality

**Contains:**
- Type definitions (`types.ts`) - All shared interfaces
- File scanning utilities (`utils/file-scanner.ts`)
- AST parsing helpers (`utils/ast-parser.ts`)
- Metric calculations (`utils/metrics.ts`)
- Common algorithms (similarity, token estimation, etc.)

**Rules:**
- ✅ **DO** add shared types and utilities here
- ✅ **DO** keep functions pure and generic
- ❌ **DON'T** add tool-specific logic
- ❌ **DON'T** create dependencies on spoke packages

### Spokes: Individual Tools

**Purpose:** Specialized analysis tools that solve ONE specific problem

**Each spoke should:**
- Import from `@aiready/core` only (never from other spokes)
- Provide both programmatic API and CLI
- Have its own README with clear use case
- Be independently publishable to npm
- Focus on a single analysis type

## Development Workflow

**⚠️ IMPORTANT: Always use Makefile commands for DevOps operations**

We use a **Makefile-based workflow** for all development, building, testing, and publishing. This ensures consistency and proper monorepo management.

### 1. Installing Dependencies

```bash
make install
# or: pnpm install
```

### 2. Building All Packages

```bash
make build
# or: pnpm build
```

### 3. Development Mode (with watch)

```bash
make dev
# or: pnpm dev

# Or build specific package
pnpm --filter @aiready/pattern-detect dev
```

### 4. Testing

```bash
make test
# or: pnpm test
```

### 5. Daily Workflow (RECOMMENDED)

```bash
# After making changes
git add .
git commit -m "feat: your changes"
make push  # ← Syncs monorepo + ALL spoke repos automatically
```

**💡 What `make push` does:**
- Pushes monorepo to GitHub ✅
- Syncs ALL spoke repos automatically ✅
- Skips spokes with no changes ✅
- Keeps everything in sync effortlessly ✅

### Available Make Commands

```bash
make help           # Show all available commands
make release-help   # Show release options
make install        # Install dependencies
make build          # Build all packages
make test           # Run tests
make lint           # Check code quality
make fix            # Auto-fix linting issues
make clean          # Clean build artifacts
make push           # Push + sync all spoke repos (RECOMMENDED)
make release-status # Check versions (local vs npm)
```

## Publishing Strategy

### Publishing Workflow

**Use Makefile commands (never direct npm/pnpm publish):**

```bash
# Check status
make release-status

# Release a spoke (recommended - does everything)
make release-one SPOKE=your-tool TYPE=patch

# Or manual steps:
make version-patch SPOKE=your-tool
make build
make npm-publish SPOKE=your-tool
make publish SPOKE=your-tool
```

**Important:**
- Always use `make push` after commits to sync spoke repos
- Always use `make npm-publish` (handles workspace:* protocol)
- Never use `npm publish` directly (will fail with workspace:* protocol)
- Release order: `core` first, then dependent spokes
- All spoke packages are free and open source
- Publish to npm with `@aiready/` scope

### Release Workflow

#### Quick Release (One Command)

```bash
# Check what needs releasing
make release-status

# Release a spoke (patch/minor/major)
make release-one SPOKE=context-analyzer TYPE=patch

# Examples:
make release-one SPOKE=context-analyzer TYPE=patch
make release-one SPOKE=pattern-detect TYPE=minor
make release-one SPOKE=core TYPE=major

# With 2FA
make release-one SPOKE=context-analyzer TYPE=patch OTP=123456
```

#### Pre-Release Checklist

- [ ] `make test` - All tests passing
- [ ] `make lint` - No lint errors
- [ ] `git status` - Clean working directory
- [ ] `make npm-check` - Logged into npm
- [ ] Review changes since last release
- [ ] Update README/CHANGELOG if needed

#### Status Check

```bash
# See all package versions (local vs npm)
make release-status
```

Output legend:
- `✓` = Published (local matches npm)
- `ahead` = Local is newer (needs publishing)
- `new` = Not yet on npm

#### Release Order

1. **Core first** - Always release `@aiready/core` before spokes if it changed
2. **Spokes next** - Release individual spokes in any order
3. **CLI last** - Release `@aiready/cli` after all spokes it depends on

#### Version Bump Guidelines

**Patch (0.1.0 → 0.1.1):** Bug fixes, documentation updates, performance improvements, internal refactoring

**Minor (0.1.0 → 0.2.0):** New features (backward compatible), new CLI options, new analysis algorithms, deprecations

**Major (0.1.0 → 1.0.0):** Breaking changes, removed features/options, changed output formats, changed API signatures

### Manual Release Workflow

1. **Version Bump:** `make version-patch SPOKE=context-analyzer`
2. **Commit & Tag:** `git add . && git commit -m "chore(release): @aiready/context-analyzer v0.2.0" && git tag -a "context-analyzer-v0.2.0"`
3. **Build:** `make build`
4. **Publish npm:** `make npm-publish SPOKE=context-analyzer [OTP=123456]`
5. **Publish GitHub:** `make publish SPOKE=context-analyzer`
6. **Push:** `git push origin main --follow-tags`

### Sync Workflow (External Contributions)

For external contributions to spoke repos:
```bash
# Pull changes from spoke repo back to monorepo
make sync-from-spoke SPOKE=context-analyzer
# Or use alias
make pull SPOKE=context-analyzer
```

## Adding a New Tool (Spoke)

Follow these steps to add a new analysis tool:

### Step 1: Create Package Structure

```bash
mkdir -p packages/your-tool/src
cd packages/your-tool
```

### Step 2: Create `package.json`

```json
{
  "name": "@aiready/your-tool",
  "version": "0.1.0",
  "description": "Brief description of what this tool does",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "bin": {
    "aiready-yourtool": "./dist/cli.js"
  },
  "scripts": {
    "build": "tsup src/index.ts src/cli.ts --format cjs,esm --dts",
    "dev": "tsup src/index.ts src/cli.ts --format cjs,esm --dts --watch",
    "test": "vitest run",
    "lint": "eslint src",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "@aiready/core": "workspace:*",
    "commander": "^12.1.0"
  },
  "devDependencies": {
    "tsup": "^8.3.5"
  },
  "keywords": ["aiready", "your-keywords"],
  "license": "MIT"
}
```

### Step 3: Create `src/index.ts`

```typescript
import { scanFiles, readFileContent } from '@aiready/core';
import type { AnalysisResult, Issue, ScanOptions } from '@aiready/core';

export interface YourToolOptions extends ScanOptions {
  // Your specific options
}

export async function analyzeYourTool(
  options: YourToolOptions
): Promise<AnalysisResult[]> {
  const files = await scanFiles(options);
  const results: AnalysisResult[] = [];

  // Your analysis logic here
  make build
  # or: pnpm --filter @aiready/your-tool dev
```

### Step 8: Publish (After Implementation)

```bash
# Commit everything
git add .
git commit -m "feat: add @aiready/your-tool"
make push  # Syncs all repositories

# Create GitHub repo
gh repo create caopengau/aiready-your-tool --public

# Release first version
make release-one SPOKE=your-tool TYPE=minor
}
```

### Step 4: Create `src/cli.ts`

```typescript
#!/usr/bin/env node
import { Command } from 'commander';
import { analyzeYourTool } from './index';
import chalk from 'chalk';

const program = new Command();

program
  .name('aiready-yourtool')
  .description('Description of your tool')
  .version('0.1.0')
  .argument('<directory>', 'Directory to analyze')
  .action(async (directory, options) => {
    console.log(chalk.blue('🔍 Analyzing...\n'));
    const results = await analyzeYourTool({ rootDir: directory });
    // Display results
  });

program.parse();
```

### Step 5: Create `tsconfig.json`

```json
{
  "extends": "../core/tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

### Step 6: Create `README.md`

Document:
- What problem it solves
- Why it exists (vs alternatives)
- Installation
- Usage (CLI + programmatic)
- Configuration options

### Step 7: Build and Test

```bash
pnpm build
pnpm --filter @aiready/your-tool dev
```

## Common Patterns

### Adding Shared Utilities to Core

If multiple spokes need the same functionality:

1. Add to `packages/core/src/utils/`
2. Export from `packages/core/src/index.ts`
3. Import in spokes: `import { utility } from '@aiready/core'`

### Adding New Issue Types

1. Add to `IssueType` union in `packages/core/src/types.ts`
2. Use in your spoke package
3. Rebuild core: `pnpm --filter @aiready/core build`

### Token Estimation

```typescript
import { estimateTokens } from '@aiready/core';

const tokens = estimateTokens(codeString); // ~4 chars per token
```

### Similarity Scoring

```typescript
import { similarityScore } from '@aiready/core';

const score = similarityScore(code1, code2); // Returns 0-1
```

## DevOps Best Practices

### ✅ DO

1. **Use Makefile commands** - `make build`, `make test`, `make push`
2. **Run `make push` after every commit** - Keeps all spoke repos synchronized
3. **Use `make release-one`** - One command handles complete release workflow
4. **Check `make release-status`** - Know what needs publishing before releasing
5. **Release core first** - If core changes, publish before dependent spokes
6. **Test before pushing** - `make test` catches issues early

### ❌ DON'T

1. **Don't use `npm publish` directly** - Use `make npm-publish` (handles workspace:*)
2. **Don't skip `make push`** - Spoke repos will drift out of sync
3. **Don't `git push` without `make push`** - Won't sync spoke repositories
4. **Don't release spokes before core** - Core changes need to publish first
5. **Don't forget to sync** - External contributors need current code

### Command Priority

When performing DevOps tasks, prefer this order:

1. **Make commands** (highest priority) - `make build`, `make push`, `make release-one`
2. **Turbo commands** (monorepo builds) - Used internally by Make
3. **pnpm commands** (package-specific dev) - `pnpm --filter @aiready/core build`
4. **Direct commands** (avoid) - `npm publish`, `git push` alone

## Troubleshooting

### "Not logged into npm"

```bash
make npm-login
```

### "Repository not found" on GitHub publish

Create the spoke repository first:

```bash
gh repo create caopengau/aiready-{spoke-name} --public
```

### "workspace:* protocol" error

You're using `npm publish` instead of `pnpm publish`. Use our Makefiles:

```bash
make npm-publish SPOKE=context-analyzer
```

### Changes not detected for release

Force the release:

```bash
make release-one SPOKE=context-analyzer TYPE=patch FORCE=1
```

### Build fails before publish

Ensure all packages build successfully:

```bash
make build
make test
```

## File Organization

```
aiready/
├── packages/
│   ├── core/              # Hub - shared utilities
│   │   ├── src/
│   │   │   ├── types.ts           # All shared types
│   │   │   ├── index.ts           # Public exports
│   │   │   └── utils/
│   │   │       ├── file-scanner.ts
│   │   │       ├── ast-parser.ts
│   │   │       └── metrics.ts
│   │   └── package.json
│   │
│   ├── pattern-detect/    # Spoke - duplicate patterns
│   │   ├── src/
│   │   │   ├── cli.ts
│   │   │   ├── detector.ts
│   │   │   ├── index.ts
│   │   │   └── __tests__/
│   │   │       └── detector.test.ts
│   │   └── package.json
│   │
│   ├── context-analyzer/  # Spoke - context costs
│   │   ├── src/
│   │   │   ├── analyzer.ts
│   │   │   ├── cli.ts
│   │   │   ├── index.ts
│   │   │   ├── types.ts
│   │   │   └── __tests__/
│   │   │       └── analyzer.test.ts
│   │   └── package.json
│   │
│   └── [future spokes]
│
├── makefiles/             # DevOps automation
│   ├── Makefile.build.mk
│   ├── Makefile.publish.mk
│   ├── Makefile.quality.mk
│   ├── Makefile.release.mk
│   ├── Makefile.setup.mk
│   └── Makefile.shared.mk
│
├── turbo.json             # Turborepo config
├── pnpm-workspace.yaml    # Workspace config
├── pnpm-lock.yaml         # Lockfile
└── README.md              # Project overview
```

## Next Steps

Current priority order:

1. ✅ **@aiready/core** - Basic utilities (DONE)
2. ✅ **@aiready/pattern-detect** - Semantic duplicates (DONE)
3. ✅ **@aiready/context-analyzer** - Token cost + fragmentation (DONE)
4. **@aiready/doc-drift** - Documentation staleness
5. **@aiready/consistency** - Naming patterns
6. **@aiready/cli** - Unified interface
7. **@aiready/deps** - Wrapper for madge/depcheck

### Tool Implementation Plans

- [Context Analyzer Plan](.github/plans/context-analyzer-plan.md) - Completed implementation
- [Pattern Detect Retrospective](.github/plans/pattern-detect-plan.md) - Lessons learned from first spoke

## Questions for Agent

When working on this codebase, consider:

- **Does this belong in core or a spoke?** (If multiple tools need it → core)
- **Am I creating a spoke-to-spoke dependency?** (Don't - refactor to core)
- **Is this tool independently useful?** (Should be publishable alone)
- **Does this overlap with existing tools?** (Check npm search first)
- **Can I test this on a real repo?** (Validate before over-engineering)

## Getting Help

- Check existing spoke implementations for patterns
- Review `@aiready/core` types for available utilities
- Look at `@aiready/pattern-detect` as reference implementation
- Keep spokes focused - one tool, one job