import React from "react";
import "./SportRekreacija.css";
import { Link } from "react-router-dom";

import PedVisocnikLogo from "../../assets/PedVisocnikLogo.jpg";
import vis1 from "../../assets/sportRekreacija/vis1.jpg"
import vis2 from "../../assets/sportRekreacija/vis2.jpg"
import vis3 from "../../assets/sportRekreacija/vis3.jpg"
import vis4 from "../../assets/sportRekreacija/vis4.jpg"
import psuJavor from "../../assets/psuJavor.jpg";
import javor1 from "../../assets/sportRekreacija/javor1.jpg"
import javor2 from "../../assets/sportRekreacija/javor2.jpg"
import javor3 from "../../assets/sportRekreacija/javor3.jpg"
import javor4 from "../../assets/sportRekreacija/javor4.jpg"
import zokLogo from "../../assets/sportRekreacija/zokLogo.jpg"








const organizacije = [
  {
    naziv: "PSU Visočnik",
    logo: PedVisocnikLogo, 
    opis: "Planinarsko sportsko udruženje Visočnik organizuje pohode, takmičenja i edukacije u planinarenju. Aktivni tokom cijele godine na stazama Javora i okolnih planina.",
    slike: [vis1, vis2, vis3, vis4], // planinaranje1, planinaranje2...
    slikeOpisi: [
      "Vrani Kamen 2025 ",
      "Musala - krov Balkana",
      "Vrhovima Romanije",
      "Bregoč, vrh Zelengore",
    ],
  },
  {
    naziv: "PSU Javor — sunčana planina",
    logo: psuJavor, // psuJavorLogo
    opis: "Udruženje posvećeno promociji planinarstva i aktivnog boravka u prirodi. Organizuju godišnje pohode i saradnju sa školama i turističkom organizacijom.",
    slike: [javor1, javor2, javor3, javor4],
    slikeOpisi: [
      "Veliki Žep",
      "Trebević",
      "Komić",
      "Velika Sikira",
    ],
  },
  {
    naziv: "OK Han Pijesak",
    logo: zokLogo, // gorstakLogo
    opis: "Sportsko udruženje Gorštak aktivno djeluje u oblasti planinskih sportova i rekreacije. Posebno poznati po organizaciji pohoda za sve uzrasne kategorije.",
    slike: [null, null, null, null],
    slikeOpisi: ["Pohod u šumi", "Vršni uspon", "Rekreacija", "Takmičenje"],
  },
  {
    naziv: "Centar za omladinu i sport Pogled",
    logo: null, // cosLogo
    opis: "COS Pogled pruža mogućnosti za sport i rekreaciju mladima opštine Han Pijesak. Organizuje sportske programe, turnire i rekreativne aktivnosti tokom cijele godine.",
    slike: [null, null, null, null],
    slikeOpisi: ["Sportski program", "Turnir", "Rekreacija", "Mladi sportisti"],
  },
  {
    naziv: "FK Han Pijesak",
    logo: null,
    opis: "Fudbalski klub sa dugom tradicijom koji okuplja mlade i iskusne igrače opštine. Aktivno učestvuje u regionalnim ligama i organizuje lokalne turnire.",
    slike: [null, null, null, null],
    slikeOpisi: ["Utakmica", "Trening", "Turnir", "Tim"],
  },
];

const skiInfo = [
  { ikona: "⛰️", vrijednost: "1.400 m", labela: "Maks. nadmorska visina" },
  { ikona: "📏", vrijednost: "3 km", labela: "Ukupna dužina staza" },
  { ikona: "🎿", vrijednost: "2", labela: "Ski staze" },
  { ikona: "🚡", vrijednost: "1", labela: "Ski lift" },
  { ikona: "❄️", vrijednost: "Dec — Mar", labela: "Sezona" },
  { ikona: "🏔️", vrijednost: "Romanija", labela: "Planinski masiv" },
];

const skiSlike = [null, null, null, null, null]; // javor1, javor2...
const skiSlikeOpisi = [
  "Ski staza",
  "Ski lift",
  "Zimska panorama",
  "Skijaši na stazi",
  "Noćno skijanje",
];

