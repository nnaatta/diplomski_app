import React from "react";
import "./DetaljiBlog.css";
import { Link, useParams } from "react-router-dom";

// ── Mock sadržaj blog postova ────────────────────────────────────────────────

const blogPostovi = {
  "vodopad-skakavac-biseri-romanije": {
    id: 1,
    naslov: "Vodopad Skakavac — biser Romanije koji morate posjetiti",
    kategorija: "Priroda",
    autor: "TO Han Pijesak",
    datum: "15. april 2025.",
    vrijemeČitanja: "4 min",
    heroGradijent: "linear-gradient(135deg, #a3b18a 0%, #588157 50%, #344e41 100%)",
    uvod: "Skakavac je jedan od onih mjesta koja ostavljaju bez daha — bukvalno i metaforički. Smješten duboko u šumama Žeravice, ovaj vodopad je jedna od najljepših prirodnih atrakcija Han Pijeska i cijele Romanije.",
    sadrzaj: [
      {
        tip: "podnaslov",
        tekst: "Kako doći do vodopada?",
      },
      {
        tip: "paragraf",
        tekst: "Put do Skakavca počinje u centru Han Pijeska. Od tamo, označena staza vodi kroz borovu šumu oko 4 kilometra do same lokacije vodopada. Staza je umjereno zahtjevna — preporučujemo planinarsku obuću i dovoljan obilazak vode, posebno tokom ljetnjih mjeseci.",
      },
      {
        tip: "paragraf",
        tekst: "Najljepše iskustvo je u proljeće, kada otopljeni snijeg s Romanije puni vodopad vodom i stvara moćan pad koji se čuje i izdaleka. Ljeto nudi mirniji tok, ali sjenu gustih krošnji i osvježenje hladne planinske vode.",
      },
      {
        tip: "podnaslov",
        tekst: "Travertinska struktura — geological raritet",
      },
      {
        tip: "paragraf",
        tekst: "Ono što Skakavac čini jedinstvenim nije samo ljepota vodopada, već njegova geološka struktura. Voda koja teče kroz vapnenačke stijene taložila je mineral kroz vjekove i formirala takozvanu travertinsku terasu — rijetku pojavu koja se u ovim krajevima rijetko susreće.",
      },
      {
        tip: "paragraf",
        tekst: "Travertin daje vodopadu karakteristični bijelo-sivi izgled i čini ga fotogeničnim u svakom godišnjem dobu. Geolozi i prirodnjaci posebno cijene ovu lokaciju zbog njene autentičnosti i očuvanosti.",
      },
      {
        tip: "podnaslov",
        tekst: "Savjeti za posjetioce",
      },
      {
        tip: "lista",
        stavke: [
          "Nosite udobnu planinarsku obuću — teren je mjestimično klizav",
          "Donesite dovoljno vode i laganu hranu za piknik",
          "Posjetite u jutarnjim satima za najljepše fotografije",
          "Proljeće (april–maj) je idealno vrijeme za posjet",
          "Poštujte prirodu — ne ostavljajte otpad na stazi",
        ],
      },
    ],
    zakljucak: "Vodopad Skakavac nije samo turistička atrakcija — to je svjedočanstvo ljepote netaknute prirode Han Pijeska. Svakako ga uvrstite na svoju listu za posjet.",
    tagoviKat: { bg: "#eaf3de", tekst: "#3a5a40" },
  },
  "zimovanje-na-romaniji": {
    id: 2,
    naslov: "Zimovanje na Romaniji — sve što trebate znati",
    kategorija: "Turizam",
    autor: "TO Han Pijesak",
    datum: "3. mart 2025.",
    vrijemeČitanja: "5 min",
    heroGradijent: "linear-gradient(135deg, #c8d8e0 0%, #6a9ab0 50%, #1a4a6a 100%)",
    uvod: "Romanija zimi prerasta u pravi planinski raj. Bijeli pokrivač snijega, ski staze i topla planinska kuhinja čine zimovanje na ovom prostoru nezaboravnim iskustvom.",
    sadrzaj: [
      {
        tip: "podnaslov",
        tekst: "Ski centar Javor",
      },
      {
        tip: "paragraf",
        tekst: "Srce zimskog turizma Han Pijeska je Ski centar Javor na obroncima Romanije. Sa nadmorskom visinom do 1.400 metara, centar nudi odlične uslove za skijanje od decembra do marta.",
      },
      {
        tip: "paragraf",
        tekst: "Dvije ski staze različite zahtjevnosti čine ga pogodnim i za početnike i za iskusne skijaše. Ski lift transport i škola skijanja dostupni su na licu mjesta.",
      },
      {
        tip: "podnaslov",
        tekst: "Smještaj i gastronomija",
      },
      {
        tip: "paragraf",
        tekst: "Han Pijesak nudi raznovrstan smještaj — od hotela i motela do privatnih apartmana i seoskih domaćinstava. Preporučujemo rezervaciju unaprijed tokom vikendima i praznicima.",
      },
      {
        tip: "lista",
        stavke: [
          "Topliji smještaj — planinske vikendice sa kaminom",
          "Lokalni restorani sa tradicioanlnim jelima",
          "Janjetina, kajmak i domaći sir — specijaliteti kraja",
          "Organizovani izleti za grupe na zahtjev",
        ],
      },
    ],
    zakljucak: "Zima u Han Pijesku nudi savršenu kombinaciju sporta, prirode i odmora. Planirajte posjetu i doživite planinu u njenom zimskom ruhu.",
    tagoviKat: { bg: "#e8f0fa", tekst: "#1a4a8a" },
  },
  "dvorac-karadjordjevica-historija": {
    id: 3,
    naslov: "Dvorac Karađorđevića — sto godina historije",
    kategorija: "Historija",
    autor: "TO Han Pijesak",
    datum: "18. februar 2025.",
    vrijemeČitanja: "6 min",
    heroGradijent: "linear-gradient(135deg, #c8b898 0%, #8a7050 50%, #4e3420 100%)",
    uvod: "Svaka cigla ovog dvorca nosi priču. Izgrađen za kralja, preživio ratove, promijenio namjene i pretrpio vatru — Dvorac Karađorđevića danas čeka svoju obnovu.",
    sadrzaj: [
      {
        tip: "podnaslov",
        tekst: "Izgradnja i zlatno doba (1919–1941)",
      },
      {
        tip: "paragraf",
        tekst: "Dvorac je izgrađen između 1919. i 1924. godine kao ljetnja rezidencija kralja Aleksandra Karađorđevića. Arhitektura kombinuje austrougarski akademizam sa elementima srpskog romantizma.",
      },
      {
        tip: "podnaslov",
        tekst: "Ratna oštećenja i poslijeratno doba",
      },
      {
        tip: "paragraf",
        tekst: "Drugi svjetski rat ostavio je traga na dvorcu. Nakon rata, objekat je promijenio namjenu i koristio ga je Josip Broz Tito kao jednu od svojih rezidencija za odmor.",
      },
      {
        tip: "podnaslov",
        tekst: "Požar 2005. i put ka obnovi",
      },
      {
        tip: "paragraf",
        tekst: "Katastrofalni požar 2005. godine uništio je krov i unutrašnjost. Od tada traju napori za obnovu ovog neprocjenjivog kulturno-historijskog objekta.",
      },
    ],
    zakljucak: "Dvorac čeka svoju renesansu. Kada obnova bude završena, postaće kulturno i turistički centar cijele regije.",
    tagoviKat: { bg: "#f5ede0", tekst: "#7a4010" },
  },
  "planinarenje-za-pocetnike": {
    id: 4,
    naslov: "Planinarenje za početnike — vodič za Han Pijesak",
    kategorija: "Aktivan odmor",
    autor: "TO Han Pijesak",
    datum: "5. januar 2025.",
    vrijemeČitanja: "7 min",
    heroGradijent: "linear-gradient(135deg, #b8d4b0 0%, #5a9050 50%, #2a5020 100%)",
    uvod: "Nikad nije kasno da krenete na put — bukvalno. Han Pijesak nudi staze za sve nivoe, od laganih šetnji do zahtjevnih uspon. Ovaj vodič je napravljen za one koji tek počinju.",
    sadrzaj: [
      {
        tip: "podnaslov",
        tekst: "Gdje početi?",
      },
      {
        tip: "paragraf",
        tekst: "Za početnike preporučujemo stazu uz rijeku Stipulu — ravna, dobro označena, duga oko 4 km. Idealna je za prvu planinarsku avanturu i ne zahtijeva posebnu opremu.",
      },
      {
        tip: "podnaslov",
        tekst: "Šta ponijeti?",
      },
      {
        tip: "lista",
        stavke: [
          "Udobna planinska obuća sa neklizajućim đonom",
          "Lagani ruksak (5–10 litara za jednodnevni izlet)",
          "Boca vode — minimum 1,5 l po osobi",
          "Lagana grickalica ili sendvič",
          "Zaštita od sunca i insekta",
          "Punjeni mobilni telefon za navigaciju",
        ],
      },
      {
        tip: "podnaslov",
        tekst: "Zlatna pravila planinarenja",
      },
      {
        tip: "paragraf",
        tekst: "Nikad ne idite sami bez obavještavanja nekoga o planiranoj ruti. Pratite vremensku prognozu i nemojte kretati na stazu ako se najavljuje nevrijeme. Poštujte prirodu — sve što donesete, odnesite i nazad.",
      },
    ],
    zakljucak: "Planinarenje je sport koji mijenja perspektivu. Han Pijesak je idealno mjesto da počnete ovo putovanje.",
    tagoviKat: { bg: "#eaf3de", tekst: "#3a5a40" },
  },
  "gastronomija-han-pijesak": {
    id: 5,
    naslov: "Ukusi Han Pijeska — tradicionalna kuhinja planine",
    kategorija: "Gastronomija",
    autor: "TO Han Pijesak",
    datum: "20. decembar 2024.",
    vrijemeČitanja: "3 min",
    heroGradijent: "linear-gradient(135deg, #d8c8a0 0%, #a89060 50%, #5a4820 100%)",
    uvod: "Jelo je kultura. U Han Pijesku, svaki zalogaj priča priču o planinskom životu, stočarstvu i tradiciji koja se prenosi s koljena na koljeno.",
    sadrzaj: [
      {
        tip: "podnaslov",
        tekst: "Specijaliteti koje morate probati",
      },
      {
        tip: "lista",
        stavke: [
          "Janjetina s ražnja — pečena na otvorenoj vatri, mekana i sočna",
          "Kajmak — svježi ili odležani, sa domaćim hljebom",
          "Bosanski lonac — sporo kuvano meso i povrće",
          "Pita sa sirom — tanka kora, domaći sir",
          "Domaća rakija — šljivovica ili travarica",
        ],
      },
      {
        tip: "podnaslov",
        tekst: "Gdje jesti?",
      },
      {
        tip: "paragraf",
        tekst: "Lokalni restorani i seoska domaćinstva nude autentičnu kuhinju po pristupačnim cijenama. Preporučujemo posjetu pijacom u subotu jutro gdje možete kupiti domaće proizvode direktno od proizvođača.",
      },
    ],
    zakljucak: "Gastronomija Han Pijeska je nerazdvojni dio iskustva ovog kraja. Ne odlazite a da niste probali barem jednu janjetinu s ražnja.",
    tagoviKat: { bg: "#fdf0e0", tekst: "#8a5a00" },
  },
};

