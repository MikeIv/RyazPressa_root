# Рязпресса

Отдельный сайт [ryazpressa.ru](https://ryazpressa.ru/). Каркас — Nuxt 4.5 (`srcDir: app/`), **SPA** (`ssr: false`), TypeScript, ESLint + Prettier + Stylelint, Husky, SCSS-токены `--fs-*`, HTTP API (`useApi` / `useApiFetch` / `serverApi`). Пакет — **pnpm**.

Мультисайт 25 изданий здесь не живёт. Разделы: новости, округа, рядом с нами, проекты, документы, контакты, подписка. Галереи нет.

GitLab: `gitlab.com/llcsavin/ryazpressa-root`.

## Окружение

Скопируйте [`.env.example`](.env.example) в `.env` (файл уже в `.gitignore`):

```bash
NUXT_PUBLIC_API_BASE=https://api.ryazpressa.ru
NUXT_PUBLIC_SITE_CONFIG_API_BASE=https://api.ryazpressa.ru
NUXT_USE_MOCK_API=false
```

`NUXT_PUBLIC_SITE_CONFIG_API_BASE` — хост `GET /api/_site`. Сейчас он совпадает с контент-API.

## Правила Cursor (Agent)

`.cursor/`, `AGENTS.md` и `.planning/` лежат локально и в git не входят. MCP-серверы — в User `~/.cursor/mcp.json`; проектный `mcpServers` не заполнять, иначе Cursor отключает пользовательские копии с теми же именами.

| Режим       | Правила                                          |
| ----------- | ------------------------------------------------ |
| always      | `00`, `07`, `90`                                 |
| globs       | `nuxt-template` (`app/` · `server/` · `shared/`) |
| requestable | `01`–`06`                                        |

Slash: `/brief` `/wave-done` `/verify` `/code-review`.
Синхронизация workflow: `d:\_WEB\_Work\_Cursor-rules-template` (`00`–`07`); `90` — только дополнять.

## Требования

- Node.js LTS (рекомендуется актуальная LTS; Nuxt 4.5 — Node `^22.19.0 || ^24.11.0 || >=26.0.0`, см. `engines` в `package.json`)
- [pnpm](https://pnpm.io/) 11.x (в репозитории зафиксирована версия через поле `packageManager` и Corepack)

## Установка

```bash
pnpm install
```

После установки автоматически выполняются:

- `postinstall` → `nuxt prepare` (генерация `.nuxt`, в т.ч. база для ESLint)
- `prepare` → `husky` (подключение Git-хуков, если в каталоге уже есть `.git`)

### Новый `git init` в этом проекте

Если репозиторий Git создан **после** первого `pnpm install`, Husky мог не привязаться (сообщение `.git can't be found`). Тогда один раз выполните:

```bash
pnpm exec husky
```

Проверка: `git config --get core.hooksPath` должно выводить `.husky/_`.

### Сборки, заблокированные pnpm

При предупреждении про игнорируемые postinstall-скрипты зависимостей:

```bash
pnpm approve-builds --all
```

Сборки нативных зависимостей разрешены в [`pnpm-workspace.yaml`](pnpm-workspace.yaml) (`allowBuilds` + `onlyBuiltDependencies`).

## Скрипты

| Команда              | Назначение                                                               |
| -------------------- | ------------------------------------------------------------------------ |
| `pnpm dev`           | dev-сервер (по умолчанию [http://localhost:3000](http://localhost:3000)) |
| `pnpm build`         | production-сборка                                                        |
| `pnpm preview`       | локальный просмотр собранного приложения                                 |
| `pnpm generate`      | статическая генерация (при необходимости)                                |
| `pnpm lint`          | ESLint по проекту                                                        |
| `pnpm lint:fix`      | ESLint с автоисправлением                                                |
| `pnpm format`        | Prettier — запись                                                        |
| `pnpm format:check`  | Prettier — проверка без записи                                           |
| `pnpm stylelint`     | Stylelint для `*.vue` и `*.css`                                          |
| `pnpm stylelint:fix` | Stylelint с автоисправлением                                             |
| `pnpm lint:all`      | последовательно ESLint + Prettier (check) + Stylelint                    |
| `pnpm typecheck`     | `nuxt typecheck`                                                         |
| `pnpm verify`        | `lint:all` + `typecheck`                                                 |

## Качество кода и pre-commit

- **ESLint**: `@nuxt/eslint`, конфиг [`eslint.config.mjs`](eslint.config.mjs).
- **Prettier**: [`prettier.config.mjs`](prettier.config.mjs); файлы `*.vue` в Prettier **не** форматируются (см. [`.prettierignore`](.prettierignore)).
- **Stylelint**: минимальная конфигурация для стилей в SFC — [`stylelint.config.mjs`](stylelint.config.mjs).
- **Husky**: хук [`.husky/pre-commit`](.husky/pre-commit) вызывает [`scripts/pre-commit.mjs`](scripts/pre-commit.mjs) — баннер с именем из `package.json`, lint-staged с флагом `--concurrent false`.
- **lint-staged**: [`lint-staged.config.mjs`](lint-staged.config.mjs). Если в коммите только файлы вне типов для линта, проверки **пропускаются** с пояснением.
- **CI**: минимальный GitLab pipeline — [`.gitlab-ci.yml`](.gitlab-ci.yml) (`pnpm verify` → `pnpm build`).

Коммит без хуков: `git commit --no-verify` (использовать осознанно).

## Структура проекта (кратко)

Исходники приложения — в **`app/`** ([`nuxt.config.ts`](nuxt.config.ts), `srcDir`): страницы, компоненты, layouts, composables, плагины, middleware, утилиты, ассеты.

Общий код клиента и Nitro — в **`shared/types`** и **`shared/utils`**.

Сервер Nitro — в **`server/`** (`api/`, `routes/`, `middleware/`, `plugins/`, `utils`).

Стили: токены `--fs-*`, mobile-first (миксины `from-mobile` / `from-tablet` / `from-desktop`). В SFC: `@use 'tools' as *;` (`vite.css.preprocessorOptions.scss.loadPaths` → `app/assets/styles`).

## HTTP API (каркас)

- База запросов: **`runtimeConfig.public.apiBase`** ← **`NUXT_PUBLIC_API_BASE`** ([`.env.example`](.env.example)).
- Конфиг сайта: **`runtimeConfig.public.siteConfigApiBase`** ← **`NUXT_PUBLIC_SITE_CONFIG_API_BASE`** (`GET /api/_site`).
- **`NUXT_USE_MOCK_API`** по умолчанию выключен (`runtimeConfig.useMockApi`).
- Клиент: **`useApi()`** (`$fetch` с `baseURL`) и **`useApiFetch()`** (полный URL = `apiBase` + путь, без `baseURL` в опциях `useFetch`) — [`app/composables/useApi.ts`](app/composables/useApi.ts).
- Сервер: **`serverApi(event?)`** — [`server/utils/serverApi.ts`](server/utils/serverApi.ts); URL — [`shared/utils/normalizeApiBaseUrl.ts`](shared/utils/normalizeApiBaseUrl.ts) (`normalizeApiBaseUrl`, `joinApiUrl`).
- Типизация `apiBase`, `siteConfigApiBase`, `useMockApi` — [`shared/types/nuxt-public.d.ts`](shared/types/nuxt-public.d.ts). Ambient-типы держим под `app/**` и `shared/**`: `nuxt build` генерирует tsconfig в `node_modules/.cache/nuxt/.nuxt/`, где относительный путь вида `../types/**` указывает в пустоту.

## Документация

- Документация продукта — в **`docs/`** (по мере появления).
- [Nuxt 4](https://nuxt.com/docs/4.x/getting-started/introduction)
- [Деплой](https://nuxt.com/docs/getting-started/deployment)
