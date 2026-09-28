import { ensureSiteConfigLoaded } from '~/composables/useSiteConfig'

export default defineNuxtRouteMiddleware(async (to) => {
  const section = to.meta.section
  if (!section) return

  const site = await ensureSiteConfigLoaded()

  if (!site?.sections[section]) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Раздел недоступен на этом сайте',
    })
  }
})
