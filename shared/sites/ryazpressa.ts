import type { SiteTheme } from '#shared/types/site'
import { enrichSiteTheme } from '#shared/utils/siteThemeAssets'

/** Тема до ответа `/api/_site`. Цвета совпадают с прод-конфигом ryazpressa.ru. */
export const ryazpressaTheme: SiteTheme = enrichSiteTheme('ryazpressa', 'Рязпресса', {
  colorPrimary: '#1a4b8c',
  colorAccent: '#c62828',
  colorText: '#1a1a1a',
  colorBackground: '#ffffff',
  headerGradientStart: '#ffffff',
  radiusSm: '4px',
  radiusMd: '8px',
})
