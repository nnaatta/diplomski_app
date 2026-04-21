import React, { useState } from "react";
import "./LovIRibolov.css";

const lovInfoKartice = [
  {
    ikona: "🌲",
    naziv: "Šumska lovišta",
    tekst:
      "Bogati šumski kompleksi Javora — prirodno stanište krupne i sitne divljači.",
  },
  {
    ikona: "🦌",
    naziv: "Krupna divljač",
    tekst:
      "Srna, jelen, divlja svinja i druge vrste krupne divljači karakteristične za ovo područje.",
  },
  {
    ikona: "🏆",
    naziv: "Lovni turizam",
    tekst:
      "Razvijen komercijalni lov i lovnoturistička ponuda za domaće i strane goste.",
  },
];

const ribolovInfoKartice = [
  {
    ikona: "🐟",
    naziv: "Potočna pastrmka",
    tekst:
      "Jedina vrsta ribe u vodama — minimalna dužina za zadržavanje 25 cm.",
  },
  {
    ikona: "📅",
    naziv: "Sezona ribolova",
    tekst:
      "1. marta — 30. septembra · Isključivo na vještačke mamce.",
  },
  {
    ikona: "🌊",
    naziv: "Dva sliva",
    tekst:
      "Sliv rijeke Bosne (mušičarenje) i sliv Drine (varaličarenje).",
  },
];

const ribolovPravila = [
  "Ribolov isključivo na vještačke mamce",
  "Minimalna dužina ribe za zadržavanje: 25 cm",
  "Sezona: 1. marta — 30. septembra",
  "Obavezna ribolovna dozvola",
];

