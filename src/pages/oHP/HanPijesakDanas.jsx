import React from "react";
import Naglasak from "../../components/Naglasak";
import TurizamKartica from "../../components/TurizamKartica";
import "./HanPijesakDanas.css";
import oHP1 from '../../assets/floraFauna/pozadina2.jpg'
import oHP2 from '../../assets/floraFauna/pozadina1.jpg'
import geo from '../../assets/ZdravstveniTurizam/slika5.jpg'
import klima from '../../assets/ZdravstveniTurizam/slika10.jpg'
import voda1 from '../../assets/Vodopad-Skakavac.jpg'
import voda2 from '../../assets/rijeke.jpg'

import { FaSkiing, FaMountain, FaHome } from "react-icons/fa";
import { GiFishing } from "react-icons/gi";
import { IoBicycleOutline } from "react-icons/io5";
import { RiMentalHealthFill } from "react-icons/ri";


const turizamPodaci = [
  {
    ikona: <FaSkiing/>,
    naziv: "Zimski turizam",
    opis: "Skijanje i zimski sportovi na planini Javor",
  },
  {
    ikona: <FaMountain/>,
    naziv: "Planinski turizam",
    opis: "Planinarske staze, vidikovci i netaknuta priroda za ljubitelje planinarenja.",
  },
  {
    ikona: <GiFishing/>,
    naziv: "Lov i ribolov",
    opis: "Bogata lovna područja i ribolovne vode u okolini opštine.",
  },
  {
    ikona: <IoBicycleOutline/>,
    naziv: "Biciklizam",
    opis: "Bicilističke staze kroz netaknutu prirodu za ljubitelje brdskog biciklizma",
  },
  {
    ikona: <RiMentalHealthFill/>,
    naziv: "Zdravstveni turizam",
    opis: "Vazdušna banja i klimatski turizam zahvaljujući izuzetnom kvalitetu zraka.",
  },
  {
    ikona: <FaHome/>,
    naziv: "Boravišni turizam",
    opis: "Odmor u prirodi, brvnare i smještajni objekti u mirnom okruženju.",
  },
];

