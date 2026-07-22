export type AuditEventType =
  | 'csv_imported'
  | 'portal_created'
  | 'email_sent'
  | 'email_opened'
  | 'reminder_sent'
  | 'sms_sent'
  | 'whatsapp_sent'
  | 'client_answered'
  | 'receipt_uploaded'
  | 'transaction_approved'
  | 'transaction_rejected'
  | 'link_expired'

export interface AuditEvent {
  id: string
  timestamp: string
  eventType: AuditEventType
  title: string
  description: string
  actor: string
  channel?: ChannelType | 'system' | 'web'
  clientId: string
  clientName: string
  transactionId?: string
  ipAddress?: string
  status: 'success' | 'warning' | 'info' | 'error'
}
