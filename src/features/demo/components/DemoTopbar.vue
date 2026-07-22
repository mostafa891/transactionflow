<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    'demo-dashboard': 'Dashboard',
    'demo-import': 'Import Transactions',
    'demo-review': 'Review Transactions',
    'demo-portal': 'Client Portal Preview',
    'demo-complete': 'All Done!',
  }
  return titles[route.name as string] || 'Demo'
})
</script>

<template>
  <header class="topbar">
    <h1 class="topbar__title">{{ pageTitle }}</h1>
    <div class="topbar__actions">
      <div class="topbar__banner">
        🎮 <span>You're in demo mode</span>
        <router-link to="/" class="topbar__exit">Exit Demo</router-link>
      </div>
    </div>
  </header>
</template>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--tf-space-4) var(--tf-space-6);
  background: var(--tf-surface);
  border-bottom: 1px solid var(--tf-border);
  height: 60px;
  flex-shrink: 0;
}

.topbar__title {
  font-size: var(--tf-text-h3-size);
  font-weight: 700;
  color: var(--tf-text-primary);
  letter-spacing: -0.01em;
}

.topbar__banner {
  display: flex;
  align-items: center;
  gap: var(--tf-space-2);
  padding: var(--tf-space-2) var(--tf-space-4);
  background: var(--tf-warning-light);
  border: 1px solid #FDE68A;
  border-radius: var(--tf-radius-full);
  font-size: var(--tf-text-caption-size);
  font-weight: 500;
  color: var(--tf-warning-dark);
}

.topbar__exit {
  font-weight: 700;
  color: var(--tf-warning-dark);
  text-decoration: underline;
  margin-left: var(--tf-space-2);
}

@media (max-width: 768px) {
  .topbar__banner span {
    display: none;
  }
}
</style>
