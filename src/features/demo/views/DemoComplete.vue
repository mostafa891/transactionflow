<script setup lang="ts">
import { brand } from '@shared/constants/brand'
import { TfButton } from '@design/components'
</script>

<template>
  <div class="demo-complete">
    <div class="complete-card tf-animate-scale-in">
      <div class="complete-icon">🎉</div>
      <h1 class="complete-title">That's {{ brand.name }} in action</h1>
      <p class="complete-subtitle">
        You just experienced the full workflow:<br/>
        <strong>Import → Review → Ask Client → Get Answers</strong>
      </p>

      <div class="complete-highlights">
        <div class="highlight">
          <span class="highlight-icon">⏱️</span>
          <div>
            <strong>2 minutes</strong>
            <p>That's how long it takes your client to respond</p>
          </div>
        </div>
        <div class="highlight">
          <span class="highlight-icon">🔄</span>
          <div>
            <strong>Zero follow-up needed</strong>
            <p>Auto-reminders handle the chasing for you</p>
          </div>
        </div>
        <div class="highlight">
          <span class="highlight-icon">📊</span>
          <div>
            <strong>92% response rate</strong>
            <p>Because magic links are frictionless</p>
          </div>
        </div>
      </div>

      <div class="complete-actions">
        <TfButton size="lg" as="a" href="/early-access">
          {{ brand.cta.earlyAccess }}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 8H13M9 4L13 8L9 12"/>
          </svg>
        </TfButton>
        <TfButton variant="secondary" size="lg" as="a" href="/demo">
          ← Try Again
        </TfButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-complete {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 180px);
}

.complete-card {
  text-align: center;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--tf-space-6);
}

.complete-icon { font-size: 4rem; }

.complete-title {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 800;
  color: var(--tf-text-primary);
  letter-spacing: -0.03em;
}

.complete-subtitle {
  font-size: var(--tf-text-lg-size);
  color: var(--tf-text-secondary);
  line-height: 1.7;
}

.complete-highlights {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-4);
  width: 100%;
  text-align: left;
  background: var(--tf-surface);
  border: 1px solid var(--tf-border);
  border-radius: var(--tf-radius-lg);
  padding: var(--tf-space-6);
  margin: var(--tf-space-4) 0;
}

.highlight {
  display: flex;
  align-items: flex-start;
  gap: var(--tf-space-4);
}

.highlight-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  margin-top: 2px;
}

.highlight strong {
  font-size: var(--tf-text-base-size);
  color: var(--tf-text-primary);
}

.highlight p {
  font-size: var(--tf-text-sm-size);
  color: var(--tf-text-muted);
  margin-top: 2px;
}

.complete-actions {
  display: flex;
  gap: var(--tf-space-4);
}

@media (max-width: 600px) {
  .complete-actions {
    flex-direction: column;
    width: 100%;
  }
}
</style>
