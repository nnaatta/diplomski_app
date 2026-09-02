import React, { useState, useEffect } from "react";
import "./Pocetna.css";
import slika from "../../assets/pocetnaSlika.jpg";
import BrzeKartice from "../../components/BrzeKartice";
import TopAtrakcije from "../../components/TopAtrakcije";
import NovostiSlider from "../../components/NovostiSlider";
import { useTranslation } from "react-i18next";
import {
  TiWeatherPartlySunny,
  TiWeatherSunny,
  TiWeatherCloudy,
  TiWeatherShower,
  TiWeatherDownpour,
  TiWeatherSnow,
  TiWeatherStormy,
} from "react-icons/ti";
import Seo from "../../components/Seo";

const WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=44.0812&longitude=18.9506&current=temperature_2m,weathercode&wind_speed_unit=kmh&timezone=Europe%2FBelgrade";

const WEATHER_IKONE = {
  0: <TiWeatherSunny />,
  1: <TiWeatherPartlySunny />,
  2: <TiWeatherPartlySunny />,
  3: <TiWeatherCloudy />,
  45: "🌫️",
  48: "🌫️",
  51: <TiWeatherShower />,
  53: <TiWeatherShower />,
  61: <TiWeatherDownpour />,
  63: <TiWeatherDownpour />,
  71: <TiWeatherSnow />,
  73: <TiWeatherSnow />,
  75: <TiWeatherSnow />,
  80: <TiWeatherDownpour />,
  95: <TiWeatherStormy />,
};

function StatsBar() {
  const { t } = useTranslation();
  const [temp, setTemp] = useState(null);
  const [ikona, setIkona] = useState("🌡️");
  const [opis, setOpis] = useState("");
  const [greska, setGreska] = useState(false);

  useEffect(() => {
    fetch(WEATHER_URL)
      .then((r) => r.json())
      .then((data) => {
        const temperature = Math.round(data.current.temperature_2m);
        const code = data.current.weathercode;
        const opisVremena = t(`pocetna.vrijeme.${code}`) !== `pocetna.vrijeme.${code}`
          ? t(`pocetna.vrijeme.${code}`)
          : t('pocetna.vrijeme.varijabilno');
        setTemp(temperature);
        setIkona(WEATHER_IKONE[code] || "🌡️");
        setOpis(opisVremena);
      })
      .catch(() => setGreska(true));
  }, [t]);

  const stavke = [
    { vrijednost: t('pocetna.stats_visina_v'), label: t('pocetna.stats_visina_l') },
    { vrijednost: t('pocetna.stats_staze_v'), label: t('pocetna.stats_staze_l') },
    {
      vrijednost: greska ? "N/A" : temp !== null ? `${temp}°C` : "...",
      label: greska ? t('pocetna.stats_nedostupno') : opis || t('pocetna.stats_temp'),
      ikona: greska ? "🌡️" : ikona,
    },
    { vrijednost: t('pocetna.stats_stanovnici_v'), label: t('pocetna.stats_stanovnici_l') },
  ];

  return (
    <div className="stats-bar">
      {stavke.map((s, i) => (
        <div key={i} className="stats-bar__stavka">
          {s.ikona && <span className="stats-bar__ikona">{s.ikona}</span>}
          <span className="stats-bar__vrijednost">{s.vrijednost}</span>
          <span className="stats-bar__label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

function OHanPijesku() {
  const { t } = useTranslation();
  return (
    <section className="o-han-pijesku">
      <div className="o-han-pijesku__wrap">
        <span className="o-han-pijesku__badge">{t('pocetna.ohp_badge')}</span>
        <h2 className="o-han-pijesku__naslov">{t('pocetna.ohp_naslov')}</h2>
        <p className="o-han-pijesku__tekst">{t('pocetna.ohp_tekst')}</p>
        <a href="/o-han-pijesku/danas" className="o-han-pijesku__btn">
          {t('pocetna.ohp_btn')}
        </a>
      </div>
    </section>
  );
}

function Pocetna() {
  const { t } = useTranslation();

  return (
    <>
      <Seo title={t("pocetna.meta_title")} description={t("pocetna.meta_description")} />
      <section id="pocetna" className="pocetna-hero">
        <img
          src={slika}
          alt="Han Pijesak – pogled na prirodu"
          className="pocetna-hero__img"
        />
        <div className="pocetna-hero__content">
          <h1 className="pocetna-hero__title">
            {t('pocetna.hero_naslov')}
          </h1>
        </div>
      </section>

      <StatsBar />
      <BrzeKartice />
      <OHanPijesku />

      <section className="video-section">
        <div className="video-section__wrap">
          <h2>{t('pocetna.video_naslov')}</h2>
          <p>{t('pocetna.video_opis')}</p>
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/oGe5d68igkA?si=dZVu7BsvMGw0K4aa"
              title={t('pocetna.video_naslov')}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <TopAtrakcije />
    </>
  );
}

export default Pocetna;