import React from 'react';
import { Link } from 'react-router-dom';
import './Gastronomija.css';
import { useTranslation, Trans } from 'react-i18next';
import kajmak from "../../assets/Kajmak.jpg";
import pozadina from "../../assets/GastronomijaPozadina.jpg";
import teletina from "../../assets/gastronomija/teletina.jpg";
import cicvara from "../../assets/gastronomija/cicvara.jpg";
import koljenica from "../../assets/gastronomija/butkica.jpg";
import pecenje from "../../assets/gastronomija/jagnje.jpg";
import med from "../../assets/gastronomija/med.jpg";

import Seo from "../../components/Seo";

// Slike za specijalitete — tekst (naziv/opis) dolazi iz translation.json
const specijalitetiSlike = [teletina, cicvara, pozadina, koljenica, pecenje, med];

function Gastronomija() {
  const { t } = useTranslation();

  // Statički specijaliteti — tekst iz prevoda, slike iz koda (po indeksu)
  const specijaliteti = t('gastronomija.specijaliteti', { returnObjects: true });

  return (
    <section className="gastro">
      <Seo title={t("gastronomija.meta_title")} description={t("gastronomija.meta_description")} />

      {/* HERO — naslov, podnaslov i uvodni tekst na slici */}
      <div className="gastro__hero">
        <img src={pozadina} alt={t('gastronomija.naslov')} className="gastro__hero-img" />
        <div className="gastro__hero-overlay" />
        <div className="gastro__hero-tekst">
          <h1>{t('gastronomija.naslov')}</h1>
          <p className="gastro__hero-podnaslov">{t('gastronomija.podnaslov')}</p>
          <p className="gastro__hero-uvod">{t('gastronomija.uvod')}</p>
        </div>
      </div>

      {/* ROMANIJSKI SKORUP-KAJMAK */}
      <div className="gastro__kajmak">
        <div className="gastro__kajmak-grid">
          <div className="gastro__kajmak-slika-wrap">
            <img src={kajmak} alt={t('gastronomija.kajmak_naslov')} className="gastro__kajmak-slika" loading="lazy" />
            <span className="gastro__kajmak-bedz">{t('gastronomija.kajmak_bedz')}</span>
          </div>
          <div className="gastro__kajmak-tekst">
            <span className="gastro__kajmak-oznaka">{t('gastronomija.kajmak_oznaka')}</span>
            <h2 className="gastro__kajmak-naslov">{t('gastronomija.kajmak_naslov')}</h2>
            <p className="gastro__kajmak-opis">
              <Trans i18nKey="gastronomija.kajmak_opis_1" components={{ strong: <strong /> }} />
            </p>
            <p className="gastro__kajmak-opis">
              <Trans i18nKey="gastronomija.kajmak_opis_2" components={{ em: <em /> }} />
            </p>
            <p className="gastro__kajmak-opis">
              <Trans i18nKey="gastronomija.kajmak_opis_3" components={{ strong: <strong /> }} />
            </p>
            <div className="gastro__kajmak-certifikati">
              <div className="gastro__kajmak-cert"><span className="gastro__kajmak-cert-ikona">✓</span><span>{t('gastronomija.kajmak_cert_1')}</span></div>
              <div className="gastro__kajmak-cert"><span className="gastro__kajmak-cert-ikona">✓</span><span>{t('gastronomija.kajmak_cert_2')}</span></div>
              <div className="gastro__kajmak-cert"><span className="gastro__kajmak-cert-ikona">✓</span><span>{t('gastronomija.kajmak_cert_3')}</span></div>
              <div className="gastro__kajmak-cert"><span className="gastro__kajmak-cert-ikona">✓</span><span>{t('gastronomija.kajmak_cert_4')}</span></div>
            </div>
            <p className="gastro__kajmak-poziv">{t('gastronomija.kajmak_poziv')}</p>
          </div>
        </div>
      </div>

      {/* SPECIJALITETI */}
      <div className="gastro__specijaliteti">
        <h2 className="gastro__sekcija-naslov">{t('gastronomija.spec_naslov')}</h2>
        <p className="gastro__sekcija-podnaslov">{t('gastronomija.spec_podnaslov')}</p>
        <div className="gastro__spec-grid">
          {specijaliteti.map((s, i) => (
            <div key={s.naziv} className="gastro__spec-kartica">
              <div className="gastro__spec-slika-wrap">
                {specijalitetiSlike[i]
                  ? <img src={specijalitetiSlike[i]} alt={s.naziv} className="gastro__spec-slika" loading="lazy" />
                  : <div className="gastro__spec-placeholder" />
                }
              </div>
              <div className="gastro__spec-tekst">
                <h3 className="gastro__spec-naziv">{s.naziv}</h3>
                <p className="gastro__spec-opis">{s.opis}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA — ugostiteljski objekti */}
      <div className="gastro__cta">
        <h2 className="gastro__cta-naslov">{t('gastronomija.objekti_cta_naslov')}</h2>
        <p className="gastro__cta-tekst">{t('gastronomija.objekti_poziv')}</p>
        <Link to="/ugostiteljski-objekti" className="gastro__cta-btn">
          {t('gastronomija.objekti_dugme')}
        </Link>
      </div>

    </section>
  );
}

export default Gastronomija;