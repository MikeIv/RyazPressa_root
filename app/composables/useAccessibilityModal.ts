/** Модальное окно настроек доступности (версия для слабовидящих). */
export function useAccessibilityModal() {
  const isOpen = useState('accessibility-modal-open', () => false)
  const triggerEl = useState<HTMLElement | null>('accessibility-modal-trigger', () => null)

  function setTrigger(el: HTMLElement | null): void {
    triggerEl.value = el
  }

  function open(): void {
    isOpen.value = true
  }

  function close(): void {
    isOpen.value = false
  }

  return { isOpen, triggerEl, setTrigger, open, close }
}
