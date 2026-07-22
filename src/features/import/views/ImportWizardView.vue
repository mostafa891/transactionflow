<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTransactionStore } from '@core/stores/transactionStore'
import { TfButton, TfCard, TfBadge } from '@design/components'

const router = useRouter()
const transactionStore = useTransactionStore()

const currentStep = ref(1)

const steps = [
  '1. Upload',
  '2. Preview',
  '3. Column Mapping',
  '4. Validation',
  '5. AI Analysis',
  '6. Import Complete',
]

// Step 3 Mappings
const mappings = ref({
  date: 'Date',
  description: 'Description',
  amount: 'Amount',
  memo: 'Memo',
})

// Sample parsed rows
const parsedRows = ref([
  { date: '2026-07-20', desc: 'AMZN Mktp US*9K11A', amount: '-149.99', memo: 'Prime Business' },
  { date: '2026-07-19', desc: 'SQUARE *BAGEL SHOP', amount: '-12.50', memo: '' },
  { date: '2026-07-18', desc: 'WIRE IN *CLIENT PAYMENT', amount: '3500.00', memo: 'Ref #99120' },
  { date: '2026-07-17', desc: 'CHEVRON 002918', amount: '-45.00', memo: 'Gas Fuel' },
])

function nextStep() {
  if (currentStep.value < 6) {
    currentStep.value++
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

function finishImport() {
  // Add to store
  transactionStore.addTransactions(
    parsedRows.value.map(row => ({
      date: row.date,
      description: row.desc,
      bankMemo: row.memo,
      amount: parseFloat(row.amount),
      currency: 'USD',
      clientId: 'cli-1',
      clientName: 'Acme Logistics Inc.',
      suggestedCategory: parseFloat(row.amount) > 0 ? 'Revenue' : 'Office Supplies',
      aiConfidence: 0.85,
      status: 'uncategorized',
    }))
  )
  router.push('/demo/transactions')
}
</script>

<template>
  <div class="import-wizard-view">
    <!-- Wizard Progress Header -->
    <TfCard>
      <div class="wizard-header">
        <h2>CSV Import Wizard</h2>
        <div class="wizard-steps">
          <div
            v-for="(stepName, i) in steps"
            :key="i"
            :class="['step-pill', { 'step-pill--active': currentStep === i + 1, 'step-pill--done': currentStep > i + 1 }]"
          >
            {{ stepName }}
          </div>
        </div>
      </div>
    </TfCard>

    <!-- Step 1: Upload CSV -->
    <div v-if="currentStep === 1" class="wizard-content">
      <TfCard padding="lg">
        <div class="dropzone" @click="nextStep">
          <div class="dz-icon">📄</div>
          <h3>Drag & Drop your Bank CSV Statement</h3>
          <p>Supports Chase, Bank of America, Wells Fargo, QuickBooks CSV exports</p>
          <TfButton size="md" @click.stop="nextStep">Choose CSV File</TfButton>
        </div>
      </TfCard>
    </div>

    <!-- Step 2: Raw Preview -->
    <div v-else-if="currentStep === 2" class="wizard-content">
      <TfCard padding="none">
        <template #header><h3>Step 2: Preview Raw CSV File</h3></template>
        <table class="wiz-table">
          <thead>
            <tr><th>Date</th><th>Description</th><th>Amount</th><th>Memo</th></tr>
          </thead>
          <tbody>
            <tr v-for="(row, idx) in parsedRows" :key="idx">
              <td>{{ row.date }}</td>
              <td>{{ row.desc }}</td>
              <td>{{ row.amount }}</td>
              <td>{{ row.memo || '—' }}</td>
            </tr>
          </tbody>
        </table>
      </TfCard>
    </div>

    <!-- Step 3: Column Mapping -->
    <div v-else-if="currentStep === 3" class="wizard-content">
      <TfCard>
        <template #header><h3>Step 3: Column Mapping</h3></template>
        <div class="mapping-grid">
          <div class="map-row">
            <label>Transaction Date Field:</label>
            <select v-model="mappings.date" class="wiz-select"><option>Date</option></select>
          </div>
          <div class="map-row">
            <label>Description / Payee Field:</label>
            <select v-model="mappings.description" class="wiz-select"><option>Description</option></select>
          </div>
          <div class="map-row">
            <label>Transaction Amount Field:</label>
            <select v-model="mappings.amount" class="wiz-select"><option>Amount</option></select>
          </div>
          <div class="map-row">
            <label>Bank Memo / Ref Field:</label>
            <select v-model="mappings.memo" class="wiz-select"><option>Memo</option></select>
          </div>
        </div>
      </TfCard>
    </div>

    <!-- Step 4: Validation -->
    <div v-else-if="currentStep === 4" class="wizard-content">
      <TfCard>
        <template #header><h3>Step 4: Validation Check</h3></template>
        <div class="val-box">
          <div class="val-item text-success">✅ Date format recognized (YYYY-MM-DD)</div>
          <div class="val-item text-success">✅ Currency symbol normalized (USD $)</div>
          <div class="val-item text-success">✅ Zero format errors detected in 4 rows</div>
        </div>
      </TfCard>
    </div>

    <!-- Step 5: AI Analysis -->
    <div v-else-if="currentStep === 5" class="wizard-content">
      <TfCard>
        <template #header><h3>Step 5: AI Category Detection</h3></template>
        <div class="ai-box">
          <p>AI identified 2 auto-categorizable items and 2 requiring client clarification.</p>
          <TfBadge variant="primary" dot>AI Confidence Score: 87%</TfBadge>
        </div>
      </TfCard>
    </div>

    <!-- Step 6: Complete -->
    <div v-else-if="currentStep === 6" class="wizard-content">
      <TfCard>
        <div class="complete-box">
          <span class="c-icon">🎉</span>
          <h3>Import Ready!</h3>
          <p>4 transactions ready for categorization in your review table.</p>
          <TfButton size="lg" @click="finishImport">Go to Transactions Grid →</TfButton>
        </div>
      </TfCard>
    </div>

    <!-- Footer Controls -->
    <div v-if="currentStep < 6" class="wizard-footer">
      <TfButton variant="ghost" :disabled="currentStep === 1" @click="prevStep">← Back</TfButton>
      <TfButton @click="nextStep">Next Step →</TfButton>
    </div>
  </div>
</template>

<style scoped>
.import-wizard-view {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-6);
  max-width: 960px;
  margin: 0 auto;
}

.wizard-header {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-4);
}

