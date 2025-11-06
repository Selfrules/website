# Phase 3A.1: Security & Auth - Status Report

**Data**: 2025-11-06
**Stato**: In Progress - Blocco tecnico su password hash

## Lavoro Completato ✅

### 1. Upstash Redis Setup
- Database creato: `mattia-web-ratelimit` (EU Central)
- Credenziali configurate in `.env`:
  - REST_URL: `https://artistic-crappie-34143.upstash.io`
  - REST_TOKEN: configurato
- Rate limiters configurati per: chat, analytics, calendar, booking, api

### 2. NextAuth.js Installation
- Pacchetti installati:
  - `next-auth@4.24.13`
  - `@upstash/ratelimit@2.0.7`
  - `@upstash/redis@1.35.6`
  - `bcrypt@5.1.1`

### 3. File Creati/Modificati
- ✅ `lib/auth/config.ts` - NextAuth configuration con Credentials Provider
- ✅ `app/api/auth/[...nextauth]/route.ts` - NextAuth API handler
- ✅ `lib/middleware/rate-limit.ts` - Upstash rate limiting (sostituito ioredis)
- ✅ `middleware.ts` - Auth protection per route /admin
- ✅ `app/admin/login/page.tsx` - Login form con NextAuth

### 4. Configurazione Environment
- NEXTAUTH_SECRET generato
- ADMIN_EMAIL: mattia@selfrules.org
- NEXTAUTH_URL: http://localhost:3000

## Problema Attuale ⚠️

### Bcrypt Hash + Environment Variables
**Issue**: L'hash bcrypt contiene caratteri `$` che vengono interpretati come variabili d'ambiente da Node.js, risultando in un valore vuoto.

**Hash Generato**: `$2b$12$Rp2qNdqtPeHN2jWgBHlyTu1tBkrNAQ3fwghUfRncond2TDwLsbiVi`

**Tentativi falliti**:
1. Senza virgolette: `ADMIN_PASSWORD_HASH=$2b$12$...` → valore vuoto
2. Virgolette doppie: `ADMIN_PASSWORD_HASH="$2b$12$..."` → valore vuoto
3. Virgolette singole: `ADMIN_PASSWORD_HASH='$2b$12$...'` → non supportate da Next.js
4. Escape backslash: `ADMIN_PASSWORD_HASH="\$2b\$12\$..."` → in test

**Log dall'app**:
```
[AUTH] ADMIN_PASSWORD_HASH length: 0
[AUTH] ADMIN_PASSWORD_HASH value:
```

## Soluzioni Possibili 🔧

### Opzione 1: Hardcode Hash (Temporaneo)
```typescript
// lib/auth/config.ts
const ADMIN_PASSWORD_HASH = '$2b$12$Rp2qNdqtPeHN2jWgBHlyTu1tBkrNAQ3fwghUfRncond2TDwLsbiVi';
const passwordMatch = await bcrypt.compare(
  credentials.password,
  ADMIN_PASSWORD_HASH
);
```

### Opzione 2: .env.local (Next.js preferred)
Spostare le credenziali in `.env.local` che potrebbe gestire meglio l'escaping.

### Opzione 3: Base64 Encoding
```bash
# Encode hash
echo '$2b$12$...' | base64

# In .env
ADMIN_PASSWORD_HASH_B64=JDJiJDEyJC4uLg==

# In code
const hash = Buffer.from(process.env.ADMIN_PASSWORD_HASH_B64, 'base64').toString();
```

### Opzione 4: Secret Manager
Usare un secret manager esterno (es. Vercel Environment Variables) invece del file .env locale.

## Password Corrente
- **Password**: `admin123` (solo per development)
- **Hash**: `$2b$12$Rp2qNdqtPeHN2jWgBHlyTu1tBkrNAQ3fwghUfRncond2TDwLsbiVi`

## Next Steps 📋

1. **Immediate**: Implementare Opzione 1 (hardcode hash) per sbloccare testing
2. **Short-term**: Test completo del flusso di autenticazione
3. **Medium-term**: Implementare soluzione production-ready (Opzione 3 o 4)
4. **Cleanup**: Rimuovere logging di debug da `lib/auth/config.ts`

## File di Configurazione

### .env (sezione auth)
```bash
# AUTHENTICATION (NextAuth.js) - REQUIRED
NEXTAUTH_SECRET=sMV/nP8wEtTSuF+D66UEqw31sn4bakx3VdfXd1FwviE=
NEXTAUTH_URL=http://localhost:3000
ADMIN_EMAIL=mattia@selfrules.org
# Password: admin123 (change in production!)
ADMIN_PASSWORD_HASH="\$2b\$12\$Rp2qNdqtPeHN2jWgBHlyTu1tBkrNAQ3fwghUfRncond2TDwLsbiVi"
```

## Note Tecniche

- NextAuth session strategy: JWT
- Session max age: 30 days
- Admin routes protetti da middleware
- Rate limiting attivo su tutti gli endpoint
- Login page: `/admin/login`
- Protected routes: `/admin/*` (eccetto `/admin/login`)
