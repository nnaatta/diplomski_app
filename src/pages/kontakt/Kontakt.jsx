import React, { useState } from 'react';
import './Kontakt.css';
import { useTranslation } from 'react-i18next';
import { FaLocationDot, FaPhone, FaRegEnvelope, FaClock } from 'react-icons/fa6';
import Seo from "../../components/Seo";
import { API_URL } from "../adminPage/context/AuthContext";

const pocetnoStanje = {
  ime:     '',
  email:   '',
  telefon: '',
  tip:     '',
  naslov:  '',
  poruka:  '',
};

function Kontakt() {
  const { t, i18n } = useTranslation();
  const [forma, setForma]     = useState(pocetnoStanje);
  const [poslano, setPoslano] = useState(false);
  const [saljem, setSaljem]   = useState(false);
  const [greska, setGreska]   = useState('');

  const radnoVrijeme  = t('kontakt.radno_vrijeme',  { returnObjects: true });
  const tipoviUpita   = t('kontakt.tipovi_upita',   { returnObjects: true });
  const zatvoreno     = t('kontakt.zatvoreno');

  const handleChange = (e) => {
    setForma({ ...forma, [e.target.name]: e.target.value });
  };

  const validiraj = () => {
    if (!forma.ime.trim())    return t('kontakt.validacija_ime');
    if (!forma.email.trim())  return t('kontakt.validacija_email');
    if (!/\S+@\S+\.\S+/.test(forma.email)) return t('kontakt.validacija_email_format');
    if (!forma.tip)           return t('kontakt.validacija_tip');
    if (!forma.naslov.trim()) return t('kontakt.validacija_naslov');
    if (!forma.poruka.trim()) return t('kontakt.validacija_poruka');
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saljem) return;

    const poruka = validiraj();
    if (poruka) {
      setGreska(poruka);
      return;
    }
    setGreska('');
    setSaljem(true);

    // Forma ima jedno polje za ime i prezime — dijelimo na prvu riječ i ostatak
    const [ime, ...ostatak] = forma.ime.trim().split(/\s+/);

    // Tip upita šaljemo na srpskom (bez obzira na jezik sajta)
    const idx = tipoviUpita.indexOf(forma.tip);
    const tipoviSr = i18n.getFixedT('sr')('kontakt.tipovi_upita', { returnObjects: true });
    const tipUpita = Array.isArray(tipoviSr) && idx >= 0 ? tipoviSr[idx] : null;

    try {
      const res = await fetch(`${API_URL}/poruke`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ime,
          prezime: ostatak.join(' ') || null,
          email: forma.email.trim(),
          br_tel: forma.telefon.trim() || null,
          tip_upita: tipUpita,
          naslov: forma.naslov.trim(),
          tekst: forma.poruka.trim(),
        }),
      });

      if (!res.ok) throw new Error('Slanje nije uspjelo');

      setPoslano(true);
      setForma(pocetnoStanje);
    } catch {
      setGreska(t('kontakt.greska_slanje'));
    } finally {
      setSaljem(false);
    }
  };

  return (
    <section className="kontakt">
      <Seo title={t("kontakt.meta_title")} description={t("kontakt.meta_description")} />

      {/* ===== HERO ===== */}
      <div className="kontakt__hero">
        <h1>{t('kontakt.hero_naslov')}</h1>
        <p>{t('kontakt.hero_podnaslov')}</p>
      </div>

      {/* ===== GLAVNI GRID ===== */}
      <div className="kontakt__grid">

        {/* ===== LIJEVA KOLONA — info ===== */}
        <div className="kontakt__info">

          {/* Kontakt podaci */}
          <div className="kontakt__info-blok">
            <h2 className="kontakt__info-naslov">{t('kontakt.info_naslov')}</h2>
            <address className="kontakt__adresa">
              <p><FaLocationDot className="kontakt__ikona" /> {t('kontakt.adresa')}</p>
              <p><FaPhone className="kontakt__ikona" /> {t('kontakt.telefon')}</p>
              <p><FaRegEnvelope className="kontakt__ikona" /> {t('kontakt.email')}</p>
            </address>
          </div>

          {/* Radno vrijeme */}
          <div className="kontakt__info-blok">
            <h2 className="kontakt__info-naslov">
              <FaClock className="kontakt__ikona" /> {t('kontakt.radno_naslov')}
            </h2>
            <ul className="kontakt__radno">
              {radnoVrijeme.map((r) => (
                <li
                  key={r.dan}
                  className={
                    r.vrijeme === zatvoreno
                      ? 'kontakt__radno-item kontakt__radno-item--zatvoreno'
                      : 'kontakt__radno-item'
                  }
                >
                  <span>{r.dan}</span>
                  <span>{r.vrijeme}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Google mapa */}
          <div className="kontakt__mapa-wrap">
            <iframe
              title={t('kontakt.mapa_title')}
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
              <h2>{t('kontakt.uspjeh_naslov')}</h2>
              <p>{t('kontakt.uspjeh_tekst')}</p>
              <button className="kontakt__btn" onClick={() => setPoslano(false)}>
                {t('kontakt.uspjeh_dugme')}
              </button>
            </div>
          ) : (
            <form className="kontakt__forma" onSubmit={handleSubmit} noValidate>
              <h2 className="kontakt__forma-naslov">{t('kontakt.forma_naslov')}</h2>

              {greska && <p className="kontakt__greska">{greska}</p>}

              {/* Ime */}
              <div className="kontakt__polje">
                <label htmlFor="ime">
                  {t('kontakt.ime_label')} <span>*</span>
                </label>
                <input
                  type="text"
                  id="ime"
                  name="ime"
                  value={forma.ime}
                  onChange={handleChange}
                  placeholder={t('kontakt.ime_placeholder')}
                />
              </div>

              {/* Email i telefon u redu */}
              <div className="kontakt__red">
                <div className="kontakt__polje">
                  <label htmlFor="email">
                    {t('kontakt.email_label')} <span>*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={forma.email}
                    onChange={handleChange}
                    placeholder={t('kontakt.email_placeholder')}
                  />
                </div>
                <div className="kontakt__polje">
                  <label htmlFor="telefon">{t('kontakt.telefon_label')}</label>
                  <input
                    type="tel"
                    id="telefon"
                    name="telefon"
                    value={forma.telefon}
                    onChange={handleChange}
                    placeholder={t('kontakt.telefon_placeholder')}
                  />
                </div>
              </div>

              {/* Tip upita */}
              <div className="kontakt__polje">
                <label htmlFor="tip">
                  {t('kontakt.tip_label')} <span>*</span>
                </label>
                <select
                  id="tip"
                  name="tip"
                  value={forma.tip}
                  onChange={handleChange}
                >
                  <option value="">{t('kontakt.tip_placeholder')}</option>
                  {tipoviUpita.map((tip) => (
                    <option key={tip} value={tip}>{tip}</option>
                  ))}
                </select>
              </div>

              {/* Naslov */}
              <div className="kontakt__polje">
                <label htmlFor="naslov">
                  {t('kontakt.naslov_label')} <span>*</span>
                </label>
                <input
                  type="text"
                  id="naslov"
                  name="naslov"
                  value={forma.naslov}
                  onChange={handleChange}
                  placeholder={t('kontakt.naslov_placeholder')}
                />
              </div>

              {/* Poruka */}
              <div className="kontakt__polje">
                <label htmlFor="poruka">
                  {t('kontakt.poruka_label')} <span>*</span>
                </label>
                <textarea
                  id="poruka"
                  name="poruka"
                  value={forma.poruka}
                  onChange={handleChange}
                  placeholder={t('kontakt.poruka_placeholder')}
                  rows={5}
                />
              </div>

              <button type="submit" className="kontakt__btn" disabled={saljem}>
                {saljem ? t('kontakt.dugme_saljem') : t('kontakt.dugme_posalji')}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}

export default Kontakt;