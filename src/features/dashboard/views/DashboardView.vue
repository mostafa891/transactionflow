<script setup lang="ts">
import { useClientStore } from '@core/stores/clientStore'
import { useTransactionStore } from '@core/stores/transactionStore'
import { useAuditStore } from '@core/stores/auditStore'
import { TfMetricCard, TfButton, TfCard, TfBadge } from '@design/components'

const clientStore = useClientStore()
const transactionStore = useTransactionStore()
const auditStore = useAuditStore()
</script>

<template>
  <div class="dashboard-view">
    <!-- KPI Row -->
    <div class="dashboard-view__kpis">
      <TfMetricCard label="Pending Clarification" :value="transactionStore.pendingClientCount" trend="down" trend-value="3 less" />
      <TfMetricCard label="Waiting Clients" :value="clientStore.totalPending" trend="neutral" trend-value="Active links" />
      <TfMetricCard label="Overdue (> 7 days)" :value="1" trend="down" trend-value="Delta Group" />
      <TfMetricCard label="Needs Review" :value="transactionStore.clientAnsweredCount" trend="up" trend-value="Ready for approval" />
      <TfMetricCard label="Completed Month" :value="transactionStore.approvedCount" trend="up" trend-value="92% rate" />
      <TfMetricCard label="Avg Response Time" value="4.2h" trend="down" trend-value="-1.5h" />
    </div>

    <!-- Main Section Grid -->
    <div class="dashboard-view__main-grid">
      <!-- Left Column: Activity Feed & Chart -->
      <div class="dashboard-view__left">
        <!-- Monthly Trend Chart -->
        <TfCard>
          <template #header>
            <div class="card-header-flex">
              <h3>Clarifications & Response Rate Trend</h3>
              <TfBadge variant="success">92% Average Success Rate</TfBadge>
            </div>
          </template>
          <div class="chart-mockup">
            <div class="chart-bars">
              <div class="bar-group" v-for="(item, i) in [
                { month: 'Apr', val: 40 },
                { month: 'May', val: 65 },
                { month: 'Jun', val: 85 },
                { month: 'Jul', val: 120 }
              ]" :key="i">
                <div class="bar" :style="{ height: item.val + 'px' }" />
                <span class="bar-label">{{ item.month }}</span>
              </div>
            </div>
          </div>
        </TfCard>

        <!-- Activity Feed -->
        <TfCard>
          <template #header>
            <div class="card-header-flex">
              <h3>Live Activity Feed</h3>
              <router-link to="/demo/audit" class="link-sm">View Audit Log →</router-link>
            </div>
          </template>
          <div class="activity-feed">
            <div v-for="evt in auditStore.events" :key="evt.id" class="activity-feed__item">
              <div :class="['feed-icon', `feed-icon--${evt.status}`]">
                {{ evt.eventType.includes('approved') ? '✅' : evt.eventType.includes('client') ? '📱' : '✉️' }}
              </div>
              <div class="feed-content">
                <div class="feed-title">
                  <strong>{{ evt.actor }}</strong> — {{ evt.title }}
                </div>
                <p class="feed-desc">{{ evt.description }}</p>
                <span class="feed-time">{{ evt.timestamp }}</span>
              </div>
            </div>
          </div>
        </TfCard>
      </div>

      <!-- Right Column: Needs Attention & Quick Actions -->
      <div class="dashboard-view__right">
        <!-- Needs Attention Widget -->
        <TfCard>
          <template #header>
            <div class="card-header-flex">
              <h3 class="title-attention">⚠️ Needs Attention</h3>
            </div>
          </template>
          <div class="attention-list">
            <div class="attention-item attention-item--danger">
              <span class="attention-badge">Expired Link</span>
              <strong>Delta Construction Group</strong>
              <p>Magic link expired on July 20. 8 transactions waiting.</p>
              <TfButton size="sm" variant="secondary" as="a" href="/demo/reminders">Resend Link</TfButton>
            </div>

            <div class="attention-item attention-item--warning">
              <span class="attention-badge">High Value ($5,000)</span>
              <strong>Brightline Marketing Studio</strong>
              <p>Large wire transfer needs custom classification.</p>
              <TfButton size="sm" variant="secondary" as="a" href="/demo/transactions">Review Txn</TfButton>
            </div>
          </div>
        </TfCard>

        <!-- Quick Workflow Actions -->
        <TfCard>
          <template #header>
            <h3>Quick Workflow</h3>
          </template>
          <div class="workflow-btns">
            <TfButton as="a" href="/demo/import" full-width>📥 Import Bank CSV</TfButton>
            <TfButton variant="secondary" as="a" href="/demo/transactions" full-width>💳 Categorize Transactions</TfButton>
            <TfButton variant="secondary" as="a" href="/demo/review" full-width>🔍 Verify Responses</TfButton>
            <TfButton variant="secondary" as="a" href="/demo/export" full-width>📤 Export to Accounting</TfButton>
          </div>
        </TfCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-view {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-6);
}

.dashboard-view__kpis {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--tf-space-4);
}

.dashboard-view__main-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--tf-space-6);
}

.dashboard-view__left,
.dashboard-view__right {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-6);
}

.card-header-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-header-flex h3 {
  font-size: var(--tf-text-base-size);
  font-weight: 700;
  color: var(--tf-text-primary);
}

.link-sm {
  font-size: var(--tf-text-sm-size);
  font-weight: 600;
}

.chart-mockup {
  height: 160px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: var(--tf-space-4) 0;
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  gap: var(--tf-space-8);
}

.bar-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--tf-space-2);
}

.bar {
  width: 36px;
  background: linear-gradient(180deg, var(--tf-primary) 0%, #818CF8 100%);
  border-radius: var(--tf-radius-sm) var(--tf-radius-sm) 0 0;
  transition: height 0.5s ease;
}

.bar-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--tf-text-muted);
}

.activity-feed {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-4);
}

.activity-feed__item {
  display: flex;
  gap: var(--tf-space-4);
  padding-bottom: var(--tf-space-3);
  border-bottom: 1px solid var(--tf-border);
}

.activity-feed__item:last-child {
  border-bottom: none;
}

.feed-icon {
  font-size: 1.25rem;
  width: 36px;
  height: 36px;
  border-radius: var(--tf-radius);
  background: var(--tf-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.feed-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.feed-title {
  font-size: var(--tf-text-sm-size);
  color: var(--tf-text-primary);
}

.feed-desc {
  font-size: var(--tf-text-sm-size);
  color: var(--tf-text-secondary);
}

.feed-time {
  font-size: var(--tf-text-caption-size);
  color: var(--tf-text-muted);
  margin-top: 2px;
}

.title-attention {
  color: var(--tf-warning-dark);
}

.attention-list {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-4);
}

.attention-item {
  padding: var(--tf-space-4);
  border-radius: var(--tf-radius);
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-2);
}

.attention-item--danger {
  background: #FEF2F2;
  border: 1px solid #FCA5A5;
}

.attention-item--warning {
  background: #FFFBEB;
  border: 1px solid #FCD34D;
}

.attention-badge {
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 2px 6px;
  border-radius: var(--tf-radius-sm);
  align-self: flex-start;
  background: rgba(0, 0, 0, 0.05);
}

.workflow-btns {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-3);
}

@media (max-width: 1200px) {
  .dashboard-view__kpis {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 968px) {
  .dashboard-view__main-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-view__kpis {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .dashboard-view__kpis {
    grid-template-columns: 1fr;
  }
  .chart-bars {
    gap: var(--tf-space-4);
  }
  .card-header-flex {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
