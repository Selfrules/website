# 🎵 Spotify Player - Setup Completo

Guida rapida per completare l'integrazione del Spotify "Now Playing" widget.

---

## ✅ **Già Fatto**

- ✅ File `.env` creato con credenziali
- ✅ Route API OAuth implementate
- ✅ Pagina `/spotify-setup` per autorizzazione
- ✅ Widget UI con gestione errori migliorata
- ✅ Auto token refresh
- ✅ Caching e polling

---

## 🎯 **Setup in 3 Passi**

### **Step 1: Configura Spotify Dashboard** (OBBLIGATORIO)

1. Vai su: https://developer.spotify.com/dashboard
2. Clicca sull'app **"mattia-web"**
3. Vai su **"Settings"** (in alto a destra)
4. Scroll fino a **"Redirect URIs"**
5. **Aggiungi questo URI**:
   ```
   http://localhost:3000/api/spotify/callback
   ```
6. Clicca **"Add"** poi **"Save"** in fondo

**IMPORTANTE**: Senza questo passaggio, l'OAuth fallirà con errore "redirect_uri_mismatch".

---

### **Step 2: Avvia il Server di Sviluppo**

```bash
# Nella root del progetto
npm run dev
```

Aspetta che il server si avvii su `http://localhost:3000`

---

### **Step 3: Autorizza Spotify**

1. Apri il browser e vai su:
   ```
   http://localhost:3000/spotify-setup
   ```

2. Clicca il pulsante verde **"Authorize with Spotify"**

3. Verrai reindirizzato a Spotify:
   - **Login** con l'account: `mattia@selfrules.org`
   - Clicca **"Agree"** per autorizzare l'app

4. Verrai reindirizzato a `/spotify-setup` con il **refresh token**:
   - Il token sarà **auto-copiato** negli appunti
   - Vedi istruzioni per salvarlo nel `.env`

5. **Apri il file `.env`** e trova questa riga:
   ```bash
   SPOTIFY_REFRESH_TOKEN=
   ```

6. **Incolla il token** dopo il `=`:
   ```bash
   SPOTIFY_REFRESH_TOKEN=AQD...il_tuo_token_qui...xyz
   ```

7. **Salva il file** e **riavvia il server**:
   ```bash
   # Ctrl+C per fermare
   npm run dev
   ```

8. **Vai alla homepage**:
   ```
   http://localhost:3000
   ```

9. **Cerca il widget "Now Playing"** nella sezione "What I'm up to" 🎉

---

## 🎨 **Funzionalità Implementate**

### **Stati del Widget**

1. **Loading**: Animazione gradient mentre carica
2. **Now Playing**: Mostra album art + nome canzone + artista
   - Animazione bars verdi se sta suonando
   - Cliccabile → apre Spotify
   - Hover → tooltip con info complete
3. **Offline**: "Not Playing" con link a Spotify profile
4. **Errore Autenticazione**: Button "Authorize Spotify" → `/spotify-setup`
5. **Errore Rete**: Button "Retry" per ricaricare

### **Features Avanzate**

- ✅ **Auto-refresh**: Token automaticamente rinnovato
- ✅ **Polling**: Controlla ogni 30s per aggiornamenti
- ✅ **Caching**: 30s cache per ridurre API calls
- ✅ **Fallback**: Se non sta suonando, mostra ultima canzone
- ✅ **Responsive**: Mobile-first design
- ✅ **Accessibility**: ARIA labels, focus states, keyboard nav
- ✅ **Neobrutalist**: Borders, shadows, hover effects matching brand

---

## 🧪 **Test Manuale**

### **Scenario 1: Prima Autorizzazione**
1. `.env` senza refresh token
2. Vai su homepage → Widget mostra errore "Authentication Error"
3. Clicca "Authorize Spotify" → `/spotify-setup`
4. Autorizza → Refresh token mostrato
5. Copia nel `.env` → Riavvia server
6. Homepage → Widget mostra canzone ✅

### **Scenario 2: Già Autorizzato - Suonando**
1. Apri Spotify e metti play a una canzone
2. Homepage → Widget mostra album art + nome + bars verdi animate
3. Hover → Tooltip con dettagli
4. Click → Si apre Spotify ✅

