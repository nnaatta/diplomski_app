import React, { useState } from "react";
import "./Blog.css";
import { Link } from "react-router-dom";
import skakavac from "../../assets/Vodopad-Skakavac2.jpg"
import zimovanje from "../../assets/sportRekreacija/igrista1.jpg"
import dvorac from "../../assets/dvoracKaradjordjevica.jpeg"
import restoran from "../../assets/pogled1.jpg"

const blogovi = [
  {
    id: 1,
    slug: "vodopad-skakavac-biseri-romanije",
    slika: skakavac,
    naslov: "Vodopad Skakavac — biser Romanije koji morate posjetiti",
    kratakOpis: "Sakriveni dragulj u srcu šume, vodopad Skakavac oduševljava svakog posjetioca svojom ljepotom i jedinstvenošću. Saznajte kako doći i šta vas čeka.",
    kategorija: "Priroda",
    autor: "TO Han Pijesak",
    datum: "15. april 2025.",
    vrijemeČitanja: "4 min",
    istaknuto: true,
    gradijent: "linear-gradient(135deg, #a3b18a 0%, #588157 50%, #344e41 100%)",
  },
  {
    id: 2,
    slug: "zimovanje-na-romaniji",
    slika: zimovanje,
    naslov: "Zimovanje na Romaniji — sve što trebate znati",
    kratakOpis: "Ski staze, čist planinski vazduh i autentična planinska kuhinja. Han Pijesak zimi nudi nezaboravno iskustvo za cijelu porodicu.",
    kategorija: "Turizam",
    autor: "TO Han Pijesak",
    datum: "3. mart 2025.",
    vrijemeČitanja: "5 min",
    istaknuto: false,
    gradijent: "linear-gradient(135deg, #c8d8e0 0%, #6a9ab0 50%, #1a4a6a 100%)",
  },
  {
    id: 3,
    slug: "dvorac-karadjordjevica-historija",
    slika: dvorac,
    naslov: "Dvorac Karađorđevića — sto godina historije",
    kratakOpis: "Od kraljevske rezidencije do napuštenih zidina — priča o dvorcu koji je svjedočio promjenama cijelog jednog vijeka.",
    kategorija: "Historija",
    autor: "TO Han Pijesak",
    datum: "18. februar 2025.",
    vrijemeČitanja: "6 min",
    istaknuto: false,
    gradijent: "linear-gradient(135deg, #c8b898 0%, #8a7050 50%, #4e3420 100%)",
  },
  {
    id: 4,
    slug: "planinarenje-za-pocetnike",
    slika: null,
    naslov: "Planinarenje za početnike — vodič za Han Pijesak",
    kratakOpis: "Koji su najlakši putevi? Šta ponijeti? Kako se pripremiti? Sve odgovore pronađite u našem vodiču za one koji tek otkrivaju planinarstvo.",
    kategorija: "Aktivan odmor",
    autor: "TO Han Pijesak",
    datum: "5. januar 2025.",
    vrijemeČitanja: "7 min",
    istaknuto: false,
    gradijent: "linear-gradient(135deg, #b8d4b0 0%, #5a9050 50%, #2a5020 100%)",
  },
  {
    id: 5,
    slug: "gastronomija-han-pijesak",
    slika: restoran,
    naslov: "Ukusi Han Pijeska — tradicionalna kuhinja planine",
    kratakOpis: "Janjetina s ražnja, kajmak, bosanski lonac — otkrijte autentične okuse koji se prenose s generacije na generaciju u ovom planinskom kraju.",
    kategorija: "Gastronomija",
    autor: "TO Han Pijesak",
    datum: "20. decembar 2024.",
    vrijemeČitanja: "3 min",
    istaknuto: false,
    gradijent: "linear-gradient(135deg, #d8c8a0 0%, #a89060 50%, #5a4820 100%)",
  },
];

const kategorije = ["Sve", "Priroda", "Turizam", "Historija", "Aktivan odmor", "Gastronomija"];

