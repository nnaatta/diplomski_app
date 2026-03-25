import React from 'react';
import './OTOStatistike.css';

const statistike = [
  { broj: '2023.',  opis: 'Godina osnivanja' },
  { broj: '5+',     opis: 'Nastupa na sajmovima' },
  { broj: '27%',    opis: 'Rast turizma' },
  { broj: '1.200',  opis: 'Turista u 2024.' },
];

function OTOStatistike() {
  return (
    <div className="oto-stat">
      {statistike.map((s) => (
        <div key={s.opis} className="oto-stat__item">
          <div className="oto-stat__krug">
            <span className="oto-stat__broj">{s.broj}</span>
          </div>
          <p className="oto-stat__opis">{s.opis}</p>
        </div>
      ))}
    </div>
  );
}

export default OTOStatistike;