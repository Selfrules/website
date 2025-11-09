// Firestore Utility Functions
// Helper functions for CRUD operations with type safety

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentData,
  QueryConstraint,
  serverTimestamp,
  Timestamp,
  WhereFilterOp,
} from 'firebase/firestore';
import { getFirebaseDb } from './config';
import { getAdminDb } from './admin';
import { FirestoreDocument, CreateDocument, UpdateDocument } from './collections';

// Type-safe filter values for Firestore queries
export type FirestoreFilterValue =
  | string
  | number
  | boolean
  | Timestamp
  | FirebaseFirestore.Timestamp // Admin SDK Timestamp
  | null
  | string[]
  | number[]
  | boolean[];

/**
 * Generic function to create a document
 */
export async function createDocument<T extends FirestoreDocument>(
  collectionName: string,
  data: CreateDocument<T>,
  customId?: string
): Promise<T> {
  const db = getFirebaseDb();
  if (!db) throw new Error('Firestore not initialized');

  const docData = {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  } as DocumentData;

  if (customId) {
    const docRef = doc(db, collectionName, customId);
    await setDoc(docRef, docData);
    return { id: customId, ...docData } as T;
  } else {
    const docRef = await addDoc(collection(db, collectionName), docData);
    return { id: docRef.id, ...docData } as T;
  }
}

/**
 * Generic function to create a document (server-side with Admin SDK)
 */
export async function createDocumentAdmin<T extends FirestoreDocument>(
  collectionName: string,
  data: CreateDocument<T>,
  customId?: string
): Promise<T> {
  const db = getAdminDb();
  const timestamp = Timestamp.now();

  const docData = {
    ...data,
    createdAt: timestamp,
    updatedAt: timestamp,
  } as DocumentData;

  if (customId) {
    const docRef = db.collection(collectionName).doc(customId);
    await docRef.set(docData);
    return { id: customId, ...docData } as T;
  } else {
    const docRef = await db.collection(collectionName).add(docData);
    return { id: docRef.id, ...docData } as T;
  }
}

/**
 * Generic function to get a document by ID
 */
export async function getDocument<T extends FirestoreDocument>(
  collectionName: string,
  documentId: string
): Promise<T | null> {
  const db = getFirebaseDb();
  if (!db) throw new Error('Firestore not initialized');

  const docRef = doc(db, collectionName, documentId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as T;
  }
  return null;
}

/**
 * Generic function to get a document by ID (server-side with Admin SDK)
 */
export async function getDocumentAdmin<T extends FirestoreDocument>(
  collectionName: string,
  documentId: string
): Promise<T | null> {
  const db = getAdminDb();
  const docRef = db.collection(collectionName).doc(documentId);
  const docSnap = await docRef.get();

  if (docSnap.exists) {
    return { id: docSnap.id, ...docSnap.data() } as T;
  }
  return null;
}

/**
 * Generic function to update a document
 */
export async function updateDocument<T extends FirestoreDocument>(
  collectionName: string,
  documentId: string,
  data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<void> {
  const db = getFirebaseDb();
  if (!db) throw new Error('Firestore not initialized');

  const docRef = doc(db, collectionName, documentId);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  } as DocumentData);
}

/**
 * Generic function to update a document (server-side with Admin SDK)
 */
