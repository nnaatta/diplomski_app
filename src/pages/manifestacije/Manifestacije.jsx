import React, { useState, useEffect, useMemo } from "react";
import "./Manifestacije.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { API_URL } from "../adminPage/context/AuthContext";
import { tf } from "../../utils/translateField";
import podaci from "../../data/manifestacijeData.json";

import toLogo from "../../assets/logoTO.png";
import biblLogo from "../../assets/manifestacije/logo-cucak.jpg";
import cosLogo from "../../assets/COSPogledLogp.png";
import visLogo from "../../assets/PedVisocnikLogo.jpg";
import javorLogo from "../../assets/psuJavor.jpg";
import kudLogo from "../../assets/manifestacije/kudLogo.jpg";
import vrticLogo from "../../assets/manifestacije/vrticLogo.jpg";
import opstinaLogo from "../../assets/OpstinaLogo.png";
import manHero from "../../assets/manifestacije/manHero.jpg";
import cd1 from "../../assets/manifestacije/cd1.jpg";
import cd5 from "../../assets/manifestacije/cd5.jpg";
import cd4 from "../../assets/manifestacije/cd4.jpg";
import cd3 from "../../assets/manifestacije/cd3.jpg";
import cd6 from "../../assets/manifestacije/cd6.jpg";
import cd2 from "../../assets/manifestacije/cd2.jpg";
import lile1 from "../../assets/manifestacije/lile1.jpg";
import lile2 from "../../assets/manifestacije/lile2.jpg";
import lile3 from "../../assets/manifestacije/lile3.jpg";
import lile4 from "../../assets/manifestacije/lile4.jpg";
import lile5 from "../../assets/manifestacije/lile5.jpg";
import lile6 from "../../assets/manifestacije/lile6.jpg";
import slet1 from "../../assets/manifestacije/slet1.jpg";
import slet2 from "../../assets/manifestacije/slet2.jpg";
import slet3 from "../../assets/manifestacije/slet3.jpg";
import slet4 from "../../assets/manifestacije/slet4.jpg";
import g1 from "../../assets/manifestacije/gulasijada1.jpg";
import g2 from "../../assets/manifestacije/gulasijada2.jpg";
import g3 from "../../assets/manifestacije/gulasijada3.jpg";
import g4 from "../../assets/manifestacije/gulasijada4.jpg";
import g5 from "../../assets/manifestacije/gulasijada5.jpg";
import g6 from "../../assets/manifestacije/gulasijada6.jpg";
import mtb1 from "../../assets/manifestacije/mtb1.jpg";
import mtb2 from "../../assets/manifestacije/mtb2.jpg";
import mtb3 from "../../assets/manifestacije/mtb3.jpg";
import mtb4 from "../../assets/manifestacije/mtb4.jpg";
import mtb5 from "../../assets/manifestacije/mtb5.jpg";
import vk1 from "../../assets/manifestacije/vk1.jpg";
import vk2 from "../../assets/manifestacije/vk2.jpg";
import vk3 from "../../assets/manifestacije/vk3.jpg";
import vk4 from "../../assets/manifestacije/vk4.jpg";
import b1 from "../../assets/manifestacije/bazar1.jpg";
import b2 from "../../assets/manifestacije/bazar2.jpg";
import b3 from "../../assets/manifestacije/bazar3.jpg";
import b4 from "../../assets/manifestacije/bazar4.jpg";
import b5 from "../../assets/manifestacije/bazar5.jpg";
import b6 from "../../assets/manifestacije/bazar6.jpg";
import dj2 from "../../assets/manifestacije/djeram2.jpg";
import dj3 from "../../assets/manifestacije/djeram3.jpg";
import dj4 from "../../assets/manifestacije/djeram4.jpg";
import dj5 from "../../assets/manifestacije/djeram5.jpg";
import dj6 from "../../assets/manifestacije/djeram6.jpg";
import vid1 from "../../assets/manifestacije/vid1.jpg";
import vid2 from "../../assets/manifestacije/vid2.jpg";
import vid3 from "../../assets/manifestacije/vid3.jpg";
import vid4 from "../../assets/manifestacije/vid4.jpg";
import vid5 from "../../assets/manifestacije/vid5.jpg";
import vid6 from "../../assets/manifestacije/vid6.jpg";
import op1 from "../../assets/manifestacije/op1.jpg";
import op2 from "../../assets/manifestacije/op2.jpg";
import op3 from "../../assets/manifestacije/op3.jpg";
import Seo from "../../components/Seo";

