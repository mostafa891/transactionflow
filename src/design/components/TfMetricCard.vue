<script setup lang="ts">
interface Props {
  label: string
  value: string | number
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  icon?: string
}

withDefaults(defineProps<Props>(), {
  trend: 'neutral',
  trendValue: '',
})
</script>

<template>
  <div class="tf-metric">
    <div class="tf-metric__header">
      <span class="tf-metric__label">{{ label }}</span>
      <span
        v-if="trendValue"
        :class="['tf-metric__trend', `tf-metric__trend--${trend}`]"
      >
        <svg v-if="trend === 'up'" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 2L10 6H7V10H5V6H2L6 2Z" fill="currentColor"/>
        </svg>
        <svg v-else-if="trend === 'down'" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 10L2 6H5V2H7V6H10L6 10Z" fill="currentColor"/>
        </svg>
        {{ trendValue }}
      </span>
    </div>
    <div class="tf-metric__value">{{ value }}</div>
    <div v-if="$slots.footer" class="tf-metric__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.tf-metric {
  background-color: var(--tf-surface);
  border: 1px solid var(--tf-border);
  border-radius: var(--tf-radius-lg);
  padding: var(--tf-space-6);
  transition: var(--tf-transition-shadow);
}

.tf-metric:hover {
  box-shadow: var(--tf-shadow-card);
}

.tf-metric__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--tf-space-3);
}

.tf-metric__label {
  font-size: var(--tf-text-sm-size);
  font-weight: 500;
  color: var(--tf-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.tf-metric__value {
  font-size: var(--tf-text-h1-size);
  font-weight: var(--tf-text-h1-weight);
  color: var(--tf-text-primary);
  line-height: 1;
  letter-spacing: -0.02em;
}

.tf-metric__trend {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-size: var(--tf-text-caption-size);
  font-weight: 600;
  padding: 2px var(--tf-space-2);
  border-radius: var(--tf-radius-full);
}

.tf-metric__trend--up {
  color: var(--tf-success-dark);
  background-color: var(--tf-success-light);
}

.tf-metric__trend--down {
  color: var(--tf-error-dark);
  background-color: var(--tf-error-light);
}

.tf-metric__trend--neutral {
  color: var(--tf-text-muted);
  background-color: #F1F5F9;
}

.tf-metric__footer {
  margin-top: var(--tf-space-3);
  padding-top: var(--tf-space-3);
  border-top: 1px solid var(--tf-border);
  font-size: var(--tf-text-sm-size);
  color: var(--tf-text-muted);
}
</style>
