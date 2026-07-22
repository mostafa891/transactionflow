import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ReminderTemplate, ReminderLog, ReminderRule } from '@shared/types/reminder'

export const useReminderStore = defineStore('reminders', () => {
  const templates = ref<ReminderTemplate[]>([
    {
      id: 'tmpl-1',
      name: 'Initial Clarification Request',
      channel: 'email',
      subject: 'Transaction Clarification Request from {{FirmName}}',
      body: 'Hi {{ClientName}},\n\nYour accountant needs help clarifying {{TransactionCount}} transactions to finish your monthly closing.\n\nPlease review and answer here: {{PortalLink}}\n\nThank you,\n{{FirmName}}',
      variables: ['ClientName', 'TransactionCount', 'PortalLink', 'FirmName'],
      isDefault: true,
    },
    {
      id: 'tmpl-2',
      name: 'Friendly 3-Day Follow-Up',
      channel: 'email',
      subject: 'Quick Reminder: {{TransactionCount}} Uncategorized Transactions',
      body: 'Hi {{ClientName}},\n\nJust a quick reminder regarding {{TransactionCount}} open questions.\nClick here: {{PortalLink}}\n\nDueDate: {{DueDate}}',
      variables: ['ClientName', 'TransactionCount', 'PortalLink', 'DueDate'],
      isDefault: false,
    },
    {
      id: 'tmpl-3',
      name: 'Urgent SMS Notification',
      channel: 'sms',
      body: 'Hi {{ClientName}}, {{FirmName}} sent {{TransactionCount}} transaction questions. Answer here: {{PortalLink}}',
      variables: ['ClientName', 'FirmName', 'TransactionCount', 'PortalLink'],
      isDefault: true,
    },
    {
      id: 'tmpl-4',
      name: 'WhatsApp Direct Copy',
      channel: 'whatsapp',
      body: 'Hello {{ClientName}} 👋\nYour monthly statement has {{TransactionCount}} unassigned items. Please answer via this link:\n{{PortalLink}}\nThanks!',
      variables: ['ClientName', 'TransactionCount', 'PortalLink'],
      isDefault: true,
    },
  ])

  const logs = ref<ReminderLog[]>([
    {
      id: 'log-1',
      clientId: 'cli-1',
      clientName: 'Acme Logistics Inc.',
      channel: 'email',
      status: 'opened',
      sentAt: '2026-07-19 09:30 AM',
      attempts: 1,
      linkOpenedAt: '2026-07-19 11:15 AM',
    },
    {
      id: 'log-2',
      clientId: 'cli-2',
      clientName: 'Brightline Marketing Studio',
      channel: 'email',
      status: 'delivered',
      sentAt: '2026-07-21 02:00 PM',
      attempts: 2,
    },
    {
      id: 'log-3',
      clientId: 'cli-3',
      clientName: 'Delta Construction Group',
      channel: 'sms',
      status: 'clicked',
      sentAt: '2026-07-17 10:00 AM',
      attempts: 3,
      linkOpenedAt: '2026-07-17 10:05 AM',
    },
  ])

  const rules = ref<ReminderRule[]>([
    {
      id: 'rule-1',
      name: 'Standard Accountant Schedule',
      frequencyDays: 3,
      stopOnReply: true,
      maxAttempts: 4,
      escalateToSmsAfterDays: 6,
      escalateToWhatsappAfterDays: 9,
    },
  ])

  return {
    templates,
    logs,
    rules,
  }
})
