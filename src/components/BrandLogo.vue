<script setup lang="ts">
import { brand } from '@shared/constants/brand'

defineProps<{
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}>()
</script>

<template>
  <div :class="['brand-logo', `brand-logo--${size || 'md'}`]">
    <div class="brand-logo__mark">
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="10" fill="url(#brand-grad)"/>
        <path d="M10 15H30M10 20H25M10 25H20" stroke="white" stroke-width="3" stroke-linecap="round"/>
        <circle cx="28" cy="25" r="2.5" fill="#60A5FA"/>
        <defs>
          <linearGradient id="brand-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stop-color="#0066FF"/>
            <stop offset="1" stop-color="#4F46E5"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div v-if="showText !== false" class="brand-logo__text">
      <span class="brand-logo__name">{{ brand.name }}</span>
      <span class="brand-logo__sub">{{ brand.parentBrand }}</span>
    </div>
  </div>
</template>

<style scoped>
.brand-logo {
  display: inline-flex;
  align-items: center;
  gap: var(--tf-space-3);
  text-decoration: none;
}

.brand-logo__mark {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.brand-logo--sm .brand-logo__mark svg { width: 28px; height: 28px; }
.brand-logo--md .brand-logo__mark svg { width: 36px; height: 36px; }
.brand-logo--lg .brand-logo__mark svg { width: 48px; height: 48px; }

.brand-logo__text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.brand-logo__name {
  font-weight: 800;
  color: var(--tf-text-primary);
  letter-spacing: -0.02em;
}

.brand-logo--sm .brand-logo__name { font-size: 14px; }
.brand-logo--md .brand-logo__name { font-size: 18px; }
.brand-logo--lg .brand-logo__name { font-size: 24px; }

.brand-logo__sub {
  font-size: 10px;
  font-weight: 700;
  color: var(--tf-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
