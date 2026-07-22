import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { brand } from '@shared/constants/brand'
import type { Client } from '@shared/types/client'

export const useClientStore = defineStore('clients', () => {
  const clients = ref<Client[]>([
    {
      id: 'cli-1',
      name: 'Acme Logistics Inc.',
      company: 'Acme Logistics',
      email: 'finance@acmelogistics.com',
      phone: '+1 (555) 234-5678',
      software: 'QuickBooks',
      pendingCount: 5,
      answeredCount: 12,
      totalTransactions: 17,
      waitingSince: '2026-07-16',
      lastReminderDate: '2026-07-19',
      lastActivityDate: '2026-07-20',
      magicLinkStatus: 'active',
      magicLinkUrl: `https://${brand.domain}/p/acme-98231`,
      magicLinkExpiry: '2026-07-26',
      autoReminderEnabled: true,
      reminderSchedule: '3_days',
    },
    {
      id: 'cli-2',
      name: 'Brightline Marketing Studio',
      company: 'Brightline Studio',
      email: 'sarah@brightline.design',
      phone: '+1 (555) 876-5432',
      software: 'Xero',
      pendingCount: 3,
      answeredCount: 8,
      totalTransactions: 11,
      waitingSince: '2026-07-18',
      lastReminderDate: '2026-07-21',
      lastActivityDate: '2026-07-21',
      magicLinkStatus: 'active',
      magicLinkUrl: `https://${brand.domain}/p/bright-44120`,
      magicLinkExpiry: '2026-07-28',
      autoReminderEnabled: true,
      reminderSchedule: '3_days',
    },
    {
      id: 'cli-3',
      name: 'Delta Construction Group',
      company: 'Delta Group',
      email: 'accounting@deltacontracts.com',
      phone: '+1 (555) 432-1098',
      software: 'CSV',
      pendingCount: 8,
      answeredCount: 0,
      totalTransactions: 8,
      waitingSince: '2026-07-10',
      lastReminderDate: '2026-07-17',
      lastActivityDate: '2026-07-15',
      magicLinkStatus: 'expired',
      magicLinkUrl: `https://${brand.domain}/p/delta-11928`,
      magicLinkExpiry: '2026-07-20',
      autoReminderEnabled: false,
      reminderSchedule: '5_days',
    },
  ])

  const selectedClientId = ref<string | null>('cli-1')

  const selectedClient = computed(() =>
    clients.value.find(c => c.id === selectedClientId.value) || clients.value[0]
  )

  const totalClients = computed(() => clients.value.length)
  const totalPending = computed(() => clients.value.reduce((acc, c) => acc + c.pendingCount, 0))

  function selectClient(id: string) {
    selectedClientId.value = id
  }

  function addClient(client: Omit<Client, 'id'>) {
    const newId = `cli-${Date.now()}`
    clients.value.push({ ...client, id: newId })
  }

  return {
    clients,
    selectedClientId,
    selectedClient,
    totalClients,
    totalPending,
    selectClient,
    addClient,
  }
})
