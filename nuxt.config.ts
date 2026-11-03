// https://nuxt.com/docs/api/configuration/nuxt-config
const isDev = process.env.NODE_ENV === 'development'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  /** Один сайт, данные с API на клиенте. SSR не включаем. */
  ssr: false,

  /** Исходники приложения в `app/`. Каталог `server/` — в корне репозитория. */
  srcDir: 'app/',

  css: ['~/assets/styles/main.scss'],

  modules: ['@nuxt/eslint'],

  eslint: {
    config: {
      stylistic: false,
    },
  },

  devtools: {
    /** В production-сборке DevTools не подключаем — меньше шум и размер. */
    enabled: isDev,
    timeline: { enabled: isDev },
  },

  /**
   * Nuxt 4.6 без явного host резолвит `devServer.host` в `{}`,
   * и `nuxt dev` падает: `hostname.toLowerCase is not a function`.
   * Loopback — тот же адрес, что сервер слушал раньше.
   */
  devServer: {
    host: 'localhost',
  },

  typescript: {
    strict: true,
    /** Проверка типов на `nuxt build` / `nuxt generate`, без замедления каждого сохранения в dev */
    typeCheck: 'build',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      title: 'Рязпресса',
    },
  },

  /**
   * `apiBase` — контент API (`NUXT_PUBLIC_API_BASE`).
   * `siteConfigApiBase` — хост `GET /api/_site` (`NUXT_PUBLIC_SITE_CONFIG_API_BASE`).
   * Пустой `siteConfigApiBase` означает тот же хост, что `apiBase`.
   * `useMockApi` — только явное `NUXT_USE_MOCK_API=true`; по умолчанию выключен.
   */
  runtimeConfig: {
    useMockApi: process.env.NUXT_USE_MOCK_API === 'true',
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE ?? '',
      siteConfigApiBase: process.env.NUXT_PUBLIC_SITE_CONFIG_API_BASE ?? '',
    },
  },

  features: {
    /** Логи Nuxt devtools в production не нужны */
    devLogs: isDev,
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          loadPaths: ['app/assets/styles'],
        },
      },
    },
    build: {
      target: 'esnext',
      cssMinify: true,
    },
  },

  nitro: {
    compressPublicAssets: true,
  },
})
