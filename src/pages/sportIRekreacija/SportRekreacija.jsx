import React from "react";
import "./SportRekreacija.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaWalking, FaMountain, FaSkiing, FaVolleyballBall } from "react-icons/fa";
import { IoMdBicycle, IoMdFootball } from "react-icons/io";
import { GiFishingHook, GiPathDistance, GiMountainRoad } from "react-icons/gi";
import { TbAerialLift } from "react-icons/tb";
import { BsThermometerSnow } from "react-icons/bs";

import PedVisocnikLogo from "../../assets/PedVisocnikLogo.jpg";
import vis1 from "../../assets/sportRekreacija/vis1.jpg";
import vis2 from "../../assets/sportRekreacija/vis2.jpg";
import vis3 from "../../assets/sportRekreacija/vis3.jpg";
import vis4 from "../../assets/sportRekreacija/vis4.jpg";
import psuJavor from "../../assets/psuJavor.jpg";
import javor1 from "../../assets/sportRekreacija/javor1.jpg";
import javor2 from "../../assets/sportRekreacija/javor2.jpg";
import javor3 from "../../assets/sportRekreacija/javor3.jpg";
import javor4 from "../../assets/sportRekreacija/javor4.jpg";
import zokLogo from "../../assets/sportRekreacija/zokLogo.jpg";
import omladinaclogo from "../../assets/sportRekreacija/fkOmladinacLogo.jpg";
import kkLogo from "../../assets/sportRekreacija/kkHP.jpg";
import kudLogo from "../../assets/manifestacije/kudLogo.jpg";
import ig1 from "../../assets/sportRekreacija/igrista1.jpg";
import ig2 from "../../assets/sportRekreacija/igrista2.jpg";
import ig3 from "../../assets/sportRekreacija/igrista3.jpg";
import ig4 from "../../assets/sportRekreacija/igrista4.jpg";
import ig5 from "../../assets/sportRekreacija/igrista5.jpg";
import tk1 from "../../assets/sportRekreacija/tk1.jpg";
import tk2 from "../../assets/sportRekreacija/tk2.jpg";
import tk3 from "../../assets/sportRekreacija/tk3.jpg";
import tk4 from "../../assets/sportRekreacija/tk4.jpg";
import tkLogo from "../../assets/sportRekreacija/tkLogo.jpg";
import fk1 from "../../assets/sportRekreacija/fk1.jpg";
import fk2 from "../../assets/sportRekreacija/fk2.jpg";
import kk1 from "../../assets/sportRekreacija/kk1.jpg";
import kk2 from "../../assets/sportRekreacija/kk2.jpg";
import kk3 from "../../assets/sportRekreacija/kk3.jpg";
import kud1 from "../../assets/sportRekreacija/kud1.jpg";
import kud2 from "../../assets/sportRekreacija/kud2.jpg";
import kud3 from "../../assets/sportRekreacija/kud3.jpg";
import kud4 from "../../assets/sportRekreacija/kud4.jpg";
import Seo from "../../components/Seo";

// Slike po indeksu organizacije (redosljed mora odgovarati org_lista u translation.json)
const orgSlike = [
  [vis1, vis2, vis3, vis4],
  [javor1, javor2, javor3, javor4],
  [null, null, null, null],
  [fk1, fk2],
  [kk1, kk2, kk3],
  [tk1, tk2, tk3, tk4],
  [kud1, kud2, kud3, kud4],
];

const orgLogoi = [
  PedVisocnikLogo,
  psuJavor,
  zokLogo,
  omladinaclogo,
  kkLogo,
  tkLogo,
  kudLogo,
];

const skiSlike = [ig1, ig2, ig3, ig4, ig5];

const skiIkone = [
  <FaMountain />,
  <GiMountainRoad />,
  <GiPathDistance />,
  <FaSkiing />,
  <TbAerialLift />,
  <BsThermometerSnow />,
];

const uvodKarticaIkone = [
  <FaWalking />,
  <IoMdBicycle />,
  <FaSkiing />,
  <GiFishingHook />,
];

const dogadjajiIkone = [
  <FaVolleyballBall />,
  <IoMdFootball />,
  <FaWalking />,
  <IoMdBicycle />,
];

