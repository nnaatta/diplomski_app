import { useState, useEffect, useRef } from "react";
import { api } from "../../pages/adminPage/services/api";
import "./Forms.css";

/* ================================================================
   HELPER KOMPONENTE
================================================================ */

function Field({ label, required, children }) {
  return (
    <div className="form-group">
      <label className="form-label">
        {label}{required && <span> *</span>}
      </label>
      {children}
    </div>
  );
}

function Select({ value, onChange, options, placeholder = "Odaberi..." }) {
  return (
    <select className="form-control" value={value} onChange={onChange}>
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

function SelectWithAdd({ value, onChange, options, placeholder, onAdd, onEdit }) {
  return (
    <div className="field-row">
      <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
        <Select value={value} onChange={onChange} options={options} placeholder={placeholder} />
      </div>
      {onEdit && (
        <button
          type="button"
          className="btn-add-inline"
          title="Uredi odabrano"
          onClick={onEdit}
          disabled={!value}
          style={{ background: value ? "#eaf3de" : "#f4f7f4", opacity: value ? 1 : 0.45 }}
        >✏️</button>
      )}
      <button type="button" className="btn-add-inline" title="Dodaj novi" onClick={onAdd}>+</button>
    </div>
  );
}

/* ================================================================
   NESTED MODALI
================================================================ */

function NestedModal({ title, onClose, children }) {
  return (
    <div
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.6)",
        zIndex: 199999,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: "#fff", borderRadius: "10px",
        boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
        width: "100%", maxWidth: "420px",
        zIndex: 200000,
      }}>
        <div style={{
          padding: "1.25rem 1.5rem 0.75rem",
          borderBottom: "1px solid #d4e6c3",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{ fontWeight: 700, color: "#344e41", fontSize: "1rem" }}>{title}</span>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "1.3rem", cursor: "pointer", color: "#6b7c6c" }}>×</button>
        </div>
        <div style={{ padding: "1.25rem 1.5rem" }}>{children}</div>
      </div>
    </div>
  );
}

function QuickAddModal({ title, endpoint, extraFields, onClose, onSaved }) {
  const fields = extraFields ?? [{ key: "naziv", label: "Naziv", required: true }];
  const [form, setForm] = useState(fields.reduce((acc, f) => ({ ...acc, [f.key]: "" }), {}));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const result = await api.post(endpoint, form);
      onSaved(result?.data ?? result);
      onClose();
    } catch (err) {
      setError(err.message ?? "Greška pri čuvanju");
    } finally {
      setSaving(false);
    }
  };

  return (
    <NestedModal title={title} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        {error && (
          <div style={{ background: "#fce4e4", border: "1px solid rgba(192,57,43,0.2)", borderRadius: "6px", padding: "0.6rem 0.9rem", color: "#c0392b", fontSize: "0.82rem", marginBottom: "1rem" }}>{error}</div>
        )}
        {fields.map((f) => (
          <div className="form-group" key={f.key}>
            <label className="form-label">{f.label}{f.required && <span> *</span>}</label>
            <input className="form-control" value={form[f.key]} onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))} required={f.required} autoFocus />
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "0.5rem" }}>
          <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>Odustani</button>
          <button type="submit" className="btn btn-primary btn-sm" disabled={saving}>{saving ? "Čuvanje..." : "Sačuvaj"}</button>
        </div>
      </form>
    </NestedModal>
  );
}

function QuickAddKontakt({ onClose, onSaved }) {
  const [form, setForm] = useState({ ime: "", prezime: "", br_telefona: "", uloga: "", email: "" });
  const [saving, setSaving] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const result = await api.post("/kontakt-osobe", form);
      onSaved(result?.data ?? result);
      onClose();
    } catch { setSaving(false); }
  };

  return (
    <NestedModal title="➕ Nova kontakt osoba" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Ime <span>*</span></label>
            <input className="form-control" value={form.ime} onChange={set("ime")} required autoFocus />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Prezime <span>*</span></label>
            <input className="form-control" value={form.prezime} onChange={set("prezime")} required />
          </div>
        </div>
        <div className="form-group" style={{ marginTop: "0.75rem" }}>
          <label className="form-label">Telefon <span>*</span></label>
          <input className="form-control" value={form.br_telefona} onChange={set("br_telefona")} required />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Uloga</label>
            <input className="form-control" value={form.uloga} onChange={set("uloga")} />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={form.email} onChange={set("email")} />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "1rem" }}>
          <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>Odustani</button>
          <button type="submit" className="btn btn-primary btn-sm" disabled={saving}>{saving ? "Čuvanje..." : "Sačuvaj"}</button>
        </div>
      </form>
    </NestedModal>
  );
}

function QuickAddLokacija({ onClose, onSaved }) {
  const [form, setForm] = useState({ naziv: "", adresa: "", lat: "", lng: "" });
  const [saving, setSaving] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const result = await api.post("/lokacije", { ...form, aktivan: true });
      onSaved(result?.data ?? result);
      onClose();
    } catch { setSaving(false); }
  };

  return (
    <NestedModal title="➕ Nova lokacija" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Naziv <span>*</span></label>
          <input className="form-control" value={form.naziv} onChange={set("naziv")} required autoFocus />
        </div>
        <div className="form-group">
          <label className="form-label">Adresa</label>
          <input className="form-control" value={form.adresa} onChange={set("adresa")} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Lat</label>
            <input type="number" step="any" className="form-control" value={form.lat} onChange={set("lat")} />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Lng</label>
            <input type="number" step="any" className="form-control" value={form.lng} onChange={set("lng")} />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "1rem" }}>
          <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>Odustani</button>
          <button type="submit" className="btn btn-primary btn-sm" disabled={saving}>{saving ? "Čuvanje..." : "Sačuvaj"}</button>
        </div>
      </form>
    </NestedModal>
  );
}


