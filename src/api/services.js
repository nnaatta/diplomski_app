import api from './axios';

// ─── SMJEŠTAJ ────────────────────────────────────────────────────────────────
export const smjestajService = {
  getAll: (params) => api.get('/smjestaji', { params }),         // ?aktivan=1&tip_smjestaja_id=2&page=1
  getOne: (id) => api.get(`/smjestaji/${id}`),
  create: (data) => api.post('/smjestaji', data),
  update: (id, data) => api.put(`/smjestaji/${id}`, data),
  delete: (id) => api.delete(`/smjestaji/${id}`),
};

// ─── RESTORANI ───────────────────────────────────────────────────────────────
export const restoraniService = {
  getAll: (params) => api.get('/restorani', { params }),
  getOne: (id) => api.get(`/restorani/${id}`),
  create: (data) => api.post('/restorani', data),
  update: (id, data) => api.put(`/restorani/${id}`, data),
  delete: (id) => api.delete(`/restorani/${id}`),
};

// ─── TURISTIČKI SADRŽAJI ──────────────────────────────────────────────────────
export const turistickiSadrzajiService = {
  getAll: (params) => api.get('/turisticki-sadrzaji', { params }),
  getOne: (id) => api.get(`/turisticki-sadrzaji/${id}`),
  create: (data) => api.post('/turisticki-sadrzaji', data),
  update: (id, data) => api.put(`/turisticki-sadrzaji/${id}`, data),
  delete: (id) => api.delete(`/turisticki-sadrzaji/${id}`),
};

// ─── DOGAĐAJI ────────────────────────────────────────────────────────────────
export const dogadjajiService = {
  getAll: (params) => api.get('/dogadjaji', { params }),
  getOne: (id) => api.get(`/dogadjaji/${id}`),
  create: (data) => api.post('/dogadjaji', data),
  update: (id, data) => api.put(`/dogadjaji/${id}`, data),
  delete: (id) => api.delete(`/dogadjaji/${id}`),
};

// ─── BLOG ─────────────────────────────────────────────────────────────────────
export const blogService = {
  getAll: (params) => api.get('/blog-postovi', { params }),
  getOne: (id) => api.get(`/blog-postovi/${id}`),
  create: (data) => api.post('/blog-postovi', data),
  update: (id, data) => api.put(`/blog-postovi/${id}`, data),
  delete: (id) => api.delete(`/blog-postovi/${id}`),
  toggleAktivan: (id) => api.patch(`/blog-postovi/${id}/toggle`),
};

// ─── GALERIJA ─────────────────────────────────────────────────────────────────
export const galerijaService = {
  getAll: (params) => api.get('/galerije', { params }),
  getOne: (id) => api.get(`/galerije/${id}`),
  create: (data) => api.post('/galerije', data),
  update: (id, data) => api.put(`/galerije/${id}`, data),
  delete: (id) => api.delete(`/galerije/${id}`),
};

// ─── PORUKE ───────────────────────────────────────────────────────────────────
export const porukeService = {
  getAll: (params) => api.get('/poruke', { params }),            // admin only
  getOne: (id) => api.get(`/poruke/${id}`),                     // admin only
  send: (data) => api.post('/poruke', data),                    // javno (kontakt forma)
  promijeniStatus: (id, status) => api.patch(`/poruke/${id}/status`, { status }),
  delete: (id) => api.delete(`/poruke/${id}`),
};

// ─── SLIKE ────────────────────────────────────────────────────────────────────
export const slikeService = {
  // data mora biti FormData objekat sa poljem 'slika' i 'tip'/'tip_id'
  upload: (formData) =>
    api.post('/slike/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  postaviGlavnu: (id) => api.patch(`/slike/${id}/glavna`),
  delete: (id) => api.delete(`/slike/${id}`),
};

// ─── ŠIFARNICI (javni + admin CRUD) ──────────────────────────────────────────
export const tipoviSmjestajaService = {
  getAll: () => api.get('/tipovi-smjestaja'),
  create: (data) => api.post('/tipovi-smjestaja', data),
  update: (id, data) => api.put(`/tipovi-smjestaja/${id}`, data),
  delete: (id) => api.delete(`/tipovi-smjestaja/${id}`),
};

export const tipoviSadrzajaService = {
  getAll: () => api.get('/tipovi-sadrzaja'),
  create: (data) => api.post('/tipovi-sadrzaja', data),
  update: (id, data) => api.put(`/tipovi-sadrzaja/${id}`, data),
  delete: (id) => api.delete(`/tipovi-sadrzaja/${id}`),
};

export const dogadjajKategorijeService = {
  getAll: () => api.get('/dogadjaj-kategorije'),
  create: (data) => api.post('/dogadjaj-kategorije', data),
  update: (id, data) => api.put(`/dogadjaj-kategorije/${id}`, data),
  delete: (id) => api.delete(`/dogadjaj-kategorije/${id}`),
};

export const blogKategorijeService = {
  getAll: () => api.get('/blog-kategorije'),
  create: (data) => api.post('/blog-kategorije', data),
  update: (id, data) => api.put(`/blog-kategorije/${id}`, data),
  delete: (id) => api.delete(`/blog-kategorije/${id}`),
};

export const galerijaKategorijeService = {
  getAll: () => api.get('/galerija-kategorije'),
  create: (data) => api.post('/galerija-kategorije', data),
  update: (id, data) => api.put(`/galerija-kategorije/${id}`, data),
  delete: (id) => api.delete(`/galerija-kategorije/${id}`),
};

export const pogodnostiService = {
  getAll: () => api.get('/pogodnosti'),
  create: (data) => api.post('/pogodnosti', data),
  update: (id, data) => api.put(`/pogodnosti/${id}`, data),
  delete: (id) => api.delete(`/pogodnosti/${id}`),
};

export const tipoviPorukeService = {
  getAll: () => api.get('/tipovi-poruke'),
  create: (data) => api.post('/tipovi-poruke', data),
  update: (id, data) => api.put(`/tipovi-poruke/${id}`, data),
  delete: (id) => api.delete(`/tipovi-poruke/${id}`),
};

export const lokacijeService = {
  getAll: () => api.get('/lokacije'),
  getOne: (id) => api.get(`/lokacije/${id}`),
  create: (data) => api.post('/lokacije', data),
  update: (id, data) => api.put(`/lokacije/${id}`, data),
  delete: (id) => api.delete(`/lokacije/${id}`),
};

export const kontaktOsobeService = {
  getAll: () => api.get('/kontakt-osobe'),
  getOne: (id) => api.get(`/kontakt-osobe/${id}`),
  create: (data) => api.post('/kontakt-osobe', data),
  update: (id, data) => api.put(`/kontakt-osobe/${id}`, data),
  delete: (id) => api.delete(`/kontakt-osobe/${id}`),
};
