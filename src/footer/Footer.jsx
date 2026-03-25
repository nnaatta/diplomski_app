import React from "react";
import "./Footer.css";
import { FaLocationDot, FaPhone, FaRegEnvelope } from "react-icons/fa6";

function MyFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer py-4">
      <div className="container-fluid px-4">
        <div className="row g-4">

          {/* ── Linkovi ── */}
          <div className="col-12 col-md-4">
            <h5>Linkovi</h5>
            <div className="footer-links">
              <div>
                <h6>O Han Pijesku</h6>
                <ul className="list-unstyled">
                  <li><a href="#istorija">Istorija</a></li>
                  <li><a href="#HP_danas">Han Pijesak danas</a></li>
                  <li><a href="#kultura_tradicija">Kultura i tradicija</a></li>
                </ul>
              </div>
              <div>
                <h6>Istraži</h6>
                <ul className="list-unstyled">
                  <li><a href="#znamenitosti">Znamenitosti</a></li>
                  <li><a href="#atrakcije">Atrakcije</a></li>
                  <li><a href="#vjerski_objekti">Vjerski objekti</a></li>
                  <li><a href="#flora_fauna">Flora i fauna</a></li>
                  <li><a href="#zdravstveni_t">Zdravstveni turizam</a></li>
                </ul>
              </div>
              <div>
                <h6>Servisi</h6>
                <ul className="list-unstyled">
                  <li><a href="#smještaj">Smještaj</a></li>
                  <li><a href="#gastronomija">Gastronomija</a></li>
                  <li><a href="#manifestacije">Manifestacije</a></li>
                </ul>
              </div>
              <div>
                <h6>Ostalo</h6>
                <ul className="list-unstyled">
                  <li><a href="#o_TO">O Turističkoj org.</a></li>
                  <li><a href="blog">Blog</a></li>
                  <li><a href="galerija">Galerija</a></li>
                  <li><a href="kontakt">Kontakt</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* ── Kontakt ── */}
          <div className="col-12 col-md-4">
            <h5>Kontakt</h5>
            <h6>Turistička organizacija opštine Han Pijesak</h6>
            <div className="footer-contact mt-2">
              <p>
                <FaLocationDot />
                Aleksandra Karađorđevića 4, Han Pijesak
              </p>
              <p>
                <FaPhone />
                +387 66 787 850
              </p>
              <p>
                <FaRegEnvelope />
                tohanpijesak@gmail.com
              </p>
            </div>
          </div>

          {/* ── Mapa ── */}
          <div className="col-12 col-md-4">
            <h5>Mapa</h5>
            <div className="map-responsive">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2866.1032828151924!2d18.948392876064215!3d44.08122217108502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47591bf6408252e3%3A0x553c3532a7dc9443!2sMunicipality%20of%20Han%20Pijesak!5e0!3m2!1sen!2srs!4v1773314379034!5m2!1sen!2srs"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokacija Han Pijesak"
              />
            </div>
          </div>

        </div>

        
        <div className="footer-bottom">
          © {currentYear} Turistička organizacija opštine Han Pijesak. Sva prava zadržana.
        </div>
      </div>
    </footer>
  );
}

export default MyFooter;