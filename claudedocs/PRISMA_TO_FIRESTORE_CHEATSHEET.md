# Prisma to Firestore Cheatsheet

Quick reference for converting Prisma queries to Firestore operations.

## Import Changes

```typescript
// ❌ PRISMA
import prisma from '@/lib/db/prisma';

// ✅ FIRESTORE
import {
  COLLECTIONS,
  User, // Type import
  queryDocumentsAdmin,
  getDocumentAdmin,
  createDocumentAdmin,
  updateDocumentAdmin,
  deleteDocumentAdmin,
  countDocumentsAdmin,
} from '@/lib/firebase';
```

## Find Operations

### Find Many

```typescript
// ❌ PRISMA
const users = await prisma.user.findMany({
  where: {
    email: 'test@example.com',
    active: true,
  },
  orderBy: { createdAt: 'desc' },
  take: 10,
  skip: 5,
});

// ✅ FIRESTORE
const users = await queryDocumentsAdmin<User>(
  COLLECTIONS.USERS,
  [
    { field: 'email', operator: '==', value: 'test@example.com' },
    { field: 'active', operator: '==', value: true },
  ],
  'createdAt',
  'desc',
  10 // limit (take)
  // Note: skip/offset not directly supported - use pagination with startAfter
);
```

### Find First

```typescript
// ❌ PRISMA
const user = await prisma.user.findFirst({
  where: { email: 'test@example.com' },
});

// ✅ FIRESTORE
const users = await queryDocumentsAdmin<User>(
  COLLECTIONS.USERS,
  [{ field: 'email', operator: '==', value: 'test@example.com' }],
  undefined,
  'desc',
  1
);
const user = users[0] || null;
```

### Find Unique (By ID)

```typescript
// ❌ PRISMA
const user = await prisma.user.findUnique({
  where: { id: userId },
});

// ✅ FIRESTORE
const user = await getDocumentAdmin<User>(
  COLLECTIONS.USERS,
  userId
);
```

## Create Operations

```typescript
// ❌ PRISMA
const user = await prisma.user.create({
  data: {
    email: 'test@example.com',
    name: 'Test User',
    preferences: JSON.stringify({ theme: 'dark' }),
  },
});

// ✅ FIRESTORE
const user = await createDocumentAdmin<User>(
  COLLECTIONS.USERS,
  {
    email: 'test@example.com',
    name: 'Test User',
    preferences: { theme: 'dark' }, // No JSON.stringify needed!
  }
);
```

## Update Operations

```typescript
// ❌ PRISMA
const user = await prisma.user.update({
  where: { id: userId },
  data: {
    name: 'Updated Name',
    updatedAt: new Date(),
  },
});

// ✅ FIRESTORE
await updateDocumentAdmin<User>(
  COLLECTIONS.USERS,
  userId,
  {
    name: 'Updated Name',
    // updatedAt is handled automatically
  }
);
```

## Delete Operations

```typescript
// ❌ PRISMA
await prisma.user.delete({
  where: { id: userId },
});

// ✅ FIRESTORE
await deleteDocumentAdmin(COLLECTIONS.USERS, userId);
```

## Count Operations

```typescript
// ❌ PRISMA
const count = await prisma.user.count({
  where: { active: true },
});

// ✅ FIRESTORE
const count = await countDocumentsAdmin(
  COLLECTIONS.USERS,
  [{ field: 'active', operator: '==', value: true }]
);
```

## JSON Fields

```typescript
// ❌ PRISMA - Requires JSON.stringify/parse
const conversation = await prisma.chatConversation.create({
  data: {
    messages: JSON.stringify([
      { role: 'user', content: 'Hello' }
    ]),
    metadata: JSON.stringify({ source: 'web' }),
  },
});

const messages = JSON.parse(conversation.messages);

// ✅ FIRESTORE - Native object/array support
const conversation = await createDocumentAdmin<ChatConversation>(
  COLLECTIONS.CHAT_CONVERSATIONS,
  {
    messages: [
      { role: 'user', content: 'Hello' }
    ],
    metadata: { source: 'web' },
  }
);

// No parsing needed - messages is already an array!
const messages = conversation.messages;
```

## Timestamps

```typescript
import { Timestamp } from 'firebase-admin/firestore';

// ❌ PRISMA
const booking = await prisma.calendarBooking.create({
  data: {
    dateTime: new Date(),
    createdAt: new Date(),
  },
});

// ✅ FIRESTORE
const booking = await createDocumentAdmin<CalendarBooking>(
  COLLECTIONS.CALENDAR_BOOKINGS,
  {
    dateTime: Timestamp.now(),
    // createdAt is handled automatically
  }
);
```

## Multiple Filters (AND conditions)

```typescript
// ❌ PRISMA
const posts = await prisma.blogPost.findMany({
  where: {
    published: true,
    category: 'Design',
    locale: 'en',
  },
});

// ✅ FIRESTORE
const posts = await queryDocumentsAdmin<BlogPost>(
  COLLECTIONS.BLOG_POSTS,
  [
    { field: 'published', operator: '==', value: true },
    { field: 'category', operator: '==', value: 'Design' },
    { field: 'locale', operator: '==', value: 'en' },
  ]
);
```

