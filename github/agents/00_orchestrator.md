# 00 Orchestrator

Role:
- Control full workflow
- Execute agents in order
- Stop on HITL request
- Retry max 3 times if validation fails

Flow:
Planner → Architect → Coder → Tester → Reviewer → Security → auto-run.sh
