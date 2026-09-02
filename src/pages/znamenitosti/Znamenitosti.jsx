import React, { useEffect, useRef } from "react";
import "./Znamenitosti.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import dvorac from "../../assets/dvoracKaradjordjevica.jpeg";
import posijak2 from "../../assets/Znamenitosti/posijak2.JPG";
import vraniKamen from "../../assets/manifestacije/vk4.jpg";
import g3 from "../../assets/velikiZep.jpg";
import spomenikBrdo from "../../assets/Znamenitosti/spomenikBorackoBrdo.jpg";
import hajduk from "../../assets/Znamenitosti/hajduk.jpg";
import Seo from "../../components/Seo";

const slike = [spomenikBrdo, vraniKamen, g3, hajduk, posijak2, null];

const mapaUrls = [
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2866.002755163789!2d18.950959376064375!3d44.08329727108498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47591b0050506f17%3A0x6723a68103dc18d4!2z0KHQv9C-0LzQtdC9INC60L7RgdGC0YPRgNC90LjRhtCw!5e0!3m2!1sen!2sba!4v1779109495204!5m2!1sen!2sba",
  "", "", "", "", "",
];

function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("ZNA_revealed");
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function ZnamenitostSegment({ z, index }) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className="ZNA_segment ZNA_reveal"
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <div className="ZNA_segment__top">
        <span className="ZNA_segment__tip">{z.tip}</span>
      </div>
      <h3 className="ZNA_segment__naziv">{z.naziv}</h3>
      <p className="ZNA_segment__opis">{z.opis}</p>
      <div className={`ZNA_segment__media${z.mapaUrl ? "" : " ZNA_segment__media--samo-slika"}`}>
        <div className="ZNA_segment__slika-wrap">
          {z.slika
            ? <img src={z.slika} alt={z.naziv} className="ZNA_segment__slika" loading="lazy" />
            : <div className="ZNA_segment__slika-placeholder" />
          }
        </div>
        {z.mapaUrl && (
          <div className="ZNA_segment__mapa-wrap">
            <iframe
              src={z.mapaUrl}
              title={`Lokacija — ${z.naziv}`}
              className="ZNA_segment__mapa"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}
      </div>
    </div>
  );
}

function Znamenitosti() {
  const { t } = useTranslation();
  const filmRef = useScrollReveal();
  const dvoracRef = useScrollReveal();

  const znamenitosti = [1, 2, 3, 4, 5, 6].map((n, i) => ({
    id: n,
    naziv:  t(`znamenitosti.z${n}_naziv`),
    tip:    t(`znamenitosti.z${n}_tip`),
    opis:   t(`znamenitosti.z${n}_opis`),
    slika:  slike[i],
    mapaUrl: mapaUrls[i],
  }));

  return (
    <section className="ZNA_section">
      <Seo title={t("znamenitosti.meta_title")} description={t("znamenitosti.meta_description")} />

      {/* ── 1. HERO ── */}
      <div className="ZNA_hero">
        <h1>{t("znamenitosti.hero_naslov")}</h1>
        <p>{t("znamenitosti.hero_podnaslov")}</p>
      </div>

      {/* ── 2. DVORAC ── */}
      <div className="ZNA_dvorac-wrap">
        <div ref={dvoracRef} className="ZNA_dvorac ZNA_reveal">
          <div className="ZNA_dvorac__slika-wrap">
            <img src={dvorac} className="ZNA_dvorac__slika" alt={t("znamenitosti.dvorac_alt")} loading="lazy" />
            <span className="ZNA_dvorac__tip-badge">{t("znamenitosti.dvorac_tip_badge")}</span>
          </div>
          <div className="ZNA_dvorac__info">
            <span className="ZNA_bedz--zeleni">{t("znamenitosti.dvorac_bedz")}</span>
            <h2 className="ZNA_dvorac__naslov">{t("znamenitosti.dvorac_naslov")}</h2>
            <p className="ZNA_dvorac__opis">{t("znamenitosti.dvorac_opis_1")}</p>
            <p className="ZNA_dvorac__opis">{t("znamenitosti.dvorac_opis_2")}</p>
            <Link to="/znamenitosti/dvorac-karadjordjevica" className="ZNA_dvorac__dugme">
              {t("znamenitosti.dvorac_dugme")}
            </Link>
          </div>
        </div>
      </div>

      {/* ── 3. OSTALE ZNAMENITOSTI ── */}
      <div className="ZNA_znamenitosti">
        <div className="ZNA_wrap">
          <span className="ZNA_bedz--zeleni ZNA_bedz--centar">{t("znamenitosti.ostale_bedz")}</span>
          <h2 className="ZNA_naslov">{t("znamenitosti.ostale_naslov")}</h2>
          <p className="ZNA_podnaslov">{t("znamenitosti.ostale_podnaslov")}</p>
          <div className="ZNA_lista">
            {znamenitosti.map((z, i) => (
              <ZnamenitostSegment key={z.id} z={z} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. FILM ── */}
      <div ref={filmRef} className="ZNA_film ZNA_reveal">
        <div className="ZNA_film__wrap">
          <div className="ZNA_film__lijevo">
            <span className="ZNA_film__bedz">🎬 {t("znamenitosti.film_bedz")}</span>
            <h2 className="ZNA_film__naslov">{t("znamenitosti.film_naslov")}</h2>
            <p className="ZNA_film__tekst">{t("znamenitosti.film_p1")}</p>
            <p className="ZNA_film__tekst">{t("znamenitosti.film_p2")}</p>
            <p className="ZNA_film__tekst">{t("znamenitosti.film_p3")}</p>
            <div className="ZNA_film__detalji">
              {[
                { labelKey: "film_detalj_film_labela",    valKey: "film_detalj_film_vrijednost" },
                { labelKey: "film_detalj_godina_labela",  valKey: "film_detalj_godina_vrijednost" },
                { labelKey: "film_detalj_zanr_labela",    valKey: "film_detalj_zanr_vrijednost" },
                { labelKey: "film_detalj_lokacija_labela", valKey: "film_detalj_lokacija_vrijednost" },
              ].map((d) => (
                <div key={d.labelKey} className="ZNA_film__detalj">
                  <span className="ZNA_film__detalj-labela">{t(`znamenitosti.${d.labelKey}`)}</span>
                  <span className="ZNA_film__detalj-vrijednost">{t(`znamenitosti.${d.valKey}`)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="ZNA_film__desno">
            <div className="ZNA_film__klapeta">
              <div className="ZNA_film__klapeta-pruge">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className={`ZNA_film__pruga${i % 2 === 0 ? " ZNA_film__pruga--bijela" : ""}`} />
                ))}
              </div>
              <div className="ZNA_film__klapeta-tijelo">
                <div className="ZNA_film__poster-placeholder">
                  <span className="ZNA_film__poster-tekst">🎬</span>
                  <span className="ZNA_film__poster-naziv">{t("znamenitosti.film_poster_naziv")}</span>
                  <span className="ZNA_film__poster-godina">1979</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

export default Znamenitosti;