function DetaljiBlog() {
  const { slug } = useParams();
  const post = blogPostovi[slug];

  if (!post) {
    return (
      <div className="DBL_notfound">
        <h2>Post nije pronađen</h2>
        <Link to="/blog" className="DBL_nazad-btn">← Nazad na blog</Link>
      </div>
    );
  }

  const boja = post.tagoviKat;

  return (
    <section className="DBL_section">

      {/* ── HERO ── */}
      <div className="DBL_hero">
        <div className="DBL_hero__slika-placeholder" style={{ background: post.heroGradijent }} />
        <div className="DBL_hero__overlay" />
        <div className="DBL_hero__sadrzaj">
          <span className="DBL_kat" style={{ background: boja.bg, color: boja.tekst }}>
            {post.kategorija}
          </span>
          <h1 className="DBL_hero__naslov">{post.naslov}</h1>
          <div className="DBL_hero__meta">
            <span>✍️ {post.autor}</span>
            <span>📅 {post.datum}</span>
            <span>⏱️ {post.vrijemeČitanja} čitanja</span>
          </div>
        </div>
        <Link to="/blog" className="DBL_hero__nazad">
          ← Blog
        </Link>
      </div>

      {/* ── TEKST ── */}
      <div className="DBL_tijelo">
        <div className="DBL_clanak">

          {/* Uvod */}
          <p className="DBL_uvod">{post.uvod}</p>

          {/* Sadržaj */}
          {post.sadrzaj.map((blok, i) => {
            if (blok.tip === "podnaslov") {
              return <h2 key={i} className="DBL_podnaslov">{blok.tekst}</h2>;
            }
            if (blok.tip === "paragraf") {
              return <p key={i} className="DBL_paragraf">{blok.tekst}</p>;
            }
            if (blok.tip === "lista") {
              return (
                <ul key={i} className="DBL_lista">
                  {blok.stavke.map((s, j) => (
                    <li key={j} className="DBL_lista__stavka">
                      <span className="DBL_lista__tacka" />
                      {s}
                    </li>
                  ))}
                </ul>
              );
            }
            return null;
          })}

          {/* Zaključak */}
          <div className="DBL_zakljucak">
            <p>{post.zakljucak}</p>
          </div>

          {/* Navigacija */}
          <div className="DBL_nav">
            <Link to="/blog" className="DBL_nav__btn">
              ← Nazad na blog
            </Link>
          </div>

        </div>
      </div>

    </section>
  );
}

export default DetaljiBlog;