export async function updateDocumentAdmin<T extends FirestoreDocument>(
  collectionName: string,
  documentId: string,
  data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<void> {
  const db = getAdminDb();
  const docRef = db.collection(collectionName).doc(documentId);
  await docRef.update({
    ...data,
    updatedAt: Timestamp.now(),
  } as DocumentData);
}

/**
 * Generic function to delete a document
 */
export async function deleteDocument(
  collectionName: string,
  documentId: string
): Promise<void> {
  const db = getFirebaseDb();
  if (!db) throw new Error('Firestore not initialized');

  const docRef = doc(db, collectionName, documentId);
  await deleteDoc(docRef);
}

/**
 * Generic function to delete a document (server-side with Admin SDK)
 */
export async function deleteDocumentAdmin(
  collectionName: string,
  documentId: string
): Promise<void> {
  const db = getAdminDb();
  await db.collection(collectionName).doc(documentId).delete();
}

/**
 * Query documents with filters
 */
export async function queryDocuments<T extends FirestoreDocument>(
  collectionName: string,
  filters: Array<{ field: string; operator: WhereFilterOp; value: FirestoreFilterValue }> = [],
  orderByField?: string,
  orderDirection: 'asc' | 'desc' = 'desc',
  limitCount?: number
): Promise<T[]> {
  const db = getFirebaseDb();
  if (!db) throw new Error('Firestore not initialized');

  const constraints: QueryConstraint[] = [];

  // Add where clauses
  filters.forEach((filter) => {
    constraints.push(where(filter.field, filter.operator, filter.value));
  });

  // Add ordering
  if (orderByField) {
    constraints.push(orderBy(orderByField, orderDirection));
  }

  // Add limit
  if (limitCount) {
    constraints.push(limit(limitCount));
  }

  const q = query(collection(db, collectionName), ...constraints);
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as T[];
}

/**
 * Query documents with filters (server-side with Admin SDK)
 */
export async function queryDocumentsAdmin<T extends FirestoreDocument>(
  collectionName: string,
  filters: Array<{ field: string; operator: FirebaseFirestore.WhereFilterOp; value: FirestoreFilterValue }> = [],
  orderByField?: string,
  orderDirection: 'asc' | 'desc' = 'desc',
  limitCount?: number
): Promise<T[]> {
  const db = getAdminDb();
  let queryRef: FirebaseFirestore.Query = db.collection(collectionName);

  // Add where clauses
  filters.forEach((filter) => {
    queryRef = queryRef.where(filter.field, filter.operator, filter.value);
  });

  // Add ordering
  if (orderByField) {
    queryRef = queryRef.orderBy(orderByField, orderDirection);
  }

  // Add limit
  if (limitCount) {
    queryRef = queryRef.limit(limitCount);
  }

  const querySnapshot = await queryRef.get();

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as T[];
}

/**
 * Get all documents from a collection
 */
export async function getAllDocuments<T extends FirestoreDocument>(
  collectionName: string
): Promise<T[]> {
  const db = getFirebaseDb();
  if (!db) throw new Error('Firestore not initialized');

  const querySnapshot = await getDocs(collection(db, collectionName));

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as T[];
}

/**
 * Get all documents from a collection (server-side with Admin SDK)
 */
export async function getAllDocumentsAdmin<T extends FirestoreDocument>(
  collectionName: string
): Promise<T[]> {
  const db = getAdminDb();
  const querySnapshot = await db.collection(collectionName).get();

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as T[];
}

/**
 * Count documents in a collection with optional filters
 */
export async function countDocuments(
  collectionName: string,
  filters: Array<{ field: string; operator: WhereFilterOp; value: FirestoreFilterValue }> = []
): Promise<number> {
  const docs = await queryDocuments(collectionName, filters);
  return docs.length;
}

/**
 * Count documents in a collection with optional filters (server-side)
 */
export async function countDocumentsAdmin(
  collectionName: string,
  filters: Array<{ field: string; operator: FirebaseFirestore.WhereFilterOp; value: any }> = []
): Promise<number> {
  const docs = await queryDocumentsAdmin(collectionName, filters);
  return docs.length;
}

/**
 * Batch operations helper
 */
export async function batchWrite(
  operations: Array<{
    type: 'create' | 'update' | 'delete';
    collection: string;
    id?: string;
    data?: any;
  }>
): Promise<void> {
  const db = getAdminDb();
  const batch = db.batch();

  operations.forEach((op) => {
    const docRef = op.id
      ? db.collection(op.collection).doc(op.id)
      : db.collection(op.collection).doc();

    switch (op.type) {
      case 'create':
      case 'update':
        batch.set(docRef, {
          ...op.data,
          updatedAt: Timestamp.now(),
          ...(op.type === 'create' && { createdAt: Timestamp.now() }),
        }, { merge: op.type === 'update' });
        break;
      case 'delete':
        batch.delete(docRef);
        break;
    }
  });

  await batch.commit();
}
