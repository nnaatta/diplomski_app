import React from "react";
import "./FloraFauna.css";
import ImageSlider from "../../components/ImageSlider";
import pozadinaFlora from "../../assets/floraFauna/flora1.jpg";
import pozadinaFauna from "../../assets/floraFauna/pozadinaFauna.jpg";
import smrca from "../../assets/floraFauna/smrca.jpg";
import jela from "../../assets/floraFauna/jela.jpg";
import bukva from "../../assets/floraFauna/bukva.jpg";
import bijeliBor from "../../assets/floraFauna/bijeliBor.jpg";
import hrast from "../../assets/floraFauna/hrast.jpg";
import srijemus from "../../assets/floraFauna/srijemus.jpg";
import kantarion from "../../assets/floraFauna/kantarion.jpg";
import hajduckaTrava from "../../assets/floraFauna/hajduckaTrava.jpg";
import majcinaDusica from "../../assets/floraFauna/majcinaDusica.jpg";
import malina from "../../assets/floraFauna/malina.jpg";
import kupina from "../../assets/floraFauna/kupina.jpg";
import glog from "../../assets/floraFauna/glog.jpg";
import smreka from "../../assets/floraFauna/smreka.jpg";
import kicica from "../../assets/floraFauna/kicica.jpg";
import tisa from "../../assets/floraFauna/tisa.jpg";
import bozikovina from "../../assets/floraFauna/bozikovina.jpg";
import jarebika from "../../assets/floraFauna/jarebika.jpg";
import panciceva from "../../assets/floraFauna/panciceva.jpg";
import jelenak from "../../assets/floraFauna/jelenak.jpg";
import vrganj from "../../assets/floraFauna/vrganj.jpg";
import lisicarka from "../../assets/floraFauna/lisicarka.jpg";
import bukovaca from "../../assets/floraFauna/bukovace.jpg";
import smrcak from "../../assets/floraFauna/smrcak.jpg";
import redusa from "../../assets/floraFauna/redusa.jpg";
import krasnica from "../../assets/floraFauna/krasnica.jpg";
import srndac from "../../assets/floraFauna/srndac.jpg";
import srna from "../../assets/floraFauna/srna.jpg";
import svinja from "../../assets/floraFauna/svinja.jpg";
import zec from "../../assets/floraFauna/zec.jpg";
import zmijar from "../../assets/floraFauna/zmijar.jpg";
import sova from "../../assets/floraFauna/sova.jpg";
import djetlic from "../../assets/floraFauna/djetlic.jpg";
import pastrmka from "../../assets/floraFauna/pastrmka.jpg";
import rak from "../../assets/floraFauna/rak.jpg";
import vuk from "../../assets/floraFauna/vuk.jpeg";
import orao from "../../assets/floraFauna/orao.jpg";
import vidra from "../../assets/floraFauna/vidra.jpg";
import lasica from "../../assets/floraFauna/lasica.jpg";






// ===== FLORA PODACI =====
const sumskaEkosistemSlike = [
  { slika: smrca, opis: "Smrca" },
  { slika: jela, opis: "jela" },
  { slika: bijeliBor, opis: "bijeli bor" },
  { slika: hrast, opis: "hrast" },
  { slika: bukva, opis: "bukva" },
];

const ljekovitoBiljeSlike = [
  { slika: kantarion, opis: "Kantarion" },
  { slika: srijemus, opis: "srijemus" },
  { slika: hajduckaTrava, opis: "hajduckaTrava" },
  { slika: majcinaDusica, opis: "majcinaDusica" },
  { slika: malina, opis: "malina" },
  { slika: kupina, opis: "kupina" },
  { slika: glog, opis: "glog" },
  { slika: smreka, opis: "smreka" },
  { slika: kicica, opis: "kicica" },
];

const gljiveSlike = [
  { slika: vrganj, opis: "Vrganj — kralj romanijskih šuma" },
  { slika: lisicarka, opis: "Lisičarka — zlatna delikatesa šume" },
  { slika: smrcak, opis: "smrcak" },
  { slika: bukovaca, opis: "bukovaca" },
  { slika: krasnica, opis: "krasnica" },
  { slika: redusa, opis: "redusa" },
];

