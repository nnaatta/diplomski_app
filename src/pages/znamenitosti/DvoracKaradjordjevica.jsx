import React, { useState } from "react";
import "./DvoracKaradjordjevica.css";
import { Link } from "react-router-dom";

import dvorac1 from "../../assets/Znamenitosti/dvorac1.jpg"
import dvorac2 from "../../assets/Znamenitosti/dvorac2.jpg"
import dvorac3 from "../../assets/Znamenitosti/dvorac3.jpg"
import dvorac4 from "../../assets/Znamenitosti/dvorac4.jpg"
import dvorac5 from "../../assets/Znamenitosti/dvorac5.jpg"
import dvorac6 from "../../assets/Znamenitosti/dvorac6.jpg"
import { MdOutlineMuseum } from "react-icons/md";
import { FaWineGlassAlt, FaTheaterMasks } from "react-icons/fa";
import { IoMdBed } from "react-icons/io";




// ── Mock podaci ──────────────────────────────────────────────────────────────

const historijaStavke = [
  {
    godina: "1919–1924",
    naslov: "Izgradnja dvorca",
    tekst: "Krajem 19. i početkom 20. vijeka područje Han Pijeska privuklo je pažnju austrougarskih stručnjaka koji su vršili mjerenja kvaliteta vazduha. Utvrđeno je da ovaj kraj ima izuzetno visoku koncentraciju ozona, zbog čega je smatran prirodnom vazdušnom banjom i idealnim mjestom za odmor i oporavak.\n\nNa osnovu tih saznanja donijeta je odluka da se na ovom prostoru izgradi kraljevska rezidencija. Gradnja dvorca započela je 1919. godine po nalogu kralja Aleksandra Karađorđevića, a završena već nakon dvije godine.\n\nDo 1924. godine kompletiran je i širi kompleks sa pratećim objektima, čime je stvoren reprezentativan prostor za boravak kraljevske porodice i visokih državnih zvaničnika.",
    slika: dvorac1
  },
  {
    godina: "1920–1941",
    naslov: "Zlatno doba",
    tekst: "U periodu između dva svjetska rata dvorac je bio jedno od najvažnijih mjesta okupljanja političke i društvene elite tadašnje države. Kralj Aleksandar Karađorđević često je boravio ovdje sa porodicom, koristeći dvorac kako za odmor, tako i za obavljanje državničkih poslova.\n\nRezidenciju su posjećivali brojni ministri, generali i strani državnici. Među značajnim gostima bio je i Kemal Ataturk, kao i turski premijer Ismet Inönü, što govori o međunarodnom značaju ovog mjesta.\n\nDvorac je u tom periodu predstavljao simbol prestiža, političke moći i razvoja Han Pijeska kao elitne destinacije.",
    slika: dvorac2
 
  },
  {
    godina: "1941–1945",
    naslov: "Drugi svjetski rat",
    tekst: "Tokom Drugog svjetskog rata dvorac je dobio potpuno drugačiju ulogu i našao se u središtu ratnih dešavanja. U vrijeme Aprilskog rata 1941. godine, kralj Petar II Karađorđević boravio je u dvorcu tokom povlačenja zajedno sa pratnjom i dijelom državnog aparata.\n\nZbog svog značaja i položaja objekat je ubrzo postao meta neprijateljskih snaga. Lokacija dvorca je otkrivena, nakon čega je uslijedio napad njemačke avijacije.\n\nU tim dramatičnim okolnostima kraljevska porodica bila je primorana na hitno napuštanje objekta, koristeći tajni izlaz i tunel u neposrednoj blizini dvorca. Nakon bijega nastavili su put prema sigurnijim područjima.\n\nSam dvorac je tokom rata pretrpio značajna oštećenja, a njegova prvobitna funkcija kraljevske rezidencije potpuno je prekinuta.",
    slika: dvorac3
    
  },
  {
    godina: "1945–1991",
    naslov: "Titovo doba",
    tekst: "Nakon završetka rata dvorac je obnovljen 1946. godine i prilagođen novim društveno-političkim okolnostima. U periodu socijalističke Jugoslavije objekat dobija novu namjenu i postaje poznat kao „Titov dvorac“.\n\nIako više nije imao kraljevsku funkciju, dvorac je i dalje zadržao određeni značaj kao reprezentativni objekat. Koristio se za boravak političkih i vojnih zvaničnika, ali i kao mjesto za odmor i povremene sastanke.\n\nVremenom je značaj dvorca počeo da opada. Promjene u društvu i nedovoljno ulaganje u održavanje doveli su do postepenog zapuštanja objekta.\n\nIako je formalno bio u funkciji, izgubio je dio svog nekadašnjeg sjaja i prestižne uloge koju je imao u prethodnom periodu.",
    slika: dvorac4
    
  },
  {
    godina: "2005",
    naslov: "Požar",
    tekst: "Jedan od najtežih trenutaka u istoriji dvorca dogodio se 2005. godine, kada je kompleks zahvatio veliki požar. U tom događaju objekat je gotovo u potpunosti uništen, a veliki dio njegove strukture i unutrašnjosti nepovratno izgubljen.\n\nPožar je ostavio dubok trag ne samo na samom objektu, već i u svijesti lokalne zajednice. Dvorac, koji je decenijama bio simbol istorije i identiteta ovog kraja, pretvoren je u ruševinu.\n\nNakon požara objekat je dugi niz godina ostao zapušten i bez adekvatne zaštite, ali je uprkos tome sačuvan njegov istorijski značaj i potencijal za obnovu.",
    slika: dvorac5
    
  },
  {
    godina: "2020–danas",
    naslov: "Početak obnove",
    tekst: "U posljednjim godinama pokrenut je proces obnove dvorca sa ciljem da mu se vrati nekadašnji izgled i značaj. Radovi se izvode uz nadzor institucija za zaštitu kulturno-istorijskog nasljeđa.\n\nRekonstrukcija je koncipirana tako da što vjernije prati originalni izgled iz vremena Karađorđevića, uz minimalne prilagodbe savremenim standardima.\n\nPlanirano je da dvorac dobije višestruku funkciju, uključujući muzej, reprezentativne apartmane, vinski podrum i prostor za održavanje događaja.\n\nObnova ovog kompleksa predstavlja važan korak ka očuvanju kulturne baštine i značajan potencijal za razvoj turizma u regionu.",
    slika: dvorac6
  
  },
];

