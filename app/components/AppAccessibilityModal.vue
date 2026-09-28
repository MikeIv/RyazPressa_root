<script setup lang="ts">
import { useAccessibilityModal } from '~/composables/useAccessibilityModal'

const { isOpen, close, triggerEl } = useAccessibilityModal()
const closeBtnRef = ref<HTMLButtonElement | null>(null)

watch(isOpen, async (open) => {
  if (!open) {
    triggerEl.value?.focus()
    return
  }

  await nextTick()
  closeBtnRef.value?.focus()
})
</script>

<template>
  <Teleport to="body">
    <template v-if="isOpen">
      <button
        type="button"
        :class="$style.backdrop"
        aria-label="Закрыть окно настроек доступности"
        @click="close"
      />

      <div
        :class="$style.dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="accessibility-modal-title"
      >
        <div :class="$style.header">
          <h2 id="accessibility-modal-title" :class="$style.title">
            Версия сайта для людей с ограниченными возможностями
          </h2>
          <button
            ref="closeBtnRef"
            type="button"
            :class="$style.closeBtn"
            aria-label="Закрыть"
            @click="close"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                fill="currentColor"
                d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z"
              />
            </svg>
          </button>
        </div>

        <div :class="$style.body">
          <AppFontSizeControl />
        </div>
      </div>
    </template>
  </Teleport>
</template>

<style module lang="scss">
.backdrop {
  position: fixed;
  inset: 0;
  z-index: 190;
  border: none;
  padding: 0;
  margin: 0;
  background: rgb(0 0 0 / 45%);
  cursor: pointer;
  animation: backdrop-in 0.2s ease;
}

.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 200;
  width: min(calc(100vw - 2 * var(--fs-space-3)), 360px);
  padding: var(--fs-space-3);
  background: var(--fs-color-bg);
  border: 1px solid var(--fs-color-border);
  border-radius: 16px;
  box-shadow: 0 12px 40px rgb(0 0 0 / 18%);
  transform: translate(-50%, -50%);
  animation: dialog-in 0.25s cubic-bezier(0.32, 0.72, 0, 1);
}

.header {
  display: flex;
  align-items: flex-start;
  gap: var(--fs-space-2);
  margin-bottom: var(--fs-space-3);
}

.title {
  flex: 1;
  min-width: 0;
  margin: 0;
  font-size: var(--fs-text-base);
  font-weight: var(--fs-weight-bold);
  line-height: 1.35;
  color: var(--fs-color-text);
}

.closeBtn {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: var(--fs-color-text-muted);
  background: var(--fs-color-surface-alt);
  transition:
    background-color 0.15s ease,
    color 0.15s ease;

  svg {
    display: block;
    width: 18px;
    height: 18px;
  }

  &:hover {
    color: var(--site-color-primary);
    background: color-mix(in srgb, var(--site-color-primary) 12%, var(--fs-color-surface-alt));
  }

  &:focus-visible {
    outline-color: var(--site-color-primary);
  }
}

.body {
  padding-top: var(--fs-space-1);
  border-top: 1px solid var(--fs-color-border);
}

@keyframes backdrop-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes dialog-in {
  from {
    opacity: 0;
    transform: translate(-50%, calc(-50% + 12px));
  }

  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .backdrop,
  .dialog {
    animation: none;
  }
}
</style>
