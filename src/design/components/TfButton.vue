<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  as?: 'button' | 'a'
  href?: string
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  fullWidth: false,
  as: 'button',
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <component
    :is="as"
    :href="as === 'a' ? href : undefined"
    :disabled="disabled || loading"
    :class="[
      'tf-btn',
      `tf-btn--${variant}`,
      `tf-btn--${size}`,
      { 'tf-btn--full': fullWidth, 'tf-btn--loading': loading }
    ]"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="tf-btn__spinner" />
    <slot />
  </component>
</template>

<style scoped>
.tf-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--tf-space-2);
  font-family: var(--tf-font-sans);
  font-weight: 600;
  border-radius: var(--tf-radius);
  transition: var(--tf-transition-colors), var(--tf-transition-shadow), var(--tf-transition-transform);
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;
  position: relative;
  overflow: hidden;
}

.tf-btn:focus-visible {
  outline: none;
  box-shadow: var(--tf-shadow-focus);
}

.tf-btn:active:not(:disabled) {
  transform: scale(0.98);
}

.tf-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ── Sizes ── */
.tf-btn--sm {
  padding: var(--tf-space-2) var(--tf-space-4);
  font-size: var(--tf-text-sm-size);
  height: 36px;
}

.tf-btn--md {
  padding: var(--tf-space-3) var(--tf-space-6);
  font-size: var(--tf-text-sm-size);
  height: 44px;
}

.tf-btn--lg {
  padding: var(--tf-space-4) var(--tf-space-8);
  font-size: var(--tf-text-base-size);
  height: 52px;
}

/* ── Variants ── */
.tf-btn--primary {
  background-color: var(--tf-primary);
  color: var(--tf-on-primary);
  box-shadow: var(--tf-shadow-sm);
}

.tf-btn--primary:hover:not(:disabled) {
  background-color: var(--tf-primary-hover);
  box-shadow: var(--tf-shadow);
}

.tf-btn--secondary {
  background-color: var(--tf-surface);
  color: var(--tf-text-primary);
  border: 1px solid var(--tf-border);
}

.tf-btn--secondary:hover:not(:disabled) {
  background-color: var(--tf-surface-hover);
  border-color: var(--tf-border-hover);
}

.tf-btn--ghost {
  background-color: transparent;
  color: var(--tf-text-secondary);
}

.tf-btn--ghost:hover:not(:disabled) {
  background-color: var(--tf-surface-hover);
  color: var(--tf-text-primary);
}

.tf-btn--danger {
  background-color: var(--tf-error);
  color: var(--tf-on-error);
}

.tf-btn--danger:hover:not(:disabled) {
  background-color: var(--tf-error-dark);
}

/* ── Full Width ── */
.tf-btn--full {
  width: 100%;
}

/* ── Loading ── */
.tf-btn--loading {
  color: transparent !important;
}

.tf-btn__spinner {
  position: absolute;
  width: 18px;
  height: 18px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: tf-spin 0.6s linear infinite;
}

.tf-btn--loading .tf-btn__spinner {
  color: var(--tf-on-primary);
}

@keyframes tf-spin {
  to { transform: rotate(360deg); }
}
</style>
