# Firebase Migration Guide

This guide explains how to complete the migration from PostgreSQL/Prisma to Firebase/Firestore.

## ✅ Completed Steps

1. **Firebase Project Setup**
   - Project ID: `mattia-web`
   - Project Number: `1012574213758`
   - Firebase Console: https://console.firebase.google.com/project/mattia-web
   - Firestore Database: Configured in `europe-west1` region

2. **Environment Configuration**
   - Updated `.env` with Firebase credentials
   - Updated `.env.example` template
   - Removed PostgreSQL/Supabase configuration

3. **Firebase SDK Integration**
   - Installed `firebase@^11.2.0` (Client SDK)
   - Installed `firebase-admin@^13.0.1` (Server SDK)
   - Created configuration files in `lib/firebase/`:
     - `config.ts` - Client SDK initialization
     - `admin.ts` - Admin SDK initialization
     - `collections.ts` - TypeScript types and collection names
     - `firestore.ts` - CRUD utility functions
     - `index.ts` - Centralized exports

4. **Package.json Updates**
   - Removed Prisma dependencies
   - Removed database scripts (`db:generate`, `db:push`, `db:migrate`, `db:seed`, `db:studio`)
   - Added Firebase dependencies

5. **Gitignore Updates**
   - Added `firebase-admin-key.json` to prevent credential leaks
   - Added Firebase debug logs

## 🚧 Remaining Tasks

### 1. Download Firebase Admin Service Account Key

1. Visit: https://console.firebase.google.com/project/mattia-web/settings/serviceaccounts/adminsdk
2. Click "Generate new private key"
3. Save the JSON file as `firebase-admin-key.json` in the project root
4. ⚠️ **NEVER commit this file to git** (already in .gitignore)

### 2. Migrate API Routes

Each API route using Prisma needs to be migrated to Firestore. Reference file: `app/api/chat/route.firebase.ts`

#### Files to Migrate:
- ✅ `app/api/chat/route.ts` - Example created in `route.firebase.ts`
- ⏳ `app/api/blog/route.ts`
- ⏳ `app/api/blog/[slug]/route.ts`
- ⏳ `app/api/calendar/route.ts`
- ⏳ `app/api/calendar/book/route.ts`
- ⏳ `app/api/calendar/cancel/route.ts`
- ⏳ `app/api/calendar/available-slots/route.ts`
- ⏳ `app/api/analytics/route.ts`
- ⏳ `app/api/analytics/summary/route.ts`
- ⏳ `app/api/questions/route.ts`
- ⏳ `app/api/chat/stream/route.ts`

#### Migration Steps per File:

```typescript
// BEFORE (Prisma)
import prisma from '@/lib/db/prisma';

const users = await prisma.user.findMany({
  where: { email: 'test@example.com' },
  orderBy: { createdAt: 'desc' },
  take: 10,
});

// AFTER (Firebase)
import { COLLECTIONS, User, queryDocumentsAdmin } from '@/lib/firebase';

const users = await queryDocumentsAdmin<User>(
  COLLECTIONS.USERS,
  [{ field: 'email', operator: '==', value: 'test@example.com' }],
  'createdAt',
  'desc',
  10
);
```

#### Common Patterns:

| Prisma Method | Firestore Equivalent | Notes |
|---------------|---------------------|-------|
| `prisma.model.findMany()` | `queryDocumentsAdmin()` | Returns array |
| `prisma.model.findFirst()` | `queryDocumentsAdmin(..., limit: 1)[0]` | Get first item |
| `prisma.model.findUnique()` | `getDocumentAdmin()` | By ID |
| `prisma.model.create()` | `createDocumentAdmin()` | Auto-generates ID |
| `prisma.model.update()` | `updateDocumentAdmin()` | By ID |
| `prisma.model.delete()` | `deleteDocumentAdmin()` | By ID |
| `prisma.model.count()` | `countDocumentsAdmin()` | With filters |

#### JSON Fields:
- **Prisma**: Required `JSON.stringify()` and `JSON.parse()`
- **Firestore**: Native support for objects and arrays
- Remove all `JSON.stringify()` and `JSON.parse()` calls

#### Date/Time:
- **Prisma**: `new Date()` and `Date` objects
- **Firestore**: Use `Timestamp` from `firebase-admin/firestore`

```typescript
import { Timestamp } from 'firebase-admin/firestore';

// Instead of:
createdAt: new Date()

// Use:
createdAt: Timestamp.now()
```

### 3. Update Tests

Test files need Firebase Admin SDK initialization:

```typescript
// Before running tests, initialize Firebase Admin
import { getAdminDb } from '@/lib/firebase/admin';

beforeAll(async () => {
  // Ensure Firebase Admin is initialized
  const db = getAdminDb();
});
```

