// Firebase Admin SDK Configuration
// This file initializes Firebase Admin for server-side usage (API routes, server components)

import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getStorage, Storage } from 'firebase-admin/storage';

let adminApp: App;
let adminDb: Firestore;
let adminAuth: Auth;
let adminStorage: Storage;

/**
 * Initialize Firebase Admin SDK
 * Uses service account credentials from environment or file
 */
const initializeFirebaseAdmin = () => {
  // Check if already initialized
  if (getApps().length > 0) {
    adminApp = getApps()[0];
  } else {
    try {
      // Try to use service account file if available
      const serviceAccount = require('../../firebase-admin-key.json');

      adminApp = initializeApp({
        credential: cert(serviceAccount),
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        storageBucket: `${process.env.FIREBASE_ADMIN_PROJECT_ID}.appspot.com`,
      });
    } catch (error) {
      // Fallback to environment-based initialization for cloud environments
      // This works automatically on Cloud Functions, Cloud Run, etc.
      if (process.env.FIREBASE_ADMIN_PROJECT_ID) {
        adminApp = initializeApp({
          projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        });
      } else {
        throw new Error(
          'Firebase Admin initialization failed. Either provide firebase-admin-key.json or set FIREBASE_ADMIN_PROJECT_ID environment variable.'
        );
      }
    }
  }

  // Initialize services
  adminDb = getFirestore(adminApp);
  adminAuth = getAuth(adminApp);
  adminStorage = getStorage(adminApp);

  // Configure Firestore settings
  adminDb.settings({
    ignoreUndefinedProperties: true,
  });

  return { adminApp, adminDb, adminAuth, adminStorage };
};

/**
 * Get Firebase Admin App instance
 */
export const getAdminApp = (): App => {
  if (!adminApp) {
    initializeFirebaseAdmin();
  }
  return adminApp;
};

/**
 * Get Firestore Admin instance
 */
export const getAdminDb = (): Firestore => {
  if (!adminDb) {
    initializeFirebaseAdmin();
  }
  return adminDb;
};

/**
 * Get Firebase Admin Auth instance
 */
export const getAdminAuth = (): Auth => {
  if (!adminAuth) {
    initializeFirebaseAdmin();
  }
  return adminAuth;
};

/**
 * Get Firebase Admin Storage instance
 */
export const getAdminStorage = (): Storage => {
  if (!adminStorage) {
    initializeFirebaseAdmin();
  }
  return adminStorage;
};

// Default exports
export { adminApp, adminDb, adminAuth, adminStorage };
