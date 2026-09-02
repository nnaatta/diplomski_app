import React from 'react';
import './VjerskiObjekti.css';
import { useTranslation } from 'react-i18next';
import { FaLocationDot } from 'react-icons/fa6';
import ImageSlider from '../../components/ImageSlider';

import svPantelejmon1 from '../../assets/vjerskiObjekti/crkvaSvPantelejmon1.jpg';
import svPantelejmon2 from '../../assets/vjerskiObjekti/svPantelejmon2.jpg';
import dzimrije1 from '../../assets/vjerskiObjekti/dzimrije1.jpg';
import pjenovac1 from '../../assets/vjerskiObjekti/pjenovac3.jpg';
import pjenovac2 from '../../assets/vjerskiObjekti/pjenovac2.jpg';
import nevacka1 from '../../assets/vjerskiObjekti/nevacka1.jpg';
import Seo from "../../components/Seo";

const objektiSlike = [
  [
    { slika: svPantelejmon1, altKey: 'objekat_1_alt_1' },
    { slika: svPantelejmon2, altKey: 'objekat_1_alt_2' },
  ],
  [
    { slika: dzimrije1, altKey: 'objekat_2_alt_1' },
  ],
  [
    { slika: pjenovac1, altKey: 'objekat_3_alt_1' },
    { slika: pjenovac2, altKey: 'objekat_3_alt_2' },
  ],
  [
    { slika: nevacka1, altKey: 'objekat_4_alt_1' },
  ],
];

const lokacije = [
  'https://maps.app.goo.gl/X4MTff3phK3ddrYDA',
  'https://maps.app.goo.gl',
  'https://maps.app.goo.gl/ijHAYhUNMDDMyAhC9',
  'https://maps.app.goo.gl/FFbC9CMnhxKsTKqs7',
];

function VjerskiObjekti() {
  const { t } = useTranslation();

  const objekti = [1, 2, 3, 4].map((id) => ({
    id,
    naziv:    t(`vjerski_objekti.objekat_${id}_naziv`),
    tip:      t(`vjerski_objekti.objekat_${id}_tip`),
    opis:     t(`vjerski_objekti.objekat_${id}_opis`),
    lokacija: lokacije[id - 1],
    slike: objektiSlike[id - 1].map((s) => ({
      slika: s.slika,
      opis:  t(`vjerski_objekti.${s.altKey}`),
    })),
  }));

  return (
    <section className="vo">
      <Seo title={t("vjerski_objekti.meta_title")} description={t("vjerski_objekti.meta_description")} />

      {/* ===== HERO ===== */}
      <div className="vo__hero">
        <div className="vo__hero-before" />
        <div className="vo__hero-after" />
        <h1 className="vo__hero-naslov">{t('vjerski_objekti.hero_naslov')}</h1>
        <p className="vo__hero-podnaslov">{t('vjerski_objekti.hero_podnaslov')}</p>
      </div>

      {/* ===== UVOD ===== */}
      <div className="vo__uvod">
        <h2 className="vo__uvod-naslov">{t('vjerski_objekti.uvod_naslov')}</h2>
        <p className="vo__uvod-tekst">{t('vjerski_objekti.uvod_tekst')}</p>
      </div>

      {/* ===== OBJEKTI ===== */}
      <div className="vo__objekti">
        {objekti.map((o) => (
          <div
            key={o.id}
            className={`vo__blok${o.id % 2 === 0 ? ' vo__blok--obrnuto' : ''}`}
          >
            {/* Slider */}
            <div className="vo__blok-slider">
              <ImageSlider slajdovi={o.slike} visina="420px" interval={5000} />
            </div>

            {/* Tekst */}
            <div className="vo__blok-tekst">
              <span className="vo__bedz">{o.tip}</span>
              <h2 className="vo__blok-naziv">{o.naziv}</h2>
              <p className="vo__blok-opis">{o.opis}</p>
              <a
                href={o.lokacija}
                target="_blank"
                rel="noreferrer"
                className="vo__blok-lokacija"
              >
                <FaLocationDot /> {t('vjerski_objekti.pogledaj_na_mapi')}
              </a>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

export default VjerskiObjekti;