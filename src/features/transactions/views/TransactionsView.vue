<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTransactionStore } from '@core/stores/transactionStore'
import type { Transaction } from '@shared/types/transaction'
import { TfButton, TfCard, TfBadge, TfInput } from '@design/components'
import CreateRequestModal from '@features/requests/components/CreateRequestModal.vue'

const router = useRouter()
const transactionStore = useTransactionStore()

const activeFilter = ref<'all' | 'pending' | 'answered' | 'approved'>('all')
const searchQuery = ref('')
const selectedIds = ref<string[]>([])
const drawerTxn = ref<Transaction | null>(null)
const showCreateModal = ref(false)

const filteredList = computed(() => {
  return transactionStore.transactions.filter(t => {
    if (activeFilter.value === 'pending' && t.status !== 'pending_client' && t.status !== 'uncategorized') return false
    if (activeFilter.value === 'answered' && t.status !== 'client_answered') return false
    if (activeFilter.value === 'approved' && t.status !== 'approved') return false

    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      return t.description.toLowerCase().includes(q) || t.clientName.toLowerCase().includes(q)
    }
    return true
  })
})

function toggleSelect(id: string) {
  const idx = selectedIds.value.indexOf(id)
  if (idx >= 0) selectedIds.value.splice(idx, 1)
  else selectedIds.value.push(id)
}

function openDrawer(txn: Transaction) {
  drawerTxn.value = txn
}

function closeDrawer() {
  drawerTxn.value = null
}

function handleApprove(id: string) {
  transactionStore.updateStatus(id, 'approved', 'Office Supplies')
  if (drawerTxn.value && drawerTxn.value.id === id) {
    drawerTxn.value.status = 'approved'
  }
}

function openCreateModal() {
  if (selectedIds.value.length === 0) {
    alert('Please select at least one transaction to create a request.')
    return
  }
  showCreateModal.value = true
}

function handleSendRequest() {
  selectedIds.value.forEach(id => {
    transactionStore.updateStatus(id, 'pending_client')
  })
  selectedIds.value = []
  router.push('/demo/portal')
}
</script>

<template>
  <div class="transactions-view">
    <!-- Action Bar & Filters -->
    <div class="txns-toolbar">
      <div class="filter-tabs">
        <button
          v-for="f in ['all', 'pending', 'answered', 'approved']"
          :key="f"
          :class="['filter-btn', { 'filter-btn--active': activeFilter === f }]"
          @click="activeFilter = f as any"
        >
          {{ f.toUpperCase() }}
        </button>
      </div>

      <div class="toolbar-right">
        <TfInput v-model="searchQuery" placeholder="Search description or client..." />
        <TfButton v-if="selectedIds.length > 0" @click="openCreateModal">
          ✉️ Generate Request ({{ selectedIds.length }})
        </TfButton>
        <TfButton variant="secondary" as="a" href="/demo/import">
          📥 Import CSV
        </TfButton>
      </div>
    </div>

    <!-- Data Grid -->
    <TfCard padding="none">
      <div class="grid-wrap">
        <table class="txns-table">
          <thead>
            <tr>
              <th style="width: 40px;">✓</th>
              <th>Date</th>
              <th>Description & Bank Memo</th>
              <th>Client</th>
              <th>Amount</th>
              <th>AI Confidence</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="txn in filteredList" :key="txn.id" class="txn-row">
              <td>
                <input
                  type="checkbox"
                  :checked="selectedIds.includes(txn.id)"
                  @change="toggleSelect(txn.id)"
                />
              </td>
              <td class="cell-date">{{ txn.date }}</td>
              <td class="cell-desc" @click="openDrawer(txn)">
                <strong>{{ txn.description }}</strong>
                <span v-if="txn.bankMemo" class="sub-memo">{{ txn.bankMemo }}</span>
              </td>
              <td>{{ txn.clientName }}</td>
              <td class="cell-amount">${{ Math.abs(txn.amount).toFixed(2) }}</td>
              <td>
                <TfBadge v-if="txn.aiConfidence" variant="primary">
                  {{ Math.round(txn.aiConfidence * 100) }}%
                </TfBadge>
              </td>
              <td>
                <TfBadge
                  :variant="txn.status === 'approved' ? 'success' : txn.status === 'client_answered' ? 'warning' : 'neutral'"
                  dot
                >
                  {{ txn.status.replace('_', ' ').toUpperCase() }}
                </TfBadge>
              </td>
              <td class="cell-actions">
                <button class="btn-drawer" @click="openDrawer(txn)">Details</button>
                <button v-if="txn.status !== 'approved'" class="btn-approve" @click="handleApprove(txn.id)">Approve</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </TfCard>

    <!-- Side Drawer -->
    <div v-if="drawerTxn" class="drawer-overlay" @click.self="closeDrawer">
      <div class="side-drawer tf-animate-slide-in-right">
        <div class="drawer-header">
          <h3>Transaction Details</h3>
          <button class="btn-close" @click="closeDrawer">✕</button>
        </div>

        <div class="drawer-body">
          <div class="drawer-section">
            <span class="lbl">Description:</span>
            <strong>{{ drawerTxn.description }}</strong>
          </div>

          <div class="drawer-section">
            <span class="lbl">Amount & Date:</span>
            <span>${{ Math.abs(drawerTxn.amount).toFixed(2) }} · {{ drawerTxn.date }}</span>
          </div>

          <div class="drawer-section">
            <span class="lbl">Client:</span>
            <span>{{ drawerTxn.clientName }}</span>
          </div>

          <div class="drawer-section highlight-box">
            <span class="lbl">AI Category Suggestion:</span>
            <TfBadge variant="success">{{ drawerTxn.suggestedCategory || 'Office Supplies' }}</TfBadge>
          </div>

          <div v-if="drawerTxn.clientAnswer" class="drawer-section answer-box">
            <span class="lbl">Client Answer:</span>
            <p>"{{ drawerTxn.clientAnswer }}"</p>
          </div>

          <div v-if="drawerTxn.receiptName" class="drawer-section">
            <span class="lbl">Uploaded Receipt:</span>
            <div class="receipt-pill">📎 {{ drawerTxn.receiptName }}</div>
          </div>
        </div>

        <div class="drawer-footer">
          <TfButton full-width @click="handleApprove(drawerTxn.id); closeDrawer();">
            Approve & Categorize
          </TfButton>
        </div>
      </div>
    </div>

    <!-- Create Request Modal -->
    <CreateRequestModal
      :show="showCreateModal"
      :selected-txn-ids="selectedIds"
      @close="showCreateModal = false"
      @send="handleSendRequest"
    />
  </div>
