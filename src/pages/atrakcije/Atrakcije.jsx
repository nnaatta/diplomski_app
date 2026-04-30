import React, { useEffect, useRef } from "react";
import "./Atrakcije.css";
import { Link } from "react-router-dom";
import skakavac from "../../assets/Vodopad-Skakavac.jpg"
import varosnica from "../../assets/rijeke.jpg"
import pecina from "../../assets/komnicaPecina.jpg"
import vazdusnaBanja from "../../assets/vazdusnaBanja.jpg";
import vidikovac from "../../assets/ZdravstveniTurizam/slika11.jpg";

import { FaMapLocationDot } from "react-icons/fa6";
import { FaWalking, FaMountain, FaRegCompass, FaSnowflake, FaHandHoldingHeart  } from "react-icons/fa";
import { LuWaves } from "react-icons/lu";
import { GiRiver, GiAmericanFootballHelmet, GiForest } from "react-icons/gi";
import { CiRuler } from "react-icons/ci";
import { MdPhotoCamera } from "react-icons/md";


// ── Mock podaci ──────────────────────────────────────────────────────────────

const atrakcije = [
  {
    id: 1,
    naziv: "Vodopad Skakavac",
    slika: skakavac,
    opis:
      "Vodopad Skakavac, smješten u selu Žeravice kod Han Pijeska, predstavlja jednu od najimpresivnijih prirodnih atrakcija Romanijskog kraja. Nastao je djelovanjem vode kroz naslage sedrenih stijena, formirajući jedinstvenu travertinsku strukturu koja podsjeća na prirodni kameni baldahin. Okružen gustom četinarskom šumom i netaknutim planinskim pejzažem, pruža poseban osjećaj mira, svježine i povezanosti s prirodom. Zahvaljujući uređenoj planinarskoj stazi, lokalitet je danas pristupačan posjetiocima i predstavlja nezaobilaznu destinaciju za ljubitelje prirode, fotografije i aktivnog odmora.",
    tip: "Prirodna atrakcija",
    slug: "vodopad-skakavac",
    gradijent:
      "linear-gradient(135deg, #a3c4a8 0%, #588157 50%, #2a5a30 100%)",
    detalji: [
      { ikona: <FaMapLocationDot/>, labela: "Lokacija", vrijednost: "Žeravice" },
      { ikona: <FaWalking/>, labela: "Pristup", vrijednost: "Planinarska staza" },
      { ikona: <LuWaves/>, labela: "Posebnost", vrijednost: "Travertinski slap" },
    ],
  },

  {
    id: 2,
    naziv: "Kanjon rijeke Varošnice",
    slika: varosnica,
    opis:
      "Kanjon rijeke Varošnice, dug približno četiri kilometra, predstavlja jedan od najupečatljivijih prirodnih pejzaža opštine Han Pijesak. Duboko usječene stijene, bistri planinski tokovi i bogata vegetacija stvaraju ambijent netaknute divljine koji ostavlja snažan utisak na posjetioce. Posebnu atraktivnost lokalitetu daje spoj rijeke Varošnice sa potokom Skakavac, kao i prisustvo snažnih izvora koji ovom prostoru daju dodatnu hidrološku i ekološku vrijednost. Kanjon je idealno mjesto za planinarenje, istraživanje prirode i uživanje u autentičnoj planinskoj atmosferi.",
    tip: "Prirodna atrakcija",
    slug: "kanjon-varosnice",
    gradijent:
      "linear-gradient(135deg, #7ecbd4 0%, #3a8fa3 50%, #1a4a6a 100%)",
    detalji: [
      { ikona: <FaMapLocationDot/>, labela: "Lokacija", vrijednost: "Varošnica" },
      { ikona: <CiRuler/>, labela: "Dužina", vrijednost: "oko 4 km" },
      { ikona: <GiRiver/>, labela: "Ambijent", vrijednost: "Kanjon i izvori" },
    ],
  },

  {
    id: 3,
    naziv: "Pećinski kompleks Komnica",
    slika: pecina,
    opis:
      "Pećine Mala i Velika Komnica, smještene u blizini izletišta Komnica unutar vrha Veliki Žep, predstavljaju jedan od najmističnijih prirodnih lokaliteta Han Pijeska. Istraživanja speleologa pokazala su da Velika Komnica dostiže dužinu veću od 3 kilometra, dok istraživanja Male Komnice još uvijek nisu u potpunosti završena. Kompleks karakterišu podzemni hodnici, impresivne stijenske formacije i bogata geološka prošlost koja ga čini izuzetno vrijednim prirodnim fenomenom. Zbog zahtjevnog pristupa, pećine su dostupne isključivo uz odgovarajuću opremu i stručno vođstvo.",
    tip: "Prirodna atrakcija",
    slug: "pecine-komnica",
    gradijent:
      "linear-gradient(135deg, #b8a8c8 0%, #6a5888 50%, #2a1a48 100%)",
    detalji: [
      { ikona: <FaMapLocationDot/>, labela: "Lokacija", vrijednost: "Komnica" },
      { ikona: <GiAmericanFootballHelmet/>, labela: "Oprema", vrijednost: "Obavezna" },
      { ikona: <FaRegCompass/>, labela: "Pristup", vrijednost: "Uz stručnog vodiča" },
    ],
  },

  {
  id: 4,
  naziv: "Vazdušna banja Han Pijesak",
  slika: vazdusnaBanja,
  opis:
    "Han Pijesak je decenijama poznat po izuzetno čistom planinskom vazduhu i visokoj koncentraciji ozona, zbog čega je još početkom 20. vijeka prepoznat kao prirodna vazdušna banja. Spoj guste četinarske šume, planinske klime i netaknute prirode stvara ambijent koji pogoduje odmoru, rekreaciji i oporavku organizma. Upravo zbog ovih prirodnih karakteristika ovo područje ima snažan potencijal za razvoj zdravstvenog i wellness turizma.",
  tip: "Prirodna atrakcija",
  slug: "vazdusna-banja",
  gradijent:
    "linear-gradient(135deg, #cce8cc 0%, #74a57f 50%, #355e3b 100%)",
  detalji: [
    { ikona: <FaSnowflake/>, labela: "Posebnost", vrijednost: "Visoka koncentracija ozona" },
    { ikona: <GiForest/>, labela: "Ambijent", vrijednost: "Četinarske šume" },
    { ikona: <FaHandHoldingHeart/>, labela: "Potencijal", vrijednost: "Zdravstveni turizam" },
  ],
},

  {
    id: 5,
    naziv: "Vidikovci Javora",
    slika: vidikovac,
    opis:
      "Prirodni vidikovci Romanijskog područja pružaju spektakularne panoramske poglede na planinske lance, šumska prostranstva i doline istočne Bosne. Smješteni na uzvišenim tačkama, predstavljaju idealna mjesta za predah, fotografisanje i uživanje u pejzažu koji se mijenja kroz sva godišnja doba. Posebno su atraktivni u rano jutro i predvečerje, kada svjetlost dodatno naglašava reljef i prirodne kontraste krajolika. Ovi lokaliteti predstavljaju spoj mira, širine prostora i autentične ljepote Romanije.",
    tip: "Vidikovac",
    slug: "romanijski-vidikovci",
    gradijent:
      "linear-gradient(135deg, #d6e4f0 0%, #6c91bf 50%, #2d5d7b 100%)",
    detalji: [
      { ikona: <FaMapLocationDot/>, labela: "Područje", vrijednost: "Romanija" },
      { ikona: <MdPhotoCamera/>, labela: "Idealno za", vrijednost: "Fotografiju" },
      { ikona: <FaMountain/>, labela: "Doživljaj", vrijednost: "Panoramski pogled" },
    ],
  },
];