const buducnostStavke = [
  {
    ikona: <MdOutlineMuseum/>,
    naziv: "Muzej",
    opis: "Stalni postav o historiji dvoraca i kraljevske porodice Karađorđević.",
  },
  {
    ikona: <FaWineGlassAlt/>,
    naziv: "Vinska podrumska",
    opis: "Degustacioni centar lokalnih vina i rakija u autentičnom ambijentu.",
  },
  {
    ikona: <IoMdBed/>,
    naziv: "Apartmani",
    opis: "Luksuzni smještaj u obnovljenim krilima dvorca za posebna iskustva.",
  },
  {
    ikona: <FaTheaterMasks/>,
    naziv: "Event prostor",
    opis: "Svečana dvorana za konferencije, vjenčanja i kulturne manifestacije.",
  },
];

const galerija = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  opis: [
    "Fasada dvorca",
    "Unutrašnjost",
    "Vrtovi",
    "Panorama",
    "Historijska fotografija",
    "Detalj arhitekture",
  ][i],
}));

function DvoracKaradjordjevica() {
  const [aktivnaHistorija, setAktivnaHistorija] = useState(0);

  return (
    <section className="DVR_section">
      {/* ── 1. HERO ── */}
      <div className="DVR_hero">
        <div className="DVR_hero__img DVR_hero__img--placeholder" />
        <div className="DVR_hero__overlay" />
        <div className="DVR_hero__tekst">
          <span className="DVR_hero__bedz">Kraljevska rezidencija</span>
          <h1 className="DVR_hero__naslov">Dvorac Karađorđevića</h1>
          <p className="DVR_hero__podnaslov">
            Impozantna svjedočanstvo kraljevske prošlosti Han Pijeska, izgrađena
            1919–1924. godine za kralja Aleksandra.
          </p>
        </div>
        <Link to="/znamenitosti" className="DVR_hero__nazad">
          ← Znamenitosti
        </Link>
      </div>

      {/* ── 2. O DVORCU ── */}
      <div className="DVR_o-dvorcu">
        <div className="DVR_wrap">
          <div className="DVR_o-dvorcu__grid">
            <div className="DVR_o-dvorcu__tekst">
              <span className="DVR_bedz--zeleni">O objektu</span>
              <h2 className="DVR_o-dvorcu__naslov">Istorija i značaj</h2>
              <p>
                Dvorac Karađorđevića jedna je od najznačajnijih istorijskih
                građevina na prostoru opštine Han Pijesak. Izgrađen između 1919.
                i 1924. godine kao ljetnja rezidencija kralja Aleksandra
                Karađorđevića, dvorac je bio poznat po izuzetnom kvalitetu
                planinskog vazduha i visokoj koncentraciji ozona.
              </p>
              <p>
                Smješten na nadmorskoj visini od oko 1.100 metara, pružao je
                savršeno mjesto za odmor i državne poslove daleko od gradske
                vreve. Tokom svog zlatnog doba bio je centar društvenog i
                diplomatskog života kraljevske Jugoslavije.
              </p>
              <p>
                Nakon Drugog svjetskog rata promijenio je namjenu i koristio ga
                je Josip Broz Tito. Tragični požar 2005. godine uništio je
                veliki dio originalnih unutrašnjih elemenata, ali zidine
                svjedoče o nekadašnjoj veličanstvenosti objekta.
              </p>
            </div>
            <div className="DVR_o-dvorcu__info-kolona">
              {[
                { labela: "Godina izgradnje", vrijednost: "1919–1924." },
                {
                  labela: "Naručilac",
                  vrijednost: "Kralj Aleksandar Karađorđević",
                },
                { labela: "Nadmorska visina", vrijednost: "~1.100 m" },
                {
                  labela: "Stil gradnje",
                  vrijednost: "Austrougarski romantizam",
                },
                { labela: "Turistički značaj", 
                  vrijednost: "Kulturno-istorijski spomenik"  },
              ].map((s) => (
                <div key={s.labela} className="DVR_info-stavka">
                  <span className="DVR_info-stavka__labela">{s.labela}</span>
                  <span className="DVR_info-stavka__vrijednost">
                    {s.vrijednost}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. HISTORIJA — timeline ── */}
      <div className="DVR_historija">
        <div className="DVR_wrap">
          <span className="DVR_bedz--zeleni DVR_bedz--centar">
            Kroz vjekove
          </span>
          <h2 className="DVR_naslov">Istorija dvorca</h2>
          <p className="DVR_podnaslov">
            Sto godina burne istorije kroz ratove, vladare i promjene
          </p>

          <div className="DVR_timeline">
            {/* Navigacija */}
            <div className="DVR_timeline__nav">
              {historijaStavke.map((s, i) => (
                <button
                  key={i}
                  className={`DVR_timeline__nav-btn${i === aktivnaHistorija ? " DVR_timeline__nav-btn--aktivan" : ""}`}
                  onClick={() => setAktivnaHistorija(i)}
                >
                  <span className="DVR_timeline__nav-godina">{s.godina}</span>
                  <span className="DVR_timeline__nav-naslov">{s.naslov}</span>
                </button>
              ))}
            </div>

            {/* Sadržaj */}
            <div className="DVR_timeline__sadrzaj">
              <div className="DVR_timeline__slika-wrap">
                <img src={historijaStavke[aktivnaHistorija].slika} alt={historijaStavke[aktivnaHistorija].naslov}/>
              </div>
              <div className="DVR_timeline__info">
                <span className="DVR_timeline__godina">
                  {historijaStavke[aktivnaHistorija].godina}
                </span>
                <h3 className="DVR_timeline__naslov">
                  {historijaStavke[aktivnaHistorija].naslov}
                </h3>
                <p className="DVR_timeline__tekst">
                  {historijaStavke[aktivnaHistorija].tekst}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. DANAS I BUDUĆNOST ── */}
      <div className="DVR_buducnost">
        <div className="DVR_wrap">
          <span className="DVR_bedz--zeleni DVR_bedz--centar">
            Obnova i razvoj
          </span>
          <h2 className="DVR_naslov">Danas i budućnost</h2>
          <p className="DVR_podnaslov">
            Dvorac ulazi u novu eru — planirani sadržaji koji će ga pretvoriti u
            kulturno-turistički centar regije
          </p>
          <div className="DVR_buducnost__grid">
            {buducnostStavke.map((b) => (
              <div key={b.naziv} className="DVR_buducnost__stavka">
                <span className="DVR_buducnost__ikona">{b.ikona}</span>
                <h3 className="DVR_buducnost__naziv">{b.naziv}</h3>
                <p className="DVR_buducnost__opis">{b.opis}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 5. GALERIJA ── */}
      <div className="DVR_galerija">
        <div className="DVR_wrap">
          <span className="DVR_bedz--zeleni DVR_bedz--centar">Fotografije</span>
          <h2 className="DVR_naslov">Galerija</h2>
          <p className="DVR_podnaslov">
            Dvorac kroz objektiv — istorija i sadašnjost
          </p>
          <div className="DVR_galerija__grid">
            {galerija.map((g, i) => (
              <div
                key={g.id}
                className={`DVR_galerija__item${i === 0 ? " DVR_galerija__item--velika" : ""}`}
              >
                <div className="DVR_galerija__placeholder" />
                <span className="DVR_galerija__opis">{g.opis}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 6. CTA ── */}
      <div className="DVR_cta">
        <h2 className="DVR_cta__naslov">Posjetite Han Pijesak</h2>
        <p className="DVR_cta__tekst">
          Planirajte posjetu i uronite u bogatu historiju ove planinske opštine.
        </p>
        <div className="DVR_cta__dugmad">
          <Link to="/smjestaj" className="DVR_cta__btn DVR_cta__btn--primarni">
            Pronađi smještaj
          </Link>
          <Link
            to="/znamenitosti"
            className="DVR_cta__btn DVR_cta__btn--sekundarni"
          >
            ← Sve znamenitosti
          </Link>
        </div>
      </div>
    </section>
  );
}

export default DvoracKaradjordjevica;
