import { useEffect, useState } from "react";
import "./StazaDetalji.css";
import { useParams, useNavigate } from "react-router-dom";
import { FaWalking, FaMountain } from "react-icons/fa";
import { IoMdBicycle } from "react-icons/io";
import { AiFillThunderbolt } from "react-icons/ai";
import { GiRoad } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import { API_URL } from '../adminPage/context/AuthContext';
import { tf } from '../../utils/translateField';

// Mapiranje tip_sadrzaja.naziv -> interni ključ (mora biti isto kao u AktivniOdmor.jsx)
const NAZIV_NA_TIP = {
  'Pješačka staza':      'pjesacka',
  'Pješačke staze':      'pjesacka',
  'Planinska tura':      'planinska',
  'Planinarske staze':   'planinska',
  'Biciklistička ruta':  'biciklisticka',
  'Biciklističke staze': 'biciklisticka',
};

function slikaUrl(url) {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  const base = API_URL.replace(/\/api.*$/, '');
  return base + url;
}

export default function StazaDetalji() {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const { t, i18n }  = useTranslation();
  const lang = i18n.language;
  const [staza, setStaza]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [greska, setGreska]   = useState(null);

  const tezineLabele = {
    laka:    t('aktivni_odmor.laka'),
    srednja: t('aktivni_odmor.srednja'),
    teska:   t('aktivni_odmor.teska'),
  };

  const tipLabele = {
    pjesacka:      t('aktivni_odmor.tip_pjesacka_detalji'),
    planinska:     t('aktivni_odmor.tip_planinska_detalji'),
    biciklisticka: t('aktivni_odmor.tip_biciklisticka_detalji'),
  };

  const tipEmoji = {
    pjesacka:      <FaWalking />,
    planinska:     <FaMountain />,
    biciklisticka: <IoMdBicycle />,
  };

  useEffect(() => {
    fetch(`${API_URL}/turisticki-sadrzaji/${id}`)
      .then(r => {
        if (!r.ok) throw new Error('Nije pronađeno');
        return r.json();
      })
      .then(data => setStaza(data.data ?? data))
      .catch(() => setGreska(t('aktivni_odmor.nije_pronadjena_greska')))
      .finally(() => setLoading(false));
  }, [id, t]);

  if (loading) return <div className="SD_section"><div className="smjestaj-loading">{t('aktivni_odmor.ucitavanje')}</div></div>;
  if (greska || !staza) return (
    <div className="SD_section">
      <div className="detalji__nije-pronadjen">
        <h2>{t('aktivni_odmor.nije_pronadjena')}</h2>
        <button className="SD_nazad" onClick={() => navigate('/aktivni-odmor')}>{t('aktivni_odmor.nazad')}</button>
      </div>
    </div>
  );

  const tip      = NAZIV_NA_TIP[staza.tip_sadrzaja?.naziv ?? ''] ?? 'pjesacka';
  const heroSlika = staza.slike?.[0]?.url ? slikaUrl(staza.slike[0].url) : null;
  const naslov = tf(staza, 'naslov', lang);
  const tipNaziv = staza.tip_sadrzaja ? tf(staza.tip_sadrzaja, 'naziv', lang) : '';

  return (
    <section className="SD_section">
      <div className="SD_hero">
        {heroSlika ? (
          <img src={heroSlika} alt={naslov} className="SD_hero__slika" />
        ) : (
          <div className="SD_hero__placeholder" />
        )}
        <div className="SD_hero__overlay" />

        <div className="SD_hero__sadrzaj">
          <span className={`SD_hero__tip SD_hero__tip--${tip}`}>
            {tipEmoji[tip]} {tipLabele[tip] ?? tipNaziv}
          </span>
          <h1 className="SD_hero__naziv">{naslov}</h1>
        </div>
      </div>

      <div className="SD_infobar">
        {staza.duzina_staze && (
          <>
            <div className="SD_infobar__item">
              <span className="SD_infobar__ikona"><GiRoad /></span>
              <div>
                <span className="SD_infobar__vrijednost">{staza.duzina_staze} {t('aktivni_odmor.km')}</span>
                <span className="SD_infobar__labela">{t('aktivni_odmor.duzina')}</span>
              </div>
            </div>
            <div className="SD_infobar__separator" />
          </>
        )}

        {staza.tezina && (
          <>
            <div className="SD_infobar__item">
              <span className="SD_infobar__ikona"><AiFillThunderbolt /></span>
              <div>
                <span className={`SD_infobar__badge SD_infobar__badge--${staza.tezina}`}>
                  {tezineLabele[staza.tezina] ?? staza.tezina}
                </span>
                <span className="SD_infobar__labela">{t('aktivni_odmor.tezina')}</span>
              </div>
            </div>
            <div className="SD_infobar__separator" />
          </>
        )}

        <div className="SD_infobar__item">
          <span className="SD_infobar__ikona">{tipEmoji[tip]}</span>
          <div>
            <span className="SD_infobar__vrijednost">{tipLabele[tip] ?? tipNaziv}</span>
            <span className="SD_infobar__labela">{t('aktivni_odmor.vrsta')}</span>
          </div>
        </div>
      </div>

      <div className="SD_sadrzaj">
        <div className="SD_opis">
          <h2>{t('aktivni_odmor.o_stazi')}</h2>
          <p>{tf(staza, 'opis', lang) || t('aktivni_odmor.opis_nije_dodat')}</p>
        </div>

        <div className="SD_mapa">
          <h2 className="SD_mapa__naslov">{t('aktivni_odmor.mapa_staze')}</h2>
          <p className="SD_mapa__tekst">
            {t('aktivni_odmor.mapa_tekst')}
          </p>
          <div className="SD_mapa__wrap">
            <iframe
              src="https://imap.bts.ba/#"
              title={`${t('aktivni_odmor.mapa_staze')} — ${naslov}`}
              className="SD_mapa__iframe"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>

        <button className="SD_nazad" onClick={() => navigate(-1)}>
          {t('aktivni_odmor.nazad')}
        </button>
      </div>
    </section>
  );
}