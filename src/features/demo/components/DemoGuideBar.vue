<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const steps = [
  {
    name: '1. Dashboard',
    path: '/demo',
    title: 'Accountant Overview & KPIs',
    instruction: 'Check pending KPIs & live activity feed, then click "1. Add/View Clients".',
    nextPath: '/demo/clients',
    nextLabel: '1. Add / Manage Clients →',
  },
  {
    name: '2. Clients',
    path: '/demo/clients',
    title: 'Client Management & Profile Creation',
    instruction: 'Click "+ Add New Client" to create a client profile or select "Acme Logistics".',
    nextPath: '/demo/import',
    nextLabel: '2. Import Bank CSV →',
  },
  {
    name: '3. Import CSV',
    path: '/demo/import',
    title: 'Bank Statement Import & AI Validation',
    instruction: 'Click "Use Sample Data" to simulate importing 8 bank transactions.',
    nextPath: '/demo/transactions',
    nextLabel: '3. Categorize Transactions →',
  },
  {
    name: '4. Transactions',
    path: '/demo/transactions',
    title: 'Transaction Grid & Clarification Request',
    instruction: 'Select uncategorized items and click "Generate Request" to create a Magic Link.',
    nextPath: '/demo/links',
    nextLabel: '4. Magic Link Control →',
  },
  {
    name: '5. Magic Links ⭐',
    path: '/demo/links',
    title: 'Magic Link Security & Expiration Control',
    instruction: 'Monitor link clicks, check expiration dates, copy, regenerate, or revoke access.',
    nextPath: '/demo/portal',
    nextLabel: '5. Preview Client Mobile Portal →',
  },
  {
    name: '6. Client Portal',
    path: '/demo/portal',
    title: 'Client Mobile Experience (No Login Required)',
    instruction: 'Simulate how your client answers questions & uploads receipt photos on phone.',
    nextPath: '/demo/review',
    nextLabel: '6. Side-by-Side Review →',
  },
  {
    name: '7. Review Queue',
    path: '/demo/review',
    title: 'Side-by-Side Verification & Approval',
    instruction: 'Review client answer vs bank line vs attached receipt, then click "Approve".',
    nextPath: '/demo/reminders',
    nextLabel: '7. Reminder Center →',
  },
  {
    name: '8. Reminders ⭐',
    path: '/demo/reminders',
    title: 'Automated Multi-Channel Escalation Engine',
    instruction: 'Check email/SMS/WhatsApp delivery logs, message templates, and auto-rules.',
    nextPath: '/demo/export',
    nextLabel: '8. Export CSV →',
  },
  {
    name: '9. Export CSV',
    path: '/demo/export',
    title: 'Download Clean Ledger Statement',
    instruction: 'Click "Download Categorized CSV File" to export your clean ledger!',
    nextPath: '/demo/complete',
    nextLabel: 'Complete Tour 🎉',
  },
]

const currentStepIndex = computed(() => {
  const currentPath = route.path
  const index = steps.findIndex(s => s.path === currentPath)
  return index >= 0 ? index : 0
})

const currentStep = computed(() => steps[currentStepIndex.value])

function goToNext() {
  if (currentStep.value.nextPath) {
    router.push(currentStep.value.nextPath)
  }
}
</script>

<template>
  <div class="demo-guide-bar">
    <div class="guide-content">
      <div class="guide-badge">
        <span>GUIDED TOUR</span>
        <span class="step-counter">Step {{ currentStepIndex + 1 }} of {{ steps.length }}</span>
      </div>

      <div class="guide-text">
        <strong>{{ currentStep.title }}:</strong>
        <span>{{ currentStep.instruction }}</span>
      </div>

      <div class="guide-nav">
        <div class="step-dots">
          <button
            v-for="(step, idx) in steps"
            :key="step.path"
            :class="['dot', { 'dot--active': currentStepIndex === idx, 'dot--done': currentStepIndex > idx }]"
            :title="step.name"
            @click="router.push(step.path)"
          />
        </div>
        <button class="btn-next-step" @click="goToNext">
          {{ currentStep.nextLabel }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-guide-bar {
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  color: white;
  padding: var(--tf-space-3) var(--tf-space-6);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: var(--tf-shadow-md);
  position: sticky;
  top: 60px;
  z-index: 90;
}

.guide-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--tf-space-4);
  max-width: 1280px;
  margin: 0 auto;
  flex-wrap: wrap;
}

.guide-badge {
  display: flex;
  align-items: center;
  gap: var(--tf-space-2);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
  background: var(--tf-primary);
  color: white;
  padding: 3px 10px;
  border-radius: var(--tf-radius-full);
}

.step-counter {
  background: rgba(255, 255, 255, 0.2);
  padding: 1px 6px;
  border-radius: 4px;
}

.guide-text {
  font-size: var(--tf-text-sm-size);
  display: flex;
  gap: var(--tf-space-2);
  align-items: center;
  flex: 1;
}

.guide-text strong {
  color: #60A5FA;
}

.guide-text span {
  color: #94A3B8;
}

.guide-nav {
  display: flex;
  align-items: center;
  gap: var(--tf-space-4);
}

.step-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dot--active {
  background: #60A5FA;
  transform: scale(1.2);
}

.dot--done {
  background: #10B981;
}

.btn-next-step {
  padding: var(--tf-space-2) var(--tf-space-4);
  background: #10B981;
  color: white;
  border: none;
  border-radius: var(--tf-radius);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-next-step:hover {
  background: #059669;
  transform: translateY(-1px);
}

@media (max-width: 968px) {
  .guide-text span { display: none; }
}

@media (max-width: 768px) {
  .demo-guide-bar {
    padding: 8px 12px;
    position: relative;
    top: 0;
  }
  .guide-content {
    gap: 8px;
  }
  .step-dots {
    display: none;
  }
  .guide-text {
    font-size: 12px;
  }
  .btn-next-step {
    padding: 4px 8px;
    font-size: 11px;
  }
}
</style>