const dogadjaji = [
  {
    naziv: "Ski takmičenja na Romaniji",
    opis: "Godišnja takmičenja u alpskom skijanju za sve uzrasne kategorije na obroncima Romanije. Okuplaju takmičare iz cijele regije.",
    period: "Januar — Mart",
    ikona: "⛷️",
  },
  {
    naziv: "Lokalni fudbalski turnir",
    opis: "Tradicionalni ljetnji turnir u malom fudbalu koji okuplja ekipe iz Han Pijeska i okolnih opština.",
    period: "Juli — Avgust",
    ikona: "⚽",
  },
  {
    naziv: "Planinarski pohod — Skakavac",
    opis: "Organizovani pohod na jedno od najljepših izletišta u okolini, uz vođenje iskusnih planinara.",
    period: "Maj i Septembar",
    ikona: "🥾",
  },
  {
    naziv: "Biciklistička tura Han Pijeska",
    opis: "Rekreativna tura kroz označene biciklističke staze opštine, otvorena za sve uzraste.",
    period: "Jun — Septembar",
    ikona: "🚵",
  },
  {
    naziv: "Ribolovačko takmičenje",
    opis: "Sportski ribolov na rijekama opštine uz ocjenjivanje ulova i nagradni fond za pobjednike.",
    period: "April — Oktobar",
    ikona: "🎣",
  },
];

