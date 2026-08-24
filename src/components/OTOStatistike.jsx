import React from 'react';
import './OTOStatistike.css';
import { useTranslation } from 'react-i18next';

const statistike = [
  { broj: '2023.', opisKey: 'stat_2023_opis' },
  { broj: '10+',   opisKey: 'stat_sajmovi_opis' },
  { broj: '27%',   opisKey: 'stat_rast_opis' },
  { broj: '1.200', opisKey: 'stat_turisti_opis' },
];

function OTOStatistike() {
  const { t } = useTranslation();

  return (
    <div className="oto-stat">
      {statistike.map((s) => (
        <div key={s.opisKey} className="oto-stat__item">
          <div className="oto-stat__krug">
            <span className="oto-stat__broj">{s.broj}</span>
          </div>
          <p className="oto-stat__opis">{t(`o_to.${s.opisKey}`)}</p>
        </div>
      ))}
    </div>
  );
}

export default OTOStatistike;