<script setup lang="ts">
import { ref } from 'vue'
import { brand } from '@shared/constants/brand'
import { TfButton, TfCard } from '@design/components'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  close: []
  startTour: []
}>()
</script>

<template>
  <div v-if="show" class="welcome-backdrop" @click.self="emit('close')">
    <div class="welcome-dialog tf-animate-scale-in">
      <TfCard padding="lg">
        <div class="welcome-body">
          <div class="welcome-icon">👋</div>
          <h2>Welcome to the {{ brand.name }} Demo!</h2>
          <p class="subtitle">
            Experience the complete end-to-end workflow starting from client creation:
          </p>

          <div class="steps-overview">
            <div class="step-item">
              <span class="num">1</span>
              <div>
                <strong>Dashboard & KPIs</strong>
                <p>Overview of pending items, overdue links, and activity feed</p>
              </div>
            </div>

            <div class="step-item">
              <span class="num">2</span>
              <div>
                <strong>Client Creation & Profiles ⭐</strong>
                <p>Add new accounting client or manage existing accounts</p>
              </div>
            </div>

            <div class="step-item">
              <span class="num">3</span>
              <div>
                <strong>CSV Import Wizard</strong>
                <p>Upload bank statement & auto-detect uncategorized lines</p>
              </div>
            </div>

            <div class="step-item">
              <span class="num">4</span>
              <div>
                <strong>Transactions & Requests</strong>
                <p>Select transactions & generate Magic Link requests</p>
              </div>
            </div>

            <div class="step-item">
              <span class="num">5</span>
              <div>
                <strong>Magic Links Security Center ⭐</strong>
                <p>Track clicks, expiration dates, copy, regenerate or revoke links</p>
              </div>
            </div>

            <div class="step-item">
              <span class="num">6</span>
              <div>
                <strong>Client Mobile Portal (No Login)</strong>
                <p>Simulate how client answers on phone & uploads receipts</p>
              </div>
            </div>

            <div class="step-item">
              <span class="num">7</span>
              <div>
                <strong>Review Queue & Approvals</strong>
                <p>Side-by-side verification (Bank vs Client Answer vs Receipt)</p>
              </div>
            </div>

            <div class="step-item">
              <span class="num">8</span>
              <div>
                <strong>Reminder Center ⭐</strong>
                <p>Delivery logs, message templates & multi-channel rules</p>
              </div>
            </div>

            <div class="step-item">
              <span class="num">9</span>
              <div>
                <strong>CSV Export Center</strong>
                <p>Download clean, categorized ledger ready for Excel</p>
              </div>
            </div>
          </div>

          <div class="welcome-actions">
            <TfButton size="lg" full-width @click="emit('startTour')">
              🚀 Start Complete Guided Tour
            </TfButton>
            <button class="btn-skip" @click="emit('close')">
              Explore freely on my own
            </button>
          </div>
        </div>
      </TfCard>
    </div>
  </div>
</template>

<style scoped>
.welcome-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(6px);
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--tf-space-4);
}

.welcome-dialog {
  max-width: 540px;
  width: 100%;
}

.welcome-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--tf-space-4);
}

.welcome-icon { font-size: 2.5rem; }

.welcome-body h2 {
  font-size: var(--tf-text-h2-size);
  font-weight: 800;
  color: var(--tf-text-primary);
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: var(--tf-text-sm-size);
  color: var(--tf-text-secondary);
}

.steps-overview {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-2);
  width: 100%;
  text-align: left;
  background: var(--tf-bg);
  padding: var(--tf-space-4);
  border-radius: var(--tf-radius-lg);
  border: 1px solid var(--tf-border);
  max-height: 280px;
  overflow-y: auto;
}

.step-item {
  display: flex;
  align-items: flex-start;
  gap: var(--tf-space-3);
  padding-bottom: 6px;
  border-bottom: 1px dashed var(--tf-border);
}

.step-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.num {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--tf-primary);
  color: white;
  font-size: 11px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}

.step-item strong {
  font-size: var(--tf-text-sm-size);
  color: var(--tf-text-primary);
  display: block;
}

.step-item p {
  font-size: 11px;
  color: var(--tf-text-muted);
}

.welcome-actions {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-3);
  width: 100%;
  margin-top: var(--tf-space-2);
}

.btn-skip {
  background: none;
  border: none;
  font-size: var(--tf-text-sm-size);
  color: var(--tf-text-muted);
  cursor: pointer;
  text-decoration: underline;
}
</style>