function OrgCard({ org }) {
  return (
    <div className="SR_org">
      {/* Logo + naziv */}
      <div className="SR_org__header">
        <div className="SR_org__logo">
          {org.logo ? (
            <img src={org.logo} alt={org.naziv} className="SR_org__logo-img" />
          ) : (
            <span className="SR_org__logo-placeholder">🏆</span>
          )}
        </div>
        <h3 className="SR_org__naziv">{org.naziv}</h3>
      </div>

      {/* Opis */}
      <p className="SR_org__opis">{org.opis}</p>

      {/* Slike */}
      <div className="SR_org__slike">
        {org.slike.map((slika, i) => (
          <div key={i} className="SR_org__slika-item">
            {slika ? (
              <img
                src={slika}
                alt={org.slikeOpisi[i]}
                className="SR_org__slika"
              />
            ) : (
              <div className="SR_org__slika-placeholder" />
            )}
            <span className="SR_org__slika-opis">{org.slikeOpisi[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SportRekreacija() {
  return (
    <section className="SR_section">
      {/* ── 1. HERO ── */}
      <div className="SR_hero">
        {/* <img src={heroSlika} alt="Sport i rekreacija" className="SR_hero__img" /> */}
        <div className="SR_hero__img SR_hero__img--placeholder" />
        <div className="SR_hero__overlay" />
        <div className="SR_hero__tekst">
          <span className="SR_hero__bedz">Aktivni turizam</span>
          <h1 className="SR_hero__naslov">Sport i rekreacija u Han Pijesku</h1>
          <p className="SR_hero__podnaslov">
            Planine, šume i čist planinski vazduh — savršeni uslovi za sport,
            rekreaciju i aktivni odmor tokom cijele godine.
          </p>
          <a href="#uvod" className="SR_hero__dugme">
            Istraži aktivnosti ↓
          </a>
        </div>
      </div>

      {/* ── 2. UVOD ── */}
      <div className="SR_uvod" id="uvod">
        <div className="SR_uvod__tekst">
          <span className="SR_bedz--zeleni">Prirodni uslovi</span>
          <h2>Han Pijesak — prirodna arena za sport</h2>
          <p>
            Smješten na nadmorskoj visini od oko 1.100 metara, Han Pijesak pruža
            izuzetne prirodne uslove za sport i rekreaciju tokom cijele godine.
            Prostrane planinske šume, čist vazduh čine ovo područje idealnim za
            sve koji traže aktivan odmor u prirodi.
          </p>
          <p>
            Od skijanja zimi do planinarenja i biciklizma ljeti — priroda Han
            Pijeska nudi raznovrsne mogućnosti za sve uzrasne kategorije, uz
            podršku lokalnih sportskih organizacija.
          </p>
          <p>
            Čist planinski vazduh, minimalna buka i netaknuta priroda čine sport
            i rekreaciju ovdje posebnim i nezaboravnim iskustvom.
          </p>
        </div>

        <div className="SR_uvod__kartice">
          {[
            {
              ikona: "🥾",
              naziv: "Planinarenje i pješačenje",
              opis: "15+ označenih staza za sve nivoe",
            },
            {
              ikona: "🚵",
              naziv: "Biciklizam",
              opis: "MTB i rekreativne rute kroz šume",
            },
            {
              ikona: "⛷️",
              naziv: "Zimski sportovi",
              opis: "Skijanje na obroncima Javora",
            },
            {
              ikona: "🎣",
              naziv: "Lov i ribolov",
              opis: "Bogati reviri uz rijeke i jezera",
            },
          ].map((k) => (
            <div key={k.naziv} className="SR_uvod__kartica">
              <span className="SR_uvod__kartica-ikona">{k.ikona}</span>
              <div className="SR_uvod__kartica-info">
                <strong className="SR_uvod__kartica-naziv">{k.naziv}</strong>
                <span className="SR_uvod__kartica-opis">{k.opis}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. SPORTSKE ORGANIZACIJE ── */}
      <div className="SR_organizacije">
        <div className="SR_organizacije__wrap">
          <span className="SR_bedz--zeleni SR_bedz--centar">
            Lokalni sportski klubovi
          </span>
          <h2 className="SR_organizacije__naslov">Sportske organizacije</h2>
          <p className="SR_organizacije__podnaslov">
            Han Pijesak ima bogatu sportsku tradiciju kroz aktivne klubove i
            udruženja
          </p>
          <div className="SR_organizacije__lista">
            {organizacije.map((org) => (
              <OrgCard key={org.naziv} org={org} />
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. SKI CENTAR JAVOR ── */}
      <div className="SR_ski">
        <div className="SR_ski__wrap">
          <span className="SR_bedz--zeleni SR_bedz--centar">
            Zimski sportovi
          </span>
          <h2 className="SR_ski__naslov">Ski centar Javor</h2>
          <p className="SR_ski__podnaslov">
            Na obroncima Romanije, ski centar Javor nudi idealne uslove za
            skijanje i zimsku rekreaciju. Savršeno mjesto za porodični odmor,
            početnike i iskusne skijaše koji traže mir planinske prirode.
          </p>

          {/* Info kartice */}
          <div className="SR_ski__info">
            {skiInfo.map((s) => (
              <div key={s.labela} className="SR_ski__info-stavka">
                <span className="SR_ski__info-ikona">{s.ikona}</span>
                <span className="SR_ski__info-vrijednost">{s.vrijednost}</span>
                <span className="SR_ski__info-labela">{s.labela}</span>
              </div>
            ))}
          </div>

          {/* Slike ski centra */}
          <div className="SR_ski__galerija">
            {skiSlike.map((slika, i) => (
              <div
                key={i}
                className={`SR_ski__slika-item${i === 0 ? " SR_ski__slika-item--velika" : ""}`}
              >
                {slika ? (
                  <img
                    src={slika}
                    alt={skiSlikeOpisi[i]}
                    className="SR_ski__slika"
                  />
                ) : (
                  <div className="SR_ski__slika-placeholder" />
                )}
                <span className="SR_ski__slika-opis">{skiSlikeOpisi[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 5. SPORTSKI DOGAĐAJI ── */}
      <div className="SR_dogadjaji">
        <div className="SR_dogadjaji__wrap">
          <span className="SR_bedz--zeleni SR_bedz--centar">
            Tradicionalne manifestacije
          </span>
          <h2 className="SR_dogadjaji__naslov">Sportski događaji</h2>
          <p className="SR_dogadjaji__podnaslov">
            Takmičenja i manifestacije koje tokom godine okupljaju sportiste i
            ljubitelje prirode
          </p>
          <div className="SR_dogadjaji__lista">
            {dogadjaji.map((d, i) => (
              <div key={d.naziv} className="SR_dogadjaj">
                <div className="SR_dogadjaj__lijevo">
                  <span className="SR_dogadjaj__ikona">{d.ikona}</span>
                  <span className="SR_dogadjaj__redni">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="SR_dogadjaj__sredina">
                  <h3 className="SR_dogadjaj__naziv">{d.naziv}</h3>
                  <p className="SR_dogadjaj__opis">{d.opis}</p>
                </div>
                <span className="SR_dogadjaj__period">{d.period}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 6. CTA ── */}
      <div className="SR_cta">
        <h2 className="SR_cta__naslov">Doživite aktivnu prirodu</h2>
        <p className="SR_cta__tekst">
          Han Pijesak vas čeka tokom cijele godine — pronađite smještaj,
          odaberite aktivnost i krenite u avanturu u srcu Romanije.
        </p>
        <div className="SR_cta__dugmad">
          <Link
            to="/aktivni-odmor"
            className="SR_cta__btn SR_cta__btn--primarni"
          >
            Pogledaj staze
          </Link>
          <Link to="/kontakt" className="SR_cta__btn SR_cta__btn--sekundarni">
            Kontaktirajte nas
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SportRekreacija;
