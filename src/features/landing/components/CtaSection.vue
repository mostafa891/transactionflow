<script setup lang="ts">
import { brand } from '@shared/constants/brand'
import { TfButton } from '@design/components'
</script>

<template>
  <section class="cta tf-section">
    <div class="tf-container">
      <div class="cta__card">
        <div class="cta__glow" />
        <div class="cta__content">
          <h2 class="cta__title">
            Ready to stop chasing clients?
          </h2>
          <p class="cta__subtitle">
            Join the waitlist and be the first to automate your transaction clarification workflow.
          </p>
          <div class="cta__actions">
            <TfButton size="lg" as="a" href="/early-access">
              {{ brand.cta.earlyAccess }}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 8H13M9 4L13 8L9 12"/>
              </svg>
            </TfButton>
            <TfButton variant="ghost" size="lg" as="a" href="/demo">
              {{ brand.cta.secondary }}
            </TfButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta__card {
  position: relative;
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  border-radius: var(--tf-radius-xl);
  padding: var(--tf-space-16) var(--tf-space-8);
  text-align: center;
  overflow: hidden;
}

.cta__glow {
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(0, 102, 255, 0.2) 0%, transparent 60%);
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}

.cta__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--tf-space-6);
  max-width: 560px;
  margin: 0 auto;
}

.cta__title {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 800;
  color: white;
  letter-spacing: -0.03em;
  line-height: 1.2;
}

.cta__subtitle {
  font-size: var(--tf-text-lg-size);
  color: #94A3B8;
  line-height: 1.7;
}

.cta__actions {
  display: flex;
  gap: var(--tf-space-4);
  padding-top: var(--tf-space-2);
}

.cta__actions :deep(.tf-btn--ghost) {
  color: #94A3B8;
}

.cta__actions :deep(.tf-btn--ghost:hover) {
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

@media (max-width: 600px) {
  .cta__card {
    padding: var(--tf-space-10) var(--tf-space-6);
  }

  .cta__actions {
    flex-direction: column;
    width: 100%;
  }
}
</style>
