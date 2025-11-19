# Netlify Deployment Guide
## Configurazione per selfrules.org

Questa guida ti aiuta a configurare il deployment del sito su Netlify con il dominio https://selfrules.org/

---

## 📋 Risposte per Netlify Setup

Quando Netlify ti chiede le informazioni di configurazione, usa questi valori:

| Campo | Valore | Note |
|-------|--------|------|
| **Base directory** | *(lascia vuoto)* | Il progetto è nella root |
| **Build command** | `npm run build` | Già configurato in `netlify.toml` |
| **Publish directory** | `.next` | Output di Next.js |
| **Functions directory** | *(lascia vuoto)* | Gestito dal plugin `@netlify/plugin-nextjs` |

✅ Il file `netlify.toml` è già stato creato e contiene tutta la configurazione necessaria.

---

## 🔧 Installazione Plugin Netlify

Prima di fare il deploy, **installa il plugin Next.js** per Netlify:

```bash
npm install --save-dev @netlify/plugin-nextjs
```

Questo plugin è necessario per:
- Gestire le API routes (`/api/*`)
- Supportare Server-Side Rendering (SSR)
- Gestire middleware e rewrites
- Ottimizzare le immagini di Next.js

---

## 🔐 Environment Variables (Variabili d'Ambiente)

### Metodo 1: Importare da file `.env`

1. Crea un file `.env` nella root con tutti i valori di produzione
2. In Netlify: **Site Settings > Environment Variables > Import from .env file**
3. Carica il file `.env`

### Metodo 2: Impostare manualmente

Vai su **Site Settings > Environment Variables** e aggiungi le seguenti variabili:

#### 🔴 REQUIRED (Obbligatorio per il funzionamento)

```bash
# Application
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://selfrules.org
NEXT_PUBLIC_API_URL=https://selfrules.org/api

# Firebase - Client SDK
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.firebasestorage.app"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"

# Firebase - Admin SDK (Server-side)
FIREBASE_ADMIN_PROJECT_ID="your-project-id"
FIREBASE_ADMIN_CLIENT_EMAIL="firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com"
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY\n-----END PRIVATE KEY-----"

# Anthropic Claude API (Chatbot)
ANTHROPIC_API_KEY=sk-ant-api03-your-key
CLAUDE_MODEL=claude-3-5-sonnet-20241022
CLAUDE_MAX_TOKENS=1024
CLAUDE_TEMPERATURE=0.7

# Google Calendar API (Booking)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALENDAR_ID=mattia@selfrules.org
GOOGLE_REDIRECT_URI=https://selfrules.org/api/calendar/callback
GOOGLE_REFRESH_TOKEN=your-refresh-token

# Upstash Redis (Rate Limiting)
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-upstash-token
```

#### 🟡 OPTIONAL (Funzionalità aggiuntive)

```bash
# Spotify Widget
SPOTIFY_CLIENT_ID=your-spotify-client-id
SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
SPOTIFY_REFRESH_TOKEN=your-spotify-refresh-token
NEXT_PUBLIC_SPOTIFY_ENABLED=true

# Umami Analytics
NEXT_PUBLIC_UMAMI_WEBSITE_ID=fbcdf857-0a39-4929-9d50-06422f9e3983
NEXT_PUBLIC_UMAMI_HOST_URL=https://cloud.umami.is
NEXT_PUBLIC_UMAMI_ENABLED=true

# Email Notifications (SendGrid/Resend)
EMAIL_API_KEY=your-email-api-key
EMAIL_FROM=notifications@selfrules.org

# Error Monitoring (Sentry)
SENTRY_DSN=your-sentry-dsn

# Rate Limiting Configuration
RATE_LIMIT_CHAT=10:1m
RATE_LIMIT_ANALYTICS=100:1m
RATE_LIMIT_CALENDAR=3:1m
RATE_LIMIT_API_DEFAULT=50:1m
```

#### 🎛️ Feature Flags

```bash
FEATURE_AI_CHATBOT=true
FEATURE_CALENDAR_BOOKING=true
FEATURE_SPOTIFY_WIDGET=true
FEATURE_ANALYTICS=true
RATE_LIMIT_ENABLED=true
LOG_LEVEL=info
```

---

## ⚠️ Note Importanti

### Firebase Admin Private Key

La variabile `FIREBASE_ADMIN_PRIVATE_KEY` contiene caratteri speciali. **Assicurati di**:

