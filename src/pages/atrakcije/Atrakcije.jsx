import React, { useEffect, useRef } from "react";
import "./Atrakcije.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import skakavac from "../../assets/Vodopad-Skakavac.jpg"
import varosnica from "../../assets/rijeke.jpg"
import pecina from "../../assets/komnicaPecina.jpg"
import vazdusnaBanja from "../../assets/vazdusnaBanja.jpg";
import vidikovac from "../../assets/ZdravstveniTurizam/slika11.jpg";
import atrakcijeHero from "../../assets/atrakcijeHero.jpg";

import { FaMapLocationDot } from "react-icons/fa6";
import { FaWalking, FaMountain, FaRegCompass, FaSnowflake, FaHandHoldingHeart  } from "react-icons/fa";
import { LuWaves } from "react-icons/lu";
import { GiRiver, GiAmericanFootballHelmet, GiForest } from "react-icons/gi";
import { CiRuler } from "react-icons/ci";
import { MdPhotoCamera } from "react-icons/md";

import podaci from "../../data/atrakcijeData.json";
import Seo from "../../components/Seo";

// Mapiranje slika
const slike = {
  skakavac, varosnica, pecina, vazdusnaBanja, vidikovac,
};

// Mapiranje ikona
const ikone = {
  map: <FaMapLocationDot/>,
  walking: <FaWalking/>,
  waves: <LuWaves/>,
  ruler: <CiRuler/>,
  river: <GiRiver/>,
  helmet: <GiAmericanFootballHelmet/>,
  compass: <FaRegCompass/>,
  snowflake: <FaSnowflake/>,
  forest: <GiForest/>,
  heart: <FaHandHoldingHeart/>,
  camera: <MdPhotoCamera/>,
  mountain: <FaMountain/>,
};

const { atrakcije, prirodniSpomenici } = podaci;

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
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const jeParno = index % 2 === 0; // parno = slika lijevo, neparno = slika desno

  const naziv = lang === 'en' ? atrakcija.naziv_en : atrakcija.naziv;
  const opis  = lang === 'en' ? atrakcija.opis_en  : atrakcija.opis;
  const tip   = lang === 'en' ? atrakcija.tip_en   : atrakcija.tip;

  return (
    <div
      ref={ref}
      className={`ATR_par ATR_reveal${jeParno ? " ATR_par--normalno" : " ATR_par--obrnuto"}`}
    >
      {/* Slika */}
      <div className="ATR_par__slika-strana">
        <div className="ATR_par__slika-okvir">
          <img
            src={slike[atrakcija.slikaKey]}
            className="ATR_par__slika-placeholder"
            alt={naziv}
          loading="lazy" />
          <div className="ATR_par__slika-overlay" />
          <span className="ATR_par__tip">{tip}</span>
          {/* Dekorativni krug */}
          <div className={`ATR_par__dekor${jeParno ? " ATR_par__dekor--desno" : " ATR_par__dekor--lijevo"}`} />
        </div>
      </div>

      {/* Tekst */}
      <div className="ATR_par__tekst-strana">
        <span className="ATR_par__broj">0{atrakcija.id}</span>
        <h2 className="ATR_par__naziv">{naziv}</h2>
        <p className="ATR_par__opis">{opis}</p>

        {/* Info detalji */}
        <div className="ATR_par__detalji">
          {atrakcija.detalji.map((d, i) => (
            <div key={i} className="ATR_par__detalj">
              <span className="ATR_par__detalj-ikona">{ikone[d.ikona]}</span>
              <div>
                <span className="ATR_par__detalj-labela">{lang === 'en' ? d.labela_en : d.labela}</span>
                <span className="ATR_par__detalj-vrijednost">{lang === 'en' ? d.vrijednost_en : d.vrijednost}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// ── Prirodni spomenik kartica ─────────────────────────────────────────────────

function SpomenikKartica({ s, index }) {
  const ref = useReveal();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const naziv = lang === 'en' ? s.naziv_en : s.naziv;
  const opis  = lang === 'en' ? s.opis_en  : s.opis;

  return (
    <div
      ref={ref}
      className="ATR_spm ATR_reveal"
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      <div className="ATR_spm__glava" style={{ background: `${s.boja}18`, borderColor: `${s.boja}40` }}>
        <span className="ATR_spm__ikona">{s.ikona}</span>
        <div className="ATR_spm__header-info">
          <h3 className="ATR_spm__naziv">{naziv}</h3>
          <span className="ATR_spm__latinski">{s.latinskiNaziv}</span>
        </div>
        <div className="ATR_spm__linija" style={{ background: s.boja }} />
      </div>
      <div className="ATR_spm__tijelo">
        <p className="ATR_spm__opis">{opis}</p>
        <span className="ATR_spm__bedz" style={{ background: `${s.boja}18`, color: s.boja }}>
          {t('atrakcije.zasticena_vrsta')}
        </span>
      </div>
    </div>
  );
}

// ── Glavna stranica ───────────────────────────────────────────────────────────

function Atrakcije() {
  const { t } = useTranslation();

  return (
    <section className="ATR_section">
      <Seo title={t("atrakcije.meta_title")} description={t("atrakcije.meta_description")} />

      {/* ── 1. HERO ── */}
      <div className="ATR_hero">
        <img src={atrakcijeHero} className="ATR_hero__img ATR_hero__img--placeholder" alt="" />
        <div className="ATR_hero__overlay" />
        <div className="ATR_hero__tekst">
          <span className="ATR_hero__bedz">{t('atrakcije.bedz_hero')}</span>
          <h1 className="ATR_hero__naslov">{t('atrakcije.naslov')}</h1>
          <p className="ATR_hero__podnaslov">
            {t('atrakcije.podnaslov')}
          </p>
          <a href="#atrakcije" className="ATR_hero__dugme">{t('atrakcije.istrazi')}</a>
        </div>
      </div>

      {/* ── 2. ATRAKCIJE — naizmjenični layout ── */}
      <div className="ATR_lista-sekcija" id="atrakcije">
        <div className="ATR_lista-wrap">
          <span className="ATR_bedz--zeleni ATR_bedz--centar">{t('atrakcije.bedz_atrakcije')}</span>
          <h2 className="ATR_naslov">{t('atrakcije.sekcija_naslov')}</h2>
          <p className="ATR_podnaslov">
            {t('atrakcije.sekcija_podnaslov')}
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
          <span className="ATR_bedz--zeleni ATR_bedz--centar">{t('atrakcije.bedz_botanika')}</span>
          <h2 className="ATR_naslov">{t('atrakcije.spomenici_naslov')}</h2>
          <p className="ATR_podnaslov">
            {t('atrakcije.spomenici_podnaslov')}
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
        <h2 className="ATR_cta__naslov">{t('atrakcije.cta_naslov')}</h2>
        <p className="ATR_cta__tekst">
          {t('atrakcije.cta_tekst')}
        </p>
        <Link to="/znamenitosti" className="ATR_cta__btn ATR_cta__btn--primarni">
          {t('atrakcije.cta_btn')}
        </Link>
      </div>

    </section>
  );
}

export default Atrakcije;