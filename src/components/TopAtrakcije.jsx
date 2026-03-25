import React from 'react'
import './TopAtrakcije.css';
import dvoracSlika from '../assets/dvoracKaradjordjevica.jpeg';
import vazdusnaBanjaSlika from '../assets/vazdusnaBanja.jpg';
import vodopadSlika from '../assets/Vodopad-Skakavac.jpg';

const atrakcije = [
  {
    slika: dvoracSlika,
    naslov: 'Dvorac Karađorđevića',
    opis: 'Izgrađen početkom 20. vijeka, dvorac Karađorđevića svjedoči o bogatoj istoriji ovog kraja i vremenu kada je Han Pijesak bio omiljeno utočište kraljevske porodice. Danas fascinira svojom arhitekturom i pogledom na romanijsku prirodu.',
    tag: 'Istorija',
    link: '/istorija/dvoracKaradjordjevica',
  },
  {
    slika: vodopadSlika,
    naslov: 'Vodopad Skakavac',
    opis: 'Okružen gustom šumom i netaknutom prirodom, Vodopad Skakavac je jedno od najljepših prirodnih čuda ovog kraja. Savršena polazna tačka za planinske šetnje i izlete koji ostavljaju neizbrisiv utisak.',
    tag: 'Priroda',
    link: '/atraktivnosti/vodopadSkakavac',
    istaknuta: true,
  },
  {
    slika: vazdusnaBanjaSlika,
    naslov: 'Vazdušna banja',
    opis: 'Zahvaljujući jedinstvenoj klimi i čistom planinskom vazduhu, Han Pijesak s ponosom nosi naziv vazdušne banje. Idealno odredište za odmor i oporavak — čist zrak i blaga planinska klima čekaju te tokom cijele godine.',
    tag: 'Zdravlje',
    link: '/zdravstveni-turizam',
  },
]

function TopAtrakcije() {
  return (
    <section className="top-atrakcije">
      <div className="top-atrakcije__header">
        <h2 className="top-atrakcije__naslov">Top atrakcije</h2>
        <p className="top-atrakcije__podnaslov">Otkrijte zašto Han Pijesak osvaja svakog ko ga posjeti</p>
      </div>

      <div className="top-atrakcije__grid">
        {atrakcije.map((a) => (
          <a
            href={a.link}
            key={a.naslov}
            className={`top-atrakcija${a.istaknuta ? ' top-atrakcija--istaknuta' : ''}`}
          >
            <div className="top-atrakcija__slika-wrap">
              <img src={a.slika} alt={a.naslov} className="top-atrakcija__slika" />
            </div>
            <div className="top-atrakcija__tekst">
              <span className="top-atrakcija__tag">{a.tag}</span>
              <h3 className="top-atrakcija__naslov">{a.naslov}</h3>
              <p className="top-atrakcija__opis">{a.opis}</p>
              <span className="top-atrakcija__cta">Saznajte više →</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export default TopAtrakcije
