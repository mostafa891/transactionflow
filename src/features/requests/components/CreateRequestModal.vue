<script setup lang="ts">
import { ref } from 'vue'
import { TfButton, TfInput, TfCard } from '@design/components'
import MessagePreviewModal from './MessagePreviewModal.vue'

const props = defineProps<{
  show: boolean
  selectedTxnIds: string[]
}>()

const emit = defineEmits<{
  close: []
  send: [options: any]
}>()

const expirationDays = ref('7')
const language = ref('en')
const reminderSchedule = ref('3_days')
const channel = ref<'email' | 'sms' | 'whatsapp'>('email')
const customNote = ref('')
const showPreview = ref(false)

function handleCreate() {
  emit('send', {
    expirationDays: expirationDays.value,
    language: language.value,
    reminderSchedule: reminderSchedule.value,
    channel: channel.value,
    customNote: customNote.value,
  })
  emit('close')
}
</script>

<template>
  <div v-if="show" class="modal-backdrop" @click.self="emit('close')">
    <div class="modal-dialog tf-animate-scale-in">
      <TfCard>
        <template #header>
          <div class="modal-header-flex">
            <h3>Create Clarification Request</h3>
            <button class="close-btn" @click="emit('close')">✕</button>
          </div>
        </template>

        <div class="modal-body">
          <p class="modal-intro">
            Generating portal link for <strong>{{ selectedTxnIds.length }} transactions</strong>.
          </p>

          <div class="form-group">
            <label>Link Expiration:</label>
            <select v-model="expirationDays" class="modal-select">
              <option value="3">3 Days</option>
              <option value="7">7 Days (Recommended)</option>
              <option value="14">14 Days</option>
            </select>
          </div>

          <div class="form-group">
            <label>Portal Language:</label>
            <select v-model="language" class="modal-select">
              <option value="en">English</option>
              <option value="ar">Arabic (العربية)</option>
            </select>
          </div>

          <div class="form-group">
            <label>Automated Reminder Rule:</label>
            <select v-model="reminderSchedule" class="modal-select">
              <option value="3_days">Every 3 Days (Stop on Reply)</option>
              <option value="5_days">Every 5 Days</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          <div class="form-group">
            <label>Primary Delivery Channel:</label>
            <div class="channel-options">
              <button
                v-for="ch in ['email', 'sms', 'whatsapp']"
                :key="ch"
                :class="['ch-btn', { 'ch-btn--active': channel === ch }]"
                @click="channel = ch as any"
              >
                {{ ch.toUpperCase() }}
              </button>
            </div>
          </div>

          <TfInput
            v-model="customNote"
            label="Note to Client (Optional)"
            placeholder="e.g. Please clarify before Friday's payroll closing."
          />
        </div>

        <template #footer>
          <div class="modal-footer-flex">
            <TfButton variant="ghost" @click="showPreview = true">👁️ Preview Messages</TfButton>
            <TfButton @click="handleCreate">Generate & Send Magic Link →</TfButton>
          </div>
        </template>
      </TfCard>
    </div>

    <!-- Live Preview Modal -->
    <MessagePreviewModal
      :show="showPreview"
      :transaction-count="selectedTxnIds.length"
      @close="showPreview = false"
      @confirm-send="showPreview = false; handleCreate();"
    />
  </div>
</template>

<style scoped>
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
  max-width: 500px;
  width: 100%;
}

.modal-header-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header-flex h3 {
  font-size: var(--tf-text-base-size);
  font-weight: 700;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: var(--tf-text-muted);
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-4);
}

.modal-intro {
  font-size: var(--tf-text-sm-size);
  color: var(--tf-text-secondary);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-1);
}

.form-group label {
  font-size: var(--tf-text-sm-size);
  font-weight: 600;
  color: var(--tf-text-primary);
}

.modal-select {
  padding: var(--tf-space-3);
  border: 1px solid var(--tf-border);
  border-radius: var(--tf-radius);
  font-family: inherit;
}

.channel-options {
  display: flex;
  gap: var(--tf-space-2);
}

.ch-btn {
  flex: 1;
  padding: var(--tf-space-2);
  border: 1px solid var(--tf-border);
  border-radius: var(--tf-radius);
  background: var(--tf-bg);
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
}

.ch-btn--active {
  background: var(--tf-primary-light);
  border-color: var(--tf-primary);
  color: var(--tf-primary);
}

.modal-footer-flex {
  display: flex;
  justify-content: space-between;
}
</style>
