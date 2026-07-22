<script setup lang="ts">
import { brand } from '@shared/constants/brand'

const comparisons = [
  {
    channel: 'Spreadsheets (Excel/Sheets)',
    icon: '📊',
    problem: 'Clients ignore attachment emails, break formulas, or overwrite historical data.',
    solution: `${brand.name} generates interactive web forms with built-in validation.`,
  },
  {
    channel: 'Email Threads',
    icon: '✉️',
    problem: 'Questions get lost in busy inboxes, replies lack receipt attachments, no status tracking.',
    solution: 'Smart Magic Links track opens, responses, and attached receipts automatically.',
  },
  {
    channel: 'WhatsApp & SMS Messages',
    icon: '💬',
    problem: 'Disorganized chat history, no audit trail for compliance, manual typing of transactions.',
    solution: 'Automated multi-channel escalation with a full compliance audit trail.',
  },
]
</script>

<template>
  <section class="comparison tf-section">
    <div class="tf-container">
      <div class="comparison__header">
        <span class="comparison__eyebrow">The Problem</span>
        <h2 class="comparison__title">
          Why traditional methods <span class="tf-text-gradient">fail accountants</span>
        </h2>
        <p class="comparison__subtitle">
          Chasing clients through spreadsheets, email threads, and WhatsApp chats wastes hours every week.
        </p>
      </div>

      <div class="comparison__grid">
        <div v-for="(item, i) in comparisons" :key="i" class="comp-card tf-animate-fade-up" :class="`tf-delay-${i + 1}`">
          <div class="comp-card__header">
            <span class="comp-card__icon">{{ item.icon }}</span>
            <h3 class="comp-card__channel">{{ item.channel }}</h3>
          </div>

          <div class="comp-card__problem">
            <span class="comp-card__label comp-card__label--fail">❌ The Pain</span>
            <p>{{ item.problem }}</p>
          </div>

          <div class="comp-card__solution">
            <span class="comp-card__label comp-card__label--success">✅ The Fix</span>
            <p>{{ item.solution }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.comparison {
  background: var(--tf-surface);
  border-top: 1px solid var(--tf-border);
  border-bottom: 1px solid var(--tf-border);
}

.comparison__header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto var(--tf-space-12);
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-3);
}

.comparison__eyebrow {
  font-size: var(--tf-text-sm-size);
  font-weight: 600;
  color: var(--tf-error);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.comparison__title {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--tf-text-primary);
}

.comparison__subtitle {
  font-size: var(--tf-text-lg-size);
  color: var(--tf-text-secondary);
}

.comparison__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--tf-space-6);
}

.comp-card {
  background: var(--tf-bg);
  border: 1px solid var(--tf-border);
  border-radius: var(--tf-radius-lg);
  padding: var(--tf-space-6);
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-5);
}

.comp-card__header {
  display: flex;
  align-items: center;
  gap: var(--tf-space-3);
}

.comp-card__icon {
  font-size: 1.75rem;
}

.comp-card__channel {
  font-size: var(--tf-text-h3-size);
  font-weight: 700;
  color: var(--tf-text-primary);
}

.comp-card__label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
  display: inline-block;
}

.comp-card__label--fail { color: var(--tf-error-dark); }
.comp-card__label--success { color: var(--tf-success-dark); }

.comp-card__problem p,
.comp-card__solution p {
  font-size: var(--tf-text-sm-size);
  line-height: 1.6;
  color: var(--tf-text-secondary);
}

@media (max-width: 968px) {
  .comparison__grid {
    grid-template-columns: 1fr;
  }
}
</style>
