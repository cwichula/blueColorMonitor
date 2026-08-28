/* docs/shared/i18n/sv.js — słownik WSPÓLNY, szwedzki.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, gdy aktywnym językiem jest szwedzki.
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w pl.js i en.js — i tak ma zostać
 * (patrz docs/shared/README.md, rozdział „Warstwa językowa”). Klucza, którego
 * nie ma w angielskim, nie wolno tu dopisać: angielski jest wartością
 * zapasową, więc to on wyznacza zestaw.
 *
 * REJESTR: bezpośrednie „du”, jednolicie w całym pliku — w szwedzczyźnie jest
 * to forma neutralna i standardowa także w tekstach urzędowych i medycznych
 * („ni” brzmiałoby dziś sztucznie). Ton rzeczowy i ciepły, bez marketingu.
 *
 * TERMINOLOGIA (jeden odpowiednik na pojęcie): blåandel, scenens ljusstyrka,
 * färgtemperatur, dygnsrytmpåverkan (współczynnik: melanopisk kvot), flimmer,
 * jämnhet, synkomfort; „zegar biologiczny” = den biologiska klockan.
 * Świadomie „dygnsrytm”, a nie kalka „cirkadisk rytm” — to przyjęty szwedzki
 * termin naukowy. „Optometrysta” w zdaniu o rozporządzeniu oddane jako
 * „optiker”: tak brzmi w Szwecji chroniona nazwa tego zawodu.
 *
 * LICZBY: szwedzki zapisuje ułamek przecinkiem (1,00 — 0,50), tak jak polski.
 * CUDZYSŁÓW: szwedzki stawia ”…” — po obu stronach znak zamykający.
 *
 * LICZEBNIKI: Intl.PluralRules('sv') zwraca dwie kategorie — one i other.
 */
