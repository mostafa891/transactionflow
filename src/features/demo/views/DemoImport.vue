<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { TfButton, TfCard } from '@design/components'

const router = useRouter()

const sampleData = [
  { date: '2026-07-15', description: 'AMZN Mktp US*2K9X4', amount: -89.99, category: '' },
  { date: '2026-07-14', description: 'UBER TRIP 7X2K9', amount: -24.50, category: '' },
  { date: '2026-07-14', description: 'ADOBE *CREATIVE', amount: -54.99, category: 'Software' },
  { date: '2026-07-13', description: 'TRANSFER FROM CHK', amount: 5000.00, category: '' },
  { date: '2026-07-12', description: 'STAPLES #0872', amount: -142.33, category: '' },
  { date: '2026-07-11', description: 'GOOGLE *ADS', amount: -350.00, category: 'Marketing' },
  { date: '2026-07-10', description: 'CHECK #1847', amount: -1200.00, category: '' },
  { date: '2026-07-09', description: 'SQ *COFFEE SHOP', amount: -18.75, category: '' },
]

const step = ref<'upload' | 'preview'>('upload')
const isDragging = ref(false)
const transactions = ref(sampleData)

function useSampleData() {
  step.value = 'preview'
}

function handleDrop() {
  isDragging.value = false
  step.value = 'preview'
}

function continueToReview() {
  router.push('/demo/review')
}
</script>

<template>
  <div class="demo-import">
    <!-- Step 1: Upload -->
    <div v-if="step === 'upload'" class="import-upload tf-animate-fade-up">
      <TfCard padding="lg">
        <div class="upload-zone"
          :class="{ 'upload-zone--active': isDragging }"
          @dragenter.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @dragover.prevent
          @drop.prevent="handleDrop"
        >
          <div class="upload-icon">📄</div>
          <h3 class="upload-title">Drop your bank CSV here</h3>
          <p class="upload-desc">or click to browse files (CSV, Excel)</p>
          <input type="file" class="upload-input" accept=".csv,.xlsx,.xls" />
        </div>

        <div class="upload-divider">
          <span>or</span>
        </div>

        <TfButton variant="secondary" full-width size="lg" @click="useSampleData">
          📊 Use Sample Data (8 transactions)
        </TfButton>
      </TfCard>
    </div>

    <!-- Step 2: Preview -->
    <div v-else class="import-preview tf-animate-fade-up">
      <TfCard padding="none">
        <template #header>
          <div class="preview-header">
            <div>
              <h3>Preview: 8 transactions imported</h3>
              <p class="preview-subtitle">5 need categorization · 3 already categorized</p>
            </div>
          </div>
        </template>

        <div class="preview-table-wrap">
          <table class="preview-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(txn, i) in transactions" :key="i" :class="{ 'row--uncategorized': !txn.category }">
                <td class="cell-date">{{ txn.date }}</td>
                <td class="cell-desc">{{ txn.description }}</td>
                <td :class="['cell-amount', txn.amount >= 0 ? 'cell-amount--positive' : '']">
                  {{ txn.amount >= 0 ? '+' : '' }}${{ Math.abs(txn.amount).toFixed(2) }}
                </td>
                <td>
                  <span v-if="txn.category" class="cat-badge cat-badge--done">{{ txn.category }}</span>
                  <span v-else class="cat-badge cat-badge--pending">Needs Review</span>
                </td>
                <td>
                  <span v-if="txn.category" class="status-dot status-dot--done" />
                  <span v-else class="status-dot status-dot--pending" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <template #footer>
          <div class="preview-footer">
            <TfButton variant="ghost" @click="step = 'upload'">← Back</TfButton>
            <TfButton @click="continueToReview">
              Continue to Review →
            </TfButton>
          </div>
        </template>
      </TfCard>
    </div>
  </div>
</template>

<style scoped>
.demo-import {
  max-width: 900px;
  margin: 0 auto;
}

/* ── Upload Zone ── */
.upload-zone {
  border: 2px dashed var(--tf-border);
  border-radius: var(--tf-radius-lg);
  padding: var(--tf-space-12) var(--tf-space-8);
  text-align: center;
  transition: var(--tf-transition-all);
  position: relative;
  cursor: pointer;
}

.upload-zone:hover,
.upload-zone--active {
  border-color: var(--tf-primary);
  background: var(--tf-primary-light);
}

.upload-icon { font-size: 3rem; margin-bottom: var(--tf-space-4); }
.upload-title { font-size: var(--tf-text-h3-size); font-weight: 700; color: var(--tf-text-primary); }
.upload-desc { font-size: var(--tf-text-sm-size); color: var(--tf-text-muted); margin-top: var(--tf-space-2); }
.upload-input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }

.upload-divider {
  display: flex;
  align-items: center;
  gap: var(--tf-space-4);
  margin: var(--tf-space-6) 0;
  color: var(--tf-text-muted);
  font-size: var(--tf-text-sm-size);
}

.upload-divider::before,
.upload-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--tf-border);
}

/* ── Preview Table ── */
.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.preview-header h3 {
  font-size: var(--tf-text-base-size);
  font-weight: 600;
}

.preview-subtitle {
  font-size: var(--tf-text-sm-size);
  color: var(--tf-text-muted);
  margin-top: 2px;
}

.preview-table-wrap {
  overflow-x: auto;
}

.preview-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--tf-text-sm-size);
}

.preview-table th {
  text-align: left;
  padding: var(--tf-space-3) var(--tf-space-4);
  font-weight: 600;
  color: var(--tf-text-muted);
  font-size: var(--tf-text-caption-size);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid var(--tf-border);
  background: var(--tf-bg);
}

.preview-table td {
  padding: var(--tf-space-3) var(--tf-space-4);
  border-bottom: 1px solid var(--tf-border);
  color: var(--tf-text-primary);
}

.row--uncategorized {
  background: #FFFBEB;
}

.cell-date { color: var(--tf-text-muted); white-space: nowrap; }
.cell-desc { font-weight: 500; }
.cell-amount { font-family: var(--tf-font-mono); font-weight: 600; white-space: nowrap; }
.cell-amount--positive { color: var(--tf-success-dark); }

.cat-badge {
  display: inline-flex;
  padding: 2px 8px;
  border-radius: var(--tf-radius-full);
  font-size: 11px;
  font-weight: 600;
}

.cat-badge--done { background: var(--tf-success-light); color: var(--tf-success-dark); }
.cat-badge--pending { background: var(--tf-warning-light); color: var(--tf-warning-dark); }

.status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-dot--done { background: var(--tf-success); }
.status-dot--pending { background: var(--tf-warning); animation: tf-pulse 2s infinite; }

.preview-footer {
  display: flex;
  justify-content: space-between;
}
</style>
