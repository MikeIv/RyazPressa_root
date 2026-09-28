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
