# [SV-002] Fix Secrets Management (Remove Default Hash)

## Metadata
- **Story ID**: SV-002
- **Epic**: [EPIC-007](./../epic.md)
- **Priorità**: 🔴 Critica | **Dimensione**: 🟡 M (0.5-1 giorno)
- **Execution Environment**: 🌐 Claude Code Web
- **Stato**: 🚧 To Do | **Data Completamento**: -

## User Story
**Come** security engineer **Voglio** che nessun secret/credential di default sia presente nel repository **Così che** gli attaccanti non possano usare credenziali note per accedere al sistema

## Vulnerabilità Correlate (Security Audit)
- **6.1**: Default Bcrypt Hash in `.env.example` (CRITICAL)
- **6.2**: Firebase Private Key in Environment Variables (CRITICAL if exposed)
- **6.3**: API Keys Visible in Console Errors (MEDIUM)

## Criteri di Accettazione
- [ ] **AC1**: `.env.example` non contiene hash bcrypt di default
- [ ] **AC2**: `.env.example` contiene solo placeholder per secrets
- [ ] **AC3**: Pre-commit hook verifica che `.env` non sia mai committato
- [ ] **AC4**: Documentation aggiornata con istruzioni per generare secrets
- [ ] **AC5**: Error logging non rivela API keys o tokens
- [ ] **AC6**: `.gitignore` include tutti i file con secrets

## Implementazione Tecnica

### 1. Remove Default Hash from .env.example

**File**: `.env.example`

```bash
# PRIMA (VULNERABLE)
ADMIN_PASSWORD_HASH=$2a$12$JvWRVN79guQ8lFFfUhNQFeJ7pdLQJ.gYahsq0aKGONYpCqz42FKXq

# DOPO (SECURE)
# Admin Authentication
ADMIN_PASSWORD_HASH=YOUR_BCRYPT_HASH_HERE
# Generate with: node -e "const bcrypt=require('bcryptjs'); console.log(bcrypt.hashSync('your-secure-password', 12))"

# Firebase Admin SDK (REQUIRED)
FIREBASE_ADMIN_PROJECT_ID=your-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----"
# NEVER commit the actual private key! Rotate immediately if exposed.

# Claude API
CLAUDE_API_KEY=sk-ant-YOUR_API_KEY_HERE
# Get your API key from: https://console.anthropic.com/

# Google Calendar OAuth
GOOGLE_CLIENT_ID=YOUR_CLIENT_ID.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET
# Generate credentials at: https://console.cloud.google.com/apis/credentials

# Spotify API (Optional)
SPOTIFY_CLIENT_ID=YOUR_SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET=YOUR_SPOTIFY_CLIENT_SECRET
SPOTIFY_REFRESH_TOKEN=YOUR_REFRESH_TOKEN
# Setup guide: https://developer.spotify.com/documentation/web-api/
```

### 2. Add Pre-Commit Hook to Prevent Secrets Leak

**File**: `.husky/pre-commit` (NEW or UPDATE)

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Prevent .env file from being committed
if git diff --cached --name-only | grep -E '^\.env$'; then
  echo "ERROR: Attempted to commit .env file!"
  echo "Secrets should NEVER be committed to version control."
  echo "Only .env.example should be in git."
  exit 1
fi

# Check for common secret patterns in staged files
if git diff --cached | grep -E 'sk-ant-|-----BEGIN PRIVATE KEY-----|AKIA[0-9A-Z]{16}'; then
  echo "WARNING: Potential secret detected in staged changes!"
  echo "Please review your changes and remove any API keys, tokens, or private keys."
  exit 1
fi

# Run existing linting/type-check
npm run lint-staged
```

**Install husky** (if not already installed):
```bash
npm install --save-dev husky
npx husky install
npx husky add .husky/pre-commit "npm run lint-staged"
```

### 3. Update .gitignore

**File**: `.gitignore`

```bash
# Environment variables (CRITICAL - NEVER COMMIT)
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Firebase
firebase-adminsdk-*.json
serviceAccountKey.json

# Vercel
.vercel

# Secrets and credentials
*.pem
*.key
*.crt
secrets/
credentials/
```

### 4. Sanitize Error Logging

**File**: `lib/utils/errors.ts` (UPDATE)

```typescript
/**
 * Sanitize error for logging - remove sensitive data
 */
