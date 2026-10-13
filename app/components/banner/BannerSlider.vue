<script setup lang="ts">
import type { Banner } from '#shared/types/api'

/** Интервал автопрокрутки — как у unslider на legacy-сайте (5 с). */
const SLIDE_INTERVAL_MS = 5000

const props = defineProps<{
  items: Banner[]
}>()

const activeIndex = ref(0)
const isPaused = ref(false)
const prefersReducedMotion = ref(false)

let timer: ReturnType<typeof setInterval> | null = null

const hasMany = computed(() => props.items.length > 1)

/**
 * Слайды, для которых держим картинку в DOM: активный и оба соседних.
 * Все 9 баннеров весят ≈ 620 КБ, поэтому остальные подгружаются по мере ротации.
 */
const renderedIndexes = computed(() => {
  const total = props.items.length
  if (total <= 3) return new Set(props.items.map((_, index) => index))

  return new Set([
    (activeIndex.value - 1 + total) % total,
    activeIndex.value,
    (activeIndex.value + 1) % total,
  ])
})

function stopTimer(): void {
  if (timer === null) return

  clearInterval(timer)
  timer = null
}

function startTimer(): void {
  stopTimer()

  if (!hasMany.value || prefersReducedMotion.value) return

  timer = setInterval(() => {
    if (isPaused.value) return

    activeIndex.value = (activeIndex.value + 1) % props.items.length
  }, SLIDE_INTERVAL_MS)
}

/** Ручное переключение — отсчёт автопрокрутки начинается заново. */
function selectSlide(index: number): void {
  activeIndex.value = index
  startTimer()
}

onMounted(() => {
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  startTimer()
})

onBeforeUnmount(stopTimer)

watch([() => props.items.length, prefersReducedMotion], () => {
  if (activeIndex.value >= props.items.length) activeIndex.value = 0

  startTimer()
})
</script>

<template>
  <div
    v-if="items.length"
    :class="$style.slider"
    role="group"
    aria-label="Рекламные баннеры"
    @mouseenter="isPaused = true"
    @mouseleave="isPaused = false"
    @focusin="isPaused = true"
    @focusout="isPaused = false"
  >
    <ul :class="$style.list" role="list">
      <li
        v-for="(item, index) in items"
        :key="item.id"
        :class="[$style.slide, index === activeIndex && $style.slideActive]"
      >
        <a v-if="renderedIndexes.has(index)" :class="$style.link" :href="item.link">
          <img
            :class="$style.image"
            :src="item.image.url"
            :alt="item.image.alt"
            :width="item.image.width"
            :height="item.image.height"
          />
        </a>
      </li>
    </ul>

    <div v-if="hasMany" :class="$style.dots" role="group" aria-label="Выбор баннера">
      <button
        v-for="(item, index) in items"
        :key="`dot-${item.id}`"
        type="button"
        :class="[$style.dot, index === activeIndex && $style.dotActive]"
        :aria-label="`Показать баннер: ${item.image.alt}`"
        :aria-current="index === activeIndex"
        @click="selectSlide(index)"
      />
    </div>
  </div>
</template>

<style module lang="scss">
.slider {
  display: flex;
  flex-direction: column;
  gap: var(--fs-space-1);
  min-width: 0;
}

.list {
  position: relative;
  width: 100%;
  /* Баннеры legacy-сайта — 240×480: держим натуральную ширину и пропорцию 1:2 */
  max-width: 240px;
  aspect-ratio: 1 / 2;
  margin: 0 auto;
  padding: 0;
  list-style: none;
}

.slide {
  position: absolute;
  inset: 0;
  visibility: hidden;
  opacity: 0;
  /* visibility переключается дискретно в конце fade-out, иначе слайд исчезает мгновенно */
  transition:
    opacity 0.4s ease,
    visibility 0s linear 0.4s;
}

.slideActive {
  visibility: visible;
  opacity: 1;
  transition:
    opacity 0.4s ease,
    visibility 0s linear;
}

.link {
  display: block;
  height: 100%;
  border-radius: var(--site-radius-md);

  &:focus-visible {
    outline: 2px solid var(--site-color-primary);
    outline-offset: 2px;
  }
}

.image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--site-radius-md);
}

.dots {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px;
}

.dot {
  width: 8px;
  height: 8px;
  padding: 0;
  background: var(--fs-color-border);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: color-mix(in srgb, var(--site-color-primary) 45%, var(--fs-color-border));
  }

  &:focus-visible {
    outline: 2px solid var(--site-color-primary);
    outline-offset: 2px;
  }
}

.dotActive {
  background: var(--site-color-primary);
}

@media (prefers-reduced-motion: reduce) {
  .slide,
  .dot {
    transition: none;
  }
}
</style>
