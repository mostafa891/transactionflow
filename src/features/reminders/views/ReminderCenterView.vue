<script setup lang="ts">
import { ref } from 'vue'
import { useReminderStore } from '@core/stores/reminderStore'
import { TfButton, TfCard, TfBadge } from '@design/components'

const reminderStore = useReminderStore()
const activeTab = ref<'logs' | 'templates' | 'rules'>('logs')
</script>

<template>
  <div class="reminder-center-view">
    <div class="rc-header">
      <div>
        <h2>Reminder Center ⭐</h2>
        <p class="subtitle">Automated multi-channel follow-up engine (Email → SMS → WhatsApp)</p>
      </div>
      <TfButton size="md">+ New Reminder Rule</TfButton>
    </div>

    <!-- Navigation Tabs -->
    <div class="rc-tabs">
      <button
        v-for="t in ['logs', 'templates', 'rules']"
        :key="t"
        :class="['tab-btn', { 'tab-btn--active': activeTab === t }]"
        @click="activeTab = t as any"
      >
        {{ t.toUpperCase() }}
      </button>
    </div>

    <!-- Tab 1: Delivery Logs -->
    <div v-if="activeTab === 'logs'" class="tab-sec">
      <TfCard padding="none">
        <template #header><h3>Recent Delivery Logs</h3></template>
        <table class="rc-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Channel</th>
              <th>Status</th>
              <th>Sent Time</th>
              <th>Attempts</th>
              <th>Link Opened</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in reminderStore.logs" :key="log.id">
              <td class="font-bold">{{ log.clientName }}</td>
              <td><TfBadge variant="neutral">{{ log.channel.toUpperCase() }}</TfBadge></td>
              <td>
                <TfBadge :variant="log.status === 'opened' || log.status === 'clicked' ? 'success' : 'primary'" dot>
                  {{ log.status.toUpperCase() }}
                </TfBadge>
              </td>
              <td class="text-muted">{{ log.sentAt }}</td>
              <td>#{{ log.attempts }}</td>
              <td>{{ log.linkOpenedAt || '—' }}</td>
            </tr>
          </tbody>
        </table>
      </TfCard>
    </div>

    <!-- Tab 2: Message Templates -->
    <div v-else-if="activeTab === 'templates'" class="tab-sec">
      <div class="templates-grid">
        <TfCard v-for="tmpl in reminderStore.templates" :key="tmpl.id">
          <template #header>
            <div class="tmpl-header flex-between">
              <strong>{{ tmpl.name }}</strong>
              <TfBadge variant="primary">{{ tmpl.channel.toUpperCase() }}</TfBadge>
            </div>
          </template>
          <div class="tmpl-body">
            <p v-if="tmpl.subject" class="tmpl-subj"><strong>Subject:</strong> {{ tmpl.subject }}</p>
            <pre class="tmpl-text">{{ tmpl.body }}</pre>
            <div class="tmpl-vars">
              <span class="v-lbl">Variables:</span>
              <span v-for="v in tmpl.variables" :key="v" class="var-tag">&#123;&#123;{{ v }}&#125;&#125;</span>
            </div>
          </div>
        </TfCard>
      </div>
    </div>

    <!-- Tab 3: Rules & Escalation -->
    <div v-else-if="activeTab === 'rules'" class="tab-sec">
      <TfCard v-for="rule in reminderStore.rules" :key="rule.id">
        <template #header><h3>{{ rule.name }}</h3></template>
        <div class="rule-details">
          <p><strong>Frequency:</strong> Every {{ rule.frequencyDays }} days</p>
          <p><strong>Stop on Reply:</strong> {{ rule.stopOnReply ? 'Yes (Auto-Disable)' : 'No' }}</p>
          <p><strong>Max Attempts:</strong> {{ rule.maxAttempts }} follow-ups max</p>
          <p><strong>Escalation Schedule:</strong> Email (Day 0) → SMS (Day {{ rule.escalateToSmsAfterDays }}) → WhatsApp (Day {{ rule.escalateToWhatsappAfterDays }})</p>
        </div>
      </TfCard>
    </div>
  </div>
</template>

<style scoped>
.reminder-center-view {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-6);
}

.rc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rc-header h2 { font-size: var(--tf-text-h2-size); font-weight: 800; }
.subtitle { font-size: var(--tf-text-sm-size); color: var(--tf-text-muted); }

.rc-tabs {
  display: flex;
  gap: var(--tf-space-2);
}

.tab-btn {
  padding: var(--tf-space-2) var(--tf-space-4);
  border: 1px solid var(--tf-border);
  border-radius: var(--tf-radius-full);
  background: var(--tf-surface);
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
}

.tab-btn--active {
  background: var(--tf-primary-light);
  border-color: var(--tf-primary);
  color: var(--tf-primary);
}

.rc-table {
  width: 100%;
  border-collapse: collapse;
}

.rc-table th, .rc-table td {
  padding: var(--tf-space-3) var(--tf-space-4);
  border-bottom: 1px solid var(--tf-border);
  text-align: left;
}

.font-bold { font-weight: 700; }
.text-muted { color: var(--tf-text-muted); font-size: 12px; }

.templates-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--tf-space-6);
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tmpl-body {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-3);
}

.tmpl-subj { font-size: var(--tf-text-sm-size); }

.tmpl-text {
  font-family: inherit;
  font-size: var(--tf-text-sm-size);
  color: var(--tf-text-secondary);
  background: var(--tf-bg);
  padding: var(--tf-space-3);
  border-radius: var(--tf-radius);
  white-space: pre-wrap;
}

.tmpl-vars {
  display: flex;
  gap: 6px;
  align-items: center;
  flex-wrap: wrap;
}

.v-lbl { font-size: 11px; color: var(--tf-text-muted); }

.var-tag {
  font-size: 11px;
  font-family: var(--tf-font-mono);
  background: var(--tf-primary-light);
  color: var(--tf-primary);
  padding: 2px 6px;
  border-radius: 4px;
}

.rule-details {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-2);
  font-size: var(--tf-text-sm-size);
}
</style>
