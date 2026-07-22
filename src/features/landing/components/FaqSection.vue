<script setup lang="ts">
import { ref } from 'vue'
import { brand } from '@shared/constants/brand'

const faqs = ref([
  {
    question: 'Do my clients need to create an account or download an app?',
    answer: 'No! Your clients click a secure Magic Link sent via Email, SMS, or WhatsApp. They answer questions directly in their mobile browser without any login password.',
    open: true,
  },
  {
    question: 'How does CSV import work?',
    answer: 'Simply export a bank statement or uncategorized transactions list from any bank or accounting software as CSV. Our 6-step wizard auto-detects date formats, currencies, and missing categories.',
    open: false,
  },
  {
    question: 'Can clients upload receipts for transactions?',
    answer: 'Yes! Clients can snap a photo with their smartphone camera or upload PDF/image files directly in the portal alongside their answer.',
    open: false,
  },
  {
    question: 'What happens if a client ignores the request?',
    answer: `${brand.name} includes an automated reminder engine. You can schedule gentle follow-ups via Email, SMS, and WhatsApp until the client responds.`,
    open: false,
  },
  {
    question: 'Is there an audit trail for compliance?',
    answer: 'Every action is logged in a detailed Audit Trail with timestamps, IP addresses, and delivery channel statuses so you have full proof of communication.',
    open: false,
  },
])

function toggleFaq(index: number) {
  faqs.value[index].open = !faqs.value[index].open
}
</script>

<template>
  <section class="faq tf-section">
    <div class="tf-container tf-container--narrow">
      <div class="faq__header">
        <span class="faq__eyebrow">FAQ</span>
        <h2 class="faq__title">Frequently Asked Questions</h2>
      </div>

      <div class="faq__list">
        <div
          v-for="(faq, i) in faqs"
          :key="i"
          class="faq-item"
          :class="{ 'faq-item--open': faq.open }"
        >
          <button class="faq-item__trigger" @click="toggleFaq(i)">
            <span class="faq-item__qtext">{{ faq.question }}</span>
            <span class="faq-item__icon">{{ faq.open ? '−' : '+' }}</span>
          </button>
          <div v-if="faq.open" class="faq-item__answer tf-animate-fade-down">
            <p>{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq {
  background: var(--tf-bg);
}

.faq__header {
  text-align: center;
  margin-bottom: var(--tf-space-12);
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-2);
}

.faq__eyebrow {
  font-size: var(--tf-text-sm-size);
  font-weight: 600;
  color: var(--tf-primary);
  text-transform: uppercase;
}

.faq__title {
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 800;
  color: var(--tf-text-primary);
}

.faq__list {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-3);
}

.faq-item {
  background: var(--tf-surface);
  border: 1px solid var(--tf-border);
  border-radius: var(--tf-radius-lg);
  overflow: hidden;
  transition: var(--tf-transition-colors), var(--tf-transition-shadow);
}

.faq-item--open {
  border-color: var(--tf-primary);
  box-shadow: var(--tf-shadow-sm);
}

.faq-item__trigger {
  width: 100%;
  padding: var(--tf-space-5) var(--tf-space-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  font-size: var(--tf-text-base-size);
  font-weight: 600;
  color: var(--tf-text-primary);
  background: none;
  border: none;
  cursor: pointer;
  gap: var(--tf-space-4);
}

.faq-item__qtext {
  flex: 1;
}

.faq-item__icon {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--tf-primary);
  line-height: 1;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.faq-item__answer {
  padding: 0 var(--tf-space-6) var(--tf-space-5);
  font-size: var(--tf-text-sm-size);
  color: var(--tf-text-secondary);
  line-height: 1.7;
}
</style>