## Comparison Operators

```typescript
// ❌ PRISMA
const events = await prisma.analyticsEvent.findMany({
  where: {
    timestamp: {
      gte: startDate,
      lte: endDate,
    },
    eventType: {
      in: ['click', 'view'],
    },
  },
});

// ✅ FIRESTORE
const events = await queryDocumentsAdmin<AnalyticsEvent>(
  COLLECTIONS.ANALYTICS_EVENTS,
  [
    { field: 'timestamp', operator: '>=', value: startDate },
    { field: 'timestamp', operator: '<=', value: endDate },
    { field: 'eventType', operator: 'in', value: ['click', 'view'] },
  ]
);
```

## Firestore Operator Reference

| Prisma | Firestore Operator | Example |
|--------|-------------------|---------|
| `equals` | `==` | `{ field: 'status', operator: '==', value: 'active' }` |
| `not` | `!=` | `{ field: 'status', operator: '!=', value: 'deleted' }` |
| `lt` | `<` | `{ field: 'age', operator: '<', value: 18 }` |
| `lte` | `<=` | `{ field: 'age', operator: '<=', value: 18 }` |
| `gt` | `>` | `{ field: 'price', operator: '>', value: 100 }` |
| `gte` | `>=` | `{ field: 'price', operator: '>=', value: 100 }` |
| `in` | `in` | `{ field: 'category', operator: 'in', value: ['A', 'B'] }` |
| `notIn` | `not-in` | `{ field: 'status', operator: 'not-in', value: ['deleted'] }` |
| `contains` | `array-contains` | `{ field: 'tags', operator: 'array-contains', value: 'featured' }` |

## Parallel Queries

```typescript
// ❌ PRISMA
const [conversations, total] = await Promise.all([
  prisma.chatConversation.findMany({
    where: { sessionId },
    take: 20,
  }),
  prisma.chatConversation.count({
    where: { sessionId },
  }),
]);

// ✅ FIRESTORE
const filters = [{ field: 'sessionId', operator: '==', value: sessionId }];

const [conversations, total] = await Promise.all([
  queryDocumentsAdmin<ChatConversation>(
    COLLECTIONS.CHAT_CONVERSATIONS,
    filters,
    'createdAt',
    'desc',
    20
  ),
  countDocumentsAdmin(COLLECTIONS.CHAT_CONVERSATIONS, filters),
]);
```

## Batch Operations

```typescript
// ❌ PRISMA
await prisma.$transaction([
  prisma.user.create({ data: user1 }),
  prisma.user.create({ data: user2 }),
  prisma.user.update({ where: { id: '123' }, data: { name: 'Updated' } }),
]);

// ✅ FIRESTORE
import { batchWrite } from '@/lib/firebase';

await batchWrite([
  { type: 'create', collection: COLLECTIONS.USERS, data: user1 },
  { type: 'create', collection: COLLECTIONS.USERS, data: user2 },
  { type: 'update', collection: COLLECTIONS.USERS, id: '123', data: { name: 'Updated' } },
]);
```

## Common Pitfalls

### ❌ Don't Use JSON.stringify

```typescript
// ❌ WRONG
messages: JSON.stringify(messagesArray)

// ✅ CORRECT
messages: messagesArray
```

### ❌ Don't Manually Set createdAt/updatedAt

```typescript
// ❌ WRONG
await createDocumentAdmin(COLLECTIONS.USERS, {
  email: 'test@example.com',
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now(),
});

// ✅ CORRECT - handled automatically
await createDocumentAdmin(COLLECTIONS.USERS, {
  email: 'test@example.com',
});
```

### ❌ Don't Forget Type Parameters

```typescript
// ❌ WRONG - no type safety
const user = await getDocumentAdmin(COLLECTIONS.USERS, userId);

// ✅ CORRECT - with TypeScript types
const user = await getDocumentAdmin<User>(COLLECTIONS.USERS, userId);
```

## Firestore Limitations vs PostgreSQL

1. **No JOINs**: Denormalize data or use multiple queries
2. **Limited Inequality Filters**: Only one range filter per query
3. **No OR Queries**: Use `in` operator or multiple queries
4. **Offset Pagination**: Not efficient - use cursor-based (startAfter)
5. **Array Queries**: Use `array-contains` but limited to one per query

## Migration Workflow

1. ✅ Read current Prisma implementation
2. ✅ Identify all Prisma operations
3. ✅ Replace imports with Firebase
4. ✅ Convert each operation using this cheatsheet
5. ✅ Remove JSON.stringify/parse calls
6. ✅ Replace Date with Timestamp where needed
7. ✅ Test the migrated endpoint
8. ✅ Deploy and verify in production

---

**Reference File**: See `app/api/chat/route.firebase.ts` for a complete working example.
