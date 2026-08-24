import React from 'react';
import './UticajNaZdravlje.css';
import { useTranslation } from 'react-i18next';
import { FaLungs, FaHeart, FaBrain, FaMoon, FaShield, FaLeaf } from "react-icons/fa6";

const ikone = [
  <FaLungs />, <FaHeart />, <FaBrain />,
  <FaMoon />, <FaShield />, <FaLeaf />,
];

function UticajNaZdravlje() {
  const { t } = useTranslation();

  const niz = [1, 2, 3, 4, 5, 6].map((n, i) => ({
    ikona:  ikone[i],
    naslov: t(`zdravstveni_turizam.uticaj_${n}_naslov`),
    opis:   t(`zdravstveni_turizam.uticaj_${n}_opis`),
  }));

  return (
    <div className="uticaj">
      <h2 className="uticaj__naslov">{t("zdravstveni_turizam.uticaj_naslov")}</h2>
      <p className="uticaj__podnaslov">{t("zdravstveni_turizam.uticaj_podnaslov")}</p>
      <div className="uticaj__lista">
        {niz.map((u, i) => (
          <div key={i} className="uticaj__stavka">
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