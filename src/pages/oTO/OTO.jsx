import React from "react";
import "./OTO.css";
import { useTranslation } from "react-i18next";
import opstinaLogo from "../../assets/OpstinaLogo.png";
import COSLogo from "../../assets/COSPogledLogp.png";
import PedVisocnikLogo from "../../assets/PedVisocnikLogo.jpg";
import GorstakLogo from "../../assets/GorstakLogo.png";
import OTOStatistike from "../../components/OTOStatistike";
import sajamBG2026 from "../../assets/TOSajam.jpg";
import sajamBG2025 from "../../assets/TOSajam1.jpg";
import sajamNS2026 from "../../assets/SajamZavicaja.jpg";
import pohodSkakavac from "../../assets/TOSkakavac.jpg";
import manifestacija from "../../assets/TOManifestacija.jpg";
import sajam2024 from "../../assets/sajam2024.jpg";
import psuJavor from "../../assets/psuJavor.jpg";
import Seo from "../../components/Seo";

function OTO() {
  const { t } = useTranslation();

  const partneri = [
    { nazivKey: "partner_opstina", logo: opstinaLogo },
    { nazivKey: "partner_cos",     logo: COSLogo },
    { nazivKey: "partner_psu_visocnik", logo: PedVisocnikLogo },
    { nazivKey: "partner_gorstak", logo: GorstakLogo },
    { nazivKey: "partner_psu_javor", logo: psuJavor },
  ];

  const galerija = [
    { slika: sajamNS2026, opisKey: "galerija_opis_1" },
    { slika: sajamBG2026, opisKey: "galerija_opis_2" },
    { slika: pohodSkakavac, opisKey: "galerija_opis_3" },
    { slika: manifestacija, opisKey: "galerija_opis_4" },
    { slika: sajam2024,    opisKey: "galerija_opis_5" },
    { slika: sajamBG2025,  opisKey: "galerija_opis_6" },
  ];

  return (
    <section className="OTO_section">
      <Seo title={t("o_to.meta_title")} description={t("o_to.meta_description")} />

      {/* ===== HERO ===== */}
      <div className="OTO_hero">
        <h1>{t("o_to.hero_naslov")}</h1>
        <p>{t("o_to.hero_podnaslov")}</p>
      </div>

      {/* ===== STATISTIKE ===== */}
      <OTOStatistike />

      {/* ===== TEKST ===== */}
      <div className="OTO_tekst">
        <div className="OTO_tekst_misija">
          <h2>{t("o_to.misija_naslov")}</h2>
          <p>{t("o_to.misija_tekst")}</p>
        </div>
        <div className="OTO_tekst_vizija">
          <h2>{t("o_to.vizija_naslov")}</h2>
          <p>{t("o_to.vizija_tekst")}</p>
        </div>
        <div className="OTO_tekst_rad">
          <h2>{t("o_to.rad_naslov")}</h2>
          <ul>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <li key={n}>{t(`o_to.rad_stavka_${n}`)}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ===== GALERIJA ===== */}
      <div className="OTO_galerija">
        <h2 className="OTO_galerija_naslov">{t("o_to.galerija_naslov")}</h2>
        <p className="OTO_galerija_podnaslov">{t("o_to.galerija_podnaslov")}</p>
        <div className="OTO_galerija_grid">
          {galerija.map((g, i) => (
            <div key={i} className="OTO_galerija_item">
              <div className="OTO_galerija_slika_wrap">
                {g.slika
                  ? <img src={g.slika} alt={t(`o_to.${g.opisKey}`)} className="OTO_galerija_slika" loading="lazy" />
                  : <div className="OTO_galerija_placeholder" />
                }
              </div>
              <p className="OTO_galerija_opis">{t(`o_to.${g.opisKey}`)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== PARTNERI ===== */}
      <div className="OTO_partneri">
        <h2 className="OTO_partneri_naslov">{t("o_to.partneri_naslov")}</h2>
        <div className="OTO_partneri_grid">
          {partneri.map((p) => (
            <div key={p.nazivKey} className="OTO_partner">
              <div className="OTO_partner_logo">
                <img src={p.logo} alt={t(`o_to.${p.nazivKey}`)} loading="lazy" />
              </div>
              <p className="OTO_partner_naziv">{t(`o_to.${p.nazivKey}`)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== KONTAKT ===== */}
      <div className="OTO_kontakt">
        <h2 className="OTO_kontakt_naslov">{t("o_to.kontakt_naslov")}</h2>
        <div className="OTO_kontakt_grid">
          <div className="OTO_kontakt_osoba">
            <img src="" alt={t("o_to.kontakt_alt")} loading="lazy" />
            <span className="ime">{t("o_to.kontakt_ime")}</span>
            <span className="titula">{t("o_to.kontakt_titula")}</span>
          </div>
          <div className="OTO_kontakt_kartica">
            <address>
              <h2>{t("o_to.kontakt_kartica_naslov")}</h2>
              <p>{t("o_to.kontakt_adresa")}</p>
              <p>{t("o_to.kontakt_telefon")}</p>
              <p>{t("o_to.kontakt_email")}</p>
            </address>
          </div>
        </div>
      </div>

    </section>
  );
}

export default OTO;