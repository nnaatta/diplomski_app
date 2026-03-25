import React from 'react';
import './BrzeKartice.css';
import { IoSearch } from "react-icons/io5";
import { RiHome4Line } from "react-icons/ri";
import { IoCalendarOutline } from "react-icons/io5";

const kartice = [
  {
    ikona: <IoSearch/>,
    naslov: 'Istraži destinaciju',
    opis: 'Upoznaj Han Pijesak — istoriju, kulturu i sve što ovo mjesto čini posebnim.',
    link: '/han-pijesak-danas',
    cta: 'Saznaj više',
  },
  {
    ikona: <RiHome4Line/>,
    naslov: 'Pronađi smještaj',
    opis: 'Od planinarskih domova do privatnih apartmana — nađi savršeno mjesto za odmor.',
    link: '/smjestaj',
    cta: 'Pregledaj smještaj',
    istaknuta: true,
  },
  {
    ikona: <IoCalendarOutline/>,
    naslov: 'Predstojeći događaji',
    opis: 'Festivali, manifestacije i tradicija — ne propusti ono što Han Pijesak priprema.',
    link: '/manifestacije',
    cta: 'Pogledaj program',
  },
];

function BrzeKartice() {
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