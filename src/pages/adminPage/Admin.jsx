import { useState, useCallback } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AdminSidebar from "../../components/adminComponents/AdminSidebar";
import { Toast, StatusBadge } from "../../components/adminComponents/UI";
import CrudPage from "../../components/adminComponents/CrudPage";
import {
  SmjestajForm, RestoranForm, TuristickiSadrzajForm,
  DogadjajForm, BlogPostForm, GalerijaForm, SimpleForm
} from "../../components/adminComponents/Forms";
import { Profil, Poruke } from "./ProfilPoruke";
import Dashboard from "./Dashboard";
import Login from "./Login";
import "./Admin.css";
import { IoBed, IoRestaurantOutline, IoCalendarOutline, IoImages } from "react-icons/io5";
import { MdNordicWalking } from "react-icons/md";
import { LuNotebookText } from "react-icons/lu";

/* ===== TOAST HOOK ===== */
function useToast() {
  const [toasts, setToasts] = useState([]);
  const addToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);
  const removeToast = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);
  return { toasts, addToast, removeToast };
}

/* ===== ŠIFARNICI STRANICA ===== */
function SifarniciPage({ addToast }) {
  const [active, setActive] = useState("tipovi-smjestaja");

  const SIFARNICI = [
    { key: "tipovi-smjestaja",    label: "Tipovi smještaja",    endpoint: "/tipovi-smjestaja"    },
    { key: "tipovi-sadrzaja",     label: "Tipovi sadržaja",     endpoint: "/tipovi-sadrzaja"     },
    { key: "dogadjaj-kategorije", label: "Kategorije događaja", endpoint: "/dogadjaj-kategorije" },
    { key: "blog-kategorije",     label: "Kategorije bloga",    endpoint: "/blog-kategorije"     },
    { key: "galerija-kategorije", label: "Kategorije galerije", endpoint: "/galerija-kategorije" },
    { key: "tipovi-poruke",       label: "Tipovi poruke",       endpoint: "/tipovi-poruke"       },
    {
      key: "pogodnosti", label: "Pogodnosti", endpoint: "/pogodnosti",
      fields: [
        { key: "naziv", label: "Naziv", required: true },
        { key: "ikona", label: "Ikona (npr. wifi, parking)", required: false },
      ],
    },
  ];

  const current = SIFARNICI.find((s) => s.key === active);

  return (
    <div style={{ display: "flex", gap: "1.5rem" }}>
      <div style={{ width: "220px", flexShrink: 0 }}>
        <div className="card" style={{ padding: "0.5rem" }}>
          {SIFARNICI.map((s) => (
            <button
              key={s.key}
              onClick={() => setActive(s.key)}
              style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "0.6rem 0.85rem", border: "none",
                borderRadius: "6px",
                background: active === s.key ? "#eaf3de" : "transparent",
                color: active === s.key ? "#344e41" : "#6b7c6c",
                fontWeight: active === s.key ? 700 : 400,
                fontSize: "0.85rem", cursor: "pointer", marginBottom: "0.15rem",
                transition: "all 0.15s",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1 }}>
        {current && (
          <CrudPage
            key={current.key}
            title={current.label}
            icon="⚙️"
            endpoint={current.endpoint}
            addToast={addToast}
            FormComponent={(props) => (
              <SimpleForm
                {...props}
                fields={current.fields ?? [{ key: "naziv", label: "Naziv", required: true }]}
              />
            )}
            columns={[
              { key: "naziv", label: "Naziv" },
              ...(current.fields?.find((f) => f.key === "ikona")
                ? [{ key: "ikona", label: "Ikona", render: (r) => r.ikona ?? "—" }]
                : []),
            ]}
            emptyMessage={`Nema ${current.label.toLowerCase()}`}
          />
        )}
      </div>
    </div>
  );
}

/* ===== KONFIGURACIJA STRANICA ===== */
function getPages(addToast) {
  return {
    dashboard: {
      title: "Dashboard", subtitle: "Pregled sistema",
      component: (setPage) => <Dashboard setPage={setPage} />,
    },
    profil: {
      title: "Moj profil", subtitle: "Podešavanja naloga",
      component: () => <Profil addToast={addToast} />,
    },
    smjestaj: {
      title: "Smještaj", subtitle: "Upravljanje smještajnim objektima",
      component: () => (
        <CrudPage
          title="Smještaj" icon={<IoBed />} endpoint="/smjestaji"
          addToast={addToast} FormComponent={SmjestajForm}
          emptyMessage="Nema smještajnih objekata"
          columns={[
            { key: "naziv",         label: "Naziv" },
            { key: "br_soba",       label: "Sobe",      render: (r) => r.br_soba ?? "—" },
            { key: "br_lezajeva",   label: "Ležajevi",  render: (r) => r.br_lezajeva ?? "—" },
            { key: "lokacija",      label: "Lokacija",  render: (r) => r.lokacija?.naziv ?? "—" },
            { key: "tip_smjestaja", label: "Tip",       render: (r) => r.tip_smjestaja?.naziv ?? "—" },
            { key: "aktivan",       label: "Status",    render: (r) => <StatusBadge aktivan={r.aktivan} /> },
          ]}
        />
      ),
    },
    restorani: {
      title: "Restorani", subtitle: "Upravljanje restoranima",
      component: () => (
        <CrudPage
          title="Restorani" icon={<IoRestaurantOutline />} endpoint="/restorani"
          addToast={addToast} FormComponent={RestoranForm}
          emptyMessage="Nema restorana"
          columns={[
            { key: "naziv",           label: "Naziv" },
            { key: "hrana_preporuka", label: "Preporuka",     render: (r) => r.hrana_preporuka ?? "—" },
            { key: "radno_vrijeme",   label: "Radno vrijeme", render: (r) => r.radno_vrijeme ?? "—" },
            { key: "lokacija",        label: "Lokacija",      render: (r) => r.lokacija?.naziv ?? "—" },
            { key: "aktivan",         label: "Status",        render: (r) => <StatusBadge aktivan={r.aktivan} /> },
          ]}
        />
      ),
    },
    "turisticki-sadrzaj": {
      title: "Turističke staze i sadržaji", subtitle: "Pješačke, biciklističke i planinarske staze",
      component: () => (
        <CrudPage
          title="Turistički sadržaji" icon={<MdNordicWalking />} endpoint="/turisticki-sadrzaji"
          addToast={addToast} FormComponent={TuristickiSadrzajForm}
          emptyMessage="Nema turističkih sadržaja"
          columns={[
            { key: "naslov",       label: "Naslov" },
            { key: "tip_sadrzaja", label: "Tip",      render: (r) => r.tip_sadrzaja?.naziv ?? "—" },
            { key: "lokacija",     label: "Lokacija", render: (r) => r.lokacija?.naziv ?? "—" },
            { key: "aktivan",      label: "Status",   render: (r) => <StatusBadge aktivan={r.aktivan} /> },
          ]}
        />
      ),
    },
    dogadjaji: {
      title: "Događaji", subtitle: "Upravljanje manifestacijama i događajima",
      component: () => (
        <CrudPage
          title="Događaji" icon={<IoCalendarOutline />} endpoint="/dogadjaji"
          addToast={addToast} FormComponent={DogadjajForm}
          emptyMessage="Nema događaja"
          columns={[
            { key: "naslov",     label: "Naslov" },
            { key: "datum_od",   label: "Datum od" },
            { key: "datum_do",   label: "Datum do",   render: (r) => r.datum_do ?? "—" },
            { key: "lokacija",   label: "Lokacija",   render: (r) => r.lokacija?.naziv ?? "—" },
            { key: "kategorija", label: "Kategorija", render: (r) => r.kategorija?.naziv ?? "—" },
            { key: "aktivan",    label: "Status",     render: (r) => <StatusBadge aktivan={r.aktivan} /> },
          ]}
        />
      ),
    },
    blog: {
      title: "Blog", subtitle: "Upravljanje blog postovima",
      component: () => (
        <CrudPage
          title="Blog postovi" icon={<LuNotebookText />} endpoint="/blog-postovi"
          addToast={addToast} FormComponent={BlogPostForm}
          emptyMessage="Nema blog postova"
          columns={[
            { key: "naslov",     label: "Naslov" },
            { key: "kategorija", label: "Kategorija", render: (r) => r.kategorija?.naziv ?? "—" },
            { key: "aktivan",    label: "Status",
              render: (r) => <StatusBadge aktivan={r.aktivan} />,
            },
            { key: "created_at", label: "Kreirano" },
          ]}
        />
      ),
    },
    galerija: {
      title: "Galerija", subtitle: "Upravljanje galerijama slika",
      component: () => (
        <CrudPage
          title="Galerije" icon={<IoImages />} endpoint="/galerije"
          addToast={addToast} FormComponent={GalerijaForm}
          emptyMessage="Nema galerija"
          columns={[
            { key: "naslov",     label: "Naslov" },
            { key: "kategorija", label: "Kategorija", render: (r) => r.kategorija?.naziv ?? "—" },
            { key: "aktivan",    label: "Status",     render: (r) => <StatusBadge aktivan={r.aktivan} /> },
          ]}
        />
      ),
    },
    poruke: {
      title: "Poruke", subtitle: "Poruke posjetioca",
      component: () => <Poruke addToast={addToast} />,
    },
    sifarnici: {
      title: "Šifarnici", subtitle: "Upravljanje šifarnicima",
      component: () => <SifarniciPage addToast={addToast} />,
    },
  };
}

/* ===== ADMIN APP ===== */
function AdminApp() {
  const { user, loading } = useAuth();
  const [page, setPage] = useState("dashboard");
  const { toasts, addToast, removeToast } = useToast();

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <div className="loading-spinner" />
      </div>
    );
  }

  if (!user) return <Login />;

  const pages   = getPages(addToast);
  const current = pages[page] ?? pages.dashboard;

  return (
    <div className="admin-layout">
      <AdminSidebar activePage={page} setPage={setPage} />
      <main className="admin-main">
        <div className="topbar">
          <div>
            <div className="topbar__title">{current.title}</div>
            <div className="topbar__subtitle">{current.subtitle}</div>
          </div>
        </div>
        <div className="admin-content">
          {current.component(setPage)}
        </div>
      </main>
      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default function Admin() {
  return (
    <AuthProvider>
      <AdminApp />
    </AuthProvider>
  );
}