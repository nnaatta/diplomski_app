import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import MyNavbar from "./navbar/NavBar";
import MyFooter from "./footer/Footer";

// Stranice
import Pocetna from "./pages/pocetna/Pocetna";
import OTO from "./pages/oTO/OTO";
import Kontakt from "./pages/kontakt/Kontakt";
import Smjestaj from "./pages/smjestaj/Smjestaj";
import SmjestajDetalji from "./pages/smjestaj/SmjestajDetalji";
import Gastronomija from "./pages/gastronomija/Gastronomija";
import ZdravstveniTurizam from "./pages/zdravstveniTurizam/ZdravstveniTurizam";
import FloraFauna from "./pages/floraFauna/FloraFauna";
import VjerskiObjekti from "./pages/vjerskiObjekti/VjerskiObjekti";


function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <MyNavbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Pocetna />} />
            <Route path="/o-to" element={<OTO />} />
             <Route path="/kontakt"              element={<Kontakt />} />
             <Route path="/smjestaj"             element={<Smjestaj />} />
             <Route path="/smjestaj/:id" element={<SmjestajDetalji />} />
             <Route path="/gastronomija"         element={<Gastronomija />} />
             <Route path="/zdravstveni-turizam"  element={<ZdravstveniTurizam />} />
             <Route path="/flora-i-fauna"        element={<FloraFauna />} />
            <Route path="/vjerski-objekti"      element={<VjerskiObjekti />} />
            {/*<Route path="/istorija"             element={<Istorija />} />
            <Route path="/han-pijesak-danas"    element={<HanPijesakDanas />} />
            <Route path="/kultura-i-tradicija"  element={<KulturaTradicija />} />
            <Route path="/znamenitosti"         element={<Znamenitosti />} />
            <Route path="/atrakcije"            element={<Atrakcije />} />
            <Route path="/manifestacije"        element={<Manifestacije />} />
            <Route path="/blog"                 element={<Blog />} />
            <Route path="/galerija"             element={<Galerija />} />
           */}
          </Routes>
        </main>
        <MyFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
