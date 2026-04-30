import React, { useEffect, useRef } from "react";
import "./Znamenitosti.css";
import { Link } from "react-router-dom";
import dvorac from "../../assets/dvoracKaradjordjevica.jpeg"
import posijak1 from "../../assets/Znamenitosti/posijak1.JPG"
import posijak2 from "../../assets/Znamenitosti/posijak2.JPG"
import vraniKamen from "../../assets/vraniKamen.jpg"
import g3 from "../../assets/velikiZep.jpg"



const znamenitosti = [
  {
    id: 1,
    naziv: "Stari grad Pošijak",
    tip: "Istorijski lokalitet",
    opis:
      "Stari grad Pošijak predstavlja jedno od najstarijih poznatih utvrđenja na području Han Pijeska i značajan je svjedok srednjovjekovne istorije ovog kraja. Smatra se da je podignut između 11. i 12. vijeka na strateški važnoj lokaciji nedaleko od Pjenovca. Njegov položaj omogućavao je nadzor nad širim područjem i kontrolu važnih pravaca kretanja kroz planinski prostor istočne Bosne. Iako su danas sačuvani samo ostaci nekadašnjeg utvrđenja, lokalitet i dalje nosi snažan istorijski pečat i privlači ljubitelje arheologije, istorije i kulturne baštine.",
    mapaUrl: "",
    slika: posijak2,
  },

  {
    id: 2,
    naziv: "Nekropole stećaka",
    tip: "Kulturno-istorijsko nasljeđe",
    opis:
      "Nekropole stećaka na lokalitetima Pokajnica (Mramorje) i Podgroblje (Luka) u selu Nevačka predstavljaju jedno od najznačajnijih srednjovjekovnih nasljeđa opštine Han Pijesak. Na ovim lokalitetima nalazi se ukupno 37 stećaka, kamenih nadgrobnih spomenika karakterističnih za prostor Bosne i Hercegovine. Ovi monumentalni kameni biljezi svjedoče o životu, vjerovanjima i umjetničkom izrazu srednjovjekovnog stanovništva. Zbog svoje kulturne i istorijske vrijednosti, nekropole su proglašene nacionalnim spomenikom Bosne i Hercegovine.",
    mapaUrl: "",
    slika: null,
  },

  {
    id: 3,
    naziv: "Srpsko vojničko groblje Vrani Kamen",
    tip: "Spomen-obilježje",
    opis:
      "Na lokalitetu Vrani Kamen nalazi se jedno od najznačajnijih vojničkih grobalja iz Prvog svjetskog rata na području planine Javor. Pretpostavlja se da je ovdje sahranjeno oko 1.000 vojnika Šumadijske divizije Drugog poziva, stradalih tokom borbi 1914. godine. Ovo mjesto predstavlja tihi spomenik hrabrosti, žrtvi i istorijskom nasljeđu ovog kraja. Okruženo netaknutom prirodom i planinskim pejzažima, groblje danas ima poseban memorijalni i duhovni značaj.",
    mapaUrl: "",
    slika: vraniKamen,
  },

  {
    id: 4,
    naziv: "Podzemni vojni objekat G3",
    tip: "Vojno-istorijski lokalitet",
    opis:
      "Podzemni vojni objekat G3, smješten na vrhu Mala Igrišta, jedan je od najintrigantnijih lokaliteta na području Han Pijeska. Izgrađen pedesetih godina prošlog vijeka kao dio tajne vojne infrastrukture bivše Jugoslavije, služio je kao komunikacijsko i komandno čvorište. Sistem podzemnih hodnika i prostorija prostire se na procijenjenih 500 do 700 metara, što ovom objektu daje poseban mistični karakter. Danas predstavlja izuzetno zanimljivu destinaciju za ljubitelje vojne istorije, avanturizma i istraživanja skrivenih lokacija.",
    mapaUrl: "",
    slika: g3,
  },

  {
    id: 5,
    naziv: "Grob Jovana Tandarića",
    tip: "Istorijsko-spomen obilježje",
    opis:
      "Grob Jovana Tandarića, poznatijeg kao Jovo Tandarija, nalazi se u selu Bobica i predstavlja jedinstveno mjesto vezano za hajdučku istoriju Romanije. Jovan Tandarić smatra se posljednjim hajdukom ovog kraja, čovjekom čije je ime ostalo zapisano u lokalnim predanjima i narodnim pričama. Njegov život simbolizuje duh slobode, otpora i legendarnu hajdučku tradiciju po kojoj je Romanija nadaleko poznata. Ovo mjesto danas predstavlja spoj istorije, legende i kolektivnog sjećanja Romanijskog područja.",
    mapaUrl: "",
    slika: null,
  },

  {
    id: 6,
    naziv: "Spomen-kosturnica na Boračkom brdu",
    tip: "Memorijalni kompleks",
    opis:
      "Spomen-kosturnica na Boračkom brdu jedno je od najznačajnijih memorijalnih obilježja na području Han Pijeska. U njoj počivaju posmrtni ostaci 256 palih boraca Narodnooslobodilačkog rata, čime ovo mjesto ima poseban istorijski i simbolički značaj. Monumentalna forma spomenika svjedoči o vremenu kada su memorijalni kompleksi građeni kao mjesta kolektivnog sjećanja i poštovanja prema žrtvama rata. Smještena na uzvišenju, kosturnica pruža miran ambijent koji podstiče na razmišljanje i odavanje počasti.",
    mapaUrl: "",
    slika: null,
  },
];

