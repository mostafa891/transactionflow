<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { TfButton, TfCard, TfBadge } from '@design/components'

const router = useRouter()

const transactions = ref([
  { id: 1, date: '2026-07-15', desc: 'AMZN Mktp US*2K9X4', amount: -89.99, status: 'pending', category: '' },
  { id: 2, date: '2026-07-14', desc: 'UBER TRIP 7X2K9', amount: -24.50, status: 'pending', category: '' },
  { id: 3, date: '2026-07-13', desc: 'TRANSFER FROM CHK', amount: 5000.00, status: 'pending', category: '' },
  { id: 4, date: '2026-07-12', desc: 'STAPLES #0872', amount: -142.33, status: 'pending', category: '' },
  { id: 5, date: '2026-07-10', desc: 'CHECK #1847', amount: -1200.00, status: 'pending', category: '' },
])

const categories = ['Office Supplies', 'Travel', 'Marketing', 'Meals', 'Rent', 'Ask Client']
const selectedIds = ref<number[]>([])

function toggleSelect(id: number) {
  const i = selectedIds.value.indexOf(id)
  if (i >= 0) selectedIds.value.splice(i, 1)
  else selectedIds.value.push(id)
}

function categorize(id: number, category: string) {
  const txn = transactions.value.find(t => t.id === id)
  if (txn) {
    txn.category = category
    txn.status = category === 'Ask Client' ? 'ask-client' : 'categorized'
  }
}

function sendToPortal() {
  router.push('/demo/portal')
}

const askClientCount = ref(0)
function updateAskClientCount() {
  askClientCount.value = transactions.value.filter(t => t.status === 'ask-client').length
}
</script>

<template>
  <div class="demo-review">
    <TfCard padding="none">
      <template #header>
        <div class="review-header">
          <div>
            <h3>Uncategorized Transactions</h3>
            <p class="review-subtitle">Click a category to assign, or "Ask Client" to send a clarification request</p>
          </div>
          <TfButton
            v-if="transactions.some(t => t.status === 'ask-client')"
            @click="sendToPortal"
          >
            Send {{ transactions.filter(t => t.status === 'ask-client').length }} to Client →
          </TfButton>
        </div>
      </template>

      <div class="review-table-wrap">
        <table class="review-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="txn in transactions"
              :key="txn.id"
              :class="{ 'row--done': txn.status !== 'pending' }"
            >
              <td class="cell-date">{{ txn.date }}</td>
              <td class="cell-desc">{{ txn.desc }}</td>
              <td :class="['cell-amount', txn.amount >= 0 ? 'cell-amount--pos' : '']">
                {{ txn.amount >= 0 ? '+' : '' }}${{ Math.abs(txn.amount).toFixed(2) }}
              </td>
              <td class="cell-cats">
                <template v-if="txn.status === 'pending'">
                  <button
                    v-for="cat in categories"
                    :key="cat"
                    :class="['cat-pill', cat === 'Ask Client' ? 'cat-pill--ask' : '']"
                    @click="categorize(txn.id, cat)"
                  >
                    {{ cat === 'Ask Client' ? '❓ ' : '' }}{{ cat }}
                  </button>
                </template>
                <template v-else>
                  <TfBadge :variant="txn.status === 'ask-client' ? 'primary' : 'success'" dot>
                    {{ txn.category }}
                  </TfBadge>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </TfCard>
  </div>
</template>

<style scoped>
.demo-review {
  max-width: 960px;
  margin: 0 auto;
}

.review-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--tf-space-4);
}

.review-header h3 {
  font-size: var(--tf-text-base-size);
  font-weight: 600;
}

.review-subtitle {
  font-size: var(--tf-text-sm-size);
  color: var(--tf-text-muted);
  margin-top: 2px;
}

.review-table-wrap { overflow-x: auto; }

.review-table {
  width: 100%;
  border-collapse: collapse;
}

.review-table th {
  text-align: left;
  padding: var(--tf-space-3) var(--tf-space-4);
  font-size: var(--tf-text-caption-size);
  font-weight: 600;
  color: var(--tf-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: var(--tf-bg);
  border-bottom: 1px solid var(--tf-border);
}

.review-table td {
  padding: var(--tf-space-4);
  border-bottom: 1px solid var(--tf-border);
  vertical-align: middle;
}

.row--done { background: #F0FDF4; }

.cell-date { color: var(--tf-text-muted); white-space: nowrap; font-size: var(--tf-text-sm-size); }
.cell-desc { font-weight: 500; font-size: var(--tf-text-sm-size); }
.cell-amount { font-family: var(--tf-font-mono); font-weight: 600; font-size: var(--tf-text-sm-size); white-space: nowrap; }
.cell-amount--pos { color: var(--tf-success-dark); }

.cell-cats {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.cat-pill {
  padding: 4px 10px;
  border-radius: var(--tf-radius-full);
  font-size: 11px;
  font-weight: 600;
  background: var(--tf-bg);
  border: 1px solid var(--tf-border);
  color: var(--tf-text-secondary);
  cursor: pointer;
  transition: var(--tf-transition-all);
  white-space: nowrap;
}

.cat-pill:hover {
  background: var(--tf-primary-light);
  border-color: var(--tf-primary);
  color: var(--tf-primary);
}

.cat-pill--ask {
  background: var(--tf-primary-light);
  border-color: var(--tf-primary);
  color: var(--tf-primary);
}

.cat-pill--ask:hover {
  background: var(--tf-primary);
  color: white;
}
</style>
