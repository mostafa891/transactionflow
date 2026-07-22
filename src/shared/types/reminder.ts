export type ChannelType = 'email' | 'sms' | 'whatsapp'

export interface ReminderTemplate {
  id: string
  name: string
  channel: ChannelType
  subject?: string
  body: string
  variables: string[]
  isDefault: boolean
}

export interface ReminderLog {
  id: string
  clientId: string
  clientName: string
  channel: ChannelType
  status: 'delivered' | 'opened' | 'clicked' | 'failed'
  sentAt: string
  attempts: number
  linkOpenedAt?: string
}

export interface ReminderRule {
  id: string
  name: string
  frequencyDays: number
  stopOnReply: boolean
  maxAttempts: number
  escalateToSmsAfterDays?: number
  escalateToWhatsappAfterDays?: number
}
