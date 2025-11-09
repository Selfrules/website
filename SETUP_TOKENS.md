# Setup Guide - Token Generation

Istruzioni dettagliate per ottenere i token mancanti nel file `.env`.

---

## 1. ✅ NEXTAUTH_SECRET (REQUIRED)

Genera un secret sicuro per NextAuth.js:

### Windows (PowerShell):
```powershell
# Opzione 1: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Opzione 2: Online
# Visita: https://generate-secret.vercel.app/32
```

### Linux/Mac:
```bash
openssl rand -base64 32
```

Copia il valore generato e sostituisci `YOUR_NEXTAUTH_SECRET_HERE_GENERATE_WITH_OPENSSL` nel file `.env`.

---

## 2. 🗄️ DATABASE_URL (PostgreSQL)

### Opzione A: PostgreSQL Locale (Development)

1. Installa PostgreSQL:
   - Windows: https://www.postgresql.org/download/windows/
   - Mac: `brew install postgresql`
   - Linux: `sudo apt-get install postgresql`

2. Crea il database:
   ```sql
   CREATE DATABASE mattia_web;
   ```

3. Aggiorna nel `.env`:
   ```
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/mattia_web?schema=public"
   DIRECT_URL="postgresql://postgres:your_password@localhost:5432/mattia_web?schema=public"
   ```

### Opzione B: PostgreSQL Cloud (Recommended for Production)

#### Railway (Recommended - Free tier)
1. Vai su: https://railway.app/
2. Crea account con GitHub
3. Crea nuovo progetto → Add PostgreSQL
4. Copia il "Postgres Connection URL"
5. Incolla in DATABASE_URL e DIRECT_URL nel `.env`

#### Supabase (Alternative)
1. Vai su: https://supabase.com/
2. Crea nuovo progetto
3. Vai su Settings → Database
4. Copia "Connection string" (mode: Session)
5. Incolla in DATABASE_URL e DIRECT_URL nel `.env`

---

## 3. 🎵 SPOTIFY_REFRESH_TOKEN

### Metodo 1: Spotify OAuth Playground (Più Facile)

1. Vai su: https://developer.spotify.com/console/get-users-currently-playing-track/
2. Click "GET TOKEN"
3. Seleziona scope: `user-read-currently-playing` e `user-read-playback-state`
4. Autorizza con il tuo account Spotify
5. Il token che ottieni è un **access token** (non refresh token)

### Metodo 2: Manual OAuth Flow (Ottenere Refresh Token)

1. **Crea Authorization URL**:
   ```
   https://accounts.spotify.com/authorize?
   client_id=3c4b81a879b04deca3827c31c21d1ab4
   &response_type=code
   &redirect_uri=http://localhost:3000/callback
   &scope=user-read-currently-playing user-read-playback-state
   ```

2. **Visita l'URL** nel browser, autorizza l'app

3. **Copia il code** dalla URL di redirect:
   ```
   http://localhost:3000/callback?code=AQB...xyz
   ```

4. **Scambia il code per refresh token**:
   ```bash
   curl -X POST https://accounts.spotify.com/api/token \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "grant_type=authorization_code" \
     -d "code=YOUR_CODE_HERE" \
     -d "redirect_uri=http://localhost:3000/callback" \
     -d "client_id=3c4b81a879b04deca3827c31c21d1ab4" \
     -d "client_secret=1a522f0b4a484e8abcf018972b2d69a8"
   ```

5. **Copia il refresh_token** dalla risposta JSON e incollalo in `.env`

---

## 4. 📅 GOOGLE_REFRESH_TOKEN

### Metodo: Google OAuth 2.0 Playground

1. **Vai su**: https://developers.google.com/oauthplayground

2. **Configura OAuth Playground**:
   - Click l'icona ⚙️ in alto a destra
   - Spunta "Use your own OAuth credentials"
   - Inserisci:
     - OAuth Client ID: `your-google-client-id` (dal tuo .env)
     - OAuth Client Secret: `your-google-client-secret` (dal tuo .env)

3. **Seleziona API**:
   - Nel pannello sinistro, cerca "Google Calendar API v3"
   - Seleziona:
     - `https://www.googleapis.com/auth/calendar`
     - `https://www.googleapis.com/auth/calendar.events`

4. **Autorizza**:
   - Click "Authorize APIs"
   - Login con `mattia@selfrules.org`
   - Accetta i permessi

5. **Ottieni Refresh Token**:
   - Nella Step 2, click "Exchange authorization code for tokens"
   - Copia il valore di `refresh_token`
   - Incollalo in GOOGLE_REFRESH_TOKEN nel `.env`

**IMPORTANTE**: Il refresh token viene mostrato **solo la prima volta**. Se lo perdi, dovrai revocare l'accesso e rifare il flow.

