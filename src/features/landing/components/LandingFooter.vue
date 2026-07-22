<script setup lang="ts">
import { brand } from '@shared/constants/brand'
</script>

<template>
  <footer class="footer">
    <div class="tf-container">
      <div class="footer__inner">
        <div class="footer__brand">
          <div class="footer__logo">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#0066FF"/>
              <path d="M8 12H24M8 16H20M8 20H16" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <span>{{ brand.name }}</span>
          </div>
          <p class="footer__tagline">{{ brand.tagline }}</p>
        </div>
        <div class="footer__links">
          <router-link to="/">Home</router-link>
          <router-link to="/#features">Features</router-link>
          <router-link to="/demo">Demo</router-link>
          <router-link to="/early-access">Early Access</router-link>
        </div>
      </div>
      <div class="footer__bottom">
        <p>&copy; {{ brand.legal.year }} {{ brand.legal.entity }}. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--tf-surface);
  border-top: 1px solid var(--tf-border);
  padding: var(--tf-space-12) 0 var(--tf-space-6);
}

.footer__inner {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--tf-space-8);
  padding-bottom: var(--tf-space-8);
  border-bottom: 1px solid var(--tf-border);
}

.footer__brand {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-2);
}

.footer__logo {
  display: flex;
  align-items: center;
  gap: var(--tf-space-2);
  font-weight: 700;
  font-size: var(--tf-text-base-size);
  color: var(--tf-text-primary);
}

.footer__tagline {
  font-size: var(--tf-text-sm-size);
  color: var(--tf-text-muted);
  max-width: 300px;
}

.footer__links {
  display: flex;
  gap: var(--tf-space-6);
}

.footer__links a {
  font-size: var(--tf-text-sm-size);
  color: var(--tf-text-secondary);
  text-decoration: none;
  transition: var(--tf-transition-colors);
}

.footer__links a:hover {
  color: var(--tf-text-primary);
}

.footer__bottom {
  padding-top: var(--tf-space-6);
  text-align: center;
}

.footer__bottom p {
  font-size: var(--tf-text-caption-size);
  color: var(--tf-text-muted);
}

@media (max-width: 600px) {
  .footer__inner {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .footer__links {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
