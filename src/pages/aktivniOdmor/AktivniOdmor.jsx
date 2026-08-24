import { useState, useEffect } from "react";
import "./AktivniOdmor.css";
import { FaWalking, FaMountain } from "react-icons/fa";
import { IoMdBicycle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { API_URL } from '../adminPage/context/AuthContext';
import { tf } from '../../utils/translateField';

// Mapiranje tip_sadrzaja.naziv -> interni ključ
const NAZIV_NA_TIP = {
  'Pješačka staza':      'pjesacka',
  'Pješačke staze':      'pjesacka',
  'Planinska tura':      'planinska',
  'Planinarske staze':   'planinska',
  'Biciklistička ruta':  'biciklisticka',
  'Biciklističke staze': 'biciklisticka',
};

const tezineRed = ["sve", "laka", "srednja", "teska"];

function slikaUrl(url) {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  const base = API_URL.replace(/\/api.*$/, '');
  return base + url;
}

function StazaRed({ staza }) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div className="AO_red" onClick={() => navigate(`/aktivni-odmor/${staza.id}`)}>
      <span className="AO_red__naziv">{tf(staza, 'naslov', lang)}</span>
      <div className="AO_red__desno">
        <span className={`AO_badge AO_badge--${staza.tezina}`}>
          {t(`aktivni_odmor.${staza.tezina}`, staza.tezina)}
        </span>
        <div className="AO_red__km">
          {staza.duzina_staze}
          <span className="AO_red__km-jed"> {t('aktivni_odmor.km')}</span>
        </div>
        <span className="AO_red__arrow">›</span>
      </div>
    </div>
  );
}

function StazaSekcija({ tip, staze }) {
  const [aktivniFilter, setAktivniFilter] = useState("sve");
  const { t } = useTranslation();

  const tipConfig = {
    pjesacka: {
      label: t('aktivni_odmor.tip_pjesacka'),
      emoji: <FaWalking />,
      light: "#EBF3E4",
      border: "#A8CB84",
    },
    planinska: {
      label: t('aktivni_odmor.tip_planinska'),
      emoji: <FaMountain />,
      light: "#FAEAE8",
      border: "#E8978F",
    },
    biciklisticka: {
      label: t('aktivni_odmor.tip_biciklisticka'),
      emoji: <IoMdBicycle />,
      light: "#E5F2FB",
      border: "#7BBDE0",
    },
  };

  const cfg = tipConfig[tip];

  const filtrirane = staze.filter(
    (s) => aktivniFilter === "sve" || s.tezina === aktivniFilter
  );

  return (
    <section className={`AO_sekcija AO_sekcija--${tip}`}>
      <div className="AO_sekcija__header" style={{ borderColor: cfg.border }}>
        <div className="AO_sekcija__lijevo">
          <div
            className="AO_sekcija__ikona"
            style={{ background: cfg.light, borderColor: cfg.border }}
          >
            {cfg.emoji}
          </div>
          <div>
            <h2 className="AO_sekcija__naziv">{cfg.label}</h2>
            <span className="AO_sekcija__broj">{staze.length} {t('aktivni_odmor.broj_staza')}</span>
          </div>
        </div>

        <div className="AO_filteri">
          {tezineRed.map((tez) => {
            const aktivan = aktivniFilter === tez;
            return (
              <button
                key={tez}
                className={`AO_filter${aktivan ? ` AO_filter--aktivan AO_filter--${tez}` : ""}`}
                onClick={() => setAktivniFilter(tez)}
              >
                {t(`aktivni_odmor.${tez}`)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="AO_lista">
        {filtrirane.length === 0 ? (
          <div className="AO_prazan">{t('aktivni_odmor.nema_filter')}</div>
        ) : (
          filtrirane.map((s) => <StazaRed key={s.id} staza={s} />)
        )}
      </div>
    </section>
  );
}

export default function AktivniOdmor() {
  const [staze, setStaze]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [greska, setGreska]   = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    fetch(`${API_URL}/turisticki-sadrzaji?aktivan=1&per_page=100`)
      .then(r => r.json())
      .then(data => setStaze(data.data ?? []))
      .catch(() => setGreska(t('aktivni_odmor.greska_ucitavanje')))
      .finally(() => setLoading(false));
  }, [t]);

  // Grupiši staze po tipu koristeći tip_sadrzaja.naziv
  const poTipu = (tip) =>
    staze.filter(s => {
      const naziv = s.tip_sadrzaja?.naziv ?? '';
      return NAZIV_NA_TIP[naziv] === tip;
    });

  const tipoviRed = ['pjesacka', 'planinska', 'biciklisticka'];

  if (loading) return <div className="AO_section"><div className="smjestaj-loading">{t('aktivni_odmor.ucitavanje')}</div></div>;
  if (greska)  return <div className="AO_section"><div className="smjestaj-greska">{greska}</div></div>;

  return (
    <section className="AO_section">
      <div className="AO_hero">
        <h1>{t('aktivni_odmor.naslov')}</h1>
        <p>{t('aktivni_odmor.podnaslov')}</p>
      </div>

      <div className="AO_legenda">
        <span className="AO_legenda__naslov">{t('aktivni_odmor.tezina_label')}</span>
        <div className="AO_legenda__item">
          <div className="AO_legenda__kvadrat AO_legenda__kvadrat--laka" />
          {t('aktivni_odmor.laka')}
        </div>
        <div className="AO_legenda__item">
          <div className="AO_legenda__kvadrat AO_legenda__kvadrat--srednja" />
          {t('aktivni_odmor.srednja')}
        </div>
        <div className="AO_legenda__item">
          <div className="AO_legenda__kvadrat AO_legenda__kvadrat--teska" />
          {t('aktivni_odmor.teska')}
        </div>
      </div>

      <main className="AO_main">
        {tipoviRed.map(tip => {
          const stavke = poTipu(tip);
          if (stavke.length === 0) return null;
          return <StazaSekcija key={tip} tip={tip} staze={stavke} />;
        })}
        {staze.length === 0 && (
          <div className="AO_prazan">{t('aktivni_odmor.nema_staza')}</div>
        )}
      </main>
    </section>
  );
}