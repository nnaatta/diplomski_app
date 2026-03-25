import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.css';
import logo from '../assets/logoTO.png';

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
            <Nav.Link as={NavLink} to="/">Početna</Nav.Link>
            <Nav.Link as={NavLink} to="/o-to">O TO</Nav.Link>

            <NavDropdown title="O Han Pijesku" id="dropdown-o-hp">
              <NavDropdown.Item as={NavLink} to="/istorija">Istorija</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/han-pijesak-danas">Han Pijesak danas</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/kultura-i-tradicija">Kultura i tradicija</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Istraži" id="dropdown-istrazi">
              <NavDropdown.Item as={NavLink} to="/znamenitosti">Znamenitosti</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/atrakcije">Atrakcije</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/vjerski-objekti">Vjerski objekti</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/flora-i-fauna">Flora i fauna</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/zdravstveni-turizam">Zdravstveni turizam</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Turistički servisi" id="dropdown-servisi">
              <NavDropdown.Item as={NavLink} to="/smjestaj">Smještaj</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/gastronomija">Gastronomija</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/manifestacije">Manifestacije</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={NavLink} to="/blog">Blog</Nav.Link>
            <Nav.Link as={NavLink} to="/galerija">Galerija</Nav.Link>
            <Nav.Link as={NavLink} to="/kontakt">Kontakt</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;