function LovRibolov() {
  const [aktivniTab, setAktivniTab] = useState("lov");

  return (
    <section className="lr">

      {/* ===== HERO ===== */}
      <div className="lr__hero">
        <p className="lr__hero-natpis">Istraži</p>
        <h1 className="lr__hero-naslov">Lov i ribolov</h1>
        <p className="lr__hero-podnaslov">
          Bogatstvo prirode  za ljubitelje lova i ribolova
        </p>
      </div>

      {/* ===== TABOVI ===== */}
      <div className="lr__tabovi">
        <button
          className={`lr__tab ${aktivniTab === "lov" ? "lr__tab--aktivan" : ""}`}
          onClick={() => setAktivniTab("lov")}
        >
          <span className="lr__tab-ikona">🦌</span>
          Lovačko udruženje
        </button>
        <button
          className={`lr__tab ${aktivniTab === "ribolov" ? "lr__tab--aktivan" : ""}`}
          onClick={() => setAktivniTab("ribolov")}
        >
          <span className="lr__tab-ikona">🎣</span>
          Ribolovno društvo
        </button>
      </div>

      {/* ===== LOV ===== */}
      {aktivniTab === "lov" && (
        <div className="lr__sadrzaj">

          {/* Kartica udruženja */}
          <div className="lr__sekcija">
            <div className="lr__drustvo-kartica">
              <div className="lr__drustvo-logo lr__drustvo-logo--lov">
                <span className="lr__drustvo-logo-ikona">🦌</span>
                <span className="lr__drustvo-logo-tekst">Logo udruženja</span>
              </div>
              <div className="lr__drustvo-info">
                <span className="lr__bedz lr__bedz--lov">Lovačko udruženje</span>
                <h2 className="lr__drustvo-naslov">
                  LU „Studena gora" Han Pijesak
                </h2>
                <p className="lr__drustvo-godina">
                  Osnovano 1956. godine · Član Lovačkog saveza RS
                </p>
                <p className="lr__drustvo-tekst">
                  Udruženje građana u kome se dobrovoljno okupljaju lovci radi
                  zaštite i uzgoja divljači, razvoja i unapređenja lovstva i
                  lovnog turizma, očuvanja prirode i životne sredine, sportskog
                  lova i lične rekreacije. Udruženje niže velike uspjehe u svim
                  oblastima lovstva.
                </p>
              </div>
            </div>
          </div>

          {/* O lovištu */}
          <div className="lr__sekcija lr__sekcija--alt">
            <div className="lr__sekcija-unutra">
              <div className="lr__sekcija-header">
                <span className="lr__bedz lr__bedz--lov">O lovištu</span>
                <h2 className="lr__sekcija-naslov">
                  Javor — stanište bogate divljači
                </h2>
                <p className="lr__sekcija-podnaslov">
                  Povoljna konfiguracija zemljišta, odgovarajuća klima i šumska
                  bogatstva
                </p>
              </div>

              <div className="lr__blok">
                <p className="lr__blok-tekst">
                  Povoljna konfiguracija zemljišta, odgovarajuća klima i šumska
                  bogatstva su osnovni činioci koji Han Pijesak čine izuzetnim
                  lovištem. Lovačko udruženje istražuje i planira odstrjel
                  divljači, ne bi li život u prirodi imao ravnotežu, a brojne
                  životinjske vrste bile sačuvane od prirodnog istrebljenja.
                </p>
                <div className="lr__foto lr__foto--lov">
                  {/* <img src="..." alt="Lovište Han Pijesak" /> */}
                </div>
              </div>

              <div className="lr__info-grid">
                {lovInfoKartice.map((k) => (
                  <div key={k.naziv} className="lr__info-kartica lr__info-kartica--zelena">
                    <span className="lr__info-ikona">{k.ikona}</span>
                    <h3 className="lr__info-naziv">{k.naziv}</h3>
                    <p className="lr__info-tekst">{k.tekst}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lovni turizam */}
          <div className="lr__sekcija">
            <div className="lr__sekcija-header">
              <span className="lr__bedz lr__bedz--lov">Lovni turizam</span>
              <h2 className="lr__sekcija-naslov">Lov kao turistička atrakcija</h2>
            </div>

            <div className="lr__blok lr__blok--obrnuto">
              <p className="lr__blok-tekst">
                Lovni turizam je jasno diferenciran od ostalih oblika turizma,
                ali u isto vrijeme komplementaran je sa mnogim drugim
                djelatnostima. Lovačko udruženje nastoji da svoju turističku
                ponudu prilagodi lovnim periodima, kako bi se zainteresovani
                lovci-turisti zadržali i nakon lova te upoznali ostale ljepote
                opštine Han Pijesak.
              </p>
              <div className="lr__foto lr__foto--lov">
                {/* <img src="..." alt="Lovni turizam" /> */}
              </div>
            </div>

            <div className="lr__citat">
              <p className="lr__citat-tekst">
                Danas lovstvo dobija novu ulogu — prepoznati prije svega kao
                zaštitnici prirodne sredine, lovci imaju veliku ulogu u očuvanju
                biodiverziteta i unapređenju populacije divljači.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* ===== RIBOLOV ===== */}
      {aktivniTab === "ribolov" && (
        <div className="lr__sadrzaj">

          {/* Kartica društva */}
          <div className="lr__sekcija">
            <div className="lr__drustvo-kartica">
              <div className="lr__drustvo-logo lr__drustvo-logo--riba">
                <span className="lr__drustvo-logo-ikona">🎣</span>
                <span className="lr__drustvo-logo-tekst">Logo društva</span>
              </div>
              <div className="lr__drustvo-info">
                <span className="lr__bedz lr__bedz--riba">Ribolovno društvo</span>
                <h2 className="lr__drustvo-naslov">SRD „Pištica" Han Pijesak</h2>
                <p className="lr__drustvo-godina">
                  Osnovano 1961. · Samostalno od 2002. godine
                </p>
                <p className="lr__drustvo-tekst">
                  Društvo samostalno gazduje ribolovnim vodama opštine Han
                  Pijesak od 2002. godine, kada se izdvojilo iz lovačkog
                  udruženja „Studena Gora". Vode ovog područja pripadaju
                  slivovima rijeke Bosne i Drine.
                </p>
              </div>
            </div>
          </div>

          {/* Ribolovne vode */}
          <div className="lr__sekcija lr__sekcija--alt">
            <div className="lr__sekcija-unutra">
              <div className="lr__sekcija-header">
                <span className="lr__bedz lr__bedz--riba">Ribolovne vode</span>
                <h2 className="lr__sekcija-naslov">
                  Kristalno čiste planinske rječice
                </h2>
              </div>

              <div className="lr__blok">
                <p className="lr__blok-tekst">
                  To su brze, kristalno čiste planinske rječice i potoci, bogate
                  kiseonikom i hranom — prirodno stanište potočne pastrmke.
                  Rječice sliva rijeke Bosne su pogodne za mušičarenje, dok su
                  rječice drinskog sliva pogodnije za varaličarenje. Ima dosta i
                  potočnog raka, koji dijeli životni prostor sa pastrmkom. Slivu
                  rijeke Drina pripada i vodotok „Rijeka" koja je ponornica.
                </p>
                <div className="lr__foto lr__foto--riba">
                  {/* <img src="..." alt="Ribolovne vode Han Pijesak" /> */}
                </div>
              </div>

              <div className="lr__info-grid">
                {ribolovInfoKartice.map((k) => (
                  <div key={k.naziv} className="lr__info-kartica lr__info-kartica--plava">
                    <span className="lr__info-ikona">{k.ikona}</span>
                    <h3 className="lr__info-naziv">{k.naziv}</h3>
                    <p className="lr__info-tekst">{k.tekst}</p>
                  </div>
                ))}
              </div>

              <div className="lr__pravila">
                <h3 className="lr__pravila-naslov">Pravila ribolova</h3>
                <ul className="lr__pravila-lista">
                  {ribolovPravila.map((p) => (
                    <li key={p} className="lr__pravila-stavka">{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      )}

    </section>
  );
}

export default LovRibolov;