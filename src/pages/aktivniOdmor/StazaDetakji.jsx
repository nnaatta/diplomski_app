import "./StazaDetalji.css";
import { useParams, useNavigate } from "react-router-dom";
import { FaWalking, FaMountain } from "react-icons/fa";
import { IoMdBicycle } from "react-icons/io";
import { AiFillThunderbolt } from "react-icons/ai";
import { GiRoad } from "react-icons/gi";

import { staze } from "./AktivniOdmor";

const tezineLabele = {
  lako: "Lako",
  srednje: "Srednje",
  tesko: "Teško",
  ekstremno: "Ekstremno",
};

const tipLabele = {
  pjesacka: "Pješačka staza",
  planinska: "Planinska tura",
  biciklisticka: "Biciklistička ruta",
};

const tipEmoji = {
  pjesacka: <FaWalking />,
  planinska: <FaMountain />,
  biciklisticka: <IoMdBicycle />,
};

export default function StazaDetalji() {
  const { id } = useParams();
  const navigate = useNavigate();

  // nađi stazu po ID-u
  const staza = staze.find((s) => s.id === Number(id));

  if (!staza) return <div>Nije pronađena staza</div>;

  return (
    <section className="SD_section">
      <div className="SD_hero">
        {staza.hero_slika ? (
          <img
            src={staza.hero_slika}
            alt={staza.naziv}
            className="SD_hero__slika"
          />
        ) : (
          <div className="SD_hero__placeholder" />
        )}
        <div className="SD_hero__overlay" />

        <div className="SD_hero__sadrzaj">
          <span className={`SD_hero__tip SD_hero__tip--${staza.tip}`}>
            {tipEmoji[staza.tip]} {tipLabele[staza.tip]}
          </span>
          <h1 className="SD_hero__naziv">{staza.naziv}</h1>
        </div>
      </div>

      <div className="SD_infobar">
        <div className="SD_infobar__item">
          <span className="SD_infobar__ikona">
            <GiRoad />
          </span>
          <div>
            <span className="SD_infobar__vrijednost">{staza.duzina} km</span>
            <span className="SD_infobar__labela">Dužina</span>
          </div>
        </div>

        <div className="SD_infobar__separator" />

        <div className="SD_infobar__item">
          <span className="SD_infobar__ikona">
            <AiFillThunderbolt />
          </span>
          <div>
            <span
              className={`SD_infobar__badge SD_infobar__badge--${staza.tezina}`}
            >
              {tezineLabele[staza.tezina]}
            </span>
            <span className="SD_infobar__labela">Težina</span>
          </div>
        </div>

        <div className="SD_infobar__separator" />

        <div className="SD_infobar__item">
          <span className="SD_infobar__ikona">{tipEmoji[staza.tip]}</span>
          <div>
            <span className="SD_infobar__vrijednost">
              {tipLabele[staza.tip]}
            </span>
            <span className="SD_infobar__labela">Vrsta</span>
          </div>
        </div>
      </div>

      <div className="SD_sadrzaj">
        <div className="SD_opis">
          <h2>O stazi</h2>
          <p>{staza.opis || "Opis nije dodat."}</p>
        </div>

        {staza.mapa_url && (
          <div className="SD_mapa">
            <h2 className="SD_mapa__naslov">Mapa staze</h2>
            <p className="SD_mapa__tekst">
              Klikom na destinaciju iz menija prikazaće se putanja i kratak opis
              odabrane lokacije.
            </p>
            <div className="SD_mapa__wrap">
              <iframe
                src={staza.mapa_url}
                title={`Mapa — ${staza.naziv}`}
                className="SD_mapa__iframe"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        )}

        <button className="SD_nazad" onClick={() => navigate(-1)}>
          ← Nazad na staze
        </button>
      </div>
    </section>
  );
}
