import React, { useState, useMemo } from "react";
import "./Manifestacije.css";
import { Link } from "react-router-dom";

import toLogo from "../../assets/logoTO.png"
import biblLogo from "../../assets/manifestacije/logo-cucak.jpg"
import cosLogo from "../../assets/COSPogledLogp.png"
import visLogo from "../../assets/PedVisocnikLogo.jpg"
import javorLogo from "../../assets/psuJavor.jpg"
import kudLogo from "../../assets/manifestacije/kudLogo.jpg"
import vrticLogo from "../../assets/manifestacije/vrticLogo.jpg"
import opstinaLogo from "../../assets/OpstinaLogo.png"
import manHero from "../../assets/manifestacije/manHero.jpg"
import m1 from "../../assets/manifestacije/m1.jpg"
import m2 from "../../assets/manifestacije/m2.jpg"
import m3 from "../../assets/manifestacije/m3.jpg"










const organizatori = [
  {
    naziv: "Opština Han Pijesak",
    opis: "Glavni pokrovitelj i podrška organizaciji većine manifestacija u opštini. Aktivno učestvuje u razvoju kulturnih i turističkih događaja i unapređenju lokalne zajednice.",
    logo:  opstinaLogo,
  },
  {
    naziv: "Turistička organizacija Han Pijesak",
    opis:  "Glavni organizator turističkih i kulturnih manifestacija na prostoru opštine. Koordinira sve događaje i promoviše Han Pijesak kao destinaciju.",
    logo:  toLogo, 
  },
  {
    naziv: `JU Narodna biblioteka "Branko Čučak"`,
    opis:  "Kulturna ustanova koja promoviše književnost i obrazovanje kroz razne programe i događaje. Organizator je poznatih književnih susreta i kulturnih manifestacija.",
    logo:  biblLogo,
  },
  {
    naziv: "JU Centar za omladinu i sport Pogled",
    opis:  "Glavni nosilac kulturnih i sportskih aktivnosti u opštini. Organizuje brojne manifestacije, događaje i okupljanja tokom cijele godine.",
    logo:  cosLogo,
  },
  {
    naziv: "PSU Visočnik",
    opis:  "Organizacija posvećena očuvanju prirode i promociji ekološke svijesti. Aktivno učestvuje u organizaciji planinarskih i edukativnih manifestacija.",
    logo:  visLogo,
  },
  {
    naziv: "PSU Javor Sunčana planina",
    opis: "Društvo koje promoviše planinarenje, boravak u prirodi i aktivan turizam. Učestvuje u organizaciji sportskih i rekreativnih događaja.",
    logo:  javorLogo,
  },
  {
    naziv: `KUD "Sveti Pantelejmon"`,
    opis: "Kulturno-umjetničko društvo koje njeguje tradiciju, folklor i običaje ovog kraja. Organizuje nastupe i događaje koji čuvaju kulturno nasljeđe.",
    logo:  kudLogo,
  },{
    naziv: `Vrtić „Diana Budisavljević“`,
    opis: "Predškolska ustanova koja aktivno učestvuje u organizaciji lokalnih događaja i manifestacija. Posebno doprinosi kroz tematske bazare i kreativne aktivnosti.",
    logo:  vrticLogo,
  },
];