const kategorijaBoja = {
  Priroda:       { bg: "#eaf3de", tekst: "#3a5a40" },
  Turizam:       { bg: "#e8f0fa", tekst: "#1a4a8a" },
  Historija:     { bg: "#f5ede0", tekst: "#7a4010" },
  "Aktivan odmor": { bg: "#eaf3de", tekst: "#3a5a40" },
  Gastronomija:  { bg: "#fdf0e0", tekst: "#8a5a00" },
};

function BlogKartica({ blog, istaknuta }) {
  const boja = kategorijaBoja[blog.kategorija] || { bg: "#eaf3de", tekst: "#3a5a40" };

  if (istaknuta) {
    return (
      <Link to={`/blog/${blog.slug}`} className="BLG_istaknuta">
        <div className="BLG_istaknuta__slika">
          {blog.slika
            ? <img src={blog.slika} alt={blog.naslov} className="BLG_istaknuta__slika-img" />
            : <div className="BLG_istaknuta__slika-placeholder" style={{ background: blog.gradijent }} />
          }
          <span className="BLG_kat" style={{ background: boja.bg, color: boja.tekst }}>
            {blog.kategorija}
          </span>
        </div>
        <div className="BLG_istaknuta__info">
          <span className="BLG_istaknuta__oznaka">Istaknuti post</span>
          <h2 className="BLG_istaknuta__naslov">{blog.naslov}</h2>
          <p className="BLG_istaknuta__opis">{blog.kratakOpis}</p>
          <div className="BLG_meta">
            <span>✍️ {blog.autor}</span>
            <span>📅 {blog.datum}</span>
            <span>⏱️ {blog.vrijemeČitanja}</span>
          </div>
          <span className="BLG_istaknuta__cta">Čitaj više →</span>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/blog/${blog.slug}`} className="BLG_kartica">
      <div className="BLG_kartica__slika-wrap">
        {blog.slika
          ? <img src={blog.slika} alt={blog.naslov} className="BLG_kartica__slika" />
          : <div className="BLG_kartica__slika-placeholder" style={{ background: blog.gradijent }} />
        }
        <span className="BLG_kat" style={{ background: boja.bg, color: boja.tekst }}>
          {blog.kategorija}
        </span>
      </div>
      <div className="BLG_kartica__tijelo">
        <h3 className="BLG_kartica__naslov">{blog.naslov}</h3>
        <p className="BLG_kartica__opis">{blog.kratakOpis}</p>
        <div className="BLG_meta">
          <span>📅 {blog.datum}</span>
          <span>⏱️ {blog.vrijemeČitanja}</span>
        </div>
        <span className="BLG_kartica__cta">Čitaj više →</span>
      </div>
    </Link>
  );
}

function Blog() {
  const [aktivnaKat, setAktivnaKat] = useState("Sve");

  const istaknuti = blogovi.find(b => b.istaknuto);
  const ostali = blogovi.filter(b => !b.istaknuto);

  const filtrirani = aktivnaKat === "Sve"
    ? ostali
    : ostali.filter(b => b.kategorija === aktivnaKat);

  return (
    <section className="BLG_section">

      {/* ── HERO ── */}
      <div className="BLG_hero">
        <h1>Blog</h1>
        <p>Vijesti, vodiči i priče iz Han Pijeska</p>
      </div>

      <div className="BLG_sadrzaj">

        {/* ── ISTAKNUTI POST ── */}
        {istaknuti && (
          <div className="BLG_wrap BLG_istaknuta-wrap">
            <BlogKartica blog={istaknuti} istaknuta={true} />
          </div>
        )}

        {/* ── FILTER + GRID ── */}
        <div className="BLG_wrap">
          <div className="BLG_filteri">
            {kategorije.map(k => (
              <button
                key={k}
                onClick={() => setAktivnaKat(k)}
                className={`BLG_filter${aktivnaKat === k ? " BLG_filter--aktivan" : ""}`}
              >
                {k}
              </button>
            ))}
          </div>

          {filtrirani.length === 0 ? (
            <div className="BLG_prazan">Nema objava u ovoj kategoriji.</div>
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