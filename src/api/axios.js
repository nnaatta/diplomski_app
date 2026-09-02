import axios from 'axios';

// Adresa backend API-ja se čita iz environment varijable (.env fajl),
// umjesto da bude fiksno upisana u kod. Ovo omogućava da se ista
// aplikacija ponaša drugačije lokalno (localhost) i na produkciji
// (pravi domen), bez izmjene koda — samo se mijenja .env fajl.
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Automatski dodaj token na svaki zahtjev
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Automatska odjava ako token istekne (401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;