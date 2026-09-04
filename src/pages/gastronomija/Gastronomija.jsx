import React, { useState, useEffect } from 'react';
import './Gastronomija.css';
import { useTranslation, Trans } from 'react-i18next';
import { FaLocationDot, FaPhone, FaEnvelope, FaGlobe, FaInstagram, FaFacebook, FaChevronLeft, FaChevronRight, FaClock,  } from 'react-icons/fa6';
import kajmak from "../../assets/Kajmak.jpg";
import pozadina from "../../assets/GastronomijaPozadina.jpg";
import { API_URL } from '../adminPage/context/AuthContext';
import { tf } from '../../utils/translateField';
import teletina from "../../assets/gastronomija/teletina.jpg";
import cicvara from "../../assets/gastronomija/cicvara.jpg";
import koljenica from "../../assets/gastronomija/butkica.jpg";
import pecenje from "../../assets/gastronomija/jagnje.jpg";
import Seo from "../../components/Seo";

// Slike za specijalitete — tekst (naziv/opis) dolazi iz translation.json
const specijalitetiSlike = [teletina, cicvara, "", koljenica, pecenje, ""];

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

function Gastronomija() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [restorani, setRestorani] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [greska, setGreska]       = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/restorani?aktivan=1&per_page=100`)
      .then(r => r.json())
      .then(data => setRestorani(data.data ?? []))
      .catch(() => setGreska(t('gastronomija.greska_ucitavanje')))
      .finally(() => setLoading(false));
  }, [t]);

  // Statički specijaliteti — tekst iz prevoda, slike iz koda (po indeksu)
  const specijaliteti = t('gastronomija.specijaliteti', { returnObjects: true });

  return (
    <section className="gastro">
      <Seo title={t("gastronomija.meta_title")} description={t("gastronomija.meta_description")} />

      {/* HERO */}
      <div className="gastro__hero">
        <img src={pozadina} alt={t('gastronomija.naslov')} className="gastro__hero-img" />
        <div className="gastro__hero-overlay" />
        <div className="gastro__hero-tekst">
          <h1>{t('gastronomija.naslov')}</h1>
          <p>{t('gastronomija.podnaslov')}</p>
        </div>
      </div>

      {/* UVOD */}
      <div className="gastro__uvod">
        <p>{t('gastronomija.uvod')}</p>
      </div>

      {/* RESTORANI */}
      <div className="gastro__restorani">
        <h2 className="gastro__sekcija-naslov">{t('gastronomija.restorani_naslov')}</h2>
        {loading && <div className="gastro__loading">{t('gastronomija.ucitavanje')}</div>}
        {greska  && <div className="gastro__greska">{greska}</div>}
        <div className="gastro__restorani-lista">
          {restorani.map(r => {
            const k = r.kontakt_osoba;
            const naziv = tf(r, 'naziv', lang);
            const opis = tf(r, 'opis', lang);
            const radnoVrijeme = tf(r, 'radno_vrijeme', lang);
            const lokacijaNaziv = r.lokacija ? tf(r.lokacija, 'naziv', lang) : null;
            const preporuke = r.preporuke_hrane;

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
                      <span className="restoran__blok-label">{t('gastronomija.sadrzaji')}</span>
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
                      <span className="restoran__blok-label">{t('gastronomija.preporucujemo')}</span>
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
                      <span className="restoran__blok-label">{t('gastronomija.kontakt')}</span>
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
                          <FaInstagram /> {t('gastronomija.instagram')}
                        </a>
                      )}
                      {k.facebook && (
                        <a href={k.facebook} target="_blank" rel="noreferrer" className="restoran__drustvena restoran__drustvena--facebook">
                          <FaFacebook /> {t('gastronomija.facebook')}
                        </a>
                      )}
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ROMANIJSKI SKORUP-KAJMAK */}
      <div className="gastro__kajmak">
        <div className="gastro__kajmak-grid">
          <div className="gastro__kajmak-slika-wrap">
            <img src={kajmak} alt={t('gastronomija.kajmak_naslov')} className="gastro__kajmak-slika" loading="lazy" />
            <span className="gastro__kajmak-bedz">{t('gastronomija.kajmak_bedz')}</span>
          </div>
          <div className="gastro__kajmak-tekst">
            <span className="gastro__kajmak-oznaka">{t('gastronomija.kajmak_oznaka')}</span>
            <h2 className="gastro__kajmak-naslov">{t('gastronomija.kajmak_naslov')}</h2>
            <p className="gastro__kajmak-opis">
              <Trans i18nKey="gastronomija.kajmak_opis_1" components={{ strong: <strong /> }} />
            </p>
            <p className="gastro__kajmak-opis">
              <Trans i18nKey="gastronomija.kajmak_opis_2" components={{ em: <em /> }} />
            </p>
            <p className="gastro__kajmak-opis">
              <Trans i18nKey="gastronomija.kajmak_opis_3" components={{ strong: <strong /> }} />
            </p>
            <div className="gastro__kajmak-certifikati">
              <div className="gastro__kajmak-cert"><span className="gastro__kajmak-cert-ikona">✓</span><span>{t('gastronomija.kajmak_cert_1')}</span></div>
              <div className="gastro__kajmak-cert"><span className="gastro__kajmak-cert-ikona">✓</span><span>{t('gastronomija.kajmak_cert_2')}</span></div>
              <div className="gastro__kajmak-cert"><span className="gastro__kajmak-cert-ikona">✓</span><span>{t('gastronomija.kajmak_cert_3')}</span></div>
              <div className="gastro__kajmak-cert"><span className="gastro__kajmak-cert-ikona">✓</span><span>{t('gastronomija.kajmak_cert_4')}</span></div>
            </div>
            <p className="gastro__kajmak-poziv">{t('gastronomija.kajmak_poziv')}</p>
          </div>
        </div>
      </div>

      {/* SPECIJALITETI */}
      <div className="gastro__specijaliteti">
        <h2 className="gastro__sekcija-naslov">{t('gastronomija.spec_naslov')}</h2>
        <p className="gastro__sekcija-podnaslov">{t('gastronomija.spec_podnaslov')}</p>
        <div className="gastro__spec-grid">
          {specijaliteti.map((s, i) => (
            <div key={s.naziv} className="gastro__spec-kartica">
              <div className="gastro__spec-slika-wrap">
                {specijalitetiSlike[i]
                  ? <img src={specijalitetiSlike[i]} alt={s.naziv} className="gastro__spec-slika" loading="lazy" />
                  : <div className="gastro__spec-placeholder" />
                }
              </div>
              <div className="gastro__spec-tekst">
                <h3 className="gastro__spec-naziv">{s.naziv}</h3>
                <p className="gastro__spec-opis">{s.opis}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

export default Gastronomija;