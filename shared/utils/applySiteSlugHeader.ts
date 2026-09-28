import type { PublicSiteConfig } from '#shared/types/site'

/** Apex-домен сайта. Бэкенд выбирает издание по заголовку `X-Site-Slug`. */
export const RYAZPRESSA_API_HOST = 'ryazpressa.ru'

/** Добавляет заголовок `X-Site-Slug`. */
export function applySiteSlugHeader(
  options: { headers?: HeadersInit },
  identity: string | undefined,
): void {
  const value = identity?.trim()
  if (!value) return

  const headers = new Headers(options.headers)
  headers.set('X-Site-Slug', value)
  options.headers = headers
}

/** Заголовки клиентских вызовов. До ответа `/api/_site` — фиксированный хост ryazpressa.ru. */
export function applyClientApiRequestHeaders(
  options: { headers?: HeadersInit },
  params: {
    site?: PublicSiteConfig | null
  },
): void {
  applySiteSlugHeader(options, params.site?.apiSiteHost?.trim() || RYAZPRESSA_API_HOST)
}
