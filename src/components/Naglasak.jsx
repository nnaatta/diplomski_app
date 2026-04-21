import React from "react";
import './Naglasak.css';

function Naglasak({ broj, tekst }) {
  return (

      <div className="naglasak_item">
        <span className="broj">{broj}</span>
        <span className="tekst">{tekst}</span>
      </div>
    
  );
}

export default Naglasak;
