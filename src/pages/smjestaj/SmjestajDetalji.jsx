import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './SmjestajDetalji.css';
import { FaLocationDot, FaPhone, FaWifi, FaSquareParking, FaTv, FaSnowflake, FaStar, FaArrowLeft, FaUmbrella, FaChevronLeft, FaChevronRight, FaXmark } from 'react-icons/fa6';
import marijaGlavna from "../../assets/Smjestaj/Marija.jpg";
import marija1 from "../../assets/Smjestaj/marija1.jpg";
import marija2 from "../../assets/Smjestaj/marija2.jpg";
import marija3 from "../../assets/Smjestaj/marija3.jpg";
import marija4 from "../../assets/Smjestaj/marija4.jpg";

const smjestaji = [
  {
    id: 1,
    naziv: 'Romanija — Brvnara za odmor',
    kategorija: 'Kuća za odmor',
    zvjezdice: 2,
    lokacija: 'Mrkalji, 5,6 km od centra',
    koordinate: { lat: 44.0700, lng: 18.9600 },
    slike: [],
    opis: 'Objekat nudi smještaj u selu Mrkalji, na 5,6 km od centra opštine Han Pijesak. Ova vikendica nudi besplatan privatni parking, dvorište i terasu sa pogledom na dvorište. Smještaj posjeduje opremljenu kuhinju, dnevni boravak, kupatilo.',
    dodatniOpis: 'Za sve ljubitelje prirode i mira ovo je idealno mjesto za odmor u netaknutoj prirodi u našoj vazdušnoj banji.',
    sobe: 2, lezajevi: 3,
    sadrzaji: ['wifi', 'parking', 'tv', 'klima', 'terasa'],
    kontakt: '+387 66 706-684',
  },
  {
    id: 2,
    naziv: 'Vila Marija HP',
    kategorija: 'Kuća za odmor',
    zvjezdice: 3,
    lokacija: '1,6 km od centra',
    koordinate: { lat: 44.0820, lng: 18.9510 },
    slike: [marijaGlavna,marija1, marija2, marija3, marija4],
    opis: 'Objekat se nalazi u opštini Han Pijesak, udaljena je 1,6 km od centra. Ovaj smještajni objekat nudi balkon, besplatan privatni parking, besplatan Wi-Fi, televizor. Ova vila sa terasom i pogledom na dvorište nudi dnevni boravak, opremljenu kuhinju sa rernom i mini-barom, kao i 1 kupatilo sa tušem.',
    dodatniOpis: 'Gosti objekta Vila Marija HP mogu da koriste saunu i spa centar. Nakon dana provedenog u pješačenju, skijanju ili biciklizmu, gosti mogu da se opuste u dvorištu ili zajedničkom salonu.',
    sobe: 2, lezajevi: 5,
    sadrzaji: ['wifi', 'parking', 'tv', 'balkon', 'sauna'],
    kontakt: '+387 65 000-146',
  },
  {
    id: 3,
    naziv: 'Braća Kosorić',
    kategorija: 'Kuća za odmor',
    zvjezdice: 2,
    lokacija: 'Kosovača, 3,2 km od centra',
    koordinate: { lat: 44.0780, lng: 18.9450 },
    slike: [],
    opis: 'Kuća se nalazi na skrovitom mjestu, zaseok Kosovača, na 3,2 km od centra opštine Han Pijesak, okružena šumom. Ovaj smještajni objekat nudi balkon, besplatan privatni parking i besplatan Wi-Fi. Ova vikendica sa terasom i pogledom na planinu ima dnevni boravak, televizor, opremljenu kuhinju sa frižiderom i rernom, kao i kupatilo. Objekat posjeduje i bike friendly sertifikat.',
    dodatniOpis: 'U ovom prelijepom ambijentu možete pronaći pravu oazu mira, uz magičan pogled na netaknutu i bajkovitu prirodu.',
    sobe: 2, lezajevi: 4,
    sadrzaji: ['wifi', 'parking', 'tv', 'balkon', 'bikeFriendly'],
    kontakt: '+387 65 290-644',
  },
  {
    id: 4,
    naziv: 'Tamara — Brvnara za odmor',
    kategorija: 'Kuća za odmor',
    zvjezdice: 2,
    lokacija: '0,9 km od centra',
    koordinate: { lat: 44.0815, lng: 18.9495 },
    slike: [],
    opis: 'Objekat se nalazi u opštini Han Pijesak, udaljen je 0,9 km od centra. Ovaj smještaj nudi besplatan Wi-Fi internet, televizor, klima-uređaj, dvorište i besplatan privatni parking. Smještaj posjeduje kuhinju, kupatilo, dnevni boravak i terasu sa pogledom na dvorište.',
    dodatniOpis: 'U mirnom okruženju ljubitelji prirode pronaći će najbolje uslove za odmor na čistom vazduhu.',
    sobe: 1, lezajevi: 3,
    sadrzaji: ['wifi', 'parking', 'tv', 'klima', 'terasa'],
    kontakt: '+387 66 706-684',
  },
];

