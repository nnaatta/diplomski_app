import React, { useState, useEffect } from 'react';
import './ImageSlider.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

// ===== PROPS =====


function ImageSlider({ slajdovi = [], visina = '460px', interval = 4000 }) {
  const [aktivan, setAktivan] = useState(0);

  useEffect(() => {
    if (slajdovi.length <= 1) return;
    const timer = setInterval(() => {
      setAktivan((prev) => (prev === slajdovi.length - 1 ? 0 : prev + 1));
    }, interval);
    return () => clearInterval(timer);
  }, [slajdovi.length, interval]);

  const prethodni = () =>
    setAktivan((prev) => (prev === 0 ? slajdovi.length - 1 : prev - 1));

  const sljedeci = () =>
    setAktivan((prev) => (prev === slajdovi.length - 1 ? 0 : prev + 1));

  if (!slajdovi.length) return null;

  const trenutni = slajdovi[aktivan];

  return (
    <div className="img-slider" style={{ '--slider-visina': visina }}>

      
      {trenutni.slika
        ? <img src={trenutni.slika} alt={trenutni.opis || ''} className="img-slider__slika" loading="lazy" />
        : <div className="img-slider__placeholder" />
      }


      
      {slajdovi.length > 1 && (
        <>
          <button
            className="img-slider__strelica img-slider__strelica--lijevo"
            onClick={prethodni}
            aria-label="Prethodna slika"
          >
            <FaChevronLeft />
          </button>
          <button
            className="img-slider__strelica img-slider__strelica--desno"
            onClick={sljedeci}
            aria-label="Sljedeća slika"
          >
            <FaChevronRight />
          </button>

          
          <div className="img-slider__progress">
            {slajdovi.map((_, i) => (
              <button
                key={i}
                className={`img-slider__bar${i === aktivan ? ' img-slider__bar--aktivan' : ''}`}
                onClick={() => setAktivan(i)}
                aria-label={`Slajd ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}

    </div>
  );
}

export default ImageSlider;