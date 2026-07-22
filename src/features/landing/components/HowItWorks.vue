<script setup lang="ts">
import { brand } from '@shared/constants/brand'

const steps = [
  {
    number: '01',
    title: 'Import your bank data',
    description: 'Upload a CSV from any bank. We auto-detect uncategorized or unclear transactions in seconds.',
    color: '#0066FF',
  },
  {
    number: '02',
    title: 'Review & build questions',
    description: `${brand.name} auto-generates clear, client-friendly questions for each transaction that needs clarification.`,
    color: '#8B5CF6',
  },
  {
    number: '03',
    title: 'Send via magic link',
    description: 'Your client gets a single link — no signup, no app. They answer questions from their phone in under 2 minutes.',
    color: '#10B981',
  },
  {
    number: '04',
    title: 'Auto follow-up & resolve',
    description: 'No response? We escalate automatically. Email → SMS → WhatsApp. You never chase again.',
    color: '#F59E0B',
  },
]
</script>

<template>
  <section id="how-it-works" class="how-it-works tf-section">
    <div class="tf-container">
      <div class="how-it-works__header">
        <span class="how-it-works__eyebrow">How it works</span>
        <h2 class="how-it-works__title">
          From confused transactions to
          <span class="tf-text-gradient">clear answers</span>
          in 4 steps
        </h2>
      </div>

      <div class="how-it-works__timeline">
        <div
          v-for="(step, i) in steps"
          :key="i"
          class="step tf-animate-fade-up"
          :class="`tf-delay-${i + 1}`"
        >
          <div class="step__indicator">
            <div class="step__number" :style="{ background: step.color }">
              {{ step.number }}
            </div>
            <div v-if="i < steps.length - 1" class="step__connector" />
          </div>
          <div class="step__content">
            <h3 class="step__title">{{ step.title }}</h3>
            <p class="step__desc">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.how-it-works {
  background: var(--tf-surface);
}

.how-it-works__header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto var(--tf-space-16);
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-4);
}

.how-it-works__eyebrow {
  font-size: var(--tf-text-sm-size);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--tf-primary);
}

.how-it-works__title {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.03em;
  color: var(--tf-text-primary);
}

.how-it-works__timeline {
  max-width: 680px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.step {
  display: flex;
  gap: var(--tf-space-6);
  padding-bottom: var(--tf-space-10);
}

.step:last-child {
  padding-bottom: 0;
}

.step__indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.step__number {
  width: 48px;
  height: 48px;
  border-radius: var(--tf-radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--tf-text-sm-size);
  font-weight: 800;
  color: white;
  flex-shrink: 0;
}

.step__connector {
  width: 2px;
  flex: 1;
  background: linear-gradient(180deg, var(--tf-border) 0%, transparent 100%);
  margin-top: var(--tf-space-3);
}

.step__content {
  padding-top: var(--tf-space-2);
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-2);
}

.step__title {
  font-size: var(--tf-text-h3-size);
  font-weight: 700;
  color: var(--tf-text-primary);
}

.step__desc {
  font-size: var(--tf-text-base-size);
  color: var(--tf-text-secondary);
  line-height: 1.7;
}
</style>