const prirodniSpomenici = [
  {
    naziv: "Maljava breza",
    latinskiNaziv: "Betula pubescens",
    opis:
      "Maljava breza predstavlja rijetku planinsku vrstu breze koja je prepoznatljiva po nježnim, blago dlakavim listovima i prilagođenosti hladnijim klimatskim uslovima. Na području Han Pijeska ima poseban značaj kao zaštićeni prirodni lokalitet i vrijedan dio biljnog biodiverziteta ovog kraja.",
    ikona: "🌳",
    boja: "#588157",
  },
  {
    naziv: "Zelena duglazija",
    latinskiNaziv: "Pseudotsuga menziesii",
    opis:
      "Grupa zelene duglazije na području Gornjeg Ljeskovca predstavlja vrijedan dendrološki lokalitet i zanimljiv primjer vrste koja se uspješno prilagodila planinskim uslovima Han Pijeska. Impozantna visina, snažno stablo i gusta krošnja čine ovu vrstu upečatljivim dijelom lokalnog pejzaža.",
    ikona: "🌲",
    boja: "#3a7a50",
  },
  {
    naziv: "Pančićeva omorika",
    latinskiNaziv: "Picea omorika",
    opis:
      "Pančićeva omorika jedna je od najrjeđih i najznačajnijih endemskih vrsta četinara Balkana. Poznata po elegantnom, uskom obliku krošnje i izuzetnoj otpornosti, predstavlja dragocjen dio prirodnog nasljeđa i simbol bogatstva flore ovog područja.",
    ikona: "🌿",
    boja: "#2a5a3a",
  },
];

// ── Scroll reveal hook ────────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("ATR_revealed"); obs.unobserve(el); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── Jedan red atrakcije (naizmjenično) ───────────────────────────────────────

