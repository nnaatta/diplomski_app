import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Navbar.css";
import logo from "../assets/logoTO.png";

function MyNavbar() {
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
              Početna
            </Nav.Link>
            <Nav.Link as={NavLink} to="/o-to">
              O TO
            </Nav.Link>

            <Nav.Link as={NavLink} to="/o-Han-Pijesku">
              O Han Pijesku
            </Nav.Link>

            <NavDropdown title="Istraži" id="dropdown-istrazi">
              <NavDropdown.Item as={NavLink} to="/znamenitosti">
                Znamenitosti
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/atrakcije">
                Atrakcije
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/vjerski-objekti">
                Vjerski objekti
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/flora-i-fauna">
                Flora i fauna
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/zdravstveni-turizam">
                Zdravstveni turizam
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Aktivnosti" id="dropdown-aktivnosti">
              <NavDropdown.Item as={NavLink} to="/aktivni-odmor">
                Aktivni odmor
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/sport-i-rekreacija">
                Sport i rekreacija
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/lov-i-ribolov">
                Lov i ribolov
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Turistički servisi" id="dropdown-servisi">
              <NavDropdown.Item as={NavLink} to="/smjestaj">
                Smještaj
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/gastronomija">
                Gastronomija
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/manifestacije">
                Manifestacije
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={NavLink} to="/blog">
              Blog
            </Nav.Link>
            <Nav.Link as={NavLink} to="/galerija">
              Galerija
            </Nav.Link>
            <Nav.Link as={NavLink} to="/kontakt">
              Kontakt
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