### 4. Firebase Security Rules

Update `firestore.rules` for production security:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null;
      allow update: if request.auth != null && request.auth.uid == userId;
    }

    // Blog posts - public read, admin write
    match /blog_posts/{postId} {
      allow read: if resource.data.published == true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }

    // Chat conversations - user can read their own
    match /chat_conversations/{conversationId} {
      allow read: if request.auth != null &&
                    (resource.data.userId == request.auth.uid ||
                     resource.data.sessionId == request.auth.uid);
      allow create: if request.auth != null;
      allow update: if request.auth != null &&
                      (resource.data.userId == request.auth.uid ||
                       resource.data.sessionId == request.auth.uid);
    }

    // Calendar bookings
    match /calendar_bookings/{bookingId} {
      allow read: if request.auth != null &&
                    (resource.data.userId == request.auth.uid ||
                     request.auth.token.admin == true);
      allow create: if request.auth != null;
      allow update: if request.auth != null &&
                      (resource.data.userId == request.auth.uid ||
                       request.auth.token.admin == true);
    }

    // Analytics - server-only writes
    match /analytics_events/{eventId} {
      allow read: if request.auth != null && request.auth.token.admin == true;
      allow write: if false; // Only server can write via Admin SDK
    }

    // Questions - anonymous create, admin read
    match /questions/{questionId} {
      allow read: if request.auth != null && request.auth.token.admin == true;
      allow create: if true; // Anonymous submissions allowed
      allow update: if request.auth != null && request.auth.token.admin == true;
    }

    // Newsletter - anonymous subscribe
    match /newsletter_subscriptions/{subscriptionId} {
      allow create: if true;
      allow read, update: if request.auth != null && request.auth.token.admin == true;
    }

    // Certifications & Testimonials - public read, admin write
    match /{collection}/{docId} {
      allow read: if collection in ['certifications', 'testimonials'] &&
                    resource.data.visible == true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

Deploy rules:
```bash
firebase deploy --only firestore:rules
```

### 5. Remove Prisma Files (After Migration Complete)

Once all API routes are migrated and tested:

```bash
# Remove Prisma directory
rm -rf prisma/

# Remove Prisma client file
rm lib/db/prisma.ts
```

### 6. Firestore Indexes

Some queries require composite indexes. Create them via Firebase Console or `firestore.indexes.json`:

```json
{
  "indexes": [
    {
      "collectionGroup": "blog_posts",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "published", "order": "ASCENDING" },
        { "fieldPath": "publishedAt", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "analytics_events",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "eventType", "order": "ASCENDING" },
        { "fieldPath": "timestamp", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "chat_conversations",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "category", "order": "ASCENDING" },
        { "fieldPath": "createdAt", "order": "DESCENDING" }
      ]
    }
  ],
  "fieldOverrides": []
}
```

Deploy indexes:
```bash
firebase deploy --only firestore:indexes
```

## 📚 Firebase Resources

- **Firebase Console**: https://console.firebase.google.com/project/mattia-web
- **Firestore Documentation**: https://firebase.google.com/docs/firestore
- **Admin SDK Guide**: https://firebase.google.com/docs/admin/setup
- **Security Rules**: https://firebase.google.com/docs/firestore/security/get-started

## 🔄 Migration Checklist

- [x] Create Firebase project
- [x] Configure Firestore database
- [x] Install Firebase SDKs
- [x] Create Firebase utility files
- [x] Update environment variables
- [x] Update package.json
- [ ] Download Admin SDK service account key
- [ ] Migrate API routes (12 files)
- [ ] Update test files
- [ ] Configure Firestore security rules
- [ ] Create composite indexes
- [ ] Test all API endpoints
- [ ] Remove Prisma files
- [ ] Update deployment configuration

## ⚠️ Important Notes

1. **Data Migration**: Current PostgreSQL data is NOT automatically migrated. If you need to migrate existing data:
   - Export from PostgreSQL using `pg_dump` or Prisma Studio
   - Transform to Firestore format
   - Import using Firebase Admin SDK batch writes

2. **Costs**: Firestore has a generous free tier but charges for reads/writes/storage beyond limits. Monitor usage in Firebase Console.

3. **Query Limitations**: Firestore has different query capabilities than SQL:
   - No JOINs (use denormalization or multiple queries)
   - Limited inequality filters per query
   - Some queries require composite indexes

4. **Real-time Updates**: Firestore supports real-time listeners - consider adding for chat and notifications.

## 🚀 Next Steps

1. Download the Firebase Admin service account key
2. Start migrating API routes one by one
3. Test each route thoroughly
4. Deploy security rules
5. Set up indexes for complex queries
6. Remove Prisma dependencies after migration is complete
