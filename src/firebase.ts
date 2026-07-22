import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getAnalytics, type Analytics, isSupported } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD5d7kEAksyKq_ezYM_xiCYyh__bRJbZBw",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "transactionflow-5840e.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "transactionflow-5840e",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "transactionflow-5840e.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "889243703190",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:889243703190:web:039f14e163ddef716aafb7",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-G2299EWKM3",
}

let app: FirebaseApp | null = null
let db: Firestore | null = null
let analytics: Analytics | null = null

try {
  app = initializeApp(firebaseConfig)
  db = getFirestore(app)
  isSupported().then((supported: boolean) => {
    if (supported && app) {
      analytics = getAnalytics(app)
    }
  })
} catch (error) {
  console.warn('Firebase initialization notice:', error)
}

export { app, db, analytics }
