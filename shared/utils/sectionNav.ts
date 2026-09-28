import type { SiteNavItem, SiteSections } from '#shared/types/site'

const SECTION_NAV: Partial<Record<keyof SiteSections, SiteNavItem>> = {
  documents: { label: 'Документы', to: '/documents' },
  contacts: { label: 'Контакты', to: '/contacts' },
  okruga: { label: 'Округа', to: '/okruga' },
  ryadomSNami: { label: 'Рядом с нами', to: '/ryadom-s-nami' },
  projects: { label: 'Проекты', to: '/projects' },
  price: { label: 'Подписаться', to: '/price' },
}

/** Nav-элемент раздела (для breadcrumbs и ссылок). */
export function getSectionNavItem(section: keyof SiteSections): SiteNavItem | undefined {
  return SECTION_NAV[section]
}
