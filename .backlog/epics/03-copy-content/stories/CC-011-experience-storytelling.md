# [CC-011] Miglioramento Storytelling Esperienze con Contesto

## Metadata
- **Story ID**: CC-011 | **Epic**: [EPIC-003](./../epic.md)
- **Priorità**: 🟠 Alta | **Dimensione**: 🟡 M (1 giorno)
- **Execution Environment**: 💻 **Claude Code Locale** (richiede copywriter-hybrid)
- **Stato**: 📋 Todo | **Data**: 2025-11-16

## User Story
**Come** lettore **Voglio** storie dettagliate e autentiche delle esperienze lavorative **Così che** possa capire il vero valore e l'impatto del lavoro svolto

## Contesto
L'utente ha fornito note contestuali per ogni esperienza che devono essere integrate nello storytelling. Le esperienze attuali sono buone ma possono essere arricchite con dettagli più specifici e aneddoti concreti.

## Note Contestuali per Esperienza

### 1. Selfrules (2012-2018)
**Contesto fornito**:
- Modena
- Esperienza di design e web design
- Grafiche digitali e stampate, loghi, siti web professionali
- Gestione clienti e intero ciclo di vita progetto
- Dalla vendita prima dei lavori al supporto post-delivery
- Target: PMI

**Da integrare nello storytelling**:
- Ciclo completo: vendita → design → delivery → supporto
- Esperienza con PMI (piccole-medie imprese)
- Gestione cliente autonoma
- Sia digitale che stampato

### 2. Flowing (2016-2020)
**Contesto fornito**:
- Ancona
- Entrato come UX Designer
- Disegnava layout per web app e sviluppava primo codice
- Portava esperienza di gestione cliente e facilitazione
- Target: Aziende medio-grandi e startup

**Da integrare nello storytelling**:
- Transizione da design a design+dev
- Esperienza di facilitazione portata da Selfrules
- Lavoro con aziende più grandi rispetto a PMI
- CliensPiù come case study principale (già presente, da rafforzare)

### 3. ActiveProspect (2020-2023)
**Contesto fornito**:
- Austin, Texas
- Entrato come Product Owner di team 10 persone
- Portato e fatto permeare filosofia agile
- Voce del cliente al tavolo di sviluppo
- Scelte giuste basate su feedback utenti
- Startup acquisita, prodotto di marketing

**Da integrare nello storytelling**:
- Team size: 10 persone
- Location: Austin, TX (internazionale)
- Filosofia agile implementata
- Focus su "voce del cliente"
- Contesto: startup acquisita + prodotto marketing

### 4. QubicaAMF (2023-oggi)
**Contesto fornito**:
- Bologna
- Visione completa e fuori dagli schemi
- Strategia unita alla tattica, visione unita alla concretezza
- "Vedo, capisco, agisco"
- Prodotti digitali + esperienza fisica utente
- Due progetti chiave:

**Progetto 1: Pagamenti**
- Integrazioni con provider di pagamento
- "Quando si parla di soldi tutti stanno sull'attenti"
- Da lista problemi → individuati quelli più frustranti
- Messi in lavorazione immediata
- Mercato calmato in 1 mese

**Progetto 2: Cashless**
- Integrazione come nuovo canale vendita
- +30 ricariche in una domenica
- Acquistate dal sito web
- "Poche cose che spostano l'ago, meno meeting fatti di parole"

**Da integrare nello storytelling**:
- Prodotti digitali + esperienza fisica (bowling, intrattenimento)
- Approccio: vedo → capisco → agisco
- Caso pagamenti: prioritizzazione per frustrazione, non complessità
- Caso cashless: nuovo canale, risultati immediati
- Filosofia: poche cose che spostano l'ago

## Criteri di Accettazione
- [ ] **AC1**: Ogni esperienza integra le note contestuali fornite
- [ ] **AC2**: QubicaAMF ha dettagli specifici su pagamenti e cashless
- [ ] **AC3**: Storytelling segue pattern: contesto → azione → risultato
- [ ] **AC4**: Nessun dettaglio generico, solo fatti concreti
- [ ] **AC5**: copywriter-hybrid valida coerenza tone of voice
- [ ] **AC6**: Versioni IT e EN allineate

## Pattern Storytelling Target

### Formula da seguire:
1. **Contesto**: Dove, quando, con chi
2. **Problema**: Cosa non funzionava
3. **Azione**: Cosa ho fatto (concreto)
4. **Risultato**: Cosa è cambiato (misurabile se possibile)
5. **Lesson**: Cosa ho imparato

### Esempio (QubicaAMF - Pagamenti):
```
❌ PRIMA (generico):
"Migliorato il sistema di pagamento"

✅ DOPO (specifico):
"Lista infinita di problemi con i pagamenti.
Ma quando si parla di soldi, tutti stanno sull'attenti.
Ho individuato quelli più frustranti per i clienti.
Priorità immediata: non per complessità tecnica, per dolore reale.
Risultato? Mercato calmato in 1 mese. -12% tempi di pagamento in 6 mesi.
Come? Da 7 click a 3. Zero magia."
```

## Implementazione

### Step 1: Mappare Note → Experiences
```bash
# Per ogni esperienza, estrarre da note contestuali:
1. Location e team size
2. Responsabilità chiave
3. Target clienti/prodotti
4. Progetti specifici
5. Risultati misurabili
```

### Step 2: Audit con copywriter-hybrid
```bash
@copywriter-hybrid

Analizza e arricchisci lo storytelling delle 4 esperienze lavorative.

Note contestuali per esperienza:
[Fornire tutte le note sopra]

Per ogni esperienza, verifica:
1. **Contesto**: Include location, team, target? O manca?
2. **Specificità**: Ci sono fatti concreti? O genericità?
3. **Pattern**: Segue contesto→azione→risultato? O salta step?
4. **Autenticità**: Suona vero e vissuto? O come un CV?
5. **Tone**: Mantiene pragmatismo+ironia? O troppo serio?

Focus su QubicaAMF:
- Integrare dettagli pagamenti (da 7 click a 3, -12%, mercato calmato in 1 mese)
- Integrare dettagli cashless (+30 ricariche in una domenica)
- Filosofia "poche cose che spostano l'ago, meno meeting"

Output per esperienza:
📍 ESPERIENZA
🔍 ANALISI (cosa manca, cosa va migliorato)
💡 RISCRITTURA PROPOSTA (con note contestuali integrate)
```

### Step 3: Integrazione
- Aggiornare `it.json` sezione `journey.experiences`
- Aggiornare `en.json` sezione `journey.experiences`
- Verificare lunghezza testi non rompa layout
- Testare su desktop e mobile

## Files
- `/messages/it.json` (sezione `journey.experiences`)
- `/messages/en.json` (sezione `journey.experiences`)
- `/components/sections/Journey.tsx` (se layout richiede aggiustamenti)

## Definition of Done
- [ ] Tutte e 4 le esperienze analizzate
- [ ] Note contestuali integrate
- [ ] QubicaAMF con dettagli pagamenti e cashless
- [ ] Pattern storytelling consistente
- [ ] Zero genericità, solo fatti concreti
- [ ] Tone of voice validato da copywriter-hybrid
- [ ] IT e EN allineate
- [ ] Test visivo su Journey section
- [ ] Nessun overflow o layout rotto

## Note
Questa story è cruciale per trasformare un CV in uno storytelling autentico. Le note contestuali fornite dall'utente sono oro: danno specificità e credibilità.

**Obiettivo**: Chi legge deve pensare "questa persona ha fatto davvero queste cose" non "bel CV generico".
