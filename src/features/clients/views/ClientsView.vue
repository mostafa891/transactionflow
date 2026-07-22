<script setup lang="ts">
import { ref } from 'vue'
import { useClientStore } from '@core/stores/clientStore'
import { TfButton, TfCard, TfBadge, TfInput } from '@design/components'

const clientStore = useClientStore()
const showAddModal = ref(false)

const newClient = ref({
  name: '',
  company: '',
  email: '',
  phone: '',
  software: 'QuickBooks' as const,
})

function handleAddClient() {
  if (!newClient.value.name || !newClient.value.email) return

  clientStore.addClient({
    name: newClient.value.name,
    company: newClient.value.company || newClient.value.name,
    email: newClient.value.email,
    phone: newClient.value.phone || '+1 (555) 000-0000',
    software: newClient.value.software,
    pendingCount: 4,
    answeredCount: 0,
    totalTransactions: 4,
    waitingSince: '2026-07-22',
    lastActivityDate: '2026-07-22',
    magicLinkStatus: 'active',
    magicLinkUrl: `https://auraflow.transaction.software/p/${newClient.value.name.toLowerCase().replace(/[^a-z0-9]/g, '')}-7712`,
    magicLinkExpiry: '2026-07-29',
    autoReminderEnabled: true,
    reminderSchedule: '3_days',
  })

  showAddModal.value = false
  newClient.value = { name: '', company: '', email: '', phone: '', software: 'QuickBooks' }
}
</script>

<template>
  <div class="clients-view">
    <div class="clients-header">
      <div>
        <h2>Clients Directory</h2>
        <p class="subtitle">Manage client accounts, magic link statuses, and active clarification requests.</p>
      </div>
      <TfButton size="md" @click="showAddModal = true">+ Add New Client</TfButton>
    </div>

    <!-- Clients Table Grid -->
    <TfCard padding="none">
      <div class="table-responsive">
        <table class="clients-table">
          <thead>
            <tr>
              <th>Client Name & Firm</th>
              <th>Accounting Software</th>
              <th>Pending Clarifications</th>
              <th>Magic Link Status</th>
              <th>Last Reminder</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="client in clientStore.clients" :key="client.id">
              <td class="cell-client">
                <div class="client-avatar">{{ client.name.charAt(0) }}</div>
                <div class="client-info">
                  <router-link :to="`/demo/clients/${client.id}`" class="client-name">
                    {{ client.name }}
                  </router-link>
                  <span class="client-email">{{ client.email }}</span>
                </div>
              </td>
              <td>
                <TfBadge variant="neutral">{{ client.software }}</TfBadge>
              </td>
              <td>
                <span :class="['count-badge', client.pendingCount > 0 ? 'count-badge--pending' : 'count-badge--zero']">
                  {{ client.pendingCount }} pending
                </span>
              </td>
              <td>
                <TfBadge :variant="client.magicLinkStatus === 'active' ? 'success' : client.magicLinkStatus === 'expired' ? 'error' : 'neutral'" dot>
                  {{ client.magicLinkStatus.toUpperCase() }}
                </TfBadge>
              </td>
              <td class="cell-date">
                {{ client.lastReminderDate || 'No reminders sent' }}
              </td>
              <td class="cell-actions">
                <router-link :to="`/demo/clients/${client.id}`" class="btn-action">
                  View Profile
                </router-link>
                <router-link to="/demo/portal" class="btn-action btn-action--link">
                  Copy Link
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </TfCard>

    <!-- Add Client Modal -->
    <div v-if="showAddModal" class="modal-backdrop" @click.self="showAddModal = false">
      <div class="modal-dialog tf-animate-scale-in">
        <TfCard>
          <template #header>
            <div class="flex-between">
              <h3>Add New Accounting Client</h3>
              <button class="close-btn" @click="showAddModal = false">✕</button>
            </div>
          </template>

          <form class="modal-body" @submit.prevent="handleAddClient">
            <TfInput
              v-model="newClient.name"
              label="Client / Business Name"
              placeholder="e.g. Metro Retail Corp"
              required
            />

            <TfInput
              v-model="newClient.email"
              type="email"
              label="Primary Contact Email"
              placeholder="contact@metroretail.com"
              required
            />

            <TfInput
              v-model="newClient.phone"
              label="Contact Phone Number"
              placeholder="+1 (555) 234-5678"
            />

            <div class="form-group">
              <label>Accounting Software:</label>
              <select v-model="newClient.software" class="modal-select">
                <option value="QuickBooks">QuickBooks Online</option>
                <option value="Xero">Xero</option>
                <option value="CSV">CSV Statements Only</option>
                <option value="Zoho">Zoho Books</option>
                <option value="Wave">Wave</option>
              </select>
            </div>

            <div class="modal-footer-flex">
              <TfButton variant="ghost" type="button" @click="showAddModal = false">Cancel</TfButton>
              <TfButton type="submit">Save & Create Client Profile →</TfButton>
            </div>
          </form>
        </TfCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.clients-view {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-6);
}

