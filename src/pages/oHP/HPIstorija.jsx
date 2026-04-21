import React, { useState, useEffect, useRef } from "react";
import "./HPIstorija.css";
import ausSlika from '../../assets/hpNekada.jpg'
import osmSlika from '../../assets/osmSlika.jpg'
import vraniKamen from '../../assets/vraniKamen.jpg'
import vila from '../../assets/dvoracKaradjordjevica.jpeg'
import stariBrod from '../../assets/stari_brod.jpg'
import velikiZep from '../../assets/velikiZep.jpg'
import hp90 from '../../assets/hp90.jpg'







const periodi = [
  {
    id: 1,
    naslov: "Osmansko doba",
    period: "do 1878.",
    bedzTip: "osmanski",
    slika: osmSlika,
    tekst:"Područje Han Pijeska razvijalo se još u vrijeme Osmanskog carstva kao važna tačka na starom karavanskom putu koji je vodio od Sarajeva preko Romanije. Na svakih desetak kilometara nalazili su se hanovi – svratišta za odmor putnika, trgovaca i vojnih karavana. Jedan od tih hanova bio je i Han Pijesak, oko kojeg se kasnije formiralo naselje.Putopisac Evlija Čelebija 1664. godine pominje više hanova na ovom prostoru, poput Han Pijeska, Han Pogleda i drugih, koji su kasnije prerasli u značajnija naselja.Zahvaljujući svom položaju na raskrsnici puteva koji su vodili ka Srebrenici, Zvorniku, Vlasenici i Sarajevu, Han Pijesak je imao veliki strateški i saobraćajni značaj. Posebno se isticao Han Pogled, koji je zbog svog vidikovca i preglednosti terena imao važnu ulogu u vrijeme nesigurnosti i napada na putnike.",
    zanimljivost:
      "Prema narodnom predanju, ime Han Pijesak potiče od pritužbi majstora koji su gradili han, jer je pijesak bio loš za gradnju.",
  },
  {
    id: 2,
    naslov: "Austrougarski period",
    period: "1878. — 1918.",
    bedzTip: "austrougarski",
    slika: ausSlika,
    tekst:"Veći razvoj počinje dolaskom Austro-Ugarske, kada se grade putevi i željeznička pruga prema Zavidovićima. To dovodi do jačanja značaja ovog mjesta, pa se krajem 19. vijeka (prvi put pomenuto 1895. godine) formira naselje radnika, uglavnom drvosječa. Do Prvog svjetskog rata ovdje gotovo da nije bilo razvijenog naselja, osim hana i nekoliko šumskih baraka.",
    zanimljivost: "",
  },
  {
    id: 3,
    naslov: "Prvi svjetski rat",
    period: "1914. — 1918.",
    bedzTip: "rat",
    slika: vraniKamen,
    tekst:"Tokom Prvog svjetskog rata Han Pijesak i okolina bili su poprište značajnih vojnih operacija u okviru bitke na Drini 1914. godine. Srpska vojska, posebno Užička vojska pod komandom generala Miloša Božanovića, napredovala je preko ovog područja prema Vlasenici. Vođene su teške borbe sa austrougarskim snagama, naročito na područjima kao što su Igrišta, Vran kamen i druga uzvišenja. U tim sukobima poginulo je oko 1.500 srpskih vojnika. Nakon početnih uspjeha, srpska vojska se usljed jakih protivnapada i nepovoljnih uslova povukla preko Drine.",
    zanimljivost: "Na području planine Javor postoje tri groblja srpskih vojnika iz Prvog svjetskog rata, Vrani kamen, Veliko Igrište i Ružina Voda, na kojima je ukupno sahranjeno više od 1300 vojnika. ",
  },
  {
    id: 4,
    naslov: "Period Kraljevine Jugoslavije",
    period: "1918. — 1941.",
    bedzTip: "mir",
    slika: vila,
    tekst:"Period Kraljevina Jugoslavija predstavlja vrijeme najvećeg uspona i afirmacije Han Pijesak kao značajnog planinskog i turističkog mjesta. Zahvaljujući izuzetno povoljnoj klimi, velikoj nadmorskoj visini i čistom vazduhu bogatog ozonom, Han Pijesak je u ovom periodu prepoznat kao idealno mjesto za odmor, oporavak i boravak u prirodi.Poseban značaj ovom mjestu daje dolazak i interesovanje kraljevske porodice Karađorđević, koja je u Han Pijesku izgradila svoju ljetnu rezidenciju, poznatu kao Vila Karađorđevića. Ova vila nije bila samo mjesto odmora, već i simbol prestiža i važnosti koje je Han Pijesak imao u tom vremenu. Boravak članova kraljevske porodice doprinio je popularizaciji ovog kraja, pa Han Pijesak postaje okupljalište društvene i političke elite tadašnje države.",
    zanimljivost:
      "26. avgusta 1936. godine u Han Pijesku je održana značajna sjednica ekonomsko-finansijskog komiteta ministara u vezi sa rješavanjem pitanja zemljoradničkih dugova.",
  },
  {
    id: "5",
    naslov: "Drugi svjetski rat",
    period: "1941. — 1945.",
    bedzTip: "rat",
    slika: stariBrod,
    tekst: "Period Drugog svjetskog rata donio je nagli prekid razvoja Han Pijesak i potpuno promijenio njegovu dotadašnju ulogu. Nakon kapitulacije Kraljevina Jugoslavija 1941. godine, područje je dospjelo pod okupaciju, što je dovelo do gašenja institucija i prekida turističkog i društvenog života. Mjesto koje je ranije bilo elitno odmaralište postaje dio ratne svakodnevice, uz stagnaciju infrastrukture i teške uslove života. Tokom 1942. Nezavisna Država Hrvatska sprovodila je operacije na području istočne Bosne pod komandom Jure Francetića. Tokom tih operacija mnoge porodice iz Han Pijeska i okolnih sela bile su primorane na bijeg prema Drini, a veliki broj civila stradao je na tom putu, posebno na području Starog Broda. Ovi događaji ostavili su trajne posljedice na stanovništvo i razvoj ovog kraja.",
    zanimljivost: "Prema dostupnim istorijskim podacima,tokom operacija pod komandom Jure Francetića, ubijeno je više od 6.000 nenaoružanih civila sa šireg područja istočne Bosne, uključujući i stanovništvo iz Han Pijeska i okolnih sela.",
  },
  {
    id: 6,
    naslov: "Socijalistička Jugoslavija",
    period: "1945. — 1991.",
    bedzTip: "soc",
    slika: velikiZep,
    tekst:"Period Socijalističke Federativne Republike Jugoslavije predstavlja fazu obnove i stabilizacije u razvoju Han Pijesak. Okosnicu privrednog razvoja činilo je šumarstvo, zahvaljujući bogatim šumskim kompleksima koji okružuju ovo područje. Organizovano gazdovanje šumama dovelo je do zapošljavanja lokalnog stanovništva i formiranja radničkih zajednica, a Han Pijesak postaje prepoznat kao mjesto povezano sa drvnom industrijom.U ovom periodu posebnu ulogu imala je Jugoslovenska narodna armija, koja je u blizini Han Pijeska izgradila podzemni vojni kompleks „Veliki Žep“. Ovaj objekat bio je planiran kao strateško komandno mjesto u slučaju globalnog sukoba, što svjedoči o značaju koji je ovom području pridavan u vojnom smislu. Prisustvo vojske dodatno je uticalo na razvoj infrastrukture i značaj Han Pijeska u tadašnjem sistemu.",
    zanimljivost:
      "U Han Pijesku je tokom SFRJ postojala kasarna u kojoj su vojnici iz cijele bivše Jugoslavije služili vojni rok.",
  },
  {
    id: 7,
    naslov: "Period 1990-ih",
    period: "1991. — 2000.",
    bedzTip: "devedesete",
    slika: hp90,
    tekst:"Nakon Raspad Jugoslavije i ratnih dešavanja 1990-ih nastupa jedna od najtežih faza u novijoj istoriji Han Pijesak. Sa početkom rata u Bosni i Hercegovini 1992. godine, ovo područje dobija izražen strateški značaj, prije svega zbog svoje geografske pozicije i već postojeće vojne infrastrukture.U tom periodu, podzemni vojni kompleks „Veliki Žep“, izgrađen još u vrijeme Socijalistička Federativna Republika Jugoslavija, postaje sjedište Glavnog štaba Vojske Republike Srpske. Time Han Pijesak postaje jedno od važnih vojno-komandnih mjesta, što dodatno utiče na njegovu ulogu tokom ratnih godina.Ratna dešavanja ostavila su značajne posljedice na lokalno stanovništvo i privredu. Dolazi do smanjenja broja stanovnika, migracija i opšte ekonomske stagnacije. Mnogi privredni tokovi, posebno oni vezani za šumarstvo i lokalnu proizvodnju, bili su otežani ili potpuno prekinuti. Infrastruktura je djelimično zapuštena, a razvoj koji je građen u prethodnim decenijama zaustavljen.",
    zanimljivost: "",
  },
];

