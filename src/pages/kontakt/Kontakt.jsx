import React, { useState } from 'react';
import './Kontakt.css';
import { FaLocationDot, FaPhone, FaRegEnvelope, FaClock } from 'react-icons/fa6';

const tipoviUpita = [
  'Opšti upit',
  'Smještaj',
  'Manifestacije',
  'Planinarski turizam',
  'Zdravstveni turizam',
  'Mediji i press',
  'Ostalo',
];

const radnoVrijeme = [
  { dan: 'Ponedjeljak – Petak', vrijeme: '07:00 – 15:00' },
  { dan: 'Subota',              vrijeme: 'Zatvoreno' },
  { dan: 'Nedjelja',            vrijeme: 'Zatvoreno' },
];

const pocetnoStanje = {
  ime:     '',
  email:   '',
  telefon: '',
  tip:     '',
  naslov:  '',
  poruka:  '',
};

function Kontakt() {
  const [forma, setForma]       = useState(pocetnoStanje);
  const [poslano, setPoslano]   = useState(false);
  const [greska, setGreska]     = useState('');

  const handleChange = (e) => {
    setForma({ ...forma, [e.target.name]: e.target.value });
  };

  const validiraj = () => {
    if (!forma.ime.trim())    return 'Ime i prezime su obavezni.';
    if (!forma.email.trim())  return 'Email adresa je obavezna.';
    if (!/\S+@\S+\.\S+/.test(forma.email)) return 'Email adresa nije ispravna.';
    if (!forma.tip)           return 'Odaberite tip upita.';
    if (!forma.naslov.trim()) return 'Naslov poruke je obavezan.';
    if (!forma.poruka.trim()) return 'Poruka ne može biti prazna.';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const greska = validiraj();
    if (greska) {
      setGreska(greska);
      return;
    }
    setGreska('');
    // TODO: ovdje dodati API poziv kada bude spreman Laravel backend
    // axios.post('/api/kontakt', forma).then(...)
    console.log('Forma data:', forma);
    setPoslano(true);
    setForma(pocetnoStanje);
  };

  return (
    <section className="kontakt">

      {/* ===== HERO ===== */}
      <div className="kontakt__hero">
        <h1>Kontaktirajte nas</h1>
        <p>Tu smo da odgovorimo na sva vaša pitanja</p>
      </div>

      {/* ===== GLAVNI GRID ===== */}
      <div className="kontakt__grid">

        {/* ===== LIJEVA KOLONA — info ===== */}
        <div className="kontakt__info">

          {/* Kontakt podaci */}
          <div className="kontakt__info-blok">
            <h2 className="kontakt__info-naslov">Kontakt podaci</h2>
            <address className="kontakt__adresa">
              <p><FaLocationDot className="kontakt__ikona" /> Aleksandra Karađorđevića 4, Han Pijesak</p>
              <p><FaPhone className="kontakt__ikona" /> +387 66 787 850</p>
              <p><FaRegEnvelope className="kontakt__ikona" /> tohanpijesak@gmail.com</p>
            </address>
          </div>

          {/* Radno vrijeme */}
          <div className="kontakt__info-blok">
            <h2 className="kontakt__info-naslov">
              <FaClock className="kontakt__ikona" /> Radno vrijeme
            </h2>
            <ul className="kontakt__radno">
              {radnoVrijeme.map((r) => (
                <li key={r.dan} className={r.vrijeme === 'Zatvoreno' ? 'kontakt__radno-item kontakt__radno-item--zatvoreno' : 'kontakt__radno-item'}>
                  <span>{r.dan}</span>
                  <span>{r.vrijeme}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Google mapa */}
          <div className="kontakt__mapa-wrap">
            <iframe
              title="Lokacija Turističke organizacije Han Pijesak"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2866.1032828151924!2d18.948392876064215!3d44.08122217108502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47591bf6408252e3%3A0x553c3532a7dc9443!2sMunicipality%20of%20Han%20Pijesak!5e0!3m2!1sen!2srs!4v1773314379034!5m2!1sen!2srs"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>

        {/* ===== DESNA KOLONA — forma ===== */}
        <div className="kontakt__forma-wrap">
          {poslano ? (
            <div className="kontakt__uspjeh">
              <span className="kontakt__uspjeh-ikona">✓</span>
              <h2>Poruka poslana!</h2>
              <p>Hvala vam na poruci. Odgovorićemo vam u najkraćem mogućem roku.</p>
              <button
                className="kontakt__btn"
                onClick={() => setPoslano(false)}
              >
                Pošalji novu poruku
              </button>
            </div>
          ) : (
            <form className="kontakt__forma" onSubmit={handleSubmit} noValidate>
              <h2 className="kontakt__forma-naslov">Pošaljite nam poruku</h2>

              {greska && <p className="kontakt__greska">{greska}</p>}

              {/* Ime */}
              <div className="kontakt__polje">
                <label htmlFor="ime">Ime i prezime <span>*</span></label>
                <input
                  type="text"
                  id="ime"
                  name="ime"
                  value={forma.ime}
                  onChange={handleChange}
                  placeholder="npr. Marija Petrović"
                />
              </div>

              {/* Email i telefon u redu */}
              <div className="kontakt__red">
                <div className="kontakt__polje">
                  <label htmlFor="email">Email adresa <span>*</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={forma.email}
                    onChange={handleChange}
                    placeholder="npr. marija@email.com"
                  />
                </div>
                <div className="kontakt__polje">
                  <label htmlFor="telefon">Broj telefona</label>
                  <input
                    type="tel"
                    id="telefon"
                    name="telefon"
                    value={forma.telefon}
                    onChange={handleChange}
                    placeholder="npr. +387 61 123 456"
                  />
                </div>
              </div>

              {/* Tip upita */}
              <div className="kontakt__polje">
                <label htmlFor="tip">Tip upita <span>*</span></label>
                <select
                  id="tip"
                  name="tip"
                  value={forma.tip}
                  onChange={handleChange}
                >
                  <option value="">-- Odaberite tip upita --</option>
                  {tipoviUpita.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Naslov */}
              <div className="kontakt__polje">
                <label htmlFor="naslov">Naslov poruke <span>*</span></label>
                <input
                  type="text"
                  id="naslov"
                  name="naslov"
                  value={forma.naslov}
                  onChange={handleChange}
                  placeholder="Kratki opis vaše poruke"
                />
              </div>

              {/* Poruka */}
              <div className="kontakt__polje">
                <label htmlFor="poruka">Poruka <span>*</span></label>
                <textarea
                  id="poruka"
                  name="poruka"
                  value={forma.poruka}
                  onChange={handleChange}
                  placeholder="Napišite vašu poruku ovdje..."
                  rows={5}
                />
              </div>

              <button type="submit" className="kontakt__btn">
                Pošalji poruku →
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}

export default Kontakt;