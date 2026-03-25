import React from 'react';
import './VjerskiObjekti.css';
import { FaLocationDot } from 'react-icons/fa6';
import ImageSlider from '../../components/ImageSlider';

import svPantelejmon1 from '../../assets/vjerskiObjekti/crkvaSvPantelejmon1.jpg';
import svPantelejmon2 from '../../assets/vjerskiObjekti/svPantelejmon2.jpg';
import dzimrije1 from '../../assets/vjerskiObjekti/dzimrije1.jpg';
import pjenovac1 from '../../assets/vjerskiObjekti/pjenovac1.jpg';
import pjenovac2 from '../../assets/vjerskiObjekti/pjenovac2.jpg';
import nevacka1 from '../../assets/vjerskiObjekti/nevacka1.jpg';

// Statički podaci — u produkciji bi se fetchovali sa Laravel API-ja:
// const { data: objekti } = await axios.get('/api/vjerski-objekti');
const objekti = [
  {
    id: 1,
    naziv: 'Crkva Svetog velikomučenika Pantelejmona',
    tip: 'Pravoslavni vjerski objekat',
    opis: 'Crkva Svetog velikomučenika Pantelejmona je hram Srpske pravoslavne crkve koji se nalazi u Han Pijesku u Republici Srpskoj. Pripada eparhiji zvorničko-tuzlanskoj, sjedište je parohije. Prvobitna crkva u Han Pijesku sagrađena je 1923. godine, a kumovao joj je lično kralj Aleksandar Prvi Karađorđević koji je često boravio u svojoj rezidenciji u Han Pijesku. Stari hram su avionima bombardovale i porušile ustaše 1942. godine, a od nekadašnjeg hrama sačuvana su samo tri zvona. Gradnja novog jednobrodnog hrama počela je 1972. godine i završena 1979. godine.',
    lokacija: 'https://maps.app.goo.gl/X4MTff3phK3ddrYDA',
    slike: [
      { slika: svPantelejmon1, opis: 'Crkva Svetog Pantelejmona — Han Pijesak' },
      { slika: svPantelejmon2, opis: 'Crkva Svetog Pantelejmona' },
    ],
  },
  {
    id: 2,
    naziv: 'Hram Svetog cara Konstantina i carice Jelene',
    tip: 'Pravoslavni vjerski objekat',
    opis: 'Između Prvog i Drugog svjetskog rata, u selu Džimrije postojala je crkva brvnara posvećena Sv. caru Konstantinu i carici Jeleni. Obnova i zidanje crkve započeta je jula 2000. godine, a radovi su završeni 2002. godine. Zemljište za gradnju hrama darovala je porodica Mandić iz Han Pijeska. Crkvu je osvetio episkop zvorničko-tuzlanski gospodin Vasilije i episkop američki gospodin Longin, uoči dana hramovne slave 2. juna 2002. godine.',
    lokacija: 'https://maps.app.goo.gl',
    slike: [
      { slika: dzimrije1, opis: 'Hram u Džimrijama' },
    ],
  },
  {
    id: 3,
    naziv: 'Manastir Pjenovac',
    tip: 'Pravoslavni vjerski objekat',
    opis: 'Manastir u Pjenovcu posvećen je Usjekovanju glave Svetog Jovana Krstitelja. Građen je od početka maja 2001. do početka juna 2002. godine. Gradnju su finansirali vjernici i privredni subjekti sa prostora opštine Han Pijesak i opština širom Republike Srpske, kao i dijaspore. Ikonostas, ikone i živopis radio je akademski slikar Nikolić Milan iz Šapca. Nedaleko od današnjeg manastira postojao je mali manastir koji je srušen dolaskom Turaka.',
    lokacija: 'https://maps.app.goo.gl/ijHAYhUNMDDMyAhC9',
    slike: [
      { slika: pjenovac1, opis: 'Manastir Pjenovac' },
      { slika: pjenovac2, opis: 'Manastir Pjenovac — detalj' },
    ],
  },
  {
    id: 4,
    naziv: 'Džamija u Nevačkoj',
    tip: 'Islamski vjerski objekat',
    opis: 'Jedan od najstarijih islamskih objekata na ovom području datira još iz 19. vijeka. Nakon razaranja tokom ratnih dešavanja, džamija je obnovljena i danas ponovo služi svojoj namjeni, predstavljajući važan simbol povratka i obnove života u ovom kraju.',
    lokacija: 'https://maps.app.goo.gl/FFbC9CMnhxKsTKqs7',
    slike: [
      { slika: nevacka1, opis: 'Džamija u Nevačkoj' },
    ],
  },
];

function VjerskiObjekti() {
  return (
    <section className="vo">

      {/* ===== HERO ===== */}
      <div className="vo__hero">
        <div className="vo__hero-before" />
        <div className="vo__hero-after" />
        <h1 className="vo__hero-naslov">Vjerski objekti</h1>
        <p className="vo__hero-podnaslov">na području opštine Han Pijesak</p>
      </div>

      {/* ===== UVOD ===== */}
      <div className="vo__uvod">
        <h2 className="vo__uvod-naslov">Vjerska baština Han Pijeska</h2>
        <p className="vo__uvod-tekst">
          Područje Han Pijeska karakteriše bogata, iako brojčano skromna, vjerska baština
          koja svjedoči o dugoj istoriji i suživotu različitih kultura i religija.
          Na teritoriji opštine nalaze se pravoslavni i islamski vjerski objekti,
          kao i značajni religijski lokaliteti koji imaju istorijsku i kulturnu vrijednost.
        </p>
      </div>

      {/* ===== OBJEKTI ===== */}
      <div className="vo__objekti">
        {objekti.map((o) => (
          <div
            key={o.id}
            className={`vo__blok${o.id % 2 === 0 ? ' vo__blok--obrnuto' : ''}`}
          >
            {/* Slider */}
            <div className="vo__blok-slider">
              <ImageSlider slajdovi={o.slike} visina="420px" interval={5000} />
            </div>

            {/* Tekst */}
            <div className="vo__blok-tekst">
              <span className="vo__bedz">{o.tip}</span>
              <h2 className="vo__blok-naziv">{o.naziv}</h2>
              <p className="vo__blok-opis">{o.opis}</p>
              <a
                href={o.lokacija}
                target="_blank"
                rel="noreferrer"
                className="vo__blok-lokacija"
              >
                <FaLocationDot /> Pogledaj na mapi
              </a>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

export default VjerskiObjekti;