### **Scenario 3: Già Autorizzato - Non Suonando**
1. Ferma Spotify (pausa tutto)
2. Homepage → Widget mostra ultima canzone con bars spente
3. O mostra "Not Playing" se nessuna recent track
4. Click → Si apre Spotify profile ✅

### **Scenario 4: Errore di Rete**
1. Disconnetti internet
2. Homepage → Widget mostra "Connection Failed"
3. Click "Retry" → Riprova a connettersi
4. Riconnetti internet → Widget riprende ✅

---

## 🐛 **Troubleshooting**

### **Errore: "redirect_uri_mismatch"**
**Causa**: Redirect URI non configurato nel Spotify Dashboard
**Soluzione**: Segui Step 1 sopra

### **Errore: "invalid_client"**
**Causa**: Client ID o Secret errati nel `.env`
**Soluzione**: Verifica credenziali su Spotify Dashboard

### **Errore: "401 Unauthorized"**
**Causa**: Refresh token scaduto o invalido
**Soluzione**: Rifai Step 3 per ottenere nuovo token

### **Widget mostra sempre "Loading"**
**Causa**: Server non raggiungibile o errore API
**Soluzione**:
1. Controlla console browser (F12)
2. Verifica che `/api/spotify/now-playing` risponda
3. Controlla logs server per errori

### **Widget mostra "Not Playing" ma stai ascoltando**
**Causa**: Spotify privacy settings o account diverso
**Soluzione**:
1. Assicurati di aver autorizzato con `mattia@selfrules.org`
2. Controlla Spotify Settings → Privacy → "Make my listening activity private" (deve essere OFF)
3. Aspetta 30s per il prossimo poll

---

## 📂 **File Modificati/Creati**

```
/home/user/website/
├── .env                                    # ✅ Creato
├── app/
│   ├── api/spotify/
│   │   ├── auth/route.ts                  # ✅ Creato
│   │   └── callback/route.ts              # ✅ Creato
│   └── spotify-setup/
│       └── page.tsx                        # ✅ Creato
└── components/integrations/
    └── SpotifyWidget.tsx                   # ✅ Migliorato
```

---

## 🚀 **Prossimi Passi (Opzionali)**

### **1. Progress Bar** (Nice to have)
Mostrare barra di progresso con tempo rimanente:
- API già restituisce `progress` e `duration`
- Serve solo UI component

### **2. Playlist Widget** (Future)
Mostrare playlist corrente o top tracks:
- Richiede scope aggiuntivo: `user-top-read`
- Nuova route API

### **3. Analytics** (Future)
Tracciare click sul widget:
- Integrare con sistema analytics esistente
- Metriche: click rate, engagement

### **4. Service Worker Cache** (PWA)
Cache offline dei dati Spotify:
- Mostrare ultima canzone anche offline
- Migliora perceived performance

---

## 📖 **Documentazione di Riferimento**

- [Spotify Web API Docs](https://developer.spotify.com/documentation/web-api)
- [OAuth 2.0 Flow](https://developer.spotify.com/documentation/web-api/tutorials/code-flow)
- [Available Scopes](https://developer.spotify.com/documentation/web-api/concepts/scopes)
- [Rate Limits](https://developer.spotify.com/documentation/web-api/concepts/rate-limits)

---

## ✅ **Checklist Finale**

Prima di considerare completo:

- [ ] Step 1: Redirect URI configurato su Spotify Dashboard
- [ ] Step 2: Server in esecuzione su `http://localhost:3000`
- [ ] Step 3: Refresh token ottenuto e salvato in `.env`
- [ ] Test: Widget mostra canzone quando Spotify suona
- [ ] Test: Widget cliccabile e apre Spotify
- [ ] Test: Hover mostra tooltip su desktop
- [ ] Test: Errore auth mostra button "Authorize"
- [ ] Test: Offline mostra "Not Playing" con link

---

**Ultima Modifica**: 2025-11-10
**Autore**: Claude (implementazione completa Approach B)

🎵 **Buon ascolto!**
