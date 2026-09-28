<script setup lang="ts">
import { useFontScale } from '~/composables/useFontScale'

const { announcement, increase, decrease, canIncrease, canDecrease } = useFontScale()
</script>

<template>
  <section :class="$style.root" aria-labelledby="font-size-heading">
    <p class="visually-hidden" aria-live="polite" aria-atomic="true">{{ announcement }}</p>

    <h3 id="font-size-heading" :class="$style.heading">Увеличить размер текста</h3>

    <div :class="$style.actions" role="group" aria-label="Размер шрифта">
      <button
        type="button"
        :class="$style.actionBtn"
        :disabled="!canIncrease"
        @click="increase"
      >
        Увеличить
      </button>
      <button
        type="button"
        :class="$style.actionBtn"
        :disabled="!canDecrease"
        @click="decrease"
      >
        Уменьшить
      </button>
    </div>
  </section>
</template>

<style module lang="scss">
.root {
  display: flex;
  flex-direction: column;
  gap: var(--fs-space-2);
}

.heading {
  margin: 0;
  font-size: var(--fs-text-sm);
  font-weight: var(--fs-weight-semibold);
  color: var(--fs-color-text);
}

.actions {
  display: flex;
  gap: var(--fs-space-2);
}

.actionBtn {
  flex: 1;
  min-height: 44px;
  padding: 10px var(--fs-space-2);
  border-radius: 10px;
  font-size: var(--fs-text-sm);
  font-weight: var(--fs-weight-semibold);
  font-family: inherit;
  color: var(--site-color-primary);
  background: color-mix(in srgb, var(--site-color-primary) 10%, var(--fs-color-surface-alt));
  border: 1px solid color-mix(in srgb, var(--site-color-primary) 24%, var(--fs-color-border));
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease,
    transform 0.15s ease;

  &:hover:not(:disabled) {
    color: var(--site-color-accent);
    background: color-mix(in srgb, var(--site-color-primary) 18%, var(--fs-color-surface-alt));
    border-color: color-mix(in srgb, var(--site-color-accent) 40%, var(--fs-color-border));
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }

  &:focus-visible {
    outline-color: var(--site-color-primary);
  }
}

@media (prefers-reduced-motion: reduce) {
  .actionBtn {
    transition: none;

    &:active:not(:disabled) {
      transform: none;
    }
  }
}
</style>
