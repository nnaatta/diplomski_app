import React from "react";
import "./Footer.css";
import { FaLocationDot, FaPhone, FaRegEnvelope } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

function MyFooter() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer py-4">
      <div className="container-fluid px-4">
        <div className="row g-4">

          {/* ── Linkovi ── */}
          <div className="col-12 col-md-4">
            <h5>{t("footer.linkovi")}</h5>
            <div className="footer-links">
              <div>
                <h6>{t("footer.istrazi")}</h6>
                <ul className="list-unstyled">
                  <li><a href="/znamenitosti">{t("footer.znamenitosti")}</a></li>
                  <li><a href="/atrakcije">{t("footer.atrakcije")}</a></li>
                  <li><a href="/vjerski-objekti">{t("footer.vjerski_objekti")}</a></li>
                  <li><a href="/flora-i-fauna">{t("footer.flora_fauna")}</a></li>
                  <li><a href="#zdravstveni-turizam">{t("footer.zdravstveni_turizam")}</a></li>
                </ul>
              </div>
              <div>
                <h6>{t("footer.aktivnosti")}</h6>
                <ul className="list-unstyled">
                  <li><a href="/aktivni-odmor">{t("footer.aktivni_odmor")}</a></li>
                  <li><a href="/sport-rekreacija">{t("footer.sport_rekreacija")}</a></li>
                  <li><a href="/lov-i-ribolov">{t("footer.lov_ribolov")}</a></li>
                </ul>
              </div>
              <div>
                <h6>{t("footer.servisi")}</h6>
                <ul className="list-unstyled">
                  <li><a href="/smještaj">{t("footer.smjestaj")}</a></li>
                  <li><a href="/gastronomija">{t("footer.gastronomija")}</a></li>
                  <li><a href="/manifestacije">{t("footer.manifestacije")}</a></li>
                </ul>
              </div>
              <div>
                <h6>{t("footer.ostalo")}</h6>
                <ul className="list-unstyled">
                  <li><a href="/o-to">{t("footer.o_to")}</a></li>
                  <li><a href="o-Han-Pijesku">{t("footer.o_han_pijesku")}</a></li>
                  <li><a href="/blog">{t("footer.blog")}</a></li>
                  <li><a href="/galerija">{t("footer.galerija")}</a></li>
                  <li><a href="/kontakt">{t("footer.kontakt")}</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* ── Kontakt ── */}
          <div className="col-12 col-md-4">
            <h5>{t("footer.kontakt_naslov")}</h5>
            <h6>{t("footer.to_naziv")}</h6>
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
            <h5>{t("footer.mapa")}</h5>
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
          © {currentYear} {t("footer.to_naziv")}. {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
}

export default MyFooter;