import { useState, useEffect, useCallback } from "react";
import { api } from "../../pages/adminPage/services/api";
import { Modal, ConfirmModal, Pagination, Loading, Empty } from "./UI";
import "./CrudePage.css";

/**
 * Mapiranje endpoint → entitet_tip koji backend očekuje u SlikaController
 * Pivot tabele:  smjestaj, restoran, blog, galerija  → više slika (UploadSlike)
 * Direktan FK:   dogadjaj, turisticki_sadrzaj         → jedna slika (UploadJednaSlike)
 */
const ENDPOINT_TIP_MAP = {
  "smjestaji":            "smjestaj",
  "restorani":            "restoran",
  "blog-postovi":         "blog",
  "galerije":             "galerija",
  "dogadjaji":            "dogadjaj",
  "turisticki-sadrzaji":  "turisticki_sadrzaj",
};

// Da li entitet koristi pivot tabelu (više slika) ili direktan FK (jedna slika)
const PIVOT_TIPOVI = new Set(["smjestaj", "restoran", "blog", "galerija"]);

export default function CrudPage({
  title,
  icon,
  endpoint,         // npr. "/smjestaji"
  columns,
  FormComponent,
  emptyMessage = "Nema podataka",
  addToast,
}) {
  const [items, setItems]       = useState([]);
  const [meta, setMeta]         = useState(null);
  const [page, setPage]         = useState(1);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing]   = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [saving, setSaving]     = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    api.get(`${endpoint}?page=${page}`)
      .then((d) => {
        if (Array.isArray(d)) {
          setItems(d);
          setMeta(null);
        } else {
          setItems(d.data ?? []);
          setMeta(d.meta ?? null);
        }
      })
      .catch(() => addToast?.("Greška pri učitavanju podataka.", "error"))
      .finally(() => setLoading(false));
  }, [endpoint, page, addToast]);

  useEffect(() => { load(); }, [load]);

  const filtered = items.filter((item) =>
    Object.values(item).some((v) =>
      String(v ?? "").toLowerCase().includes(search.toLowerCase())
    )
  );

  /**
   * handleSave — poziva ga forma pri submitu
   *
   * @param {object}  data   JSON podaci forme (bez slika)
   * @param {Array}   slike  Niz objekata slika iz UploadSlike/UploadJednaSlike:
   *   - Postojeća slika: { id, url, glavna, _delete? }
   *   - Nova slika:      { id: null, url: null, glavna, _file: File, _preview: string }
   *
   * Tok:
   *   1. POST/PUT osnovnih JSON podataka → dobijemo entitet s ID-jem
   *   2. Obriši označene slike (_delete: true) iz baze
   *   3. Uploaduj nove slike (_file postoji)
   *   4. Ažuriraj glavna na serveru ako se promijenila
   *   5. Zatvori modal, refreshaj listu
   */
  const handleSave = async (data, slike = []) => {
    setSaving(true);
    try {
      // 1. Sačuvaj osnovne podatke
      const result = editing
        ? await api.put(`${endpoint}/${editing.id}`, data)
        : await api.post(endpoint, data);

      const entitetId = result?.data?.id ?? result?.id ?? editing?.id ?? null;
      const tip = ENDPOINT_TIP_MAP[endpoint.replace(/^\//, "")] ?? null;

      if (entitetId && tip && slike.length > 0) {
        const jePivot = PIVOT_TIPOVI.has(tip);

        if (jePivot) {
          // ── PIVOT TIP (smjestaj, restoran, blog, galerija) ──────────

          // 2a. Obriši označene slike
          const zaObrisati = slike.filter((s) => s._delete && s.id);
          for (const s of zaObrisati) {
            await api.delete(`/slike/${s.id}?entitet_tip=${tip}&entitet_id=${entitetId}`);
          }

          // 3a. Uploaduj nove slike
          const noveSlika = slike.filter((s) => s._file && !s._delete);
          if (noveSlika.length > 0) {
            const formData = new FormData();
            noveSlika.forEach((s) => formData.append("slike[]", s._file));
            formData.append("entitet_tip", tip);
            formData.append("entitet_id", String(entitetId));

            // Pronađi koja nova slika treba biti glavna
            const glavnaIdx = noveSlika.findIndex((s) => s.glavna);
            // Postavi glavna_index samo ako treba — inače backend ne dotiče glavna flag
            // Ako nema ni jedne stare aktivne slike, prva nova treba biti glavna
            const postojeceAktivne = slike.filter((s) => !s._delete && !s._file && s.id);
            if (postojeceAktivne.length === 0 || glavnaIdx >= 0) {
              formData.append("glavna_index", String(Math.max(0, glavnaIdx)));
            } else {
              // Ne postavljamo ni jednu novu kao glavnu — već postoji glavna
              formData.append("glavna_index", "-1");
            }
            await api.upload("/slike/upload", formData);
          }

          // 4a. Ažuriraj glavna za postojeće slike ako se promijenila
          const postojecaGlavna = slike.find((s) => !s._delete && !s._file && s.id && s.glavna);
          if (postojecaGlavna) {
            await api.patch(`/slike/${postojecaGlavna.id}/glavna`, {
              entitet_tip: tip,
              entitet_id: entitetId,
            });
          }

        } else {
          // ── FK TIP (dogadjaj, turisticki_sadrzaj) ───────────────────
          const slikaObj = slike[0] ?? null;

          if (slikaObj?._delete && slikaObj?.id) {
            // Obriši staru sliku
            await api.delete(`/slike/${slikaObj.id}?entitet_tip=${tip}&entitet_id=${entitetId}`);
          } else if (slikaObj?._file) {
            // Upload nove slike
            const formData = new FormData();
            formData.append("slike[]", slikaObj._file);
            formData.append("entitet_tip", tip);
            formData.append("entitet_id", String(entitetId));
            formData.append("glavna_index", "0");
            await api.upload("/slike/upload", formData);
          }
        }
      }

      addToast?.(editing ? "Uspješno ažurirano." : "Uspješno kreirano.", "success");
      setShowForm(false);
      setEditing(null);
      load();
    } catch (err) {
      const msg = err?.response?.data?.message
        ?? err?.message
        ?? "Greška pri čuvanju. Pokušajte ponovo.";
      addToast?.(msg, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`${endpoint}/${deleting.id}`);
      addToast?.("Uspješno obrisano.", "success");
      setDeleting(null);
      load();
    } catch {
      addToast?.("Greška pri brisanju.", "error");
    }
  };

  return (
    <div>
      {/* Search + Dodaj */}
      <div className="search-bar">
        <div className="search-input-wrap">
          <span className="search-icon">🔍</span>
          <input
            placeholder={`Pretraži ${typeof title === "string" ? title.toLowerCase() : ""}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={() => { setEditing(null); setShowForm(true); }}>
          + Dodaj
        </button>
      </div>

      {/* Tabela */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">{icon} {title}</span>
          <span style={{ fontSize: "0.8rem", color: "#6b7c6c" }}>
            {meta?.total ?? filtered.length} stavki ukupno
          </span>
        </div>

        {loading ? (
          <Loading />
        ) : filtered.length === 0 ? (
          <Empty icon={icon} message={emptyMessage}
            action={<button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Dodaj prvi unos</button>} />
        ) : (
          <>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    {columns.map((c) => <th key={c.key}>{c.label}</th>)}
                    <th>Akcije</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item, i) => (
                    <tr key={item.id}>
                      <td style={{ color: "#6b7c6c", fontSize: "0.8rem" }}>
                        {((page - 1) * (meta?.per_page ?? 10)) + i + 1}
                      </td>
                      {columns.map((c) => (
                        <td key={c.key}>{c.render ? c.render(item) : (item[c.key] ?? "—")}</td>
                      ))}
                      <td>
                        <div style={{ display: "flex", gap: "0.4rem" }}>
                          <button className="btn btn-outline btn-sm"
                            onClick={() => { setEditing(item); setShowForm(true); }}>
                            ✏️ Uredi
                          </button>
                          <button className="btn btn-danger btn-sm"
                            onClick={() => setDeleting(item)}>
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

      {/* Modal forma */}
      {showForm && (
        <Modal
          title={editing
            ? `Uredi — ${editing.naziv ?? editing.naslov ?? ""}`
            : `Dodaj ${title}`}
          onClose={handleClose}
          footer={
            <>
              <button className="btn btn-outline" onClick={handleClose}>Zatvori</button>
              <button className="btn btn-primary" form="crud-form" type="submit" disabled={saving}>
                {saving ? "Čuvanje..." : "Sačuvaj"}
              </button>
            </>
          }
        >
          <FormComponent initial={editing} onSubmit={handleSave} saving={saving} />
        </Modal>
      )}

      {/* Potvrda brisanja */}
      {deleting && (
        <ConfirmModal
          message={`Da li ste sigurni da želite obrisati "${deleting.naziv ?? deleting.naslov ?? "stavku"}"?`}
          onConfirm={handleDelete}
          onCancel={() => setDeleting(null)}
        />
      )}
    </div>
  );
}