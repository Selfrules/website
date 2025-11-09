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
 * Prioritizes environment variables over file-based credentials for security
 */
const initializeFirebaseAdmin = () => {
  // Check if already initialized
  if (getApps().length > 0) {
    adminApp = getApps()[0];
  } else {
    // Priority 1: Environment variables (production/cloud)
    if (
      process.env.FIREBASE_ADMIN_PROJECT_ID &&
      process.env.FIREBASE_ADMIN_CLIENT_EMAIL &&
      process.env.FIREBASE_ADMIN_PRIVATE_KEY
    ) {
      adminApp = initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        storageBucket: `${process.env.FIREBASE_ADMIN_PROJECT_ID}.appspot.com`,
      });
    }
    // Priority 2: Cloud environment auto-detect (Cloud Functions, Cloud Run)
    else if (process.env.FIREBASE_ADMIN_PROJECT_ID) {
      adminApp = initializeApp({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      });
    }
    // Priority 3: Local development fallback (file-based, NOT for production)
    else {
      try {
        const serviceAccount = require('../../firebase-admin-key.json');
        adminApp = initializeApp({
          credential: cert(serviceAccount),
          projectId: serviceAccount.project_id,
          storageBucket: `${serviceAccount.project_id}.appspot.com`,
        });
        console.warn(
          '⚠️  Using file-based Firebase credentials (development only). Set environment variables for production.'
        );
      } catch (error) {
        throw new Error(
          'Firebase Admin initialization failed. Required: FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, FIREBASE_ADMIN_PRIVATE_KEY environment variables, OR firebase-admin-key.json file for local development.'
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
