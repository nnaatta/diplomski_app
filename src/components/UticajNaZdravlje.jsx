import React from 'react';
import './UticajNaZdravlje.css';
import { FaLungs, FaHeart, FaBrain, FaMoon, FaShield, FaLeaf } from "react-icons/fa6";

const niz = [
  {
    ikona: <FaLungs />,
    naslov: 'Disajni sistem',
    opis: 'Boravak u Han Pijesku ima izuzetno povoljan uticaj na respiratorni sistem. Čist vazduh, povećana koncentracija kiseonika i prisustvo fitoncida iz četinarskih šuma doprinose lakšem disanju i smanjenju iritacija disajnih puteva. Ovakvi uslovi posebno pogoduju osobama koje imaju problema sa astmom, bronhitisom i alergijama.',
  },
  {
    ikona: <FaHeart />,
    naslov: 'Cirkulacija',
    opis: 'Planinska nadmorska visina od oko 1.100 metara stimuliše rad kardiovaskularnog sistema. Organizam se prirodno prilagođava takvim uslovima, što dovodi do bolje cirkulacije i efikasnije distribucije kiseonika kroz tijelo. Redovan boravak može doprinijeti jačanju srca i povećanju fizičke izdržljivosti.',
  },
  {
    ikona: <FaBrain />,
    naslov: 'Smanjenje stresa',
    opis: 'Prirodno okruženje Han Pijeska, uz mir, tišinu i odsustvo urbanih uticaja, ima snažan umirujući efekat na organizam. Boravak u šumi i na svježem vazduhu smanjuje nivo hormona stresa, doprinosi opuštanju i vraća osjećaj unutrašnje ravnoteže.',
  },
  {
    ikona: <FaMoon />,
    naslov: 'Kvalitet sna',
    opis: 'Svjež planinski vazduh i prirodan dnevni ritam pozitivno utiču na kvalitet sna. Veća količina kiseonika u organizmu doprinosi dubljem i mirnijem snu, dok odsustvo buke i zagađenja omogućava potpun odmor i osjećaj odmornosti nakon buđenja.',
  },
  {
    ikona: <FaShield />,
    naslov: 'Imunitet',
    opis: 'Zahvaljujući kombinaciji čistog vazduha, fitoncida i povoljne klime, boravak u Han Pijesku doprinosi jačanju imunološkog sistema. Organizam se lakše bori protiv infekcija, dok prirodni uslovi podstiču njegovu otpornost i regeneraciju.',
  },
  {
    ikona: <FaLeaf />,
    naslov: 'Mentalno zdravlje',
    opis: 'Kontakt sa prirodom ima direktan pozitivan uticaj na mentalno zdravlje. Boravak u zelenom okruženju smanjuje anksioznost, poboljšava raspoloženje i povećava koncentraciju. Han Pijesak pruža idealne uslove za mentalni reset i bijeg od svakodnevnog stresa.',
  },
];

function UticajNaZdravlje() {
  return (
    <div className="uticaj">
      <h2 className="uticaj__naslov">Uticaj na zdravlje</h2>
      <p className="uticaj__podnaslov">
        Naučno potvrđene dobrobiti boravka u planinskoj vazdušnoj banji
      </p>
      <div className="uticaj__lista">
        {niz.map((u) => (
          <div key={u.naslov} className="uticaj__stavka">
            <div className="uticaj__header">
              <span className="uticaj__ikona">{u.ikona}</span>
              <h3 className="uticaj__naziv">{u.naslov}</h3>
            </div>
            <p className="uticaj__opis">{u.opis}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UticajNaZdravlje;