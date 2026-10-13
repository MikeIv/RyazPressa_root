<script setup lang="ts">
import { isRootNewsArticlePath, type NewsArticlePathPrefix } from '#shared/utils/newsArticlePath'
import { isSubscriptionNavItem } from '#shared/utils/sectionNav'
import { useAccessibilityModal } from '~/composables/useAccessibilityModal'

const { site } = useSiteConfig()
const route = useRoute()
const {
  isOpen: isAccessibilityOpen,
  open: openAccessibilityModal,
  close: closeAccessibilityModal,
  setTrigger,
} = useAccessibilityModal()

const headerRef = ref<HTMLElement | null>(null)
const accessibilityBtnRef = ref<HTMLButtonElement | null>(null)
const logoFailed = ref(false)
const isMenuOpen = ref(false)

watch(accessibilityBtnRef, setTrigger)

function closeMenu(): void {
  isMenuOpen.value = false
}

function onBurgerClick(): void {
  closeAccessibilityModal()
  isMenuOpen.value = !isMenuOpen.value
}

function onAccessibilityClick(): void {
  closeMenu()
  openAccessibilityModal()
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') closeMenu()
}

function onPointerDown(event: PointerEvent): void {
  const target = event.target

  if (!isMenuOpen.value || (target instanceof Node && headerRef.value?.contains(target))) return

  closeMenu()
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('pointerdown', onPointerDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('pointerdown', onPointerDown)
})

watch(
  () => site.value?.theme.logoSrc,
  () => {
    logoFailed.value = false
  },
)

function isActive(to: string): boolean {
  if (to === '/') {
    if (route.path === '/') return true
    const prefix = (site.value?.articlePathPrefix ?? '/news') as NewsArticlePathPrefix
    if (isRootNewsArticlePath(route.path, prefix)) return true
    if (route.path.startsWith('/news/')) return true
    return false
  }
  return route.path === to || route.path.startsWith(`${to}/`)
}

function onSearchSubmit(event: Event): void {
  event.preventDefault()
}

watch(
  () => route.path,
  () => {
    closeMenu()
    closeAccessibilityModal()
  },
)
</script>

<template>
  <header ref="headerRef" :class="$style.header" role="banner">
    <div :class="$style.logoBar">
      <div :class="[$style.logoInner, 'site-shell']">
        <AppHeaderLogo :image-failed="logoFailed" @image-error="logoFailed = true" />
      </div>
    </div>

    <div :class="$style.navBar">
      <div :class="[$style.navInner, 'site-shell']">
        <button
          :class="[$style.roundBtn, $style.burgerBtn, isMenuOpen && $style.burgerBtnOpen]"
          type="button"
          aria-controls="main-nav"
          :aria-expanded="isMenuOpen"
          :aria-label="isMenuOpen ? 'Закрыть меню' : 'Открыть меню'"
          @click="onBurgerClick"
        >
          <span :class="$style.burgerIcon" aria-hidden="true" />
          <span :class="$style.burgerIcon" aria-hidden="true" />
          <span :class="$style.burgerIcon" aria-hidden="true" />
        </button>

        <nav
          id="main-nav"
          :class="[$style.nav, isMenuOpen && $style.navOpen]"
          aria-label="Основная навигация"
        >
          <ul :class="$style.navList" role="list">
            <li
              v-for="item in site?.nav"
              :key="item.to"
              :class="isSubscriptionNavItem(item.to) && $style.navItemAccent"
            >
              <NuxtLink
                :to="item.to"
                active-class=""
                exact-active-class=""
                :class="[
                  $style.navLink,
                  isActive(item.to) && $style.navLinkActive,
                  isSubscriptionNavItem(item.to) && $style.navLinkAccent,
                ]"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <form
          :class="$style.search"
          role="search"
          aria-label="Поиск по сайту"
          @submit="onSearchSubmit"
        >
          <label class="visually-hidden" for="site-search">Поиск</label>
          <input
            id="site-search"
            :class="$style.searchInput"
            type="search"
            name="q"
            placeholder="Поиск…"
            autocomplete="off"
          />
          <button :class="$style.searchBtn" type="submit" aria-label="Найти">
            <svg :class="$style.searchIcon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                fill="currentColor"
                d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
              />
            </svg>
          </button>
        </form>

        <button
          ref="accessibilityBtnRef"
          :class="[$style.roundBtn, $style.accessibilityBtn]"
          type="button"
          aria-haspopup="dialog"
          :aria-expanded="isAccessibilityOpen"
          aria-label="Версия сайта для людей с ограниченными возможностями"
          @click="onAccessibilityClick"
        >
          <svg :class="$style.eyeIcon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
              fill="currentColor"
              d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
            />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<style module lang="scss">
@use '~/assets/styles/tools/mixins' as mx;
@use '~/assets/styles/tools/subscription-button' as subscription;
@use '~/assets/styles/variables/resolutions' as bp;

/* Горизонтальное меню с кнопкой подписки помещается в строку только с этой
   ширины: ниже показываем бургер, иначе «Подписаться» уходит на вторую строку */
$nav-min-width: 1240px;

@mixin from-nav {
  @media (min-width: #{$nav-min-width}) {
    @content;
  }
}

.header {
  position: sticky;
  top: 0;
  z-index: 100;
}

.logoBar {
  background: var(--fs-color-bg);
}

.logoInner {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-block: 6px;

  @include mx.from-tablet {
    padding-block: var(--fs-space-1);
  }

  @include mx.from-desktop {
    padding-block: 10px;
  }
}

