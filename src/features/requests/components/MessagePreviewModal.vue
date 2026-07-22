<script setup lang="ts">
import { ref } from 'vue'
import { brand } from '@shared/constants/brand'
import { TfButton, TfCard } from '@design/components'

const props = defineProps<{
  show: boolean
  clientName?: string
  transactionCount?: number
}>()

const emit = defineEmits<{
  close: []
  confirmSend: []
}>()

const activeChannel = ref<'email' | 'sms' | 'whatsapp' | 'portal'>('email')
</script>

<template>
  <div v-if="show" class="preview-backdrop" @click.self="emit('close')">
    <div class="preview-dialog tf-animate-scale-in">
      <TfCard>
        <template #header>
          <div class="flex-between">
            <h3>Message & Portal Preview</h3>
            <button class="close-btn" @click="emit('close')">✕</button>
          </div>
        </template>

        <div class="preview-body">
          <!-- Channel Switcher -->
          <div class="preview-tabs">
            <button
              v-for="ch in ['email', 'sms', 'whatsapp', 'portal']"
              :key="ch"
              :class="['tab-btn', { 'tab-btn--active': activeChannel === ch }]"
              @click="activeChannel = ch as any"
            >
              {{ ch.toUpperCase() }} PREVIEW
            </button>
          </div>

          <!-- Email Preview -->
          <div v-if="activeChannel === 'email'" class="preview-box email-box">
            <div class="box-meta">
              <span><strong>Subject:</strong> Clarification Request for {{ clientName || 'Acme Logistics' }}</span>
              <span><strong>From:</strong> Sarah Accountant &lt;sarah@cpa-firm.com&gt;</span>
            </div>
            <hr class="box-hr" />
            <div class="email-content">
              <p>Hi {{ clientName || 'Acme Logistics' }},</p>
              <p>Your accountant needs help identifying <strong>{{ transactionCount || 5 }} transactions</strong> to complete your monthly closing statement.</p>
              <div class="btn-mock">🔗 Open Magic Portal (No Password Required)</div>
              <p class="small-text">Link expires in 7 days. Secured by {{ brand.name }}.</p>
            </div>
          </div>

          <!-- SMS Preview -->
          <div v-else-if="activeChannel === 'sms'" class="preview-box sms-box">
            <div class="sms-bubble">
              <p>Hi {{ clientName || 'Acme Logistics' }}, your accountant sent {{ transactionCount || 5 }} transaction questions. Answer in 2 mins here: https://tf.app/p/acme-9821</p>
              <span class="sms-time">12:30 PM · Sent via {{ brand.name }}</span>
            </div>
          </div>

          <!-- WhatsApp Preview -->
          <div v-else-if="activeChannel === 'whatsapp'" class="preview-box wa-box">
            <div class="wa-bubble">
              <p>Hello {{ clientName || 'Acme Logistics' }} 👋</p>
              <p>Your monthly statement has <strong>{{ transactionCount || 5 }} unassigned items</strong>. Please review and answer via this link:</p>
              <p class="wa-link">https://tf.app/p/acme-9821</p>
              <span class="wa-time">12:30 PM ✓✓</span>
            </div>
          </div>

          <!-- Client Portal Preview -->
          <div v-else-if="activeChannel === 'portal'" class="preview-box portal-box">
            <div class="portal-frame-mini">
              <div class="p-header">
                <strong>{{ brand.name }} Client Portal</strong>
                <span>Question 1 of {{ transactionCount || 5 }}</span>
              </div>
              <div class="p-card">
                <strong>AMZN Mktp US*2K9X4</strong>
                <span>$89.99 · Jul 15</span>
                <input class="p-input" placeholder="What was this transaction for?" disabled />
                <div class="p-upload-btn">📷 Attach Receipt</div>
              </div>
            </div>
          </div>
        </div>

        <template #footer>
          <div class="flex-between">
            <TfButton variant="ghost" @click="emit('close')">Back to Editing</TfButton>
            <TfButton @click="emit('confirmSend')">Confirm & Dispatch Request →</TfButton>
          </div>
        </template>
      </TfCard>
    </div>
  </div>
</template>

<style scoped>
.preview-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  z-index: 210;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--tf-space-4);
}

.preview-dialog {
  max-width: 540px;
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

.preview-body {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-4);
}

.preview-tabs {
  display: flex;
  gap: var(--tf-space-2);
}

.tab-btn {
  flex: 1;
  padding: var(--tf-space-2);
  border: 1px solid var(--tf-border);
  border-radius: var(--tf-radius);
  background: var(--tf-bg);
  font-size: 10px;
  font-weight: 700;
  cursor: pointer;
}

.tab-btn--active {
  background: var(--tf-primary-light);
  border-color: var(--tf-primary);
  color: var(--tf-primary);
}

.preview-box {
  background: var(--tf-bg);
  border: 1px solid var(--tf-border);
  border-radius: var(--tf-radius-lg);
  padding: var(--tf-space-4);
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.box-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 12px;
  color: var(--tf-text-secondary);
}

.box-hr {
  border: none;
  border-top: 1px solid var(--tf-border);
  margin: var(--tf-space-3) 0;
}

.email-content {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-3);
  font-size: 13px;
  color: var(--tf-text-primary);
}

.btn-mock {
  background: var(--tf-primary);
  color: white;
  padding: var(--tf-space-2) var(--tf-space-4);
  border-radius: var(--tf-radius);
  font-size: 12px;
  font-weight: 600;
  text-align: center;
}

.small-text {
  font-size: 11px;
  color: var(--tf-text-muted);
}

.sms-bubble {
  background: #E2E8F0;
  padding: var(--tf-space-3);
  border-radius: 12px 12px 12px 0;
  font-size: 13px;
  max-width: 90%;
}

.sms-time {
  font-size: 10px;
  color: var(--tf-text-muted);
  display: block;
  margin-top: 4px;
}

.wa-bubble {
  background: #DCF8C6;
  color: #075E54;
  padding: var(--tf-space-3);
  border-radius: 12px 12px 0 12px;
  font-size: 13px;
  max-width: 90%;
  align-self: flex-end;
}

.wa-link {
  color: #128C7E;
  font-weight: 700;
  text-decoration: underline;
}

.wa-time {
  font-size: 10px;
  color: #075E54;
  display: block;
  text-align: right;
  margin-top: 4px;
}

.portal-frame-mini {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-3);
  background: white;
  border: 1px solid var(--tf-border);
  border-radius: var(--tf-radius);
  padding: var(--tf-space-3);
}

.p-header {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: var(--tf-text-muted);
}

.p-card {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-2);
  background: #F8FAFC;
  padding: var(--tf-space-3);
  border-radius: var(--tf-radius);
  font-size: 12px;
}

.p-input {
  padding: 6px;
  border: 1px solid var(--tf-border);
  border-radius: 4px;
  font-size: 11px;
}

.p-upload-btn {
  font-size: 11px;
  color: var(--tf-primary);
  font-weight: 600;
}
</style>
