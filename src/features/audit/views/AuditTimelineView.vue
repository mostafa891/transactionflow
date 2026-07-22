<script setup lang="ts">
import { useAuditStore } from '@core/stores/auditStore'
import { TfCard, TfBadge } from '@design/components'

const auditStore = useAuditStore()
</script>

<template>
  <div class="audit-timeline-view">
    <div class="at-header">
      <div>
        <h2>Audit Trail / Compliance Timeline ⭐</h2>
        <p class="subtitle">Complete legal proof of client communication, link opens, reminders, and approvals</p>
      </div>
    </div>

    <!-- Timeline List -->
    <TfCard padding="none">
      <div class="audit-stream">
        <div v-for="evt in auditStore.events" :key="evt.id" class="stream-row">
          <div class="stream-time">{{ evt.timestamp }}</div>
          <div class="stream-badge">
            <TfBadge :variant="evt.status === 'success' ? 'success' : 'primary'">
              {{ evt.eventType.replace('_', ' ').toUpperCase() }}
            </TfBadge>
          </div>
          <div class="stream-content">
            <strong>{{ evt.title }}</strong>
            <p>{{ evt.description }}</p>
            <div class="stream-meta">
              <span>Actor: {{ evt.actor }}</span>
              <span v-if="evt.channel">Channel: {{ evt.channel }}</span>
              <span v-if="evt.ipAddress">IP: {{ evt.ipAddress }}</span>
            </div>
          </div>
        </div>
      </div>
    </TfCard>
  </div>
</template>

<style scoped>
.audit-timeline-view {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-6);
}

.at-header h2 { font-size: var(--tf-text-h2-size); font-weight: 800; }
.subtitle { font-size: var(--tf-text-sm-size); color: var(--tf-text-muted); }

.audit-stream {
  display: flex;
  flex-direction: column;
}

.stream-row {
  display: grid;
  grid-template-columns: 160px 180px 1fr;
  gap: var(--tf-space-4);
  padding: var(--tf-space-4) var(--tf-space-6);
  border-bottom: 1px solid var(--tf-border);
  align-items: flex-start;
}

.stream-row:last-child { border-bottom: none; }

.stream-time {
  font-size: 12px;
  font-family: var(--tf-font-mono);
  color: var(--tf-text-muted);
}

.stream-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stream-content strong {
  font-size: var(--tf-text-sm-size);
  color: var(--tf-text-primary);
}

.stream-content p {
  font-size: var(--tf-text-sm-size);
  color: var(--tf-text-secondary);
}

.stream-meta {
  display: flex;
  gap: var(--tf-space-4);
  font-size: 11px;
  color: var(--tf-text-muted);
  margin-top: 4px;
}

@media (max-width: 768px) {
  .stream-row { grid-template-columns: 1fr; }
}
</style>
