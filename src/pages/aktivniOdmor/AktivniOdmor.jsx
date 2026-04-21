import { useState } from "react";
import "./AktivniOdmor.css";
import { FaWalking, FaMountain } from "react-icons/fa";
import { IoMdBicycle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export const staze = [
  { id: 1, naziv: "Uspon na Veliki Žep", duzina: 5.6, tip: "pjesacka", tezina: "srednje" },
  { id: 2, naziv: "Srpsko vojničko groblje Vrani Kamen", duzina: 11.5, tip: "pjesacka", tezina: "tesko" },
  { id: 3, naziv: "Pješačka staza Han Kram – Vidikovac Feredže", duzina: 1.9, tip: "pjesacka", tezina: "lako" },
  { id: 4, naziv: "Krivače – Veliki Žep", duzina: 3.5, tip: "pjesacka", tezina: "lako" },
  { id: 5, naziv: "Žeravice – vodopad Skakavac", duzina: 2.5, tip: "pjesacka", tezina: "lako" , opis:"Staza je jako lagana, dužine oko 2,5 km u jednom pravcu (od kojih je 2 km makadamski put). Staza počinje u mjestu Podžeravice, gdje se sa regionalnog puta Han Pijesak – Olovo skreće desno. Ide se oko 2 km kamionskim putem uz rijeku Varošnicu – do kraja puta. Posljednjih 500 m staza vodi kroz šumu uz potok Skakavac, na čijem se kraju nalazi istoimeni, impozantni vodopad.", mapa_url:"https://imap.bts.ba/#"},
  { id: 6, naziv: "Planinski kamp Jazavčije rupe – Vrh Veliko Igrište (1406 m) – Dolovi – Planinski kamp Jazavčije", duzina: 12, tip: "planinska", tezina: "tesko" },
  { id: 7, naziv: "Restoran „Pogled“ – Vidikovci Strmca – Restoran „Pogled“", duzina: 7, tip: "planinska", tezina: "lako" },
  { id: 8, naziv: "Karaula – vidikovac Žeženica", duzina: 0.5, tip: "planinska", tezina: "lako" },
  { id: 9, naziv: "Han Pijesak – Visočnik (1250 m) – Han Kram", duzina: 12, tip: "planinska", tezina: "srednje" },
  { id: 10, naziv: "Kusace – Veliki Žep", duzina: 5, tip: "planinska", tezina: "tesko" },
  { id: 11, naziv: "Staza Visit Javor", duzina: 41.55, tip: "biciklisticka", tezina: "srednje" },
  { id: 12, naziv: "Staza Wild beauty", duzina: 30, tip: "biciklisticka", tezina: "tesko" },
  { id: 13, naziv: "Staza Black river and Royal mountain", duzina: 38, tip: "biciklisticka", tezina: "srednje" },
  { id: 14, naziv: "Staza Javor – Sunčana planina", duzina: 15, tip: "biciklisticka", tezina: "lako" },
  { id: 15, naziv: "Staza Crna rijeka – zabranjena zona", duzina: 20, tip: "biciklisticka", tezina: "lako" },
];

const tipConfig = {
  pjesacka: {
    label: "Pješačke staze",
    emoji: <FaWalking />,
    light: "#EBF3E4",
    border: "#A8CB84",
  },
  planinska: {
    label: "Planinarske staze",
    emoji: <FaMountain />,
    light: "#FAEAE8",
    border: "#E8978F",
  },
  biciklisticka: {
    label: "Biciklističke staze",
    emoji: <IoMdBicycle />,
    light: "#E5F2FB",
    border: "#7BBDE0",
  },
};

const tezineRed = ["sve", "lako", "srednje", "tesko", "ekstremno"];

const tezineLabele = {
  sve: "Sve",
  lako: "Lako",
  srednje: "Srednje",
  tesko: "Teško",
  ekstremno: "Ekstremno",
};

function StazaRed({ staza }) {
  const navigate = useNavigate();

  const openDetalji = () => {
    navigate(`/aktivni-odmor/${staza.id}`);
  };

  return (
    <div className="AO_red" onClick={openDetalji}>
      <span className="AO_red__naziv">{staza.naziv}</span>
      <div className="AO_red__desno">
        <span className={`AO_badge AO_badge--${staza.tezina}`}>
          {tezineLabele[staza.tezina]}
        </span>
        <div className="AO_red__km">
          {staza.duzina}
          <span className="AO_red__km-jed"> km</span>
        </div>
        <span className="AO_red__arrow">›</span>
      </div>
    </div>
  );
}

function StazaSekcija({ tip }) {
  const [aktivniFilter, setAktivniFilter] = useState("sve");
  const cfg = tipConfig[tip];

  const filtrirane = staze.filter(
    (s) => s.tip === tip && (aktivniFilter === "sve" || s.tezina === aktivniFilter)
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
            <span className="AO_sekcija__broj">
              {staze.filter((s) => s.tip === tip).length} staza
            </span>
          </div>
        </div>

        <div className="AO_filteri">
          {tezineRed.map((t) => {
            const aktivan = aktivniFilter === t;
            return (
              <button
                key={t}
                className={`AO_filter${aktivan ? ` AO_filter--aktivan AO_filter--${t}` : ""}`}
                onClick={() => setAktivniFilter(t)}
              >
                {tezineLabele[t]}
              </button>
            );
          })}
        </div>
      </div>

      <div className="AO_lista">
        {filtrirane.length === 0 ? (
          <div className="AO_prazan">Nema staza za odabrani filter.</div>
        ) : (
          filtrirane.map((s) => <StazaRed key={s.id} staza={s} />)
        )}
      </div>
    </section>
  );
}

export default function AktivniOdmor() {
  return (
    <section className="AO_section">
      <div className="AO_hero">
        <h1>Aktivni odmor</h1>
        <p>Istražite prirodne ljepote Han Pijeska pješice, planinarenjem ili na biciklu</p>
      </div>

      <div className="AO_legenda">
        <span className="AO_legenda__naslov">Težina:</span>

        <div className="AO_legenda__item">
          <div className="AO_legenda__kvadrat AO_legenda__kvadrat--lako" />
          Lako
        </div>

        <div className="AO_legenda__item">
          <div className="AO_legenda__kvadrat AO_legenda__kvadrat--srednje" />
          Srednje
        </div>

        <div className="AO_legenda__item">
          <div className="AO_legenda__kvadrat AO_legenda__kvadrat--tesko" />
          Teško
        </div>

        <div className="AO_legenda__item">
          <div className="AO_legenda__kvadrat AO_legenda__kvadrat--ekstremno" />
          Ekstremno
        </div>
      </div>

      <main className="AO_main">
        <StazaSekcija tip="pjesacka" />
        <StazaSekcija tip="planinska" />
        <StazaSekcija tip="biciklisticka" />
      </main>
    </section>
  );
}