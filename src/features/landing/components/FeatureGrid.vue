<script setup lang="ts">
import { brand } from '@shared/constants/brand'

const features = [
  {
    icon: '📥',
    title: 'Import in Seconds',
    description: 'Drop your bank CSV and we instantly detect uncategorized transactions. No manual sorting.',
  },
  {
    icon: '❓',
    title: 'Smart Clarification Requests',
    description: 'Auto-generate personalized questions for each transaction. Your clients see only what matters to them.',
  },
  {
    icon: '🔗',
    title: 'Magic Links, Zero Friction',
    description: 'Clients click one link — no login, no app download. Answer questions from any device in under 2 minutes.',
  },
  {
    icon: '⏰',
    title: 'Auto Follow-ups That Work',
    description: 'Escalate from email to SMS to WhatsApp. Stop manually chasing — let the system handle it.',
  },
  {
    icon: '📊',
    title: 'Real-time Response Tracking',
    description: 'Know exactly who responded, who ignored, and who needs a nudge. Per-client health scores.',
  },
  {
    icon: '📤',
    title: 'Export-Ready Data',
    description: 'Once clarified, export categorized transactions directly to your accounting software.',
  },
]
</script>

<template>
  <section id="features" class="features tf-section">
    <div class="tf-container">
      <div class="features__header">
        <span class="features__eyebrow">Why {{ brand.name }}?</span>
        <h2 class="features__title">
          Everything you need to close the
          <span class="tf-text-gradient">communication gap</span>
        </h2>
        <p class="features__subtitle">
          The average accountant spends 8+ hours per week chasing clients for transaction details.
          We turn that into 8 minutes.
        </p>
      </div>

      <div class="features__grid">
        <div
          v-for="(feature, i) in features"
          :key="i"
          class="feature-card tf-animate-fade-up"
          :class="`tf-delay-${i + 1}`"
        >
          <div class="feature-card__icon">{{ feature.icon }}</div>
          <h3 class="feature-card__title">{{ feature.title }}</h3>
          <p class="feature-card__desc">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features {
  background: var(--tf-bg);
}

.features__header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto var(--tf-space-16);
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-4);
}

.features__eyebrow {
  font-size: var(--tf-text-sm-size);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--tf-primary);
}

.features__title {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.03em;
  color: var(--tf-text-primary);
}

.features__subtitle {
  font-size: var(--tf-text-lg-size);
  color: var(--tf-text-secondary);
  line-height: 1.7;
}

.features__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--tf-space-6);
}

.feature-card {
  background: var(--tf-surface);
  border: 1px solid var(--tf-border);
  border-radius: var(--tf-radius-lg);
  padding: var(--tf-space-8);
  transition: var(--tf-transition-shadow), var(--tf-transition-transform);
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-3);
}

.feature-card:hover {
  box-shadow: var(--tf-shadow-card);
  transform: translateY(-4px);
  border-color: var(--tf-primary);
}

.feature-card__icon {
  font-size: 2rem;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--tf-primary-light);
  border-radius: var(--tf-radius-md);
}

.feature-card__title {
  font-size: var(--tf-text-h3-size);
  font-weight: 700;
  color: var(--tf-text-primary);
  letter-spacing: -0.01em;
}

.feature-card__desc {
  font-size: var(--tf-text-sm-size);
  color: var(--tf-text-secondary);
  line-height: 1.7;
}

@media (max-width: 968px) {
  .features__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .features__grid {
    grid-template-columns: 1fr;
  }
}
</style>
