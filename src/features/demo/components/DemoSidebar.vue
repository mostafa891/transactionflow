<script setup lang="ts">
import { brand } from '@shared/constants/brand'
import { useRoute } from 'vue-router'

const route = useRoute()

const mainNavItems = [
  { path: '/demo', label: 'Dashboard', icon: '📊' },
  { path: '/demo/clients', label: 'Clients', icon: '👥' },
  { path: '/demo/import', label: 'Import Wizard', icon: '📥' },
  { path: '/demo/transactions', label: 'Transactions', icon: '💳' },
  { path: '/demo/links', label: 'Magic Links ⭐', icon: '🔗' },
  { path: '/demo/review', label: 'Review Queue', icon: '🔍' },
  { path: '/demo/reminders', label: 'Reminder Center', icon: '⏰' },
  { path: '/demo/audit', label: 'Audit Trail', icon: '📜' },
  { path: '/demo/export', label: 'Export CSV', icon: '📤' },
  { path: '/demo/portal', label: 'Client Portal', icon: '📱' },
]

const isActive = (path: string) => {
  if (path === '/demo') return route.path === '/demo'
  return route.path.startsWith(path)
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__brand">
      <div class="sidebar__logo">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="#0066FF"/>
          <path d="M8 12H24M8 16H20M8 20H16" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="sidebar__brand-text">
        <span class="sidebar__name">{{ brand.name }}</span>
        <span class="sidebar__demo-tag">MVP DEMO</span>
      </div>
    </div>

    <nav class="sidebar__nav">
      <router-link
        v-for="item in mainNavItems"
        :key="item.path"
        :to="item.path"
        :class="['sidebar__link', { 'sidebar__link--active': isActive(item.path) }]"
      >
        <span class="sidebar__link-icon">{{ item.icon }}</span>
        <span class="sidebar__link-label">{{ item.label }}</span>
      </router-link>
    </nav>

    <div class="sidebar__footer">
      <router-link to="/early-access" class="sidebar__cta">
        ⭐ Join Waitlist
      </router-link>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 250px;
  background: var(--tf-surface);
  border-right: 1px solid var(--tf-border);
  display: flex;
  flex-direction: column;
  padding: var(--tf-space-4);
  flex-shrink: 0;
}

.sidebar__brand {
  display: flex;
  align-items: center;
  gap: var(--tf-space-3);
  padding: var(--tf-space-2) var(--tf-space-2);
  margin-bottom: var(--tf-space-4);
}

.sidebar__brand-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sidebar__name {
  font-weight: 700;
  font-size: var(--tf-text-base-size);
  color: var(--tf-text-primary);
  letter-spacing: -0.01em;
}

.sidebar__demo-tag {
  font-size: 9px;
  font-weight: 800;
  color: var(--tf-primary);
  background: var(--tf-primary-light);
  padding: 2px 6px;
  border-radius: var(--tf-radius-sm);
  letter-spacing: 0.08em;
  align-self: flex-start;
}

.sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  overflow-y: auto;
}

.sidebar__link {
  display: flex;
  align-items: center;
  gap: var(--tf-space-3);
  padding: var(--tf-space-3) var(--tf-space-3);
  border-radius: var(--tf-radius);
  font-size: var(--tf-text-sm-size);
  font-weight: 500;
  color: var(--tf-text-secondary);
  text-decoration: none;
  transition: var(--tf-transition-colors);
}

.sidebar__link:hover {
  background: var(--tf-surface-hover);
  color: var(--tf-text-primary);
}

.sidebar__link--active {
  background: var(--tf-primary-light);
  color: var(--tf-primary);
  font-weight: 600;
}

.sidebar__link-icon {
  font-size: 16px;
  width: 24px;
  text-align: center;
}

.sidebar__footer {
  padding-top: var(--tf-space-4);
  border-top: 1px solid var(--tf-border);
}

.sidebar__cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--tf-space-2);
  padding: var(--tf-space-3);
  background: linear-gradient(135deg, var(--tf-primary), #4F46E5);
  color: white;
  border-radius: var(--tf-radius);
  font-size: var(--tf-text-sm-size);
  font-weight: 600;
  text-decoration: none;
  transition: var(--tf-transition-all);
}

.sidebar__cta:hover {
  opacity: 0.95;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}
</style>
