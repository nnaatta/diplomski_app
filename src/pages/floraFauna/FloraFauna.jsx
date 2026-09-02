import React from "react";
import "./FloraFauna.css";
import { useTranslation } from "react-i18next";
import ImageSlider from "../../components/ImageSlider";
import pozadinaFlora from "../../assets/floraFauna/flora1.jpg";
import pozadinaFauna from "../../assets/floraFauna/pozadinaFauna.jpg";
import smrca from "../../assets/floraFauna/smrca.jpg";
import jela from "../../assets/floraFauna/jela.jpg";
import bukva from "../../assets/floraFauna/bukva.jpg";
import bijeliBor from "../../assets/floraFauna/bijeliBor.jpg";
import hrast from "../../assets/floraFauna/hrast.jpg";
import srijemus from "../../assets/floraFauna/srijemus.jpg";
import kantarion from "../../assets/floraFauna/kantarion.jpg";
import hajduckaTrava from "../../assets/floraFauna/hajduckaTrava.jpg";
import majcinaDusica from "../../assets/floraFauna/majcinaDusica.jpg";
import malina from "../../assets/floraFauna/malina.jpg";
import kupina from "../../assets/floraFauna/kupina.jpg";
import glog from "../../assets/floraFauna/glog.jpg";
import smreka from "../../assets/floraFauna/smreka.jpg";
import kicica from "../../assets/floraFauna/kicica.jpg";
import tisa from "../../assets/floraFauna/tisa.jpg";
import bozikovina from "../../assets/floraFauna/bozikovina.jpg";
import jarebika from "../../assets/floraFauna/jarebika.jpg";
import panciceva from "../../assets/floraFauna/panciceva.jpg";
import jelenak from "../../assets/floraFauna/jelenak.jpg";
import vrganj from "../../assets/floraFauna/vrganj.jpg";
import lisicarka from "../../assets/floraFauna/lisicarka.jpg";
import bukovaca from "../../assets/floraFauna/bukovace.jpg";
import smrcak from "../../assets/floraFauna/smrcak.jpg";
import redusa from "../../assets/floraFauna/redusa.jpg";
import krasnica from "../../assets/floraFauna/krasnica.jpg";
import srndac from "../../assets/floraFauna/srndac.jpg";
import srna from "../../assets/floraFauna/srna.jpg";
import svinja from "../../assets/floraFauna/svinja.jpg";
import zec from "../../assets/floraFauna/zec.jpg";
import zmijar from "../../assets/floraFauna/zmijar.jpg";
import sova from "../../assets/floraFauna/sova.jpg";
import djetlic from "../../assets/floraFauna/djetlic.jpg";
import pastrmka from "../../assets/floraFauna/pastrmka.jpg";
import rak from "../../assets/floraFauna/rak.jpg";
import vuk from "../../assets/floraFauna/vuk.jpeg";
import orao from "../../assets/floraFauna/orao.jpg";
import vidra from "../../assets/floraFauna/vidra.jpg";
import lasica from "../../assets/floraFauna/lasica.jpg";

import podaci from "../../data/floraFaunaData.json";
import Seo from "../../components/Seo";

// Mapiranje ključeva slika na importovane slike
const slike = {
  smrca, jela, bukva, bijeliBor, hrast, srijemus, kantarion, hajduckaTrava,
  majcinaDusica, malina, kupina, glog, smreka, kicica, tisa, bozikovina,
  jarebika, panciceva, jelenak, vrganj, lisicarka, bukovaca, smrcak, redusa,
  krasnica, srndac, srna, svinja, zec, zmijar, sova, djetlic, pastrmka, rak,
  vuk, orao, vidra, lasica, pozadinaFauna,
};

// Pretvori podatke iz JSON-a (slikaKey) u objekte koje ImageSlider očekuje (slika, opis)
function pripremiSlajdove(niz, lang) {
  return niz.map(s => ({
    slika: slike[s.slikaKey],
    opis: lang === 'en' ? s.opis_en : s.opis,
  }));
}

