export type TransactionStatus = 'uncategorized' | 'pending_client' | 'client_answered' | 'approved' | 'rejected'

export interface Transaction {
  id: string
  date: string
  description: string
  bankMemo?: string
  amount: number
  currency: string
  clientId: string
  clientName: string
  category?: string
  suggestedCategory?: string
  aiConfidence?: number
  status: TransactionStatus
  clientAnswer?: string
  receiptUrl?: string
  receiptName?: string
  createdAt: string
  updatedAt: string
}

export interface CSVRow {
  Date: string
  Description: string
  Amount: string
  Memo?: string
  Category?: string
  Reference?: string
}

export interface ColumnMapping {
  date: string
  description: string
  amount: string
  memo?: string
  category?: string
}
