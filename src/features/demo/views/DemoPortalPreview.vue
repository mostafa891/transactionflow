<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { brand } from '@shared/constants/brand'
import { TfButton, TfCard } from '@design/components'

const router = useRouter()

const questions = [
  { id: 1, desc: 'AMZN Mktp US*2K9X4', amount: '$89.99', date: 'Jul 15', answer: '' },
  { id: 2, desc: 'TRANSFER FROM CHK', amount: '$5,000.00', date: 'Jul 13', answer: '' },
  { id: 3, desc: 'CHECK #1847', amount: '$1,200.00', date: 'Jul 10', answer: '' },
]

const currentIndex = ref(0)
const isComplete = ref(false)

function nextQuestion() {
  if (currentIndex.value < questions.length - 1) {
    currentIndex.value++
  } else {
    isComplete.value = true
  }
}

function goToComplete() {
  router.push('/demo/complete')
}
</script>

<template>
  <div class="demo-portal">
    <div class="portal-split">
      <!-- Left: Explanation -->
      <div class="portal-explain">
        <h2>This is what your client sees</h2>
        <p>
          When you mark transactions as "Ask Client", {{ brand.name }} generates
          a magic link. Your client opens it on their phone and answers
          each question — no signup, no app download.
        </p>
        <div class="portal-stats">
          <div class="portal-stat">
            <span class="portal-stat__value">&lt; 2 min</span>
            <span class="portal-stat__label">Average completion time</span>
          </div>
          <div class="portal-stat">
            <span class="portal-stat__value">92%</span>
            <span class="portal-stat__label">Response rate</span>
          </div>
        </div>
      </div>

      <!-- Right: Phone Mockup -->
      <div class="portal-phone">
        <div class="phone-frame">
          <div class="phone-notch" />
          <div class="phone-screen">
            <!-- In Progress -->
            <template v-if="!isComplete">
              <div class="phone-header">
                <div class="phone-logo">
                  <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
                    <rect width="32" height="32" rx="8" fill="#0066FF"/>
                    <path d="M8 12H24M8 16H20M8 20H16" stroke="white" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  <span>{{ brand.name }}</span>
                </div>
                <div class="phone-progress">
                  <div class="phone-progress__bar">
                    <div
                      class="phone-progress__fill"
                      :style="{ width: `${((currentIndex + 1) / questions.length) * 100}%` }"
                    />
                  </div>
                  <span class="phone-progress__text">{{ currentIndex + 1 }} of {{ questions.length }}</span>
                </div>
              </div>

              <div class="phone-body">
                <p class="phone-greeting" v-if="currentIndex === 0">
                  Hi! Your accountant needs help identifying some transactions.
                </p>

                <div class="phone-question tf-animate-fade-up" :key="currentIndex">
                  <div class="phone-txn">
                    <span class="phone-txn__desc">{{ questions[currentIndex].desc }}</span>
                    <span class="phone-txn__amount">{{ questions[currentIndex].amount }}</span>
                    <span class="phone-txn__date">{{ questions[currentIndex].date }}</span>
                  </div>
                  <label class="phone-label">What was this transaction for?</label>
                  <textarea
                    v-model="questions[currentIndex].answer"
                    class="phone-textarea"
                    placeholder="e.g., Office printer ink cartridges"
                    rows="3"
                  />
                </div>
              </div>

              <div class="phone-footer">
                <button class="phone-btn" @click="nextQuestion">
                  {{ currentIndex < questions.length - 1 ? 'Next' : 'Submit All' }}
                </button>
              </div>
            </template>

            <!-- Complete -->
            <template v-else>
              <div class="phone-complete tf-animate-scale-in">
                <div class="phone-complete__icon">✅</div>
                <h3 class="phone-complete__title">All done!</h3>
                <p class="phone-complete__text">
                  Your answers have been sent to your accountant. Thank you!
                </p>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="portal-cta tf-animate-fade-up tf-delay-3">
      <TfButton size="lg" @click="goToComplete">
        See the Full Experience →
      </TfButton>
    </div>
  </div>
</template>

<style scoped>
.demo-portal {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-10);
  align-items: center;
}

.portal-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--tf-space-12);
  align-items: center;
  max-width: 900px;
  width: 100%;
}

.portal-explain {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-4);
}

.portal-explain h2 {
  font-size: var(--tf-text-h2-size);
  font-weight: 800;
  color: var(--tf-text-primary);
  letter-spacing: -0.02em;
}

.portal-explain p {
  font-size: var(--tf-text-base-size);
  color: var(--tf-text-secondary);
  line-height: 1.7;
}

