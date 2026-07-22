<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useClientStore } from '@core/stores/clientStore'
import { useTransactionStore } from '@core/stores/transactionStore'
import { useAuditStore } from '@core/stores/auditStore'
import { TfButton, TfCard, TfBadge } from '@design/components'

const route = useRoute()
const clientStore = useClientStore()
const transactionStore = useTransactionStore()
const auditStore = useAuditStore()

const clientId = computed(() => (route.params.id as string) || 'cli-1')
const client = computed(() => clientStore.clients.find(c => c.id === clientId.value) || clientStore.clients[0])

const activeTab = ref<'overview' | 'transactions' | 'timeline' | 'requests' | 'receipts' | 'automation' | 'settings'>('overview')

const clientTxns = computed(() =>
  transactionStore.transactions.filter(t => t.clientId === client.value.id)
)

const clientEvents = computed(() =>
  auditStore.events.filter(e => e.clientId === client.value.id)
)
</script>

<template>
  <div class="client-detail-view">
    <!-- Header Card -->
    <TfCard>
      <div class="client-detail-header">
        <div class="header-main">
          <div class="avatar-lg">{{ client.name.charAt(0) }}</div>
          <div class="header-titles">
            <h2>{{ client.name }}</h2>
            <p>{{ client.email }} · {{ client.phone }} · {{ client.software }}</p>
          </div>
        </div>

        <div class="header-actions">
          <TfButton variant="secondary" as="a" href="/demo/portal">🔗 Copy Magic Link</TfButton>
          <TfButton as="a" href="/demo/import">📥 Import Bank CSV</TfButton>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="tabs-nav">
        <button
          v-for="tab in ['overview', 'transactions', 'timeline', 'requests', 'receipts', 'automation', 'settings']"
          :key="tab"
          :class="['tab-btn', { 'tab-btn--active': activeTab === tab }]"
          @click="activeTab = tab as any"
        >
          {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
        </button>
      </div>
    </TfCard>

    <!-- Tab 1: Overview -->
    <div v-if="activeTab === 'overview'" class="tab-content">
      <div class="overview-grid">
        <TfCard>
          <template #header><h3>Magic Link Status</h3></template>
          <div class="overview-metric">
            <TfBadge variant="success" dot>{{ client.magicLinkStatus.toUpperCase() }}</TfBadge>
            <p class="link-url">{{ client.magicLinkUrl }}</p>
            <span class="expiry-text">Expires: {{ client.magicLinkExpiry }}</span>
          </div>
        </TfCard>

        <TfCard>
          <template #header><h3>Clarification Summary</h3></template>
          <div class="summary-counts">
            <div class="count-box">
              <span class="count-val text-warning">{{ client.pendingCount }}</span>
              <span class="count-lbl">Pending</span>
            </div>
            <div class="count-box">
              <span class="count-val text-success">{{ client.answeredCount }}</span>
              <span class="count-lbl">Answered</span>
            </div>
            <div class="count-box">
              <span class="count-val">{{ client.totalTransactions }}</span>
              <span class="count-lbl">Total</span>
            </div>
          </div>
        </TfCard>
      </div>
    </div>

    <!-- Tab 2: Transactions -->
    <div v-else-if="activeTab === 'transactions'" class="tab-content">
      <TfCard padding="none">
        <table class="detail-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="txn in clientTxns" :key="txn.id">
              <td>{{ txn.date }}</td>
              <td class="font-bold">{{ txn.description }}</td>
              <td class="font-mono">${{ Math.abs(txn.amount).toFixed(2) }}</td>
              <td><TfBadge variant="primary">{{ txn.status }}</TfBadge></td>
              <td>{{ txn.clientAnswer || '—' }}</td>
            </tr>
          </tbody>
        </table>
      </TfCard>
    </div>

    <!-- Tab 3: Timeline -->
    <div v-else-if="activeTab === 'timeline'" class="tab-content">
      <TfCard>
        <template #header><h3>Audit Timeline for {{ client.name }}</h3></template>
        <div class="timeline-list">
          <div v-for="evt in clientEvents" :key="evt.id" class="timeline-item">
            <span class="timeline-date">{{ evt.timestamp }}</span>
            <strong>{{ evt.title }}</strong>
            <p>{{ evt.description }}</p>
          </div>
        </div>
      </TfCard>
    </div>

    <!-- Other Tabs Placeholder -->
    <div v-else class="tab-content">
      <TfCard>
        <div class="empty-tab">
          <h3>{{ activeTab.toUpperCase() }} Tab</h3>
          <p>Configured and active for {{ client.name }}.</p>
        </div>
      </TfCard>
    </div>
  </div>
</template>

<style scoped>
.client-detail-view {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-6);
}

.client-detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: var(--tf-space-4);
}

.header-main {
  display: flex;
  align-items: center;
  gap: var(--tf-space-4);
}

.avatar-lg {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--tf-primary);
  color: white;
  font-size: 1.5rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-titles h2 {
  font-size: var(--tf-text-h2-size);
  font-weight: 800;
}

.header-titles p {
  font-size: var(--tf-text-sm-size);
  color: var(--tf-text-muted);
}

.header-actions {
  display: flex;
  gap: var(--tf-space-3);
}

.tabs-nav {
  display: flex;
  gap: var(--tf-space-2);
  border-top: 1px solid var(--tf-border);
  padding-top: var(--tf-space-4);
  overflow-x: auto;
}

.tab-btn {
  padding: var(--tf-space-2) var(--tf-space-4);
  font-size: var(--tf-text-sm-size);
  font-weight: 600;
  color: var(--tf-text-secondary);
  border-radius: var(--tf-radius);
  background: none;
  border: none;
  cursor: pointer;
}

.tab-btn--active {
  background: var(--tf-primary-light);
  color: var(--tf-primary);
}

.overview-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--tf-space-6);
}

.overview-metric {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-2);
}

.link-url {
  font-family: var(--tf-font-mono);
  font-size: var(--tf-text-sm-size);
  color: var(--tf-primary);
}

.expiry-text {
  font-size: var(--tf-text-caption-size);
  color: var(--tf-text-muted);
}

.summary-counts {
  display: flex;
  gap: var(--tf-space-6);
}

.count-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.count-val {
  font-size: var(--tf-text-h1-size);
  font-weight: 800;
}

.count-lbl {
  font-size: var(--tf-text-caption-size);
  color: var(--tf-text-muted);
}

.detail-table {
  width: 100%;
  border-collapse: collapse;
}

.detail-table th, .detail-table td {
  padding: var(--tf-space-3) var(--tf-space-4);
  border-bottom: 1px solid var(--tf-border);
}

.font-bold { font-weight: 700; }
.font-mono { font-family: var(--tf-font-mono); }
.text-warning { color: var(--tf-warning-dark); }
.text-success { color: var(--tf-success-dark); }

.timeline-list {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-4);
}

.timeline-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-bottom: var(--tf-space-3);
  border-bottom: 1px solid var(--tf-border);
}

.timeline-date {
  font-size: 11px;
  color: var(--tf-text-muted);
}

.empty-tab {
  text-align: center;
  padding: var(--tf-space-8);
  color: var(--tf-text-muted);
}
</style>