const logoMap = {
  opstinaLogo, toLogo, biblLogo, cosLogo, visLogo, javorLogo, kudLogo, vrticLogo,
};

const slikeMap = {
  cd1, cd2, cd3, cd4, cd5, cd6,
  lile1, lile2, lile3, lile4, lile5, lile6,
  slet1, slet2, slet3, slet4,
  g1, g2, g3, g4, g5, g6,
  mtb1, mtb2, mtb3, mtb4, mtb5,
  vk1, vk2, vk3, vk4,
  b1, b2, b3, b4, b5, b6,
  dj2, dj3, dj4, dj5, dj6,
  vid1, vid2, vid3, vid4, vid5, vid6,
  op1, op2, op3,
};

// ── Kalendar ──────────────────────────────────────────────────────────────────
function Kalendar({ dogadjaji, odabraniDatum, onOdaberiDatum }) {
  const { t } = useTranslation();
  const DANI = t("manifestacije.dani", { returnObjects: true });
  const MJESECI = t("manifestacije.mjeseci", { returnObjects: true });

  const danas = new Date();
  const [godina, setGodina] = useState(danas.getFullYear());
  const [mjesec, setMjesec] = useState(danas.getMonth());

  const datumi = useMemo(() => {
    const set = new Set();
    dogadjaji.forEach((d) => {
      const dt = new Date(d.datum_od);
      if (dt.getFullYear() === godina && dt.getMonth() === mjesec)
        set.add(dt.getDate());
    });
    return set;
  }, [dogadjaji, godina, mjesec]);

  const prvogDana = new Date(godina, mjesec, 1).getDay();
  const pomak = (prvogDana + 6) % 7;
  const danaMjeseca = new Date(godina, mjesec + 1, 0).getDate();

  const prijasiMjesec = () => {
    if (mjesec === 0) { setMjesec(11); setGodina((g) => g - 1); }
    else setMjesec((m) => m - 1);
  };
  const sljedeciMjesec = () => {
    if (mjesec === 11) { setMjesec(0); setGodina((g) => g + 1); }
    else setMjesec((m) => m + 1);
  };

  const celije = [
    ...Array(pomak).fill(null),
    ...Array.from({ length: danaMjeseca }, (_, i) => i + 1),
  ];
  while (celije.length < 42) celije.push(null);

  const odabraniObj = odabraniDatum ? new Date(odabraniDatum) : null;

  return (
    <div className="MAN_kal">
      <div className="MAN_kal__header">
        <button className="MAN_kal__nav" onClick={prijasiMjesec}>‹</button>
        <span className="MAN_kal__naslov">{MJESECI[mjesec]} {godina}</span>
        <button className="MAN_kal__nav" onClick={sljedeciMjesec}>›</button>
      </div>
      <div className="MAN_kal__grid">
        {DANI.map((d) => (
          <div key={d} className="MAN_kal__dan-naziv">{d}</div>
        ))}
        {celije.map((dan, i) => {
          if (!dan) return <div key={`p-${i}`} className="MAN_kal__prazna" />;
          const imaEvent = datumi.has(dan);
          const datumStr = `${godina}-${String(mjesec + 1).padStart(2, "0")}-${String(dan).padStart(2, "0")}`;
          const jeOdabran =
            odabraniObj &&
            odabraniObj.getFullYear() === godina &&
            odabraniObj.getMonth() === mjesec &&
            odabraniObj.getDate() === dan;
          const jeDanas =
            danas.getFullYear() === godina &&
            danas.getMonth() === mjesec &&
            danas.getDate() === dan;
          return (
            <button
              key={`d-${dan}`}
              onClick={() => imaEvent && onOdaberiDatum(jeOdabran ? null : datumStr)}
              className={[
                "MAN_kal__dan",
                imaEvent ? "MAN_kal__dan--event" : "",
                jeOdabran ? "MAN_kal__dan--odabran" : "",
                jeDanas ? "MAN_kal__dan--danas" : "",
              ].filter(Boolean).join(" ")}
            >
              {dan}
              {imaEvent && !jeOdabran && <span className="MAN_kal__tackica" />}
            </button>
          );
        })}
      </div>
      {odabraniDatum && (
        <button className="MAN_kal__reset" onClick={() => onOdaberiDatum(null)}>
          {t("manifestacije.ponisti_filter")}
        </button>
      )}
      <div className="MAN_kal__legenda">
        <div className="MAN_kal__legenda-stavka">
          <span className="MAN_kal__legenda-krug MAN_kal__legenda-krug--event" />
          {t("manifestacije.dan_dogadjaj")}
        </div>
        <div className="MAN_kal__legenda-stavka">
          <span className="MAN_kal__legenda-krug MAN_kal__legenda-krug--danas" />
          {t("manifestacije.danas")}
        </div>
      </div>
    </div>
  );
}

