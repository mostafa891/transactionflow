<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { brand } from '@shared/constants/brand'
import { TfButton, TfCard, TfBadge, TfInput } from '@design/components'

const route = useRoute()

const isSubmitted = ref(false)
const currentQuestionIndex = ref(0)
const textAnswer = ref('')
const uploadedFile = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

function triggerFileInput() {
  fileInput.value?.click()
}

const questions = ref([
  {
    id: 'txn-101',
    date: 'July 15, 2026',
    description: 'AMZN Mktp US*2K9X4',
    amount: '$89.99',
    prompt: 'What business items or supplies were purchased in this order?',
  },
  {
    id: 'txn-102',
    date: 'July 14, 2026',
    description: 'UBER TRIP 7X2K9',
    amount: '$24.50',
    prompt: 'What was the purpose of this rideshare trip?',
  },
  {
    id: 'txn-103',
    date: 'July 12, 2026',
    description: 'STAPLES #0872',
    amount: '$142.33',
    prompt: 'Please provide office supplies category or upload store receipt.',
  },
])

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])
const isLastQuestion = computed(() => currentQuestionIndex.value === questions.value.length - 1)

function handleNext() {
  if (isLastQuestion.value) {
    isSubmitted.value = true
  } else {
    currentQuestionIndex.value++
    textAnswer.value = ''
    uploadedFile.value = null
  }
}

function handleFileUpload(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    uploadedFile.value = target.files[0].name
  } else {
    uploadedFile.value = 'receipt_photo_july2026.jpg'
  }
}
</script>

<template>
  <div class="client-portal-page">
    <div class="portal-container">
      <!-- Portal Top Header -->
      <header class="portal-header">
        <div class="header-brand">
          <div class="brand-sq">TF</div>
          <div>
            <h3>{{ brand.name }} Client Portal</h3>
            <span class="accountant-name">Requested by Sarah Accountant (CPA)</span>
          </div>
        </div>
        <TfBadge variant="primary">Secured Link</TfBadge>
      </header>

      <!-- Success Screen -->
      <div v-if="isSubmitted" class="portal-card success-card tf-animate-scale-in">
        <span class="success-icon">🎉</span>
        <h2>Thank You!</h2>
        <p>All transaction answers and receipts have been securely submitted to your accountant.</p>
        <div class="submitted-summary">
          <span>✓ {{ questions.length }} Questions Answered</span>
          <span>✓ Receipt Photos Attached</span>
        </div>
        <p class="small-text">You may close this browser window safely.</p>
      </div>

      <!-- Active Question Form -->
      <div v-else class="portal-card tf-animate-fade-up">
        <!-- Progress Counter -->
        <div class="progress-bar-wrap">
          <div class="progress-info">
            <span>Transaction {{ currentQuestionIndex + 1 }} of {{ questions.length }}</span>
            <span>{{ Math.round(((currentQuestionIndex + 1) / questions.length) * 100) }}% Completed</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" :style="{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }" />
          </div>
        </div>

        <!-- Question Body -->
        <div class="question-body">
          <div class="txn-details-box">
            <div class="txn-top">
              <span class="txn-date">{{ currentQuestion.date }}</span>
              <span class="txn-amount">{{ currentQuestion.amount }}</span>
            </div>
            <strong class="txn-desc">{{ currentQuestion.description }}</strong>
          </div>

          <div class="prompt-box">
            <label class="prompt-label">{{ currentQuestion.prompt }}</label>
            <textarea
              v-model="textAnswer"
              class="portal-textarea"
              rows="3"
              placeholder="e.g. Purchased printer ink and paper for team meeting..."
            />
          </div>

          <!-- Receipt Upload Zone -->
          <div class="upload-section">
            <label class="upload-label">Attach Receipt Photo (Optional):</label>
            <div class="upload-box" @click="triggerFileInput">
              <input ref="fileInput" type="file" accept="image/*,.pdf" class="hidden-input" @change="handleFileUpload" />
              <span class="upload-icon">📷</span>
              <span v-if="!uploadedFile" class="upload-text">Click to Snap Photo or Choose File</span>
              <span v-else class="uploaded-filename">📎 {{ uploadedFile }}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="portal-actions">
          <button v-if="currentQuestionIndex > 0" class="btn-skip" @click="currentQuestionIndex--">
            ← Previous
          </button>
          <TfButton size="lg" full-width @click="handleNext">
            {{ isLastQuestion ? 'Submit All Answers ✓' : 'Save & Next Question →' }}
          </TfButton>
        </div>
      </div>

      <footer class="portal-footer">
        <span>Protected by {{ brand.name }} · Secured SSL Link</span>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.client-portal-page {
  min-height: 100vh;
  background: #F8FAFC;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: var(--tf-space-6) var(--tf-space-4);
  font-family: var(--tf-font-sans);
}