function FloraFauna() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const sumskaEkosistemSlike = pripremiSlajdove(podaci.sumskaEkosistemSlike, lang);
  const ljekovitoBiljeSlike  = pripremiSlajdove(podaci.ljekovitoBiljeSlike, lang);
  const gljiveSlike          = pripremiSlajdove(podaci.gljiveSlike, lang);
  const divljacSlike         = pripremiSlajdove(podaci.divljacSlike, lang);
  const pticeSlike           = pripremiSlajdove(podaci.pticeSlike, lang);
  const ribolovSlike         = pripremiSlajdove(podaci.ribolovSlike, lang);

  const zasticeneBiljke = podaci.zasticeneBiljke.map(b => ({
    naziv: lang === 'en' ? b.naziv_en : b.naziv,
    opis: lang === 'en' ? b.opis_en : b.opis,
    slike: pripremiSlajdove(b.slike, lang),
  }));

  const zasticeneZivotinje = podaci.zasticeneZivotinje.map(z => ({
    naziv: lang === 'en' ? z.naziv_en : z.naziv,
    opis: lang === 'en' ? z.opis_en : z.opis,
    slike: pripremiSlajdove(z.slike, lang),
  }));

  return (
    <section className="ff">
      <Seo title={t("flora_fauna.meta_title")} description={t("flora_fauna.meta_description")} />
   {/* ===== SPLIT SCREEN ===== */}
<div className="ff__split">

  <a
    href="#flora"
    className="ff__split-pola ff__split-pola--flora"
    style={{
      backgroundImage: `url(${pozadinaFlora})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="ff__split-overlay ff__split-overlay--flora" />
    <div className="ff__split-tekst">
      <h2 className="ff__split-naslov">
        {t("flora_fauna.flora_naslov")}
      </h2>
      <p className="ff__split-opis">
        {t("flora_fauna.flora_opis")}
      </p>
      <span className="ff__split-dugme">
        {t("flora_fauna.flora_dugme")}
      </span>
    </div>
  </a>

  <a
    href="#fauna"
    className="ff__split-pola ff__split-pola--fauna"
    style={{
      backgroundImage: `url(${pozadinaFauna})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="ff__split-overlay ff__split-overlay--fauna" />
    <div className="ff__split-tekst">
      <h2 className="ff__split-naslov">
        {t("flora_fauna.fauna_naslov")}
      </h2>
      <p className="ff__split-opis">
        {t("flora_fauna.fauna_opis")}
      </p>
      <span className="ff__split-dugme">
        {t("flora_fauna.fauna_dugme")}
      </span>
    </div>
  </a>

</div>

      {/* ==================== FLORA ==================== */}
      <div id="flora" className="ff__sekcija">
        <div className="ff__hero ff__hero--flora">
          <div className="ff__hero-overlay" />
          <div className="ff__hero-tekst">
            <span className="ff__bedz ff__bedz--zeleni">{t('flora_fauna.flora_hero_bedz')}</span>
            <h1>{t('flora_fauna.flora_hero_naslov')}</h1>
            <p>{t('flora_fauna.flora_hero_podnaslov')}</p>
          </div>
        </div>

        {/* Šumski ekosistem */}
        <div className="ff__blok">
          <div className="ff__blok-grid">
            <div className="ff__blok-tekst">
              <span className="ff__bedz ff__bedz--zeleni">
                {t('flora_fauna.sume_bedz')}
              </span>
              <h2>{t('flora_fauna.sume_naslov')}</h2>
              <p>{t('flora_fauna.sume_p1')}</p>
              <p>{t('flora_fauna.sume_p2')}</p>
            </div>
            <ImageSlider
              slajdovi={sumskaEkosistemSlike}
              visina="360px"
              interval={5000}
            />
          </div>
        </div>

        {/* Ljekovito bilje */}
        <div className="ff__blok ff__blok--alt">
          <div className="ff__blok-grid ff__blok-grid--obrnuto">
            <ImageSlider
              slajdovi={ljekovitoBiljeSlike}
              visina="360px"
              interval={5000}
            />
            <div className="ff__blok-tekst">
              <span className="ff__bedz ff__bedz--zeleni">{t('flora_fauna.ljekovito_bedz')}</span>
              <h2>{t('flora_fauna.ljekovito_naslov')}</h2>
              <p>{t('flora_fauna.ljekovito_p1')}</p>
              <p>{t('flora_fauna.ljekovito_p2')}</p>
            </div>
          </div>
        </div>
        {/* Gljive */}
        <div className="ff__blok ff__blok--alt">
          <div className="ff__blok-grid">
            <div className="ff__blok-tekst">
              <span className="ff__bedz ff__bedz--zeleni">
                {t('flora_fauna.gljive_bedz')}
              </span>
              <h2>{t('flora_fauna.gljive_naslov')}</h2>
              <p>{t('flora_fauna.gljive_p1')}</p>
              <p>{t('flora_fauna.gljive_p2')}</p>
            </div>
            <ImageSlider
              slajdovi={gljiveSlike}
              visina="360px"
              interval={5000}
            />
          </div>
        </div>
      </div>

      {/* Rijetke i zaštićene biljne vrste */}
      <div className="ff__blok">
        <div className="ff__blok-naslov-wrap">
          <span className="ff__bedz ff__bedz--zeleni">{t('flora_fauna.biljke_bedz')}</span>
          <h2>{t('flora_fauna.biljke_naslov')}</h2>
          <p className="ff__blok-podnaslov">
            {t('flora_fauna.biljke_podnaslov')}
          </p>
        </div>
        <div className="ff__vrste-grid">
          {zasticeneBiljke.map((b) => (
            <div key={b.naziv} className="ff__vrsta ff__vrsta--zelena">
              <div className="ff__vrsta-slider">
                <ImageSlider slajdovi={b.slike} visina="200px" interval={0} />
              </div>
              <div className="ff__vrsta-tekst">
                <h3 className="ff__vrsta-naziv">{b.naziv}</h3>
                <p className="ff__vrsta-opis">{b.opis}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ==================== FAUNA ==================== */}
      <div id="fauna" className="ff__sekcija">
        <div className="ff__hero ff__hero--fauna">
          <div className="ff__hero-overlay" />
          <div className="ff__hero-tekst">
            <span className="ff__bedz ff__bedz--smedi">{t('flora_fauna.fauna_hero_bedz')}</span>
            <h1>{t('flora_fauna.fauna_hero_naslov')}</h1>
            <p>{t('flora_fauna.fauna_hero_podnaslov')}</p>
          </div>
        </div>

        {/* Divljač */}
        <div className="ff__blok">
          <div className="ff__blok-grid">
            <div className="ff__blok-tekst">
              <span className="ff__bedz ff__bedz--smedi">{t('flora_fauna.divljac_bedz')}</span>
              <h2>{t('flora_fauna.divljac_naslov')}</h2>
              <p>{t('flora_fauna.divljac_p1')}</p>
              <p>{t('flora_fauna.divljac_p2')}</p>
            </div>
            <ImageSlider
              slajdovi={divljacSlike}
              visina="360px"
              interval={5000}
            />
          </div>
        </div>

        {/* Ptice */}
        <div className="ff__blok ff__blok--alt">
          <div className="ff__blok-grid ff__blok-grid--obrnuto">
            <ImageSlider slajdovi={pticeSlike} visina="360px" interval={5000} />
            <div className="ff__blok-tekst">
              <span className="ff__bedz ff__bedz--smedi">{t('flora_fauna.ptice_bedz')}</span>
              <h2>{t('flora_fauna.ptice_naslov')}</h2>
              <p>{t('flora_fauna.ptice_p1')}</p>
              <p>{t('flora_fauna.ptice_p2')}</p>
            </div>
          </div>
        </div>

        {/* Ribolov */}
        <div className="ff__blok">
          <div className="ff__blok-grid">
            <div className="ff__blok-tekst">
              <span className="ff__bedz ff__bedz--smedi">{t('flora_fauna.ribolov_bedz')}</span>
              <h2>{t('flora_fauna.ribolov_naslov')}</h2>
              <p>{t('flora_fauna.ribolov_p1')}</p>
              <p>{t('flora_fauna.ribolov_p2')}</p>
            </div>
            <ImageSlider
              slajdovi={ribolovSlike}
              visina="360px"
              interval={5000}
            />
          </div>
        </div>

        {/* Zaštićene životinjske vrste */}
        <div className="ff__blok ff__blok--alt">
          <div className="ff__blok-naslov-wrap">
            <span className="ff__bedz ff__bedz--smedi">{t('flora_fauna.zivotinje_bedz')}</span>
            <h2>{t('flora_fauna.zivotinje_naslov')}</h2>
            <p className="ff__blok-podnaslov">
              {t('flora_fauna.zivotinje_podnaslov')}
            </p>
          </div>
          <div className="ff__vrste-grid">
            {zasticeneZivotinje.map((z) => (
              <div key={z.naziv} className="ff__vrsta ff__vrsta--smeda">
                <div className="ff__vrsta-slider">
                  <ImageSlider slajdovi={z.slike} visina="200px" interval={0} />
                </div>
                <div className="ff__vrsta-tekst">
                  <h3 className="ff__vrsta-naziv">{z.naziv}</h3>
                  <p className="ff__vrsta-opis">{z.opis}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FloraFauna;