const zasticeneBiljke = [
  {
    naziv: "Tisa",
    opis: "Dugovječna i rijetka vrsta četinara koja raste sporo i može doživjeti nekoliko stotina godina. Zbog prekomjerne eksploatacije u prošlosti danas je zaštićena, a njeno prisustvo ukazuje na očuvane šumske uslove.",
    slike: [{ slika: tisa, opis: "Tisa — zaštićena vrsta četinara" }],
  },
  {
    naziv: "Božikovina",
    opis: "Zimzelena biljka prepoznatljiva po tamnozelenim listovima i crvenim bobicama. Osim estetske vrijednosti, značajna je kao indikator očuvanih staništa i često se povezuje s tradicijom.",
    slike: [{ slika: bozikovina, opis: "Božikovina sa crvenim bobicama" }],
  },
  {
    naziv: "Jarebika",
    opis: "Drvenasta vrsta poznata po crvenim plodovima bogatim vitaminima. Ima važnu ulogu u ishrani ptica i doprinosi očuvanju biodiverziteta šumskih ekosistema.",
    slike: [{ slika: jarebika, opis: "Jarebika u jesen" }],
  },
  {
    naziv: "Pančićeva omorika",
    opis: "Endemska vrsta Balkana i jedna od najznačajnijih biljnih vrsta u regionu. Odlikuje se uskim, elegantnim rastom i velikom otpornošću, a njeno prisustvo ima posebnu naučnu vrijednost.",
    slike: [{ slika: panciceva, opis: "Pančićeva omorika — balkanski endem" }],
  },
  {
    naziv: "Jelenski jezik",
    opis: "Rijetka vrsta paprati koja raste u sjenovitim i vlažnim šumskim predjelima. Njeno prisustvo ukazuje na stabilne mikroklimatske uslove i visok kvalitet prirodnog staništa.",
    slike: [{ slika: jelenak, opis: "Jelenski jezik u šumi" }],
  },
];

// ===== FAUNA PODACI =====
const divljacSlike = [
  { slika: srndac, opis: "srndac" },
  { slika: srna, opis: "Srna u prirodnom staništu" },
  { slika: svinja, opis: "Divlja svinja na Romaniji" },
  { slika: zec, opis: "zec" },
];

const pticeSlike = [
  { slika: zmijar, opis: "Planinski orao nad Romanijom" },
  { slika: sova, opis: "sova u četinarskoj šumi" },
  { slika: djetlic, opis: "Djetlić na stablu bora" },
];

const ribolovSlike = [
  { slika: pastrmka, opis: "pastrmka" },
  { slika: rak, opis: "rak" },
];

const zasticeneZivotinje = [
  {
    naziv: "Mrki medvjed",
    opis: "Najveći predator i strogo zaštićena vrsta. Prisustvo medvjeda u ovim šumama svjedoči o zdravom i nenarušenom ekosistemu planine.",
    slike: [{ slika: pozadinaFauna, opis: "Mrki medvjed" }],
  },
  {
    naziv: "Sivi vuk",
    opis: "Zaštićena vrsta čije prisustvo svjedoči o zdravom ekosistemu. Vukovi igraju ključnu ulogu u regulaciji populacija divljači.",
    slike: [{ slika: vuk, opis: "Sivi vuk" }],
  },
  {
    naziv: "Planinski orao",
    opis: "Rijetka ptica grabljivica koja se gnijezdi na stijenama Javor planine. Jedna od najimpresivnijih ptica ovog kraja, simbol slobode i snage.",
    slike: [{ slika: orao, opis: "Planinski " }],
  },
  {
    naziv: "Vidra",
    opis: "Zaštićena vrsta koja živi uz rijeke i potoke Han Pijeska. Prisustvo vidre pouzdani je pokazatelj čistoće vodotoka.",
    slike: [{ slika: vidra, opis: "Vidra" }],
  },
  {
    naziv: "Velika lasica - hermelin",
    opis: "Mala, okretna grabljivica poznata po tome što zimi mijenja smeđe krzno u bijelo radi lakšeg prikrivanja u snijegu.",
    slike: [{ slika: lasica, opis: "lasiva" }],
  },
];

