# Рязпресса — PROJECT

Постоянный контекст проекта для Cursor Agent.

## Назначение

Отдельный сайт ryazpressa.ru. Не мультиарендная платформа: один фронт, один API.

GitLab: https://gitlab.com/llcsavin/ryazpressa-root.git

## Стек

| Слой     | Технология                                        |
| -------- | ------------------------------------------------- |
| Frontend | Nuxt 4.5, Vue 3, SPA (`ssr: false`)               |
| Lint     | ESLint (@nuxt/eslint), Prettier, Stylelint, Husky |
| Стили    | SCSS, CSS Modules, mobile-first (`from-*`)        |
| API      | `https://api.ryazpressa.ru`                       |
| PM       | pnpm 11.x                                         |

## API

| Переменная                         | Значение                                       |
| ---------------------------------- | ---------------------------------------------- |
| `NUXT_PUBLIC_API_BASE`             | `https://api.ryazpressa.ru`                    |
| `NUXT_PUBLIC_SITE_CONFIG_API_BASE` | `https://api.ryazpressa.ru` (`GET /api/_site`) |
| `NUXT_USE_MOCK_API`                | `false`                                        |

Заголовок сайта на API — `X-Site-Slug: ryazpressa.ru` (подключается вместе с разделами).

## Ключевые пути

| Путь                                  | Назначение                |
| ------------------------------------- | ------------------------- |
| `app/pages/`                          | Маршруты                  |
| `app/layouts/default.vue`             | Layout                    |
| `app/composables/useApi.ts`           | HTTP клиент               |
| `server/utils/serverApi.ts`           | API с Nitro               |
| `shared/utils/normalizeApiBaseUrl.ts` | URL API                   |
| `app/assets/styles/`                  | Глобальные стили и токены |
| `types/nuxt-public.d.ts`              | Типы public runtime       |

## Разделы (следующая волна)

`/`, статья `/:slug`, `/okruga`, `/ryadom-s-nami`, `/projects`, `/documents`, `/contacts`, `/price`. Галереи нет.

## Команды

```bash
pnpm install
pnpm dev
pnpm typecheck
pnpm verify
pnpm build
pnpm lint:all
```

## Ограничения для агента

- SPA: не включать SSR без запроса
- API только через `useApi` / `useApiFetch` / `serverApi`
- Не коммитить `.env`
- Не тащить реестр 26 сайтов из `Ryazpressa_nuxt`
- Стили: `--fs-*`, mobile-first