function OrgCard({ org, logo, slike }) {
  return (
    <div className="SR_org">
      <div className="SR_org__header">
        <div className="SR_org__logo">
          {logo ? (
            <img src={logo} alt={org.naziv} className="SR_org__logo-img" loading="lazy" />
          ) : (
            <span className="SR_org__logo-placeholder">🏆</span>
          )}
        </div>
        <h3 className="SR_org__naziv">{org.naziv}</h3>
      </div>

      <p className="SR_org__opis">{org.opis}</p>

      <div className="SR_org__slike">
        {slike.map((slika, i) => (
          <div key={i} className="SR_org__slika-item">
            {slika ? (
              <img
                src={slika}
                alt={org.slikeOpisi?.[i] || ""}
                className="SR_org__slika"
              loading="lazy" />
            ) : (
              <div className="SR_org__slika-placeholder" />
            )}
            <span className="SR_org__slika-opis">{org.slikeOpisi?.[i] || ""}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SportRekreacija() {
  const { t } = useTranslation();

  const orgLista = t("sport_rekreacija.org_lista", { returnObjects: true });
  const skiInfo = t("sport_rekreacija.ski_info", { returnObjects: true });
  const skiSlikeOpisi = t("sport_rekreacija.ski_slike_opisi", { returnObjects: true });
  const uvodKartice = t("sport_rekreacija.uvod_kartice", { returnObjects: true });
  const dogadjaji = t("sport_rekreacija.dogadjaji", { returnObjects: true });

  return (
    <section className="SR_section">
      <Seo title={t("sport_rekreacija.meta_title")} description={t("sport_rekreacija.meta_description")} />
      {/* ── 1. HERO ── */}
      <div className="SR_hero">
        <h1 className="SR_hero__naslov">{t("sport_rekreacija.hero_naslov")}</h1>
        <p className="SR_hero__podnaslov">{t("sport_rekreacija.hero_podnaslov")}</p>
        <a href="#uvod" className="SR_hero__dugme">
          {t("sport_rekreacija.hero_dugme")}
        </a>
      </div>

      {/* ── 2. UVOD ── */}
      <div className="SR_uvod" id="uvod">
        <div className="SR_uvod__tekst">
          <span className="SR_bedz--zeleni">{t("sport_rekreacija.uvod_bedz")}</span>
          <h2>{t("sport_rekreacija.uvod_naslov")}</h2>
          <p>{t("sport_rekreacija.uvod_p1")}</p>
          <p>{t("sport_rekreacija.uvod_p2")}</p>
          <p>{t("sport_rekreacija.uvod_p3")}</p>
        </div>

        <div className="SR_uvod__kartice">
          {uvodKartice.map((k, i) => (
            <div key={i} className="SR_uvod__kartica">
              <span className="SR_uvod__kartica-ikona">{uvodKarticaIkone[i]}</span>
              <div className="SR_uvod__kartica-info">
                <strong className="SR_uvod__kartica-naziv">{k.naziv}</strong>
                <span className="SR_uvod__kartica-opis">{k.opis}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. SPORTSKE ORGANIZACIJE ── */}
      <div className="SR_organizacije">
        <div className="SR_organizacije__wrap">
          <span className="SR_bedz--zeleni SR_bedz--centar">
            {t("sport_rekreacija.org_bedz")}
          </span>
          <h2 className="SR_organizacije__naslov">{t("sport_rekreacija.org_naslov")}</h2>
          <p className="SR_organizacije__podnaslov">{t("sport_rekreacija.org_podnaslov")}</p>
          <div className="SR_organizacije__lista">
            {orgLista.map((org, i) => (
              <OrgCard
                key={i}
                org={org}
                logo={orgLogoi[i]}
                slike={orgSlike[i] || []}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. SKI CENTAR IGRISTA ── */}
      <div className="SR_ski">
        <div className="SR_ski__wrap">
          <span className="SR_bedz--zeleni SR_bedz--centar">
            {t("sport_rekreacija.ski_bedz")}
          </span>
          <h2 className="SR_ski__naslov">{t("sport_rekreacija.ski_naslov")}</h2>
          <p className="SR_ski__podnaslov">{t("sport_rekreacija.ski_podnaslov")}</p>

          <div className="SR_ski__info">
            {skiInfo.map((s, i) => (
              <div key={i} className="SR_ski__info-stavka">
                <span className="SR_ski__info-ikona">{skiIkone[i]}</span>
                <span className="SR_ski__info-vrijednost">{s.vrijednost}</span>
                <span className="SR_ski__info-labela">{s.labela}</span>
              </div>
            ))}
          </div>

          <div className="SR_ski__galerija">
            {skiSlike.map((slika, i) => (
              <div
                key={i}
                className={`SR_ski__slika-item${i === 0 ? " SR_ski__slika-item--velika" : ""}`}
              >
                {slika ? (
                  <img
                    src={slika}
                    alt={skiSlikeOpisi[i] || ""}
                    className="SR_ski__slika"
                  loading="lazy" />
                ) : (
                  <div className="SR_ski__slika-placeholder" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 5. SPORTSKI DOGAĐAJI ── */}
      <div className="SR_dogadjaji">
        <div className="SR_dogadjaji__wrap">
          <span className="SR_bedz--zeleni SR_bedz--centar">
            {t("sport_rekreacija.dogadjaji_bedz")}
          </span>
          <h2 className="SR_dogadjaji__naslov">{t("sport_rekreacija.dogadjaji_naslov")}</h2>
          <p className="SR_dogadjaji__podnaslov">{t("sport_rekreacija.dogadjaji_podnaslov")}</p>
          <div className="SR_dogadjaji__lista">
            {dogadjaji.map((d, i) => (
              <div key={i} className="SR_dogadjaj">
                <div className="SR_dogadjaj__lijevo">
                  <span className="SR_dogadjaj__ikona">{dogadjajiIkone[i]}</span>
                  <span className="SR_dogadjaj__redni">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="SR_dogadjaj__sredina">
                  <h3 className="SR_dogadjaj__naziv">{d.naziv}</h3>
                  <p className="SR_dogadjaj__opis">{d.opis}</p>
                </div>
                <span className="SR_dogadjaj__period">{d.period}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 6. CTA ── */}
      <div className="SR_cta">
        <h2 className="SR_cta__naslov">{t("sport_rekreacija.cta_naslov")}</h2>
        <p className="SR_cta__tekst">{t("sport_rekreacija.cta_tekst")}</p>
        <div className="SR_cta__dugmad">
          <Link to="/aktivni-odmor" className="SR_cta__btn SR_cta__btn--primarni">
            {t("sport_rekreacija.cta_staze")}
          </Link>
          <Link to="/kontakt" className="SR_cta__btn SR_cta__btn--sekundarni">
            {t("sport_rekreacija.cta_kontakt")}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SportRekreacija;