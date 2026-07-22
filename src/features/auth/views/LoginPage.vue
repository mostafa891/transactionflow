<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { brand } from '@shared/constants/brand'
import { TfButton, TfInput, TfCard } from '@design/components'
import LandingNavbar from '@features/landing/components/LandingNavbar.vue'
import LandingFooter from '@features/landing/components/LandingFooter.vue'

const router = useRouter()
const email = ref('')
const password = ref('')
const isLoading = ref(false)

function handleLogin() {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    router.push('/demo')
  }, 600)
}

function handleDemoLogin() {
  router.push('/demo')
}
</script>

<template>
  <div class="login-page">
    <LandingNavbar />

    <section class="login-section tf-section">
      <div class="tf-container tf-container--narrow">
        <div class="login-box tf-animate-fade-up">
          <div class="login-header">
            <h1 class="login-title">Sign in to {{ brand.name }}</h1>
            <p class="login-subtitle">Manage client clarifications & automated reminders</p>
          </div>

          <form class="login-form" @submit.prevent="handleLogin">
            <TfInput
              v-model="email"
              type="email"
              label="Work Email"
              placeholder="accountant@firm.com"
              required
            />

            <TfInput
              v-model="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              required
            />

            <TfButton type="submit" size="lg" full-width :loading="isLoading">
              Sign In
            </TfButton>
          </form>

          <div class="login-divider">
            <span>OR</span>
          </div>

          <div class="login-socials">
            <TfButton variant="secondary" full-width @click="handleDemoLogin">
              🔑 Quick Demo Access (No Password Required)
            </TfButton>
          </div>

          <p class="login-footer-text">
            Don't have an account? <router-link to="/early-access">Join Waitlist</router-link>
          </p>
        </div>
      </div>
    </section>

    <LandingFooter />
  </div>
</template>

<style scoped>
.login-section {
  padding-top: var(--tf-space-16);
  min-height: calc(100vh - 160px);
  display: flex;
  align-items: center;
}

.login-box {
  background: var(--tf-surface);
  border: 1px solid var(--tf-border);
  border-radius: var(--tf-radius-xl);
  padding: var(--tf-space-8);
  box-shadow: var(--tf-shadow-card);
  max-width: 440px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-6);
}

.login-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-2);
}

.login-title {
  font-size: var(--tf-text-h2-size);
  font-weight: 800;
  color: var(--tf-text-primary);
  letter-spacing: -0.02em;
}

.login-subtitle {
  font-size: var(--tf-text-sm-size);
  color: var(--tf-text-muted);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-4);
}

.login-divider {
  display: flex;
  align-items: center;
  gap: var(--tf-space-4);
  color: var(--tf-text-muted);
  font-size: var(--tf-text-caption-size);
}

.login-divider::before,
.login-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--tf-border);
}

.login-socials {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-3);
}

.login-footer-text {
  text-align: center;
  font-size: var(--tf-text-sm-size);
  color: var(--tf-text-muted);
}

.login-footer-text a {
  font-weight: 600;
  color: var(--tf-primary);
}
</style>
