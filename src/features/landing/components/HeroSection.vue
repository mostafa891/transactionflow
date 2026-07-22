<script setup lang="ts">
import { brand } from '@shared/constants/brand'
import { TfButton } from '@design/components'
</script>

<template>
  <section class="hero">
    <div class="hero__inner tf-container">
      <div class="hero__content">
        <div class="hero__badge tf-animate-fade-up">
          <span class="hero__badge-dot" />
          Early Access Waitlist Open
        </div>

        <h1 class="hero__title tf-animate-fade-up tf-delay-1">
          Stop Chasing Clients.<br/>
          <span class="tf-text-gradient">Start Getting Answers.</span>
        </h1>

        <p class="hero__subtitle tf-animate-fade-up tf-delay-2">
          {{ brand.name }} removes the communication bottleneck between accountants and clients
          for uncategorized transactions — automatically tracking and receiving responses.
        </p>

        <div class="hero__actions tf-animate-fade-up tf-delay-3">
          <TfButton size="lg" as="a" href="/early-access">
            {{ brand.cta.earlyAccess }}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 8H13M9 4L13 8L9 12"/>
            </svg>
          </TfButton>
          <TfButton variant="secondary" size="lg" as="a" href="/demo">
            {{ brand.cta.secondary }}
          </TfButton>
        </div>

        <div class="hero__proof tf-animate-fade-up tf-delay-4">
          <div class="hero__avatars">
            <div class="hero__avatar" style="background: #6366F1;">M</div>
            <div class="hero__avatar" style="background: #10B981;">A</div>
            <div class="hero__avatar" style="background: #F59E0B;">S</div>
            <div class="hero__avatar" style="background: #3B82F6;">K</div>
          </div>
          <span class="hero__proof-text">Designed after interviewing accountants & built from real bookkeeping workflows</span>
        </div>
      </div>

      <!-- High-Fidelity Interactive Dashboard Preview -->
      <div class="hero__visual tf-animate-fade-up tf-delay-3">
        <div class="hero__mockup">
          <div class="mockup__window">
            <div class="mockup__toolbar">
              <div class="mockup__dots">
                <span class="dot-red" /><span class="dot-yellow" /><span class="dot-green" />
              </div>
            </div>

            <div class="mockup__body">
              <!-- App Topbar -->
              <div class="mockup__app-header">
                <div class="app-brand">
                  <div class="brand-sq">TF</div>
                  <strong>{{ brand.name }}</strong>
                </div>
                <div class="app-status-badge">
                  <span class="pulse-dot" /> Communication Active
                </div>
              </div>

              <!-- High-Value Financial Cards -->
              <div class="mockup__grid">
                <div class="m-card m-card--accent">
                  <span class="m-label">Pending Clarification</span>
                  <div class="m-val">12 <span class="m-sub text-down">↓ 3 solved today</span></div>
                </div>

                <div class="m-card">
                  <span class="m-label">Sent to Clients</span>
                  <div class="m-val">48 <span class="m-sub text-up">↑ Active Magic Links</span></div>
                </div>

                <div class="m-card m-card--success">
                  <span class="m-label">Resolved & Synced</span>
                  <div class="m-val">156 <span class="m-sub">Completed</span></div>
                </div>
              </div>

              <!-- Interactive Transaction Feed Preview -->
              <div class="mockup__feed">
                <div class="feed-header">
                  <span>Recent Transactions</span>
                  <span class="live-pill">LIVE SYNC</span>
                </div>

                <div class="feed-row">
                  <div class="feed-cell main-cell">
                    <strong>AMZN Mktp US*2K9X4</strong>
                    <small>Acme Logistics Inc. · Jul 15</small>
                  </div>
                  <div class="feed-cell amount font-mono">-$89.99</div>
                  <div class="feed-cell">
                    <span class="badge badge--warning">Waiting Client</span>
                  </div>
                </div>

                <div class="feed-row row-highlight">
                  <div class="feed-cell main-cell">
                    <strong>UBER TRIP 7X2K9</strong>
                    <small>Brightline Studio · Jul 14</small>
                  </div>
                  <div class="feed-cell amount font-mono">-$24.50</div>
                  <div class="feed-cell">
                    <span class="badge badge--success">Client Answered</span>
                  </div>
                </div>

                <div class="feed-row">
                  <div class="feed-cell main-cell">
                    <strong>STAPLES #0872</strong>
                    <small>Delta Group · Jul 12</small>
                  </div>
                  <div class="feed-cell amount font-mono">-$142.33</div>
                  <div class="feed-cell">
                    <span class="badge badge--approved">Approved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="hero__glow" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: var(--tf-space-16) 0 var(--tf-space-16);
  overflow: hidden;
  position: relative;
}

.hero__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--tf-space-12);
  align-items: center;
}

.hero__content {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-6);
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: var(--tf-space-2);
  align-self: flex-start;
  padding: var(--tf-space-1) var(--tf-space-4);
  background: var(--tf-primary-light);
  color: var(--tf-primary);
  border-radius: var(--tf-radius-full);
  font-size: var(--tf-text-sm-size);
  font-weight: 600;
}

