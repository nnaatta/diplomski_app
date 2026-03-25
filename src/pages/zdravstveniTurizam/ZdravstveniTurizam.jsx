import React from "react";
import "./ZdravstveniTurizam.css";
import { IoMdCheckbox } from "react-icons/io";
import { MdForest } from "react-icons/md";
import {
  FaWind,
  FaPersonHiking,
  FaBicycle,
  FaTreeCity,
  FaCloudSun,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import UticajNaZdravlje from "../../components/UticajNaZdravlje";
import slika1 from "../../assets/vazdusnaBanja.jpg";
import heroSlika from "../../assets/ZdravstveniTurizam/pozadina.jpg";
import slika3 from "../../assets/ZdravstveniTurizam/slika2.jpg";
import slika4 from "../../assets/ZdravstveniTurizam/slika3.jpg";
import slika5 from "../../assets/ZdravstveniTurizam/slika5.jpg";
import slika6 from "../../assets/ZdravstveniTurizam/slika6.jpg";
import slika7 from "../../assets/ZdravstveniTurizam/slika7.jpg";
import slika8 from "../../assets/ZdravstveniTurizam/slika8.jpg";
import slika9 from "../../assets/ZdravstveniTurizam/slika9.jpg";









import ImageSlider from "../../components/ImageSlider";

const slajdovi = [
  {
    slika: slika5,
    opis: "5 slika",
  },
  {
    slika: slika1,
    opis: "prva slika",
  },
  {
    slika: heroSlika,
    opis: "druga slika"
  },
  {
    slika: slika3,
    opis: "4 slika",
  },
  {
    slika: slika4,
    opis: "5 slika",
  },
  {
    slika: slika6,
    opis: "6 slika",
  },
  {
    slika: slika7,
    opis: "7 slika",
  },
  {
    slika: slika8,
    opis: "8 slika",
  },
  {
    slika: slika9,
    opis: "9 slika",
  },
];

const aktivnosti = [
  {
    ikona: <FaPersonHiking />,
    naziv: "Planinarenje",
    opis: "Staze kroz romanijsku šumu za sve nivoe kondicije — od lakih šetnji do zahtjevnih uspona.",
    link: "/atrakcije",
  },
  {
    ikona: <FaBicycle />,
    naziv: "Biciklizam",
    opis: "Preko 40 km označenih biciklističkih staza kroz netaknutu prirodu Han Pijeska.",
    link: "/atrakcije",
  },
  {
    ikona: <FaTreeCity />,
    naziv: "Šetnje kroz šumu",
    opis: "Uživajte u mirnim šetnjama kroz četinarske šume bogate fitoncidicma i svježim vazduhom.",
    link: "/flora-i-fauna",
  },
  {
    ikona: <FaCloudSun />,
    naziv: "Odmor u prirodi",
    opis: "Han Pijesak nudi idealne uslove za potpun odmor i regeneraciju u netaknutom planinskom ambijentu.",
    link: "/smjestaj",
  },
];

function ZdravstveniTurizam() {
  return (
    <section className="ZT_section">
      <div className="ZT_hero">
        <img src={heroSlika} alt="Han Pijesak" className="ZT_hero__img" />
        <div className="ZT_hero__overlay" />
        <div className="ZT_hero__tekst">
          <span className="ZT_hero__bedz">Vazdušna banja</span>
          <h1 className="ZT_hero__naslov">Udahni pravi planinski zrak</h1>
          <p className="ZT_hero__podnaslov">
            Han Pijesak — mjesto gdje priroda liječi, a planinski vazduh
            obnavlja tijelo i dušu.
          </p>
          <a href="#zasto" className="ZT_hero__dugme">
            Istraži više ↓
          </a>
        </div>
      </div>

      {/* 2. STATS BAR — tamnozelena */}
      <div className="ZT_stats">
        <div className="ZT_stats__stavka">
          <span className="ZT_stats__broj">70%</span>
          <span className="ZT_stats__opis">površine pod šumom</span>
        </div>
        <div className="ZT_stats__stavka">
          <span className="ZT_stats__broj">1.100 m</span>
          <span className="ZT_stats__opis">nadmorska visina</span>
        </div>
        <div className="ZT_stats__stavka">
          <span className="ZT_stats__broj">2023.</span>
          <span className="ZT_stats__opis">
            godina proglašenja vazdušnom banjom
          </span>
        </div>
        <div className="ZT_stats__stavka">
          <span className="ZT_stats__broj">900 m</span>
          <span className="ZT_stats__opis">
            prosječna nadmorska visina centra
          </span>
        </div>
      </div>

      {/* 3. ZAŠTO — bijela, 2 kolone */}
      <div className="ZT_zasto" id="zasto">
        <div className="ZT_zasto__objasnjenje">
          <span className="ZT_bedz--zeleni">Zvanično proglašenje</span>
          <h2>Zašto je Han Pijesak vazdušna banja?</h2>
          <p>
            Zvanično proglašenje Han Pijeska vazdušnom banjom doneseno je 2023.
            godine od strane Vlade Republike Srpske — zasnovano na višegodišnjim
            stručnim analizama i institucionalnim procjenama.
          </p>
          <p>
            Ključni razlozi su postojanje prirodnog ljekovitog faktora,
            dugogodišnja reputacija klimatskog lječilišta te naučno potvrđeni
            rezultati o kvalitetu vazduha i klime. Sistemskim mjerenjima prije
            više od 100 godina utvrđeno je da ovo područje ima kvalitete kakve
            nije imalo nijedno planninsko mjesto u tadašnjoj Austro-Ugarskoj
            carevini.
          </p>
          {/* Istaknuta godina */}
          <div className="ZT_zasto__akcenat">
            <span className="ZT_zasto__godina">2023.</span>
            <span className="ZT_zasto__godina-opis">
              Godina zvaničnog proglašenja od strane Vlade RS
            </span>
          </div>
        </div>
        <div className="ZT_zasto__institucije">
          <span className="ZT_bedz--zeleni">Naučna potvrda</span>
          <h2>Institucije koje su učestvovale</h2>
          <ul>
            <li className="ZT_institucija">
              <IoMdCheckbox className="ZT_check" />
              <span>Institut za zaštitu i ekologiju Republike Srpske</span>
            </li>
            <li className="ZT_institucija">
              <IoMdCheckbox className="ZT_check" />
              <span>
                Ministarstvo poljoprivrede, šumarstva i vodoprivrede RS
              </span>
            </li>
            <li className="ZT_institucija">
              <IoMdCheckbox className="ZT_check" />
              <span>Republički hidrometeorološki zavod RS</span>
            </li>
            <li className="ZT_institucija">
              <IoMdCheckbox className="ZT_check" />
              <span>Institut za javno zdravstvo Republike Srpske</span>
            </li>
          </ul>
          <p className="ZT_zasto__napomena">
            Ove institucije su kroz izvještaje i stručna mišljenja potvrdile da
            Han Pijesak posjeduje klimatske i vazdušne karakteristike pogodne za
            liječenje i prevenciju bolesti.
          </p>
        </div>
      </div>

      
<div className="ZT_slider">
  <h2 className="ZT_slider__naslov">Han Pijesak u slikama</h2>
  <p className="ZT_slider__podnaslov">Priroda koja poziva na odmor i obnovu</p>
  <div className="ZT_slider__wrap">
    <ImageSlider slajdovi={slajdovi} visina="460px" interval={4000} />
  </div>
</div>

      {/* 5. KVALITET VAZDUHA — krem, jedna ploča */}
      <div className="ZT_kvalitet">
        <div className="ZT_kvalitet__wrap">
          <span className="ZT_bedz--zeleni">Čistoća vazduha</span>
          <h2 className="ZT_kvalitet__naslov">Kvalitet vazduha Han Pijeska</h2>
          <p className="ZT_kvalitet__uvod">
            Područje Han Pijeska karakteriše minimalno prisustvo zagađivača —
            rezultat potpune odsutnosti teške industrije i velike udaljenosti od
            urbanih centara.
          </p>
          <div className="ZT_kvalitet__grid">
            <div className="ZT_kvalitet__stavka">
              <div className="ZT_kvalitet__header">
                <MdForest className="ZT_kvalitet__ikona" />
                <h3>Šume</h3>
              </div>
              <p>
                Dominacija četinarskih šuma — bora, jele i smrče — oslobađa
                fitoncide, biološki aktivne supstance sa dokazanim
                antibakterijskim djelovanjem koje jačaju imunitet i smanjuju
                respiratorne tegobe.
              </p>
            </div>
            <div className="ZT_kvalitet__stavka">
              <div className="ZT_kvalitet__header">
                <FaWind className="ZT_kvalitet__ikona" />
                <h3>Ozon</h3>
              </div>
              <p>
                Han Pijesak je prepoznat kao područje sa povišenom
                koncentracijom ozona u prizemnim slojevima vazduha, što mu daje
                svježinu i čistoću te pozitivno djeluje na respiratorni sistem.
              </p>
            </div>
            <div className="ZT_kvalitet__stavka">
              <div className="ZT_kvalitet__header">
                <FaCloudSun className="ZT_kvalitet__ikona" />
                <h3>Kiseonik</h3>
              </div>
              <p>
                Na nadmorskoj visini od 1.100 m, uz gustu vegetaciju, vazduh je
                bogat kiseonikom i izuzetno pogodan za disanje — poboljšava rad
                pluća i doprinosi fizičkoj izdržljivosti.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. UTICAJ NA ZDRAVLJE — bijela, grid 2x3 */}
      <UticajNaZdravlje />

      {/* 7. AKTIVNOSTI — tamnozelena pozadina za kontrast */}
      <div className="ZT_aktivnosti">
        <h2 className="ZT_aktivnosti__naslov">Aktivnosti u prirodi</h2>
        <p className="ZT_aktivnosti__podnaslov">
          Otkrijte što sve Han Pijesak nudi
        </p>
        <div className="ZT_aktivnosti__grid">
          {aktivnosti.map((a) => (
            <Link to={a.link} key={a.naziv} className="ZT_aktivnost">
              <span className="ZT_aktivnost__ikona">{a.ikona}</span>
              <h3 className="ZT_aktivnost__naziv">{a.naziv}</h3>
              <p className="ZT_aktivnost__opis">{a.opis}</p>
              <span className="ZT_aktivnost__cta">Saznaj više →</span>
            </Link>
          ))}
        </div>
      </div>

      {/* 8. CTA — tamnozelena */}
      <div className="ZT_cta">
        <h2 className="ZT_cta__naslov">Posjetite Han Pijesak</h2>
        <p className="ZT_cta__tekst">
          Planinska vazdušna banja čeka vas tokom cijele godine — pronađite
          smještaj i počnite planirati nezaboravan boravak u srcu Romanije.
        </p>
        <div className="ZT_cta__dugmad">
          <Link to="/smjestaj" className="ZT_cta__btn ZT_cta__btn--primarni">
            Pronađi smještaj
          </Link>
          <Link to="/kontakt" className="ZT_cta__btn ZT_cta__btn--sekundarni">
            Kontaktirajte nas
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ZdravstveniTurizam;
