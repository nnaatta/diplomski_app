import React, { useState, useEffect, useRef } from "react";
import "./Galerija.css";
import slika1 from "../../assets/vazdusnaBanja.jpg";
import heroSlika from "../../assets/ZdravstveniTurizam/pozadina.jpg";
import slika3 from "../../assets/ZdravstveniTurizam/slika2.jpg";
import slika4 from "../../assets/ZdravstveniTurizam/slika3.jpg";
import slika5 from "../../assets/ZdravstveniTurizam/slika5.jpg";
import slika6 from "../../assets/ZdravstveniTurizam/slika6.jpg";
import slika7 from "../../assets/ZdravstveniTurizam/slika7.jpg";
import slika8 from "../../assets/ZdravstveniTurizam/slika8.jpg";
import slika9 from "../../assets/ZdravstveniTurizam/slika9.jpg";
import slika10 from "../../assets/ZdravstveniTurizam/slika10.jpg";
import slika11 from "../../assets/ZdravstveniTurizam/slika11.jpg";
import slika12 from "../../assets/ZdravstveniTurizam/slika12.jpg";
import slika13 from "../../assets/oHP.jpg";

// ── Mock podaci ──────────────────────────────────────────────────────────────

const slike = [
  { id: 1,  url: slika1, opis: "Panorama Han Pijeska",          kategorija: "Priroda",    velika: true  },
  { id: 2,  url: slika10, opis: "Vodopad Skakavac",               kategorija: "Priroda",    velika: false },
  { id: 3,  url: slika11, opis: "Ski centar Javor zimi",          kategorija: "Zima",       velika: false },
  { id: 4,  url: slika12, opis: "Staze kroz borovu šumu",         kategorija: "Priroda",    velika: false },
  { id: 5,  url: slika13, opis: "Dvorac Karađorđevića",           kategorija: "Historija",  velika: true  },
  { id: 6,  url: slika3, opis: "Planinarenje na Romaniji",       kategorija: "Aktivnosti", velika: false },
  { id: 7,  url: slika4, opis: "Zimska panorama s Romanije",     kategorija: "Zima",       velika: false },
  { id: 8,  url: slika5, opis: "Kanjon rijeke Varošnice",        kategorija: "Priroda",    velika: false },
  { id: 9,  url: slika6, opis: "Sajam turizma — nastup TO",      kategorija: "Događaji",   velika: false },
  { id: 10, url: slika7, opis: "Biciklistička tura",             kategorija: "Aktivnosti", velika: false },
  { id: 11, url: slika8, opis: "Tradicionalna manifestacija",   kategorija: "Događaji",   velika: true  },
  { id: 12, url: slika9, opis: "Šumski put u jesen",             kategorija: "Priroda",    velika: false },
];

const kategorije = ["Sve", "Priroda", "Zima", "Historija", "Aktivnosti", "Događaji"];

// Gradijenti za placeholdere — različiti po ID-u
const gradijenti = [
  "linear-gradient(135deg, #a3b18a 0%, #588157 50%, #344e41 100%)",
  "linear-gradient(135deg, #7ecbd4 0%, #3a8fa3 50%, #1a5a6a 100%)",
  "linear-gradient(135deg, #c8d8e0 0%, #8ab0c0 50%, #344e5a 100%)",
  "linear-gradient(135deg, #c8b898 0%, #8a7050 50%, #4e3420 100%)",
  "linear-gradient(135deg, #b8c8a8 0%, #688050 50%, #344030 100%)",
  "linear-gradient(135deg, #d8c8a8 0%, #a89068 50%, #5a4828 100%)",
];

// ── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({ slika, onZatvori, onPrethodna, onSljedeca }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onZatvori();
      if (e.key === "ArrowLeft") onPrethodna();
      if (e.key === "ArrowRight") onSljedeca();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onZatvori, onPrethodna, onSljedeca]);

  if (!slika) return null;
  const grad = gradijenti[(slika.id - 1) % gradijenti.length];

  return (
    <div className="GAL_lightbox" onClick={onZatvori}>
      <button className="GAL_lightbox__zatvori" onClick={onZatvori} aria-label="Zatvori">✕</button>

      <button
        className="GAL_lightbox__nav GAL_lightbox__nav--lijevo"
        onClick={(e) => { e.stopPropagation(); onPrethodna(); }}
        aria-label="Prethodna"
      >‹</button>

      <div className="GAL_lightbox__sadrzaj" onClick={(e) => e.stopPropagation()}>
        <div className="GAL_lightbox__slika" style={{ background: grad }} />
        <div className="GAL_lightbox__info">
          <span className="GAL_lightbox__kat">{slika.kategorija}</span>
          <span className="GAL_lightbox__opis">{slika.opis}</span>
        </div>
      </div>

      <button
        className="GAL_lightbox__nav GAL_lightbox__nav--desno"
        onClick={(e) => { e.stopPropagation(); onSljedeca(); }}
        aria-label="Sljedeća"
      >›</button>
    </div>
  );
}

// ── Kartica galerije ─────────────────────────────────────────────────────────

function GalKartica({ slika, index, onClick }) {
  const ref = useRef(null);
  const grad = gradijenti[(slika.id - 1) % gradijenti.length];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("GAL_revealed");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`GAL_item GAL_reveal${slika.velika ? " GAL_item--velika" : ""}`}
      style={{ transitionDelay: `${(index % 6) * 0.07}s` }}
      onClick={() => onClick(slika)}
    >
      <div className="GAL_item__slika" style={{ background: grad }}>
        {slika.url && (
          <img src={slika.url} alt={slika.opis} className="GAL_item__slika-img" />
        )}
        <div className="GAL_item__hover">
          <span className="GAL_item__kat">{slika.kategorija}</span>
          <span className="GAL_item__opis">{slika.opis}</span>
          <span className="GAL_item__lupa">🔍</span>
        </div>
      </div>
    </div>
  );
}

// ── Glavna stranica ───────────────────────────────────────────────────────────

function Galerija() {
  const [aktivnaKat, setAktivnaKat] = useState("Sve");
  const [odabranaSlika, setOdabranaSlika] = useState(null);

  const filtrirane = aktivnaKat === "Sve"
    ? slike
    : slike.filter(s => s.kategorija === aktivnaKat);

  const indeksOdabrane = odabranaSlika
    ? filtrirane.findIndex(s => s.id === odabranaSlika.id)
    : -1;

  const otвориLightbox = (slika) => {
    setOdabranaSlika(slika);
    document.body.style.overflow = "hidden";
  };
  const zatvoriLightbox = () => {
    setOdabranaSlika(null);
    document.body.style.overflow = "";
  };
  const prethodna = () => {
    if (indeksOdabrane > 0)
      setOdabranaSlika(filtrirane[indeksOdabrane - 1]);
  };
  const sljedeca = () => {
    if (indeksOdabrane < filtrirane.length - 1)
      setOdabranaSlika(filtrirane[indeksOdabrane + 1]);
  };

  return (
    <section className="GAL_section">

      {/* ── HERO ── */}
      <div className="GAL_hero">
        <h1>Galerija</h1>
        <p>Han Pijesak u slikama — priroda, historija i život opštine</p>
      </div>

      {/* ── FILTERI ── */}
      <div className="GAL_kontrole">
        <div className="GAL_filteri">
          {kategorije.map(k => (
            <button
              key={k}
              onClick={() => setAktivnaKat(k)}
              className={`GAL_filter${aktivnaKat === k ? " GAL_filter--aktivan" : ""}`}
            >
              {k}
            </button>
          ))}
        </div>
        <span className="GAL_brojac">
          {filtrirane.length} {filtrirane.length === 1 ? "fotografija" : "fotografija"}
        </span>
      </div>

      {/* ── MASONRY GRID ── */}
      <div className="GAL_grid">
        {filtrirane.map((s, i) => (
          <GalKartica
            key={s.id}
            slika={s}
            index={i}
            onClick={otвориLightbox}
          />
        ))}
      </div>

      {/* ── LIGHTBOX ── */}
      {odabranaSlika && (
        <Lightbox
          slika={odabranaSlika}
          onZatvori={zatvoriLightbox}
          onPrethodna={prethodna}
          onSljedeca={sljedeca}
        />
      )}

    </section>
  );
}

export default Galerija;