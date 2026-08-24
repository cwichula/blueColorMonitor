/* Udział niebieskiego — pierwotna i najstarsza wielkość tej aplikacji.
 *
 * Źródło wzoru: docs/v1/app.js (definicja pierwotna), powtórzona bez zmian
 * w docs/v4/metrics.js i docs/v5/js/metrics.js.
 * Wielkość izoluje barwę od jasności: to ona rusza się, gdy włączysz tryb
 * nocny, a jasność zostaje. Ograniczenie: to proporcja trzech szerokich
 * kanałów kamery z nieznanym balansem bieli, a nie pomiar widma ani
 * fotometrii — nie wolno jej czytać jako „ile niebieskiego światła w luksach”.
 */

/* Udział kanału niebieskiego w sumie energii kanałów, w procentach.
 *
 * CELOWO liczony na wartościach Z GAMMĄ (0..255 prosto z kamery), a nie na
 * liniowych. To nie jest przeoczenie: dokładnie tę liczbę raportowała wersja
 * v1 i pod nią użytkownicy wyregulowali swoje progi (26 % / 33 % odpowiadają
 * bieli 4000 K i D65). Przejście na wartości liniowe zmieniłoby wynik o kilka
 * punktów i po cichu unieważniło każdy zapisany próg — dlatego definicja
 * zostaje, a jej „niefizyczność” jest opisana, nie naprawiona.
 *
 * Różnica redakcyjna między wersjami dotyczy wyłącznie mianownika przy zerze:
 * v1 pisało (r+g+b+1e-6), v5 sprawdza sum <= 0 warunkiem. Dla jakiegokolwiek
 * realnego kadru obie dają tę samą liczbę; przeniesiona jest wersja z v5.
 *
 * Zwraca null, a nie 0, gdy kadr jest całkowicie czarny albo dane są
 * bezsensowne: przy sumie zero udziału po prostu nie ma z czego policzyć,
 * a „0 %” byłoby wartością zastępczą, którą strefy pomalowałyby na zielono
 * jako światło idealne.
 */
export function blueShare(r, g, b) {
  if (!isChannel(r) || !isChannel(g) || !isChannel(b)) return null;
  const sum = r + g + b;
  if (sum <= 0) return null;
  return (b / sum) * 100;
}

/* Kanał musi być liczbą z zakresu bajtu 0..255 — tyle i tylko tyle oddaje
 * kamera. Cokolwiek innego znaczy, że wywołujący nie ma pomiaru, a nie że
 * pomiar wyszedł zero.
 * Górna granica nie jest ozdobą: bez niej suma trzech ogromnych liczb
 * przepełnia się do nieskończoności, a wtedy iloraz b/suma daje 0 %, czyli
 * wartość zastępczą, którą strefy pomalowałyby na zielono jako światło idealne
 * — dokładnie ten fałszywy spokój, przed którym broni się reszta pliku. */
function isChannel(v) {
  // Porównania odrzucają NaN i obie nieskończoności same z siebie, więc jeden
  // warunek zamyka wszystkie „to nie jest pomiar” naraz.
  return typeof v === 'number' && v >= 0 && v <= 255;
}