window.I18nData = window.I18nData || {};
window.I18nData['sv'] = Object.assign(window.I18nData['sv'] || {}, {

  /* Nazwa własna — wchodzi jako wstawka w zdanie o rozporządzeniu
     (UE) 2017/745, gdzie stoi jako podmiot. */
  'app.name': 'Ljusmonitor',

  /* ---- wybór języka ---- */

  'language.label': 'Språk',
  'language.help': 'Språket i hela appen. Alla språk finns redan på den här enheten — ingenting laddas ned och ingenting skickas någonstans.',
  'language.auto': 'Följ enheten',
  'language.autoHint': 'Följer språket som är inställt i telefonen eller i webbläsaren.',

  /* ---- siedem wielkości: Metrics.CATALOGUE ---- */

  'metric.share.name': 'Blåandel',
  'metric.share.unit': '%',
  'metric.share.unitSpoken': 'procent',
  'metric.share.short': 'Hur mycket av ljuset i bild som faller på den blå kanalen.',
  'metric.share.help': 'Den skiljer färgen från ljusstyrkan — det är det här värdet som ändras när du slår på nattläget.',

  'metric.brightness.name': 'Scenens ljusstyrka',
  'metric.brightness.unit': '%',
  'metric.brightness.unitSpoken': 'procent',
  'metric.brightness.short': 'Genomsnittlig ljusstyrka i kamerabilden.',
  'metric.brightness.help': 'Ett relativt värde, inte lux — kamerans automatiska exponering förskjuter det i bakgrunden.',

  'metric.kelvin.name': 'Färgtemperatur',
  'metric.kelvin.unit': 'K',
  'metric.kelvin.unitSpoken': 'kelvin',
  'metric.kelvin.short': 'Om ljuset är varmt eller kallt.',
  'metric.kelvin.help': 'Under 3000 K är ljuset varmt och mildare på kvällen. 6500 K är standardvitt på de flesta skärmar.',

  'metric.melanopic.name': 'Dygnsrytmpåverkan',
  'metric.melanopic.unit': '×',
  'metric.melanopic.unitSpoken': 'gånger',
  'metric.melanopic.short': 'Hur starkt det här ljuset verkar på den biologiska klockan.',
  'metric.melanopic.help': 'En uppskattning av den melanopiska kvoten. 1,00 är neutralt dagsljusvitt; på kvällen är det värt att gå under 0,50.',

  'metric.flicker.name': 'Flimmer',
  'metric.flicker.unit': '%',
  'metric.flicker.unitSpoken': 'procent',
  'metric.flicker.short': 'Osynlig pulsering hos ljuskällan.',
  'metric.flicker.help': 'Billiga dimmrar och bakgrundsbelysningar pulserar. Ögat ser det inte, men det är en känd orsak till trötthet och huvudvärk.',

  'metric.uniformity.name': 'Jämnhet',
  'metric.uniformity.unit': '%',
  'metric.uniformity.unitSpoken': 'procent',
  'metric.uniformity.short': 'Om ljuset fördelar sig jämnt över bilden.',
  'metric.uniformity.help': 'Ett lågt värde på en skärm betyder ljusläckage från bakgrundsbelysningen eller en reflex; på skrivbordet betyder det en illa placerad lampa.',

  'metric.comfort.name': 'Synkomfort',
  'metric.comfort.unit': 'p',
  'metric.comfort.unitSpoken': 'poäng',
  'metric.comfort.short': 'Ett omdöme i stället för sex siffror.',
  'metric.comfort.help': 'Den väger samman de övriga mätvärdena till ett resultat 0–100 och visar vad som sänker det mest. Vikterna är vår redaktionella bedömning, inte en standard.',

  /* Etykiety składników oceny komfortu — Metrics.comfortIndex zwraca je jako
     `penalties[].id`, więc nazwa klucza idzie za tym identyfikatorem. */
  'comfort.penalty.melanopic': 'Dygnsrytmpåverkan',
  'comfort.penalty.kelvin': 'Kall ljusfärg',
  'comfort.penalty.flicker': 'Flimmer',
  'comfort.penalty.uniformity': 'Ojämn belysning',

  /* ---- kamera: napisy silnika pomiaru (docs/shared/engine.js) ----
     Zasłona podglądu i komunikaty o nieudanym starcie kamery. */

  'engine.idle': 'Tryck på ”Start” för att slå på kameran.',
  'engine.starting': 'Startar kameran…',

  'engine.error.permission': 'Ingen behörighet att använda kameran. Tillåt kameran i webbläsarens inställningar och tryck på ”Start” igen.',
  'engine.error.notFound': 'Ingen kamera hittades. Kontrollera att enheten har en kamera och att den inte är avstängd i systemet.',
  'engine.error.busy': 'Kameran används av ett annat program. Stäng det och försök igen.',
  'engine.error.unknown': 'Kameran kunde inte startas.',
  'engine.error.unsupported': 'Den här webbläsaren ger inte den här sidan tillgång till kameran. Öppna appen via HTTPS eller använd en annan webbläsare.',

  /* ---- strefy ---- */

  'zone.good': 'Normalt',
  'zone.warning': 'Varning',
  'zone.critical': 'Kritiskt',
  'zone.none': 'Inga data',
  'zone.settling': 'Ställer in',

  /* Wersja mówiona — czytnik ekranu wpina ją w środek zdania, więc małą literą
     i bez kropki. */
  'zone.spoken.good': 'normalt',
  'zone.spoken.warning': 'varning',
  'zone.spoken.critical': 'kritiskt',
  'zone.spoken.none': 'inga data',

  /* ---- jednostki ---- */

  'unit.percent': '%',
  'unit.kelvin': 'K',
  'unit.times': '×',
  'unit.points': 'p',
  'unit.hertz': 'Hz',
  'unit.second': 's',
  'unit.minute': 'min',
  'unit.hour': 'h',

  /* ---- zdania oceniające ---- */

  'verdict.good': 'Det här ljuset är bra — ingenting överskrider de gränser du har ställt in.',
  'verdict.noValue': 'Den här storheten går inte att mäta just nu. Kontrollera att ingenting täcker objektivet.',
  'verdict.warmup': 'Tar fram omdömet — håll telefonen stilla en liten stund till.',

  'verdict.warning.share': 'En hel del av det här ljuset faller på den blå kanalen. På kvällen är det värt att dämpa det.',
  'verdict.warning.brightness': 'Scenen är ljus — kameran arbetar nära den övre gränsen för sitt mätområde.',
  'verdict.warning.kelvin': 'Ljuset är ganska kallt. På kvällen är en lampa runt 2700 K mildare.',
  'verdict.warning.melanopic': 'Det här ljuset verkar ganska starkt på den biologiska klockan.',
  'verdict.warning.flicker': 'Ljuskällan pulserar tydligt.',
  'verdict.warning.uniformity': 'Ljuset fördelar sig ojämnt över bilden.',
  'verdict.warning.comfort': 'Synkomforten är sänkt — flera saker samverkar till det.',

  'verdict.critical.share': 'Väldigt mycket blått. Slå på nattläget på kvällen eller byt ljuskälla.',
  'verdict.critical.brightness': 'Scenen är mycket ljus. Mät inte genom att rikta kameran rakt mot ljuskällan.',
  'verdict.critical.kelvin': 'Ljuset är kallt. På kvällen är det mest tröttande för ögonen — en varmare lampa eller nattläget hjälper.',
  'verdict.critical.melanopic': 'Det här ljuset verkar starkt på den biologiska klockan. På kvällen är det värt att gå under 0,50.',
  'verdict.critical.flicker': 'Ljuskällan pulserar kraftigt. Det är en känd orsak till trötta ögon och huvudvärk.',
  'verdict.critical.uniformity': 'Ljuset fördelar sig mycket ojämnt. Kontrollera lampans placering eller reflexer på skärmen.',
  'verdict.critical.comfort': 'Synkomforten är låg. Titta på hur omdömet är sammansatt för att se vad som sänker det.',

  /* ---- granice metody ---- */

  'note.limitsTitle': 'Vad den här siffran inte säger',
  'note.warningTitle': 'Varning',
  'note.dashTitle': 'Vad den här mätningen inte är',
  'note.dashText': 'En telefonkamera har tre breda färgkanaler och en automatisk vitbalans — den mäter inget spektrum. Färgtemperatur och dygnsrytmpåverkan är uppskattningar beräknade ur sRGB-färger. Appen visar skillnader och förändringar över tid väl; den ersätter inte en mätare och ställer ingen diagnos.',
  'note.approxLegend': '≈ ungefärligt värde — beräknat ur sRGB-färger, inte ur en spektralmätning.',
  'note.kelvinOutOfRange': 'Utanför metodens område — vid den här färgen slutar formeln för färgtemperatur att vara tillförlitlig.',
  /* {rate} i {limit} podaje wywołanie, bo to liczby z silnika, a ich zapis
     jest różny w różnych językach: 2,5 po szwedzku, tak jak po polsku. */
  'note.flickerOutOfRange': 'Utanför metodens område — sampling med {rate} Hz ser bara pulsering under {limit} Hz. Nätets 100 Hz ligger utom räckhåll och appen kommer aldrig att redovisa det som ett mätvärde.',
  'note.helpTitle': 'Vad den här siffran inte säger',
  'note.helpText': 'En telefonkamera har tre breda kanaler och mäter inget spektrum. Det här värdet är en jämförande indikator — det visar skillnader mellan ljuskällor och förändringar över tid väl, och är varken en laboratoriemätning eller medicinsk information.',
  'note.calibration': 'Mätning utan kalibrering — behandla värdena som jämförande.',

  'note.howToTitle': 'Så här mäter du vettigt',
  'note.howTo.hold.title': 'Håll telefonen stilla',
  'note.howTo.hold.text': 'Den automatiska exponeringen behöver 2–3 sekunder för att stabilisera sig.',
  'note.howTo.aim.title': 'Rikta mot en belyst yta',
  'note.howTo.aim.text': 'Ett vitt papper eller en ljus vägg. Mät inte genom att titta rakt in i ljuskällan.',
  'note.howTo.compare.title': 'Jämför, döm inte i absoluta tal',
  'note.howTo.compare.text': 'Samma scen före och efter en förändring av belysningen säger mer än en enda siffra.',

  /* ---- zastrzeżenie medyczne ----
     legal.mdr jest jednym zdaniem i ma nim zostać: to jest sformułowanie, przy
     którym rozporządzenie (UE) 2017/745 uznaje przeznaczenie medyczne za
     wykluczone. Skracanie go w tłumaczeniu nie jest kwestią stylu. */

  'legal.noDiagnosis': 'Inget mätvärde är en diagnos eller ett hälsoråd.',
  'legal.mdr': '{app} är inte en medicinteknisk produkt i den mening som avses i förordning (EU) 2017/745, är inte avsedd att diagnostisera, förebygga, övervaka eller behandla något medicinskt tillstånd och ersätter inte en undersökning hos läkare eller optiker.',

  /* ---- prywatność ---- */

  'privacy.title': 'Vad som lämnar den här enheten',
  'privacy.short': 'Ingenting i den här appen skickar något till nätet. Alla siffror uppstår på den här enheten och stannar här.',
  'privacy.onDevice': 'Kameran startar först när du har tryckt på knappen, och bilden lämnar aldrig den här enheten.',
  'privacy.external': 'Det här är det enda stället i hela appen där något lämnar den här enheten: knappen öppnar en extern sida i en ny flik, och det sker först när du har tryckt på den. Mätning, historik och inställningar stannar här.',
  'privacy.externalPending': 'När adressen finns på plats öppnar knappen en extern sida i en ny flik. Det blir det enda tillfället då något lämnar den här enheten. Mätning, historik och inställningar stannar här.',
  'privacy.storageBlocked': 'Den här webbläsaren låter ingenting sparas (privat läge eller blockerade webbplatsdata). Mätningen fungerar, men historiken försvinner när du stänger fliken.',

  /* ---- liczebniki ----
     Szwedzki ma dwie kategorie CLDR: one (dokładnie 1) i other — ta druga
     obejmuje też 0 i ułamki („1,5 mätvärden”). Formę wybiera
     Intl.PluralRules('sv'), nie nasza reguła. */

  'count.readings': { one: '{n} mätvärde', other: '{n} mätvärden' },
  'count.sessions': { one: '{n} mätning', other: '{n} mätningar' },
  'count.seconds': { one: '{n} sekund', other: '{n} sekunder' },
  'count.minutes': { one: '{n} minut', other: '{n} minuter' },
  'count.hours': { one: '{n} timme', other: '{n} timmar' },
  'count.days': { one: '{n} dag', other: '{n} dagar' }
});
