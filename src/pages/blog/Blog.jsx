import React, { useState, useEffect } from "react";
import "./Blog.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { API_URL } from "../adminPage/context/AuthContext";
import { tf } from "../../utils/translateField";
import Seo from "../../components/Seo";

const kategorijaBoja = {
  Priroda:         { bg: "#eaf3de", tekst: "#3a5a40" },
  Turizam:         { bg: "#e8f0fa", tekst: "#1a4a8a" },
  Historija:       { bg: "#f5ede0", tekst: "#7a4010" },
  "Aktivan odmor": { bg: "#eaf3de", tekst: "#3a5a40" },
  Gastronomija:    { bg: "#fdf0e0", tekst: "#8a5a00" },
};

function BlogKartica({ blog, istaknuta }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const boja = kategorijaBoja[blog.kategorija?.naziv] ?? { bg: "#eaf3de", tekst: "#3a5a40" };
  const slika = blog.slike?.find(s => s.glavna)?.url ?? blog.slike?.[0]?.url ?? null;
  const linkTo = `/blog/${blog.id}`;

  const naslov   = tf(blog, 'naslov', lang);
  const tekst    = tf(blog, 'tekst', lang);
  const katNaziv = blog.kategorija ? tf(blog.kategorija, 'naziv', lang) : t('blog.ostalo');

  if (istaknuta) {
    return (
      <Link to={linkTo} className="BLG_istaknuta">
        <div className="BLG_istaknuta__slika">
          {slika
            ? <img src={slika} alt={naslov} className="BLG_istaknuta__slika-img" loading="lazy" />
            : <div className="BLG_istaknuta__slika-placeholder" />
          }
          <span className="BLG_kat" style={{ background: boja.bg, color: boja.tekst }}>
            {katNaziv}
          </span>
        </div>
        <div className="BLG_istaknuta__info">
          <span className="BLG_istaknuta__oznaka">{t('blog.istaknuti_post')}</span>
          <h2 className="BLG_istaknuta__naslov">{naslov}</h2>
          <p className="BLG_istaknuta__opis">{tekst?.substring(0, 200)}...</p>
          <div className="BLG_meta">
            <span>✍️ {blog.autor?.ime_prezime ?? t('blog.default_autor')}</span>
            <span>📅 {blog.created_at}</span>
          </div>
          <span className="BLG_istaknuta__cta">{t('blog.citaj_vise')}</span>
        </div>
      </Link>
    );
  }

  return (
    <Link to={linkTo} className="BLG_kartica">
      <div className="BLG_kartica__slika-wrap">
        {slika
          ? <img src={slika} alt={naslov} className="BLG_kartica__slika" loading="lazy" />
          : <div className="BLG_kartica__slika-placeholder" />
        }
        <span className="BLG_kat" style={{ background: boja.bg, color: boja.tekst }}>
          {katNaziv}
        </span>
      </div>
      <div className="BLG_kartica__tijelo">
        <h3 className="BLG_kartica__naslov">{naslov}</h3>
        <p className="BLG_kartica__opis">{tekst?.substring(0, 150)}...</p>
        <div className="BLG_meta">
          <span>📅 {blog.created_at}</span>
        </div>
        <span className="BLG_kartica__cta">{t('blog.citaj_vise')}</span>
      </div>
    </Link>
  );
}

function Blog() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [blogovi, setBlogovi]       = useState([]);
  const [kategorije, setKategorije] = useState([]);
  const [aktivnaKat, setAktivnaKat] = useState("Sve");
  const [loading, setLoading]       = useState(true);
  const [greska, setGreska]         = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/blog-postovi?aktivan=1&per_page=100`).then(r => r.json()),
      fetch(`${API_URL}/blog-kategorije`).then(r => r.json()),
    ])
      .then(([blogData, katData]) => {
        setBlogovi(blogData.data ?? []);
        setKategorije(katData.data ?? katData);
      })
      .catch(() => setGreska(t('blog.greska_ucitavanje')))
      .finally(() => setLoading(false));
  }, [t]);

  // Istaknuti je uvijek prvi blog, prikazuje se samo kad nema aktivnog filtera
  const istaknuti = blogovi[0] ?? null;

  // Filter logika radi na sirovom (sr) nazivu kategorije iz baze — to je stabilan ključ
  const filtrirani = aktivnaKat === "Sve"
    ? blogovi.slice(1)
    : blogovi.filter(b => b.kategorija?.naziv === aktivnaKat);

  const prikaziIstaknuti = aktivnaKat === "Sve" && istaknuti;

  if (loading) return <div className="BLG_loading">{t('blog.ucitavanje')}</div>;
  if (greska)  return <div className="BLG_greska">{greska}</div>;

  return (
    <section className="BLG_section">
      <Seo title={t("blog.meta_title")} description={t("blog.meta_description")} />

      <div className="BLG_hero">
        <h1>{t('blog.naslov')}</h1>
        <p>{t('blog.podnaslov')}</p>
      </div>

      <div className="BLG_sadrzaj">

        {prikaziIstaknuti && (
          <div className="BLG_wrap BLG_istaknuta-wrap">
            <BlogKartica blog={istaknuti} istaknuta={true} />
          </div>
        )}

        <div className="BLG_wrap">
          <div className="BLG_filteri">
            <button
              onClick={() => setAktivnaKat("Sve")}
              className={`BLG_filter${aktivnaKat === "Sve" ? " BLG_filter--aktivan" : ""}`}
            >
              {t('blog.sve')}
            </button>
            {kategorije.map(k => (
              <button
                key={k.id}
                onClick={() => setAktivnaKat(k.naziv)}
                className={`BLG_filter${aktivnaKat === k.naziv ? " BLG_filter--aktivan" : ""}`}
              >
                {tf(k, 'naziv', lang)}
              </button>
            ))}
          </div>

          {filtrirani.length === 0 ? (
            <div className="BLG_prazan">{t('blog.nema_objava')}</div>
          ) : (
            <div className="BLG_grid">
              {filtrirani.map(b => (
                <BlogKartica key={b.id} blog={b} istaknuta={false} />
              ))}
            </div>
          )}
        </div>
      </div>

    </section>
  );
}

export default Blog;