import { useAccessibilityModal } from '~/composables/useAccessibilityModal'

/** Блокировка скролла и закрытие модала доступности по Escape. */
export default defineNuxtPlugin(() => {
  const { isOpen, close } = useAccessibilityModal()

  watch(isOpen, (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
  })

  const onEscape = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && isOpen.value) close()
  }

  window.addEventListener('keydown', onEscape)

  onScopeDispose(() => {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', onEscape)
  })
})
