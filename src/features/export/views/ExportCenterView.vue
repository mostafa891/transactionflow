<script setup lang="ts">
import { useTransactionStore } from '@core/stores/transactionStore'
import { TfButton, TfCard } from '@design/components'

const transactionStore = useTransactionStore()

function downloadCSV() {
  const approved = transactionStore.transactions.filter(t => t.status === 'approved')
  const headers = ['Date', 'Description', 'Amount', 'Category', 'Client', 'Client Answer']
  const rows = approved.map(t => [
    t.date,
    `"${t.description.replace(/"/g, '""')}"`,
    t.amount,
    `"${(t.category || '').replace(/"/g, '""')}"`,
    `"${t.clientName.replace(/"/g, '""')}"`,
    `"${(t.clientAnswer || '').replace(/"/g, '""')}"`,
  ])

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n')
  const encodedUri = encodeURI(csvContent)
  const link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', 'categorized_transactions_export.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<template>
  <div class="export-center-view">
    <div class="ec-header">
      <div>
        <h2>CSV Export Center</h2>
        <p class="subtitle">Download categorized transactions into a clean CSV file compatible with Excel & accounting tools.</p>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="ec-summary-grid">
      <TfCard>
        <template #header><h3>Approved for Export</h3></template>
        <div class="card-count text-success">{{ transactionStore.approvedCount }}</div>
        <p class="count-sub">Ready to download in CSV format</p>
      </TfCard>

      <TfCard>
        <template #header><h3>Pending Client Clarification</h3></template>
        <div class="card-count text-warning">{{ transactionStore.pendingClientCount }}</div>
        <p class="count-sub">Awaiting client responses</p>
      </TfCard>
    </div>

    <!-- Clean Focused CSV Export Option -->
    <div class="export-options-grid">
      <TfCard padding="lg">
        <template #header>
          <div class="flex-between">
            <h3>Download Categorized Bank Statement</h3>
            <span class="badge-csv">CSV Format</span>
          </div>
        </template>

        <div class="opt-body">
          <p>
            Export all {{ transactionStore.approvedCount }} approved transactions with final categories, client notes, and receipt statuses.
            This CSV file can be opened in Microsoft Excel, Google Sheets, or imported directly into any bookkeeping software.
          </p>

          <TfButton size="lg" @click="downloadCSV">
            📥 Download Categorized CSV File
          </TfButton>
        </div>
      </TfCard>
    </div>
  </div>
</template>

<style scoped>
.export-center-view {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-6);
  max-width: 900px;
  margin: 0 auto;
}

.ec-header h2 { font-size: var(--tf-text-h2-size); font-weight: 800; }
.subtitle { font-size: var(--tf-text-sm-size); color: var(--tf-text-muted); }

.ec-summary-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--tf-space-6);
}

.card-count {
  font-size: var(--tf-text-display-size);
  font-weight: 800;
}

.count-sub {
  font-size: var(--tf-text-sm-size);
  color: var(--tf-text-muted);
}

.text-success { color: var(--tf-success-dark); }
.text-warning { color: var(--tf-warning-dark); }

.export-options-grid {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-4);
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.badge-csv {
  font-size: 11px;
  font-weight: 800;
  color: var(--tf-primary);
  background: var(--tf-primary-light);
  padding: 4px 10px;
  border-radius: var(--tf-radius-full);
}

.opt-body {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-4);
}

.opt-body p {
  font-size: var(--tf-text-sm-size);
  color: var(--tf-text-secondary);
  line-height: 1.7;
}
</style>