1. Includere `-----BEGIN PRIVATE KEY-----` e `-----END PRIVATE KEY-----`
2. Mantenere i `\n` per i newline (non sostituirli con veri a capo)
3. Racchiudere tutto tra **doppi apici** (")

Esempio corretto:
```bash
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...\n...\n-----END PRIVATE KEY-----\n"
```

### Google Calendar Redirect URI

Quando passi da localhost a produzione, **aggiorna**:
1. Le variabili d'ambiente (`GOOGLE_REDIRECT_URI`)
2. Le **Authorized redirect URIs** in Google Cloud Console:
   - Vai su: https://console.cloud.google.com/apis/credentials
   - Seleziona il tuo OAuth 2.0 Client ID
   - Aggiungi: `https://selfrules.org/api/calendar/callback`

### Spotify Redirect URI

Se usi Spotify, **aggiorna anche** in Spotify Dashboard:
- Vai su: https://developer.spotify.com/dashboard
- Aggiungi: `https://selfrules.org/api/spotify/callback`

---

## 🚀 Procedura di Deploy

### 1. Installa il Plugin

```bash
npm install --save-dev @netlify/plugin-nextjs
```

### 2. Commit e Push

Il file `netlify.toml` è già pronto. Committa e pusha sul tuo branch:

```bash
git add netlify.toml NETLIFY_SETUP.md package.json package-lock.json
git commit -m "Add Netlify configuration for selfrules.org deployment"
git push -u origin claude/netlify-domain-setup-01Kg6EV7gBpfoTv98MzTtE2u
```

### 3. Configura Netlify

1. **Vai su Netlify Dashboard**: https://app.netlify.com
2. **Site Settings > General > Change Repository**
3. Seleziona il nuovo repository: `Selfrules/website`
4. **Build settings** saranno letti automaticamente da `netlify.toml`
5. **Environment Variables**:
   - Vai su: **Site Settings > Environment Variables**
   - Importa il file `.env` con i valori di produzione
   - Oppure aggiungi manualmente tutte le variabili elencate sopra

### 4. Domain Settings

1. **Domain Management > Custom domains**
2. Verifica che `selfrules.org` sia configurato correttamente
3. Assicurati che il certificato SSL sia attivo (Netlify lo gestisce automaticamente)

### 5. Trigger Deploy

Dopo aver configurato tutto:
1. Vai su **Deploys**
2. Click su **Trigger deploy > Deploy site**
3. Monitora i logs per eventuali errori

---

## 🔍 Verifiche Post-Deploy

Dopo il primo deploy, verifica:

- [ ] Homepage carica correttamente
- [ ] Routing i18n funziona (`/it`, `/en`)
- [ ] API routes funzionano:
  - [ ] `/api/health` (se esiste)
  - [ ] `/api/chat` (chatbot)
  - [ ] `/api/calendar/*` (booking)
- [ ] Immagini ottimizzate vengono caricate
- [ ] Font personalizzati funzionano
- [ ] Analytics Umami traccia le visite
- [ ] Spotify widget (se abilitato)

---

## 🐛 Troubleshooting

### Build fallisce

**Errore**: `Module not found: @netlify/plugin-nextjs`
**Soluzione**: Installa il plugin con `npm install --save-dev @netlify/plugin-nextjs`

### API Routes ritornano 500

**Causa**: Environment variables mancanti o errate
**Soluzione**:
1. Verifica tutte le variabili REQUIRED siano impostate
2. Controlla i logs in Netlify: **Functions > Function logs**

### Firebase Admin SDK non funziona

**Causa**: `FIREBASE_ADMIN_PRIVATE_KEY` formattata male
**Soluzione**: Assicurati di usare `\n` per i newline, non a capo reali

### Redirect Loop

**Causa**: Configurazione redirect in conflitto con next-intl
**Soluzione**: Rimuovi le reghe `[[redirects]]` da `netlify.toml` se next-intl gestisce già i18n

---

## 📚 Riferimenti

- [Netlify Next.js Plugin](https://github.com/netlify/netlify-plugin-nextjs)
- [Next.js 14 on Netlify](https://docs.netlify.com/frameworks/next-js/overview/)
- [Environment Variables](https://docs.netlify.com/environment-variables/overview/)
- [Custom Domains](https://docs.netlify.com/domains-https/custom-domains/)

---

## ✅ Checklist Finale

Prima di fare il deploy:

- [ ] `netlify.toml` è committato
- [ ] `@netlify/plugin-nextjs` è installato
- [ ] Tutte le variabili REQUIRED sono configurate in Netlify
- [ ] Google Calendar redirect URI include il dominio produzione
- [ ] Spotify redirect URI include il dominio produzione (se usato)
- [ ] File `.env.local` NON è committato (è in `.gitignore`)

Dopo il primo deploy:

- [ ] Verificato che il sito sia accessibile su https://selfrules.org
- [ ] Testato chatbot Claude
- [ ] Testato booking calendario
- [ ] Verificato analytics Umami
- [ ] Controllato performance con Lighthouse
- [ ] Verificato che non ci siano console errors

---

🎉 **Il tuo sito è pronto per andare live su selfrules.org!**
