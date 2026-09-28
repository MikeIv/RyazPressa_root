import type { ContactEmailEntry, ContactInfo, ContactPhoneEntry } from '#shared/types/api'

interface BackendContactRaw {
  title?: string | null
  chief?: string | null
  address?: string | null
  coords?: string | null
  age?: string | null
  rknregistr?: string | null
  rknRegistration?: string | null
  phones?: Record<string, string> | null
  emails?: Record<string, string> | null
  phone?: string | null
  email?: string | null
  workingHours?: string | null
  working_hours?: string | null
  mapEmbedUrl?: string | null
  map_embed_url?: string | null
}

function trimOrUndefined(value: string | null | undefined): string | undefined {
  const trimmed = value?.trim()
  return trimmed || undefined
}

function normalizeKeyedEntries(
  record: Record<string, string> | null | undefined,
): { value: string; label?: string }[] | undefined {
  if (!record || typeof record !== 'object') return undefined

  const entries = Object.entries(record)
    .map(([value, label]) => ({
      value: value.trim(),
      label: trimOrUndefined(label),
    }))
    .filter((entry) => entry.value)

  return entries.length > 0 ? entries : undefined
}

function buildYandexMapEmbedUrl(coords: string): string | undefined {
  const parts = coords.split(',').map((part) => part.trim())
  if (parts.length !== 2) return undefined

  const [lat, lng] = parts
  if (!lat || !lng) return undefined

  return `https://yandex.ru/map-widget/v1/?ll=${lng},${lat}&z=16&pt=${lng},${lat},pm2rdm`
}

function toPhoneEntries(phone: string | null | undefined): ContactPhoneEntry[] | undefined {
  const value = trimOrUndefined(phone)
  return value ? [{ number: value }] : undefined
}

function toEmailEntries(email: string | null | undefined): ContactEmailEntry[] | undefined {
  const value = trimOrUndefined(email)
  return value ? [{ address: value }] : undefined
}

/** `GET /api/contacts`: бэкенд `{ data }` или mock → контракт фронта. */
export function normalizeContactsResponse(raw: unknown): ContactInfo {
  if (!raw || typeof raw !== 'object') {
    throw new Error('Invalid contacts API response')
  }

  const envelope = raw as BackendContactRaw & {
    data?: BackendContactRaw
    statusCode?: number
    message?: string
  }

  if (envelope.statusCode != null && envelope.message && !envelope.data) {
    throw new Error(envelope.message)
  }

  const src = envelope.data ?? envelope
  const coords = trimOrUndefined(src.coords)
  const mapEmbedUrl =
    trimOrUndefined(src.mapEmbedUrl ?? src.map_embed_url) ??
    (coords ? buildYandexMapEmbedUrl(coords) : undefined)

  const phones =
    normalizeKeyedEntries(src.phones)?.map(({ value, label }) => ({ number: value, label })) ??
    toPhoneEntries(src.phone)
  const emails =
    normalizeKeyedEntries(src.emails)?.map(({ value, label }) => ({ address: value, label })) ??
    toEmailEntries(src.email)

  const result: ContactInfo = {}

  const title = trimOrUndefined(src.title)
  if (title) result.title = title

  const chief = trimOrUndefined(src.chief)
  if (chief) result.chief = chief

  const address = trimOrUndefined(src.address)
  if (address) result.address = address

  if (coords) result.coords = coords

  const ageRating = trimOrUndefined(src.age)
  if (ageRating) result.ageRating = ageRating

  const rknRegistration = trimOrUndefined(src.rknRegistration ?? src.rknregistr)
  if (rknRegistration) result.rknRegistration = rknRegistration

  if (phones) result.phones = phones
  if (emails) result.emails = emails

  const workingHours = trimOrUndefined(src.workingHours ?? src.working_hours)
  if (workingHours) result.workingHours = workingHours

  if (mapEmbedUrl) result.mapEmbedUrl = mapEmbedUrl

  return result
}

export function contactInfoHasContent(contacts: ContactInfo | null | undefined): boolean {
  if (!contacts) return false

  return Boolean(
    contacts.chief ||
    contacts.address ||
    contacts.phones?.length ||
    contacts.emails?.length ||
    contacts.workingHours ||
    contacts.rknRegistration ||
    contacts.mapEmbedUrl,
  )
}

export function contactInfoHasFooterContent(contacts: ContactInfo | null | undefined): boolean {
  if (!contacts) return false

  return Boolean(
    contacts.address ||
    contacts.chief ||
    contacts.ageRating ||
    contacts.rknRegistration ||
    contacts.phones?.length ||
    contacts.emails?.length,
  )
}

export function contactTelHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

/** Префикс страны/кода: `+7 (49130) ` или `+7 980 `. */
const PHONE_AREA_PREFIX_RE = /^(\+7\s*(?:\(\d+\)|\d{3,5})\s*)/i

/**
 * Разбивает строку телефонов по запятой.
 * Коротким частям (`2-15-32`) подставляет код из первого полного номера.
 */
export function expandContactPhoneNumbers(raw: string): string[] {
  const parts = raw
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)

  if (parts.length <= 1) return parts

  const prefix = parts[0]?.match(PHONE_AREA_PREFIX_RE)?.[1]
  if (!prefix) return parts

  return parts.map((part, index) =>
    index === 0 || part.startsWith('+') || PHONE_AREA_PREFIX_RE.test(part)
      ? part
      : `${prefix}${part}`,
  )
}
