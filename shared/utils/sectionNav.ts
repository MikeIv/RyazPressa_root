import type { SiteNavItem, SiteSections } from '#shared/types/site'

/** Раздел подписки — пункт меню, который в шапке и футере оформляется кнопкой. */
export const SUBSCRIPTION_NAV_PATH = '/price'

const SECTION_NAV: Partial<Record<keyof SiteSections, SiteNavItem>> = {
  documents: { label: 'Документы', to: '/documents' },
  contacts: { label: 'Контакты', to: '/contacts' },
  okruga: { label: 'Округа', to: '/okruga' },
  ryadomSNami: { label: 'Рядом с нами', to: '/ryadom-s-nami' },
  projects: { label: 'Проекты', to: '/projects' },
  price: { label: 'Подписаться', to: SUBSCRIPTION_NAV_PATH },
}

/** Nav-элемент раздела (для breadcrumbs и ссылок). */
export function getSectionNavItem(section: keyof SiteSections): SiteNavItem | undefined {
  return SECTION_NAV[section]
}

/** Пункт меню подписки — выделяется акцентной кнопкой, а не обычной ссылкой. */
export function isSubscriptionNavItem(to: string): boolean {
  return to === SUBSCRIPTION_NAV_PATH
}
