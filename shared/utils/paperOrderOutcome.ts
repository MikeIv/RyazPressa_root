import type { PaperOrderResponse } from '#shared/types/api'

export type PaperOrderOutcome =
  | { kind: 'error'; message: string }
  | { kind: 'success'; message: string }
  | { kind: 'redirect'; url: string }

/**
 * Итог оформления подписки: `formUrl` — редирект на оплату Сбербанка,
 * иначе сообщение пользователю.
 */
export function resolvePaperOrderOutcome(response: PaperOrderResponse): PaperOrderOutcome {
  if (response.error) {
    return { kind: 'error', message: response.error }
  }

  if (response.formUrl) {
    return { kind: 'redirect', url: response.formUrl }
  }

  if (response.success) {
    return { kind: 'success', message: 'Вы успешно подписаны.' }
  }

  return { kind: 'error', message: 'Не удалось оформить подписку.' }
}

/** Текст ошибки из ответа API (`{ statusCode, message }`) или из `{ error }`. */
export function readPaperOrderSubmitError(error: unknown): string {
  if (error && typeof error === 'object' && 'data' in error) {
    const data = (error as { data?: unknown }).data
    if (data && typeof data === 'object') {
      if ('error' in data && typeof data.error === 'string' && data.error.trim()) {
        return data.error
      }
      if ('message' in data && typeof data.message === 'string' && data.message.trim()) {
        return data.message
      }
    }
  }

  return 'Не удалось оформить подписку. Попробуйте позже.'
}
