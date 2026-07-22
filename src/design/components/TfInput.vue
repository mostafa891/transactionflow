<script setup lang="ts">
interface Props {
  modelValue?: string
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url'
  label?: string
  placeholder?: string
  error?: string
  hint?: string
  disabled?: boolean
  required?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  modelValue: '',
  disabled: false,
  required: false,
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div :class="['tf-input-group', { 'tf-input-group--error': error }]">
    <label v-if="label" class="tf-input-group__label">
      {{ label }}
      <span v-if="required" class="tf-input-group__required">*</span>
    </label>
    <div class="tf-input-wrapper">
      <slot name="prefix" />
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        class="tf-input"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <slot name="suffix" />
    </div>
    <p v-if="error" class="tf-input-group__error">{{ error }}</p>
    <p v-else-if="hint" class="tf-input-group__hint">{{ hint }}</p>
  </div>
</template>

<style scoped>
.tf-input-group {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-1);
}

.tf-input-group__label {
  font-size: var(--tf-text-sm-size);
  font-weight: 500;
  color: var(--tf-text-primary);
}

.tf-input-group__required {
  color: var(--tf-error);
}

.tf-input-wrapper {
  display: flex;
  align-items: center;
  background-color: var(--tf-surface);
  border: 1px solid var(--tf-border);
  border-radius: var(--tf-radius);
  transition: var(--tf-transition-colors), var(--tf-transition-shadow);
  overflow: hidden;
}

.tf-input-wrapper:focus-within {
  border-color: var(--tf-border-focus);
  box-shadow: var(--tf-shadow-focus);
}

.tf-input-group--error .tf-input-wrapper {
  border-color: var(--tf-border-error);
}

.tf-input-group--error .tf-input-wrapper:focus-within {
  box-shadow: var(--tf-shadow-focus-error);
}

.tf-input {
  flex: 1;
  width: 100%;
  padding: var(--tf-space-3) var(--tf-space-4);
  font-size: var(--tf-text-base-size);
  color: var(--tf-text-primary);
  background: transparent;
  border: none;
  outline: none;
}

.tf-input::placeholder {
  color: var(--tf-text-muted);
}

.tf-input:disabled {
  background-color: var(--tf-surface-hover);
  cursor: not-allowed;
  color: var(--tf-text-disabled);
}

.tf-input-group__error {
  font-size: var(--tf-text-caption-size);
  color: var(--tf-error);
}

.tf-input-group__hint {
  font-size: var(--tf-text-caption-size);
  color: var(--tf-text-muted);
}
</style>