const predstojeciDogadjaji = [
  {
    id:          1,
    naslov:      "Kakva ti je žena, takav ti je život",
    opis:        "Monokomedija u izvođenju Dragana Marinkovića Mace",
    datum:       "2026-05-03",
    datumPrikaz: "03. maj 2026.",
    vrijeme:     "17:00 h",
    lokacija:    "Centar Han Pijesak",
    ulaz:        "25 KM",
    kategorija:  "Gostovanja",
    slika: m1
  },
  {
    id:          2,
    naslov:      "Druženje sa književnikom Bojanom Ljubenovićem",
    opis:        "Provedite veče družeći se sa jednim od pisaca današnjice Bojanom Ljubenovićem",
    datum:       "2025-04-12",
    datumPrikaz: "12. april 2026.",
    vrijeme:     "08:00 h",
    lokacija:    "Dom kulture Han Pijesak",
    ulaz:        "Besplatno",
    kategorija:  "Književnost",
    slika: m2,
  },
  {
    id:          3,
    naslov:      "Opera za dijecu Snežana i 7 patuljaka",
    opis:        "Kulturno zabavni dječiji program.",
    datum:       "2026-06-05",
    datumPrikaz: "5. jun 2026.",
    vrijeme:     "17:00 h",
    lokacija:    "Dom kulture Han Pijesak",
    ulaz:        "3 KM",
    kategorija:  "Dječiji program",
    slika: m3
  },
  {
    id:          4,
    naslov:      "Dječiji sportski kamp",
    opis:        "Sedmični kamp za djecu uzrasta 8–14 godina. Planinarenje, biciklizam i kreativne radionice.",
    datum:       "2025-08-11",
    datumPrikaz: "11–17. august 2025.",
    lokacija:    "COS Pogled",
    ulaz:        "20 KM",
    kategorija:  "Djeca",
  },
  {
    id:          5,
    naslov:      "Fudbalski turnir Han Pijesak",
    opis:        "Godišnji turnir u malom fudbalu za ekipe iz opštine i susjednih područja.",
    datum:       "2025-08-20",
    datumPrikaz: "20. august 2025.",
    lokacija:    "Sportsko igralište",
    ulaz:        "Besplatno",
    kategorija:  "Sport",
  },
  {
    id:          6,
    naslov:      "Izložba lokalne fotografije",
    opis:        "Izložba fotografija autora iz Han Pijeska — priroda, arhitektura i svakodnevni život opštine.",
    datum:       "2025-09-10",
    datumPrikaz: "10–20. septembar 2025.",
    lokacija:    "Dom kulture",
    ulaz:        "Besplatno",
    kategorija:  "Kultura",
  },
];

const tradicionalneManifestacije = [
  {
    naslov:  "Čučkovi književni susreti",
    opis:    "Kulturna manifestacija posvećena književnosti koja okuplja pisce, pjesnike i ljubitelje knjige. Doprinosi očuvanju književne tradicije i identiteta ovog kraja.",
    period:  "Mart",
    slike:   [null, null, null, null],
    slikeOpisi: ["Književno veče", "Govornici", "Publika", "Promocija knjiga"],
  },
  {
    naslov:  "Slet planinara Han Pijesak",
    opis:    "Tradicionalno okupljanje planinara i ljubitelja prirode iz regiona. Promoviše aktivan boravak u prirodi i prirodne ljepote Han Pijeska.",
    period:  "April",
    slike:   [null, null, null, null],
    slikeOpisi: ["Planinari", "Pohod", "Priroda", "Druženje"],
  },
  {
    naslov:  "Vidovdanske svečanosti",
    opis:    "Jedna od najznačajnijih manifestacija u opštini koja uključuje kulturne programe i likovno saborovanje. Obilježava važan istorijski datum i okuplja brojne posjetioce.",
    period:  "Kraj juna svake godine",
    slike:   [null, null, null, null],
    slikeOpisi: ["Likovna kolonija", "Umjetnici", "Izložba", "Program"],
  },
  {
    naslov:  "Paljenje petrovdanskih lila",
    opis:    "Stari narodni običaj koji simbolizuje očuvanje tradicije i zajedništva. Posebno je zanimljiv djeci i mladima koji učestvuju u ovom događaju.",
    period:  "11. jul",
    slike:   [null, null, null, null],
    slikeOpisi: ["Lile", "Večernja atmosfera", "Djeca", "Običaji"],
  },
  {
    naslov:  "MTB „Javor“",
    opis:    "Sportska manifestacija koja okuplja bicikliste i ljubitelje adrenalinskih aktivnosti. Promoviše planinski turizam i aktivan način života.",
    period:  "Avgust",
    slike:   [null, null, null, null],
    slikeOpisi: ["Biciklisti", "Staza", "Takmičenje", "Priroda"],
  },
  {
    naslov:  "Dan i krsna slava opštine Han Pijesak",
    opis:    "Centralni događaj u opštini koji se obilježava kroz kulturne, vjerske i zabavne aktivnosti. Okuplja veliki broj stanovnika i gostiju.",
    period:  "9. avgust",
    slike:   [null, null, null, null],
    slikeOpisi: ["Svečanost", "Program", "Gosti", "Obilježavanje"],
  },
  {
    naslov:  "Gulašijada",
    opis:    "Gastro manifestacija koja promoviše tradicionalnu kuhinju i druženje na otvorenom. Privlači veliki broj učesnika i posjetilaca.",
    period:  "Septembar",
    slike:   [null, null, null, null],
    slikeOpisi: ["Kuvanje", "Ekipa", "Hrana", "Druženje"],
  },
  {
    naslov:  "Đeram – čuvari tradicije",
    opis:    "Kulturna manifestacija posvećena očuvanju narodnih običaja, igre i pjesme. Naglašava značaj folklora i tradicije ovog kraja.",
    period:  "Tokom godine",
    slike:   [null, null, null, null],
    slikeOpisi: ["Folklor", "Nošnje", "Igra", "Nastup"],
  },
  {
    naslov:  "Putevima šumadijske divizije – Vrani kamen",
    opis:    "Memorijalno-planinarska manifestacija koja njeguje istorijsko nasljeđe i kulturu sjećanja. Povezuje istoriju, prirodu i edukaciju.",
    period:  "Septembar",
    slike:   [null, null, null, null],
    slikeOpisi: ["Pohod", "Spomenik", "Planinari", "Priroda"],
  },
  {
    naslov:  "Novogodišnji bazar",
    opis:    "Događaj koji se organizuje uoči novogodišnjih praznika sa prodajnim i zabavnim sadržajem. Stvara prazničnu atmosferu i okuplja lokalnu zajednicu.",
    period:  "Decembar",
    slike:   [null, null, null, null],
    slikeOpisi: ["Štandovi", "Dekoracije", "Pokloni", "Atmosfera"],
  },
];

