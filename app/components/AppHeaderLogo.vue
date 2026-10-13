<script setup lang="ts">
const props = defineProps<{
  imageFailed: boolean
}>()

const emit = defineEmits<{
  imageError: []
}>()

const { site } = useSiteConfig()

const ariaLabel = computed(
  () => `${site.value?.name ?? 'Главная'} — перейти на главную страницу`,
)

const showImage = computed(
  () => Boolean(site.value?.theme.logoSrc) && !props.imageFailed,
)
</script>

<template>
  <NuxtLink to="/" :class="$style.logo" :aria-label="ariaLabel">
    <img
      v-if="showImage"
      :src="site?.theme.logoSrc"
      :alt="site?.theme.logoAlt ?? ''"
      :class="$style.img"
      :width="site?.theme.logoWidth"
      :height="site?.theme.logoHeight"
      @error="emit('imageError')"
    />
    <span v-else :class="$style.text">{{ site?.name }}</span>
  </NuxtLink>
</template>

<style module lang="scss">
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  color: var(--site-color-primary);

  &:focus-visible {
    outline-color: var(--site-color-primary);
    outline-offset: 4px;
  }
}

.img {
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: clamp(26px, 4.4vw, 40px);
  object-fit: contain;
  object-position: center;
}

.text {
  font-family: var(--fs-font-display);
  font-size: clamp(var(--fs-text-lg), 4vw, var(--fs-text-3xl));
  font-weight: var(--fs-weight-bold);
  letter-spacing: -0.02em;
  line-height: 1;
  text-align: center;
}
</style>