---

## 5. 🔒 UPSTASH REDIS (Rate Limiting)

### Setup Upstash (Free Tier)

1. **Crea Account**: https://console.upstash.com/

2. **Crea Redis Database**:
   - Click "Create Database"
   - Name: `mattia-web-ratelimit`
   - Type: Regional
   - Region: Scegli il più vicino (Europe West se in Italia)
   - Click "Create"

3. **Copia Credentials**:
   - Vai su "Details" del database creato
   - Scroll fino a "REST API"
   - Copia:
     - `UPSTASH_REDIS_REST_URL`
     - `UPSTASH_REDIS_REST_TOKEN`
   - Incolla nel `.env`

**Alternative**: Se non vuoi usare Upstash, puoi:
- Installare Redis locale: `docker run -p 6379:6379 redis`
- Usare `REDIS_URL="redis://localhost:6379"` invece di Upstash

---

## 6. ✅ VERIFICA CONFIGURAZIONE

Dopo aver completato tutti i setup, verifica che il file `.env` abbia:

### ✅ Required (Blockers)
- [x] `DATABASE_URL` con PostgreSQL valido
- [x] `DIRECT_URL` (uguale a DATABASE_URL)
- [x] `NEXTAUTH_SECRET` generato
- [x] `NEXTAUTH_URL=http://localhost:3000`
- [x] `ADMIN_EMAIL=mattia@selfrules.org`

### ⚠️ Important (Features)
- [ ] `ANTHROPIC_API_KEY` con chiave vera (hai detto di averla aggiunta)
- [ ] `GOOGLE_CLIENT_ID` e `GOOGLE_CLIENT_SECRET` (hai detto di averle aggiunte)
- [ ] `GOOGLE_REFRESH_TOKEN` (seguire istruzioni sopra)
- [ ] `SPOTIFY_REFRESH_TOKEN` (seguire istruzioni sopra)
- [ ] `UPSTASH_REDIS_REST_URL` e `UPSTASH_REDIS_REST_TOKEN`

### 🟢 Optional (Nice to Have)
- [ ] `EMAIL_API_KEY` per notifiche
- [ ] `SENTRY_DSN` per error monitoring

---

## 7. 🧪 TEST CONFIGURAZIONE

Dopo aver configurato tutto, testa che funzioni:

```bash
# 1. Installa dependencies per nuovi servizi
npm install next-auth @upstash/ratelimit @upstash/redis

# 2. Genera Prisma client con nuovo schema
npx prisma generate

# 3. Crea e applica migrations PostgreSQL
npx prisma migrate dev --name init

# 4. Test connessione database
npx prisma db push

# 5. Verifica che l'app parta senza errori
npm run dev
```

### Expected Output:
```
✓ Ready in 2.5s
○ Local:        http://localhost:3000
○ Ready in 2.5s

✓ Database connected
✓ Redis connected (if Upstash configured)
```

---

## 8. 🔐 SECURITY CHECKLIST

Prima di andare in production:

- [ ] Cambia `ADMIN_PASSWORD_HASH` (attualmente usa password: 'admin123')
- [ ] Usa HTTPS in production (`NEXTAUTH_URL=https://tuodominio.com`)
- [ ] NON committare `.env` su git (già in `.gitignore`)
- [ ] Usa variabili d'ambiente separate per production (Vercel/Railway)
- [ ] Abilita 2FA sul tuo account Google usato per Calendar
- [ ] Rotazione chiavi API ogni 90 giorni

---

## 9. 🚀 NEXT STEPS

Una volta configurato tutto:

1. **Avvia migration database**:
   ```bash
   npx prisma migrate dev
   ```

2. **Verifica connessioni**:
   - Apri http://localhost:3000
   - Controlla i logs per errori di connessione

3. **Inizia Phase 3A** (Security & Database):
   - Implementa NextAuth.js
   - Aggiungi rate limiting
   - Proteggi routes admin

---

## 🆘 TROUBLESHOOTING

### Database Connection Failed
```
Error: Can't reach database server
```
**Solution**: Verifica che PostgreSQL sia in esecuzione e le credenziali siano corrette

### Spotify Token Invalid
```
Error: 401 Unauthorized
```
**Solution**: Il refresh token è scaduto o invalido, rifai il flow OAuth

### Google Calendar Permission Denied
```
Error: insufficient_permissions
```
**Solution**: Assicurati di aver selezionato gli scope giusti durante l'autorizzazione

### Upstash Connection Failed
```
Error: ECONNREFUSED
```
**Solution**: Verifica che UPSTASH_REDIS_REST_URL e TOKEN siano corretti

---

**Ultima Modifica**: 2025-11-06
**Per Supporto**: Consulta `E2E_TEST_FINDINGS.md` per issue dettagliati
