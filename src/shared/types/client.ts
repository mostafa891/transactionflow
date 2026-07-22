export interface Client {
  id: string
  name: string
  company: string
  email: string
  phone: string
  logoUrl?: string
  software: 'QuickBooks' | 'Xero' | 'CSV' | 'Zoho' | 'Wave'
  pendingCount: number
  answeredCount: number
  totalTransactions: number
  waitingSince?: string
  lastReminderDate?: string
  lastActivityDate: string
  magicLinkStatus: 'active' | 'expired' | 'none'
  magicLinkUrl?: string
  magicLinkExpiry?: string
  autoReminderEnabled: boolean
  reminderSchedule: '3_days' | '5_days' | 'weekly'
}
