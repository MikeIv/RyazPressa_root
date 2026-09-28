import { applyClientApiRequestHeaders } from '#shared/utils/applySiteSlugHeader'
import { normalizeApiBaseUrl } from '#shared/utils/normalizeApiBaseUrl'
import { normalizePublicSiteConfig } from '#shared/utils/normalizePublicSiteConfig'
import type { PublicSiteConfig } from '#shared/types/site'

/** Ключ `useFetch` / `useNuxtData` для конфига сайта (singleton на приложение). */
export const SITE_CONFIG_KEY = 'site-config' as const

/** Безопасное чтение `runtimeConfig.public.apiBase` (в т.ч. при `unknown` из env). */
export function readApiBase(apiBase: unknown): string | undefined {
  return typeof apiBase === 'string' ? apiBase : undefined
}

/**
 * URL `/api/_site`.
 * Сначала `siteConfigApiBase`, если он пуст — `apiBase`.
 */
export function resolveSiteConfigRequestUrl(
  siteConfigApiBase: string | undefined,
  apiBase: string | undefined,
): string {
  const base = normalizeApiBaseUrl(siteConfigApiBase) || normalizeApiBaseUrl(apiBase)
  return base ? `${base}/api/_site` : '/api/_site'
}

export interface SiteConfigFetchOptions {
  key: typeof SITE_CONFIG_KEY
  watch: false
  transform: (body: unknown) => PublicSiteConfig
  onRequest: (ctx: { options: { headers?: HeadersInit } }) => void
}

/** Общие опции `useFetch` для `/api/_site`. */
export function buildSiteConfigFetchOptions(): SiteConfigFetchOptions {
  return {
    key: SITE_CONFIG_KEY,
    watch: false,
    transform: normalizePublicSiteConfig,
    onRequest: ({ options }) => {
      applyClientApiRequestHeaders(options, {})
    },
  }
}

/** URL и опции `useFetch` для `/api/_site`. */
export function getSiteConfigFetchParams(
  siteConfigApiBase: string | undefined,
  apiBase: string | undefined,
) {
  return {
    url: resolveSiteConfigRequestUrl(siteConfigApiBase, apiBase),
    options: buildSiteConfigFetchOptions(),
  }
}