.hero__badge-dot {
  width: 8px;
  height: 8px;
  background: var(--tf-primary);
  border-radius: 50%;
  animation: tf-pulse 2s infinite;
}

.hero__title {
  font-size: clamp(2.25rem, 4.5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.04em;
  color: var(--tf-text-primary);
}

.hero__subtitle {
  font-size: var(--tf-text-lg-size);
  line-height: 1.7;
  color: var(--tf-text-secondary);
  max-width: 520px;
}

.hero__actions {
  display: flex;
  gap: var(--tf-space-4);
  padding-top: var(--tf-space-2);
}

.hero__proof {
  display: flex;
  align-items: center;
  gap: var(--tf-space-3);
  padding-top: var(--tf-space-2);
}

.hero__avatars {
  display: flex;
}

.hero__avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: white;
  border: 2px solid var(--tf-surface);
  margin-right: -8px;
}

.hero__proof-text {
  font-size: var(--tf-text-sm-size);
  color: var(--tf-text-muted);
}

/* ── Visual / High-Fidelity Mockup ── */
.hero__visual {
  position: relative;
  display: flex;
  justify-content: center;
}

.hero__glow {
  position: absolute;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(0, 102, 255, 0.15) 0%, transparent 70%);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 0;
}

.hero__mockup {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 580px;
}

.mockup__window {
  background: var(--tf-surface);
  border: 1px solid var(--tf-border);
  border-radius: var(--tf-radius-xl);
  box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.15);
  overflow: hidden;
}

.mockup__toolbar {
  display: flex;
  align-items: center;
  padding: var(--tf-space-3) var(--tf-space-4);
  background: #F1F5F9;
  border-bottom: 1px solid var(--tf-border);
}

.mockup__dots {
  display: flex;
  gap: 6px;
}

.mockup__dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot-red { background: #EF4444; }
.dot-yellow { background: #F59E0B; }
.dot-green { background: #10B981; }

.mockup__body {
  padding: var(--tf-space-5);
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-5);
  background: #F8FAFC;
}

.mockup__app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-brand {
  display: flex;
  align-items: center;
  gap: var(--tf-space-2);
  font-size: var(--tf-text-sm-size);
  color: var(--tf-text-primary);
}

.brand-sq {
  width: 24px;
  height: 24px;
  background: var(--tf-primary);
  color: white;
  border-radius: 6px;
  font-weight: 800;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-status-badge {
  font-size: 11px;
  font-weight: 600;
  color: var(--tf-success-dark);
  background: var(--tf-success-light);
  padding: 3px 10px;
  border-radius: var(--tf-radius-full);
  display: flex;
  align-items: center;
  gap: 6px;
}

.pulse-dot {
  width: 6px;
  height: 6px;
  background: var(--tf-success);
  border-radius: 50%;
  animation: tf-pulse 1.5s infinite;
}

.mockup__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--tf-space-3);
}

.m-card {
  background: var(--tf-surface);
  border: 1px solid var(--tf-border);
  border-radius: var(--tf-radius-md);
  padding: var(--tf-space-3);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.m-card--accent {
  border-left: 3px solid var(--tf-primary);
}

.m-card--success {
  border-left: 3px solid var(--tf-success);
}

.m-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--tf-text-muted);
  font-weight: 600;
}

.m-val {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--tf-text-primary);
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.m-sub {
  font-size: 10px;
  font-weight: 600;
  color: var(--tf-text-muted);
}

.text-down { color: var(--tf-primary); }
.text-up { color: var(--tf-success-dark); }

.mockup__feed {
  background: var(--tf-surface);
  border: 1px solid var(--tf-border);
  border-radius: var(--tf-radius-md);
  padding: var(--tf-space-4);
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-3);
}

.feed-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  font-weight: 700;
  color: var(--tf-text-muted);
  text-transform: uppercase;
}

.live-pill {
  font-size: 9px;
  font-weight: 800;
  color: var(--tf-primary);
  background: var(--tf-primary-light);
  padding: 2px 6px;
  border-radius: 4px;
}

.feed-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--tf-space-2) var(--tf-space-3);
  border-radius: var(--tf-radius);
  background: var(--tf-bg);
}

.row-highlight {
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
}

.feed-cell main-cell {
  display: flex;
  flex-direction: column;
}

.main-cell strong {
  font-size: 12px;
  color: var(--tf-text-primary);
  display: block;
}

.main-cell small {
  font-size: 10px;
  color: var(--tf-text-muted);
}

.amount {
  font-size: 12px;
  font-weight: 700;
}

.badge {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: var(--tf-radius-full);
}

.badge--warning { background: var(--tf-warning-light); color: var(--tf-warning-dark); }
.badge--success { background: var(--tf-success-light); color: var(--tf-success-dark); }
.badge--approved { background: var(--tf-primary-light); color: var(--tf-primary); }

.font-mono { font-family: var(--tf-font-mono); }

/* ── Responsive ── */
@media (max-width: 968px) {
  .hero__inner {
    grid-template-columns: 1fr;
    gap: var(--tf-space-12);
    text-align: center;
  }

  .hero__content { align-items: center; }
  .hero__actions { justify-content: center; }
  .hero__proof { justify-content: center; }
}
</style>
