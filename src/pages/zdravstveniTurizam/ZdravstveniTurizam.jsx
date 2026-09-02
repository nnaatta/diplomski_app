import React from "react";
import "./ZdravstveniTurizam.css";
import { useTranslation } from "react-i18next";
import { IoMdCheckbox } from "react-icons/io";
import { MdForest } from "react-icons/md";
import {
  FaWind,
  FaPersonHiking,
  FaBicycle,
  FaTreeCity,
  FaCloudSun,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import UticajNaZdravlje from "../../components/UticajNaZdravlje";
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
import ImageSlider from "../../components/ImageSlider";
import Seo from "../../components/Seo";

const slajdoviSlike = [
  slika12, slika5, slika1, slika13, heroSlika,
  slika3, slika4, slika6, slika7, slika8, slika9, slika10, slika11,
];

const aktivnostiIkone = [
  <FaPersonHiking />, <FaBicycle />, <FaTreeCity />, <FaCloudSun />,
];

const aktivnostiLinkovi = [
  "/aktivni-odmor", "/aktivni-odmor", "/aktivni-odmor", "/smjestaj",
];

function ZdravstveniTurizam() {
  const { t } = useTranslation();

  const slajdovi = slajdoviSlike.map((slika, i) => ({
    slika,
    opis: t(`zdravstveni_turizam.slajd_${i + 1}_opis`),
  }));

  const aktivnosti = [1, 2, 3, 4].map((n, i) => ({
    ikona: aktivnostiIkone[i],
    naziv: t(`zdravstveni_turizam.aktivnost_${n}_naziv`),
    opis:  t(`zdravstveni_turizam.aktivnost_${n}_opis`),
    link:  aktivnostiLinkovi[i],
  }));

  return (
    <section className="ZT_section">
      <Seo title={t("zdravstveni_turizam.meta_title")} description={t("zdravstveni_turizam.meta_description")} />

      {/* 1. HERO */}
      <div className="ZT_hero">
        <img src={heroSlika} alt="Han Pijesak" className="ZT_hero__img" />
        <div className="ZT_hero__overlay" />
        <div className="ZT_hero__tekst">
          <span className="ZT_hero__bedz">{t("zdravstveni_turizam.hero_bedz")}</span>
          <h1 className="ZT_hero__naslov">{t("zdravstveni_turizam.hero_naslov")}</h1>
          <p className="ZT_hero__podnaslov">{t("zdravstveni_turizam.hero_podnaslov")}</p>
          <a href="#zasto" className="ZT_hero__dugme">
            {t("zdravstveni_turizam.hero_dugme")}
          </a>
        </div>
      </div>

      {/* 2. STATS BAR */}
      <div className="ZT_stats">
        <div className="ZT_stats__stavka">
          <span className="ZT_stats__broj">70%</span>
          <span className="ZT_stats__opis">{t("zdravstveni_turizam.stat_sume")}</span>
        </div>
        <div className="ZT_stats__stavka">
          <span className="ZT_stats__broj">1.100 m</span>
          <span className="ZT_stats__opis">{t("zdravstveni_turizam.stat_visina")}</span>
        </div>
        <div className="ZT_stats__stavka">
          <span className="ZT_stats__broj">2023.</span>
          <span className="ZT_stats__opis">{t("zdravstveni_turizam.stat_proglasenje")}</span>
        </div>
        <div className="ZT_stats__stavka">
          <span className="ZT_stats__broj">900 m</span>
          <span className="ZT_stats__opis">{t("zdravstveni_turizam.stat_centar")}</span>
        </div>
      </div>

      {/* 3. ZAŠTO VAZDUŠNA BANJA */}
      <div className="ZT_zasto" id="zasto">
        <div className="ZT_zasto__objasnjenje">
          <span className="ZT_bedz--zeleni">{t("zdravstveni_turizam.zasto_bedz")}</span>
          <h2>{t("zdravstveni_turizam.zasto_naslov")}</h2>
          <p>{t("zdravstveni_turizam.zasto_p1")}</p>
          <p>{t("zdravstveni_turizam.zasto_p2")}</p>
          <div className="ZT_zasto__akcenat">
            <span className="ZT_zasto__godina">2023.</span>
            <span className="ZT_zasto__godina-opis">{t("zdravstveni_turizam.zasto_akcenat")}</span>
          </div>
        </div>
        <div className="ZT_zasto__institucije">
          <span className="ZT_bedz--zeleni">{t("zdravstveni_turizam.institucije_bedz")}</span>
          <h2>{t("zdravstveni_turizam.institucije_naslov")}</h2>
          <ul>
            {[1, 2, 3, 4].map((n) => (
              <li key={n} className="ZT_institucija">
                <IoMdCheckbox className="ZT_check" />
                <span>{t(`zdravstveni_turizam.institucija_${n}`)}</span>
              </li>
            ))}
          </ul>
          <p className="ZT_zasto__napomena">{t("zdravstveni_turizam.institucije_napomena")}</p>
        </div>
      </div>

      {/* 4. SLIDER */}
      <div className="ZT_slider">
        <h2 className="ZT_slider__naslov">{t("zdravstveni_turizam.slider_naslov")}</h2>
        <p className="ZT_slider__podnaslov">{t("zdravstveni_turizam.slider_podnaslov")}</p>
        <div className="ZT_slider__wrap">
          <ImageSlider slajdovi={slajdovi} visina="460px" interval={4000} />
        </div>
      </div>

      {/* 5. KVALITET VAZDUHA */}
      <div className="ZT_kvalitet">
        <div className="ZT_kvalitet__wrap">
          <span className="ZT_bedz--zeleni">{t("zdravstveni_turizam.kvalitet_bedz")}</span>
          <h2 className="ZT_kvalitet__naslov">{t("zdravstveni_turizam.kvalitet_naslov")}</h2>
          <p className="ZT_kvalitet__uvod">{t("zdravstveni_turizam.kvalitet_uvod")}</p>
          <div className="ZT_kvalitet__grid">
            <div className="ZT_kvalitet__stavka">
              <div className="ZT_kvalitet__header">
                <MdForest className="ZT_kvalitet__ikona" />
                <h3>{t("zdravstveni_turizam.kvalitet_sume_naslov")}</h3>
              </div>
              <p>{t("zdravstveni_turizam.kvalitet_sume_tekst")}</p>
            </div>
            <div className="ZT_kvalitet__stavka">
              <div className="ZT_kvalitet__header">
                <FaWind className="ZT_kvalitet__ikona" />
                <h3>{t("zdravstveni_turizam.kvalitet_ozon_naslov")}</h3>
              </div>
              <p>{t("zdravstveni_turizam.kvalitet_ozon_tekst")}</p>
            </div>
            <div className="ZT_kvalitet__stavka">
              <div className="ZT_kvalitet__header">
                <FaCloudSun className="ZT_kvalitet__ikona" />
                <h3>{t("zdravstveni_turizam.kvalitet_kiseonik_naslov")}</h3>
              </div>
              <p>{t("zdravstveni_turizam.kvalitet_kiseonik_tekst")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. UTICAJ NA ZDRAVLJE */}
      <UticajNaZdravlje />

      {/* 7. AKTIVNOSTI */}
      <div className="ZT_aktivnosti">
        <h2 className="ZT_aktivnosti__naslov">{t("zdravstveni_turizam.aktivnosti_naslov")}</h2>
        <p className="ZT_aktivnosti__podnaslov">{t("zdravstveni_turizam.aktivnosti_podnaslov")}</p>
        <div className="ZT_aktivnosti__grid">
          {aktivnosti.map((a, i) => (
            <Link to={a.link} key={i} className="ZT_aktivnost">
              <span className="ZT_aktivnost__ikona">{a.ikona}</span>
              <h3 className="ZT_aktivnost__naziv">{a.naziv}</h3>
              <p className="ZT_aktivnost__opis">{a.opis}</p>
              <span className="ZT_aktivnost__cta">{t("zdravstveni_turizam.saznaj_vise")}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* 8. CTA */}
      <div className="ZT_cta">
        <h2 className="ZT_cta__naslov">{t("zdravstveni_turizam.cta_naslov")}</h2>
        <p className="ZT_cta__tekst">{t("zdravstveni_turizam.cta_tekst")}</p>
        <div className="ZT_cta__dugmad">
          <Link to="/smjestaj" className="ZT_cta__btn ZT_cta__btn--primarni">
            {t("zdravstveni_turizam.cta_smjestaj")}
          </Link>
          <Link to="/kontakt" className="ZT_cta__btn ZT_cta__btn--sekundarni">
            {t("zdravstveni_turizam.cta_kontakt")}
          </Link>
        </div>
      </div>

    </section>
  );
}

export default ZdravstveniTurizam;