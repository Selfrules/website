# [EPIC-001] Consolidamento e Automazione Design System

## Metadata
- **Epic ID**: EPIC-001
- **Priorità**: 🔴 Alta
- **Stato**: 📋 Not Started
- **Execution Environment**: 🔄 Entrambi (Web per consolidamento, Locale per automazione)
- **Stima Totale**: M (1-2 settimane)
- **Data Creazione**: 2025-11-13
- **Ultima Modifica**: 2025-11-13

## Contesto e Problema

### Problema Corrente
Attualmente coesistono due sistemi di styling nel progetto:
1. **Tailwind CSS** con le sue utility classes standard
2. **Custom Design System** creato nella pagina `/design-system` con componenti neobrutalist

Questo causa inconsistenze quando Claude Code sviluppa nuove funzionalità:
- Non è chiaro quale sistema usare
- Le componenti nuove non seguono sempre le linee guida del design system custom
- Non c'è un processo automatico per aggiungere nuovi componenti alla documentazione
- Il file `CLAUDE.md` non fa sempre riferimento esplicito al design system custom

### Impatto
- **Utenti**: Esperienza visiva inconsistente, componenti che non seguono il brand neobrutalist
- **Business**: Brand identity debole, mancanza di coerenza nel design
- **Tecnico**: Debito tecnico crescente, difficoltà di manutenzione, duplication di stili

## Obiettivo

### Risultato Atteso
Un design system consolidato, ben documentato e automatizzato dove:
- Claude Code fa sempre riferimento al design system custom (bypassing Tailwind utilities dove appropriato)
- Ogni nuovo componente viene automaticamente catalogato nella pagina `/design-system`
- Esiste documentazione chiara e facilmente manutenibile
- Le linee guida del design system sono integrate in `CLAUDE.md`

### Metriche di Successo
- [ ] **100% coerenza**: Tutti i nuovi componenti seguono il design system custom
- [ ] **Auto-documentazione**: Nuovi componenti vengono aggiunti automaticamente alla pagina design-system
- [ ] **Zero ambiguità**: Claude Code sa sempre quale sistema usare grazie a istruzioni esplicite
- [ ] **Documentazione completa**: Ogni componente ha esempi, varianti e linee guida d'uso

## User Stories

- [ ] [DS-001] Consolidare token di design e utility Tailwind custom (Dimensione: M) - [Link](./stories/DS-001-consolidate-design-tokens.md)
- [ ] [DS-002] Sistema di auto-catalogazione componenti nel design system (Dimensione: L) - [Link](./stories/DS-002-auto-catalog-components.md)
- [ ] [DS-003] Aggiornare CLAUDE.md con linee guida design system (Dimensione: S) - [Link](./stories/DS-003-update-claude-guidelines.md)
- [ ] [DS-004] Creare documentazione interattiva design system (Dimensione: M) - [Link](./stories/DS-004-interactive-documentation.md)
- [ ] [DS-005] Audit e refactoring componenti esistenti (Dimensione: L) - [Link](./stories/DS-005-audit-refactor-components.md)

## Dipendenze

### Dipendenze Tecniche
- [ ] Tailwind CSS v3.x: Base per custom utilities
- [ ] Next.js 14: App Router per design system page
- [ ] TypeScript: Per type-safe component props
- [ ] Framer Motion: Per animazioni neobrutalist

### Dipendenze da Altre Epiche
Nessuna - questa è una epica fondazionale

## Vincoli e Considerazioni

### Vincoli Tecnici
- Mantenere compatibilità con Tailwind esistente per non rompere componenti già in uso
- Performance: l'auto-catalogazione non deve rallentare il build time
- Il design system deve essere mobile-first e accessibile (WCAG AA)

### Vincoli di Business
- Non modificare drasticamente l'aspetto visivo esistente
- Mantenere la brand identity neobrutalist (bold borders, hard shadows, cold-tone palette)
- Timeline: completare prima di procedere con altre epiche che creano nuovi componenti

## Note e Risorse

- [Pagina Design System corrente](../../app/[locale]/design-system/page.tsx)
- [Tailwind Config](../../tailwind.config.ts)
- [CLAUDE.md](../../CLAUDE.md)
- [Neobrutalism Design Guidelines](https://neobrutalism.dev/)

---

## Storia delle Modifiche
| Data | Autore | Modifiche |
|------|--------|-----------|
| 2025-11-13 | Claude Code | Epica creata dal backlog dell'utente |
