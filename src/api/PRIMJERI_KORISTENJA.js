/**
 * PRIMJERI KORIŠĆENJA — kopiraj u svoje komponente
 * =====================================================
 */

// ─── 1. PRIJAVA (Login stranica) ──────────────────────────────────────────────
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/admin'); // preusmjeri na admin panel
    } catch {
      // greška je već u `error` varijabli
    }
  };
  // ...
}

// ─── 2. JAVNA LISTA (npr. smještaji) ─────────────────────────────────────────
import { useEffect, useState } from 'react';
import { smjestajService } from '../api/services';

function SmjestajiPage() {
  const [smjestaji, setSmjestaji] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    smjestajService.getAll({ aktivan: 1 })
      .then(res => setSmjestaji(res.data.data))  // Laravel paginator: .data.data
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);
}

// ─── 3. ADMIN KREIRANJE (npr. novi smještaj) ─────────────────────────────────
import { smjestajService } from '../api/services';

async function kreirajSmjestaj(formData) {
  try {
    const res = await smjestajService.create({
      naziv: formData.naziv,
      opis: formData.opis,
      br_soba: formData.br_soba,
      br_lezajeva: formData.br_lezajeva,
      aktivan: true,
      lokacija_id: formData.lokacija_id,
      tip_smjestaja_id: formData.tip_smjestaja_id,
      kontakt_osoba_id: formData.kontakt_osoba_id,
      pogodnosti: formData.pogodnosti, // array ID-ova: [1, 3, 5]
    });
    return res.data;
  } catch (err) {
    // err.response.data.errors sadrži detalje validacije
    console.error(err.response?.data?.errors);
  }
}

// ─── 4. UPLOAD SLIKE ─────────────────────────────────────────────────────────
import { slikeService } from '../api/services';

async function uploadSliku(file, tip, tipId) {
  const formData = new FormData();
  formData.append('slika', file);
  formData.append('tip', tip);       // npr. 'smjestaj'
  formData.append('tip_id', tipId);  // ID smještaja

  const res = await slikeService.upload(formData);
  return res.data;
}

// ─── 5. KONTAKT FORMA (javno) ─────────────────────────────────────────────────
import { porukeService } from '../api/services';

async function posaljiPoruku(formData) {
  const res = await porukeService.send({
    ime: formData.ime,
    email: formData.email,
    tekst: formData.tekst,
    tip_poruke_id: formData.tip_poruke_id,
  });
  return res.data;
}

// ─── NAPOMENA: Paginacija ──────────────────────────────────────────────────────
// Laravel vraća paginirane rezultate u obliku:
// {
//   data: [...],          ← array stavki
//   current_page: 1,
//   last_page: 5,
//   per_page: 10,
//   total: 47
// }
// Pristupaj stavkama sa: response.data.data
// Broj stranica sa:      response.data.last_page
