import React, { useState } from "react";
import "./DvoracKaradjordjevica.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import dvorac1 from "../../assets/Znamenitosti/dvorac1.jpg";
import dvorac2 from "../../assets/Znamenitosti/dvorac2.jpg";
import dvorac3 from "../../assets/Znamenitosti/dvorac3.jpg";
import dvorac4 from "../../assets/Znamenitosti/dvorac4.jpg";
import dvorac5 from "../../assets/Znamenitosti/dvorac5.jpg";
import dvorac6 from "../../assets/Znamenitosti/dvorac6.jpg";
import { MdOutlineMuseum } from "react-icons/md";
import { FaWineGlassAlt, FaTheaterMasks } from "react-icons/fa";
import { IoMdBed } from "react-icons/io";

const historijaSlike = [dvorac1, dvorac2, dvorac3, dvorac4, dvorac5, dvorac6];

const buducnostIkone = [
  <MdOutlineMuseum />, <FaWineGlassAlt />, <IoMdBed />, <FaTheaterMasks />,
];

const infoStavkeKljucevi = [
  { labela: "info_izgradnja_labela",  vrijednost: "info_izgradnja_vrijednost" },
  { labela: "info_narucilac_labela",  vrijednost: "info_narucilac_vrijednost" },
  { labela: "info_visina_labela",     vrijednost: "info_visina_vrijednost" },
  { labela: "info_stil_labela",       vrijednost: "info_stil_vrijednost" },
  { labela: "info_znacaj_labela",     vrijednost: "info_znacaj_vrijednost" },
];

function DvoracKaradjordjevica() {
  const [aktivnaHistorija, setAktivnaHistorija] = useState(0);
  const { t } = useTranslation();

  const historijaStavke = [1, 2, 3, 4, 5, 6].map((n, i) => ({
    godina: t(`dvorac.hist_${n}_godina`),
    naslov: t(`dvorac.hist_${n}_naslov`),
    tekst:  t(`dvorac.hist_${n}_tekst`),
    slika:  historijaSlike[i],
  }));

  const buducnostStavke = [1, 2, 3, 4].map((n, i) => ({
    ikona: buducnostIkone[i],
    naziv: t(`dvorac.bud_${n}_naziv`),
    opis:  t(`dvorac.bud_${n}_opis`),
  }));

  return (
    <section className="DVR_section">

      {/* ── 1. HERO ── */}
      <div className="DVR_hero">
        <img src={dvorac1} className="DVR_hero__img DVR_hero__img--placeholder" alt={t("dvorac.hero_alt")} />
        <div className="DVR_hero__overlay" />
        <div className="DVR_hero__tekst">
          <span className="DVR_hero__bedz">{t("dvorac.hero_bedz")}</span>
          <h1 className="DVR_hero__naslov">{t("dvorac.hero_naslov")}</h1>
          <p className="DVR_hero__podnaslov">{t("dvorac.hero_podnaslov")}</p>
        </div>
        <Link to="/znamenitosti" className="DVR_hero__nazad">
          {t("dvorac.hero_nazad")}
        </Link>
      </div>

      {/* ── 2. O DVORCU ── */}
      <div className="DVR_o-dvorcu">
        <div className="DVR_wrap">
          <div className="DVR_o-dvorcu__grid">
            <div className="DVR_o-dvorcu__tekst">
              <span className="DVR_bedz--zeleni">{t("dvorac.o_bedz")}</span>
              <h2 className="DVR_o-dvorcu__naslov">{t("dvorac.o_naslov")}</h2>
              <p>{t("dvorac.o_p1")}</p>
              <p>{t("dvorac.o_p2")}</p>
              <p>{t("dvorac.o_p3")}</p>
            </div>
            <div className="DVR_o-dvorcu__info-kolona">
              {infoStavkeKljucevi.map((s) => (
                <div key={s.labela} className="DVR_info-stavka">
                  <span className="DVR_info-stavka__labela">{t(`dvorac.${s.labela}`)}</span>
                  <span className="DVR_info-stavka__vrijednost">{t(`dvorac.${s.vrijednost}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. HISTORIJA — timeline ── */}
      <div className="DVR_historija">
        <div className="DVR_wrap">
          <span className="DVR_bedz--zeleni DVR_bedz--centar">{t("dvorac.hist_bedz")}</span>
          <h2 className="DVR_naslov">{t("dvorac.hist_naslov")}</h2>
          <p className="DVR_podnaslov">{t("dvorac.hist_podnaslov")}</p>
          <div className="DVR_timeline">
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
            <div className="DVR_timeline__sadrzaj">
              <div className="DVR_timeline__slika-wrap">
                <img
                  src={historijaStavke[aktivnaHistorija].slika}
                  alt={historijaStavke[aktivnaHistorija].naslov}
                  className="DVR_timeline__slika"
                />
              </div>
              <div className="DVR_timeline__info">
                <span className="DVR_timeline__godina">{historijaStavke[aktivnaHistorija].godina}</span>
                <h3 className="DVR_timeline__naslov">{historijaStavke[aktivnaHistorija].naslov}</h3>
                <p className="DVR_timeline__tekst">{historijaStavke[aktivnaHistorija].tekst}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. BUDUĆNOST ── */}
      <div className="DVR_buducnost">
        <div className="DVR_wrap">
          <span className="DVR_bedz--zeleni DVR_bedz--centar">{t("dvorac.bud_bedz")}</span>
          <h2 className="DVR_naslov">{t("dvorac.bud_naslov")}</h2>
          <p className="DVR_podnaslov">{t("dvorac.bud_podnaslov")}</p>
          <div className="DVR_buducnost__grid">
            {buducnostStavke.map((b, i) => (
              <div key={i} className="DVR_buducnost__stavka">
                <span className="DVR_buducnost__ikona">{b.ikona}</span>
                <h3 className="DVR_buducnost__naziv">{b.naziv}</h3>
                <p className="DVR_buducnost__opis">{b.opis}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 5. CTA ── */}
      <div className="DVR_cta">
        <h2 className="DVR_cta__naslov">{t("dvorac.cta_naslov")}</h2>
        <p className="DVR_cta__tekst">{t("dvorac.cta_tekst")}</p>
        <div className="DVR_cta__dugmad">
          <Link to="/smjestaj" className="DVR_cta__btn DVR_cta__btn--primarni">
            {t("dvorac.cta_smjestaj")}
          </Link>
          <Link to="/znamenitosti" className="DVR_cta__btn DVR_cta__btn--sekundarni">
            {t("dvorac.cta_nazad")}
          </Link>
        </div>
      </div>

    </section>
  );
}

export default DvoracKaradjordjevica;