function QuickEditKontakt({ id, onClose, onSaved }) {
  const [form, setForm] = useState({ ime: "", prezime: "", br_telefona: "", uloga: "", email: "" });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  useEffect(() => {
    api.get(`/kontakt-osobe/${id}`)
      .then((res) => {
        const d = res?.data ?? res;
        setForm({
          ime:         d.ime         ?? "",
          prezime:     d.prezime     ?? "",
          br_telefona: d.br_telefona ?? "",
          uloga:       d.uloga       ?? "",
          email:       d.email       ?? "",
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const result = await api.put(`/kontakt-osobe/${id}`, form);
      onSaved(result?.data ?? result);
      onClose();
    } catch { setSaving(false); }
  };

  return (
    <NestedModal title="✏️ Uredi kontakt osobu" onClose={onClose}>
      {loading ? (
        <div style={{ textAlign: "center", padding: "1rem", color: "#6b7c6c" }}>Učitavanje...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Ime <span>*</span></label>
              <input className="form-control" value={form.ime} onChange={set("ime")} required autoFocus />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Prezime <span>*</span></label>
              <input className="form-control" value={form.prezime} onChange={set("prezime")} required />
            </div>
          </div>
          <div className="form-group" style={{ marginTop: "0.75rem" }}>
            <label className="form-label">Telefon <span>*</span></label>
            <input className="form-control" value={form.br_telefona} onChange={set("br_telefona")} required />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Uloga</label>
              <input className="form-control" value={form.uloga} onChange={set("uloga")} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={form.email} onChange={set("email")} />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "1rem" }}>
            <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>Odustani</button>
            <button type="submit" className="btn btn-primary btn-sm" disabled={saving}>{saving ? "Čuvanje..." : "Sačuvaj"}</button>
          </div>
        </form>
      )}
    </NestedModal>
  );
}

function QuickEditLokacija({ id, onClose, onSaved }) {
  const [form, setForm] = useState({ naziv: "", adresa: "", lat: "", lng: "" });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  useEffect(() => {
    api.get(`/lokacije/${id}`)
      .then((res) => {
        const d = res?.data ?? res;
        setForm({
          naziv:  d.naziv  ?? "",
          adresa: d.adresa ?? "",
          lat:    d.lat    ?? "",
          lng:    d.lng    ?? "",
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const result = await api.put(`/lokacije/${id}`, { ...form, aktivan: true });
      onSaved(result?.data ?? result);
      onClose();
    } catch { setSaving(false); }
  };

  return (
    <NestedModal title="✏️ Uredi lokaciju" onClose={onClose}>
      {loading ? (
        <div style={{ textAlign: "center", padding: "1rem", color: "#6b7c6c" }}>Učitavanje...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Naziv <span>*</span></label>
            <input className="form-control" value={form.naziv} onChange={set("naziv")} required autoFocus />
          </div>
          <div className="form-group">
            <label className="form-label">Adresa</label>
            <input className="form-control" value={form.adresa} onChange={set("adresa")} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Lat</label>
              <input type="number" step="any" className="form-control" value={form.lat} onChange={set("lat")} />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Lng</label>
              <input type="number" step="any" className="form-control" value={form.lng} onChange={set("lng")} />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "1rem" }}>
            <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>Odustani</button>
            <button type="submit" className="btn btn-primary btn-sm" disabled={saving}>{saving ? "Čuvanje..." : "Sačuvaj"}</button>
          </div>
        </form>
      )}
    </NestedModal>
  );
}

/* ================================================================
   PREPORUKE HRANE
================================================================ */

function QuickAddPreporukeHrane({ preporuke, onClose, onSave }) {
  const [lista, setLista] = useState([...preporuke]);
  const [unos, setUnos]   = useState("");
  const inputRef          = useRef();

  const dodaj = () => {
    const trim = unos.trim();
    if (!trim || lista.includes(trim)) return;
    setLista((prev) => [...prev, trim]);
    setUnos("");
    inputRef.current?.focus();
  };

  const ukloni = (i) => setLista((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <NestedModal title="🍽️ Preporuke hrane" onClose={onClose}>
      <div>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
          <input
            ref={inputRef}
            className="form-control"
            placeholder="Unesite jelo i pritisnite Enter..."
            value={unos}
            onChange={(e) => setUnos(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); dodaj(); } }}
            autoFocus
          />
          <button type="button" className="btn btn-primary btn-sm" onClick={dodaj}>Dodaj</button>
        </div>
        {lista.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1rem 0", maxHeight: "200px", overflowY: "auto" }}>
            {lista.map((naziv, i) => (
              <li key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.35rem 0.5rem", borderBottom: "1px solid #eee", fontSize: "0.9rem" }}>
                <span>🍴 {naziv}</span>
                <button type="button" onClick={() => ukloni(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#c0392b", fontSize: "1rem" }}>×</button>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ fontSize: "0.82rem", color: "#999", margin: "0 0 1rem 0" }}>Još nema preporuka.</p>
        )}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
          <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>Odustani</button>
          <button type="button" className="btn btn-primary btn-sm" onClick={() => { onSave(lista); onClose(); }}>Sačuvaj</button>
        </div>
      </div>
    </NestedModal>
  );
}

/* ================================================================
   UPLOAD UTILS
================================================================ */

const IMG_BASE = "http://localhost:8000";

/**
 * Normalizuj URL slike:
 * - null/undefined → ""
 * - već puni URL (http://...) → vrati kao jest
 * - relativna putanja (/storage/...) → dodaj IMG_BASE
 *
 * NAPOMENA: Ako koristiš React proxy (package.json "proxy": "http://localhost:8000")
 * onda postavi IMG_BASE = "" jer proxy preuzima sve /api i /storage requeste.
 * Bez proxy-a — ostavi IMG_BASE = "http://localhost:8000".
 */
function imgUrl(url) {
  if (!url) return "";
  // Već pun URL — vrati direktno
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  // Relativna putanja — dodaj base
  return IMG_BASE + (url.startsWith("/") ? url : "/" + url);
}

function parseSlike(res) {
  const obj = res?.data ?? res;
  const raw  = obj?.slike ?? [];
  const rezultat = raw.map((s) => ({
    id:     s.id,
    url:    s.url,
    glavna: Boolean(s.glavna),
  }));
  // DEBUG — ukloni nakon provjere URL-ova
  if (rezultat.length > 0) {
    console.log("[UploadSlike] Učitane slike iz baze:", rezultat.map(s => ({ id: s.id, url: s.url, imgUrl: imgUrl(s.url) })));
  }
  return rezultat;
}

/* ================================================================
   UPLOAD VIŠE SLIKA — smjestaj, restoran, blog, galerija

   NOVA LOGIKA (ispravlja sve bugove):
   - Slike se prikazuju odmah pri otvaranju uredi modala (parseSlike iz GET)
   - Nove slike se drže lokalno kao { _file: File, _preview: objectUrl }
     i NE uploadu se dok korisnik ne klikne Sačuvaj
   - Brisanje existujućih slika se samo označava lokalno (_delete: true)
     i izvršava se u bazi tek pri kliku Sačuvaj (handleSave u CrudPage)
   - Samo JEDNA slika može biti glavna u isto vrijeme
   - Nova slika dobija glavna=true samo ako nema nijedne postojeće
================================================================ */

export function UploadSlike({ entitetId, entitetTip, slike, setSlike }) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef();

  // Učitaj postojeće slike iz baze kad se modal otvori za uređivanje
  useEffect(() => {
    if (!entitetId) {
      setSlike([]);
      return;
    }
    const endpointMap = {
      smjestaj: (id) => `/smjestaji/${id}`,
      restoran: (id) => `/restorani/${id}`,
      blog:     (id) => `/blog-postovi/${id}`,
      galerija: (id) => `/galerije/${id}`,
    };
    const ep = endpointMap[entitetTip]?.(entitetId);
    if (!ep) return;
    api.get(ep)
      .then((res) => setSlike(parseSlike(res)))
      .catch(() => setSlike([]));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entitetId, entitetTip]);

  // Cleanup object URL-ova pri unmount
  useEffect(() => {
    return () => {
      slike.forEach((s) => { if (s._preview) URL.revokeObjectURL(s._preview); });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFiles = (files) => {
    if (!files?.length) return;
    const postojeceAktivne = slike.filter((s) => !s._delete);
    Array.from(files).forEach((file, i) => {
      const preview = URL.createObjectURL(file);
      // Prva nova slika postaje glavna samo ako nema nijedne postojeće aktivne
      const treba_biti_glavna = postojeceAktivne.length === 0 && i === 0;
      setSlike((prev) => {
        // Ako postavljamo ovu kao glavnu — skini glavna s ostalih
        const base = treba_biti_glavna
          ? prev.map((s) => ({ ...s, glavna: false }))
          : prev;
        return [...base, {
          id: null,
          url: null,
          glavna: treba_biti_glavna,
          _file: file,
          _preview: preview,
        }];
      });
    });
    if (inputRef.current) inputRef.current.value = "";
  };

  const postaviGlavnu = (idx) => {
    setSlike((prev) => prev.map((s, i) => ({ ...s, glavna: i === idx })));
  };

  // Označava sliku za brisanje (lokalno) — baze se ne dotiče do Sačuvaj
  const oznaciBrisanje = (idx) => {
    setSlike((prev) => {
      const updated = prev.map((s, i) => {
        if (i !== idx) return s;
        // Cleanup preview URL ako je nova (još ne uploadovana)
        if (s._preview) URL.revokeObjectURL(s._preview);
        return { ...s, _delete: true, glavna: false };
      });
      // Ako je obrisana bila glavna, a ima još aktivnih — postavi prvu kao glavnu
      const bilGlavna = prev[idx]?.glavna;
      if (bilGlavna) {
        const prvaAktivna = updated.findIndex((s) => !s._delete);
        if (prvaAktivna >= 0) {
          return updated.map((s, i) => ({ ...s, glavna: i === prvaAktivna }));
        }
      }
      return updated;
    });
  };

  // Vidljive slike = nisu označene za brisanje
  const vidljive = slike
    .map((s, idx) => ({ ...s, _idx: idx }))
    .filter((s) => !s._delete);

  return (
    <div className="upload-section">
      <div className="upload-section__title">🖼️ Slike</div>

      <div
        className={`upload-dropzone ${dragOver ? "drag-over" : ""}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
      >
        <div className="upload-dropzone__icon">📁</div>
        <div className="upload-dropzone__text">Klikni ili prevuci slike ovdje</div>
        <div className="upload-dropzone__hint">JPG, PNG, WEBP — max 5MB po slici</div>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          style={{ display: "none" }}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {vidljive.length > 0 && (
        <>
          <p style={{ fontSize: "0.75rem", color: "#6b7c6c", margin: "0.75rem 0 0.4rem" }}>
            ⭐ = postavi kao glavnu &nbsp;|&nbsp; 🗑️ = obriši
          </p>
          <div className="upload-preview">
            {vidljive.map((s) => (
              <div key={s._idx} className={`upload-preview__item ${s.glavna ? "glavna" : ""}`}>
                <img
                  src={s._preview ? s._preview : imgUrl(s.url)}
                  alt=""
                  onError={(e) => {
                    e.currentTarget.style.opacity = "0";
                    e.currentTarget.parentElement.style.background = "#e8f0e9";
                  }}
                />
                {s.glavna && (
                  <span className="upload-preview__glavna-badge">Glavna</span>
                )}
                {s._file && (
                  <span style={{
                    position: "absolute", bottom: 4, left: 4,
                    background: "rgba(52,78,65,0.85)", color: "#fff",
                    fontSize: "0.6rem", padding: "1px 5px", borderRadius: "3px",
                  }}>Nova</span>
                )}
                <div className="upload-preview__actions">
                  {!s.glavna && (
                    <button
                      className="upload-preview__btn"
                      title="Postavi kao glavnu"
                      onClick={() => postaviGlavnu(s._idx)}
                    >⭐</button>
                  )}
                  <button
                    className="upload-preview__btn"
                    title="Obriši sliku"
                    onClick={() => oznaciBrisanje(s._idx)}
                    style={{ color: "#c0392b" }}
                  >🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {!entitetId && (
        <p style={{ fontSize: "0.8rem", color: "#6b7c6c", background: "#fff8e1", padding: "0.6rem 0.9rem", borderRadius: "6px", border: "1px solid #ffeeba", marginTop: "0.5rem" }}>
          ℹ️ Slike će biti sačuvane zajedno s ostalim podacima.
        </p>
      )}
    </div>
  );
}

/* ================================================================
   UPLOAD JEDNA SLIKA — dogadjaj, turisticki sadrzaj (FK slika_id)

   NOVA LOGIKA:
   - Slika se čuva lokalno kao File objekat s preview URL-om
   - Upload se dešava u CrudPage.handleSave zajedno s ostalim podacima
   - Nema "Zamijeni" dugmeta — korisnik ukloni pa doda novu
================================================================ */

export function UploadJednaSlike({ slika, setSlika, entitetTip, entitetId }) {
  const inputRef = useRef();

  // Učitaj postojeću sliku kad se otvori uredi modal
  useEffect(() => {
    if (!entitetId) {
      setSlika(null);
      return;
    }
    const endpointMap = {
      turisticki_sadrzaj: (id) => `/turisticki-sadrzaji/${id}`,
      dogadjaj:           (id) => `/dogadjaji/${id}`,
    };
    const ep = endpointMap[entitetTip]?.(entitetId);
    if (!ep) return;
    api.get(ep)
      .then((res) => {
        const obj = res?.data ?? res;
        const niz = obj?.slike ?? [];
        setSlika(niz.length > 0 ? { id: niz[0].id, url: niz[0].url } : null);
      })
      .catch(() => setSlika(null));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entitetId, entitetTip]);

  // Cleanup object URL pri unmount / promjeni
  useEffect(() => {
    return () => {
      if (slika?._preview) URL.revokeObjectURL(slika._preview);
    };
  }, [slika?._preview]);

  const handleFile = (file) => {
    if (!file) return;
    // Ukloni stari preview ako postoji
    if (slika?._preview) URL.revokeObjectURL(slika._preview);
    setSlika({ id: null, url: null, _file: file, _preview: URL.createObjectURL(file) });
    if (inputRef.current) inputRef.current.value = "";
  };

  const ukloniSliku = () => {
    if (slika?._preview) URL.revokeObjectURL(slika._preview);
    // Za postojeće slike u bazi — označimo za brisanje
    setSlika(slika?.id ? { ...slika, _delete: true } : null);
  };

  // Prikaz kada je označena za brisanje
  const prikazSlika = slika && !slika._delete ? slika : null;

  return (
    <div className="upload-section">
      <div className="upload-section__title">🖼️ Slika</div>

      {prikazSlika ? (
        <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginTop: "0.5rem" }}>
          <img
            src={prikazSlika._preview ? prikazSlika._preview : imgUrl(prikazSlika.url)}
            alt=""
            onError={(e) => { e.currentTarget.style.opacity = "0.3"; }}
            style={{ width: "140px", height: "90px", objectFit: "cover", borderRadius: "6px", border: "2px solid #d4e6c3" }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {prikazSlika._file && (
              <span style={{ fontSize: "0.75rem", color: "#344e41", background: "#d4e6c3", padding: "2px 8px", borderRadius: "4px" }}>
                Nova slika
              </span>
            )}
            <button type="button" className="btn btn-danger btn-sm" onClick={ukloniSliku}>
              🗑️ Ukloni
            </button>
          </div>
        </div>
      ) : (
        <div
          className="upload-dropzone"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
          style={{ marginTop: "0.5rem" }}
        >
          <div className="upload-dropzone__icon">📁</div>
          <div className="upload-dropzone__text">Klikni ili prevuci sliku ovdje</div>
          <div className="upload-dropzone__hint">JPG, PNG, WEBP — max 5MB</div>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            style={{ display: "none" }}
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>
      )}
    </div>
  );
}

/* ================================================================
   SMJEŠTAJ FORMA
================================================================ */

export function SmjestajForm({ initial, onSubmit }) {
  const [form, setForm] = useState({
    naziv: "", opis: "", br_soba: "", br_lezajeva: "",
    aktivan: true, lokacija_id: "", tip_smjestaja_id: "",
    kontakt_osoba_id: "", pogodnosti: [],
    ...initial,
    pogodnosti: initial?.pogodnosti?.map(p => p.id ?? p) ?? [],
  });
  const [lokacije, setLokacije]     = useState([]);
  const [tipovi, setTipovi]         = useState([]);
  const [kontakti, setKontakti]     = useState([]);
  const [pogodnosti, setPogodnosti] = useState([]);
  const [slike, setSlike]           = useState([]);

  const [showAddLokacija,   setShowAddLokacija]   = useState(false);
  const [showEditLokacija,  setShowEditLokacija]  = useState(false);
  const [showAddTip,        setShowAddTip]        = useState(false);
  const [showAddKontakt,    setShowAddKontakt]    = useState(false);
  const [showEditKontakt,   setShowEditKontakt]   = useState(false);
  const [showAddPogodnost,  setShowAddPogodnost]  = useState(false);

  const loadData = () => {
    Promise.all([
      api.get("/lokacije"),
      api.get("/tipovi-smjestaja"),
      api.get("/kontakt-osobe"),
      api.get("/pogodnosti"),
    ]).then(([lok, tip, kon, pog]) => {
      setLokacije(lok.data ?? lok ?? []);
      setTipovi(tip.data ?? tip ?? []);
      setKontakti(kon.data ?? kon ?? []);
      setPogodnosti(pog.data ?? pog ?? []);
    });
  };

  useEffect(() => { loadData(); }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const togglePogodnost = (id) => setForm((f) => ({
    ...f,
    pogodnosti: f.pogodnosti.includes(id)
      ? f.pogodnosti.filter((p) => p !== id)
      : [...f.pogodnosti, id],
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataZaSlanje = { ...form };
    delete dataZaSlanje.slike;
    // Proslijedi slike CrudPage.handleSave — on će upload/brisanje odraditi
    await onSubmit(dataZaSlanje, slike);
  };

  return (
    <>
      <form id="crud-form" onSubmit={handleSubmit}>
        <div className="form-section-title">Osnovni podaci</div>
        <Field label="Naziv" required>
          <input className="form-control" value={form.naziv} onChange={set("naziv")} required />
        </Field>
        <Field label="Opis">
          <textarea className="form-control" value={form.opis} onChange={set("opis")} />
        </Field>
        <div className="form-grid">
          <Field label="Broj soba">
            <input type="number" min="0" className="form-control" value={form.br_soba} onChange={set("br_soba")} />
          </Field>
          <Field label="Broj ležajeva">
            <input type="number" min="0" className="form-control" value={form.br_lezajeva} onChange={set("br_lezajeva")} />
          </Field>
        </div>
        <div className="form-section-title">Veze</div>
        <div className="form-grid">
          <Field label="Tip smještaja">
            <SelectWithAdd value={form.tip_smjestaja_id} onChange={set("tip_smjestaja_id")}
              options={tipovi.map((t) => ({ value: t.id, label: t.naziv }))}
              placeholder="Odaberi tip..." onAdd={() => setShowAddTip(true)} />
          </Field>
          <Field label="Lokacija">
            <SelectWithAdd value={form.lokacija_id} onChange={set("lokacija_id")}
              options={lokacije.map((l) => ({ value: l.id, label: l.naziv }))}
              placeholder="Odaberi lokaciju..." onAdd={() => setShowAddLokacija(true)}
              onEdit={() => setShowEditLokacija(true)} />
          </Field>
        </div>
        <Field label="Kontakt osoba">
          <SelectWithAdd value={form.kontakt_osoba_id} onChange={set("kontakt_osoba_id")}
            options={kontakti.map((k) => ({ value: k.id, label: k.ime_prezime }))}
            placeholder="Odaberi kontakt osobu..." onAdd={() => setShowAddKontakt(true)}
            onEdit={() => setShowEditKontakt(true)} />
        </Field>
        <div className="form-section-title">Pogodnosti</div>
        <Field label="">
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "0.5rem" }}>
            <button type="button" className="btn btn-ghost btn-xs" onClick={() => setShowAddPogodnost(true)}>+ Nova pogodnost</button>
          </div>
          <div className="checkbox-group">
            {pogodnosti.map((p) => (
              <label key={p.id} className="checkbox-label">
                <input type="checkbox" checked={form.pogodnosti.includes(p.id)} onChange={() => togglePogodnost(p.id)} />
                {p.naziv}
              </label>
            ))}
          </div>
        </Field>
        <Field label="Status">
          <Select value={form.aktivan ? "1" : "0"}
            onChange={(e) => setForm((f) => ({ ...f, aktivan: e.target.value === "1" }))}
            options={[{ value: "1", label: "Aktivan" }, { value: "0", label: "Neaktivan" }]} />
        </Field>
        <UploadSlike entitetId={initial?.id ?? null} entitetTip="smjestaj" slike={slike} setSlike={setSlike} />
      </form>

      {showAddLokacija  && <QuickAddLokacija onClose={() => setShowAddLokacija(false)} onSaved={(n) => { loadData(); setForm((f) => ({ ...f, lokacija_id: n.id })); }} />}
      {showEditLokacija  && form.lokacija_id && <QuickEditLokacija id={form.lokacija_id} onClose={() => setShowEditLokacija(false)} onSaved={() => loadData()} />}
      {showAddTip       && <QuickAddModal title="➕ Novi tip smještaja" endpoint="/tipovi-smjestaja" onClose={() => setShowAddTip(false)} onSaved={(n) => { loadData(); setForm((f) => ({ ...f, tip_smjestaja_id: n.id })); }} />}
      {showAddKontakt   && <QuickAddKontakt onClose={() => setShowAddKontakt(false)} onSaved={(n) => { loadData(); setForm((f) => ({ ...f, kontakt_osoba_id: n.id })); }} />}
      {showEditKontakt  && form.kontakt_osoba_id && <QuickEditKontakt id={form.kontakt_osoba_id} onClose={() => setShowEditKontakt(false)} onSaved={() => loadData()} />}
      {showAddPogodnost && <QuickAddModal title="➕ Nova pogodnost" endpoint="/pogodnosti" extraFields={[{ key: "naziv", label: "Naziv", required: true }, { key: "ikona", label: "Ikona", required: false }]} onClose={() => setShowAddPogodnost(false)} onSaved={() => loadData()} />}
    </>
  );
}

/* ================================================================
   RESTORAN FORMA
================================================================ */

export function RestoranForm({ initial, onSubmit }) {
  const [form, setForm] = useState({
    naziv: "", opis: "", radno_vrijeme: "",
    aktivan: true, lokacija_id: "", kontakt_osoba_id: "",
    pogodnosti: [], preporuke_hrane: [],
    ...initial,
    pogodnosti:      initial?.pogodnosti?.map(p => p.id ?? p) ?? [],
    preporuke_hrane: initial?.preporuke_hrane ?? [],
  });
  const [lokacije, setLokacije]     = useState([]);
  const [kontakti, setKontakti]     = useState([]);
  const [pogodnosti, setPogodnosti] = useState([]);
  const [slike, setSlike]           = useState([]);

  const [showPreporuke,     setShowPreporuke]     = useState(false);
  const [showAddLokacija,   setShowAddLokacija]   = useState(false);
  const [showEditLokacija,  setShowEditLokacija]  = useState(false);
  const [showAddKontakt,    setShowAddKontakt]    = useState(false);
  const [showEditKontakt,   setShowEditKontakt]   = useState(false);
  const [showAddPogodnost,  setShowAddPogodnost]  = useState(false);

  const loadData = () => {
    Promise.all([api.get("/lokacije"), api.get("/kontakt-osobe"), api.get("/pogodnosti")])
      .then(([lok, kon, pog]) => {
        setLokacije(lok.data ?? lok ?? []);
        setKontakti(kon.data ?? kon ?? []);
        setPogodnosti(pog.data ?? pog ?? []);
      });
  };

  useEffect(() => { loadData(); }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const togglePogodnost = (id) => setForm((f) => ({
    ...f,
    pogodnosti: f.pogodnosti.includes(id) ? f.pogodnosti.filter((p) => p !== id) : [...f.pogodnosti, id],
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataZaSlanje = { ...form };
    delete dataZaSlanje.slike;
    await onSubmit(dataZaSlanje, slike);
  };

  return (
    <>
      <form id="crud-form" onSubmit={handleSubmit}>
        <div className="form-section-title">Osnovni podaci</div>
        <Field label="Naziv" required>
          <input className="form-control" value={form.naziv} onChange={set("naziv")} required />
        </Field>
        <Field label="Opis">
          <textarea className="form-control" value={form.opis} onChange={set("opis")} />
        </Field>
        <div className="form-grid">
          <Field label="Radno vrijeme">
            <input className="form-control" placeholder="08:00 – 22:00" value={form.radno_vrijeme} onChange={set("radno_vrijeme")} />
          </Field>
          <Field label="Preporuke hrane">
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "0.85rem", color: "#344e41", flex: 1 }}>
                {form.preporuke_hrane.length > 0
                  ? form.preporuke_hrane.join(", ")
                  : <em style={{ color: "#999" }}>Nema preporuka</em>}
              </span>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => setShowPreporuke(true)}>✏️ Uredi</button>
            </div>
          </Field>
        </div>
        <div className="form-section-title">Veze</div>
        <div className="form-grid">
          <Field label="Lokacija">
            <SelectWithAdd value={form.lokacija_id} onChange={set("lokacija_id")} options={lokacije.map((l) => ({ value: l.id, label: l.naziv }))} placeholder="Odaberi lokaciju..." onAdd={() => setShowAddLokacija(true)} onEdit={() => setShowEditLokacija(true)} />
          </Field>
          <Field label="Kontakt osoba">
            <SelectWithAdd value={form.kontakt_osoba_id} onChange={set("kontakt_osoba_id")} options={kontakti.map((k) => ({ value: k.id, label: k.ime_prezime }))} placeholder="Odaberi kontakt osobu..." onAdd={() => setShowAddKontakt(true)} onEdit={() => setShowEditKontakt(true)} />
          </Field>
        </div>
        <div className="form-section-title">Pogodnosti</div>
        <Field label="">
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "0.5rem" }}>
            <button type="button" className="btn btn-ghost btn-xs" onClick={() => setShowAddPogodnost(true)}>+ Nova pogodnost</button>
          </div>
          <div className="checkbox-group">
            {pogodnosti.map((p) => (
              <label key={p.id} className="checkbox-label">
                <input type="checkbox" checked={form.pogodnosti.includes(p.id)} onChange={() => togglePogodnost(p.id)} />
                {p.naziv}
              </label>
            ))}
          </div>
        </Field>
        <Field label="Status">
          <Select value={form.aktivan ? "1" : "0"} onChange={(e) => setForm((f) => ({ ...f, aktivan: e.target.value === "1" }))} options={[{ value: "1", label: "Aktivan" }, { value: "0", label: "Neaktivan" }]} />
        </Field>
        <UploadSlike entitetId={initial?.id ?? null} entitetTip="restoran" slike={slike} setSlike={setSlike} />
      </form>

      {showPreporuke    && <QuickAddPreporukeHrane preporuke={form.preporuke_hrane} onClose={() => setShowPreporuke(false)} onSave={(lista) => setForm((f) => ({ ...f, preporuke_hrane: lista }))} />}
      {showAddLokacija  && <QuickAddLokacija onClose={() => setShowAddLokacija(false)} onSaved={(n) => { loadData(); setForm((f) => ({ ...f, lokacija_id: n.id })); }} />}
      {showEditLokacija  && form.lokacija_id && <QuickEditLokacija id={form.lokacija_id} onClose={() => setShowEditLokacija(false)} onSaved={() => loadData()} />}
      {showAddKontakt   && <QuickAddKontakt onClose={() => setShowAddKontakt(false)} onSaved={(n) => { loadData(); setForm((f) => ({ ...f, kontakt_osoba_id: n.id })); }} />}
      {showEditKontakt  && form.kontakt_osoba_id && <QuickEditKontakt id={form.kontakt_osoba_id} onClose={() => setShowEditKontakt(false)} onSaved={() => loadData()} />}
      {showAddPogodnost && <QuickAddModal title="➕ Nova pogodnost" endpoint="/pogodnosti" extraFields={[{ key: "naziv", label: "Naziv", required: true }, { key: "ikona", label: "Ikona", required: false }]} onClose={() => setShowAddPogodnost(false)} onSaved={() => loadData()} />}
    </>
  );
}

/* ================================================================
   TURISTIČKI SADRŽAJ FORMA
================================================================ */

export function TuristickiSadrzajForm({ initial, onSubmit }) {
  const [form, setForm] = useState({
    naslov: "", opis: "", aktivan: true,
    lokacija_id:     String(initial?.lokacija_id     ?? ""),
    tip_sadrzaja_id: String(initial?.tip_sadrzaja_id ?? ""),
    duzina_staze:    initial?.duzina_staze ?? "",
    tezina:          initial?.tezina       ?? "",
    ...initial,
    lokacija_id:     String(initial?.lokacija_id     ?? ""),
    tip_sadrzaja_id: String(initial?.tip_sadrzaja_id ?? ""),
  });
  const [lokacije, setLokacije] = useState([]);
  const [tipovi,   setTipovi]   = useState([]);
  const [slika,    setSlika]    = useState(null);
  const [showAddLok, setShowAddLok] = useState(false);
  const [showAddTip, setShowAddTip] = useState(false);

  const load = () => Promise.all([api.get("/lokacije"), api.get("/tipovi-sadrzaja")])
    .then(([lok, tip]) => {
      setLokacije(lok.data ?? lok ?? []);
      setTipovi(tip.data ?? tip ?? []);
    });

  useEffect(() => { load(); }, []);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Proslijedi sliku kao drugi argument
    await onSubmit({ ...form }, slika ? [slika] : []);
  };

  return (
    <>
      <form id="crud-form" onSubmit={handleSubmit}>
        <div className="form-section-title">Osnovni podaci</div>
        <Field label="Naslov" required>
          <input className="form-control" value={form.naslov} onChange={set("naslov")} required />
        </Field>
        <Field label="Opis">
          <textarea className="form-control" value={form.opis} onChange={set("opis")} />
        </Field>
        <div className="form-section-title">Veze</div>
        <div className="form-grid">
          <Field label="Tip sadržaja">
            <SelectWithAdd value={form.tip_sadrzaja_id} onChange={set("tip_sadrzaja_id")}
              options={tipovi.map((t) => ({ value: t.id, label: t.naziv }))}
              placeholder="Odaberi tip..." onAdd={() => setShowAddTip(true)} />
          </Field>
          <Field label="Lokacija">
            <SelectWithAdd value={form.lokacija_id} onChange={set("lokacija_id")}
              options={lokacije.map((l) => ({ value: l.id, label: l.naziv }))}
              placeholder="Odaberi lokaciju..." onAdd={() => setShowAddLok(true)} />
          </Field>
        </div>
        <div className="form-section-title">Detalji staze</div>
        <div className="form-grid">
          <Field label="Dužina staze (km)">
            <input type="number" step="0.1" min="0" className="form-control" value={form.duzina_staze} onChange={set("duzina_staze")} placeholder="npr. 12.5" />
          </Field>
          <Field label="Težina">
            <div className="checkbox-group checkbox-group--row">
              {[{ value: "laka", label: "🟢 Laka" }, { value: "srednja", label: "🟡 Srednja" }, { value: "teska", label: "🔴 Teška" }].map((opt) => (
                <label key={opt.value} className="checkbox-label">
                  <input type="radio" name="tezina" checked={form.tezina === opt.value} onChange={() => setForm((f) => ({ ...f, tezina: opt.value }))} />
                  {opt.label}
                </label>
              ))}
            </div>
          </Field>
        </div>
        <Field label="Status">
          <Select value={form.aktivan ? "1" : "0"} onChange={(e) => setForm((f) => ({ ...f, aktivan: e.target.value === "1" }))} options={[{ value: "1", label: "Aktivan" }, { value: "0", label: "Neaktivan" }]} />
        </Field>
        <UploadJednaSlike slika={slika} setSlika={setSlika} entitetTip="turisticki_sadrzaj" entitetId={initial?.id ?? null} />
      </form>
      {showAddLok && <QuickAddLokacija onClose={() => setShowAddLok(false)} onSaved={(n) => { load(); setForm((f) => ({ ...f, lokacija_id: String(n.id) })); }} />}
      {showAddTip && <QuickAddModal title="➕ Novi tip sadržaja" endpoint="/tipovi-sadrzaja" onClose={() => setShowAddTip(false)} onSaved={(n) => { load(); setForm((f) => ({ ...f, tip_sadrzaja_id: String(n.id) })); }} />}
    </>
  );
}

/* ================================================================
   DOGAĐAJ FORMA
================================================================ */

export function DogadjajForm({ initial, onSubmit }) {
  const [form, setForm] = useState({
    naslov: "", opis: "", datum_od: "", datum_do: "", vrijeme: "",
    aktivan: true, lokacija_id: "", kategorija_id: "", kontakt_osoba_id: "",
    ...initial,
  });
  const [lokacije,   setLokacije]   = useState([]);
  const [kategorije, setKat]        = useState([]);
  const [kontakti,   setKontakti]   = useState([]);
  const [slika,      setSlika]      = useState(null);

  const [showAddLokacija, setShowAddLokacija] = useState(false);
  const [showAddKat,      setShowAddKat]      = useState(false);
  const [showAddKontakt,  setShowAddKontakt]  = useState(false);

  const loadData = () => {
    Promise.all([api.get("/lokacije"), api.get("/dogadjaj-kategorije"), api.get("/kontakt-osobe")])
      .then(([lok, kat, kon]) => {
        setLokacije(lok.data ?? lok ?? []);
        setKat(kat.data ?? kat ?? []);
        setKontakti(kon.data ?? kon ?? []);
      });
  };

  useEffect(() => { loadData(); }, []);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(form, slika ? [slika] : []);
  };

  return (
    <>
      <form id="crud-form" onSubmit={handleSubmit}>
        <div className="form-section-title">Osnovni podaci</div>
        <Field label="Naslov" required><input className="form-control" value={form.naslov} onChange={set("naslov")} required /></Field>
        <Field label="Opis"><textarea className="form-control" value={form.opis} onChange={set("opis")} /></Field>
        <div className="form-grid">
          <Field label="Datum od" required><input type="date" className="form-control" value={form.datum_od} onChange={set("datum_od")} required /></Field>
          <Field label="Datum do"><input type="date" className="form-control" value={form.datum_do} onChange={set("datum_do")} /></Field>
        </div>
        <Field label="Vrijeme"><input type="time" className="form-control" value={form.vrijeme} onChange={set("vrijeme")} /></Field>
        <div className="form-section-title">Veze</div>
        <div className="form-grid">
          <Field label="Kategorija">
            <SelectWithAdd value={form.kategorija_id} onChange={set("kategorija_id")} options={kategorije.map((k) => ({ value: k.id, label: k.naziv }))} placeholder="Odaberi kategoriju..." onAdd={() => setShowAddKat(true)} />
          </Field>
          <Field label="Lokacija">
            <SelectWithAdd value={form.lokacija_id} onChange={set("lokacija_id")} options={lokacije.map((l) => ({ value: l.id, label: l.naziv }))} placeholder="Odaberi lokaciju..." onAdd={() => setShowAddLokacija(true)} />
          </Field>
        </div>
        <Field label="Kontakt osoba">
          <SelectWithAdd value={form.kontakt_osoba_id} onChange={set("kontakt_osoba_id")} options={kontakti.map((k) => ({ value: k.id, label: k.ime_prezime }))} placeholder="Odaberi kontakt osobu..." onAdd={() => setShowAddKontakt(true)} />
        </Field>
        <Field label="Status">
          <Select value={form.aktivan ? "1" : "0"} onChange={(e) => setForm((f) => ({ ...f, aktivan: e.target.value === "1" }))} options={[{ value: "1", label: "Aktivan" }, { value: "0", label: "Neaktivan" }]} />
        </Field>
        <UploadJednaSlike slika={slika} setSlika={setSlika} entitetTip="dogadjaj" entitetId={initial?.id ?? null} />
      </form>

      {showAddLokacija && <QuickAddLokacija onClose={() => setShowAddLokacija(false)} onSaved={(n) => { loadData(); setForm((f) => ({ ...f, lokacija_id: n.id })); }} />}
      {showAddKat      && <QuickAddModal title="➕ Nova kategorija događaja" endpoint="/dogadjaj-kategorije" onClose={() => setShowAddKat(false)} onSaved={(n) => { loadData(); setForm((f) => ({ ...f, kategorija_id: n.id })); }} />}
      {showAddKontakt  && <QuickAddKontakt onClose={() => setShowAddKontakt(false)} onSaved={(n) => { loadData(); setForm((f) => ({ ...f, kontakt_osoba_id: n.id })); }} />}
    </>
  );
}

/* ================================================================
   BLOG POST FORMA
================================================================ */

export function BlogPostForm({ initial, onSubmit }) {
  const [form, setForm] = useState({
    naslov: "", tekst: "",
    aktivan: Boolean(initial?.aktivan ?? false),
    blog_kategorija_id: "",
    ...initial,
    aktivan: Boolean(initial?.aktivan ?? false),
  });
  const [kategorije, setKat]  = useState([]);
  const [slike, setSlike]     = useState([]);
  const [showAddKat, setShowAddKat] = useState(false);

  const loadData = () => { api.get("/blog-kategorije").then((d) => setKat(d.data ?? d ?? [])); };
  useEffect(() => { loadData(); }, []);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataZaSlanje = { ...form };
    delete dataZaSlanje.slike;
    await onSubmit(dataZaSlanje, slike);
  };

  return (
    <>
      <form id="crud-form" onSubmit={handleSubmit}>
        <div className="form-section-title">Osnovni podaci</div>
        <Field label="Naslov" required>
          <input className="form-control" value={form.naslov} onChange={set("naslov")} required />
        </Field>
        <Field label="Kategorija">
          <SelectWithAdd value={form.blog_kategorija_id} onChange={set("blog_kategorija_id")} options={kategorije.map((k) => ({ value: k.id, label: k.naziv }))} placeholder="Odaberi kategoriju..." onAdd={() => setShowAddKat(true)} />
        </Field>
        <Field label="Tekst" required>
          <textarea className="form-control" style={{ minHeight: "200px" }} value={form.tekst} onChange={set("tekst")} required />
        </Field>
        <Field label="Status">
          <Select
            value={form.aktivan ? "1" : "0"}
            onChange={(e) => setForm((f) => ({ ...f, aktivan: e.target.value === "1" }))}
            options={[{ value: "0", label: "Draft (neaktivan)" }, { value: "1", label: "Objavljen (aktivan)" }]}
          />
        </Field>
        <UploadSlike entitetId={initial?.id ?? null} entitetTip="blog" slike={slike} setSlike={setSlike} />
      </form>
      {showAddKat && <QuickAddModal title="➕ Nova kategorija bloga" endpoint="/blog-kategorije" onClose={() => setShowAddKat(false)} onSaved={(n) => { loadData(); setForm((f) => ({ ...f, blog_kategorija_id: n.id })); }} />}
    </>
  );
}

/* ================================================================
   GALERIJA FORMA
================================================================ */

export function GalerijaForm({ initial, onSubmit }) {
  const [form, setForm] = useState({ naslov: "", aktivan: true, kategorija_id: "", ...initial });
  const [kategorije, setKat] = useState([]);
  const [slike, setSlike]     = useState([]);
  const [showAddKat, setShowAddKat] = useState(false);

  const loadData = () => { api.get("/galerija-kategorije").then((d) => setKat(d.data ?? d ?? [])); };
  useEffect(() => { loadData(); }, []);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(form, slike);
  };

  return (
    <>
      <form id="crud-form" onSubmit={handleSubmit}>
        <div className="form-section-title">Osnovni podaci</div>
        <Field label="Naslov" required>
          <input className="form-control" value={form.naslov} onChange={set("naslov")} required />
        </Field>
        <Field label="Kategorija">
          <SelectWithAdd value={form.kategorija_id} onChange={set("kategorija_id")} options={kategorije.map((k) => ({ value: k.id, label: k.naziv }))} placeholder="Odaberi kategoriju..." onAdd={() => setShowAddKat(true)} />
        </Field>
        <Field label="Status">
          <Select value={form.aktivan ? "1" : "0"} onChange={(e) => setForm((f) => ({ ...f, aktivan: e.target.value === "1" }))} options={[{ value: "1", label: "Aktivan" }, { value: "0", label: "Neaktivan" }]} />
        </Field>
        <UploadSlike entitetId={initial?.id ?? null} entitetTip="galerija" slike={slike} setSlike={setSlike} />
      </form>
      {showAddKat && <QuickAddModal title="➕ Nova kategorija galerije" endpoint="/galerija-kategorije" onClose={() => setShowAddKat(false)} onSaved={(n) => { loadData(); setForm((f) => ({ ...f, kategorija_id: n.id })); }} />}
    </>
  );
}

/* ================================================================
   JEDNOSTAVNA FORMA (šifarnici)
================================================================ */

export function SimpleForm({ initial, onSubmit, fields = [{ key: "naziv", label: "Naziv", required: true }] }) {
  const [form, setForm] = useState(
    fields.reduce((acc, f) => ({ ...acc, [f.key]: initial?.[f.key] ?? "" }), {})
  );
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <form id="crud-form" onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}>
      {fields.map((f) => (
        <Field key={f.key} label={f.label} required={f.required}>
          <input className="form-control" value={form[f.key]} onChange={set(f.key)} required={f.required} />
        </Field>
      ))}
    </form>
  );
}