function FloraFauna() {
  return (
    <section className="ff">
      {/* ===== SPLIT SCREEN ===== */}
      <div className="ff__split">
        <a
          href="#flora"
          className="ff__split-pola ff__split-pola--flora"
          style={{
            backgroundImage: `url(${pozadinaFlora})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="ff__split-overlay ff__split-overlay--flora" />
          <div className="ff__split-tekst">
            <h2 className="ff__split-naslov">Flora</h2>
            <p className="ff__split-opis">
              Šume, ljekovito bilje i zaštićene biljne vrste planine Javor
            </p>
            <span className="ff__split-dugme">Istraži floru →</span>
          </div>
        </a>
        <a
          href="#fauna"
          className="ff__split-pola ff__split-pola--fauna"
          style={{
            backgroundImage: `url(${pozadinaFauna})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="ff__split-overlay ff__split-overlay--fauna" />
          <div className="ff__split-tekst">
            <h2 className="ff__split-naslov">Fauna</h2>
            <p className="ff__split-opis">
              Divljač, ptice i zaštićene životinjske vrste planine Javor
            </p>
            <span className="ff__split-dugme">Istraži faunu →</span>
          </div>
        </a>
      </div>

      {/* ==================== FLORA ==================== */}
      <div id="flora" className="ff__sekcija">
        <div className="ff__hero ff__hero--flora">
          <div className="ff__hero-overlay" />
          <div className="ff__hero-tekst">
            <span className="ff__bedz ff__bedz--zeleni">Flora</span>
            <h1>Biljni svijet Han Pijeska</h1>
            <p>Bogata i raznovrsna flora Javor planine</p>
          </div>
        </div>

        {/* Šumski ekosistem */}
        <div className="ff__blok">
          <div className="ff__blok-grid">
            <div className="ff__blok-tekst">
              <span className="ff__bedz ff__bedz--zeleni">
                Šumski ekosistem
              </span>
              <h2>Šume Han Pijeska</h2>
              <p>
                Više od 70% teritorije opštine Han Pijesak pokriveno je šumama,
                što ovaj kraj čini jednim od najšumovitijih u Bosni i
                Hercegovini. Dominiraju mješovite četinarsko-lišćarske šume u
                kojima prevladavaju smrča, jela, bijeli bor, bukva i hrast.
              </p>
              <p>
                Četinarske šume igraju ključnu ulogu u kvalitetu vazduha —
                oslobađaju fitoncide, prirodne antibiotike koji pozitivno
                djeluju na zdravlje čovjeka i doprinose statusu Han Pijeska kao
                vazdušne banje.
              </p>
            </div>
            <ImageSlider
              slajdovi={sumskaEkosistemSlike}
              visina="360px"
              interval={5000}
            />
          </div>
        </div>

        {/* Ljekovito bilje */}
        <div className="ff__blok ff__blok--alt">
          <div className="ff__blok-grid ff__blok-grid--obrnuto">
            <ImageSlider
              slajdovi={ljekovitoBiljeSlike}
              visina="360px"
              interval={5000}
            />
            <div className="ff__blok-tekst">
              <span className="ff__bedz ff__bedz--zeleni">Ljekovito bilje</span>
              <h2>Ljekovito i samoniklo bilje</h2>
              <p>
                Planinska flora Han Pijeska bogata je ljekovitim i samoraslim
                biljkama koje su generacijama korišćene u narodnoj medicini.
                Čist vazduh, planinska klima i netaknuto tlo stvaraju idealne
                uslove za rast bilja izuzetnih ljekovitih svojstava.
              </p>
              <p>
                Najpoznatije ljekovite biljke ovog kraja su kantarion, divlji
                luk - srijemuš, hajdučka trava, majčina dušica, divlja malina,
                divlja kupina, glog, smreka, kičica.
              </p>
            </div>
          </div>
        </div>
        {/* Gljive */}
        <div className="ff__blok ff__blok--alt">
          <div className="ff__blok-grid">
            <div className="ff__blok-tekst">
              <span className="ff__bedz ff__bedz--zeleni">
                Gljive i lišajevi
              </span>
              <h2>Gljive i lišajevi </h2>
              <p>
                Šume Javor planine su pravi raj za ljubitelje gljiva.
                Zahvaljujući vlažnoj planinskoj klimi i bogatom šumskom tlu,
                ovdje rastu mnoge jestive vrste — vrganj, lisičarka, smrčak,
                bukovača, jestiva krasnica, reduša su neke od poznatih delicija.
              </p>
              <p>
                Berba gljiva popularna je aktivnost počev od proljeća pa sve do
                rane jeseni kada su šume najplodnije.
              </p>
            </div>
            <ImageSlider
              slajdovi={gljiveSlike}
              visina="360px"
              interval={5000}
            />
          </div>
        </div>
      </div>

      {/* Rijetke i zaštićene biljne vrste */}
      <div className="ff__blok">
        <div className="ff__blok-naslov-wrap">
          <span className="ff__bedz ff__bedz--zeleni">Zaštićene vrste</span>
          <h2>Rijetke i zaštićene biljne vrste</h2>
          <p className="ff__blok-podnaslov">
            Han Pijesak je stanište nekoliko rijetkih i zakonski zaštićenih
            biljnih vrsta
          </p>
        </div>
        <div className="ff__vrste-grid">
          {zasticeneBiljke.map((b) => (
            <div key={b.naziv} className="ff__vrsta ff__vrsta--zelena">
              <div className="ff__vrsta-slider">
                <ImageSlider slajdovi={b.slike} visina="200px" interval={0} />
              </div>
              <div className="ff__vrsta-tekst">
                <h3 className="ff__vrsta-naziv">{b.naziv}</h3>
                <p className="ff__vrsta-opis">{b.opis}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ==================== FAUNA ==================== */}
      <div id="fauna" className="ff__sekcija">
        <div className="ff__hero ff__hero--fauna">
          <div className="ff__hero-overlay" />
          <div className="ff__hero-tekst">
            <span className="ff__bedz ff__bedz--smedi">Fauna</span>
            <h1>Životinjski svijet Han Pijeska</h1>
            <p>Bogata fauna romanijskih šuma i planina</p>
          </div>
        </div>

        {/* Divljač */}
        <div className="ff__blok">
          <div className="ff__blok-grid">
            <div className="ff__blok-tekst">
              <span className="ff__bedz ff__bedz--smedi">Divljač</span>
              <h2>Krupna i sitna divljač</h2>
              <p>
                Šume Han Pijeska dom su bogatoj populaciji krupne i sitne
                divljači. Srndać, srna, divlja svinja i zec samo su neke od
                vrsta koje nastanjuju romanijsko planinsko područje. Prisustvo
                ovako bogate faune svjedoči o zdravom i nenarušenom ekosistemu.
              </p>
              <p>
                Lov je regulisan propisima, a Lovačko udruženje "Studena Gora"
                brine o zaštiti i upravljanju populacijama divljači na području
                opštine Han Pijesak.
              </p>
            </div>
            <ImageSlider
              slajdovi={divljacSlike}
              visina="360px"
              interval={5000}
            />
          </div>
        </div>

        {/* Ptice */}
        <div className="ff__blok ff__blok--alt">
          <div className="ff__blok-grid ff__blok-grid--obrnuto">
            <ImageSlider slajdovi={pticeSlike} visina="360px" interval={5000} />
            <div className="ff__blok-tekst">
              <span className="ff__bedz ff__bedz--smedi">Ptice</span>
              <h2>Planinske ptice</h2>
              <p>
                Područje planine Javor stanište je brojnih ptica, od kojih su
                mnoge rijetke i zaštićene. Šume i planinski vrhovi idealno su
                gnijezdilište za planinske oraše, šumske sove, djetliće i ptice
                grabljivice.
              </p>
              <p>
                Posmatranje ptica postaje sve popularnija aktivnost — tiha šuma
                i čist vazduh pružaju savršene uslove za birdwatching.
              </p>
            </div>
          </div>
        </div>

        {/* Ribolov */}
        <div className="ff__blok">
          <div className="ff__blok-grid">
            <div className="ff__blok-tekst">
              <span className="ff__bedz ff__bedz--smedi">Ribolov</span>
              <h2>Rijeke i planinski potoci</h2>
              <p>
                Vode sa ovog područja pripadaju slivovima rijeke Bosne i Drine.
                Rječice sliva rijeke Bosne su pogodne za mušičarenje, dok su
                rječice drinskog sliva pogodnije za varaličarenje. To su brze,
                kristalno čiste planinske rječice i potoci. Ove vode, koje su
                bogate kiseonikom i hranom, prirodno su stanište potočne
                pastrmke i njom su isključivo naseljene. Ima dosta i potočnog
                raka, koji dijeli životni prostor sa pastrmkom.
              </p>
              <p>
                Ribolovci iz cijelog regiona dolaze zbog izvrsnih ribolovnih
                uslova i mira koji pruža planinska priroda.
              </p>
            </div>
            <ImageSlider
              slajdovi={ribolovSlike}
              visina="360px"
              interval={5000}
            />
          </div>
        </div>

        {/* Zaštićene životinjske vrste */}
        <div className="ff__blok ff__blok--alt">
          <div className="ff__blok-naslov-wrap">
            <span className="ff__bedz ff__bedz--smedi">Zaštićene vrste</span>
            <h2>Zaštićene životinjske vrste</h2>
            <p className="ff__blok-podnaslov">
              Han Pijesak je stanište nekoliko strogo zaštićenih životinjskih
              vrsta
            </p>
          </div>
          <div className="ff__vrste-grid">
            {zasticeneZivotinje.map((z) => (
              <div key={z.naziv} className="ff__vrsta ff__vrsta--smeda">
                <div className="ff__vrsta-slider">
                  <ImageSlider slajdovi={z.slike} visina="200px" interval={0} />
                </div>
                <div className="ff__vrsta-tekst">
                  <h3 className="ff__vrsta-naziv">{z.naziv}</h3>
                  <p className="ff__vrsta-opis">{z.opis}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FloraFauna;
