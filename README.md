# Lifegame — 仮想ウォレット (MVP)

This repository contains a minimal Next.js + TypeScript + Prisma (SQLite) app implementing a single-user virtual wallet.

Quick start (in Codespaces):

```bash
npm install
npm run prisma:generate
npm run prisma:push
npm run dev
```

Web app will be available on the Next.js dev server. The app auto-claims 1000円 once per day per single wallet record and allows subtraction actions.
# AI Dev Factory - FULL PACKAGE

Includes:
- Codespaces configuration
- Automated PR workflow
- Multi-Agent structure (00-60)
- Validation pipeline

Usage:
1. Open in GitHub Codespaces
2. Start Orchestrator
3. Run:
   bash scripts/auto-run.sh

Fully automated PR creation supported.
