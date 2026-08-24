import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation } from "react-i18next";
import "./Navbar.css";
import logo from "../assets/logoTO.png";

function MyNavbar() {
  const { t, i18n } = useTranslation();

  return (
    <Navbar expand="lg" className="moj_navbar" fixed="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <img src={logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">
              {t("nav.pocetna")}
            </Nav.Link>
            <Nav.Link as={NavLink} to="/o-to">
              {t("nav.o_to")}
            </Nav.Link>

            <Nav.Link as={NavLink} to="/o-Han-Pijesku">
              {t("nav.o_han_pijesku")}
            </Nav.Link>

            <NavDropdown title={t("nav.istrazi")} id="dropdown-istrazi">
              <NavDropdown.Item as={NavLink} to="/znamenitosti">
                {t("nav.znamenitosti")}
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/atrakcije">
                {t("nav.atrakcije")}
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/vjerski-objekti">
                {t("nav.vjerski_objekti")}
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/flora-i-fauna">
                {t("nav.flora_fauna")}
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/zdravstveni-turizam">
                {t("nav.zdravstveni_turizam")}
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title={t("nav.aktivnosti")} id="dropdown-aktivnosti">
              <NavDropdown.Item as={NavLink} to="/aktivni-odmor">
                {t("nav.aktivni_odmor")}
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/sport-i-rekreacija">
                {t("nav.sport_rekreacija")}
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/lov-i-ribolov">
                {t("nav.lov_ribolov")}
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title={t("nav.turisticki_servisi")}
              id="dropdown-servisi"
            >
              <NavDropdown.Item as={NavLink} to="/smjestaj">
                {t("nav.smjestaj")}
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/gastronomija">
                {t("nav.gastronomija")}
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/manifestacije">
                {t("nav.manifestacije")}
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={NavLink} to="/blog">
              {t("nav.blog")}
            </Nav.Link>
            <Nav.Link as={NavLink} to="/galerija">
              {t("nav.galerija")}
            </Nav.Link>
            <Nav.Link as={NavLink} to="/kontakt">
              {t("nav.kontakt")}
            </Nav.Link>

            {/* Jezik dugmici */}
            {/* Jezik switcher */}
            <div className="lang-switcher">
              <button
                className={i18n.language === "sr" ? "active" : ""}
                onClick={() => i18n.changeLanguage("sr")}
              >
                SR
              </button>
              <button
                className={i18n.language === "en" ? "active" : ""}
                onClick={() => i18n.changeLanguage("en")}
              >
                EN
              </button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