.navBar {
  position: relative;
  background: var(--fs-color-bg);
  border-top: 1px solid var(--fs-color-border);
  border-bottom: 1px solid var(--fs-color-border);
}

.navInner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--fs-space-1);
  min-height: 48px;
  padding-block: 6px;

  @include from-nav {
    gap: var(--fs-space-2);
    min-height: 56px;
    padding-block: var(--fs-space-1);
  }
}

.roundBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 50%;
  background: #fff;
  color: var(--site-color-primary);
  box-shadow: 0 2px 8px rgb(0 0 0 / 12%);
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgb(0 0 0 / 18%);
  }

  &:focus-visible {
    outline-color: var(--site-color-primary);
    outline-offset: 2px;
  }
}

.burgerBtn {
  flex-direction: column;
  gap: 3px;
  width: 36px;
  height: 36px;

  @include from-nav {
    display: none;
  }
}

.burgerIcon {
  display: block;
  width: 14px;
  height: 2px;
  background: currentcolor;
  border-radius: 1px;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.burgerBtnOpen {
  .burgerIcon:nth-child(1) {
    transform: translateY(5px) rotate(45deg);
  }

  .burgerIcon:nth-child(2) {
    opacity: 0;
  }

  .burgerIcon:nth-child(3) {
    transform: translateY(-5px) rotate(-45deg);
  }
}

.accessibilityBtn {
  width: 36px;
  height: 36px;

  @include mx.from-tablet {
    width: 40px;
    height: 40px;
  }
}

.eyeIcon {
  display: block;
  width: 18px;
  height: 18px;

  @include mx.from-tablet {
    width: 20px;
    height: 20px;
  }
}

.search {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
  border: 1px solid var(--fs-color-border);
  border-radius: 999px;
  overflow: hidden;
  background: color-mix(in srgb, var(--site-color-primary) 6%, var(--fs-color-background));
  transition: border-color 0.15s ease;

  &:focus-within {
    border-color: color-mix(in srgb, var(--site-color-primary) 45%, var(--fs-color-border));
  }

  @include mx.from-desktop {
    flex: none;
    width: 200px;
  }
}

.searchInput {
  flex: 1;
  min-width: 0;
  padding: 6px 8px 6px 12px;
  border: none;
  background: transparent;
  color: var(--fs-color-text);
  font-size: var(--fs-text-xs);
  font-family: inherit;
  outline: none;

  &::placeholder {
    color: var(--fs-color-text-muted);
  }

  @include mx.from-desktop {
    padding: 8px 12px 8px 16px;
    font-size: var(--fs-text-sm);
  }
}

.searchBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  color: var(--site-color-primary);
  transition: background 0.15s ease;

  &:hover {
    background: color-mix(in srgb, var(--site-color-primary) 10%, transparent);
  }

  &:focus-visible {
    outline-color: var(--site-color-primary);
  }

  @include mx.from-desktop {
    width: 36px;
    height: 36px;
  }
}

.searchIcon {
  display: block;
  width: 16px;
  height: 16px;

  @include mx.from-desktop {
    width: 18px;
    height: 18px;
  }
}

.nav {
  display: none;

  @include from-nav {
    display: flex;
    flex: 1;
    min-width: 0;
  }
}

.navOpen {
  display: block;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--fs-color-bg);
  border-bottom: 1px solid var(--fs-color-border);
  box-shadow: 0 12px 24px rgb(0 0 0 / 12%);

  @include from-nav {
    display: flex;
    position: static;
    background: none;
    border-bottom: 0;
    box-shadow: none;
  }
}

.navList {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin: 0;
  padding: var(--fs-space-1) var(--fs-space-2);
  list-style: none;

  @include mx.from-tablet {
    padding-inline: var(--fs-space-3);
  }

  @include from-nav {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--fs-space-1) var(--fs-space-2);
    padding: 0;

    /* Самый тесный диапазон — поджимаем отступы, чтобы строка не ломалась */
    @media (max-width: #{bp.$desktopMedium - 1px}) {
      column-gap: 12px;
    }
  }
}

.navLink {
  display: block;
  padding: 8px 0;
  font-size: var(--fs-text-xs);
  font-weight: var(--fs-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: color-mix(in srgb, var(--site-color-primary) 52%, var(--fs-color-text-muted));
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.15s ease;

  &:hover {
    color: color-mix(in srgb, var(--site-color-primary) 78%, var(--fs-color-text-muted));
  }

  &:focus-visible {
    outline-color: var(--site-color-primary);
  }

  @include mx.from-tablet {
    font-size: var(--fs-text-sm);
  }

  @include from-nav {
    padding: 4px 2px;
    font-size: 0.8125rem;
    letter-spacing: 0.05em;

    /* Узкое горизонтальное меню: пункты должны оставаться в одну строку */
    @media (max-width: #{bp.$desktopMedium - 1px}) {
      font-size: var(--fs-text-xs);
    }
  }
}

.navLinkActive {
  color: var(--site-color-accent);
  font-weight: var(--fs-weight-bold);
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-thickness: 2px;

  &:hover {
    color: var(--site-color-accent);
  }
}

/* Подписка — кнопка у поиска на десктопе, прямоугольник с текстом как на старом сайте */
.navItemAccent {
  @include from-nav {
    margin-left: auto;
  }
}

.navLinkAccent {
  @include subscription.button;

  /* У прописных нет выносных элементов под базовой линией — опускаем текст на 1px */
  padding: 2px 16px 0;
  font-weight: var(--fs-weight-bold);
}

.navLinkAccent.navLinkActive {
  background: color-mix(in srgb, var(--site-color-accent) 88%, #000);
  color: #fff;
  text-decoration: none;
}
</style>
