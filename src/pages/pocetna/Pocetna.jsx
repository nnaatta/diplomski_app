import React, { useState, useEffect } from 'react';
import './Pocetna.css';
import slika from '../../assets/pocetnaSlika.jpg';
import BrzeKartice from '../../components/BrzeKartice';
import TopAtrakcije from '../../components/TopAtrakcije';
import NovostiSlider from '../../components/NovostiSlider';
import { TiWeatherPartlySunny,TiWeatherSunny, TiWeatherCloudy, TiWeatherShower, TiWeatherDownpour, TiWeatherSnow, TiWeatherStormy  } from "react-icons/ti";

const WEATHER_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=44.0812&longitude=18.9506&current=temperature_2m,weathercode&wind_speed_unit=kmh&timezone=Europe%2FBelgrade';

const WEATHER_OPISI = {
  0:  { opis: 'Vedro',               ikona: <TiWeatherSunny/>  },
  1:  { opis: 'Uglavnom vedro',      ikona: <TiWeatherPartlySunny/> },
  2:  { opis: 'Djelimično oblačno',  ikona: <TiWeatherPartlySunny/>  },
  3:  { opis: 'Oblačno',             ikona: <TiWeatherCloudy/>  },
  45: { opis: 'Magla',               ikona: '🌫️' },
  48: { opis: 'Magla',               ikona: '🌫️' },
  51: { opis: 'Rosulja',             ikona: <TiWeatherShower/> },
  53: { opis: 'Rosulja',             ikona: <TiWeatherShower/>  },
  61: { opis: 'Kiša',                ikona: <TiWeatherDownpour/> },
  63: { opis: 'Kiša',                ikona: <TiWeatherDownpour/> },
  71: { opis: 'Snijeg',              ikona: <TiWeatherSnow/>  },
  73: { opis: 'Snijeg',              ikona: <TiWeatherSnow/>  },
  75: { opis: 'Snijeg',              ikona: <TiWeatherSnow/>  },
  80: { opis: 'Pljuskovi',           ikona: <TiWeatherDownpour/> },
  95: { opis: 'Grmljavina',          ikona: <TiWeatherStormy/>  },
};

function StatsBar() {
  const [temp, setTemp]   = useState(null);
  const [ikona, setIkona] = useState('🌡️');
  const [opis, setOpis]   = useState('');
  const [greska, setGreska] = useState(false);

  useEffect(() => {
    fetch(WEATHER_URL)
      .then((r) => r.json())
      .then((data) => {
        const t    = Math.round(data.current.temperature_2m);
        const code = data.current.weathercode;
        console.log('Weather code:', code);
        const info = WEATHER_OPISI[code] || { opis: 'Varijabilno', ikona: '🌡️' };
        setTemp(t);
        setIkona(info.ikona);
        setOpis(info.opis);
      })
      .catch(() => setGreska(true));
  }, []);

  const stavke = [
    { vrijednost: '1100 m',  label: 'nadmorska visina' },
    { vrijednost: '50+ km', label: 'planinarskih staza' },
    {
      vrijednost: greska ? 'N/A' : temp !== null ? `${temp}°C` : '...',
      label:      greska ? 'prognoza nedostupna' : opis || 'trenutna temperatura',
      ikona:      greska ? '🌡️' : ikona,
    },
    { vrijednost: '3.530', label: 'stanovnika' },
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
  return (
    <section className="o-han-pijesku">
      <div className="o-han-pijesku__wrap">
        <span className="o-han-pijesku__badge">Upoznajte</span>
        <h2 className="o-han-pijesku__naslov">Vazdušnu banju</h2>
        <p className="o-han-pijesku__tekst">
          Han Pijesak se nalazi na nadmorskoj visini od 1.100 m, što ga čini gradom (naseljem) sa najvećom nadmorskom visinom u Republici Srpskoj.
          Okružen je visovima Velikim Žepom 1.537 m, Javornikom 1.219 m, Studenom Gorom 1.149 m i Trešnjevcem 1.245 m, a bujne četinarske i listopadne šume doprinijele su da ovo mjesto postane poznata klimatska i vazdušna banja, jer po količini ozona zauzima jedno od najznačajnijih mjesta u Evropi.
          Ovo je i zvanično potvrđeno početkom novembra 2023. godine, kada je cijelo područje opštine Han Pijesak proglašeno za vazdušnu banju.
        </p>
        <a href="/o-han-pijesku/danas" className="o-han-pijesku__btn">
          Saznaj više o Han Pijesku →
        </a>
      </div>
    </section>
  );
}

function Pocetna() {
  return (
    <>
      <section id="pocetna" className="pocetna-hero">
        <img
          src={slika}
          alt="Han Pijesak – pogled na prirodu"
          className="pocetna-hero__img"
        />
        <div className="pocetna-hero__overlay" aria-hidden="true" />
        <div className="pocetna-hero__content">
          
          <h1 className="pocetna-hero__title">
            Dobrodošli u Han Pijesak - vazdušnu banju!
          </h1>
        </div>
      </section>

      <StatsBar />
      <BrzeKartice />
      <OHanPijesku />
      <TopAtrakcije />
      <NovostiSlider />
    </>
  );
}

export default Pocetna;