function HPIstorija() {
  const [aktivniId, setAktivniId] = useState("osmanski");
  const periodiRef = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAktivniId(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    Object.values(periodiRef.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const skrolujDo = (id) => {
    const el = periodiRef.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="hpi">

      {/* ===== HERO ===== */}
      <div className="hpi__hero">
        <p className="hpi__hero-natpis">O Han Pijesku</p>
        <h1 className="hpi__hero-naslov">Han Pijesak kroz istoriju</h1>
        <p className="hpi__hero-podnaslov">
          Od osmanskog karavanskog puta do savremenog doba
        </p>
      </div>

      {/* ===== GLAVNI LAYOUT ===== */}
      <div className="hpi__layout">

        {/* ===== SIDEBAR ===== */}
        <nav className="hpi__sidebar">
          <p className="hpi__sidebar-naslov">Historijski periodi</p>
          <ul className="hpi__sidebar-lista">
            {periodi.map((p) => (
              <li key={p.id}>
                <button
                  className={`hpi__sidebar-el ${aktivniId === p.id ? "hpi__sidebar-el--aktivan" : ""}`}
                  onClick={() => skrolujDo(p.id)}
                >
                  <span className={`hpi__sidebar-tacka hpi__sidebar-tacka--${p.bedzTip}`} />
                  <span className="hpi__sidebar-el-tekst">
                    <span className="hpi__sidebar-el-naslov">{p.naslov}</span>
                    <span className="hpi__sidebar-el-godina">{p.period}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* ===== PERIODI ===== */}
        <main className="hpi__periodi">
          {periodi.map((p) => (
            <div
              key={p.id}
              id={p.id}
              className="hpi__period"
              ref={(el) => (periodiRef.current[p.id] = el)}
            >
              {/* Header perioda */}
              <div className="hpi__period-header">
                
                <div className="hpi__period-meta">
                  <h2 className={`hpi__period-naslov--${p.bedzTip}`}>{p.naslov}</h2>
                  <p className="hpi__period-godine">{p.period}</p>
                </div>
              </div>

              {/* Tekst i slika */}
              <div className="hpi__period-sadrzaj">
                <p className="hpi__period-tekst">{p.tekst}</p>
                <img src={p.slika} alt={p.naslov} className="hpi__period-foto"/>
                  
              </div>

              {/* Zanimljivost — prikazuje se samo ako postoji */}
              {p.zanimljivost && (
                <div className="hpi__zanimljivost">
                
                  <p className="hpi__zanimljivost-tekst">{p.zanimljivost}</p>
                </div>
              )}
            </div>
          ))}
        </main>

      </div>
    </section>
  );
}

export default HPIstorija;