/* docs/shared/i18n/ro.js — słownik WSPÓLNY, rumuński.
 *
 * KTO ŁADUJE: docs/shared/i18n.js, gdy aktywnym językiem jest rumuński.
 *
 * SKĄD TE ZDANIA: przekład z polskiej redakcji pierwotnej (pl.js), z angielskim
 * (en.js) jako wzorcem terminologii i rejestru. Siedem wielkości nazwano
 * przyjętymi terminami rumuńskimi: „temperatura de culoare”, „pâlpâire”,
 * „raport melanopic” — nie kalkami z angielskiego. Ton rzeczowy, bez
 * marketingu; zastrzeżenie medyczne i zdania o prywatności przełożone wiernie,
 * bez skracania i bez osłabiania. Liczby w zdaniach zapisane po rumuńsku,
 * z przecinkiem dziesiętnym (1,00 i 0,50).
 *
 * ZESTAW KLUCZY jest dokładnie taki sam jak w en.js — i tak ma zostać
 * w każdym z trzydziestu języków (patrz docs/shared/README.md, rozdział
 * „Warstwa językowa”). Klucza, którego nie ma w angielskim, nie wolno tu
 * dopisać: angielski jest wartością zapasową, więc to on wyznacza zestaw.
 */
window.I18nData = window.I18nData || {};
window.I18nData['ro'] = Object.assign(window.I18nData['ro'] || {}, {

  /* Nazwa własna — wchodzi jako wstawka w zdanie o rozporządzeniu
     (UE) 2017/745, gdzie stoi na początku zdania, w mianowniku. */
  'app.name': 'Monitor de Lumină',

  /* ---- wybór języka ---- */

  'language.label': 'Limbă',
  'language.help': 'Limba întregii aplicații. Toate limbile sunt deja pe acest dispozitiv — nu se descarcă nimic și nu se trimite nimic nicăieri.',
  'language.auto': 'Limba dispozitivului',
  'language.autoHint': 'Urmează limba setată în telefon sau în browser.',

  /* ---- siedem wielkości: Metrics.CATALOGUE ---- */

  'metric.share.name': 'Ponderea albastrului',
  'metric.share.unit': '%',
  'metric.share.unitSpoken': 'la sută',
  'metric.share.short': 'Cât din lumina din cadru revine canalului albastru.',
  'metric.share.help': 'Separă culoarea de luminozitate — aceasta este valoarea care se schimbă când pornești modul de noapte.',

  'metric.brightness.name': 'Luminozitatea scenei',
  'metric.brightness.unit': '%',
  'metric.brightness.unitSpoken': 'la sută',
  'metric.brightness.short': 'Luminozitatea medie a imaginii de la cameră.',
  'metric.brightness.help': 'O valoare relativă, nu lucși — expunerea automată a camerei o deplasează pe dedesubt.',

  'metric.kelvin.name': 'Temperatura de culoare',
  'metric.kelvin.unit': 'K',
  'metric.kelvin.unitSpoken': 'kelvini',
  'metric.kelvin.short': 'Dacă lumina este caldă sau rece.',
  'metric.kelvin.help': 'Sub 3000 K lumina este caldă și mai blândă seara. 6500 K este albul implicit al majorității ecranelor.',

  'metric.melanopic.name': 'Impact circadian',
  'metric.melanopic.unit': '×',
  'metric.melanopic.unitSpoken': 'ori',
  'metric.melanopic.short': 'Cât de puternic acționează această lumină asupra ceasului biologic.',
  'metric.melanopic.help': 'O aproximare a raportului melanopic. 1,00 este albul neutru de zi; seara merită să cobori sub 0,50.',

  'metric.flicker.name': 'Pâlpâire',
  'metric.flicker.unit': '%',
  'metric.flicker.unitSpoken': 'la sută',
  'metric.flicker.short': 'Pulsația invizibilă a sursei de lumină.',
  'metric.flicker.help': 'Variatoarele și retroiluminările ieftine pulsează. Ochiul nu o vede, dar este o cauză cunoscută a oboselii și a durerilor de cap.',

  'metric.uniformity.name': 'Uniformitate',
  'metric.uniformity.unit': '%',
  'metric.uniformity.unitSpoken': 'la sută',
  'metric.uniformity.short': 'Dacă lumina este distribuită uniform în cadru.',
  'metric.uniformity.help': 'O valoare mică pe un ecran înseamnă scurgeri de retroiluminare sau o reflexie; pe birou, o lampă prost așezată.',

  'metric.comfort.name': 'Confort vizual',
  'metric.comfort.unit': 'pct',
  'metric.comfort.unitSpoken': 'puncte',
  'metric.comfort.short': 'O singură evaluare în loc de șase numere.',
  'metric.comfort.help': 'Adună celelalte măsurători într-un scor de 0–100 și arată ce îl scade cel mai mult. Ponderile sunt aprecierea noastră redacțională, nu un standard.',

  /* Etykiety składników oceny komfortu — Metrics.comfortIndex zwraca je jako
     `penalties[].id`, więc nazwa klucza idzie za tym identyfikatorem. */
  'comfort.penalty.melanopic': 'Impact circadian',
  'comfort.penalty.kelvin': 'Culoare rece a luminii',
  'comfort.penalty.flicker': 'Pâlpâire',
  'comfort.penalty.uniformity': 'Iluminare neuniformă',

  /* ---- kamera: napisy silnika pomiaru (docs/shared/engine.js) ----
     Zasłona podglądu i komunikaty o nieudanym starcie kamery. Silnik sięga po
     nie przez window.I18n dopiero w chwili wyświetlenia, a bez warstwy
     językowej pokazuje wpisany u siebie zapas ANGIELSKI. */

  'engine.idle': 'Apasă „Start” pentru a porni camera.',
  'engine.starting': 'Pornesc camera…',

  'engine.error.permission': 'Nu există permisiunea de a folosi camera. Permite camera în setările browserului și apasă din nou „Start”.',
  'engine.error.notFound': 'Nu s-a găsit nicio cameră. Verifică dacă dispozitivul are o cameră și dacă nu este dezactivată în sistem.',
  'engine.error.busy': 'Camera este ocupată de altă aplicație. Închide-o și încearcă din nou.',
  'engine.error.unknown': 'Camera nu a putut fi pornită.',
  'engine.error.unsupported': 'Acest browser nu dă acestei pagini acces la cameră. Deschide aplicația prin HTTPS sau folosește alt browser.',

  /* ---- strefy: jeden język barw dla całej aplikacji ---- */

  'zone.good': 'În limite',
  'zone.warning': 'Atenție',
  'zone.critical': 'Critic',
  'zone.none': 'Fără date',
  'zone.settling': 'Se stabilizează',

  /* Wersja mówiona — czytnik ekranu wpina ją w środek zdania, więc małą literą
     i bez kropki. To nie jest to samo, co napis na plakietce. */
  'zone.spoken.good': 'în limite',
  'zone.spoken.warning': 'atenție',
  'zone.spoken.critical': 'critic',
  'zone.spoken.none': 'fără date',

  /* ---- jednostki ---- */

  'unit.percent': '%',
  'unit.kelvin': 'K',
  'unit.times': '×',
  'unit.points': 'pct',
  'unit.hertz': 'Hz',
  'unit.second': 's',
  'unit.minute': 'min',
  'unit.hour': 'h',

  /* ---- zdania oceniające ---- */

  'verdict.good': 'Această lumină este în regulă — nimic nu depășește pragurile setate.',
  'verdict.noValue': 'Această mărime nu poate fi măsurată acum. Verifică dacă obiectivul nu este acoperit.',
  'verdict.warmup': 'Stabilesc evaluarea — ține telefonul nemișcat încă puțin.',

  'verdict.warning.share': 'O bună parte din această lumină revine canalului albastru. Seara merită să o reduci.',
  'verdict.warning.brightness': 'Scena este luminoasă — camera lucrează aproape de limita de sus a măsurării.',
  'verdict.warning.kelvin': 'Lumina este destul de rece. Seara, un bec de aproximativ 2700 K este mai blând.',
  'verdict.warning.melanopic': 'Această lumină acționează destul de puternic asupra ceasului biologic.',
  'verdict.warning.flicker': 'Sursa de lumină pulsează vizibil.',
  'verdict.warning.uniformity': 'Lumina este distribuită neuniform în cadru.',
  'verdict.warning.comfort': 'Confortul vizual este redus — se adună mai multe lucruri deodată.',

  'verdict.critical.share': 'Foarte mult albastru. Seara pornește modul de noapte sau schimbă sursa de lumină.',
  'verdict.critical.brightness': 'Scena este foarte luminoasă. Nu măsura privind direct spre sursa de lumină.',
  'verdict.critical.kelvin': 'Lumina este rece. Seara aceasta obosește cel mai tare ochii — un bec mai cald sau modul de noapte vor ajuta.',
  'verdict.critical.melanopic': 'Această lumină acționează puternic asupra ceasului biologic. Seara merită să cobori sub 0,50.',
  'verdict.critical.flicker': 'Sursa de lumină pulsează puternic. Aceasta este o cauză cunoscută a oboselii ochilor și a durerilor de cap.',
  'verdict.critical.uniformity': 'Lumina este distribuită foarte neuniform. Verifică poziția lămpii sau reflexiile de pe ecran.',
  /* v3 i v4 kierują tu do „modułu 01”. Numer modułu to układ konkretnej wersji,
     więc w warstwie wspólnej stoi zdanie bez numeru — wersja nadpisze ten jeden
     klucz u siebie, jeśli chce odesłać do swojego ekranu. */
  'verdict.critical.comfort': 'Confortul vizual este scăzut. Uită-te la desfășurarea evaluării ca să vezi ce îl scade.',

  /* ---- granice metody ---- */

  'note.limitsTitle': 'Ce nu îți spune acest număr',
  'note.warningTitle': 'Atenție',
  'note.dashTitle': 'Ce nu este această măsurătoare',
  'note.dashText': 'Camera unui telefon are trei canale de culoare largi și un balans de alb automat — nu măsoară un spectru. Temperatura de culoare și impactul circadian sunt aproximări calculate din culorile sRGB. Aplicația arată bine diferențele și schimbările în timp; nu înlocuiește un aparat de măsură și nu pune niciun diagnostic.',
  'note.approxLegend': '≈ valoare aproximativă — calculată din culorile sRGB, nu dintr-o măsurătoare spectrală.',
  'note.kelvinOutOfRange': 'În afara domeniului metodei — la această culoare formula temperaturii de culoare încetează să fie de încredere.',
  /* {rate} i {limit} podaje wywołanie, bo to liczby z silnika (5 Hz, 2,5 Hz),
     a ich zapis jest różny w różnych językach: 2.5 po angielsku, 2,5 po rumuńsku.
     Zapisu liczby nie wolno wpisywać do zdania na sztywno. */
  'note.flickerOutOfRange': 'În afara domeniului metodei — eșantionarea la {rate} Hz vede pulsația doar sub {limit} Hz. Pâlpâirea rețelei de 100 Hz este în afara razei de acțiune și aplicația nu o va raporta niciodată ca rezultat.',
  'note.helpTitle': 'Ce nu îți spune acest număr',
  'note.helpText': 'Camera unui telefon are trei canale largi și nu măsoară un spectru. Această valoare este un indicator comparativ — arată bine diferențele dintre lumini și schimbările în timp și nu este nici o măsurătoare de laborator, nici o informație medicală.',
  'note.calibration': 'Măsurătoare fără calibrare — tratează valorile comparativ.',

  'note.howToTitle': 'Cum să măsori cu sens',
  'note.howTo.hold.title': 'Ține telefonul nemișcat',
  'note.howTo.hold.text': 'Expunerea automată are nevoie de 2–3 secunde ca să se stabilizeze.',
  'note.howTo.aim.title': 'Îndreaptă-l spre o suprafață luminată',
  'note.howTo.aim.text': 'O coală albă de hârtie sau un perete deschis la culoare. Nu măsura privind direct în sursa de lumină.',
  'note.howTo.compare.title': 'Compară, nu judeca în absolut',
  'note.howTo.compare.text': 'Aceeași scenă înainte și după schimbarea iluminatului spune mai mult decât un singur număr.',

  /* ---- zastrzeżenie medyczne ----
     legal.mdr jest jednym zdaniem i ma nim zostać: to jest sformułowanie, przy
     którym rozporządzenie (UE) 2017/745 uznaje przeznaczenie medyczne za
     wykluczone. Terminy urzędowe rumuńskiej wersji rozporządzenia:
     „dispozitiv medical”, „Regulamentul (UE) 2017/745”. */

  'legal.noDiagnosis': 'Niciun rezultat nu este un diagnostic sau un sfat medical.',
  'legal.mdr': '{app} nu este un dispozitiv medical în sensul Regulamentului (UE) 2017/745, nu este destinat diagnosticării, prevenirii, monitorizării sau tratării vreunei afecțiuni și nu înlocuiește examinarea de către un medic sau un optometrist.',

  /* ---- prywatność ---- */

  'privacy.title': 'Ce părăsește acest dispozitiv',
  'privacy.short': 'Nimic din această aplicație nu trimite nimic în rețea. Toate numerele apar pe acest dispozitiv și rămân aici.',
  'privacy.onDevice': 'Camera pornește abia după ce apeși butonul, iar imaginea nu părăsește niciodată acest dispozitiv.',
  'privacy.external': 'Acesta este singurul loc din toată aplicația în care ceva părăsește acest dispozitiv: butonul deschide o pagină externă într-o filă nouă și asta se întâmplă abia după ce îl apeși. Măsurătorile, istoricul și setările rămân aici.',
  'privacy.externalPending': 'Când adresa va fi disponibilă, butonul va deschide o pagină externă într-o filă nouă. Acela va fi singurul moment în care ceva părăsește acest dispozitiv. Măsurătorile, istoricul și setările rămân aici.',
  'privacy.storageBlocked': 'Acest browser nu permite salvarea a nimic (mod privat sau date de site blocate). Măsurarea funcționează, dar istoricul va dispărea la închiderea filei.',

  /* ---- liczebniki ----
     Rumuński ma trzy kategorie CLDR: one (1), few (0, 2–19 oraz liczby, których
     dwie ostatnie cyfry mieszczą się w 01–19) i other — reszta, czyli liczby
     wymagające przyimka „de”: „20 de citiri”. Formę wybiera
     Intl.PluralRules('ro'), nie nasza reguła. */

  'count.readings': { one: '{n} citire', few: '{n} citiri', other: '{n} de citiri' },
  'count.sessions': { one: '{n} măsurătoare', few: '{n} măsurători', other: '{n} de măsurători' },
  'count.seconds': { one: '{n} secundă', few: '{n} secunde', other: '{n} de secunde' },
  'count.minutes': { one: '{n} minut', few: '{n} minute', other: '{n} de minute' },
  'count.hours': { one: '{n} oră', few: '{n} ore', other: '{n} de ore' },
  'count.days': { one: '{n} zi', few: '{n} zile', other: '{n} de zile' }
});