.clients-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.clients-header h2 {
  font-size: var(--tf-text-h2-size);
  font-weight: 800;
  color: var(--tf-text-primary);
}

.subtitle {
  font-size: var(--tf-text-sm-size);
  color: var(--tf-text-muted);
}

.table-responsive {
  overflow-x: auto;
}

.clients-table {
  width: 100%;
  border-collapse: collapse;
}

.clients-table th {
  text-align: left;
  padding: var(--tf-space-3) var(--tf-space-5);
  font-size: var(--tf-text-caption-size);
  font-weight: 700;
  color: var(--tf-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: var(--tf-bg);
  border-bottom: 1px solid var(--tf-border);
}

.clients-table td {
  padding: var(--tf-space-4) var(--tf-space-5);
  border-bottom: 1px solid var(--tf-border);
  vertical-align: middle;
}

.cell-client {
  display: flex;
  align-items: center;
  gap: var(--tf-space-3);
}

.client-avatar {
  width: 36px;
  height: 36px;
  border-radius: var(--tf-radius-full);
  background: var(--tf-primary-light);
  color: var(--tf-primary);
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.client-info {
  display: flex;
  flex-direction: column;
}

.client-name {
  font-size: var(--tf-text-base-size);
  font-weight: 700;
  color: var(--tf-text-primary);
  text-decoration: none;
}

.client-name:hover {
  color: var(--tf-primary);
}

.client-email {
  font-size: var(--tf-text-sm-size);
  color: var(--tf-text-muted);
}

.count-badge {
  font-size: var(--tf-text-sm-size);
  font-weight: 600;
  padding: 2px var(--tf-space-3);
  border-radius: var(--tf-radius-full);
}

.count-badge--pending {
  background: var(--tf-warning-light);
  color: var(--tf-warning-dark);
}

.count-badge--zero {
  background: var(--tf-bg);
  color: var(--tf-text-muted);
}

.cell-date {
  font-size: var(--tf-text-sm-size);
  color: var(--tf-text-muted);
}

.cell-actions {
  display: flex;
  gap: var(--tf-space-3);
}

.btn-action {
  font-size: var(--tf-text-sm-size);
  font-weight: 600;
  color: var(--tf-primary);
  text-decoration: none;
}

.btn-action--link {
  color: var(--tf-text-secondary);
}

/* Modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--tf-space-4);
}

.modal-dialog {
  max-width: 480px;
  width: 100%;
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-4);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-1);
}

.form-group label {
  font-size: var(--tf-text-sm-size);
  font-weight: 600;
}

.modal-select {
  padding: var(--tf-space-3);
  border: 1px solid var(--tf-border);
  border-radius: var(--tf-radius);
  font-family: inherit;
}

.modal-footer-flex {
  display: flex;
  justify-content: space-between;
  margin-top: var(--tf-space-2);
}
</style>