function HanPijesakDanas() {
  return (
    <section className="hpd">
      {/* ===== HERO ===== */}
      <div className="hpd__hero">
        <p className="hpd__hero-natpis">O Han Pijesku</p>
        <h1 className="hpd__hero-naslov">Han Pijesak danas</h1>
      </div>

      {/* ===== O HAN PIJESKU ===== */}
      <div className="hpd__sekcija">
        <div className="hpd__sekcija-header">
          <span className="hpd__bedz hpd__bedz--zeleni">O Han Pijesku</span>
        </div>

        <div className="hpd__blok">
          <div className="hpd__blok-tekst">
            <h2 className="hpd__blok-naslov">O Han Pijesku</h2>
            <p className="hpd__blok-opis">
              Han Pijesak je gradsko naselje i sjedište istoimene opštine koja
              se nalazi u istočnom dijelu Republike Srpske, Bosne i Hercegovine.
              Smješten je na razvođu rijeka Stupčanice i Žepe, na nadmorskoj
              visini od 1.100 metara, što ga čini naseljem sa najvećom
              nadmorskom visinom u Republici Srpskoj. Na području naselja živi
              2.018 stanovnika, dok ukupna populacija opštine iznosi 3.530
              stanovnika. Opština se prostire na površini od oko 330–335,8 km² i
              ubraja se u red manjih opština, sa oko 25 naseljenih mjesta koja
              su uglavnom mala i razuđena između planinskih predjela.
            </p>
            <div className="hpd__naglasci">
              <Naglasak broj="1.100 m" tekst="nadmorska visina" />
              <Naglasak broj="3.530" tekst="stanovnika" />
              <Naglasak broj="330 km²" tekst="površina" />
            </div>
          </div>
          <div className="hpd_slike">
            <img src={oHP1} className="hpd__foto hpd__foto--mjesto"/>
            <img src={oHP2} className="hpd__foto hpd__foto--mjesto"/>
          </div>
            
          
        </div>
      </div>

      <div className="hpd__separator" />

      {/* ===== GEOGRAFIJA ===== */}
      <div className="hpd__sekcija hpd__sekcija--alt">
        <div className="hpd__sekcija-header">
          <span className="hpd__bedz hpd__bedz--zeleni">Geografija</span>
        </div>

        <div className="hpd__blok hpd__blok--obrnuto">
          <div className="hpd__blok-tekst">
            <h2 className="hpd__blok-naslov">Geografija</h2>
            <p className="hpd__blok-opis">
              Ovaj kraj pripada prostoru unutrašnjih Dinarida i ima izražene
              odlike brdsko-planinskog područja, gdje dominiraju nadmorske
              visine iznad 1.000 metara. Han Pijesak je okružen planinskim
              visovima – Velikim Žepom (1.537 m), Javornikom (1.219 m), Studenom
              Gorom (1.149 m) i Trešnjevcem (1.245 m), kao i prostranim
              četinarskim i listopadnim šumama. Zahvaljujući izuzetno čistom
              vazduhu i visokoj koncentraciji ozona, ovo mjesto je prepoznato
              kao jedna od najznačajnijih klimatskih i vazdušnih banja u Evropi,
              a početkom novembra 2023. godine cijelo područje opštine i
              zvanično je proglašeno vazdušnom banjom. Ova činjenica predstavlja
              snažan temelj za razvoj zdravstvenog i rekreativnog turizma.
            </p>
            <div className="hpd__naglasci">
              <Naglasak broj="1.537 m" tekst="Veliki Žep" />
              <Naglasak broj="1.245 m" tekst="Trešnjevac" />
              <Naglasak broj="1.219 m" tekst="Javornik" />
              <Naglasak broj="1.149 m" tekst="Studena Gora" />
            </div>
          </div>
          <img src={geo} className="hpd__foto hpd__foto--planine"/>
           
        </div>
      </div>

      <div className="hpd__separator" />

      {/* ===== KLIMA ===== */}
      <div className="hpd__sekcija">
        <div className="hpd__sekcija-header">
          <span className="hpd__bedz hpd__bedz--zeleni">Klima i voda</span>
        </div>

        <div className="hpd__blok">
          <div className="hpd__blok-tekst">
            <h3 className="hpd__blok-naslov">Klima</h3>
            <p className="hpd__blok-opis">
              Klimatske odlike ovog područja uslovljene su velikom nadmorskom
              visinom, geografskom širinom i kontinentalnošću. Na ovom prostoru
              dolazi do sudara polarnog i suptropskog vazduha, što rezultira
              planinskom klimom sa blagim uticajem kontinentalne.
              Karakterističan je veći broj vjetrovitih dana, pri čemu dominiraju
              sjeverni i južni vjetrovi. Takvi prirodni uslovi doprinose
              izuzetnom kvalitetu vazduha i čine boravak u ovom kraju posebno
              pogodnim za zdravlje.
            </p>
          </div>
          <img src={klima} className="hpd__foto hpd__foto--klima"/>
          
        </div>

        <div className="hpd__blok hpd__blok--obrnuto">
          <div className="hpd__blok-tekst">
            <h3 className="hpd__blok-naslov">Vodni resursi</h3>
            <p className="hpd__blok-opis">
              Područje opštine karakterišu i značajni vodni resursi. Han Pijesak
              se nalazi na vododjelnici između slivova rijeka Drine i Bosne. U
              slivu Drine nalazi se rječica Rijeka, koja nastaje od više izvora,
              dok u slivu Bosne izvire nekoliko rječica – Bjesnica, Krivača,
              Varošnica i Pištica, koje se u selu Pjenovac spajaju i formiraju
              rijeku Stupčanicu. Posebnu prirodnu atrakciju predstavlja kanjon
              rijeke Varošnice, dug oko 4 kilometra, kao i izvori u njenoj
              blizini. Dodatnu vrijednost ovom području daje i potok Skakavac,
              koji na kratkoj dužini od oko 600 metara savladava visinsku
              razliku veću od 200 metara, stvarajući jedinstven prirodni
              ambijent.
            </p>
          </div>
          <div className="hpd_slike">
          <img src={voda1} className="hpd__foto hpd__foto--voda"/>
          <img src={voda2} className="hpd__foto hpd__foto--voda"/>

          </div>
          
        </div>
      </div>

      <div className="hpd__separator" />

      {/* ===== TURIZAM ===== */}
      <div className="hpd__sekcija hpd__sekcija--alt">
        <div className="hpd__sekcija-header">
          <span className="hpd__bedz hpd__bedz--zeleni">Turizam</span>
          <h2 className="hpd__sekcija-naslov">Različiti vidovi turizma</h2>
        </div>
        <p className="hpd__turizam-uvod">
          Han Pijesak se nalazi na važnom magistralnom putu koji ga povezuje sa
          centrima u Republici Srpskoj, Federaciji BiH i šire, što doprinosi
          njegovoj dostupnosti i turističkoj atraktivnosti. Prirodne
          karakteristike ovog područja omogućavaju razvoj različitih vidova
          turizma.
        </p>
        <div className="hpd__turizam-grid">
          {turizamPodaci.map((kartica) => (
            <TurizamKartica
              key={kartica.naziv}
              ikona={kartica.ikona}
              naziv={kartica.naziv}
              opis={kartica.opis}
            />
          ))}
        </div>
      </div>

      <div className="hpd__separator" />

      {/* ===== KULTURA I OBRAZOVANJE ===== */}
      <div className="hpd__sekcija">
        <div className="hpd__sekcija-header">
          <span className="hpd__bedz hpd__bedz--zeleni">
            Kultura i obrazovanje
          </span>
          <h2 className="hpd__sekcija-naslov">Institucije</h2>
          <p className="hpd__sekcija-podnaslov">
            Obrazovanje i kultura s korijenima u ranom 20. vijeku
          </p>
        </div>

        <div className="hpd__inst-grid">
          {/* Biblioteka — istaknuta kartica */}
          <div className="hpd__inst-glavna">
            <span className="hpd__inst-nagrada">
              ★ Najbolja biblioteka u RS — 2022.
            </span>
            <h3 className="hpd__inst-naslov">
              JU Narodna biblioteka „Branko Čučak"
            </h3>
            <p className="hpd__inst-godina">
              Osnovana 1923. godine · Ul. Aleksandra Karađorđevića 2
            </p>
            <p className="hpd__inst-tekst">
              JU Narodna biblioteka „Branko Čučak“ u Han Pijesku smještena je u
              ulici Aleksandra Karađorđevića 2, u zgradi nekadašnjeg Sokolskog
              doma koji je tridesetih godina prošlog vijeka narodu poklonio
              kralj Aleksandar. Biblioteka raspolaže bogatim fondom od preko
              33.000 knjiga iz različitih oblasti, kao i vrijednim zbirkama i
              legatima, među kojima se izdvajaju legat Branka Čučka, dio lične
              biblioteke akademika Rajka Kuzmanovića, te posebne kolekcije i
              umjetnički sadržaji. U njenom sastavu nalazi se i spomen-soba
              posvećena kraljevskoj porodici Karađorđević, kao i značajna
              dokumentarna i fotografska građa. Sa tradicijom koja traje od
              1923. godine, biblioteka danas predstavlja važan kulturni centar,
              prepoznat i van lokalne zajednice, a njen rad obilježavaju brojne
              promocije, radionice i manifestacije, među kojima su i „Čučkovi
              književni susreti“. Proglašena je za najbolju biblioteku u
              Republici Srpskoj za 2022. godinu.
            </p>
            <div className="hpd__inst-statistike">
              <div className="hpd__inst-stat">
                <span className="hpd__inst-stat-broj">33.000+</span>
                <span className="hpd__inst-stat-lab">knjiga</span>
              </div>
              <div className="hpd__inst-stat">
                <span className="hpd__inst-stat-broj">1923.</span>
                <span className="hpd__inst-stat-lab">godina osnivanja</span>
              </div>
              <div className="hpd__inst-stat">
                <span className="hpd__inst-stat-broj">100+</span>
                <span className="hpd__inst-stat-lab">godina tradicije</span>
              </div>
            </div>
          </div>

          {/* Desna kolona — dvije manje kartice */}
          <div className="hpd__inst-desna">
            {/* Centar Pogled */}
            <div className="hpd__inst-manja">
              <h3 className="hpd__inst-manja-naslov">
                Centar za kulturu i sport „Pogled"
              </h3>
              <p className="hpd__inst-godina">Osnovan 2001. godine</p>
              <p className="hpd__inst-tekst">
                Ključna ustanova za organizaciju kulturnih i sportskih događaja
                u opštini, sa kino dvoranom od 250 mjesta i sportskom dvoranom.
              </p>
              <ul className="hpd__inst-lista">
                <li>Kino dvorana — 250 mjesta</li>
                <li>Sportska dvorana</li>
                <li>Kreativne radionice i foto-klub</li>
                <li>Galerijski prostor</li>
              </ul>
            </div>

            {/* Obrazovanje */}
            <div className="hpd__inst-manja">
              <h3 className="hpd__inst-manja-naslov">Obrazovanje</h3>
              <p className="hpd__inst-godina">Od 1908. godine</p>
              <p className="hpd__inst-tekst">
                Razvoj obrazovanja započeo je 1908. otvaranjem osnovne škole.
                Srednjoškolski centar od 1964. obuhvata gimnaziju, šumarsku i
                saobraćajnu školu.
              </p>
              <ul className="hpd__inst-lista">
                <li>Osnovna škola od 1908.</li>
                <li>Gimnazija</li>
                <li>Šumarska škola</li>
                <li>Saobraćajna škola</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HanPijesakDanas;
