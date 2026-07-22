<script setup lang="ts">
import { brand } from '@shared/constants/brand'
import { useRoute } from 'vue-router'
import BrandLogo from '@/components/BrandLogo.vue'

const route = useRoute()

const mainNavItems = [
  { path: '/demo', label: 'Dashboard', icon: '📊' },
  { path: '/demo/clients', label: 'Clients', icon: '👥' },
  { path: '/demo/import', label: 'Import Wizard', icon: '📥' },
  { path: '/demo/transactions', label: 'Transactions', icon: '💳' },
  { path: '/demo/links', label: 'Magic Links ⭐', icon: '🔗' },
  { path: '/demo/review', label: 'Review Queue', icon: '🔍' },
  { path: '/demo/reminders', label: 'Reminders', icon: '⏰' },
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
      <BrandLogo size="sm" />
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

  <!-- Mobile Horizontal Nav Scroll Bar for phones -->
  <nav class="mobile-nav-bar">
    <div class="mobile-nav-inner">
      <router-link
        v-for="item in mainNavItems"
        :key="item.path"
        :to="item.path"
        :class="['mobile-nav-item', { 'mobile-nav-item--active': isActive(item.path) }]"
      >
        <span class="mobile-nav-icon">{{ item.icon }}</span>
        <span class="mobile-nav-label">{{ item.label }}</span>
      </router-link>
    </div>
  </nav>
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
  padding: var(--tf-space-2);
  margin-bottom: var(--tf-space-4);
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
  padding: var(--tf-space-3);
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

/* Mobile Nav Bar */
.mobile-nav-bar {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid var(--tf-border);
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.08);
  z-index: 100;
}

.mobile-nav-inner {
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding: 6px 8px;
  gap: 4px;
}

.mobile-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  border-radius: 8px;
  text-decoration: none;
  min-width: 68px;
  flex-shrink: 0;
}

.mobile-nav-icon {
  font-size: 18px;
}

.mobile-nav-label {
  font-size: 10px;
  font-weight: 600;
  color: var(--tf-text-muted);
  white-space: nowrap;
  margin-top: 2px;
}

.mobile-nav-item--active {
  background: var(--tf-primary-light);
}

.mobile-nav-item--active .mobile-nav-label {
  color: var(--tf-primary);
  font-weight: 700;
}

@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
  .mobile-nav-bar {
    display: block;
  }
}
</style>
