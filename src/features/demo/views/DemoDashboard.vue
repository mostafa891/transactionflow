<script setup lang="ts">
import { TfMetricCard, TfButton, TfCard } from '@design/components'
</script>

<template>
  <div class="demo-dashboard">
    <div class="dashboard__metrics">
      <TfMetricCard label="Pending Clarification" :value="12" trend="down" trend-value="3 less" />
      <TfMetricCard label="Sent to Clients" :value="48" trend="up" trend-value="+8 this week" />
      <TfMetricCard label="Resolved" :value="156" trend="up" trend-value="92% rate" />
      <TfMetricCard label="Avg Response Time" value="4.2h" trend="down" trend-value="-1.5h" />
    </div>

    <div class="dashboard__body">
      <TfCard>
        <template #header>
          <div class="dashboard__card-header">
            <h3>Recent Activity</h3>
          </div>
        </template>
        <div class="activity-list">
          <div class="activity-item">
            <div class="activity-dot activity-dot--success" />
            <div class="activity-content">
              <p class="activity-text"><strong>Sarah Johnson</strong> responded to 5 questions</p>
              <span class="activity-time">2 minutes ago</span>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-dot activity-dot--primary" />
            <div class="activity-content">
              <p class="activity-text">Reminder sent to <strong>ABC Corp</strong></p>
              <span class="activity-time">15 minutes ago</span>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-dot activity-dot--warning" />
            <div class="activity-content">
              <p class="activity-text"><strong>Tech Solutions</strong> — 3 transactions overdue</p>
              <span class="activity-time">1 hour ago</span>
            </div>
          </div>
          <div class="activity-item">
            <div class="activity-dot activity-dot--success" />
            <div class="activity-content">
              <p class="activity-text">CSV imported: 24 transactions from <strong>National Bank</strong></p>
              <span class="activity-time">3 hours ago</span>
            </div>
          </div>
        </div>
      </TfCard>

      <TfCard>
        <template #header>
          <div class="dashboard__card-header">
            <h3>Quick Actions</h3>
          </div>
        </template>
        <div class="quick-actions">
          <TfButton as="a" href="/demo/import" full-width>
            📥 Import Transactions
          </TfButton>
          <TfButton variant="secondary" as="a" href="/demo/review" full-width>
            🔍 Review & Categorize
          </TfButton>
          <TfButton variant="secondary" as="a" href="/demo/portal" full-width>
            🔗 Preview Client Portal
          </TfButton>
        </div>
      </TfCard>
    </div>
  </div>
</template>

<style scoped>
.demo-dashboard {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-6);
}

.dashboard__metrics {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--tf-space-4);
}

.dashboard__body {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--tf-space-6);
}

.dashboard__card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dashboard__card-header h3 {
  font-size: var(--tf-text-base-size);
  font-weight: 600;
  color: var(--tf-text-primary);
}

.activity-list {
  display: flex;
  flex-direction: column;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: var(--tf-space-3);
  padding: var(--tf-space-4) 0;
  border-bottom: 1px solid var(--tf-border);
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-top: 6px;
  flex-shrink: 0;
}

.activity-dot--success { background: var(--tf-success); }
.activity-dot--primary { background: var(--tf-primary); }
.activity-dot--warning { background: var(--tf-warning); }

.activity-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.activity-text {
  font-size: var(--tf-text-sm-size);
  color: var(--tf-text-primary);
}

.activity-time {
  font-size: var(--tf-text-caption-size);
  color: var(--tf-text-muted);
}

.quick-actions {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-3);
}

@media (max-width: 968px) {
  .dashboard__metrics {
    grid-template-columns: repeat(2, 1fr);
  }

  .dashboard__body {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .dashboard__metrics {
    grid-template-columns: 1fr;
  }
}
</style>