</template>

<style scoped>
.transactions-view {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-6);
}

.txns-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--tf-space-4);
  flex-wrap: wrap;
}

.filter-tabs {
  display: flex;
  gap: var(--tf-space-2);
}

.filter-btn {
  padding: var(--tf-space-2) var(--tf-space-4);
  border: 1px solid var(--tf-border);
  border-radius: var(--tf-radius-full);
  background: var(--tf-surface);
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
}

.filter-btn--active {
  background: var(--tf-primary-light);
  border-color: var(--tf-primary);
  color: var(--tf-primary);
}

.toolbar-right {
  display: flex;
  gap: var(--tf-space-3);
  align-items: center;
}

.grid-wrap { overflow-x: auto; }

.txns-table {
  width: 100%;
  border-collapse: collapse;
}

.txns-table th, .txns-table td {
  padding: var(--tf-space-3) var(--tf-space-4);
  border-bottom: 1px solid var(--tf-border);
  text-align: left;
}

.cell-desc {
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.sub-memo {
  font-size: 11px;
  color: var(--tf-text-muted);
}

.cell-amount {
  font-family: var(--tf-font-mono);
  font-weight: 700;
}

.btn-drawer, .btn-approve {
  font-size: 12px;
  font-weight: 600;
  border: none;
  background: none;
  cursor: pointer;
  margin-right: var(--tf-space-2);
}

.btn-drawer { color: var(--tf-primary); }
.btn-approve { color: var(--tf-success-dark); }

/* Drawer */
.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
  z-index: 150;
  display: flex;
  justify-content: flex-end;
}

.side-drawer {
  width: 400px;
  background: var(--tf-surface);
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: var(--tf-shadow-xl);
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  padding: var(--tf-space-4) var(--tf-space-6);
  border-bottom: 1px solid var(--tf-border);
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
}

.drawer-body {
  padding: var(--tf-space-6);
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-4);
}

.drawer-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.lbl { font-size: 11px; color: var(--tf-text-muted); font-weight: 600; text-transform: uppercase; }

.highlight-box {
  background: var(--tf-primary-light);
  padding: var(--tf-space-3);
  border-radius: var(--tf-radius);
}

.answer-box {
  background: var(--tf-success-light);
  padding: var(--tf-space-3);
  border-radius: var(--tf-radius);
}

.receipt-pill {
  font-size: 12px;
  font-weight: 600;
  color: var(--tf-primary);
}

.drawer-footer {
  padding: var(--tf-space-4) var(--tf-space-6);
  border-top: 1px solid var(--tf-border);
}
</style>
