import React, { useState } from 'react';
import './NovostiSlider.css';

const postovi = [
  {
    slika: '',
    datum: '10. mart 2025.',
    naslov: 'Han Pijesak priprema bogat program za ljetnu sezonu',
    link: '/blog/ljetna-sezona-2025',
  },
  {
    slika: '',
    datum: '24. februar 2025.',
    naslov: 'Otvoren novi planinarski put prema vrhu Romanije',
    link: '/blog/planinarski-put-romanija',
  },
  {
    slika: '',
    datum: '5. februar 2025.',
    naslov: 'Dvorac Karađorđevića dobija novu turističku signalizaciju',
    link: '/blog/dvorac-signalizacija',
  },
  {
    slika: '',
    datum: '18. januar 2025.',
    naslov: 'Zimska čarolija na Romaniji — Han Pijesak pod snijegom',
    link: '/blog/zimska-romanija',
  },
];

function NovostiSlider() {
  const [aktivan, setAktivan] = useState(0);

  const prethodni = () => {
    setAktivan((prev) => (prev === 0 ? postovi.length - 1 : prev - 1));
  };

  const sljedeci = () => {
    setAktivan((prev) => (prev === postovi.length - 1 ? 0 : prev + 1));
  };

  const post = postovi[aktivan];

  return (
    <section className="novosti">
      <div className="novosti__header">
        <h2 className="novosti__naslov">Novosti iz Han Pijeska</h2>
        <p className="novosti__podnaslov">Budite u toku sa svim dešavanjima</p>
      </div>

      <div className="novosti__slider">
        <a href={post.link} className="novosti__kartica">
         
          <div className="novosti__slika-wrap">
            {post.slika
              ? <img src={post.slika} alt={post.naslov} className="novosti__slika" />
              : <div className="novosti__placeholder" />
            }
          </div>

         
          <div className="novosti__overlay">
            <span className="novosti__datum">{post.datum}</span>
            <h3 className="novosti__post-naslov">{post.naslov}</h3>
            <span className="novosti__cta">Pročitaj više →</span>
          </div>
        </a>

       
        <button
          className="novosti__strelica novosti__strelica--lijevo"
          onClick={(e) => { e.preventDefault(); prethodni(); }}
          aria-label="Prethodni post"
        >
          ‹
        </button>
        <button
          className="novosti__strelica novosti__strelica--desno"
          onClick={(e) => { e.preventDefault(); sljedeci(); }}
          aria-label="Sljedeći post"
        >
          ›
        </button>

        
        <div className="novosti__dots">
          {postovi.map((_, i) => (
            <button
              key={i}
              className={`novosti__dot${i === aktivan ? ' novosti__dot--aktivan' : ''}`}
              onClick={() => setAktivan(i)}
              aria-label={`Post ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default NovostiSlider;