// ── Hook za animaciju pri scroll-u ───────────────────────────────────────────

function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("ZNA_revealed");
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ── Komponenta jedne znamenitosti ────────────────────────────────────────────

function ZnamenitostSegment({ z, index }) {
  const ref = useScrollReveal();

  return (
    <div
      ref={ref}
      className="ZNA_segment ZNA_reveal"
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      {/* Tip badge */}
      <div className="ZNA_segment__top">
        <span className="ZNA_segment__tip">{z.tip}</span>
      </div>

      {/* Naziv */}
      <h3 className="ZNA_segment__naziv">{z.naziv}</h3>

      {/* Opis */}
      <p className="ZNA_segment__opis">{z.opis}</p>

      {/* Slika + Mapa */}
      <div className="ZNA_segment__media">
        <div className="ZNA_segment__slika-wrap">
          {z.slika
            ? <img src={z.slika} alt={z.naziv} className="ZNA_segment__slika" />
            : <div className="ZNA_segment__slika-placeholder" />
          }
        </div>
        <div className="ZNA_segment__mapa-wrap">
          <iframe
            src={z.mapaUrl}
            title={`Lokacija — ${z.naziv}`}
            className="ZNA_segment__mapa"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}

// ── Glavna stranica ───────────────────────────────────────────────────────────

function Znamenitosti() {
  const filmRef = useScrollReveal();
  const dvoracRef = useScrollReveal();

  return (
    <section className="ZNA_section">

      {/* ── 1. HERO — OTO stil ── */}
      <div className="ZNA_hero">
        <h1>Znamenitosti opštine Han Pijesak</h1>
        <p>Upoznajte historijsko i kulturno nasljeđe koje čuva vjekove prošlosti</p>
      </div>

      {/* ── 2. DVORAC KARAĐORĐEVIĆA — istaknuto ── */}
      <div className="ZNA_dvorac-wrap">
        <div
          ref={dvoracRef}
          className="ZNA_dvorac ZNA_reveal"
        >
          <div className="ZNA_dvorac__slika-wrap">
            <img src={dvorac} className="ZNA_dvorac__slika-placeholder" />
            <span className="ZNA_dvorac__tip-badge">Kraljevska rezidencija</span>
          </div>
          <div className="ZNA_dvorac__info">
            <span className="ZNA_bedz--zeleni">Najznačajniji lokalitet</span>
            <h2 className="ZNA_dvorac__naslov">Dvorac Karađorđevića</h2>
            <p className="ZNA_dvorac__opis">
              Impozantna kraljevska rezidencija izgrađena između 1919. i 1924.
              godine za kralja Aleksandra Karađorđevića. Smještena na visini
              od 1.100 metara, dvorac je bio poznat po izuzetnom kvalitetu
              planinskog vazduha i miru koji je pružao kraljevskoj porodici.
            </p>
            <p className="ZNA_dvorac__opis">
              Nakon decenija zapuštenosti i požara 2005. godine, objekat je
              u procesu obnove koja će mu vratiti nekadašnji sjaj i otvoriti
              ga za posjetioce kao kulturno-turistički centar.
            </p>
            <Link
              to="/znamenitosti/dvorac-karadjordjevica"
              className="ZNA_dvorac__dugme"
            >
              Saznaj više o dvorcu →
            </Link>
          </div>
        </div>
      </div>

      {/* ── 3. OSTALE ZNAMENITOSTI ── */}
      <div className="ZNA_znamenitosti">
        <div className="ZNA_wrap">
          <span className="ZNA_bedz--zeleni ZNA_bedz--centar">Historijski lokaliteti</span>
          <h2 className="ZNA_naslov">Ostale znamenitosti</h2>
          <p className="ZNA_podnaslov">
            Han Pijesak čuva tragove različitih civilizacija i epoha —
            svaki lokalitet nosi svoju jedinstvenu priču
          </p>
          <div className="ZNA_lista">
            {znamenitosti.map((z, i) => (
              <ZnamenitostSegment key={z.id} z={z} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. ZANIMLJIVOST — Partizanska eskadrila ── */}
      <div ref={filmRef} className="ZNA_film ZNA_reveal">
        <div className="ZNA_film__wrap">
          <div className="ZNA_film__lijevo">
            <span className="ZNA_film__bedz">🎬 Zanimljivost</span>
            <h2 className="ZNA_film__naslov">
              Han Pijesak na velikom platnu
            </h2>
            <p className="ZNA_film__tekst">
              Malo ko zna da je Han Pijesak bio kulisa jednog od najpoznatijih
              jugoslovenskih ratnih filmova — <strong>Partizanske eskadrile</strong>
              , snimljene 1979. godine.
            </p>
            <p className="ZNA_film__tekst">
              Film je prikazivao borbu partizanskih pilota tokom Drugog svjetskog
              rata, a netaknuta priroda i tereni oko Han Pijeska pružili su
              savršenu scenografiju za epske akcione scene. Planine, šume i
              otvoreni prostori opštine bili su idealni za snimanje
              vazduhoplovnih sekvenci.
            </p>
            <p className="ZNA_film__tekst">
              Partizanska eskadrila ostaje jedna od najskupljih i
              najambicioznijih jugoslovenskih filmskih produkcija svog doba,
              a Han Pijesak ponosi se činjenicom da je bio dio te historije.
            </p>
            <div className="ZNA_film__detalji">
              <div className="ZNA_film__detalj">
                <span className="ZNA_film__detalj-labela">Film</span>
                <span className="ZNA_film__detalj-vrijednost">Partizanska eskadrila</span>
              </div>
              <div className="ZNA_film__detalj">
                <span className="ZNA_film__detalj-labela">Godina</span>
                <span className="ZNA_film__detalj-vrijednost">1979.</span>
              </div>
              <div className="ZNA_film__detalj">
                <span className="ZNA_film__detalj-labela">Žanr</span>
                <span className="ZNA_film__detalj-vrijednost">Ratni / Akcija</span>
              </div>
              <div className="ZNA_film__detalj">
                <span className="ZNA_film__detalj-labela">Lokacija snimanja</span>
                <span className="ZNA_film__detalj-vrijednost">Han Pijesak i okolina</span>
              </div>
            </div>
          </div>
          <div className="ZNA_film__desno">
            <div className="ZNA_film__klapeta">
              <div className="ZNA_film__klapeta-pruge">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className={`ZNA_film__pruga${i % 2 === 0 ? " ZNA_film__pruga--bijela" : ""}`} />
                ))}
              </div>
              <div className="ZNA_film__klapeta-tijelo">
                <div className="ZNA_film__poster-placeholder">
                  <span className="ZNA_film__poster-tekst">🎬</span>
                  <span className="ZNA_film__poster-naziv">Partizanska<br />eskadrila</span>
                  <span className="ZNA_film__poster-godina">1979</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

export default Znamenitosti;