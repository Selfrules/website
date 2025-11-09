// Firebase - Main Export File
// Centralized exports for Firebase configuration and utilities

// Client SDK exports
export {
  getFirebaseApp,
  getFirebaseDb,
  getFirebaseAuth,
  getFirebaseStorage,
  app,
  db,
  auth,
  storage,
} from './config';

// Admin SDK exports
export {
  getAdminApp,
  getAdminDb,
  getAdminAuth,
  getAdminStorage,
  adminApp,
  adminDb,
  adminAuth,
  adminStorage,
} from './admin';

// Collection names and types
export { COLLECTIONS } from './collections';
export type {
  FirestoreDocument,
  User,
  BlogPost,
  ChatMessage,
  ChatConversation,
  CalendarBooking,
  AnalyticsEvent,
  NewsletterSubscription,
  Question,
  Certification,
  Testimonial,
  CreateDocument,
  UpdateDocument,
} from './collections';

// Firestore utility functions
export {
  createDocument,
  createDocumentAdmin,
  getDocument,
  getDocumentAdmin,
  updateDocument,
  updateDocumentAdmin,
  deleteDocument,
  deleteDocumentAdmin,
  queryDocuments,
  queryDocumentsAdmin,
  getAllDocuments,
  getAllDocumentsAdmin,
  countDocuments,
  countDocumentsAdmin,
  batchWrite,
} from './firestore';
