import { ryazpressaTheme } from '#shared/sites/ryazpressa'
import { useSiteConfig } from '~/composables/useSiteConfig'
import { applySiteThemeCss } from '~/utils/applySiteThemeCss'

/** CSS-переменные темы: сразу фолбэк ryazpressa, затем тема из `/api/_site`. */
export default defineNuxtPlugin(() => {
  applySiteThemeCss(ryazpressaTheme)

  const { site } = useSiteConfig()

  watch(
    () => site.value?.theme,
    (theme) => {
      if (theme) applySiteThemeCss(theme)
    },
    { immediate: true },
  )
})
