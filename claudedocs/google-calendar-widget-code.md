# Google Calendar Widget - Integration Code

## Codice fornito per FASE 5

```html
<!-- Google Calendar Appointment Scheduling begin -->
<link href="https://calendar.google.com/calendar/scheduling-button-script.css" rel="stylesheet">
<script src="https://calendar.google.com/calendar/scheduling-button-script.js" async></script>
<script>
(function() {
  var target = document.currentScript;
  window.addEventListener('load', function() {
    calendar.schedulingButton.load({
      url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2o-5L_7Zfq9aiQIN-euWoqcCltK9bJn_SDa_5XFZHm5OOPXtPCQsramR2k5Memd5_N2DZslh5v?gv=true',
      color: '#039BE5',
      label: 'Fissa un appuntamento',
      target,
    });
  });
})();
</script>
<!-- end Google Calendar Appointment Scheduling -->
```

## Note per l'implementazione

- Integrare nella sezione "Prenota una call"
- Sostituire il custom booking UI attuale
- Il widget è già configurato con l'URL dello scheduling di Mattia
- Label: "Fissa un appuntamento"
- Colore: #039BE5 (può essere personalizzato per match design system)

## TODO Fase 5
- [ ] Rimuovere componente BookCall attuale
- [ ] Creare wrapper Next.js per script Google Calendar
- [ ] Gestire caricamento script in modo ottimale (useEffect)
- [ ] Test integrazione e timezone handling