.portal-container {
  max-width: 580px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-6);
}

.portal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: var(--tf-space-4) var(--tf-space-6);
  border-radius: var(--tf-radius-xl);
  border: 1px solid var(--tf-border);
  box-shadow: var(--tf-shadow-sm);
}

.header-brand {
  display: flex;
  align-items: center;
  gap: var(--tf-space-3);
}

.brand-sq {
  width: 36px;
  height: 36px;
  background: var(--tf-primary);
  color: white;
  border-radius: 8px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-brand h3 {
  font-size: var(--tf-text-base-size);
  font-weight: 800;
  color: var(--tf-text-primary);
}

.accountant-name {
  font-size: 11px;
  color: var(--tf-text-muted);
}

.portal-card {
  background: white;
  border: 1px solid var(--tf-border);
  border-radius: var(--tf-radius-xl);
  padding: var(--tf-space-8);
  box-shadow: var(--tf-shadow-card);
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-6);
}

.progress-bar-wrap {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-2);
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 700;
  color: var(--tf-text-muted);
}

.progress-track {
  height: 8px;
  background: var(--tf-bg);
  border-radius: var(--tf-radius-full);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--tf-primary);
  transition: width 0.3s ease;
}

.question-body {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-5);
}

.txn-details-box {
  background: #F1F5F9;
  border-radius: var(--tf-radius-lg);
  padding: var(--tf-space-4);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.txn-top {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--tf-text-muted);
}

.txn-amount {
  font-family: var(--tf-font-mono);
  font-weight: 800;
  color: var(--tf-text-primary);
  font-size: 1.1rem;
}

.txn-desc {
  font-size: var(--tf-text-base-size);
  color: var(--tf-text-primary);
}

.prompt-box {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-2);
}

.prompt-label {
  font-size: var(--tf-text-sm-size);
  font-weight: 700;
  color: var(--tf-text-primary);
}

.portal-textarea {
  width: 100%;
  padding: var(--tf-space-3);
  border: 1px solid var(--tf-border);
  border-radius: var(--tf-radius);
  font-family: inherit;
  font-size: var(--tf-text-base-size);
  resize: vertical;
}

.portal-textarea:focus {
  outline: none;
  border-color: var(--tf-primary);
}

.upload-section {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-2);
}

.upload-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--tf-text-muted);
}

.upload-box {
  border: 2px dashed var(--tf-border);
  border-radius: var(--tf-radius-lg);
  padding: var(--tf-space-4);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--tf-space-3);
  cursor: pointer;
  background: #FAFAFA;
}

.hidden-input { display: none; }
.upload-icon { font-size: 1.25rem; }
.upload-text { font-size: 12px; color: var(--tf-text-secondary); font-weight: 600; }
.uploaded-filename { font-size: 12px; color: var(--tf-primary); font-weight: 700; }

.portal-actions {
  display: flex;
  gap: var(--tf-space-3);
  align-items: center;
}

.btn-skip {
  background: none;
  border: none;
  font-size: var(--tf-text-sm-size);
  color: var(--tf-text-muted);
  cursor: pointer;
}

.success-card {
  text-align: center;
  align-items: center;
  padding: var(--tf-space-12) var(--tf-space-8);
}

.success-icon { font-size: 3.5rem; }

.submitted-summary {
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: var(--tf-success-light);
  color: var(--tf-success-dark);
  padding: var(--tf-space-4);
  border-radius: var(--tf-radius-lg);
  font-weight: 700;
  font-size: 14px;
}

.small-text {
  font-size: 12px;
  color: var(--tf-text-muted);
}

.portal-footer {
  text-align: center;
  font-size: 11px;
  color: var(--tf-text-muted);
}
</style>
