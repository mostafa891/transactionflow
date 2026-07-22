import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Transaction, TransactionStatus } from '@shared/types/transaction'

export const useTransactionStore = defineStore('transactions', () => {
  const transactions = ref<Transaction[]>([
    {
      id: 'txn-101',
      date: '2026-07-15',
      description: 'AMZN Mktp US*2K9X4',
      bankMemo: 'Amazon Web Marketplace Order #28912',
      amount: -89.99,
      currency: 'USD',
      clientId: 'cli-1',
      clientName: 'Acme Logistics Inc.',
      suggestedCategory: 'Office Supplies',
      aiConfidence: 0.88,
      status: 'pending_client',
      createdAt: '2026-07-16',
      updatedAt: '2026-07-16',
    },
    {
      id: 'txn-102',
      date: '2026-07-14',
      description: 'UBER TRIP 7X2K9',
      bankMemo: 'San Francisco Rideshare Trip',
      amount: -24.50,
      currency: 'USD',
      clientId: 'cli-1',
      clientName: 'Acme Logistics Inc.',
      suggestedCategory: 'Travel & Meals',
      aiConfidence: 0.94,
      status: 'client_answered',
      clientAnswer: 'Travel to client meeting with Delta Reps',
      receiptUrl: '/samples/uber-receipt.pdf',
      receiptName: 'uber-trip-7x2k9.pdf',
      createdAt: '2026-07-15',
      updatedAt: '2026-07-20',
    },
    {
      id: 'txn-103',
      date: '2026-07-13',
      description: 'TRANSFER FROM CHK 8812',
      bankMemo: 'Wire Transfer Reference #WT-9921',
      amount: 5000.00,
      currency: 'USD',
      clientId: 'cli-2',
      clientName: 'Brightline Marketing Studio',
      suggestedCategory: 'Client Retainer Income',
      aiConfidence: 0.91,
      status: 'approved',
      category: 'Client Retainer Income',
      createdAt: '2026-07-14',
      updatedAt: '2026-07-21',
    },
    {
      id: 'txn-104',
      date: '2026-07-12',
      description: 'STAPLES #0872',
      bankMemo: 'Staples Store Purchase #0872',
      amount: -142.33,
      currency: 'USD',
      clientId: 'cli-1',
      clientName: 'Acme Logistics Inc.',
      suggestedCategory: 'Office Supplies',
      aiConfidence: 0.95,
      status: 'approved',
      category: 'Office Supplies',
      createdAt: '2026-07-13',
      updatedAt: '2026-07-19',
    },
    {
      id: 'txn-105',
      date: '2026-07-10',
      description: 'CHECK #1847',
      bankMemo: 'Check cleared account #1847',
      amount: -1200.00,
      currency: 'USD',
      clientId: 'cli-3',
      clientName: 'Delta Construction Group',
      suggestedCategory: 'Subcontractor Expense',
      aiConfidence: 0.65,
      status: 'uncategorized',
      createdAt: '2026-07-11',
      updatedAt: '2026-07-11',
    },
  ])

  const filterStatus = ref<TransactionStatus | 'all'>('all')

  const filteredTransactions = computed(() => {
    if (filterStatus.value === 'all') return transactions.value
    return transactions.value.filter(t => t.status === filterStatus.value)
  })

  const pendingClientCount = computed(() =>
    transactions.value.filter(t => t.status === 'pending_client').length
  )
  const clientAnsweredCount = computed(() =>
    transactions.value.filter(t => t.status === 'client_answered').length
  )
  const approvedCount = computed(() =>
    transactions.value.filter(t => t.status === 'approved').length
  )

  function updateStatus(id: string, status: TransactionStatus, category?: string) {
    const txn = transactions.value.find(t => t.id === id)
    if (txn) {
      txn.status = status
      if (category) txn.category = category
      txn.updatedAt = new Date().toISOString().split('T')[0]
    }
  }

  function addTransactions(items: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>[]) {
    const now = new Date().toISOString().split('T')[0]
    items.forEach((item, idx) => {
      transactions.value.unshift({
        ...item,
        id: `txn-${Date.now()}-${idx}`,
        createdAt: now,
        updatedAt: now,
      })
    })
  }

  return {
    transactions,
    filterStatus,
    filteredTransactions,
    pendingClientCount,
    clientAnsweredCount,
    approvedCount,
    updateStatus,
    addTransactions,
  }
})
