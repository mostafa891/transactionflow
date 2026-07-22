<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { brand } from '@shared/constants/brand'
import { TfButton } from '@design/components'
import BrandLogo from '@/components/BrandLogo.vue'

const router = useRouter()
const route = useRoute()
const isMobileMenuOpen = ref(false)

function scrollToSection(sectionId: string) {
  isMobileMenuOpen.value = false
  if (route.path !== '/') {
    router.push(`/#${sectionId}`)
    return
  }
  const el = document.getElementById(sectionId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <header class="navbar">
    <div class="navbar__inner tf-container">
      <router-link to="/" class="navbar__brand">
        <BrandLogo size="md" />
      </router-link>

      <nav class="navbar__links" :class="{ 'navbar__links--open': isMobileMenuOpen }">
        <a href="#features" class="navbar__link" @click.prevent="scrollToSection('features')">Features</a>
        <a href="#how-it-works" class="navbar__link" @click.prevent="scrollToSection('how-it-works')">How it Works</a>
        <router-link to="/demo" class="navbar__link">Demo</router-link>
        <div class="navbar__actions">
          <TfButton variant="ghost" size="sm" as="a" href="/demo">{{ brand.cta.secondary }}</TfButton>
          <TfButton size="sm" as="a" href="/early-access">{{ brand.cta.earlyAccess }}</TfButton>
        </div>
      </nav>

      <button class="navbar__toggle" @click="isMobileMenuOpen = !isMobileMenuOpen" aria-label="Toggle menu">
        <svg v-if="!isMobileMenuOpen" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--tf-glass);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--tf-border);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.navbar__brand {
  display: flex;
  align-items: center;
  gap: var(--tf-space-3);
  text-decoration: none;
  color: var(--tf-text-primary);
}

.navbar__name {
  font-size: var(--tf-text-base-size);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.navbar__links {
  display: flex;
  align-items: center;
  gap: var(--tf-space-8);
}

.navbar__link {
  font-size: var(--tf-text-sm-size);
  font-weight: 500;
  color: var(--tf-text-secondary);
  text-decoration: none;
  transition: var(--tf-transition-colors);
  cursor: pointer;
}

.navbar__link:hover {
  color: var(--tf-text-primary);
}

.navbar__actions {
  display: flex;
  align-items: center;
  gap: var(--tf-space-3);
  margin-left: var(--tf-space-4);
}

.navbar__toggle {
  display: none;
  padding: var(--tf-space-2);
  color: var(--tf-text-primary);
}

@media (max-width: 768px) {
  .navbar__toggle {
    display: flex;
  }

  .navbar__links {
    display: none;
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: var(--tf-space-4);
    padding: var(--tf-space-6);
    background: var(--tf-surface);
    border-bottom: 1px solid var(--tf-border);
    box-shadow: var(--tf-shadow-lg);
  }

  .navbar__links--open {
    display: flex;
  }

  .navbar__actions {
    flex-direction: column;
    margin-left: 0;
    width: 100%;
  }

  .navbar__actions .tf-btn {
    width: 100%;
  }
}
</style>
