# TransactionFlow (AuraFlow Sub-Branch)

> **Smart Transaction Clarification & Communication-First Workflow Platform for Accountants**

TransactionFlow removes the communication bottleneck between accountants and clients for uncategorized transactions. It sends secure, no-password Magic Links to clients, tracks opens, collects answers and receipt photos, and automates multi-channel reminders (Email, SMS, WhatsApp).

---

## 🛠️ Tech Stack & Architecture

- **Framework:** Vue 3 (Composition API + `<script setup>`) + TypeScript
- **Build Tool:** Vite 8
- **State Management:** Pinia
- **Router:** Vue Router 4 (Multi-Layout: Marketing & Demo App Shell)
- **Styling:** Pure Vanilla CSS with Atomic Design Tokens (`colors`, `typography`, `spacing`, `elevation`, `animations`)
- **Backend & Database:** Firebase Firestore (Waitlist Lead Capture) + Firebase Analytics
- **Deployment Target:** Vercel / Firebase Hosting

---

## 🗺️ Project Structure

```
src/
├── core/
│   ├── router/           # Dual-layout Vue Router setup
│   └── stores/           # Pinia Stores (Client, Transaction, Reminder, Audit, Waitlist)
├── design/
│   ├── components/       # Design System UI components (TfButton, TfCard, TfBadge, etc.)
│   └── tokens/           # CSS Tokens (colors, typography, spacing, elevation, animations)
├── features/
│   ├── landing/          # Hero, Comparison, Features, Timeline, FAQ, Waitlist
│   ├── auth/             # Login & Quick Demo Access
│   ├── dashboard/        # KPIs, Charts, Live Activity Feed, Needs Attention
│   ├── clients/          # Client Directory & 7-Tab Client Profile
│   ├── import/           # 6-Step Bank CSV Import Wizard
│   ├── transactions/     # Filterable Data Grid & Transaction Detail Drawer
│   ├── links/            # Magic Link Control & Security Center
│   ├── requests/         # Create Request Modal & Message Preview
│   ├── portal/           # Responsive Mobile Client Portal (No Login Required)
│   ├── review/           # Side-by-Side Verification Queue & Bulk Approval
│   ├── reminders/        # Delivery Logs, Message Templates & Multi-Channel Rules
│   ├── audit/            # Full Chronological Audit Trail & Compliance Log
│   └── export/           # CSV Export Center
└── shared/
    ├── constants/        # Brand Configuration
    └── types/            # TypeScript Interface Definitions
```

---

## 🚀 Quick Start (Local Setup)

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev
```

Visit `http://localhost:3000` or `http://localhost:5173` to explore the application and interactive guided tour.

---

## ☁️ Deployment (Vercel 1-Click)

1. Push this repository to GitHub.
2. Go to [Vercel](https://vercel.com) and click **Add New Project**.
3. Select your repository and click **Deploy**.
   *(SPA Rewrites are already pre-configured in `vercel.json`)*.
