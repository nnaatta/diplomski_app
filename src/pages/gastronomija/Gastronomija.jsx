import React, { useState } from 'react';
import './Gastronomija.css';
import { FaLocationDot, FaPhone, FaEnvelope, FaGlobe, FaInstagram, FaFacebook, FaChevronLeft, FaChevronRight, } from 'react-icons/fa6';
import kajmak from "../../assets/Kajmak.jpg";
import pozadina from "../../assets/GastronomijaPozadina.jpg";
import pogled1 from "../../assets/pogled1.jpg";
import pogled2 from "../../assets/pogled2.jpg";
import pogled3 from "../../assets/pogled3.jpg";
import planinska1 from "../../assets/planinskaKuca1.jpg";
import planinska2 from "../../assets/planinskaKuca2.jpg";
import planinska3 from "../../assets/planinskaKuca3.jpg";







// ===== RESTORANI =====
const restorani = [
  {
    id: 1,
    naziv: 'Restoran Pogled',
    opis: 'Smješten uz magistralni put M-19 na Han Pogledi, porodični restoran "Pogled" je pravo gastronomsko odredište za sve koji prolaze kroz ovaj kraj. Tradicija, domaća kuhinja i prijatna atmosfera čine ga nezaobilaznim mjestom na turističkoj mapi Han Pijeska. Restoran nudi bogat izbor jela pripremljenih od namirnica lokalnih proizvođača, a prostrana bašta sa pogledom na planinu savršena je za uživanje u čistom planinskom vazduhu.',
    adresa: 'Han Pogled 244, Han Pijesak',
    telefon: '065 720-634',
    email: 'info@restoranpogled.com',
    web: 'restoranpogled.com',
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    slike: [pogled1, pogled2, pogled3],
    specijaliteti: ['Teletina ispod sača', 'Domaća čorba', 'Pečenje na ražnju', 'Domaći sir i kajmak'],
    sadrzaji: ['Parking', 'Wi-Fi', 'Bašta', 'Smještaj', 'Dječije igralište'],
  },
  {
    id: 2,
    naziv: 'Planinska kuća',
    opis: 'Planinska kuća je autentični restoran smješten u srcu Han Pijeska, koji nudi tradicionalnu bosansku kuhinju u rustikalnom ambijentu. Ovaj prijatan objekat poznat je po domaćim specijalitetima pripremljenim po starim recepturama, a ugodna atmosfera i ljubazno osoblje pobrinuće se da svaki posjetilac ode zadovoljan. Idealno mjesto za odmor i uživanje u pravoj planinskoj gastronomiji.',
    adresa: 'Kraljevo polje, Bogaz 1, Han Pijesak',
    telefon: '057 230-677',
    email: 'planinskakuca1@gmail.com',
    web: '',
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    slike: [planinska1, planinska2, planinska3],
    specijaliteti: ['Romanijska šnicla', 'Pita sa sirom', 'Domaći roštilj', 'Zeljanica'],
    sadrzaji: ['Parking', 'Domaća kuhinja', 'Pogled na prirodu'],
  },
];

// ===== SPECIJALITETI =====
const specijaliteti = [
  { naziv: 'Teletina ispod sača',  opis: 'Tradicionalno pripremljena teletina ispod sača — sporo pečena, sočna i aromatična.',          slika: '' },
  { naziv: 'Domaća cicvara',         opis: 'Tradicionalno planinsko jelo od kukuruznog brašna, kajmaka i mladog sira, tradicionalni ukus Romanije.',       slika: '' },
  { naziv: 'Domaći sir i kajmak',    opis: 'Svježi planinski sir i kajmak od mlijeka lokalnih farmi — pravi ukus Romanije.',                  slika: '' },
  { naziv: 'Pita zeljanica',         opis: 'Domaća pita sa svježim sirom i zelenjem, pripremljena na tradicionalan način.',          slika: '' },
  { naziv: 'Pečenje na ražnju',      opis: 'Cijeli odojak ili janje pečeno na ražnju — nezaobilazan specijalitet svakog slavlja.',             slika: '' },
  { naziv: 'Domaći med',             opis: 'Med sa romanijskih pašnjaka, bogat aromama planinski cvijeća — idealan suvenir.',                  slika: '' },
];

