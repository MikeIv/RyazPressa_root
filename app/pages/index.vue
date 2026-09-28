<script setup lang="ts"></script>

<template>
  <div :class="$style.root">
    <h1>Рязпресса</h1>
  </div>
</template>

<style module lang="scss">
@use 'tools' as *;

.root {
  padding: var(--fs-space-3);

  @include from-tablet {
    padding: var(--fs-space-4);
  }
}
</style>
