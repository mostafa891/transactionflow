<script setup lang="ts">
import { ref, computed } from 'vue'
import { brand } from '@shared/constants/brand'
import { useWaitlistStore } from '@core/stores/waitlistStore'
import { TfButton, TfInput } from '@design/components'
import LandingNavbar from '../components/LandingNavbar.vue'
import LandingFooter from '../components/LandingFooter.vue'

const waitlistStore = useWaitlistStore()

const form = ref({
  name: '',
  email: '',
  company: '',
  role: '',
  clientCount: '',
  biggestPain: '',
})

const isValid = computed(() => form.value.name && form.value.email && form.value.role)

async function handleSubmit() {
  if (!isValid.value) return
  try {
    await waitlistStore.submitWaitlist({
      name: form.value.name,
      email: form.value.email,
      company: form.value.company,
      role: form.value.role,
      clientCount: form.value.clientCount,
      biggestPain: form.value.biggestPain,
    })
  } catch (e) {
    // Handled in store
  }
}
</script>

<template>
  <div class="early-access-page">
    <LandingNavbar />

    <section class="ea-hero tf-section">
      <div class="tf-container tf-container--narrow">
        <!-- Success State -->
        <div v-if="waitlistStore.isSuccess" class="ea-success tf-animate-scale-in">
          <div class="ea-success__icon">🎉</div>
          <h1 class="ea-success__title">You're on the list!</h1>
          <p class="ea-success__subtitle">
            We'll notify you as soon as {{ brand.name }} opens early access.
            In the meantime, test the interactive demo.
          </p>
          <TfButton size="lg" as="a" href="/demo">
            Try Interactive Demo
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 8H13M9 4L13 8L9 12"/>
            </svg>
          </TfButton>
        </div>

        <!-- Form State -->
        <div v-else class="ea-form-container">
          <div class="ea-header tf-animate-fade-up">
            <span class="ea-badge">🚀 Limited Early Access</span>
            <h1 class="ea-title">
              Be the first to automate<br/>
              <span class="tf-text-gradient">client follow-ups</span>
            </h1>
            <p class="ea-subtitle">
              Join the waitlist and get priority access when we launch.
              No credit card required.
            </p>
          </div>

          <form class="ea-form tf-animate-fade-up tf-delay-2" @submit.prevent="handleSubmit">
            <TfInput
              v-model="form.name"
              label="Full name"
              placeholder="Sarah Johnson"
              required
            />

            <TfInput
              v-model="form.email"
              type="email"
              label="Work email"
              placeholder="sarah@accounting-firm.com"
              required
            />

            <TfInput
              v-model="form.company"
              label="Company / Firm name"
              placeholder="Your accounting firm"
            />

            <div class="ea-form__select-group">
              <label class="ea-form__label">Your role <span class="ea-form__required">*</span></label>
              <select v-model="form.role" class="ea-form__select" required>
                <option value="" disabled>Select your role</option>
                <option value="accountant">Accountant</option>
                <option value="bookkeeper">Bookkeeper</option>
                <option value="firm_owner">Firm Owner</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div class="ea-form__select-group">
              <label class="ea-form__label">How many clients do you manage?</label>
              <select v-model="form.clientCount" class="ea-form__select">
                <option value="" disabled>Select range</option>
                <option value="1-10">1 – 10</option>
                <option value="11-50">11 – 50</option>
                <option value="50+">50+</option>
              </select>
            </div>

            <TfInput
              v-model="form.biggestPain"
              label="What's your biggest frustration with client communications?"
              placeholder="e.g. Clients take 2 weeks to answer transaction details"
            />

            <p v-if="waitlistStore.submitError" class="ea-form__error">
              {{ waitlistStore.submitError }}
            </p>

            <TfButton
              type="submit"
              size="lg"
              full-width
              :loading="waitlistStore.isSubmitting"
              :disabled="!isValid"
            >
              {{ brand.cta.earlyAccess }}
            </TfButton>

            <p class="ea-form__privacy">
              We respect your privacy. No spam, ever.
            </p>
          </form>
        </div>
      </div>
    </section>

    <LandingFooter />
  </div>
</template>

<style scoped>
.ea-hero {
  padding-top: var(--tf-space-16);
}

.ea-form-container {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-10);
}

.ea-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--tf-space-4);
}

.ea-badge {
  display: inline-flex;
  padding: var(--tf-space-2) var(--tf-space-4);
  background: var(--tf-warning-light);
  color: var(--tf-warning-dark);
  border-radius: var(--tf-radius-full);
  font-size: var(--tf-text-sm-size);
  font-weight: 600;
}

.ea-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.03em;
  color: var(--tf-text-primary);
}

.ea-subtitle {
  font-size: var(--tf-text-lg-size);
  color: var(--tf-text-secondary);
  line-height: 1.7;
}

.ea-form {
  background: var(--tf-surface);
  border: 1px solid var(--tf-border);
  border-radius: var(--tf-radius-xl);
  padding: var(--tf-space-8);
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-5);
  box-shadow: var(--tf-shadow-card);
  max-width: 480px;
  margin: 0 auto;
  width: 100%;
}

.ea-form__select-group {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-1);
}

.ea-form__label {
  font-size: var(--tf-text-sm-size);
  font-weight: 500;
  color: var(--tf-text-primary);
}

.ea-form__required {
  color: var(--tf-error);
}

.ea-form__select {
  width: 100%;
  padding: var(--tf-space-3) var(--tf-space-4);
  font-size: var(--tf-text-base-size);
  font-family: var(--tf-font-sans);
  color: var(--tf-text-primary);
  background: var(--tf-surface);
  border: 1px solid var(--tf-border);
  border-radius: var(--tf-radius);
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 5L6 8L9 5' stroke='%2394A3B8' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  cursor: pointer;
  transition: var(--tf-transition-colors), var(--tf-transition-shadow);
}

.ea-form__select:focus {
  outline: none;
  border-color: var(--tf-border-focus);
  box-shadow: var(--tf-shadow-focus);
}

.ea-form__error {
  font-size: var(--tf-text-sm-size);
  color: var(--tf-error);
  text-align: center;
}

.ea-form__privacy {
  font-size: var(--tf-text-caption-size);
  color: var(--tf-text-muted);
  text-align: center;
}

/* ── Success ── */
.ea-success {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--tf-space-6);
  padding: var(--tf-space-16) 0;
}

.ea-success__icon {
  font-size: 4rem;
}

.ea-success__title {
  font-size: var(--tf-text-h1-size);
  font-weight: 800;
  color: var(--tf-text-primary);
}

.ea-success__subtitle {
  font-size: var(--tf-text-lg-size);
  color: var(--tf-text-secondary);
  max-width: 400px;
}
</style>
