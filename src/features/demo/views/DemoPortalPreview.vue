<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { brand } from '@shared/constants/brand'
import { TfButton, TfCard, TfBadge } from '@design/components'

const router = useRouter()

const questions = ref([
  {
    id: 1,
    desc: 'AMZN Mktp US*2K9X4',
    amount: '$89.99',
    date: 'Jul 15, 2026',
    prompt: 'What business items or office supplies were purchased in this order?',
    answer: '',
    file: null as string | null,
  },
  {
    id: 2,
    desc: 'TRANSFER FROM CHK 8812',
    amount: '$5,000.00',
    date: 'Jul 13, 2026',
    prompt: 'What was the nature of this bank transfer?',
    answer: '',
    file: null as string | null,
  },
  {
    id: 3,
    desc: 'STAPLES #0872',
    amount: '$1,200.00',
    date: 'Jul 10, 2026',
    prompt: 'Please specify the department or attach receipt image.',
    answer: '',
    file: null as string | null,
  },
])

const currentIndex = ref(0)
const isComplete = ref(false)

const currentQ = computed(() => questions.value[currentIndex.value])

function nextQuestion() {
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++
  } else {
    isComplete.value = true
  }
}

function handleFile(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    currentQ.value.file = target.files[0].name
  } else {
    currentQ.value.file = 'receipt_staples_jul2026.jpg'
  }
}

function goToComplete() {
  router.push('/demo/complete')
}
</script>

<template>
  <div class="demo-portal-full">
    <!-- Header banner explaining client view -->
    <div class="portal-banner">
      <div>
        <h2>Client Portal Experience ⭐</h2>
        <p class="subtitle">
          This is the exact responsive web page your client sees when opening a Magic Link (No login required).
        </p>
      </div>
      <TfBadge variant="success">Active Live Session</TfBadge>
    </div>

    <!-- Responsive Card Web Portal -->
    <div class="portal-main-card">
      <div v-if="!isComplete" class="portal-questions-wrap tf-animate-fade-up">
        <!-- Header -->
        <div class="card-top-header">
          <div class="header-brand-info">
            <div class="sq-logo">TF</div>
            <div>
              <h3>{{ brand.name }} Client Portal</h3>
              <span class="muted-txt">Requested by Sarah Accountant (CPA)</span>
            </div>
          </div>
          <span class="step-badge">Question {{ currentIndex + 1 }} of {{ questions.length }}</span>
        </div>

        <!-- Progress Track -->
        <div class="progress-bar-track">
          <div
            class="progress-bar-fill"
            :style="{ width: `${((currentIndex + 1) / questions.length) * 100}%` }"
          />
        </div>

        <!-- Question Body -->
        <div class="question-container">
          <div class="txn-card-box">
            <div class="txn-card-header">
              <span class="txn-date">{{ currentQ.date }}</span>
              <span class="txn-price">{{ currentQ.amount }}</span>
            </div>
            <h4 class="txn-title">{{ currentQ.desc }}</h4>
          </div>

          <div class="input-form-group">
            <label class="input-label">{{ currentQ.prompt }}</label>
            <textarea
              v-model="currentQ.answer"
              class="portal-input-text"
              rows="3"
              placeholder="e.g., Office printer paper, team coffee, equipment..."
            />
          </div>

          <!-- Attach Receipt Photo -->
          <div class="receipt-upload-box" @click="$refs.fileInput.click()">
            <input ref="fileInput" type="file" accept="image/*,.pdf" class="file-input-hidden" @change="handleFile" />
            <span class="icon-camera">📷</span>
            <div v-if="!currentQ.file">
              <strong>Attach Receipt Photo or Invoice</strong>
              <p class="upload-sub">Click to snap photo or upload file</p>
            </div>
            <div v-else class="file-attached">
              <strong>📎 {{ currentQ.file }}</strong>
              <p class="upload-sub text-success">Receipt image attached</p>
            </div>
          </div>
        </div>

        <!-- Card Footer -->
        <div class="card-footer-flex">
          <button v-if="currentIndex > 0" class="btn-prev" @click="currentIndex--">
            ← Previous Question
          </button>
          <TfButton size="lg" @click="nextQuestion">
            {{ currentIndex < questions.length - 1 ? 'Save & Next Question →' : 'Submit All Answers ✓' }}
          </TfButton>
        </div>
      </div>

      <!-- Success Screen -->
      <div v-else class="success-screen-box tf-animate-scale-in">
        <span class="done-icon">🎉</span>
        <h3>Thank You! All Answers Submitted.</h3>
        <p>Your responses and receipt photos have been transmitted directly to your accountant.</p>
        <TfButton size="lg" @click="goToComplete">Proceed to Next Demo Step →</TfButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-portal-full {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-6);
  max-width: 840px;
  margin: 0 auto;
}

