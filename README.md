# @aiready/agent-grounding

> AIReady Spoke: Evaluates how well the codebase provides structured context for AI agents to understand domain boundaries and project architecture.

[![npm version](https://img.shields.io/npm/v/@aiready/agent-grounding.svg)](https://npmjs.com/package/@aiready/agent-grounding)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

AI agents are only as good as the context they are given. The **Agent Grounding** analyzer evaluates how "groundable" your codebase is—checking if domain concepts are clearly defined and project structure carries semantic meaning that aids AI retrieval.

## 🏛️ Architecture

```
                    🎯 USER
                      │
                      ▼
         🎛️  @aiready/cli (orchestrator)
          │     │     │     │     │     │     │     │     │
          ▼     ▼     ▼     ▼     ▼     ▼     ▼     ▼     ▼
        [PAT] [CTX] [CON] [AMP] [DEP] [DOC] [SIG] [AGT] [TST]
          │     │     │     │     │     │     │     │     │
          └─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘
                               │
                               ▼
                      🏢 @aiready/core

Legend:
  PAT = pattern-detect        CTX = context-analyzer
  CON = consistency           AMP = change-amplification
  DEP = deps-health           DOC = doc-drift
  SIG = ai-signal-clarity     AGT = agent-grounding ★
  TST = testability           ★   = YOU ARE HERE
```

## Features

- **README Quality**: Analyzes if high-level project documentation provides sufficient context for agent reasoning.
- **Directory Semantics**: Checks if file structure follows industry patterns that AI models recognize.
- **Domain Consistency**: Detects if core business concepts are named consistently across different modules.
- **Context Boundaries**: Flags ambiguous boundaries where code for multiple domains is mixed together.

## Installation

```bash
pnpm add @aiready/agent-grounding
```

## Usage

This tool is designed to be run through the unified AIReady CLI.

```bash
# Scan for agent grounding quality
aiready scan . --tools agent-grounding
```

## License

MIT
