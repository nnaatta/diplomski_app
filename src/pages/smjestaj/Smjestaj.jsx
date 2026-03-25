import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Smjestaj.css';
import { FaLocationDot } from 'react-icons/fa6';
import heroSlika from '../../assets/smjestajPozadina.jpg';
import heroSlika2 from '../../assets/smjestajPozadina2.jpg';

import tamara from "../../assets/Smjestaj/Tamara.jpg";
import romanija from "../../assets/Smjestaj/Romanija.jpg";
import bracaKosoric from "../../assets/Smjestaj/BracaKosoric.jpg";
import marija from "../../assets/Smjestaj/Marija.jpg";




const smjestaji = [
  { id: 1, naziv: 'Romanija — Brvnara za odmor', kategorija: 'Kuća za odmor', zvjezdice: 2, lokacija: 'Mrkalji, 5,6 km od centra', slika: romanija },
  { id: 2, naziv: 'Vila Marija HP',              kategorija: 'Kuća za odmor', zvjezdice: 3, lokacija: '1,6 km od centra',           slika: marija },
  { id: 3, naziv: 'Braća Kosorić',               kategorija: 'Kuća za odmor', zvjezdice: 2, lokacija: 'Kosovača, 3,2 km od centra', slika: bracaKosoric },
  { id: 4, naziv: 'Tamara — Brvnara za odmor',   kategorija: 'Kuća za odmor', zvjezdice: 2, lokacija: '0,9 km od centra',           slika: tamara },
];

const filteri = ['Sve', 'Kuća za odmor', 'Apartman', 'Planinarski dom'];

function Zvjezdice({ broj }) {
  return (
    <div className="smjestaj-kartica__zvjezdice">
      {Array.from({ length: 3 }, (_, i) => (
        <span key={i} className={i < broj ? 'zvjezdica--aktivna' : 'zvjezdica--neaktivna'}>★</span>
      ))}
    </div>
  );
}

function Smjestaj() {
  const [aktivniFilter, setAktivniFilter] = useState('Sve');

  const filtrirani = aktivniFilter === 'Sve'
    ? smjestaji
    : smjestaji.filter((s) => s.kategorija === aktivniFilter);

  return (
    <section className="smjestaj-section">

      {/* Hero */}
      <div className="smjestaj-hero">
  <img src={heroSlika2} alt="Smještaj Han Pijesak" className="smjestaj-hero__img" />
  <div className="smjestaj-hero__overlay" />
  <div className="smjestaj-hero__tekst">
    <h1>Smještaj</h1>
    <p>Pronađite savršeno mjesto za odmor u srcu vazdušne banje</p>
  </div>
</div>

      {/* Uvodni tekst */}
      <div className="smjestaj-tekst">
        <p>Han Pijesak nudi autentičan smještaj u srcu planinske prirode — od brvnara do modernih vila, svaki objekat pruža jedinstven doživljaj odmora na čistom planinskom zraku.</p>
      </div>

      {/* Filteri */}
      <div className="smjestaj-filteri">
        {filteri.map((f) => (
          <button
            key={f}
            className={`smjestaj-filter${aktivniFilter === f ? ' smjestaj-filter--aktivan' : ''}`}
            onClick={() => setAktivniFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Kartice */}
      <div className="smjestaj-kartice">
        <h2 className="smjestaj-kartice__naslov">
          Trenutno u ponudi — {filtrirani.length} {filtrirani.length === 1 ? 'objekat' : 'objekta'}
        </h2>
        <div className="smjestaj-kartice__grid">
          {filtrirani.map((s) => (
            <Link to={`/smjestaj/${s.id}`} key={s.id} className="smjestaj-kartica">
              {/* Slika */}
              <div className="smjestaj-kartica__slika-wrap">
                {s.slika
                  ? <img src={s.slika} alt={s.naziv} className="smjestaj-kartica__slika" />
                  : <div className="smjestaj-kartica__placeholder" />
                }
                <span className="smjestaj-kartica__tag">{s.kategorija}</span>
              </div>
              {/* Tekst */}
              <div className="smjestaj-kartica__tekst">
                <Zvjezdice broj={s.zvjezdice} />
                <h3 className="smjestaj-kartica__naziv">{s.naziv}</h3>
                <span className="smjestaj-kartica__lokacija">
                  <FaLocationDot />
                  <span>{s.lokacija}</span>
                </span>
                <span className="smjestaj-kartica__cta">Pogledaj detalje →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </section>
  );
}

export default Smjestaj;