export function sanitizeError(error: unknown): unknown {
  if (error instanceof Error) {
    // Remove potential API keys/tokens from error message
    const sanitized = error.message
      .replace(/sk-ant-[A-Za-z0-9_-]+/g, 'REDACTED_API_KEY')
      .replace(/Bearer [A-Za-z0-9._-]+/g, 'Bearer REDACTED_TOKEN')
      .replace(/-----BEGIN [A-Z ]+-----[\s\S]+?-----END [A-Z ]+-----/g, 'REDACTED_PRIVATE_KEY')
      .replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}/g, 'REDACTED_EMAIL');

    return { ...error, message: sanitized };
  }
  return error;
}

/**
 * Safe error logging for production
 */
export function logError(error: unknown, context?: string) {
  const sanitized = sanitizeError(error);

  if (process.env.NODE_ENV === 'production') {
    console.error(`[${context || 'Error'}]:`, sanitized);
  } else {
    console.error(`[${context || 'Error'}]:`, error);
  }
}
```

**Update all error logging**:
```typescript
// PRIMA
console.error('API error:', error);

// DOPO
import { logError } from '@/lib/utils/errors';
logError(error, 'API error');
```

### 5. Create Secrets Setup Documentation

**File**: `docs/SECRETS_SETUP.md` (NEW)

```markdown
# Secrets Setup Guide

## Initial Setup

### 1. Copy Environment Template
```bash
cp .env.example .env.local
```

### 2. Generate Admin Password Hash
```bash
node -e "const bcrypt=require('bcryptjs'); const password='YOUR_SECURE_PASSWORD'; console.log(bcrypt.hashSync(password, 12))"
```

Copy the output and paste it in `.env.local`:
```bash
ADMIN_PASSWORD_HASH=<paste_bcrypt_hash_here>
```

### 3. Setup Firebase Admin SDK
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings > Service Accounts
4. Click "Generate New Private Key"
5. Save the JSON file (DO NOT commit it!)
6. Extract values to `.env.local`:
```bash
FIREBASE_ADMIN_PROJECT_ID=your-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
```

### 4. Setup Claude API
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Generate an API key
3. Add to `.env.local`:
```bash
CLAUDE_API_KEY=sk-ant-your-key-here
```

### 5. Setup Google Calendar OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URIs
4. Add to `.env.local`:
```bash
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

## Security Best Practices

### DO ✅
- Use strong, unique passwords/secrets
- Rotate secrets regularly (every 90 days)
- Use different secrets for dev/staging/production
- Store production secrets in Vercel/hosting provider dashboard
- Keep `.env.local` in `.gitignore`

### DON'T ❌
- NEVER commit `.env` files
- NEVER share secrets via Slack/email
- NEVER use default/example secrets
- NEVER hardcode secrets in code
- NEVER log secrets to console

## Secret Rotation

If a secret is compromised:
1. Immediately revoke it in the provider dashboard
2. Generate a new secret
3. Update `.env.local` and production environment
4. Verify all services are working
5. Document the rotation in change log

## Troubleshooting

**Error: "ADMIN_PASSWORD_HASH not configured"**
- Solution: Generate bcrypt hash and add to `.env.local`

**Error: "Firebase Admin SDK not initialized"**
- Solution: Verify all 3 Firebase env vars are set correctly

**Pre-commit hook blocking commit**
- Check if you're accidentally committing `.env`
- Check for API keys in staged files
- Use `git status` and `git diff --cached` to inspect
```

## Files da Modificare
1. `.env.example` - Remove default secrets, add placeholders
2. `.husky/pre-commit` - Add secret detection
3. `.gitignore` - Ensure all secret files ignored
4. `lib/utils/errors.ts` - Add sanitizeError() and logError()
5. All API route files - Use logError() instead of console.error()
6. `docs/SECRETS_SETUP.md` (NEW) - Complete setup guide

## Test Plan

