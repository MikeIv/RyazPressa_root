<template>
  <div :class="$style.root">
    <a href="#main-content" class="skip-link">Перейти к основному содержимому</a>
    <AppHeader />
    <main id="main-content" :class="$style.main" tabindex="-1">
      <div class="site-shell">
        <slot />
      </div>
    </main>

    <AppFooter />
    <AppAccessibilityModal />
  </div>
</template>

<style module lang="scss">
.root {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

.main {
  flex: 1;
  min-width: 0;

  &:focus {
    outline: none;
  }
}
</style>
