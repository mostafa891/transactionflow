import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import MarketingLayout from '@/layouts/MarketingLayout.vue'
import DemoLayout from '@/layouts/DemoLayout.vue'

const routes: RouteRecordRaw[] = [
  // ── Marketing & Auth ──
  {
    path: '/',
    component: MarketingLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@features/landing/views/HomePage.vue'),
      },
      {
        path: 'early-access',
        name: 'early-access',
        component: () => import('@features/landing/views/EarlyAccessPage.vue'),
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('@features/auth/views/LoginPage.vue'),
      },
      {
        path: 'p/:id?',
        name: 'client-portal',
        component: () => import('@features/portal/views/ClientPortalView.vue'),
      },
    ],
  },

  // ── Accountant Web App (14 Core MVP Views) ──
  {
    path: '/demo',
    component: DemoLayout,
    children: [
      {
        path: '',
        name: 'demo-dashboard',
        component: () => import('@features/dashboard/views/DashboardView.vue'),
      },
      {
        path: 'clients',
        name: 'demo-clients',
        component: () => import('@features/clients/views/ClientsView.vue'),
      },
      {
        path: 'clients/:id',
        name: 'demo-client-detail',
        component: () => import('@features/clients/views/ClientDetailView.vue'),
      },
      {
        path: 'import',
        name: 'demo-import',
        component: () => import('@features/import/views/ImportWizardView.vue'),
      },
      {
        path: 'transactions',
        name: 'demo-transactions',
        component: () => import('@features/transactions/views/TransactionsView.vue'),
      },
      {
        path: 'reminders',
        name: 'demo-reminders',
        component: () => import('@features/reminders/views/ReminderCenterView.vue'),
      },
      {
        path: 'review',
        name: 'demo-review',
        component: () => import('@features/review/views/ReviewQueueView.vue'),
      },
      {
        path: 'audit',
        name: 'demo-audit',
        component: () => import('@features/audit/views/AuditTimelineView.vue'),
      },
      {
        path: 'export',
        name: 'demo-export',
        component: () => import('@features/export/views/ExportCenterView.vue'),
      },
      {
        path: 'links',
        name: 'demo-links',
        component: () => import('@features/links/views/MagicLinkControlView.vue'),
      },
      {
        path: 'portal',
        name: 'demo-portal-preview',
        component: () => import('@features/portal/views/ClientPortalView.vue'),
      },
      {
        path: 'complete',
        name: 'demo-complete',
        component: () => import('@features/demo/views/DemoComplete.vue'),
      },
    ],
  },

  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
