# [CC-001] Verifica e Ottimizzazione CTAs Homepage

## Metadata
- **Story ID**: CC-001 | **Epic**: [EPIC-003](./../epic.md)
- **Priorità**: 🟠 Alta | **Dimensione**: 🟡 M (1-2 giorni)
- **Execution Environment**: 💻 **Claude Code Locale** (richiede agenti)
- **Stato**: 📋 Todo | **Data**: 2025-11-13

## User Story
**Come** content manager **Voglio** che tutte le CTAs della homepage siano coerenti con il tone of voice **Così che** il messaggio sia efficace e autentico

## Criteri di Accettazione
- [ ] **AC1**: Agente copywriter-hybrid analizza tutte le CTAs della homepage
- [ ] **AC2**: Agente hormozi-conversion-optimizer suggerisce miglioramenti conversion-focused
- [ ] **AC3**: Tutte le CTAs seguono i principi: pragmatismo Romei + accessibilità Toon + purpose Sinek
- [ ] **AC4**: CTAs mantengono sentence case
- [ ] **AC5**: Zero "marketing fluff", solo value proposition chiare

## Implementazione
```bash
# Usare agenti in Claude Code Locale
1. Lanciare copywriter-hybrid per analisi tone of voice
2. Lanciare hormozi-conversion-optimizer per suggerimenti conversion
3. Applicare modifiche alle CTAs in:
   - Hero section
   - Journey section
   - Blog section
   - Footer
```

## Sezioni da Analizzare
- Hero: CTA principale e secondaria
- Journey: CTAs nelle experience cards
- Blog: CTA di invito alla lettura
- Contact: CTAs per booking

## Files
- `/app/[locale]/page.tsx` (homepage sections)
- `/components/sections/*.tsx`

## Definition of Done
- [ ] Agenti eseguiti e report generati
- [ ] CTAs aggiornate con suggerimenti approvati
- [ ] Tone of voice coerente su tutte le sezioni
- [ ] Versione IT aggiornata
- [ ] Test manuale lettura completa homepage
