import React from "react";
import { Link } from "react-router-dom";
import "./OHP.css";
import { useTranslation } from "react-i18next";
import hpDanasPozadina from '../../assets/floraFauna/pozadina1.jpg';
import hpNekadaPozadina from '../../assets/hpNekada.jpg';

function OHP() {
  const { t } = useTranslation();

  return (
    <section className="ohp">
      <div className="ohp__split">
        <Link to="/o-han-pijesku/danas" className="ohp__pola ohp__pola--danas">
          <img src={hpDanasPozadina} className="ohp__pola-overlay" alt="" />
          <div className="ohp__pola-tekst">
            <h1 className="ohp__pola-naslov">{t('ohp.danas_naslov')}</h1>
            <p className="ohp__pola-opis">{t('ohp.danas_opis')}</p>
            <span className="ohp__pola-dugme">{t('ohp.istrazi')}</span>
          </div>
        </Link>

        <Link to="/o-han-pijesku/istorija" className="ohp__pola ohp__pola--istorija">
          <img src={hpNekadaPozadina} className="ohp__pola-overlay" alt="" />
          <div className="ohp__pola-tekst">
            <h1 className="ohp__pola-naslov">{t('ohp.istorija_naslov')}</h1>
            <p className="ohp__pola-opis">{t('ohp.istorija_opis')}</p>
            <span className="ohp__pola-dugme">{t('ohp.istrazi')}</span>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default OHP;