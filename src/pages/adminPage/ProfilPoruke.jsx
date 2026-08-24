import { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { api } from "./services/api";
import { Modal, Loading, Pagination } from "../../components/adminComponents/UI";

/* ===== PROFIL ===== */
export function Profil({ addToast }) {
  const { user } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [saving, setSaving] = useState(false);

  const handleChangePass = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      addToast("Lozinke se ne poklapaju", "error");
      return;
    }
    setSaving(true);
    try {
      await api.put("/me/password", {
        current_password: passwords.current,
        password: passwords.new,
        password_confirmation: passwords.confirm,
      });
      addToast("Lozinka uspješno promijenjena", "success");
      setShowPass(false);
      setPasswords({ current: "", new: "", confirm: "" });
    } catch {
      addToast("Greška pri promjeni lozinke", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px" }}>
      <div className="card" style={{ marginBottom: "1.25rem" }}>
        <div className="card-header">
          <span className="card-title">👤 Moj profil</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {[
            { label: "Ime i prezime",  value: user?.ime_prezime },
            { label: "Email",          value: user?.email },
            { label: "Zadnja prijava", value: user?.poslednji_login ?? "—" },
          ].map((r) => (
            <div
              key={r.label}
              style={{
                display: "flex", justifyContent: "space-between",
                padding: "0.6rem 0", borderBottom: "1px solid var(--clr-border)",
              }}
            >
              <span style={{ color: "var(--clr-muted)", fontSize: "0.85rem" }}>{r.label}</span>
              <span style={{ fontWeight: 600 }}>{r.value}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "1.5rem" }}>
          <button className="btn btn-outline" onClick={() => setShowPass(true)}>
            🔐 Promijeni lozinku
          </button>
        </div>
      </div>

      {showPass && (
        <Modal
          title="Promjena lozinke"
          onClose={() => setShowPass(false)}
          footer={
            <>
              <button className="btn btn-outline" onClick={() => setShowPass(false)}>Odustani</button>
              <button className="btn btn-primary" form="pass-form" type="submit" disabled={saving}>
                {saving ? "Čuvanje..." : "Sačuvaj"}
              </button>
            </>
          }
        >
          <form id="pass-form" onSubmit={handleChangePass}>
            {[
              { key: "current", label: "Trenutna lozinka" },
              { key: "new",     label: "Nova lozinka"     },
              { key: "confirm", label: "Potvrdi novu lozinku" },
            ].map((f) => (
              <div className="form-group" key={f.key}>
                <label className="form-label">{f.label} <span>*</span></label>
                <input
                  type="password"
                  className="form-control"
                  value={passwords[f.key]}
                  onChange={(e) => setPasswords((p) => ({ ...p, [f.key]: e.target.value }))}
                  required
                />
              </div>
            ))}
          </form>
        </Modal>
      )}
    </div>
  );
}

/* ===== PORUKE ===== */
export function Poruke({ addToast }) {
  const [poruke, setPoruke]     = useState([]);
  const [meta, setMeta]         = useState(null);
  const [page, setPage]         = useState(1);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState(null);

  const load = () => {
    setLoading(true);
    api.get(`/poruke?page=${page}`)
      .then((d) => { setPoruke(d.data ?? []); setMeta(d.meta ?? null); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [page]);

  const promijeniStatus = async (id, status) => {
    try {
      await api.patch(`/poruke/${id}/status`, { status });
      addToast("Status promijenjen", "success");
      load();
      if (selected?.id === id) setSelected((p) => ({ ...p, status }));
    } catch {
      addToast("Greška", "error");
    }
  };

  const obrisi = async (id) => {
    try {
      await api.delete(`/poruke/${id}`);
      addToast("Poruka obrisana", "success");
      setSelected(null);
      load();
    } catch {
      addToast("Greška pri brisanju", "error");
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <span className="card-title">✉️ Poruke</span>
          <span style={{ fontSize: "0.8rem", color: "var(--clr-muted)" }}>
            {meta?.total ?? 0} poruka
          </span>
        </div>

        {loading ? <Loading /> : (
          <>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Od</th><th>Naslov</th><th>Datum</th><th>Status</th><th>Akcije</th>
                  </tr>
                </thead>
                <tbody>
                  {poruke.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{p.ime_prezime}</div>
                        <div style={{ fontSize: "0.78rem", color: "var(--clr-muted)" }}>{p.email}</div>
                      </td>
                      <td>{p.naslov}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{p.datum}</td>
                      <td><span className={`badge badge-${p.status}`}>{p.status}</span></td>
                      <td>
                        <div style={{ display: "flex", gap: "0.4rem" }}>
                          <button className="btn btn-outline btn-sm" onClick={() => setSelected(p)}>
                            👁️ Vidi
                          </button>
                          <button className="btn btn-danger btn-sm" onClick={() => obrisi(p.id)}>
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination meta={meta} onPageChange={setPage} />
          </>
        )}
      </div>

      {selected && (
        <Modal title={`Poruka — ${selected.naslov}`} onClose={() => setSelected(null)}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", fontSize: "0.85rem" }}>
              <div><span style={{ color: "var(--clr-muted)" }}>Od:</span> <strong>{selected.ime_prezime}</strong></div>
              <div><span style={{ color: "var(--clr-muted)" }}>Email:</span> <strong>{selected.email}</strong></div>
              <div><span style={{ color: "var(--clr-muted)" }}>Telefon:</span> <strong>{selected.br_tel ?? "—"}</strong></div>
              <div><span style={{ color: "var(--clr-muted)" }}>Datum:</span> <strong>{selected.datum}</strong></div>
            </div>
            <div style={{
              background: "var(--clr-pale)", borderRadius: "var(--radius-sm)",
              padding: "1rem", fontSize: "0.9rem", lineHeight: 1.7,
            }}>
              {selected.tekst}
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {["novo", "procitano", "odgovoreno"].map((s) => (
                <button
                  key={s}
                  className={`btn btn-sm ${selected.status === s ? "btn-primary" : "btn-outline"}`}
                  onClick={() => promijeniStatus(selected.id, s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}