.portal-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: var(--tf-space-4) var(--tf-space-6);
  border-radius: var(--tf-radius-lg);
  border: 1px solid var(--tf-border);
}

.portal-banner h2 { font-size: var(--tf-text-h2-size); font-weight: 800; }
.subtitle { font-size: var(--tf-text-sm-size); color: var(--tf-text-muted); }

.portal-main-card {
  width: 100%;
}

.portal-questions-wrap {
  background: white;
  border-radius: var(--tf-radius-xl);
  border: 1px solid var(--tf-border);
  box-shadow: var(--tf-shadow-card);
  padding: var(--tf-space-8);
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-6);
}

.card-top-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-brand-info {
  display: flex;
  align-items: center;
  gap: var(--tf-space-3);
}

.sq-logo {
  width: 40px;
  height: 40px;
  background: var(--tf-primary);
  color: white;
  border-radius: var(--tf-radius);
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-brand-info h3 { font-size: var(--tf-text-h3-size); font-weight: 800; }
.muted-txt { font-size: 12px; color: var(--tf-text-muted); }

.step-badge {
  font-size: 12px;
  font-weight: 700;
  background: var(--tf-primary-light);
  color: var(--tf-primary);
  padding: 4px 12px;
  border-radius: var(--tf-radius-full);
}

.progress-bar-track {
  height: 6px;
  background: var(--tf-bg);
  border-radius: var(--tf-radius-full);
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: var(--tf-primary);
  transition: width 0.3s ease;
}

.question-container {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-5);
}

.txn-card-box {
  background: var(--tf-bg);
  border: 1px solid var(--tf-border);
  border-radius: var(--tf-radius-lg);
  padding: var(--tf-space-4) var(--tf-space-5);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.txn-card-header {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--tf-text-muted);
}

.txn-price {
  font-family: var(--tf-font-mono);
  font-weight: 800;
  color: var(--tf-text-primary);
  font-size: 1.2rem;
}

.txn-title {
  font-size: var(--tf-text-base-size);
  font-weight: 700;
  color: var(--tf-text-primary);
}

.input-form-group {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-2);
}

.input-label {
  font-size: var(--tf-text-sm-size);
  font-weight: 700;
  color: var(--tf-text-primary);
}

.portal-input-text {
  width: 100%;
  padding: var(--tf-space-3) var(--tf-space-4);
  border: 1px solid var(--tf-border);
  border-radius: var(--tf-radius);
  font-family: inherit;
  font-size: var(--tf-text-base-size);
}

.receipt-upload-box {
  border: 2px dashed var(--tf-border);
  background: #FAFAFA;
  border-radius: var(--tf-radius-lg);
  padding: var(--tf-space-5);
  display: flex;
  align-items: center;
  gap: var(--tf-space-4);
  cursor: pointer;
  transition: all 0.2s ease;
}

.receipt-upload-box:hover {
  border-color: var(--tf-primary);
  background: var(--tf-primary-light);
}

.file-input-hidden { display: none; }
.icon-camera { font-size: 1.75rem; }
.upload-sub { font-size: 12px; color: var(--tf-text-muted); }
.text-success { color: var(--tf-success-dark); font-weight: 700; }

.card-footer-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--tf-space-2);
}

.btn-prev {
  background: none;
  border: none;
  font-size: var(--tf-text-sm-size);
  color: var(--tf-text-muted);
  cursor: pointer;
}

.success-screen-box {
  background: white;
  border: 1px solid var(--tf-border);
  border-radius: var(--tf-radius-xl);
  padding: var(--tf-space-12);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--tf-space-4);
}

.done-icon { font-size: 3.5rem; }
</style>