// ===== SLIDER KOMPONENTA =====
function RestoranSlider({ slike }) {
  const [aktivan, setAktivan] = useState(0);

  const prethodni = (e) => {
    e.preventDefault();
    setAktivan((prev) => (prev === 0 ? slike.length - 1 : prev - 1));
  };

  const sljedeci = (e) => {
    e.preventDefault();
    setAktivan((prev) => (prev === slike.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="restoran__slider">
      {slike[aktivan]
        ? <img src={slike[aktivan]} alt="Restoran" className="restoran__slika" />
        : <div className="restoran__placeholder" />
      }
      <button className="restoran__strelica restoran__strelica--lijevo" onClick={prethodni}>
        <FaChevronLeft />
      </button>
      <button className="restoran__strelica restoran__strelica--desno" onClick={sljedeci}>
        <FaChevronRight />
      </button>
      <div className="restoran__dots">
        {slike.map((_, i) => (
          <button
            key={i}
            className={`restoran__dot${i === aktivan ? ' restoran__dot--aktivan' : ''}`}
            onClick={() => setAktivan(i)}
          />
        ))}
      </div>
    </div>
  );
}

// ===== GLAVNA KOMPONENTA =====
function Gastronomija() {
  return (
    <section className="gastro">

      {/* ===== HERO ===== */}
      <div className="gastro__hero">
        <img src={pozadina} alt="Gastronomija" className="gastro__hero-img" />
        <div className="gastro__hero-overlay" />
        <div className="gastro__hero-tekst">
          <h1>Gastronomija</h1>
          <p>Otkrijte autentične ukuse planinske kuhinje Han Pijeska</p>
        </div>
      </div>

      {/* ===== UVOD ===== */}
      <div className="gastro__uvod">
        <p>
          Gastronomija Han Pijeska odraz je bogate planinske tradicije i ljubavi prema autentičnoj domaćoj kuhinji.
          Jela pripremljena od svježih, lokalnih namirnica, uz aromu drveta i planinski vazduh,
          čine svaki obrok nezaboravnim doživljajem. Posjetite naše restorane i uživajte u pravim ukusima Romanije.
        </p>
      </div>

      {/* ===== RESTORANI ===== */}
      <div className="gastro__restorani">
        <h2 className="gastro__sekcija-naslov">Restorani</h2>
        <div className="gastro__restorani-lista">
          {restorani.map((r) => (
            <div key={r.id} className="restoran">

              {/* Slider */}
              <RestoranSlider slike={r.slike} />

              {/* Info */}
              <div className="restoran__info">
                <h3 className="restoran__naziv">{r.naziv}</h3>
                <p className="restoran__opis">{r.opis}</p>

                {/* Sadržaji */}
                <div className="restoran__sadrzaji">
                  {r.sadrzaji.map((s) => (
                    <span key={s} className="restoran__sadrzaj">{s}</span>
                  ))}
                </div>

                {/* Specijaliteti */}
                <div className="restoran__spec-wrap">
                  <h4 className="restoran__spec-naslov">Preporučujemo:</h4>
                  <ul className="restoran__spec-lista">
                    {r.specijaliteti.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>

                {/* Kontakt */}
                <div className="restoran__kontakt">
                  <a href={`tel:${r.telefon}`} className="restoran__kontakt-item">
                    <FaPhone /> {r.telefon}
                  </a>
                  <a href={`mailto:${r.email}`} className="restoran__kontakt-item">
                    <FaEnvelope /> {r.email}
                  </a>
                  <span className="restoran__kontakt-item">
                    <FaLocationDot /> {r.adresa}
                  </span>
                  {r.web && (
                    <a href={`https://${r.web}`} target="_blank" rel="noreferrer" className="restoran__kontakt-item">
                      <FaGlobe /> {r.web}
                    </a>
                  )}
                </div>

                {/* Društvene mreže */}
                <div className="restoran__drustvene">
                  <a href={r.instagram} target="_blank" rel="noreferrer" className="restoran__drustvena restoran__drustvena--instagram">
                    <FaInstagram /> Instagram
                  </a>
                  <a href={r.facebook} target="_blank" rel="noreferrer" className="restoran__drustvena restoran__drustvena--facebook">
                    <FaFacebook /> Facebook
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== ROMANIJSKI SKORUP-KAJMAK ===== */}
      <div className="gastro__kajmak">
        <div className="gastro__kajmak-grid">

          {/* Lijevo — slika */}
          <div className="gastro__kajmak-slika-wrap">
            <img src={kajmak} alt="Romanijski skorup-kajmak" className="gastro__kajmak-slika" />
            <span className="gastro__kajmak-bedz">🏆 Zaštićeni proizvod</span>
          </div>

          {/* Desno — tekst */}
          <div className="gastro__kajmak-tekst">
            <span className="gastro__kajmak-oznaka">Geografsko porijeklo</span>
            <h2 className="gastro__kajmak-naslov">Romanijski skorup-kajmak</h2>
            <p className="gastro__kajmak-opis">
              Na manje od dva kilometra od puta Han Pijesak – Karaula, u netaknutoj romanijskoj prirodi,
              krije se jedno od najcjenjenijih gastronomskih blaga ovog kraja —
              čuveni <strong>Romanijski skorup-kajmak</strong>. Ovaj jedinstveni mliječni proizvod
              nastaje po posebnoj lokalnoj tehnologiji koja se prenosi s koljena na koljeno,
              a ključni dio procesa proizvodnje je dimljenje, što mu daje prepoznatljiv i neponovljiv ukus.
            </p>
            <p className="gastro__kajmak-opis">
              Početkom februara 2017. godine, Institut za intelektualno vlasništvo Bosne i Hercegovine
              donio je rješenje kojim se zvanično priznaje ime porijekla <em>"Romanijski skorup-kajmak"</em>
              i upisuje u registar imena porijekla. Ovo je potvrda da se radi o autentičnom proizvodu
              koji pripada isključivo planini Romaniji i njenim stanovnicima.
            </p>
            <p className="gastro__kajmak-opis">
              Udruženje je dobilo i certifikat Međunarodne organizacije za zaštitu intelektualnog vlasništva
              (WIPO), kojim se priznaje pravo zaštite skorup-kajmaka u <strong>29 zemalja svijeta</strong>,
              uključujući 9 zemalja članica Evropske unije. Ovo je izniman uspjeh koji Romaniju svrstava
              uz bok čuvenih evropskih gastronomskih regija.
            </p>

            {/* Certifikati */}
            <div className="gastro__kajmak-certifikati">
              <div className="gastro__kajmak-cert">
                <span className="gastro__kajmak-cert-ikona">✓</span>
                <span>Zaštićeno ime porijekla od 2017. godine</span>
              </div>
              <div className="gastro__kajmak-cert">
                <span className="gastro__kajmak-cert-ikona">✓</span>
                <span>WIPO certifikat — zaštićen u 29 zemalja</span>
              </div>
              <div className="gastro__kajmak-cert">
                <span className="gastro__kajmak-cert-ikona">✓</span>
                <span>Tradicionalna tehnologija dimljenja</span>
              </div>
              <div className="gastro__kajmak-cert">
                <span className="gastro__kajmak-cert-ikona">✓</span>
                <span>Proizvod planine Romanije</span>
              </div>
            </div>

            <p className="gastro__kajmak-poziv">
              Posjetite Han Pijesak i kušajte ovaj autentični planinski specijalitet —
              pravi suvenir koji možete ponijeti kući.
            </p>
          </div>

        </div>
      </div>

      {/* ===== SPECIJALITETI ===== */}
      <div className="gastro__specijaliteti">
        <h2 className="gastro__sekcija-naslov">Ukusi koje morate doživjeti</h2>
        <p className="gastro__sekcija-podnaslov">Naš predlog je da obavezno probate sljedeće lokalne specijalitete:</p>
        <div className="gastro__spec-grid">
          {specijaliteti.map((s) => (
            <div key={s.naziv} className="gastro__spec-kartica">
              <div className="gastro__spec-slika-wrap">
                {s.slika
                  ? <img src={s.slika} alt={s.naziv} className="gastro__spec-slika" />
                  : <div className="gastro__spec-placeholder" />
                }
              </div>
              <div className="gastro__spec-tekst">
                <h3 className="gastro__spec-naziv">{s.naziv}</h3>
                <p className="gastro__spec-opis">{s.opis}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

export default Gastronomija;