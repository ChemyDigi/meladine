import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

// Web app config from Firebase console → Project settings → Your apps.
// These values are public by design; access is controlled by firestore.rules.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let db: Firestore | null = null;

/** Lazily initialises Firebase so it only loads in the browser when needed. */
export function getDb(): Firestore {
  if (db) return db;
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    throw new Error("Firebase config missing: set NEXT_PUBLIC_FIREBASE_* in .env.local");
  }
  const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
  db = getFirestore(app);
  return db;
}
