import React, { useState } from "react";
import "./LovIRibolov.css";
import { useTranslation } from "react-i18next";
import { GiDeer, GiPolarBear, GiForest } from "react-icons/gi";
import { IoFishSharp } from "react-icons/io5";
import { FaAward } from "react-icons/fa";
import { LuCalendarDays,  LuWaves } from "react-icons/lu";
import rijeke from "../../assets/stupcanica.jpg"
import lov1 from "../../assets/lov1.jpg"
import lov2 from "../../assets/lov2.jpg"
import Seo from "../../components/Seo";

const lovIkone = [<GiForest/>, <GiPolarBear/>, <FaAward/>];
const ribolovIkone = [<IoFishSharp/>, <LuCalendarDays/>, <LuWaves/>];

function LovRibolov() {
  const { t } = useTranslation();
  const [aktivniTab, setAktivniTab] = useState("lov");

  const lovInfoKartice = t('lov_ribolov.lov_kartice', { returnObjects: true });
  const ribolovInfoKartice = t('lov_ribolov.ribolov_kartice', { returnObjects: true });
  const ribolovPravila = t('lov_ribolov.pravila_lista', { returnObjects: true });

  return (
    <section className="lr">
      <Seo title={t("lov_ribolov.meta_title")} description={t("lov_ribolov.meta_description")} />

      {/* ===== HERO ===== */}
      <div className="lr__hero">
        <p className="lr__hero-natpis">{t('lov_ribolov.hero_natpis')}</p>
        <h1 className="lr__hero-naslov">{t('lov_ribolov.hero_naslov')}</h1>
        <p className="lr__hero-podnaslov">
          {t('lov_ribolov.hero_podnaslov')}
        </p>
      </div>

      {/* ===== TABOVI ===== */}
      <div className="lr__tabovi">
        <button
          className={`lr__tab ${aktivniTab === "lov" ? "lr__tab--aktivan" : ""}`}
          onClick={() => setAktivniTab("lov")}
        >
          <span className="lr__tab-ikona"><GiDeer/></span>
          {t('lov_ribolov.tab_lov')}
        </button>
        <button
          className={`lr__tab ${aktivniTab === "ribolov" ? "lr__tab--aktivan" : ""}`}
          onClick={() => setAktivniTab("ribolov")}
        >
          <span className="lr__tab-ikona"><IoFishSharp/></span>
          {t('lov_ribolov.tab_ribolov')}
        </button>
      </div>

      {/* ===== LOV ===== */}
      {aktivniTab === "lov" && (
        <div className="lr__sadrzaj">

          {/* Kartica udruženja */}
          <div className="lr__sekcija">
            <div className="lr__drustvo-kartica">
              <div className="lr__drustvo-logo lr__drustvo-logo--lov">
                <span className="lr__drustvo-logo-ikona">🦌</span>
                <span className="lr__drustvo-logo-tekst">{t('lov_ribolov.lov_logo_tekst')}</span>
              </div>
              <div className="lr__drustvo-info">
                <span className="lr__bedz lr__bedz--lov">{t('lov_ribolov.lov_bedz')}</span>
                <h2 className="lr__drustvo-naslov">
                  {t('lov_ribolov.lov_naslov')}
                </h2>
                <p className="lr__drustvo-godina">
                  {t('lov_ribolov.lov_godina')}
                </p>
                <p className="lr__drustvo-tekst">
                  {t('lov_ribolov.lov_tekst')}
                </p>
              </div>
            </div>
          </div>

          {/* O lovištu */}
          <div className="lr__sekcija lr__sekcija--alt">
            <div className="lr__sekcija-unutra">
              <div className="lr__sekcija-header">
                <span className="lr__bedz lr__bedz--lov">{t('lov_ribolov.lovište_bedz')}</span>
                <h2 className="lr__sekcija-naslov">
                  {t('lov_ribolov.lovište_naslov')}
                </h2>
                <p className="lr__sekcija-podnaslov">
                  {t('lov_ribolov.lovište_podnaslov')}
                </p>
              </div>

              <div className="lr__blok">
                <p className="lr__blok-tekst">
                  {t('lov_ribolov.lovište_tekst')}
                </p>
                <div className="lr__foto lr__foto--lov">
                   <img src={lov1} alt={t('lov_ribolov.lovište_alt')} loading="lazy" /> 
                </div>
              </div>

              <div className="lr__info-grid">
                {lovInfoKartice.map((k, i) => (
                  <div key={k.naziv} className="lr__info-kartica lr__info-kartica--zelena">
                    <span className="lr__info-ikona">{lovIkone[i]}</span>
                    <h3 className="lr__info-naziv">{k.naziv}</h3>
                    <p className="lr__info-tekst">{k.tekst}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lovni turizam */}
          <div className="lr__sekcija">
            <div className="lr__sekcija-header">
              <span className="lr__bedz lr__bedz--lov">{t('lov_ribolov.turizam_bedz')}</span>
              <h2 className="lr__sekcija-naslov">{t('lov_ribolov.turizam_naslov')}</h2>
            </div>

            <div className="lr__blok lr__blok--obrnuto">
              <p className="lr__blok-tekst">
                {t('lov_ribolov.turizam_tekst')}
              </p>
              <div className="lr__foto lr__foto--lov">
                <img src={lov2} alt={t('lov_ribolov.turizam_alt')} loading="lazy" /> 
              </div>
            </div>

            <div className="lr__citat">
              <p className="lr__citat-tekst">
                {t('lov_ribolov.citat')}
              </p>
            </div>
          </div>

        </div>
      )}

      {/* ===== RIBOLOV ===== */}
      {aktivniTab === "ribolov" && (
        <div className="lr__sadrzaj">

          {/* Kartica društva */}
          <div className="lr__sekcija">
            <div className="lr__drustvo-kartica">
             <div className="lr__drustvo-logo lr__drustvo-logo--riba">
               <span className="lr__drustvo-logo-ikona">🎣</span>
                <span className="lr__drustvo-logo-tekst">{t('lov_ribolov.riba_logo_tekst')}</span>
              </div>
              <div className="lr__drustvo-info">
                <span className="lr__bedz lr__bedz--riba">{t('lov_ribolov.riba_bedz')}</span>
                <h2 className="lr__drustvo-naslov">{t('lov_ribolov.riba_naslov')}</h2>
                <p className="lr__drustvo-godina">
                  {t('lov_ribolov.riba_godina')}
                </p>
                <p className="lr__drustvo-tekst">
                  {t('lov_ribolov.riba_tekst')}
                </p>
              </div>
            </div>
          </div>

          {/* Ribolovne vode */}
          <div className="lr__sekcija lr__sekcija--alt">
            <div className="lr__sekcija-unutra">
              <div className="lr__sekcija-header">
                <span className="lr__bedz lr__bedz--riba">{t('lov_ribolov.vode_bedz')}</span>
                <h2 className="lr__sekcija-naslov">
                  {t('lov_ribolov.vode_naslov')}
                </h2>
              </div>

              <div className="lr__blok">
                <p className="lr__blok-tekst">
                  {t('lov_ribolov.vode_tekst')}
                </p>
                <div className="lr__foto lr__foto--riba">
                  <img src={rijeke} alt={t('lov_ribolov.vode_alt')} loading="lazy" />
                </div>
              </div>

              <div className="lr__info-grid">
                {ribolovInfoKartice.map((k, i) => (
                  <div key={k.naziv} className="lr__info-kartica lr__info-kartica--plava">
                    <span className="lr__info-ikona">{ribolovIkone[i]}</span>
                    <h3 className="lr__info-naziv">{k.naziv}</h3>
                    <p className="lr__info-tekst">{k.tekst}</p>
                  </div>
                ))}
              </div>

              <div className="lr__pravila">
                <h3 className="lr__pravila-naslov">{t('lov_ribolov.pravila_naslov')}</h3>
                <ul className="lr__pravila-lista">
                  {ribolovPravila.map((p) => (
                    <li key={p} className="lr__pravila-stavka">{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      )}

    </section>
  );
}

export default LovRibolov;