### Manual Testing
```bash
# 1. Verify .env.example has no real secrets
grep -E "sk-ant-|-----BEGIN PRIVATE KEY-----|\$2a\$12\$" .env.example
# Expected: No matches (only placeholders)

# 2. Test pre-commit hook (block .env commit)
git add .env.local
git commit -m "test"
# Expected: Commit blocked with error message

# 3. Test pre-commit hook (block API key commit)
echo 'const apiKey = "sk-ant-real-key-123456";' > test.js
git add test.js
git commit -m "test"
# Expected: Commit blocked with warning

# 4. Test error sanitization
node -e "
const { sanitizeError } = require('./lib/utils/errors');
const error = new Error('Failed to call API with key sk-ant-abc123xyz');
const sanitized = sanitizeError(error);
console.log(sanitized.message);
"
# Expected: "Failed to call API with key REDACTED_API_KEY"

# 5. Verify .gitignore patterns
git check-ignore .env .env.local firebase-adminsdk-test.json secrets/
# Expected: All files should be ignored

# 6. Test missing env var handling
# Remove ADMIN_PASSWORD_HASH from .env.local temporarily
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"password": "test"}'
# Expected: 500 error with generic message (not revealing what's missing)
```

### Automated Testing
```typescript
// tests/secrets-management.test.ts
import { describe, test, expect } from '@jest/globals';
import { sanitizeError, logError } from '@/lib/utils/errors';
import fs from 'fs';

describe('Secrets Management', () => {
  test('should not contain real secrets in .env.example', () => {
    const envExample = fs.readFileSync('.env.example', 'utf-8');

    // Check for API key patterns
    expect(envExample).not.toMatch(/sk-ant-[A-Za-z0-9_-]{40,}/);

    // Check for private keys
    expect(envExample).not.toMatch(/-----BEGIN PRIVATE KEY-----[\s\S]+-----END PRIVATE KEY-----/);

    // Check for default bcrypt hash
    expect(envExample).not.toMatch(/\$2a\$12\$[A-Za-z0-9/.]{53}/);

    // Should contain placeholders
    expect(envExample).toContain('YOUR_BCRYPT_HASH_HERE');
    expect(envExample).toContain('YOUR_PRIVATE_KEY_HERE');
    expect(envExample).toContain('YOUR_API_KEY_HERE');
  });

  test('should sanitize API keys in error messages', () => {
    const error = new Error('API call failed with key sk-ant-abc123xyz456');
    const sanitized = sanitizeError(error);

    expect(sanitized.message).not.toContain('sk-ant-');
    expect(sanitized.message).toContain('REDACTED_API_KEY');
  });

  test('should sanitize Bearer tokens', () => {
    const error = new Error('Unauthorized: Bearer eyJhbGc.iOiJIUzI1NiIsInR5.cCI6IkpXVCJ9');
    const sanitized = sanitizeError(error);

    expect(sanitized.message).not.toMatch(/Bearer [A-Za-z0-9._-]+/);
    expect(sanitized.message).toContain('Bearer REDACTED_TOKEN');
  });

  test('should sanitize private keys', () => {
    const error = new Error('Invalid key: -----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----');
    const sanitized = sanitizeError(error);

    expect(sanitized.message).not.toContain('BEGIN PRIVATE KEY');
    expect(sanitized.message).toContain('REDACTED_PRIVATE_KEY');
  });

  test('should sanitize email addresses', () => {
    const error = new Error('Failed to send email to admin@example.com');
    const sanitized = sanitizeError(error);

    expect(sanitized.message).not.toContain('@example.com');
    expect(sanitized.message).toContain('REDACTED_EMAIL');
  });
});
```

## Definition of Done
- [ ] `.env.example` contiene solo placeholder (no real secrets)
- [ ] `.husky/pre-commit` hook implementato e testato
- [ ] `.gitignore` aggiornato con tutti i pattern di secrets
- [ ] `sanitizeError()` e `logError()` implementati in `lib/utils/errors.ts`
- [ ] Tutti i `console.error()` sostituiti con `logError()`
- [ ] `docs/SECRETS_SETUP.md` creato con guida completa
- [ ] All manual tests pass
- [ ] All automated tests pass
- [ ] Nessun secret committato nel git history (verificato con `git log -p`)
- [ ] Zero errori TypeScript
- [ ] Zero errori linting

---

## Note di Sicurezza
- **Secret Rotation**: Implementare rotazione automatica ogni 90 giorni
- **Secret Scanning**: Considerare integrazione con GitHub Secret Scanning o GitGuardian
- **Audit Logging**: Loggare accessi admin e API calls (senza secrets)
- **Environment Separation**: Usare secrets diversi per dev/staging/production

## Riferimenti
- OWASP Secrets Management: https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html
- GitHub Secret Scanning: https://docs.github.com/en/code-security/secret-scanning
- Husky Git Hooks: https://typicode.github.io/husky/
