# @aiready/components

[![npm](https://img.shields.io/npm/v/@aiready/components)](https://www.npmjs.com/package/@aiready/components) 

Unified shared components library (UI, charts, hooks, utilities) for AIReady.

## 🏛️ Architecture

```
                    🎯 USER
                      │
                      ▼
            🎛️  CLI (orchestrator)
                      │
    ┌─────────────────┴─────────────────┐
    │                                   │
    ▼                                   ▼
┌────────┐                        ┌────────┐
│🎨 VIS- │                        │ ANALY- │
│UALIZER │                        │  SIS   │
│✅ Ready│                        │ SPOKES │
└────────┘                        └───┬────┘
    │                                 │
    │  ← YOU ARE HERE ──────┐         │
    │  (shared components)  │         │
    │                       │         │
    │     ┌────────┐        │  ┌────────┐           ┌────────┐
    │     │📊 PAT- │        │  │📦 CON- │           │🔧 CON- │
    │     │TERN    │        │  │TEXT    │           │SISTENCY│
    │     │DETECT  │        │  │ANALYZER│           │        │
    │     │        │        │  │        │           │        │
    │     │✅ Ready│        │  │✅ Ready│           │✅ Ready│
    │     └────────┘        │  └────────┘           └────────┘
    │                       │                               │
    └───────────────────────┴───────────────────────────────┘
                            │
                            ▼
                  🏢 HUB (@aiready/core)
```

## Features

- 🎨 **UI Components**: Button, Card, Input, Label, Badge, Container, Grid, Stack, Separator.
- 📊 **D3 Charts**: ForceDirectedGraph with physics-based layout.
- 🪝 **React Hooks**: `useDebounce`, `useD3`, `useForceSimulation`.

## Installation

```bash
pnpm add @aiready/components
```

## License

MIT