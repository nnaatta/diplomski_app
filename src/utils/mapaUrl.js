/**
 * Pravi URL za Google Maps embed (iframe) za jednu lokaciju.
 *
 * 1) Ako lokacija ima koordinate (backend ih sam izvuče iz zalijepljenog
 *    Google Maps linka), mapa pokazuje tačno tu tačku.
 * 2) Ako koordinata nema, mapa se traži prema adresi.
 *
 * Ne treba API ključ.
 */
export function mapaEmbedUrl(lokacija) {
  if (!lokacija) return null;

  const lat = parseFloat(lokacija.lat);
  const lng = parseFloat(lokacija.lng);
  if (Number.isFinite(lat) && Number.isFinite(lng)) {
    return `https://www.google.com/maps?q=${lat},${lng}&z=17&output=embed`;
  }

  const adresa = lokacija.adresa?.trim();
  if (!adresa) return null;

  // Ako adresa ne sadrži "Han Pijesak", dodaje se da pretraga ostane u opštini
  const upit = /pijesak/i.test(adresa) ? adresa : `${adresa}, Han Pijesak`;
  return `https://www.google.com/maps?q=${encodeURIComponent(upit)}&z=16&output=embed`;
}