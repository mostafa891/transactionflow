/**
 * Brand Configuration — Single source of truth
 * Change these values to rebrand the entire app.
 */
export const brand = {
  name: 'TransactionFlow',
  parentBrand: 'AuraFlow',
  domain: 'transaction.auraflow.software',
  tagline: 'Smart Transaction Clarification for Accountants',
  description: 'TransactionFlow removes the communication bottleneck between accountants and clients for uncategorized transactions — automatically tracking and receiving responses.',
  cta: {
    primary: 'Join the Waitlist',
    secondary: 'Try the Demo',
    earlyAccess: 'Get Early Access',
  },
  social: {
    twitter: '',
    linkedin: '',
  },
  legal: {
    year: new Date().getFullYear(),
    entity: 'AuraFlow / TransactionFlow',
  },
} as const

export type Brand = typeof brand
