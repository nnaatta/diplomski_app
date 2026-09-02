import React from "react";
import "./TopAtrakcije.css";
import { useTranslation } from "react-i18next";
import dvoracSlika from "../assets/dvoracKaradjordjevica.jpeg";
import vazdusnaBanjaSlika from "../assets/vazdusnaBanja.jpg";
import vodopadSlika from "../assets/Vodopad-Skakavac.jpg";

const atrakcijeSlike = [dvoracSlika, vodopadSlika, vazdusnaBanjaSlika];

const atrakcijeLinks = [
  "/znamenitosti/dvorac-karadjordjevica",
  "/atrakcije",
  "/zdravstveni-turizam",
];

const atrakcijeIstaknuta = [false, true, false];

function TopAtrakcije() {
  const { t } = useTranslation();
  const atrakcije = t("top_atrakcije.atrakcije", {
    returnObjects: true,
  });

  return (
    <section className="top-atrakcije">
      <div className="top-atrakcije__header">
        <h2 className="top-atrakcije__naslov">
          {t("top_atrakcije.naslov")}
        </h2>
        <p className="top-atrakcije__podnaslov">
          {t("top_atrakcije.podnaslov")}
        </p>
      </div>

      <div className="top-atrakcije__grid">
        {atrakcije.map((a, i) => (
          <a
            href={atrakcijeLinks[i]}
            key={a.naslov}
            className={`top-atrakcija${
              atrakcijeIstaknuta[i]
                ? " top-atrakcija--istaknuta"
                : ""
            }`}
          >
            <div className="top-atrakcija__slika-wrap">
              <img
                src={atrakcijeSlike[i]}
                alt={a.naslov}
                className="top-atrakcija__slika"
              loading="lazy" />
            </div>

            <div className="top-atrakcija__tekst">
              <span className="top-atrakcija__tag">
                {a.tag}
              </span>

              <h3 className="top-atrakcija__naslov">
                {a.naslov}
              </h3>

              <p className="top-atrakcija__opis">
                {a.opis}
              </p>

              <span className="top-atrakcija__cta">
                {t("top_atrakcije.cta")}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default TopAtrakcije;