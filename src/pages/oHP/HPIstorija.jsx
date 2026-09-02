import React, { useState, useEffect, useRef } from "react";
import "./HPIstorija.css";
import { useTranslation } from "react-i18next";
import ausSlika from '../../assets/hpNekada.jpg';
import osmSlika from '../../assets/osmSlika.jpg';
import vraniKamen from '../../assets/vraniKamen.jpg';
import vila from '../../assets/dvoracKaradjordjevica.jpeg';
import stariBrod from '../../assets/stari_brod.jpg';
import velikiZep from '../../assets/velikiZep.jpg';
import hp90 from '../../assets/hp90.jpg';
import Seo from "../../components/Seo";

const slikeMap = {
  osmSlika, ausSlika, vraniKamen, vila, stariBrod, velikiZep, hp90,
};

function HPIstorija() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const periodi = t('hpi.periodi', { returnObjects: true });

  const [aktivniId, setAktivniId] = useState(1);
  const periodiRef = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAktivniId(Number(entry.target.dataset.id));
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    Object.values(periodiRef.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const skrolujDo = (id) => {
    const el = periodiRef.current[id];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="hpi">
      <Seo title={t("hpi.meta_title")} description={t("hpi.meta_description")} />
      {/* ===== HERO ===== */}
      <div className="hpi__hero">
        <p className="hpi__hero-natpis">{t('hpi.hero_natpis')}</p>
        <h1 className="hpi__hero-naslov">{t('hpi.hero_naslov')}</h1>
        <p className="hpi__hero-podnaslov">{t('hpi.hero_podnaslov')}</p>
      </div>

      {/* ===== GLAVNI LAYOUT ===== */}
      <div className="hpi__layout">

        {/* ===== SIDEBAR ===== */}
        <nav className="hpi__sidebar">
          <p className="hpi__sidebar-naslov">{t('hpi.sidebar_naslov')}</p>
          <ul className="hpi__sidebar-lista">
            {periodi.map((p) => (
              <li key={p.id}>
                <button
                  className={`hpi__sidebar-el ${aktivniId === p.id ? "hpi__sidebar-el--aktivan" : ""}`}
                  onClick={() => skrolujDo(p.id)}
                >
                  <span className={`hpi__sidebar-tacka hpi__sidebar-tacka--${p.bedzTip}`} />
                  <span className="hpi__sidebar-el-tekst">
                    <span className="hpi__sidebar-el-naslov">
                      {lang === 'en' ? p.naslov_en : p.naslov}
                    </span>
                    <span className="hpi__sidebar-el-godina">
                      {lang === 'en' ? p.period_en : p.period}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* ===== PERIODI ===== */}
        <main className="hpi__periodi">
          {periodi.map((p) => {
            const naslov = lang === 'en' ? p.naslov_en : p.naslov;
            const tekst  = lang === 'en' ? p.tekst_en  : p.tekst;
            const zanimljivost = lang === 'en' ? p.zanimljivost_en : p.zanimljivost;

            return (
              <div
                key={p.id}
                id={`period-${p.id}`}
                data-id={p.id}
                className="hpi__period"
                ref={(el) => (periodiRef.current[p.id] = el)}
              >
                <div className="hpi__period-header">
                  <div className="hpi__period-meta">
                    <h2 className={`hpi__period-naslov--${p.bedzTip}`}>{naslov}</h2>
                    <p className="hpi__period-godine">
                      {lang === 'en' ? p.period_en : p.period}
                    </p>
                  </div>
                </div>

                <div className="hpi__period-sadrzaj">
                  <p className="hpi__period-tekst">{tekst}</p>
                  <img src={slikeMap[p.slikaKey]} alt={naslov} className="hpi__period-foto" loading="lazy" />
                </div>

                {zanimljivost && (
                  <div className="hpi__zanimljivost">
                    <p className="hpi__zanimljivost-tekst">{zanimljivost}</p>
                  </div>
                )}
              </div>
            );
          })}
        </main>
      </div>
    </section>
  );
}

export default HPIstorija;