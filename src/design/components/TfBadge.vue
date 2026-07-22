<script setup lang="ts">
interface Props {
  variant?: 'neutral' | 'primary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md'
  dot?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'neutral',
  size: 'sm',
  dot: false,
})
</script>

<template>
  <span :class="['tf-badge', `tf-badge--${variant}`, `tf-badge--${size}`]">
    <span v-if="dot" class="tf-badge__dot" />
    <slot />
  </span>
</template>

<style scoped>
.tf-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--tf-space-1);
  font-family: var(--tf-font-sans);
  font-weight: 600;
  border-radius: var(--tf-radius-full);
  white-space: nowrap;
}

.tf-badge--sm {
  padding: 2px var(--tf-space-2);
  font-size: 11px;
  line-height: 1.4;
}

.tf-badge--md {
  padding: var(--tf-space-1) var(--tf-space-3);
  font-size: var(--tf-text-caption-size);
}

/* ── Variants ── */
.tf-badge--neutral {
  background-color: #F1F5F9;
  color: #475569;
}

.tf-badge--primary {
  background-color: var(--tf-primary-light);
  color: var(--tf-primary);
}

.tf-badge--success {
  background-color: var(--tf-success-light);
  color: var(--tf-success-dark);
}

.tf-badge--warning {
  background-color: var(--tf-warning-light);
  color: var(--tf-warning-dark);
}

.tf-badge--error {
  background-color: var(--tf-error-light);
  color: var(--tf-error-dark);
}

/* ── Dot ── */
.tf-badge__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: currentColor;
}
</style>