const kategorijeBoje = {
  Turizam: { bg: "#eaf3de", tekst: "#3a5a40" },
  Sport:   { bg: "#e8f0fa", tekst: "#1a4a8a" },
  Kultura: { bg: "#f5edf8", tekst: "#6a2a8a" },
  Djeca:   { bg: "#fff4e0", tekst: "#8a5a00" },
};

const DANI    = ["Po", "Ut", "Sr", "Če", "Pe", "Su", "Ne"];
const MJESECI = [
  "Januar","Februar","Mart","April","Maj","Jun",
  "Jul","August","Septembar","Oktobar","Novembar","Decembar",
];

// ── Kalendar ─────────────────────────────────────────────────────────────────

function Kalendar({ dogadjaji, odabraniDatum, onOdaberiDatum }) {
  const danas  = new Date();
  const [godina, setGodina]   = useState(danas.getFullYear());
  const [mjesec, setMjesec]   = useState(danas.getMonth());

  // Skup dana u tekućem prikazu koji imaju događaj
  const datumi = useMemo(() => {
    const set = new Set();
    dogadjaji.forEach((d) => {
      const dt = new Date(d.datum);
      if (dt.getFullYear() === godina && dt.getMonth() === mjesec)
        set.add(dt.getDate());
    });
    return set;
  }, [dogadjaji, godina, mjesec]);

  // Pomak: ponedjeljak = 0 ... nedjelja = 6
  const prvogDana   = new Date(godina, mjesec, 1).getDay();
  const pomak       = (prvogDana + 6) % 7;
  const danaMjeseca = new Date(godina, mjesec + 1, 0).getDate();

  const prijasiMjesec = () => {
    if (mjesec === 0) { setMjesec(11); setGodina(g => g - 1); }
    else setMjesec(m => m - 1);
  };
  const sljedeciMjesec = () => {
    if (mjesec === 11) { setMjesec(0); setGodina(g => g + 1); }
    else setMjesec(m => m + 1);
  };

  // Gradi niz ćelija — null za prazne, broj za dan
  const celije = [
    ...Array(pomak).fill(null),
    ...Array.from({ length: danaMjeseca }, (_, i) => i + 1),
  ];

  // Dopuni do punih 6 redova (42 ćelije) da grid uvijek bude iste visine
  while (celije.length < 42) celije.push(null);

  const odabraniObj = odabraniDatum ? new Date(odabraniDatum) : null;

  return (
    <div className="MAN_kal">
      {/* Navigacija */}
      <div className="MAN_kal__header">
        <button className="MAN_kal__nav" onClick={prijasiMjesec}>‹</button>
        <span className="MAN_kal__naslov">{MJESECI[mjesec]} {godina}</span>
        <button className="MAN_kal__nav" onClick={sljedeciMjesec}>›</button>
      </div>

      {/* Grid */}
      <div className="MAN_kal__grid">
        {/* Nazivi dana */}
        {DANI.map(d => (
          <div key={d} className="MAN_kal__dan-naziv">{d}</div>
        ))}

        {/* Ćelije */}
        {celije.map((dan, i) => {
          if (!dan) return <div key={`p-${i}`} className="MAN_kal__prazna" />;

          const imaEvent  = datumi.has(dan);
          const datumStr  = `${godina}-${String(mjesec + 1).padStart(2, "0")}-${String(dan).padStart(2, "0")}`;
          const jeOdabran = odabraniObj &&
            odabraniObj.getFullYear() === godina &&
            odabraniObj.getMonth()    === mjesec &&
            odabraniObj.getDate()     === dan;
          const jeDanas   =
            danas.getFullYear() === godina &&
            danas.getMonth()    === mjesec &&
            danas.getDate()     === dan;

          return (
            <button
              key={`d-${dan}`}
              onClick={() => imaEvent && onOdaberiDatum(jeOdabran ? null : datumStr)}
              className={[
                "MAN_kal__dan",
                imaEvent  ? "MAN_kal__dan--event"   : "",
                jeOdabran ? "MAN_kal__dan--odabran"  : "",
                jeDanas   ? "MAN_kal__dan--danas"    : "",
              ].filter(Boolean).join(" ")}
            >
              {dan}
              {imaEvent && !jeOdabran && <span className="MAN_kal__tackica" />}
            </button>
          );
        })}
      </div>

      {/* Reset */}
      {odabraniDatum && (
        <button className="MAN_kal__reset" onClick={() => onOdaberiDatum(null)}>
          ✕ Poništi filter
        </button>
      )}

      {/* Legenda */}
      <div className="MAN_kal__legenda">
        <div className="MAN_kal__legenda-stavka">
          <span className="MAN_kal__legenda-krug MAN_kal__legenda-krug--event" />
          Dan sa događajem
        </div>
        <div className="MAN_kal__legenda-stavka">
          <span className="MAN_kal__legenda-krug MAN_kal__legenda-krug--danas" />
          Danas
        </div>
      </div>
    </div>
  );
}

