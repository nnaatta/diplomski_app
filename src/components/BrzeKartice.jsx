import React from 'react';
import './BrzeKartice.css';
import { useTranslation } from 'react-i18next';
import { IoSearch, IoCalendarOutline } from "react-icons/io5";
import { RiHome4Line } from "react-icons/ri";

function BrzeKartice() {
  const { t } = useTranslation();

  const kartice = [
    {
      ikona: <IoSearch />,
      naslov: t('brze_kartice.kartica1_naslov'),
      opis: t('brze_kartice.kartica1_opis'),
      link: '/o-han-pijesku',
      cta: t('brze_kartice.kartica1_cta'),
    },
    {
      ikona: <RiHome4Line />,
      naslov: t('brze_kartice.kartica2_naslov'),
      opis: t('brze_kartice.kartica2_opis'),
      link: '/smjestaj',
      cta: t('brze_kartice.kartica2_cta'),
      istaknuta: true,
    },
    {
      ikona: <IoCalendarOutline />,
      naslov: t('brze_kartice.kartica3_naslov'),
      opis: t('brze_kartice.kartica3_opis'),
      link: '/manifestacije',
      cta: t('brze_kartice.kartica3_cta'),
    },
  ];

  return (
    <section className="brze-kartice">
      <div className="brze-kartice__grid">
        {kartice.map((k) => (
          <a
            href={k.link}
            key={k.naslov}
            className={`brze-kartica${k.istaknuta ? ' brze-kartica--istaknuta' : ''}`}
          >
            <span className="brze-kartica__ikona">{k.ikona}</span>
            <h3 className="brze-kartica__naslov">{k.naslov}</h3>
            <p className="brze-kartica__opis">{k.opis}</p>
            <span className="brze-kartica__cta">{k.cta} →</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default BrzeKartice;