# Supabase Connection Issue - Da Risolvere

**Data**: 2025-11-06
**Status**: ⏸️ In sospeso - da affrontare successivamente

---

## 🔴 Problema

Impossibile connettersi al database PostgreSQL su Supabase tramite Prisma. Errore di autenticazione con il connection pooler.

## 📋 Dettagli Configurazione

### Credenziali Supabase
- **Project URL**: https://hqsdtqecpkhfswnzifbx.supabase.co
- **Project REF**: hqsdtqecpkhfswnzifbx
- **Region**: aws-1-eu-north-1
- **Database Password**: 744xVfl89BOzMYYc
- **User Email**: info@selfrules.org

### Connection Strings Provate

1. **Direct Connection** (IPv6 - non funziona su Windows):
   ```
   postgresql://postgres:744xVfl89BOzMYYc@db.hqsdtqecpkhfswnzifbx.supabase.co:5432/postgres
   ```
   **Errore**: `P1001: Can't reach database server` (IPv6 non supportato)

2. **Transaction Pooling** (porta 6543):
   ```
   postgresql://postgres.hqsdtqecpkhfswnzifbx:744xVfl89BOzMYYc@aws-1-eu-north-1.pooler.supabase.com:6543/postgres?pgbouncer=true
   ```
   **Errore**: `P1000: Authentication failed`

3. **Session Pooling** (porta 5432):
   ```
   postgresql://postgres.hqsdtqecpkhfswnzifbx:744xVfl89BOzMYYc@aws-1-eu-north-1.pooler.supabase.com:5432/postgres
   ```
   **Errore**: `P1000: Authentication failed`

## 🔍 Diagnosi

### Cosa Funziona
- ✅ Server raggiungibile (nessun errore di rete dopo il passaggio al pooler)
- ✅ Porta corretta (5432 per session, 6543 per transaction)
- ✅ Password corretta (verificata dal dashboard)

### Cosa NON Funziona
- ❌ Autenticazione con il pooler (session e transaction mode)
- ❌ Direct connection (IPv6 non supportato su Windows)

### Possibili Cause
1. **Connection Pooler non attivato**: Potrebbe richiedere attivazione manuale nel dashboard
2. **Free Tier Limitations**: Il pooling potrebbe non essere disponibile sul piano gratuito
3. **Database in inizializzazione**: Il database potrebbe essere appena stato creato
4. **Username format errato**: Potrebbe servire un formato diverso per il pooler

## 🛠️ Cosa Abbiamo Provato

1. ✅ URL-encoded password per caratteri speciali
2. ✅ Regione corretta (aws-1-eu-north-1 invece di aws-0-eu-central-1)
3. ✅ Timeout aumentato (connect_timeout=30)
4. ✅ Formato username con project_ref (`postgres.hqsdtqecpkhfswnzifbx`)
5. ✅ Parametro pgbouncer=true per transaction mode

## 📝 Prossimi Step da Provare

### 1. Verifica Dashboard Supabase
- [ ] Controllare **Database** → Status indicator
- [ ] Verificare se c'è una sezione "**Pooler Configuration**"
- [ ] Cercare messaggi di errore o warning
- [ ] Verificare se il pooling è "**Active**" o "**Paused**"

### 2. Alternative Immediate
- [ ] **IPv4 Add-on**: Comprare l'addon IPv4 per connessione diretta ($10/mese)
- [ ] **Upgrade Plan**: Verificare se il pooling è disponibile solo su Pro plan
- [ ] **Support Ticket**: Aprire ticket Supabase per verificare lo stato del pooler

### 3. Workaround Temporanei
- [ ] **Local PostgreSQL**: Usare PostgreSQL locale per sviluppo
- [ ] **Railway**: Provider alternativo con IPv4 nativo e pooling incluso
- [ ] **Docker PostgreSQL**: Container locale per sviluppo

### 4. Test Alternativi
```bash
# Test connessione con psql (se disponibile)
psql "postgresql://postgres.hqsdtqecpkhfswnzifbx:744xVfl89BOzMYYc@aws-1-eu-north-1.pooler.supabase.com:5432/postgres"

# Test connessione diretta (se IPv6 disponibile)
psql "postgresql://postgres:744xVfl89BOzMYYc@db.hqsdtqecpkhfswnzifbx.supabase.co:5432/postgres"
```

## 📚 Documentazione di Riferimento

- [Supabase Connection Pooling](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler)
- [Prisma with Supabase](https://www.prisma.io/docs/guides/database/supabase)
- [IPv4 vs IPv6 Issues](https://supabase.com/docs/guides/database/connecting-to-postgres#ipv4-vs-ipv6)

## ✅ Configurazione Attuale (Pronta per Quando Funzionerà)

**File `.env`**:
```bash
# Transaction pooling per app queries
DATABASE_URL="postgresql://postgres.hqsdtqecpkhfswnzifbx:744xVfl89BOzMYYc@aws-1-eu-north-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connect_timeout=30"

# Session mode per migrations
DIRECT_URL="postgresql://postgres.hqsdtqecpkhfswnzifbx:744xVfl89BOzMYYc@aws-1-eu-north-1.pooler.supabase.com:5432/postgres?connect_timeout=30"
```

**Prisma Schema**: ✅ Già configurato per PostgreSQL con 9 modelli completi

## 🎯 Impatto

**Bloccato**:
- ❌ Creazione tabelle database
- ❌ Migrations Prisma
- ❌ Test connessione database

**NON Bloccato** (può procedere senza DB):
- ✅ Generazione NEXTAUTH_SECRET
- ✅ Ottenere Spotify refresh token
- ✅ Ottenere Google refresh token
- ✅ Setup Upstash Redis
- ✅ Implementazione UI components
- ✅ API routes (con dati mock temporanei)

---

**Note**: Questo problema può essere risolto in un secondo momento. Per ora procediamo con gli altri setup che non richiedono il database attivo.