.portal-stats {
  display: flex;
  gap: var(--tf-space-6);
  margin-top: var(--tf-space-4);
}

.portal-stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.portal-stat__value {
  font-size: var(--tf-text-h2-size);
  font-weight: 800;
  color: var(--tf-primary);
}

.portal-stat__label {
  font-size: var(--tf-text-sm-size);
  color: var(--tf-text-muted);
}

/* ── Phone Frame ── */
.portal-phone {
  display: flex;
  justify-content: center;
}

.phone-frame {
  width: 320px;
  background: #0F172A;
  border-radius: 40px;
  padding: 12px;
  box-shadow: var(--tf-shadow-xl), 0 0 60px rgba(0, 102, 255, 0.1);
}

.phone-notch {
  width: 120px;
  height: 28px;
  background: #0F172A;
  border-radius: 0 0 16px 16px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  margin-top: -12px;
  margin-bottom: -14px;
}

.phone-screen {
  background: var(--tf-surface);
  border-radius: 30px;
  min-height: 560px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.phone-header {
  padding: var(--tf-space-8) var(--tf-space-5) var(--tf-space-4);
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-3);
}

.phone-logo {
  display: flex;
  align-items: center;
  gap: var(--tf-space-2);
  font-size: var(--tf-text-sm-size);
  font-weight: 700;
  color: var(--tf-text-primary);
}

.phone-progress__bar {
  height: 4px;
  background: var(--tf-border);
  border-radius: 2px;
  overflow: hidden;
}

.phone-progress__fill {
  height: 100%;
  background: var(--tf-primary);
  border-radius: 2px;
  transition: width 0.4s var(--tf-ease);
}

.phone-progress__text {
  font-size: 11px;
  color: var(--tf-text-muted);
  margin-top: 4px;
}

.phone-body {
  flex: 1;
  padding: 0 var(--tf-space-5) var(--tf-space-4);
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-4);
}

.phone-greeting {
  font-size: var(--tf-text-sm-size);
  color: var(--tf-text-secondary);
  line-height: 1.6;
  padding: var(--tf-space-3);
  background: var(--tf-bg);
  border-radius: var(--tf-radius);
}

.phone-question {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-3);
}

.phone-txn {
  background: var(--tf-bg);
  border: 1px solid var(--tf-border);
  border-radius: var(--tf-radius);
  padding: var(--tf-space-3);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.phone-txn__desc {
  font-size: var(--tf-text-sm-size);
  font-weight: 600;
  color: var(--tf-text-primary);
}

.phone-txn__amount {
  font-size: var(--tf-text-sm-size);
  font-weight: 700;
  color: var(--tf-text-primary);
  font-family: var(--tf-font-mono);
}

.phone-txn__date {
  font-size: 11px;
  color: var(--tf-text-muted);
}

.phone-label {
  font-size: var(--tf-text-sm-size);
  font-weight: 600;
  color: var(--tf-text-primary);
}

.phone-textarea {
  width: 100%;
  padding: var(--tf-space-3);
  border: 1px solid var(--tf-border);
  border-radius: var(--tf-radius);
  font-family: var(--tf-font-sans);
  font-size: var(--tf-text-sm-size);
  resize: none;
  outline: none;
  transition: var(--tf-transition-colors);
}

.phone-textarea:focus {
  border-color: var(--tf-primary);
  box-shadow: var(--tf-shadow-focus);
}

.phone-footer {
  padding: var(--tf-space-4) var(--tf-space-5) var(--tf-space-6);
}

.phone-btn {
  width: 100%;
  padding: var(--tf-space-3) var(--tf-space-6);
  background: var(--tf-primary);
  color: white;
  border: none;
  border-radius: var(--tf-radius);
  font-size: var(--tf-text-sm-size);
  font-weight: 600;
  font-family: var(--tf-font-sans);
  cursor: pointer;
  transition: var(--tf-transition-all);
}

.phone-btn:hover {
  background: var(--tf-primary-hover);
}

/* ── Complete ── */
.phone-complete {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--tf-space-4);
  padding: var(--tf-space-8);
  text-align: center;
}

.phone-complete__icon { font-size: 3rem; }
.phone-complete__title { font-size: var(--tf-text-h3-size); font-weight: 700; color: var(--tf-text-primary); }
.phone-complete__text { font-size: var(--tf-text-sm-size); color: var(--tf-text-secondary); line-height: 1.6; }

.portal-cta {
  text-align: center;
}

@media (max-width: 768px) {
  .portal-split {
    grid-template-columns: 1fr;
    gap: var(--tf-space-8);
  }

  .portal-explain { text-align: center; }
  .portal-stats { justify-content: center; }
}
</style>