const sadrzajiMapa = {
  wifi:         { ikona: <FaWifi />,          naziv: 'Besplatan Wi-Fi' },
  parking:      { ikona: <FaSquareParking />,  naziv: 'Privatni parking' },
  tv:           { ikona: <FaTv />,             naziv: 'Televizor' },
  klima:        { ikona: <FaSnowflake />,      naziv: 'Klima-uređaj' },
  balkon:       { ikona: <FaUmbrella />,       naziv: 'Balkon/Terasa' },
  terasa:       { ikona: <FaUmbrella />,       naziv: 'Terasa' },
  sauna:        { ikona: <FaStar />,           naziv: 'Sauna i spa' },
  bikeFriendly: { ikona: <FaStar />,           naziv: 'Bike Friendly' },
};

function Zvjezdice({ broj }) {
  return (
    <div className="detalji__zvjezdice">
      {Array.from({ length: 3 }, (_, i) => (
        <span key={i} className={i < broj ? 'zvjezdica--aktivna' : 'zvjezdica--neaktivna'}>★</span>
      ))}
    </div>
  );
}

// ===== LIGHTBOX KOMPONENTA =====
function Lightbox({ slike, aktivan, onZatvori, onPrethodni, onSljedeci }) {
  if (aktivan === null) return null;

  return (
    <div className="lightbox" onClick={onZatvori}>
      {/* Zatvori dugme */}
      <button className="lightbox__zatvori" onClick={onZatvori} aria-label="Zatvori">
        <FaXmark />
      </button>

      {/* Broj slika */}
      <span className="lightbox__brojac">{aktivan + 1} / {slike.length}</span>

      {/* Strelica lijevo */}
      <button
        className="lightbox__strelica lightbox__strelica--lijevo"
        onClick={(e) => { e.stopPropagation(); onPrethodni(); }}
        aria-label="Prethodna"
      >
        <FaChevronLeft />
      </button>

      {/* Slika */}
      <div className="lightbox__slika-wrap" onClick={(e) => e.stopPropagation()}>
        <img src={slike[aktivan]} alt={`Slika ${aktivan + 1}`} className="lightbox__slika" />
      </div>

      {/* Strelica desno */}
      <button
        className="lightbox__strelica lightbox__strelica--desno"
        onClick={(e) => { e.stopPropagation(); onSljedeci(); }}
        aria-label="Sljedeća"
      >
        <FaChevronRight />
      </button>

      {/* Thumbnail traka */}
      <div className="lightbox__thumbnails" onClick={(e) => e.stopPropagation()}>
        {slike.map((s, i) => (
          <img
            key={i}
            src={s}
            alt={`Thumbnail ${i + 1}`}
            className={`lightbox__thumbnail${i === aktivan ? ' lightbox__thumbnail--aktivan' : ''}`}
            onClick={() => onPrethodni(i)}
          />
        ))}
      </div>
    </div>
  );
}

