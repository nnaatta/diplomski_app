import React from "react";
import Naglasak from "../../components/Naglasak";
import TurizamKartica from "../../components/TurizamKartica";
import "./HanPijesakDanas.css";
import { useTranslation } from "react-i18next";
import oHP1 from '../../assets/floraFauna/pozadina2.jpg';
import oHP2 from '../../assets/floraFauna/pozadina1.jpg';
import geo from '../../assets/ZdravstveniTurizam/slika5.jpg';
import klima from '../../assets/ZdravstveniTurizam/slika10.jpg';
import voda1 from '../../assets/Vodopad-Skakavac.jpg';
import voda2 from '../../assets/rijeke.jpg';

import { FaSkiing, FaMountain, FaHome } from "react-icons/fa";
import { GiFishing } from "react-icons/gi";
import { IoBicycleOutline } from "react-icons/io5";
import { RiMentalHealthFill } from "react-icons/ri";

const turizamIkone = [
  <FaSkiing/>, <FaMountain/>, <GiFishing/>,
  <IoBicycleOutline/>, <RiMentalHealthFill/>, <FaHome/>,
];

function HanPijesakDanas() {
  const { t } = useTranslation();
  const turizamKartice = t('hpd.turizam_kartice', { returnObjects: true });
  const cosLista = t('hpd.cos_lista', { returnObjects: true });
  const obrLista = t('hpd.obr_lista', { returnObjects: true });

  return (
    <section className="hpd">
      {/* ===== HERO ===== */}
      <div className="hpd__hero">
        <p className="hpd__hero-natpis">{t('hpd.hero_natpis')}</p>
        <h1 className="hpd__hero-naslov">{t('hpd.hero_naslov')}</h1>
      </div>

      {/* ===== O HAN PIJESKU ===== */}
      <div className="hpd__sekcija">
        <div className="hpd__sekcija-header">
          <span className="hpd__bedz hpd__bedz--zeleni">{t('hpd.o_bedz')}</span>
        </div>
        <div className="hpd__blok">
          <div className="hpd__blok-tekst">
            <h2 className="hpd__blok-naslov">{t('hpd.o_naslov')}</h2>
            <p className="hpd__blok-opis">{t('hpd.o_opis')}</p>
            <div className="hpd__naglasci">
              <Naglasak broj="1.100 m" tekst={t('hpd.naglasak_visina')} />
              <Naglasak broj="3.530" tekst={t('hpd.naglasak_stanovnici')} />
              <Naglasak broj="330 km²" tekst={t('hpd.naglasak_povrsina')} />
            </div>
          </div>
          <div className="hpd_slike">
            <img src={oHP1} className="hpd__foto hpd__foto--mjesto" alt="" />
            <img src={oHP2} className="hpd__foto hpd__foto--mjesto" alt="" />
          </div>
        </div>
      </div>

      <div className="hpd__separator" />

      {/* ===== GEOGRAFIJA ===== */}
      <div className="hpd__sekcija hpd__sekcija--alt">
        <div className="hpd__sekcija-header">
          <span className="hpd__bedz hpd__bedz--zeleni">{t('hpd.geo_bedz')}</span>
        </div>
        <div className="hpd__blok hpd__blok--obrnuto">
          <div className="hpd__blok-tekst">
            <h2 className="hpd__blok-naslov">{t('hpd.geo_naslov')}</h2>
            <p className="hpd__blok-opis">{t('hpd.geo_opis')}</p>
            <div className="hpd__naglasci">
              <Naglasak broj="1.537 m" tekst="Veliki Žep" />
              <Naglasak broj="1.245 m" tekst="Trešnjevac" />
              <Naglasak broj="1.219 m" tekst="Javornik" />
              <Naglasak broj="1.149 m" tekst="Studena Gora" />
            </div>
          </div>
          <img src={geo} className="hpd__foto hpd__foto--planine" alt="" />
        </div>
      </div>

      <div className="hpd__separator" />

      {/* ===== KLIMA ===== */}
      <div className="hpd__sekcija">
        <div className="hpd__sekcija-header">
          <span className="hpd__bedz hpd__bedz--zeleni">{t('hpd.klima_bedz')}</span>
        </div>
        <div className="hpd__blok">
          <div className="hpd__blok-tekst">
            <h3 className="hpd__blok-naslov">{t('hpd.klima_naslov')}</h3>
            <p className="hpd__blok-opis">{t('hpd.klima_opis')}</p>
          </div>
          <img src={klima} className="hpd__foto hpd__foto--klima" alt="" />
        </div>

        <div className="hpd__blok hpd__blok--obrnuto">
          <div className="hpd__blok-tekst">
            <h3 className="hpd__blok-naslov">{t('hpd.voda_naslov')}</h3>
            <p className="hpd__blok-opis">{t('hpd.voda_opis')}</p>
          </div>
          <div className="hpd_slike">
            <img src={voda1} className="hpd__foto hpd__foto--voda" alt="" />
            <img src={voda2} className="hpd__foto hpd__foto--voda" alt="" />
          </div>
        </div>
      </div>

      <div className="hpd__separator" />

      {/* ===== TURIZAM ===== */}
      <div className="hpd__sekcija hpd__sekcija--alt">
        <div className="hpd__sekcija-header">
          <span className="hpd__bedz hpd__bedz--zeleni">{t('hpd.turizam_bedz')}</span>
          <h2 className="hpd__sekcija-naslov">{t('hpd.turizam_naslov')}</h2>
        </div>
        <p className="hpd__turizam-uvod">{t('hpd.turizam_uvod')}</p>
        <div className="hpd__turizam-grid">
          {turizamKartice.map((kartica, i) => (
            <TurizamKartica
              key={kartica.naziv}
              ikona={turizamIkone[i]}
              naziv={kartica.naziv}
              opis={kartica.opis}
            />
          ))}
        </div>
      </div>

      <div className="hpd__separator" />

      {/* ===== KULTURA I OBRAZOVANJE ===== */}
      <div className="hpd__sekcija">
        <div className="hpd__sekcija-header">
          <span className="hpd__bedz hpd__bedz--zeleni">{t('hpd.kultura_bedz')}</span>
          <h2 className="hpd__sekcija-naslov">{t('hpd.kultura_naslov')}</h2>
          <p className="hpd__sekcija-podnaslov">{t('hpd.kultura_podnaslov')}</p>
        </div>

        <div className="hpd__inst-grid">
          <div className="hpd__inst-glavna">
            <span className="hpd__inst-nagrada">{t('hpd.bib_nagrada')}</span>
            <h3 className="hpd__inst-naslov">{t('hpd.bib_naslov')}</h3>
            <p className="hpd__inst-godina">{t('hpd.bib_godina')}</p>
            <p className="hpd__inst-tekst">{t('hpd.bib_tekst')}</p>
            <div className="hpd__inst-statistike">
              <div className="hpd__inst-stat">
                <span className="hpd__inst-stat-broj">33.000+</span>
                <span className="hpd__inst-stat-lab">{t('hpd.bib_knjiga')}</span>
              </div>
              <div className="hpd__inst-stat">
                <span className="hpd__inst-stat-broj">1923.</span>
                <span className="hpd__inst-stat-lab">{t('hpd.bib_osnivanje')}</span>
              </div>
              <div className="hpd__inst-stat">
                <span className="hpd__inst-stat-broj">100+</span>
                <span className="hpd__inst-stat-lab">{t('hpd.bib_tradicija')}</span>
              </div>
            </div>
          </div>

          <div className="hpd__inst-desna">
            <div className="hpd__inst-manja">
              <h3 className="hpd__inst-manja-naslov">{t('hpd.cos_naslov')}</h3>
              <p className="hpd__inst-godina">{t('hpd.cos_godina')}</p>
              <p className="hpd__inst-tekst">{t('hpd.cos_tekst')}</p>
              <ul className="hpd__inst-lista">
                {cosLista.map((stavka) => (
                  <li key={stavka}>{stavka}</li>
                ))}
              </ul>
            </div>

            <div className="hpd__inst-manja">
              <h3 className="hpd__inst-manja-naslov">{t('hpd.obr_naslov')}</h3>
              <p className="hpd__inst-godina">{t('hpd.obr_godina')}</p>
              <p className="hpd__inst-tekst">{t('hpd.obr_tekst')}</p>
              <ul className="hpd__inst-lista">
                {obrLista.map((stavka) => (
                  <li key={stavka}>{stavka}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HanPijesakDanas;