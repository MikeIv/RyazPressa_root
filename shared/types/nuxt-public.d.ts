/**
 * Лежит в `shared/types/`: Nuxt включает каталог `shared` (в том числе с глобом на
 * `.d.ts`) во все генерируемые программы — app, server, shared — и перебазирует
 * этот путь при смене buildDir. Относительный путь в `typescript.tsConfig.include`
 * так не умеет: `nuxt build` собирает конфиги в `node_modules/.cache/nuxt/.nuxt/`,
 * и такой путь указывает в пустоту (типы молча теряются).
 *
 * Значения совпадают с автогенерируемым `.nuxt/types/runtime-config.d.ts`
 * (Nuxt выводит их из `runtimeConfig`); файл нужен как явный контракт окружения.
 */
declare module 'nuxt/schema' {
  interface RuntimeConfig {
    /** Mock API выключен, пока `NUXT_USE_MOCK_API` не равен `true`. */
    useMockApi: boolean
  }

  interface PublicRuntimeConfig {
    /** Базовый URL HTTP API (без завершающего `/`). */
    apiBase: string
    /** Хост `GET /api/_site`. Пустая строка — тот же хост, что `apiBase`. */
    siteConfigApiBase: string
  }
}

export {}