function AtrakcijaPar({ atrakcija, index }) {
  const ref = useReveal();
  const jeParno = index % 2 === 0; // parno = slika lijevo, neparno = slika desno

  return (
    <div
      ref={ref}
      className={`ATR_par ATR_reveal${jeParno ? " ATR_par--normalno" : " ATR_par--obrnuto"}`}
    >
      {/* Slika */}
      <div className="ATR_par__slika-strana">
        <div className="ATR_par__slika-okvir">
          <img
            src={atrakcija.slika}
            className="ATR_par__slika-placeholder"
            
          />
          <div className="ATR_par__slika-overlay" />
          <span className="ATR_par__tip">{atrakcija.tip}</span>
          {/* Dekorativni krug */}
          <div className={`ATR_par__dekor${jeParno ? " ATR_par__dekor--desno" : " ATR_par__dekor--lijevo"}`} />
        </div>
      </div>

      {/* Tekst */}
      <div className="ATR_par__tekst-strana">
        <span className="ATR_par__broj">0{atrakcija.id}</span>
        <h2 className="ATR_par__naziv">{atrakcija.naziv}</h2>
        <p className="ATR_par__opis">{atrakcija.opis}</p>

        {/* Info detalji */}
        <div className="ATR_par__detalji">
          {atrakcija.detalji.map((d, i) => (
            <div key={i} className="ATR_par__detalj">
              <span className="ATR_par__detalj-ikona">{d.ikona}</span>
              <div>
                <span className="ATR_par__detalj-labela">{d.labela}</span>
                <span className="ATR_par__detalj-vrijednost">{d.vrijednost}</span>
              </div>
            </div>
          ))}
        </div>

        <Link to={`/atrakcije/${atrakcija.slug}`} className="ATR_par__dugme">
          Saznaj više →
        </Link>
      </div>
    </div>
  );
}

// ── Prirodni spomenik kartica ─────────────────────────────────────────────────

function SpomenikKartica({ s, index }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="ATR_spm ATR_reveal"
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      <div className="ATR_spm__glava" style={{ background: `${s.boja}18`, borderColor: `${s.boja}40` }}>
        <span className="ATR_spm__ikona">{s.ikona}</span>
        <div className="ATR_spm__header-info">
          <h3 className="ATR_spm__naziv">{s.naziv}</h3>
          <span className="ATR_spm__latinski">{s.latinskiNaziv}</span>
        </div>
        <div className="ATR_spm__linija" style={{ background: s.boja }} />
      </div>
      <div className="ATR_spm__tijelo">
        <p className="ATR_spm__opis">{s.opis}</p>
        <span className="ATR_spm__bedz" style={{ background: `${s.boja}18`, color: s.boja }}>
          Zaštićena vrsta
        </span>
      </div>
    </div>
  );
}

// ── Glavna stranica ───────────────────────────────────────────────────────────

function Atrakcije() {
  return (
    <section className="ATR_section">

      {/* ── 1. HERO ── */}
      <div className="ATR_hero">
        <div className="ATR_hero__img ATR_hero__img--placeholder" />
        <div className="ATR_hero__overlay" />
        <div className="ATR_hero__tekst">
          <span className="ATR_hero__bedz">Prirodne ljepote</span>
          <h1 className="ATR_hero__naslov">Atrakcije</h1>
          <p className="ATR_hero__podnaslov">
            Han Pijesak krije netaknutu prirodu — vodopade, kanjone i pećine
            koje čekaju da ih otkrijete.
          </p>
          <a href="#atrakcije" className="ATR_hero__dugme">Istraži ↓</a>
        </div>
      </div>

      {/* ── 2. ATRAKCIJE — naizmjenični layout ── */}
      <div className="ATR_lista-sekcija" id="atrakcije">
        <div className="ATR_lista-wrap">
          <span className="ATR_bedz--zeleni ATR_bedz--centar">Prirodne atrakcije</span>
          <h2 className="ATR_naslov">Otkrijte prirodu Han Pijeska</h2>
          <p className="ATR_podnaslov">
            Vodopadi, kanjoni i pećine — svaki kutak opštine krije nešto posebno
          </p>
          <div className="ATR_lista">
            {atrakcije.map((a, i) => (
              <AtrakcijaPar key={a.id} atrakcija={a} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. PRIRODNI SPOMENICI ── */}
      <div className="ATR_spm-sekcija">
        <div className="ATR_lista-wrap">
          <span className="ATR_bedz--zeleni ATR_bedz--centar">Botaničke vrijednosti</span>
          <h2 className="ATR_naslov">Prirodni spomenici</h2>
          <p className="ATR_podnaslov">
            Rijetke i zaštićene biljne vrste koje rastu na prostoru opštine Han Pijesak
          </p>
          <div className="ATR_spm-grid">
            {prirodniSpomenici.map((s, i) => (
              <SpomenikKartica key={i} s={s} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. CTA ── */}
      <div className="ATR_cta">
        <h2 className="ATR_cta__naslov">Istražite kulturno nasljeđe</h2>
        <p className="ATR_cta__tekst">
          Pored prirodnih ljepota, Han Pijesak čuva bogato istorijsko i kulturno nasljeđe.
        </p>
        <Link to="/znamenitosti" className="ATR_cta__btn ATR_cta__btn--primarni">
          Pogledaj znamenitosti
        </Link>
      </div>

    </section>
  );
}

export default Atrakcije;