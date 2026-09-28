import type { SiteSections } from '#shared/types/site'

/**
 * Лежит в `app/types/`, а не в корневом `types/`: `nuxt build` генерирует tsconfig
 * в `node_modules/.cache/nuxt/.nuxt/`, где относительный `../types/**` из
 * `typescript.tsConfig.include` указывает в пустоту и типы молча теряются.
 * `app/**` перебазируется Nuxt корректно, поэтому аугментация видна и в
 * `nuxt typecheck`, и в `nuxt build`.
 */
declare module '#app' {
  interface PageMeta {
    /** Ключ раздела из `SiteSections` для middleware `section`. */
    section?: keyof SiteSections
  }
}

export {}
