---
description: Code review — local diff или GitLab MR
argument-hint: [mr-iid | mr-url | пусто = local]
---

# Code Review

**Input:** $ARGUMENTS · Протокол: `04-verify-and-done.mdc`

| Input      | Режим                                                       |
| ---------- | ----------------------------------------------------------- |
| Пусто      | **Local** — `git diff --name-only HEAD`, файлы целиком      |
| MR IID/URL | **GitLab** — MCP `review-merge-request` или `glab mr diff` |

Платформа **GitLab**, не GitHub / `gh pr`.

1. Файлы целиком
2. CRITICAL → LOW (`04`, Nuxt/Nitro)
3. `pnpm lint:all`; L+ — `pnpm build`; pipeline для MR

Отчёт: **OK** | **FIX REQUIRED** | **BLOCK** + pipeline.
