/* Równomierność oświetlenia — stosunek najciemniejszej komórki kadru do najjaśniejszej.
 *
 * Źródło wzoru: docs/v5/js/metrics.js (wcześniejsza, identyczna redakcja:
 * docs/v4/metrics.js). Wejściem są luminancje komórek siatki (w v5 3×3),
 * policzone przez frame.sampleGrid / color.relativeLuminance.
 * Wielkość jest ilorazem, więc nie zależy od ekspozycji ani od jednostki —
 * ale też nic nie mówi o bezwzględnym poziomie światła i nie jest pomiarem
 * fotometrycznym ani wynikiem medycznym.
 */

/* Równomierność w procentach: 100 % to kadr idealnie równy, 0 % to komórka
 * całkowicie czarna obok jasnej.
 *
 *     uniformity = min / max * 100
 *
 * Uwaga: to wielkość, w której WIĘCEJ znaczy lepiej — strefy liczy się dla niej
 * z odwróceniem (zones.zoneFor z invert = true).
 *
 * Co to naprawdę wykrywa: na ekranie niska wartość oznacza przeświecanie
 * podświetlenia albo odblask z okna; na biurku — lampę ustawioną z jednej
 * strony. Czego NIE wykrywa: kadr celowo niejednorodny (połowa ekranu, połowa
 * ściany) da niską wartość, choć oświetlenie jest w porządku — miara opisuje
 * kadr, nie pomieszczenie.
 *
 * Zwraca null, gdy nie ma czego porównywać: mniej niż dwie komórki, dane
 * niebędące liczbami albo kadr całkowicie czarny (max ≈ 0 — iloraz min/max jest
 * wtedy nieoznaczony, a „0 %” byłoby fałszywym alarmem o nierównomierności
 * tam, gdzie po prostu nie ma światła). */
export function uniformity(cellLuminances) {
  if (!cellLuminances || typeof cellLuminances.length !== 'number') return null;
  if (cellLuminances.length < 2) return null;

  let min = Infinity, max = -Infinity;
  for (let i = 0; i < cellLuminances.length; i += 1) {
    const v = cellLuminances[i];
    // Luminancja ujemna albo nieliczba znaczy, że wywołujący nie ma pomiaru
    // z tej komórki; pominięcie jej po cichu zawyżyłoby równomierność.
    if (typeof v !== 'number' || !isFinite(v) || v < 0) return null;
    if (v < min) min = v;
    if (v > max) max = v;
  }

  if (max <= 1e-9) return null;
  return (min / max) * 100;
}
