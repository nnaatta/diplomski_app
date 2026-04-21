import React from "react";
import { Link } from "react-router-dom";
import "./OHP.css";
import hpDanasPozadina from '../../assets/floraFauna/pozadina1.jpg'
import hpNekadaPozadina from '../../assets/hpNekada.jpg'




function OHP() {
  return (
    <section className="ohp">
      <div className="ohp__split">

        <Link to="/o-han-pijesku/danas" className="ohp__pola ohp__pola--danas">
          <img src={hpDanasPozadina} className="ohp__pola-overlay" />
          <div className="ohp__pola-tekst">
            
            <h1 className="ohp__pola-naslov">Han Pijesak danas</h1>
            <p className="ohp__pola-opis">
              Geografija, klima, turizam i institucije 
            </p>
            <span className="ohp__pola-dugme">Istraži →</span>
          </div>
        </Link>

        <Link to="/o-han-pijesku/istorija" className="ohp__pola ohp__pola--istorija">
          <img src={hpNekadaPozadina} className="ohp__pola-overlay" />
          <div className="ohp__pola-tekst">
            <h1 className="ohp__pola-naslov">Han Pijesak kroz istoriju</h1>
            <p className="ohp__pola-opis">
              Vijekovi bogate prošlosti, kulture i tradicije
            </p>
            <span className="ohp__pola-dugme">Istraži →</span>
          </div>
        </Link>

      </div>
    </section>
  );
}

export default OHP;
