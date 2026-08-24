import React, { useState, useEffect } from "react";
import "./DetaljiBlog.css";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { API_URL } from "../adminPage/context/AuthContext";
import { tf } from "../../utils/translateField";

function DetaljiBlog() {
  const { slug } = useParams(); // koristimo slug kao id
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [post, setPost]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [greska, setGreska] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/blog-postovi/${slug}`)
      .then(r => {
        if (!r.ok) throw new Error('Nije pronađen');
        return r.json();
      })
      .then(data => setPost(data.data ?? data))
      .catch(() => setGreska(t('detalji_blog.nije_pronadjen_greska')))
      .finally(() => setLoading(false));
  }, [slug, t]);

  if (loading) return <div className="DBL_loading">{t('detalji_blog.ucitavanje')}</div>;

  if (greska || !post) {
    return (
      <div className="DBL_notfound">
        <h2>{t('detalji_blog.nije_pronadjen')}</h2>
        <Link to="/blog" className="DBL_nazad-btn">{t('detalji_blog.nazad')}</Link>
      </div>
    );
  }

  const _heroUrl = post.slike?.find(s => s.glavna)?.url ?? post.slike?.[0]?.url ?? null;
  const heroSlika = _heroUrl ? (_heroUrl.startsWith('http') ? _heroUrl : API_URL.replace(/\/api.*$/, '') + _heroUrl) : null;

  const naslov = tf(post, 'naslov', lang);
  const tekst  = tf(post, 'tekst', lang);

  return (
    <section className="DBL_section">

      <div className="DBL_hero">
        {heroSlika
          ? <img src={heroSlika} alt={naslov} className="DBL_hero__slika-img" />
          : <div className="DBL_hero__slika-placeholder" />
        }
        <div className="DBL_hero__overlay" />
        <div className="DBL_hero__sadrzaj">
          {post.kategorija && (
            <span className="DBL_kat">{tf(post.kategorija, 'naziv', lang)}</span>
          )}
          <h1 className="DBL_hero__naslov">{naslov}</h1>
          <div className="DBL_hero__meta">
            <span>✍️ {post.autor?.ime_prezime ?? t('blog.default_autor')}</span>
            <span>📅 {post.created_at}</span>
          </div>
        </div>
        <Link to="/blog" className="DBL_hero__nazad">{t('detalji_blog.nazad_blog')}</Link>
      </div>

      <div className="DBL_tijelo">
        <div className="DBL_clanak">
          <div className="DBL_paragraf" style={{ whiteSpace: 'pre-wrap' }}>
            {tekst}
          </div>
          <div className="DBL_nav">
            <Link to="/blog" className="DBL_nav__btn">{t('detalji_blog.nazad')}</Link>
          </div>
        </div>
      </div>

    </section>
  );
}

export default DetaljiBlog;