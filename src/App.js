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
import OHP from "./pages/oHP/OHP";
import HanPijesakDanas from "./pages/oHP/HanPijesakDanas";
import HPIstorija from "./pages/oHP/HPIstorija";
import AktivniOdmor from "./pages/aktivniOdmor/AktivniOdmor";
import StazaDetalji from "./pages/aktivniOdmor/StazaDetakji";
import LovRibolov from "./pages/lovRibolov/LovIRibolov";
import SportRekreacija from "./pages/sportIRekreacija/SportRekreacija";
import Manifestacije from "./pages/manifestacije/Manifestacije";
import Atrakcije from "./pages/atrakcije/Atrakcije";
import Znamenitosti from "./pages/znamenitosti/Znamenitosti";
import DvoracKaradjordjevica from "./pages/znamenitosti/DvoracKaradjordjevica";
import Blog from "./pages/blog/Blog";
import DetaljiBlog from "./pages/blog/DetaljiBlog";
import Galerija from "./pages/galerija/Galerija";


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
            <Route path="/o-han-pijesku"      element={<OHP />} />
            <Route path="/o-han-pijesku/danas"    element={<HanPijesakDanas />} />
            <Route path="/o-han-pijesku/istorija"    element={<HPIstorija />} />
            <Route path="/aktivni-odmor"    element={<AktivniOdmor />} />
            <Route path="/aktivni-odmor/:id" element={<StazaDetalji />} />
            <Route path="/lov-i-ribolov" element={<LovRibolov />} />
            <Route path="/sport-i-rekreacija" element={<SportRekreacija />} />
            <Route path="/manifestacije" element={<Manifestacije />} />
            <Route path="/atrakcije" element={<Atrakcije />} />
            <Route path="/znamenitosti" element={<Znamenitosti />} />
            <Route path="/znamenitosti/dvorac-karadjordjevica" element={<DvoracKaradjordjevica />} />
            <Route path="/blog" element={<Blog/>} />
            <Route path="/blog/:slug" element={<DetaljiBlog/>} />
            <Route path="/galerija" element={<Galerija/>} />



            











            {/*
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