// ===== GALERIJA KOMPONENTA =====
function Galerija({ slike, onKlik }) {
  if (!slike.length) {
    return <div className="galerija__placeholder" />;
  }

  return (
    <div className="galerija">
      {/* Glavna slika */}
      <div className="galerija__glavna" onClick={() => onKlik(0)}>
        <img src={slike[0]} alt="Glavna slika" className="galerija__slika" />
        <div className="galerija__overlay">
          <span>Pogledaj sve slike ({slike.length})</span>
        </div>
      </div>

      {/* Grid manjih slika */}
      {slike.length > 1 && (
        <div className="galerija__grid">
          {slike.slice(1, 5).map((s, i) => (
            <div key={i} className="galerija__mala" onClick={() => onKlik(i + 1)}>
              <img src={s} alt={`Slika ${i + 2}`} className="galerija__slika" />
              {/* Na zadnjoj slici prikaži "+N" ako ih ima više */}
              {i === 3 && slike.length > 5 && (
                <div className="galerija__vise">+{slike.length - 5}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SmjestajDetalji() {
  const { id } = useParams();
  const smjestaj = smjestaji.find((s) => s.id === Number(id));
  const [lightboxAktivan, setLightboxAktivan] = useState(null);

  const otвориLightbox = (i) => setLightboxAktivan(i);
  const zatvoriLightbox = () => setLightboxAktivan(null);
  const prethodnaSlika = (i) => {
    if (typeof i === 'number') { setLightboxAktivan(i); return; }
    setLightboxAktivan((prev) => (prev === 0 ? smjestaj.slike.length - 1 : prev - 1));
  };
  const sljedeцaSlika = () =>
    setLightboxAktivan((prev) => (prev === smjestaj.slike.length - 1 ? 0 : prev + 1));

  // Tipkovnica — strelice i Escape
  React.useEffect(() => {
    if (lightboxAktivan === null) return;
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft')  prethodnaSlika();
      if (e.key === 'ArrowRight') sljedeцaSlika();
      if (e.key === 'Escape')     zatvoriLightbox();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxAktivan]);

  if (!smjestaj) {
    return (
      <div className="detalji__nije-pronadjen">
        <h2>Objekat nije pronađen</h2>
        <Link to="/smjestaj" className="detalji__nazad">← Nazad na smještaj</Link>
      </div>
    );
  }

  return (
    <section className="detalji">

      {/* ===== HERO ===== */}
      <div className="detalji__hero">
        {smjestaj.slike.length > 0
          ? <img src={smjestaj.slike[0]} alt={smjestaj.naziv} className="detalji__hero-slika" />
          : <div className="detalji__hero-placeholder" />
        }
        <div className="detalji__hero-overlay" />
        <div className="detalji__hero-sadrzaj">
          <Link to="/smjestaj" className="detalji__nazad">
            <FaArrowLeft /> Nazad na smještaj
          </Link>
          <span className="detalji__tag">{smjestaj.kategorija}</span>
          <h1 className="detalji__naziv">{smjestaj.naziv}</h1>
          <Zvjezdice broj={smjestaj.zvjezdice} />
          <span className="detalji__lokacija">
            <FaLocationDot /> {smjestaj.lokacija}
          </span>
        </div>
      </div>

      {/* ===== GLAVNI GRID ===== */}
      <div className="detalji__grid">

        <div className="detalji__lijevo">

          {/* ===== GALERIJA ===== */}
          <div className="detalji__blok">
            <h2 className="detalji__blok-naslov">Fotografije</h2>
            <Galerija slike={smjestaj.slike} onKlik={otвориLightbox} />
          </div>

          {/* ===== OPIS ===== */}
          <div className="detalji__blok">
            <h2 className="detalji__blok-naslov">O objektu</h2>
            <p className="detalji__opis">{smjestaj.opis}</p>
            {smjestaj.dodatniOpis && (
              <p className="detalji__opis detalji__opis--kurziv">{smjestaj.dodatniOpis}</p>
            )}
          </div>

          {/* ===== KAPACITET ===== */}
          <div className="detalji__blok">
            <h2 className="detalji__blok-naslov">Kapacitet</h2>
            <div className="detalji__kapacitet">
              <div className="detalji__kapacitet-item">
                <span className="detalji__kapacitet-broj">{smjestaj.sobe}</span>
                <span className="detalji__kapacitet-label">Spavaće sobe</span>
              </div>
              <div className="detalji__kapacitet-item">
                <span className="detalji__kapacitet-broj">{smjestaj.lezajevi}</span>
                <span className="detalji__kapacitet-label">Ležajeva</span>
              </div>
            </div>
          </div>

          {/* ===== SADRŽAJI ===== */}
          <div className="detalji__blok">
            <h2 className="detalji__blok-naslov">Sadržaji</h2>
            <div className="detalji__sadrzaji">
              {smjestaj.sadrzaji.map((s) => {
                const info = sadrzajiMapa[s];
                if (!info) return null;
                return (
                  <div key={s} className="detalji__sadrzaj-item">
                    <span className="detalji__sadrzaj-ikona">{info.ikona}</span>
                    <span className="detalji__sadrzaj-naziv">{info.naziv}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ===== DESNA KOLONA ===== */}
        <div className="detalji__desno">
          <div className="detalji__kontakt-kartica">
            <h2 className="detalji__kontakt-naslov">Rezervacija i kontakt</h2>
            <p className="detalji__kontakt-tekst">
              Za rezervaciju ili dodatne informacije kontaktirajte vlasnika direktno:
            </p>
            <a href={`tel:${smjestaj.kontakt}`} className="detalji__kontakt-tel">
              <FaPhone /> {smjestaj.kontakt}
            </a>
            <div className="detalji__kontakt-divider" />
            <p className="detalji__kontakt-to">Ili se obratite Turističkoj organizaciji:</p>
            <a href="tel:+38766787850" className="detalji__kontakt-tel detalji__kontakt-tel--secondary">
              <FaPhone /> +387 66 787 850
            </a>
          </div>

          <div className="detalji__mapa-wrap">
            <h2 className="detalji__blok-naslov">Lokacija</h2>
            <div className="detalji__mapa">
              <iframe
                title={`Lokacija — ${smjestaj.naziv}`}
                src={`https://www.google.com/maps?q=${smjestaj.koordinate.lat},${smjestaj.koordinate.lng}&z=15&output=embed`}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

      </div>

      {/* ===== LIGHTBOX ===== */}
      <Lightbox
        slike={smjestaj.slike}
        aktivan={lightboxAktivan}
        onZatvori={zatvoriLightbox}
        onPrethodni={prethodnaSlika}
        onSljedeci={sljedeцaSlika}
      />

    </section>
  );
}

export default SmjestajDetalji;