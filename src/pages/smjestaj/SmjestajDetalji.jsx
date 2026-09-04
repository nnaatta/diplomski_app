import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './SmjestajDetalji.css';
import { FaLocationDot, FaPhone, FaArrowLeft, FaChevronLeft, FaChevronRight, FaXmark } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';
import { API_URL } from '../adminPage/context/AuthContext';
import { tf } from '../../utils/translateField';

// ===== LIGHTBOX =====
function Lightbox({ slike, aktivan, onZatvori, onPrethodni, onSljedeci, t }) {
  if (aktivan === null) return null;
  return (
    <div className="lightbox" onClick={onZatvori}>
      <button className="lightbox__zatvori" onClick={onZatvori} aria-label={t('smjestaj_detalji.zatvori')}><FaXmark /></button>
      <span className="lightbox__brojac">{aktivan + 1} / {slike.length}</span>
      <button className="lightbox__strelica lightbox__strelica--lijevo" onClick={(e) => { e.stopPropagation(); onPrethodni(); }} aria-label={t('smjestaj_detalji.prethodna')}><FaChevronLeft /></button>
      <div className="lightbox__slika-wrap" onClick={(e) => e.stopPropagation()}>
        <img src={slike[aktivan]} alt={t('smjestaj_detalji.slika', { br: aktivan + 1 })} className="lightbox__slika" loading="lazy" />
      </div>
      <button className="lightbox__strelica lightbox__strelica--desno" onClick={(e) => { e.stopPropagation(); onSljedeci(); }} aria-label={t('smjestaj_detalji.sljedeca')}><FaChevronRight /></button>
      <div className="lightbox__thumbnails" onClick={(e) => e.stopPropagation()}>
        {slike.map((s, i) => (
          <img key={i} src={s} alt={t('smjestaj_detalji.thumbnail', { br: i + 1 })}
            className={`lightbox__thumbnail${i === aktivan ? ' lightbox__thumbnail--aktivan' : ''}`}
            onClick={() => onPrethodni(i)}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}

// ===== GALERIJA =====
function GalerijaKomponenta({ slike, onKlik, t }) {
  if (!slike.length) return <div className="galerija__placeholder" />;
  return (
    <div className="galerija">
      <div className="galerija__glavna" onClick={() => onKlik(0)}>
        <img src={slike[0]} alt={t('smjestaj_detalji.glavna_slika')} className="galerija__slika" />
        <div className="galerija__overlay"><span>{t('smjestaj_detalji.pogledaj_sve_slike', { count: slike.length })}</span></div>
      </div>
      {slike.length > 1 && (
        <div className="galerija__grid">
          {slike.slice(1, 5).map((s, i) => (
            <div key={i} className="galerija__mala" onClick={() => onKlik(i + 1)}>
              <img src={s} alt={t('smjestaj_detalji.slika', { br: i + 2 })} className="galerija__slika" loading="lazy" />
              {i === 3 && slike.length > 5 && <div className="galerija__vise">+{slike.length - 5}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SmjestajDetalji() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { id } = useParams();
  const [smjestaj, setSmjestaj]       = useState(null);
  const [loading, setLoading]         = useState(true);
  const [greska, setGreska]           = useState(null);
  const [lightboxAktivan, setLightboxAktivan] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/smjestaji/${id}`)
      .then(r => {
        if (!r.ok) throw new Error('Nije pronađen');
        return r.json();
      })
      .then(data => setSmjestaj(data.data ?? data))
      .catch(() => setGreska(t('smjestaj_detalji.nije_pronadjen_greska')))
      .finally(() => setLoading(false));
  }, [id, t]);

  const base = API_URL.replace(/\/api.*$/, '');
  const urlSlike = (smjestaj?.slike ?? []).map(s => {
    const url = s.url ?? '';
    return url.startsWith('http') ? url : base + url;
  });

  const otvoriLightbox  = (i) => setLightboxAktivan(i);
  const zatvoriLightbox = () => setLightboxAktivan(null);
  const prethodnaSlika  = (i) => {
    if (typeof i === 'number') { setLightboxAktivan(i); return; }
    setLightboxAktivan(prev => (prev === 0 ? urlSlike.length - 1 : prev - 1));
  };
  const sljedeцaSlika = () =>
    setLightboxAktivan(prev => (prev === urlSlike.length - 1 ? 0 : prev + 1));

  useEffect(() => {
    if (lightboxAktivan === null) return;
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft')  prethodnaSlika();
      if (e.key === 'ArrowRight') sljedeцaSlika();
      if (e.key === 'Escape')     zatvoriLightbox();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxAktivan, prethodnaSlika, sljedeцaSlika]);

  if (loading) return <div className="detalji__loading">{t('smjestaj_detalji.ucitavanje')}</div>;
  if (greska || !smjestaj) return (
    <div className="detalji__nije-pronadjen">
      <h2>{t('smjestaj_detalji.nije_pronadjen_naslov')}</h2>
      <Link to="/smjestaj" className="detalji__nazad">{t('smjestaj_detalji.nazad')}</Link>
    </div>
  );

  const naziv = tf(smjestaj, 'naziv', lang);
  const opis = tf(smjestaj, 'opis', lang);
  const tipNaziv = smjestaj.tip_smjestaja ? tf(smjestaj.tip_smjestaja, 'naziv', lang) : t('smjestaj_detalji.tip_fallback');
  const lokacijaNaziv = smjestaj.lokacija ? tf(smjestaj.lokacija, 'naziv', lang) : t('smjestaj_detalji.lokacija_fallback');

  return (
    <section className="detalji">

      <div className="detalji__hero">
        {urlSlike.length > 0
          ? <img src={urlSlike[0]} alt={naziv} className="detalji__hero-slika" />
          : <div className="detalji__hero-placeholder" />
        }
        <div className="detalji__hero-overlay" />
        <div className="detalji__hero-sadrzaj">
          <Link to="/smjestaj" className="detalji__nazad"><FaArrowLeft /> {t('smjestaj_detalji.nazad')}</Link>
          <span className="detalji__tag">{tipNaziv}</span>
          <h1 className="detalji__naziv">{naziv}</h1>
          <span className="detalji__lokacija">
            <FaLocationDot /> {lokacijaNaziv}
          </span>
        </div>
      </div>

      <div className="detalji__grid">
        <div className="detalji__lijevo">

          <div className="detalji__blok">
            <h2 className="detalji__blok-naslov">{t('smjestaj_detalji.fotografije')}</h2>
            <GalerijaKomponenta slike={urlSlike} onKlik={otvoriLightbox} t={t} />
          </div>

          <div className="detalji__blok">
            <h2 className="detalji__blok-naslov">{t('smjestaj_detalji.o_objektu')}</h2>
            <p className="detalji__opis">{opis || t('smjestaj_detalji.opis_nedostupan')}</p>
          </div>

          {(smjestaj.br_soba || smjestaj.br_lezajeva) && (
            <div className="detalji__blok">
              <h2 className="detalji__blok-naslov">{t('smjestaj_detalji.kapacitet')}</h2>
              <div className="detalji__kapacitet">
                {smjestaj.br_soba && (
                  <div className="detalji__kapacitet-item">
                    <span className="detalji__kapacitet-broj">{smjestaj.br_soba}</span>
                    <span className="detalji__kapacitet-label">{t('smjestaj_detalji.spavace_sobe')}</span>
                  </div>
                )}
                {smjestaj.br_lezajeva && (
                  <div className="detalji__kapacitet-item">
                    <span className="detalji__kapacitet-broj">{smjestaj.br_lezajeva}</span>
                    <span className="detalji__kapacitet-label">{t('smjestaj_detalji.lezajevi')}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {smjestaj.pogodnosti?.length > 0 && (
            <div className="detalji__blok">
              <h2 className="detalji__blok-naslov">{t('smjestaj_detalji.sadrzaji')}</h2>
              <div className="detalji__sadrzaji">
                {smjestaj.pogodnosti.map(p => (
                  <div key={p.id} className="detalji__sadrzaj-item">
                    <span className="detalji__sadrzaj-ikona">{p.ikona ?? '✓'}</span>
                    <span className="detalji__sadrzaj-naziv">{tf(p, 'naziv', lang)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        <div className="detalji__desno">
          <div className="detalji__kontakt-kartica">
            <h2 className="detalji__kontakt-naslov">{t('smjestaj_detalji.rezervacija_naslov')}</h2>
            <p className="detalji__kontakt-tekst">
              {t('smjestaj_detalji.rezervacija_tekst')}
            </p>
            {smjestaj.kontakt_osoba && (
              <div className="detalji__kontakt-vlasnik">
                {smjestaj.kontakt_osoba.ime_prezime && (
                  <p className="detalji__kontakt-ime">{smjestaj.kontakt_osoba.ime_prezime}</p>
                )}
                {smjestaj.kontakt_osoba.telefon && (
                  <a href={`tel:${smjestaj.kontakt_osoba.telefon}`} className="detalji__kontakt-tel">
                    <FaPhone /> {smjestaj.kontakt_osoba.telefon}
                  </a>
                )}
              </div>
            )}
            <div className="detalji__kontakt-divider" />
            <p className="detalji__kontakt-to">{t('smjestaj_detalji.ili_kontaktirajte_to')}</p>
            <a href="tel:+38766787850" className="detalji__kontakt-tel detalji__kontakt-tel--secondary">
              <FaPhone /> +387 66 787 850
            </a>
          </div>

          {smjestaj.lokacija?.lat && smjestaj.lokacija?.lng && (
            <div className="detalji__mapa-wrap">
              <h2 className="detalji__blok-naslov">{t('smjestaj_detalji.lokacija_naslov')}</h2>
              <div className="detalji__mapa">
                <iframe
                  title={t('smjestaj_detalji.lokacija_iframe_title', { naziv })}
                  src={`https://www.google.com/maps?q=${smjestaj.lokacija.lat},${smjestaj.lokacija.lng}&z=15&output=embed`}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <Lightbox
        slike={urlSlike}
        aktivan={lightboxAktivan}
        onZatvori={zatvoriLightbox}
        onPrethodni={prethodnaSlika}
        onSljedeci={sljedeцaSlika}
        t={t}
      />

    </section>
  );
}

export default SmjestajDetalji;