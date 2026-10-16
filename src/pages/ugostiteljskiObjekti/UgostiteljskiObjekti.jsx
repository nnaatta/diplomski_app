import React, { useState, useEffect } from 'react';
import './UgostiteljskiObjekti.css';
import { useTranslation } from 'react-i18next';
import { FaLocationDot, FaPhone, FaEnvelope, FaGlobe, FaInstagram, FaFacebook, FaChevronLeft, FaChevronRight, FaClock, FaUtensils } from 'react-icons/fa6';
import { API_URL } from '../adminPage/context/AuthContext';
import { tf } from '../../utils/translateField';
import { mapaEmbedUrl } from '../../utils/mapaUrl';
import Seo from "../../components/Seo";

function slikaUrl(url) {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return API_URL.replace(/\/api.*$/, '') + url;
}

// ===== SLIDER =====
function RestoranSlider({ slike, alt }) {
  const [aktivan, setAktivan] = useState(0);
  if (!slike.length) return <div className="restoran__placeholder" />;
  const prethodni = (e) => { e.preventDefault(); setAktivan(p => p === 0 ? slike.length - 1 : p - 1); };
  const sljedeci  = (e) => { e.preventDefault(); setAktivan(p => p === slike.length - 1 ? 0 : p + 1); };
  return (
    <div className="restoran__slider">
      <img src={slikaUrl(slike[aktivan].url)} alt={alt} className="restoran__slika" loading="lazy" />
      {slike.length > 1 && (
        <>
          <button className="restoran__strelica restoran__strelica--lijevo" onClick={prethodni}><FaChevronLeft /></button>
          <button className="restoran__strelica restoran__strelica--desno" onClick={sljedeci}><FaChevronRight /></button>
          <div className="restoran__dots">
            {slike.map((_, i) => (
              <button key={i} className={`restoran__dot${i === aktivan ? ' restoran__dot--aktivan' : ''}`} onClick={() => setAktivan(i)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function UgostiteljskiObjekti() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [restorani, setRestorani] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [greska, setGreska]       = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/restorani?aktivan=1&per_page=100`)
      .then(r => {
        if (!r.ok) throw new Error('Greška pri učitavanju');
        return r.json();
      })
      .then(data => setRestorani(data.data ?? []))
      .catch(() => setGreska(t('ugostiteljski.greska_ucitavanje')))
      .finally(() => setLoading(false));
  }, [t]);

  return (
    <section className="ugo">
      <Seo title={t("ugostiteljski.meta_title")} description={t("ugostiteljski.meta_description")} />

      {/* HERO */}
      <div className="ugo__hero">
        <span className="ugo__hero-ikona"><FaUtensils /></span>
        <h1>{t('ugostiteljski.naslov')}</h1>
        <p>{t('ugostiteljski.podnaslov')}</p>
      </div>

      {/* UVOD */}
      <div className="ugo__uvod">
        <p>{t('ugostiteljski.uvod')}</p>
      </div>

      {/* LISTA OBJEKATA */}
      <div className="ugo__objekti">
        {loading && <div className="ugo__loading">{t('ugostiteljski.ucitavanje')}</div>}
        {greska  && <div className="ugo__greska">{greska}</div>}
        {!loading && !greska && restorani.length === 0 && (
          <div className="ugo__prazno">{t('ugostiteljski.nema_objekata')}</div>
        )}
        <div className="ugo__objekti-lista">
          {restorani.map(r => {
            const k = r.kontakt_osoba;
            const naziv = tf(r, 'naziv', lang);
            const opis = tf(r, 'opis', lang);
            const radnoVrijeme = tf(r, 'radno_vrijeme', lang);
            const lokacijaNaziv = r.lokacija ? tf(r.lokacija, 'naziv', lang) : null;
            const preporuke = r.preporuke_hrane;
            const mapaUrl = mapaEmbedUrl(r.lokacija);

            return (
              <div key={r.id} className="restoran">

                {/* Slider */}
                <RestoranSlider slike={r.slike ?? []} alt={naziv} />

                {/* Info */}
                <div className="restoran__info">
                  <div className="restoran__info-top">
                    <h3 className="restoran__naziv">{naziv}</h3>
                    {radnoVrijeme && (
                      <span className="restoran__radno">
                        <FaClock /> {radnoVrijeme}
                      </span>
                    )}
                  </div>

                  {opis && <p className="restoran__opis">{opis}</p>}

                  {/* Pogodnosti */}
                 {/* {r.pogodnosti?.length > 0 && (
                    <div className="restoran__pogodnosti-blok">
                      <span className="restoran__blok-label">{t('ugostiteljski.sadrzaji')}</span>
                      <div className="restoran__pogodnosti">
                        {r.pogodnosti.map(p => (
                          <span key={p.id ?? p} className="restoran__pogodnost">
                            <FaCheck className="restoran__pogodnost-ikona" />
                            {tf(p, 'naziv', lang) ?? p}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}*/}

                  {/* Preporuke hrane */}
                  {preporuke?.length > 0 && (
                    <div className="restoran__preporuke-blok">
                      <span className="restoran__blok-label">{t('ugostiteljski.preporucujemo')}</span>
                      <ul className="restoran__preporuke">
                        {preporuke.map((p, i) => (
                          <li key={p?.id ?? i} className="restoran__preporuka">
                            {typeof p === 'string' ? p : tf(p, 'naziv', lang)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Kontakt */}
                  {k && (k.br_telefona || k.email || r.lokacija?.naziv || k.web_stranica) && (
                    <div className="restoran__kontakt-blok">
                      <span className="restoran__blok-label">{t('ugostiteljski.kontakt')}</span>
                      <div className="restoran__kontakt">
                        {k.br_telefona && (
                          <a href={`tel:${k.br_telefona}`} className="restoran__kontakt-item">
                            <FaPhone /> {k.br_telefona}
                          </a>
                        )}
                        {k.email && (
                          <a href={`mailto:${k.email}`} className="restoran__kontakt-item">
                            <FaEnvelope /> {k.email}
                          </a>
                        )}
                        {lokacijaNaziv && (
                          <span className="restoran__kontakt-item">
                            <FaLocationDot /> {lokacijaNaziv}
                          </span>
                        )}
                        {k.web_stranica && (
                          <a href={`https://${k.web_stranica}`} target="_blank" rel="noreferrer" className="restoran__kontakt-item">
                            <FaGlobe /> {k.web_stranica}
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Društvene mreže */}
                  {(k?.instagram || k?.facebook) && (
                    <div className="restoran__drustvene">
                      {k.instagram && (
                        <a href={k.instagram} target="_blank" rel="noreferrer" className="restoran__drustvena restoran__drustvena--instagram">
                          <FaInstagram /> {t('ugostiteljski.instagram')}
                        </a>
                      )}
                      {k.facebook && (
                        <a href={k.facebook} target="_blank" rel="noreferrer" className="restoran__drustvena restoran__drustvena--facebook">
                          <FaFacebook /> {t('ugostiteljski.facebook')}
                        </a>
                      )}
                    </div>
                  )}

                </div>

              {/* Mapa — preko cijele širine kartice */}
              {mapaUrl && (
                <div className="restoran__mapa-blok">
                  <span className="restoran__blok-label">{t('ugostiteljski.lokacija')}</span>
                  <div className="restoran__mapa">
                    <iframe
                      title={t('ugostiteljski.mapa_title', { naziv })}
                      src={mapaUrl}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              )}

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default UgostiteljskiObjekti;