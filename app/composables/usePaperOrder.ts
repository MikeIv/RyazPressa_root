import type { PaperOrderRequest, PaperOrderResponse } from '#shared/types/api'

/**
 * Оформление подписки: `POST /api/order` на общем API.
 * Заголовок `X-Site-Slug` и нормализация ответа — на стороне `useApi`.
 * URL оплаты Сбербанка приходит в `formUrl`, после оплаты банк возвращает
 * пользователя на `/price/?result=…`.
 */
export function usePaperOrder() {
  const api = useApi()

  async function submitPaperOrder(order: PaperOrderRequest): Promise<PaperOrderResponse> {
    return api<PaperOrderResponse>('/api/order', {
      method: 'POST',
      body: order,
    })
  }

  return { submitPaperOrder }
}
