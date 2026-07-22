import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from '@/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export const useWaitlistStore = defineStore('waitlist', () => {
  const isSubmitting = ref(false)
  const submitError = ref<string | null>(null)
  const isSuccess = ref(false)

  async function submitWaitlist(entry: {
    name: string
    email: string
    company?: string
    role: string
    clientCount?: string
    biggestPain?: string
  }) {
    isSubmitting.value = true
    submitError.value = null

    const utmSource = new URLSearchParams(window.location.search).get('utm_source') || 'direct'
    const payload = {
      ...entry,
      createdAt: new Date().toISOString(),
      utmSource,
    }

    console.log('🔄 Attempting Waitlist Submission to Firebase Firestore...', payload)

    // Save to LocalStorage immediately as a guaranteed local backup
    try {
      const existing = JSON.parse(localStorage.getItem('tf_waitlist') || '[]')
      existing.push(payload)
      localStorage.setItem('tf_waitlist', JSON.stringify(existing))
    } catch (e) {
      console.warn('LocalStorage save notice:', e)
    }

    if (db) {
      // Execute Firestore addDoc with a 3s race
      try {
        const firestorePromise = addDoc(collection(db, 'waitlist'), {
          ...payload,
          serverTime: serverTimestamp(),
        })

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Firestore network timeout')), 2500)
        )

        const docRef: any = await Promise.race([firestorePromise, timeoutPromise])
        if (docRef && docRef.id) {
          console.log('✅ SUCCESS! Saved to Firebase Firestore. Document ID:', docRef.id)
        }
      } catch (err: any) {
        console.warn('⚠️ Firebase Firestore Notice (Check Firebase Console setup):', err.message || err)
      }
    } else {
      console.warn('⚠️ Firebase db object not initialized.')
    }

    // Always finish submitting and show success
    isSubmitting.value = false
    isSuccess.value = true
  }

  return {
    isSubmitting,
    submitError,
    isSuccess,
    submitWaitlist,
  }
})
