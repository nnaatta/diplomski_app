import React from "react";
import "./OTO.css";
import opstinaLogo from "../../assets/OpstinaLogo.png";
import COSLogo from "../../assets/COSPogledLogp.png";
import PedVisocnikLogo from "../../assets/PedVisocnikLogo.jpg";
import GorstakLogo from "../../assets/GorstakLogo.png";
import OTOStatistike from "../../components/OTOStatistike";
import sajamBG2026 from "../../assets/TOSajam.jpg";
import sajamBG2025 from "../../assets/TOSajam1.jpg";
import sajamNS2026 from "../../assets/SajamZavicaja.jpg";
import pohodSkakavac from "../../assets/TOSkakavac.jpg";
import manifestacija from "../../assets/TOManifestacija.jpg"
import sajam2024 from "../../assets/sajam2024.jpg";
import psuJavor from "../../assets/psuJavor.jpg";






const partneri = [
  { naziv: "Opština Han Pijesak",            logo: opstinaLogo },
  { naziv: "Centar za omladinu i sport Pogled", logo: COSLogo },
  { naziv: "PSU Visočnik",                   logo: PedVisocnikLogo },
  { naziv: "Gorštak",                        logo: GorstakLogo },
  {naziv: "PSU Javor - sunčana planina", logo: psuJavor}  
];

const galerija = [
  { slika: sajamNS2026, opis: 'Sajam zavicaja Novi Sad 2026.' },
  { slika: sajamBG2026, opis: 'Sajam turizma Beograd 2026.' },
  { slika: pohodSkakavac, opis: 'Planinarski pohod — Skakavac' },
  { slika: manifestacija, opis: 'Kulturno-turistička manifestacija' },
  { slika: sajam2024, opis: 'Sajam turizma Novi sad 2024.' },
  { slika: sajamBG2025, opis: 'Sajam turizma Banja Luka 2026.' },
];

function OTO() {
  return (
    <section className="OTO_section">

      {/* ===== HERO ===== */}
      <div className="OTO_hero">
        <h1>O Turističkoj organizaciji opštine Han Pijesak</h1>
        <p>Upoznajte bolje naš rad i djelovanje</p>
      </div>

      {/* ===== STATISTIKE ===== */}
      <OTOStatistike />

      {/* ===== TEKST ===== */}
      <div className="OTO_tekst">
        <div className="OTO_tekst_misija">
          <h2>Misija</h2>
          <p>
            Turistička organizacija opštine Han Pijesak osnovana je 2023. godine
            kao najmlađa javna ustanova na području opštine, a sa radom počela
            2024. godine. Njen osnovni cilj je promocija Han Pijeska kao
            turističke destinacije, razvoj turističke ponude i pozicioniranje
            opštine kao prepoznatljive vazdušne banje na turističkoj mapi Bosne
            i Hercegovine.
          </p>
        </div>
        <div className="OTO_tekst_vizija">
          <h2>Vizija</h2>
          <p>
            Han Pijesak kao atraktivna, održiva i prepoznatljiva planinska
            destinacija koja turistima nudi jedinstven spoj čistog planinskog
            zraka, netaknute prirode, bogate kulturne baštine i autentičnog
            gostoprimstva — tokom cijele godine.
          </p>
        </div>
        <div className="OTO_tekst_rad">
          <h2>Šta radimo?</h2>
          <ul>
            <li>Promocija Han Pijeska na sajmovima turizma u regionu</li>
            <li>Organizacija i podrška kulturno-turističkim manifestacijama</li>
            <li>Kategorizacija smještajnih objekata</li>
            <li>Izrada turističkih materijala i brošura</li>
            <li>Saradnja sa planinarskim i sportskim udruženjima</li>
            <li>Edukacija i razvoj turističkih kapaciteta</li>
          </ul>
        </div>
      </div>

      {/* ===== GALERIJA ===== */}
      <div className="OTO_galerija">
        <h2 className="OTO_galerija_naslov">Naše aktivnosti</h2>
        <p className="OTO_galerija_podnaslov">
          Pogledajte kako TO Han Pijesak aktivno promoviše destinaciju
        </p>
        <div className="OTO_galerija_grid">
          {galerija.map((g, i) => (
            <div key={i} className="OTO_galerija_item">
              <div className="OTO_galerija_slika_wrap">
                {g.slika
                  ? <img src={g.slika} alt={g.opis} className="OTO_galerija_slika" />
                  : <div className="OTO_galerija_placeholder" />
                }
              </div>
              <p className="OTO_galerija_opis">{g.opis}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== PARTNERI ===== */}
      <div className="OTO_partneri">
        <h2 className="OTO_partneri_naslov">Naši partneri</h2>
        <div className="OTO_partneri_grid">
          {partneri.map((p) => (
            <div key={p.naziv} className="OTO_partner">
              <div className="OTO_partner_logo">
                <img src={p.logo} alt={p.naziv} />
              </div>
              <p className="OTO_partner_naziv">{p.naziv}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== KONTAKT ===== */}
      <div className="OTO_kontakt">
        <h2 className="OTO_kontakt_naslov">Kontaktirajte nas</h2>
        <div className="OTO_kontakt_grid">
          <div className="OTO_kontakt_osoba">
            <img src="" alt="kontakt osoba" />
            <span className="ime">Svjetlana Tomović</span>
            <span className="titula">Direktor</span>
          </div>
          <div className="OTO_kontakt_kartica">
            <address>
              <h2>Kontakt</h2>
              <p>Adresa: Aleksandra Karađorđevića br. 4</p>
              <p>Telefon: +387 66 787 850</p>
              <p>Email: tohanpijesak@gmail.com</p>
            </address>
          </div>
        </div>
      </div>

    </section>
  );
}

export default OTO;