// ── Event kartica (poster format) ────────────────────────────────────────────

function EventKartica({ dogadjaj }) {
  const kat = kategorijeBoje[dogadjaj.kategorija] || { bg: "#eaf3de", tekst: "#3a5a40" };
  return (
    <div className="MAN_event">
      {/* Slika — gornji, veći dio */}
      <div className="MAN_event__slika-wrap">
        {dogadjaj.slika
          ? <img src={dogadjaj.slika} alt={dogadjaj.naslov} className="MAN_event__slika" />
          : <div className="MAN_event__slika-placeholder" />
        }
        <span className="MAN_event__kat" style={{ background: kat.bg, color: kat.tekst }}>
          {dogadjaj.kategorija}
        </span>
      </div>

      {/* Donji dio — tekst */}
      <div className="MAN_event__tijelo">
        <h3 className="MAN_event__naslov">{dogadjaj.naslov}</h3>
        <p className="MAN_event__opis">{dogadjaj.opis}</p>
        <div className="MAN_event__meta">
          <div className="MAN_event__meta-red">
            <span className="MAN_event__meta-labela">Datum:</span>
            <span className="MAN_event__meta-vrijednost">{dogadjaj.datumPrikaz}</span>
          </div>
          <div className="MAN_event__meta-red">
            <span className="MAN_event__meta-labela">Vrijeme:</span>
            <span className="MAN_event__meta-vrijednost">{dogadjaj.vrijeme}</span>
          </div>
          <div className="MAN_event__meta-red">
            <span className="MAN_event__meta-labela">Lokacija:</span>
            <span className="MAN_event__meta-vrijednost">{dogadjaj.lokacija}</span>
          </div>
          <div className="MAN_event__meta-red">
            <span className="MAN_event__meta-labela">Ulaz:</span>
            <span className="MAN_event__meta-vrijednost">{dogadjaj.ulaz}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Slider za slike ───────────────────────────────────────────────────────────

function TradSlider({ slike, slikeOpisi }) {
  const [pocetni, setPocetni] = useState(0);
  const vidljivo = 3; // koliko slika se prikazuje odjednom

  const mozeLijevo  = pocetni > 0;
  const mozeDesno   = pocetni + vidljivo < slike.length;

  const idi = (smjer) => {
    setPocetni(p => Math.max(0, Math.min(p + smjer, slike.length - vidljivo)));
  };

  const prikazane = slike.slice(pocetni, pocetni + vidljivo);

  return (
    <div className="MAN_trad__slider">
      <button
        className={`MAN_trad__slider-nav MAN_trad__slider-nav--lijevo${!mozeLijevo ? " MAN_trad__slider-nav--disabled" : ""}`}
        onClick={() => idi(-1)}
        disabled={!mozeLijevo}
        aria-label="Prethodne slike"
      >
        ‹
      </button>

      <div className="MAN_trad__slider-track">
        {prikazane.map((slika, i) => {
          const idx = pocetni + i;
          return (
            <div key={idx} className="MAN_trad__slika-item">
              {slika
                ? <img src={slika} alt={slikeOpisi[idx]} className="MAN_trad__slika" />
                : <div className="MAN_trad__slika-placeholder" />
              }
              {slikeOpisi[idx] && (
                <span className="MAN_trad__slika-opis">{slikeOpisi[idx]}</span>
              )}
            </div>
          );
        })}
      </div>

      <button
        className={`MAN_trad__slider-nav MAN_trad__slider-nav--desno${!mozeDesno ? " MAN_trad__slider-nav--disabled" : ""}`}
        onClick={() => idi(1)}
        disabled={!mozeDesno}
        aria-label="Sljedeće slike"
      >
        ›
      </button>

      {/* Indikatori */}
      {slike.length > vidljivo && (
        <div className="MAN_trad__slider-dots">
          {Array.from({ length: slike.length - vidljivo + 1 }).map((_, i) => (
            <button
              key={i}
              className={`MAN_trad__slider-dot${i === pocetni ? " MAN_trad__slider-dot--aktivan" : ""}`}
              onClick={() => setPocetni(i)}
              aria-label={`Idi na poziciju ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Tradicionalna manifestacija (segment sa linijom + slider) ─────────────────

function TradSegment({ man }) {
  return (
    <div className="MAN_trad">
      {/* Gornji dio — naziv i tekst */}
      <div className="MAN_trad__info">
        <span className="MAN_trad__period">{man.period}</span>
        <h3 className="MAN_trad__naslov">{man.naziv}</h3>
        <p className="MAN_trad__opis">{man.opis}</p>
      </div>
      {/* Donji dio — slider sa slikama */}
      <TradSlider slike={man.slike} slikeOpisi={man.slikeOpisi} />
    </div>
  );
}

// ── Glavna stranica ───────────────────────────────────────────────────────────

function Manifestacije() {
  const [odabraniDatum, setOdabraniDatum] = useState(null);

  const filtrirani = useMemo(() => {
    if (!odabraniDatum) return predstojeciDogadjaji;
    return predstojeciDogadjaji.filter(d => d.datum === odabraniDatum);
  }, [odabraniDatum]);

  return (
    <section className="MAN_section">

      {/* ── 1. HERO ── */}
      <div className="MAN_hero">
        <img src={manHero} className="MAN_hero__img MAN_hero__img--placeholder" />
        <div className="MAN_hero__overlay" />
        <div className="MAN_hero__tekst">
          <span className="MAN_hero__bedz">Kulturni i sportski život</span>
          <h1 className="MAN_hero__naslov">Manifestacije</h1>
          <p className="MAN_hero__podnaslov">
            Kulturne, sportske i turističke manifestacije koje tokom cijele
            godine obogaćuju život opštine Han Pijesak.
          </p>
          <a href="#predstojeCI" className="MAN_hero__dugme">
            Pogledaj događaje ↓
          </a>
        </div>
      </div>

      {/* ── 2. ORGANIZATORI — logo + naziv + opis ── */}
      <div className="MAN_organizatori">
        <div className="MAN_organizatori__wrap">
          <span className="MAN_bedz--zeleni MAN_bedz--centar">Ko stoji iza događaja</span>
          <h2 className="MAN_organizatori__naslov">Organizatori manifestacija</h2>
          <p className="MAN_organizatori__podnaslov">
            Institucije i organizacije koje čine kulturni i sportski život Han Pijeska
          </p>
          <div className="MAN_organizatori__grid">
            {organizatori.map((org) => (
              <div key={org.naziv} className="MAN_org">
                <div className="MAN_org__logo">
                  {org.logo
                    ? <img src={org.logo} alt={org.naziv} className="MAN_org__logo-img" />
                    : <span className="MAN_org__logo-placeholder">🏛️</span>
                  }
                </div>
                <div className="MAN_org__info">
                  <h3 className="MAN_org__naziv">{org.naziv}</h3>
                  <p className="MAN_org__opis">{org.opis}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. PREDSTOJEĆI DOGAĐAJI + KALENDAR ── */}
      <div className="MAN_predstojeCI" id="predstojeCI">
        <div className="MAN_predstojeCI__wrap">
          <span className="MAN_bedz--zeleni MAN_bedz--centar">Šta vas čeka</span>
          <h2 className="MAN_predstojeCI__naslov">Predstojeći događaji</h2>
          <p className="MAN_predstojeCI__podnaslov">
            Odaberite datum u kalendaru ili pregledajte sve nadolazeće događaje
          </p>

          <div className="MAN_predstojeCI__layout">
            {/* Sidebar — kalendar */}
            <aside className="MAN_predstojeCI__sidebar">
              <Kalendar
                dogadjaji={predstojeciDogadjaji}
                odabraniDatum={odabraniDatum}
                onOdaberiDatum={setOdabraniDatum}
              />
            </aside>

            {/* Grid događaja — dinamičan broj kartica */}
            <div className="MAN_predstojeCI__grid">
              {filtrirani.length === 0 ? (
                <div className="MAN_prazan">
                  <p>Nema događaja za odabrani datum.</p>
                  <button
                    className="MAN_prazan__btn"
                    onClick={() => setOdabraniDatum(null)}
                  >
                    Prikaži sve događaje
                  </button>
                </div>
              ) : (
                filtrirani.map(d => <EventKartica key={d.id} dogadjaj={d} />)
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. TRADICIONALNE MANIFESTACIJE — segmenti sa linijama ── */}
      <div className="MAN_tradicionalne">
        <div className="MAN_tradicionalne__wrap">
          <span className="MAN_bedz--zeleni MAN_bedz--centar">Svake godine</span>
          <h2 className="MAN_tradicionalne__naslov">Tradicionalne manifestacije</h2>
          <p className="MAN_tradicionalne__podnaslov">
            Manifestacije koje se ponavljaju i obilježavaju ritam života Han Pijeska
          </p>
          <div className="MAN_tradicionalne__lista">
            {tradicionalneManifestacije.map((m, i) => (
              <TradSegment key={i} man={m} />
            ))}
          </div>
        </div>
      </div>

      {/* ── 5. CTA ── */}
      <div className="MAN_cta">
        <h2 className="MAN_cta__naslov">Posjetite Han Pijesak</h2>
        <p className="MAN_cta__tekst">
          Planirajte posjetu tokom neke od naših manifestacija i doživite
          autentičnu atmosferu planinske opštine.
        </p>
        <div className="MAN_cta__dugmad">
          <Link to="/smjestaj" className="MAN_cta__btn MAN_cta__btn--primarni">
            Pronađi smještaj
          </Link>
          <Link to="/kontakt" className="MAN_cta__btn MAN_cta__btn--sekundarni">
            Kontaktirajte nas
          </Link>
        </div>
      </div>

    </section>
  );
}

export default Manifestacije;