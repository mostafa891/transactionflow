<script setup lang="ts">
import { ref } from 'vue'
import { brand } from '@shared/constants/brand'
import { useClientStore } from '@core/stores/clientStore'
import { TfButton, TfCard, TfBadge } from '@design/components'

const clientStore = useClientStore()

const magicLinks = ref([
  {
    id: 'link-101',
    clientId: 'cli-1',
    clientName: 'Acme Logistics Inc.',
    url: `https://${brand.domain}/p/acme-98231`,
    createdAt: '2026-07-16 09:00 AM',
    expiresAt: '2026-07-26 (in 4 days)',
    status: 'active',
    clicks: 14,
    lastOpened: '2026-07-20 11:15 AM',
    lastIp: '74.125.210.14',
    txnPending: 5,
  },
  {
    id: 'link-102',
    clientId: 'cli-2',
    clientName: 'Brightline Marketing Studio',
    url: `https://${brand.domain}/p/bright-44120`,
    createdAt: '2026-07-18 02:30 PM',
    expiresAt: '2026-07-28 (in 6 days)',
    status: 'active',
    clicks: 8,
    lastOpened: '2026-07-21 04:10 PM',
    lastIp: '192.168.1.100',
    txnPending: 3,
  },
  {
    id: 'link-103',
    clientId: 'cli-3',
    clientName: 'Delta Construction Group',
    url: `https://${brand.domain}/p/delta-11928`,
    createdAt: '2026-07-10 10:00 AM',
    expiresAt: '2026-07-20 (Expired)',
    status: 'expired',
    clicks: 2,
    lastOpened: '2026-07-15 01:20 PM',
    lastIp: '172.56.21.9',
    txnPending: 8,
  },
])

const copiedId = ref<string | null>(null)

function copyLink(id: string, url: string) {
  navigator.clipboard.writeText(url)
  copiedId.value = id
  setTimeout(() => { copiedId.value = null }, 2000)
}

function regenerateLink(id: string) {
  const link = magicLinks.value.find(l => l.id === id)
  if (link) {
    const newToken = Math.floor(10000 + Math.random() * 90000)
    link.url = `https://${brand.domain}/p/${link.clientName.toLowerCase().replace(/[^a-z0-9]/g, '')}-${newToken}`
    link.status = 'active'
    link.expiresAt = '2026-07-30 (in 7 days)'
    link.clicks = 0
    link.lastOpened = 'Not opened yet'
  }
}

function revokeLink(id: string) {
  const link = magicLinks.value.find(l => l.id === id)
  if (link) {
    link.status = 'revoked'
  }
}
</script>

<template>
  <div class="magic-link-control-view">
    <div class="ml-header">
      <div>
        <h2>Magic Link Control Center ⭐</h2>
        <p class="subtitle">Manage secure client access links, monitor clicks, and revoke or extend expiration.</p>
      </div>
      <TfButton size="md">+ Generate New Link</TfButton>
    </div>

    <!-- Summary KPIs -->
    <div class="ml-metrics-grid">
      <TfCard>
        <template #header><h3>Active Magic Links</h3></template>
        <div class="card-val text-success">2 Active</div>
        <p class="card-sub">Client access granted</p>
      </TfCard>

      <TfCard>
        <template #header><h3>Expired / Revoked</h3></template>
        <div class="card-val text-error">1 Expired</div>
        <p class="card-sub">Requires renewal</p>
      </TfCard>

      <TfCard>
        <template #header><h3>Total Portal Clicks</h3></template>
        <div class="card-val">24 Clicks</div>
        <p class="card-sub">Across all clients</p>
      </TfCard>
    </div>

    <!-- Links Data Table -->
    <TfCard padding="none">
      <template #header>
        <div class="table-header-flex">
          <h3>Client Magic Links Management</h3>
          <TfBadge variant="primary">Secured No-Password Access</TfBadge>
        </div>
      </template>

      <div class="table-wrap">
        <table class="ml-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Magic Link URL</th>
              <th>Expiration</th>
              <th>Clicks & Last Open</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="link in magicLinks" :key="link.id" :class="{ 'row-expired': link.status !== 'active' }">
              <td class="cell-client">
                <strong>{{ link.clientName }}</strong>
                <span class="sub-pending">{{ link.txnPending }} pending questions</span>
              </td>

              <td class="cell-url">
                <div class="url-pill">
                  <span class="url-text">{{ link.url }}</span>
                  <button class="btn-copy" @click="copyLink(link.id, link.url)">
                    {{ copiedId === link.id ? '✓ Copied' : '📋 Copy' }}
                  </button>
                </div>
              </td>

              <td class="cell-expiry">
                <span :class="link.status === 'expired' ? 'text-error font-bold' : ''">{{ link.expiresAt }}</span>
                <span class="sub-created">Created: {{ link.createdAt }}</span>
              </td>

              <td class="cell-clicks">
                <strong>{{ link.clicks }} Clicks</strong>
                <span class="sub-open">Last: {{ link.lastOpened }}</span>
              </td>

              <td>
                <TfBadge
                  :variant="link.status === 'active' ? 'success' : link.status === 'expired' ? 'error' : 'neutral'"
                  dot
                >
                  {{ link.status.toUpperCase() }}
                </TfBadge>
              </td>

              <td class="cell-actions">
                <button class="act-btn act-btn--regen" @click="regenerateLink(link.id)">
                  🔄 Regenerate
                </button>
                <button v-if="link.status === 'active'" class="act-btn act-btn--revoke" @click="revokeLink(link.id)">
                  🚫 Revoke
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </TfCard>
  </div>
