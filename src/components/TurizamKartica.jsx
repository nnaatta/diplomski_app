import React from "react";
import "./TurizamKartica.css";

function TurizamKartica({ ikona, naziv, opis }) {
  return (
    <div className="turizam-kartica">
      <div className="turizam-kartica__ikona">{ikona}</div>
      <h3 className="turizam-kartica__naziv">{naziv}</h3>
      <p className="turizam-kartica__opis">{opis}</p>
    </div>
  );
}

export default TurizamKartica;