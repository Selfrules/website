// Firebase Client Configuration
// This file initializes Firebase for client-side usage (browser)

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate configuration
const validateConfig = () => {
  const requiredKeys = [
    'apiKey',
    'authDomain',
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId',
  ];

  const missing = requiredKeys.filter((key) => !firebaseConfig[key as keyof typeof firebaseConfig]);

  if (missing.length > 0) {
    console.error('Missing Firebase configuration:', missing);
    throw new Error(
      `Missing Firebase configuration: ${missing.join(', ')}. Check your .env file.`
    );
  }
};

// Initialize Firebase (singleton pattern)
let app: FirebaseApp;
let db: Firestore;
let auth: Auth;
let storage: FirebaseStorage;

const initializeFirebase = () => {
  if (typeof window === 'undefined') {
    // Server-side: Don't initialize client SDK
    return null;
  }

  validateConfig();

  // Check if Firebase is already initialized
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }

  // Initialize services
  db = getFirestore(app);
  auth = getAuth(app);
  storage = getStorage(app);

  return { app, db, auth, storage };
};

// Export initialized instances
export const getFirebaseApp = () => {
  if (!app) {
    const result = initializeFirebase();
    if (!result) return null;
  }
  return app;
};

export const getFirebaseDb = () => {
  if (!db) {
    const result = initializeFirebase();
    if (!result) return null;
  }
  return db;
};

export const getFirebaseAuth = () => {
  if (!auth) {
    const result = initializeFirebase();
    if (!result) return null;
  }
  return auth;
};

export const getFirebaseStorage = () => {
  if (!storage) {
    const result = initializeFirebase();
    if (!result) return null;
  }
  return storage;
};

// Default exports
export { app, db, auth, storage };