// ── Event kartica ─────────────────────────────────────────────────────────────
function EventKartica({ dogadjaj }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const _sUrl =
    dogadjaj.slike?.find((s) => s.glavna)?.url ??
    dogadjaj.slike?.[0]?.url ??
    null;
  const slika = _sUrl
    ? _sUrl.startsWith("http") ? _sUrl : API_URL.replace(/\/api.*$/, "") + _sUrl
    : null;

  const naslov = tf(dogadjaj, "naslov", lang);
  const opis = tf(dogadjaj, "opis", lang) ?? dogadjaj.kratki_opis;

  return (
    <div className="MAN_event">
      <div className="MAN_event__slika-wrap">
        {slika ? (
          <img src={slika} alt={naslov} className="MAN_event__slika" loading="lazy" />
        ) : (
          <div className="MAN_event__slika-placeholder" />
        )}
        {dogadjaj.kategorija && (
          <span className="MAN_event__kat">{tf(dogadjaj.kategorija, "naziv", lang)}</span>
        )}
      </div>
      <div className="MAN_event__tijelo">
        <h3 className="MAN_event__naslov">{naslov}</h3>
        <p className="MAN_event__opis">{opis}</p>
        <div className="MAN_event__meta">
          <div className="MAN_event__meta-red">
            <span className="MAN_event__meta-labela">{t("manifestacije.datum")}</span>
            <span className="MAN_event__meta-vrijednost">{dogadjaj.datum_od}</span>
          </div>
          {dogadjaj.datum_do && (
            <div className="MAN_event__meta-red">
              <span className="MAN_event__meta-labela">{t("manifestacije.do")}</span>
              <span className="MAN_event__meta-vrijednost">{dogadjaj.datum_do}</span>
            </div>
          )}
          {dogadjaj.lokacija && (
            <div className="MAN_event__meta-red">
              <span className="MAN_event__meta-labela">{t("manifestacije.lokacija")}</span>
              <span className="MAN_event__meta-vrijednost">{dogadjaj.lokacija.naziv}</span>
            </div>
          )}
          {dogadjaj.vrijeme && (
            <div className="MAN_event__meta-red">
              <span className="MAN_event__meta-labela">{t("manifestacije.vrijeme")}</span>
              <span className="MAN_event__meta-vrijednost">{dogadjaj.vrijeme}</span>
            </div>
          )}
          {dogadjaj.kontakt_osoba?.telefon && (
            <div className="MAN_event__meta-red">
              <span className="MAN_event__meta-labela">{t("manifestacije.kontakt")}</span>
              <a href={`tel:${dogadjaj.kontakt_osoba.telefon}`} className="MAN_event__meta-tel">
                {dogadjaj.kontakt_osoba.ime_prezime ? `${dogadjaj.kontakt_osoba.ime_prezime} · ` : ""}
                {dogadjaj.kontakt_osoba.telefon}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Slider ────────────────────────────────────────────────────────────────────
function TradSlider({ slike, slikeOpisi }) {
  const { t } = useTranslation();
  const [pocetni, setPocetni] = useState(0);
  const vidljivo = 3;
  const mozeLijevo = pocetni > 0;
  const mozeDesno = pocetni + vidljivo < slike.length;
  const idi = (smjer) =>
    setPocetni((p) => Math.max(0, Math.min(p + smjer, slike.length - vidljivo)));
  const prikazane = slike.slice(pocetni, pocetni + vidljivo);

  return (
    <div className="MAN_trad__slider">
      <button
        className={`MAN_trad__slider-nav MAN_trad__slider-nav--lijevo${!mozeLijevo ? " MAN_trad__slider-nav--disabled" : ""}`}
        onClick={() => idi(-1)}
        disabled={!mozeLijevo}
        aria-label={t("manifestacije.prethodne_slike")}
      >
        ‹
      </button>
      <div className="MAN_trad__slider-track">
        {prikazane.map((slika, i) => {
          const idx = pocetni + i;
          return (
            <div key={idx} className="MAN_trad__slika-item">
              {slika ? (
                <img src={slika} alt={slikeOpisi[idx] ?? ""} className="MAN_trad__slika" loading="lazy" />
              ) : (
                <div className="MAN_trad__slika-placeholder" />
              )}
              {slikeOpisi[idx] && (
                <span className="MAN_trad__slika-opis">{slikeOpisi[idx]}</span>
              )}
            </div>
          );
        })}
      </div>
      <button
        className={`MAN_trad__slider-nav MAN_trad__slider-nav--desno${!mozeDesno ? " MAN_trad__slider-nav--disabled" : ""}`}
        onClick={() => idi(1)}
        disabled={!mozeDesno}
        aria-label={t("manifestacije.sljedece_slike")}
      >
        ›
      </button>
      {slike.length > vidljivo && (
        <div className="MAN_trad__slider-dots">
          {Array.from({ length: slike.length - vidljivo + 1 }).map((_, i) => (
            <button
              key={i}
              className={`MAN_trad__slider-dot${i === pocetni ? " MAN_trad__slider-dot--aktivan" : ""}`}
              onClick={() => setPocetni(i)}
              aria-label={`${t("manifestacije.pozicija")} ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Trad segment ──────────────────────────────────────────────────────────────
function TradSegment({ man }) {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const naslov = lang === "en" ? man.naslov_en : man.naslov;
  const opis   = lang === "en" ? man.opis_en   : man.opis;
  const period = lang === "en" ? man.period_en  : man.period;
  const slike  = man.slikeKeys.map((k) => slikeMap[k]);

  return (
    <div className="MAN_trad">
      <div className="MAN_trad__info">
        <span className="MAN_trad__period">{period}</span>
        <h3 className="MAN_trad__naslov">{naslov}</h3>
        <p className="MAN_trad__opis">{opis}</p>
      </div>
      <TradSlider slike={slike} slikeOpisi={[]} />
    </div>
  );
}

// ── Glavna komponenta ─────────────────────────────────────────────────────────
function Manifestacije() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [dogadjaji, setDogadjaji] = useState([]);
  const [odabraniDatum, setOdabraniDatum] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/dogadjaji?aktivan=1&per_page=100`)
      .then((r) => r.json())
      .then((data) => setDogadjaji(data.data ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtrirani = useMemo(() => {
    if (!odabraniDatum) return dogadjaji;
    return dogadjaji.filter((d) => d.datum_od === odabraniDatum);
  }, [dogadjaji, odabraniDatum]);

  return (
    <section className="MAN_section">
      <Seo title={t("manifestacije.meta_title")} description={t("manifestacije.meta_description")} />
      <div className="MAN_hero">
        <img src={manHero} className="MAN_hero__img MAN_hero__img--placeholder" alt="Manifestacije" />
        <div className="MAN_hero__overlay" />
        <div className="MAN_hero__tekst">
          <span className="MAN_hero__bedz">{t("manifestacije.bedz_hero")}</span>
          <h1 className="MAN_hero__naslov">{t("manifestacije.naslov")}</h1>
          <p className="MAN_hero__podnaslov">{t("manifestacije.podnaslov")}</p>
          <a href="#predstojeCI" className="MAN_hero__dugme">
            {t("manifestacije.pogledaj_dogadjaje")}
          </a>
        </div>
      </div>

      <div className="MAN_organizatori">
        <div className="MAN_organizatori__wrap">
          <span className="MAN_bedz--zeleni MAN_bedz--centar">
            {t("manifestacije.bedz_organizatori")}
          </span>
          <h2 className="MAN_organizatori__naslov">
            {t("manifestacije.organizatori_naslov")}
          </h2>
          <p className="MAN_organizatori__podnaslov">
            {t("manifestacije.organizatori_podnaslov")}
          </p>
          <div className="MAN_organizatori__grid">
            {podaci.organizatori.map((org) => {
              const naziv = lang === "en" ? org.naziv_en : org.naziv;
              const opis  = lang === "en" ? org.opis_en  : org.opis;
              return (
                <div key={org.naziv} className="MAN_org">
                  <div className="MAN_org__logo">
                    {logoMap[org.logoKey] ? (
                      <img src={logoMap[org.logoKey]} alt={naziv} className="MAN_org__logo-img" loading="lazy" />
                    ) : (
                      <span className="MAN_org__logo-placeholder">🏛️</span>
                    )}
                  </div>
                  <div className="MAN_org__info">
                    <h3 className="MAN_org__naziv">{naziv}</h3>
                    <p className="MAN_org__opis">{opis}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="MAN_predstojeCI" id="predstojeCI">
        <div className="MAN_predstojeCI__wrap">
          <span className="MAN_bedz--zeleni MAN_bedz--centar">
            {t("manifestacije.bedz_predstojeci")}
          </span>
          <h2 className="MAN_predstojeCI__naslov">
            {t("manifestacije.predstojeci_naslov")}
          </h2>
          <p className="MAN_predstojeCI__podnaslov">
            {t("manifestacije.predstojeci_podnaslov")}
          </p>
          <div className="MAN_predstojeCI__layout">
            <aside className="MAN_predstojeCI__sidebar">
              <Kalendar
                dogadjaji={dogadjaji}
                odabraniDatum={odabraniDatum}
                onOdaberiDatum={setOdabraniDatum}
              />
            </aside>
            <div className="MAN_predstojeCI__grid">
              {loading ? (
                <div className="MAN_prazan">
                  <p>{t("manifestacije.ucitavanje_dogadjaja")}</p>
                </div>
              ) : filtrirani.length === 0 ? (
                <div className="MAN_prazan">
                  <p>{t("manifestacije.nema_dogadjaja")}</p>
                  <button
                    className="MAN_prazan__btn"
                    onClick={() => setOdabraniDatum(null)}
                  >
                    {t("manifestacije.prikazi_sve")}
                  </button>
                </div>
              ) : (
                filtrirani.map((d) => <EventKartica key={d.id} dogadjaj={d} />)
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="MAN_tradicionalne">
        <div className="MAN_tradicionalne__wrap">
          <span className="MAN_bedz--zeleni MAN_bedz--centar">
            {t("manifestacije.bedz_tradicionalne")}
          </span>
          <h2 className="MAN_tradicionalne__naslov">
            {t("manifestacije.tradicionalne_naslov")}
          </h2>
          <p className="MAN_tradicionalne__podnaslov">
            {t("manifestacije.tradicionalne_podnaslov")}
          </p>
          <div className="MAN_tradicionalne__lista">
            {podaci.tradicionalneManifestacije.map((m, i) => (
              <TradSegment key={i} man={m} />
            ))}
          </div>
        </div>
      </div>

      <div className="MAN_cta">
        <h2 className="MAN_cta__naslov">{t("manifestacije.cta_naslov")}</h2>
        <p className="MAN_cta__tekst">{t("manifestacije.cta_tekst")}</p>
        <div className="MAN_cta__dugmad">
          <Link to="/smjestaj" className="MAN_cta__btn MAN_cta__btn--primarni">
            {t("manifestacije.cta_smjestaj")}
          </Link>
          <Link to="/kontakt" className="MAN_cta__btn MAN_cta__btn--sekundarni">
            {t("manifestacije.cta_kontakt")}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Manifestacije;