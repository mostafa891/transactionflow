<script setup lang="ts">
import { brand } from '@shared/constants/brand'
import { TfCard, TfBadge } from '@design/components'

const quotes = [
  {
    quote: '"We spend 10 to 12 hours every month-end chasing clients over email for 25 mystery Amazon and Uber transactions..."',
    author: 'Accounting Firm Partner (r/accounting)',
    pain: 'Messy Spreadsheets & Manual Emails',
    solution: 'Auto-parse CSV and generate 1-click no-password Magic Links.',
  },
  {
    quote: '"I had 12 emails, 6 phone calls, and 7 WhatsApp messages just to get one receipt for a $5,000 transfer..."',
    author: 'Senior Bookkeeper',
    pain: 'Scattered Communication',
    solution: 'Single central audit log tracking every open, reply, and receipt photo.',
  },
  {
    quote: '"Clients never open spreadsheet attachments and ignore our follow-up emails for 3 weeks straight..."',
    author: 'CPA Practice Lead',
    pain: 'Zero Accountability',
    solution: 'Automated multi-channel escalation (Email ➔ SMS ➔ WhatsApp) that stops instantly when answered.',
  },
]
</script>

<template>
  <section class="real-workflows tf-section">
    <div class="tf-container">
      <div class="section-header">
        <TfBadge variant="primary">Built From Real Accountant Workflows</TfBadge>
        <h2>Designed to Fix Real Bookkeeping Frustrations</h2>
        <p class="subtitle">
          We interviewed accountants and analyzed real daily bottlenecks to create {{ brand.name }}.
        </p>
      </div>

      <div class="quotes-grid">
        <div v-for="(item, idx) in quotes" :key="idx" class="quote-card tf-animate-fade-up">
          <div class="quote-top">
            <span class="quote-mark">“</span>
            <p class="quote-text">{{ item.quote }}</p>
            <span class="quote-author">— {{ item.author }}</span>
          </div>

          <div class="solution-box">
            <div class="solution-header">
              <span class="fix-badge">HOW {{ brand.name.toUpperCase() }} FIXES THIS</span>
            </div>
            <strong class="solution-text">✓ {{ item.solution }}</strong>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.real-workflows {
  background: #F8FAFC;
  border-top: 1px solid var(--tf-border);
  border-bottom: 1px solid var(--tf-border);
}

.section-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--tf-space-3);
  margin-bottom: var(--tf-space-12);
}

.section-header h2 {
  font-size: var(--tf-text-h2-size);
  font-weight: 800;
  color: var(--tf-text-primary);
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: var(--tf-text-lg-size);
  color: var(--tf-text-secondary);
  max-width: 600px;
}

.quotes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--tf-space-6);
}

.quote-card {
  background: white;
  border: 1px solid var(--tf-border);
  border-radius: var(--tf-radius-xl);
  padding: var(--tf-space-6);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: var(--tf-shadow-sm);
  gap: var(--tf-space-6);
}

.quote-top {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-3);
}

.quote-mark {
  font-size: 3rem;
  line-height: 1;
  color: var(--tf-primary);
  font-family: Georgia, serif;
}

.quote-text {
  font-size: var(--tf-text-base-size);
  font-style: italic;
  color: var(--tf-text-primary);
  line-height: 1.6;
}

.quote-author {
  font-size: 12px;
  font-weight: 700;
  color: var(--tf-text-muted);
}

.solution-box {
  background: var(--tf-primary-light);
  border: 1px solid rgba(0, 102, 255, 0.2);
  border-radius: var(--tf-radius-lg);
  padding: var(--tf-space-4);
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-2);
}

.solution-header {
  display: flex;
  align-items: center;
}

.fix-badge {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: var(--tf-primary);
}

.solution-text {
  font-size: 13px;
  color: var(--tf-text-primary);
  font-weight: 700;
  line-height: 1.4;
}

@media (max-width: 968px) {
  .quotes-grid {
    grid-template-columns: 1fr;
  }
}
</style>
