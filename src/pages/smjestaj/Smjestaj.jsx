import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Smjestaj.css';
import { FaLocationDot } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';
import heroSlika2 from '../../assets/smjestajPozadina2.jpg';
import { API_URL } from '../adminPage/context/AuthContext';
import { tf } from '../../utils/translateField';
import Seo from "../../components/Seo";

function Zvjezdice({ broj }) {
  return (
    <div className="smjestaj-kartica__zvjezdice">
      {Array.from({ length: 3 }, (_, i) => (
        <span key={i} className={i < broj ? 'zvjezdica--aktivna' : 'zvjezdica--neaktivna'}>★</span>
      ))}
    </div>
  );
}

function Smjestaj() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [smjestaji, setSmjestaji]         = useState([]);
  const [tipovi, setTipovi]               = useState([]);
  const [aktivniFilter, setAktivniFilter] = useState('Sve');
  const [loading, setLoading]             = useState(true);
  const [greska, setGreska]               = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/smjestaji?aktivan=1&per_page=100`).then(r => r.json()),
      fetch(`${API_URL}/tipovi-smjestaja`).then(r => r.json()),
    ])
      .then(([smjData, tipoviData]) => {
        setSmjestaji(smjData.data ?? []);
        setTipovi(tipoviData.data ?? tipoviData);
      })
      .catch(() => setGreska(t('smjestaj.greska_ucitavanje')))
      .finally(() => setLoading(false));
  }, [t]);

  // Filter radi na sirovom (sr) nazivu tipa iz baze — to je stabilan ključ
  const tipoviFilter = ['Sve', ...tipovi.map(tip => tip.naziv)];

  const filtrirani = aktivniFilter === 'Sve'
    ? smjestaji
    : smjestaji.filter(s => s.tip_smjestaja?.naziv === aktivniFilter);

  // Pretvara relativni /storage/... URL u apsolutni
  const slikaUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    const base = API_URL.replace(/\/api.*$/, '');
    return base + url;
  };

  const glavnaSlika = (s) => {
    const gl = s.slike?.find(sl => sl.glavna);
    return slikaUrl(gl?.url ?? s.slike?.[0]?.url ?? null);
  };

  if (loading) return <div className="smjestaj-loading">{t('smjestaj.ucitavanje')}</div>;
  if (greska)  return <div className="smjestaj-greska">{greska}</div>;

  return (
    <section className="smjestaj-section">
      <Seo title={t("smjestaj.meta_title")} description={t("smjestaj.meta_description")} />

      <div className="smjestaj-hero">
        <img src={heroSlika2} alt={t('smjestaj.naslov')} className="smjestaj-hero__img" />
        <div className="smjestaj-hero__overlay" />
        <div className="smjestaj-hero__tekst">
          <h1>{t('smjestaj.naslov')}</h1>
          <p>{t('smjestaj.podnaslov')}</p>
        </div>
      </div>

      <div className="smjestaj-tekst">
        <p>{t('smjestaj.uvod')}</p>
      </div>

      <div className="smjestaj-filteri">
        {tipoviFilter.map((f) => {
          const tip = tipovi.find(tp => tp.naziv === f);
          const label = f === 'Sve' ? t('smjestaj.sve') : (tip ? tf(tip, 'naziv', lang) : f);
          return (
            <button
              key={f}
              className={`smjestaj-filter${aktivniFilter === f ? ' smjestaj-filter--aktivan' : ''}`}
              onClick={() => setAktivniFilter(f)}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="smjestaj-kartice">
        <h2 className="smjestaj-kartice__naslov">
          {t('smjestaj.naslov_ponuda', { count: filtrirani.length })}
        </h2>
        <div className="smjestaj-kartice__grid">
          {filtrirani.map((s) => {
            const naziv = tf(s, 'naziv', lang);
            const tipNaziv = s.tip_smjestaja ? tf(s.tip_smjestaja, 'naziv', lang) : t('smjestaj.tip_fallback');
            const lokacijaNaziv = s.lokacija ? tf(s.lokacija, 'naziv', lang) : t('smjestaj.lokacija_fallback');
            return (
              <Link to={`/smjestaj/${s.id}`} key={s.id} className="smjestaj-kartica">
                <div className="smjestaj-kartica__slika-wrap">
                  {glavnaSlika(s)
                    ? <img src={glavnaSlika(s)} alt={naziv} className="smjestaj-kartica__slika" loading="lazy" />
                    : <div className="smjestaj-kartica__placeholder" />
                  }
                  <span className="smjestaj-kartica__tag">{tipNaziv}</span>
                </div>
                <div className="smjestaj-kartica__tekst">
                  <Zvjezdice broj={0} />
                  <h3 className="smjestaj-kartica__naziv">{naziv}</h3>
                  <span className="smjestaj-kartica__lokacija">
                    <FaLocationDot />
                    <span>{lokacijaNaziv}</span>
                  </span>
                  <span className="smjestaj-kartica__cta">{t('smjestaj.pogledaj_detalje')}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

    </section>
  );
}

export default Smjestaj;