</template>

<style scoped>
.magic-link-control-view {
  display: flex;
  flex-direction: column;
  gap: var(--tf-space-6);
}

.ml-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ml-header h2 { font-size: var(--tf-text-h2-size); font-weight: 800; }
.subtitle { font-size: var(--tf-text-sm-size); color: var(--tf-text-muted); }

.ml-metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--tf-space-6);
}

.card-val {
  font-size: var(--tf-text-h1-size);
  font-weight: 800;
}

.card-sub {
  font-size: var(--tf-text-sm-size);
  color: var(--tf-text-muted);
}

.text-success { color: var(--tf-success-dark); }
.text-error { color: var(--tf-error-dark); }

.table-header-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-wrap { overflow-x: auto; }

.ml-table {
  width: 100%;
  border-collapse: collapse;
}

.ml-table th, .ml-table td {
  padding: var(--tf-space-4) var(--tf-space-5);
  border-bottom: 1px solid var(--tf-border);
  text-align: left;
}

.row-expired { background: #FEF2F2; }

.cell-client {
  display: flex;
  flex-direction: column;
}

.sub-pending {
  font-size: 11px;
  color: var(--tf-text-muted);
}

.cell-url { max-width: 320px; }

.url-pill {
  display: flex;
  align-items: center;
  gap: var(--tf-space-2);
  background: var(--tf-bg);
  padding: 4px 8px;
  border-radius: var(--tf-radius);
  border: 1px solid var(--tf-border);
}

.url-text {
  font-size: 11px;
  font-family: var(--tf-font-mono);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--tf-primary);
  flex: 1;
}

.btn-copy {
  font-size: 10px;
  font-weight: 700;
  background: var(--tf-surface);
  border: 1px solid var(--tf-border);
  padding: 2px 6px;
  border-radius: 4px;
  cursor: pointer;
}

.cell-expiry, .cell-clicks {
  display: flex;
  flex-direction: column;
}

.sub-created, .sub-open {
  font-size: 11px;
  color: var(--tf-text-muted);
}

.cell-actions {
  display: flex;
  gap: var(--tf-space-2);
}

.act-btn {
  font-size: 11px;
  font-weight: 700;
  border: none;
  background: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: var(--tf-radius-sm);
}

.act-btn--regen { color: var(--tf-primary); background: var(--tf-primary-light); }
.act-btn--revoke { color: var(--tf-error-dark); background: var(--tf-error-light); }

.font-bold { font-weight: 700; }

@media (max-width: 768px) {
  .ml-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--tf-space-3);
  }
  .ml-metrics-grid {
    grid-template-columns: 1fr;
  }
}
</style>
