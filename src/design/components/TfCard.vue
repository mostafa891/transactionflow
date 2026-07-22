<script setup lang="ts">
interface Props {
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
  bordered?: boolean
}

withDefaults(defineProps<Props>(), {
  padding: 'md',
  hoverable: false,
  bordered: true,
})
</script>

<template>
  <div
    :class="[
      'tf-card',
      `tf-card--pad-${padding}`,
      { 'tf-card--hoverable': hoverable, 'tf-card--bordered': bordered }
    ]"
  >
    <div v-if="$slots.header" class="tf-card__header">
      <slot name="header" />
    </div>
    <div class="tf-card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="tf-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.tf-card {
  background-color: var(--tf-surface);
  border-radius: var(--tf-radius-lg);
  box-shadow: var(--tf-shadow);
  transition: var(--tf-transition-shadow), var(--tf-transition-transform);
  overflow: hidden;
}

.tf-card--bordered {
  border: 1px solid var(--tf-border);
}

.tf-card--hoverable:hover {
  box-shadow: var(--tf-shadow-card);
  transform: translateY(-2px);
}

/* ── Padding ── */
.tf-card--pad-none .tf-card__body { padding: 0; }
.tf-card--pad-sm .tf-card__body { padding: var(--tf-space-4); }
.tf-card--pad-md .tf-card__body { padding: var(--tf-space-6); }
.tf-card--pad-lg .tf-card__body { padding: var(--tf-space-8); }

.tf-card__header {
  padding: var(--tf-space-4) var(--tf-space-6);
  border-bottom: 1px solid var(--tf-border);
}

.tf-card__footer {
  padding: var(--tf-space-4) var(--tf-space-6);
  border-top: 1px solid var(--tf-border);
}
</style>