.wizard-header h2 {
  font-size: var(--tf-text-h2-size);
  font-weight: 800;
}

.wizard-steps {
  display: flex;
  gap: var(--tf-space-2);
  flex-wrap: wrap;
}

.step-pill {
  padding: 4px 12px;
  border-radius: var(--tf-radius-full);
  font-size: 12px;
  font-weight: 600;
  background: var(--tf-bg);
  color: var(--tf-text-muted);
}

.step-pill--active {
  background: var(--tf-primary);
  color: white;
}

.step-pill--done {
  background: var(--tf-success-light);
  color: var(--tf-success-dark);
}

.dropzone {
  border: 2px dashed var(--tf-border);
  border-radius: var(--tf-radius-lg);
  padding: var(--tf-space-12);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--tf-space-3);
  cursor: pointer;
}

.dz-icon { font-size: 3rem; }

.wiz-table {
  width: 100%;
  border-collapse: collapse;
}

.wiz-table th, .wiz-table td {
  padding: var(--tf-space-3) var(--tf-space-4);
  border-bottom: 1px solid var(--tf-border);
}

.mapping-grid {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-4);
}

.map-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.wiz-select {
  padding: var(--tf-space-2) var(--tf-space-4);
  border: 1px solid var(--tf-border);
  border-radius: var(--tf-radius);
}

.val-box, .ai-box {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-3);
}

.complete-box {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--tf-space-4);
  padding: var(--tf-space-8);
}

.c-icon { font-size: 3rem; }

.wizard-footer {
  display: flex;
  justify-content: space-between;
}

.text-success { color: var(--tf-success-dark); font-weight: 600; }
</style>
