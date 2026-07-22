<script setup lang="ts">
import { useTransactionStore } from '@core/stores/transactionStore'
import { TfButton, TfCard, TfBadge } from '@design/components'

const transactionStore = useTransactionStore()

function handleApprove(id: string) {
  transactionStore.updateStatus(id, 'approved', 'Travel & Meals')
}
</script>

<template>
  <div class="review-queue-view">
    <div class="rq-header">
      <div>
        <h2>Review Queue</h2>
        <p class="subtitle">Side-by-side verification of client answers & attached receipts</p>
      </div>
      <TfButton variant="secondary" @click="transactionStore.transactions.forEach(t => handleApprove(t.id))">
        ⚡ Bulk Approve High Confidence ({{ transactionStore.clientAnsweredCount }})
      </TfButton>
    </div>

    <!-- Review Queue Items -->
    <div class="queue-list">
      <div v-for="txn in transactionStore.transactions.filter(t => t.status === 'client_answered')" :key="txn.id" class="queue-card-wrap">
        <TfCard>
          <div class="side-by-side">
            <!-- Left: Original Bank Data -->
            <div class="col-side col-original">
              <span class="col-lbl">Original Bank Statement Line</span>
              <h4>{{ txn.description }}</h4>
              <p class="amount font-mono">${{ Math.abs(txn.amount).toFixed(2) }}</p>
              <span class="sub-date">Date: {{ txn.date }} · Client: {{ txn.clientName }}</span>
            </div>

            <!-- Middle: Client Answer & Receipt -->
            <div class="col-side col-answer">
              <span class="col-lbl">Client Provided Clarification</span>
              <p class="answer-text">"{{ txn.clientAnswer }}"</p>
              <div v-if="txn.receiptName" class="receipt-box">
                📎 <strong>Receipt:</strong> {{ txn.receiptName }}
              </div>
            </div>

            <!-- Right: AI Suggestion & Verification Action -->
            <div class="col-side col-action">
              <span class="col-lbl">AI Suggested Category</span>
              <TfBadge variant="success">{{ txn.suggestedCategory || 'Travel & Meals' }}</TfBadge>

              <div class="act-btns">
                <TfButton size="sm" @click="handleApprove(txn.id)">Approve & Sync</TfButton>
                <TfButton size="sm" variant="ghost">Edit Category</TfButton>
              </div>
            </div>
          </div>
        </TfCard>
      </div>

      <div v-if="transactionStore.clientAnsweredCount === 0" class="empty-queue">
        <TfCard>
          <div class="empty-text">
            <span>✅ All client answers reviewed & approved!</span>
          </div>
        </TfCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.review-queue-view {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-6);
}

.rq-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rq-header h2 { font-size: var(--tf-text-h2-size); font-weight: 800; }
.subtitle { font-size: var(--tf-text-sm-size); color: var(--tf-text-muted); }

.queue-list {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-4);
}

.side-by-side {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--tf-space-6);
}

.col-side {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-2);
}

.col-lbl {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--tf-text-muted);
}

.col-original h4 {
  font-size: var(--tf-text-base-size);
  color: var(--tf-text-primary);
}

.amount {
  font-size: var(--tf-text-h3-size);
  font-weight: 800;
}

.sub-date {
  font-size: 12px;
  color: var(--tf-text-muted);
}

.answer-text {
  font-size: var(--tf-text-sm-size);
  background: var(--tf-success-light);
  padding: var(--tf-space-3);
  border-radius: var(--tf-radius);
  font-style: italic;
}

.receipt-box {
  font-size: 12px;
  color: var(--tf-primary);
  font-weight: 600;
}

.act-btns {
  display: flex;
  gap: var(--tf-space-2);
  margin-top: var(--tf-space-3);
}

.font-mono { font-family: var(--tf-font-mono); }

.empty-text {
  text-align: center;
  padding: var(--tf-space-8);
  font-weight: 700;
  color: var(--tf-success-dark);
}

@media (max-width: 968px) {
  .side-by-side { grid-template-columns: 1fr; }
}
</style>
