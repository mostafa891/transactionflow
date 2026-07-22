import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { AuditEvent } from '@shared/types/audit'

export const useAuditStore = defineStore('audit', () => {
  const events = ref<AuditEvent[]>([
    {
      id: 'evt-1',
      timestamp: '2026-07-21 14:32:10',
      eventType: 'transaction_approved',
      title: 'Transaction Approved',
      description: 'Accountant approved transaction "TRANSFER FROM CHK 8812" ($5,000.00) as Client Retainer Income.',
      actor: 'Sarah Accountant',
      channel: 'web',
      clientId: 'cli-2',
      clientName: 'Brightline Marketing Studio',
      transactionId: 'txn-103',
      ipAddress: '192.168.1.45',
      status: 'success',
    },
    {
      id: 'evt-2',
      timestamp: '2026-07-20 11:15:02',
      eventType: 'client_answered',
      title: 'Client Responded in Portal',
      description: 'Client answered transaction "UBER TRIP 7X2K9" ($24.50) and attached receipt "uber-trip-7x2k9.pdf".',
      actor: 'Sarah Johnson (Client)',
      channel: 'web',
      clientId: 'cli-1',
      clientName: 'Acme Logistics Inc.',
      transactionId: 'txn-102',
      ipAddress: '74.125.210.14',
      status: 'success',
    },
    {
      id: 'evt-3',
      timestamp: '2026-07-19 09:30:00',
      eventType: 'reminder_sent',
      title: 'Email Reminder Sent',
      description: 'Automatic reminder #1 sent via Email regarding 5 pending transactions.',
      actor: 'System Auto-Scheduler',
      channel: 'email',
      clientId: 'cli-1',
      clientName: 'Acme Logistics Inc.',
      status: 'info',
    },
    {
      id: 'evt-4',
      timestamp: '2026-07-16 10:00:15',
      eventType: 'portal_created',
      title: 'Magic Link Portal Generated',
      description: 'Clarification request link created with 5 transactions (Expiry: 2026-07-26).',
      actor: 'Sarah Accountant',
      channel: 'web',
      clientId: 'cli-1',
      clientName: 'Acme Logistics Inc.',
      status: 'info',
    },
    {
      id: 'evt-5',
      timestamp: '2026-07-15 08:45:00',
      eventType: 'csv_imported',
      title: 'CSV Bank Statement Imported',
      description: 'Imported file "National_Bank_July2026.csv" (17 records, 5 uncategorized).',
      actor: 'Sarah Accountant',
      channel: 'web',
      clientId: 'cli-1',
      clientName: 'Acme Logistics Inc.',
      status: 'success',
    },
  ])

  const selectedClientIdFilter = ref<string | null>(null)

  const filteredEvents = computed(() => {
    if (!selectedClientIdFilter.value) return events.value
    return events.value.filter(e => e.clientId === selectedClientIdFilter.value)
  })

  function addEvent(event: Omit<AuditEvent, 'id' | 'timestamp'>) {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19)
    events.value.unshift({
      ...event,
      id: `evt-${Date.now()}`,
      timestamp: now,
    })
  }

  return {
    events,
    selectedClientIdFilter,
    filteredEvents,
    addEvent,
  }
})
