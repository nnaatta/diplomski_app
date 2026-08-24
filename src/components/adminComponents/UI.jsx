import { useEffect } from "react";
import "./UI.css";

/* ===== TOAST ===== */
export function Toast({ toasts, removeToast }) {
  return (
    <div className="toast-wrap">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`} onClick={() => removeToast(t.id)}>
          <span>{t.type === "success" ? "✓" : "✕"}</span>
          {t.message}
        </div>
      ))}
    </div>
  );
}

/* ===== MODAL ===== */
export function Modal({ title, onClose, children, footer }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        animation: "fadeIn 0.2s ease",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0 8px 32px rgba(52,78,65,0.16)",
          width: "100%",
          maxWidth: "600px",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
          zIndex: 100000,
          animation: "slideUp 0.22s ease",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.5rem 1.75rem 1rem",
            borderBottom: "1px solid #d4e6c3",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#344e41" }}>
            {title}
          </span>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.4rem",
              cursor: "pointer",
              color: "#6b7c6c",
              lineHeight: 1,
              padding: "0.2rem",
              borderRadius: "4px",
            }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "1.5rem 1.75rem" }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            style={{
              padding: "1rem 1.75rem 1.5rem",
              display: "flex",
              justifyContent: "flex-end",
              gap: "0.75rem",
              borderTop: "1px solid #d4e6c3",
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

/* ===== POTVRDA BRISANJA ===== */
export function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <Modal
      title="Potvrda brisanja"
      onClose={onCancel}
      footer={
        <>
          <button className="btn btn-outline" onClick={onCancel}>Odustani</button>
          <button className="btn btn-danger" onClick={onConfirm}>Obriši</button>
        </>
      }
    >
      <p style={{ color: "#6b7c6c" }}>{message}</p>
    </Modal>
  );
}

/* ===== PAGINACIJA ===== */
export function Pagination({ meta, onPageChange }) {
  if (!meta || meta.last_page <= 1) return null;
  const pages = Array.from({ length: meta.last_page }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <span className="pagination__info">
        Prikazano {meta.from}–{meta.to} od {meta.total} stavki
      </span>
      <div className="pagination__btns">
        <button
          className="pagination__btn"
          disabled={meta.current_page === 1}
          onClick={() => onPageChange(meta.current_page - 1)}
        >←</button>
        {pages.map((p) => (
          <button
            key={p}
            className={`pagination__btn ${p === meta.current_page ? "active" : ""}`}
            onClick={() => onPageChange(p)}
          >{p}</button>
        ))}
        <button
          className="pagination__btn"
          disabled={meta.current_page === meta.last_page}
          onClick={() => onPageChange(meta.current_page + 1)}
        >→</button>
      </div>
    </div>
  );
}

/* ===== LOADING ===== */
export function Loading() {
  return (
    <div className="loading-wrap">
      <div className="loading-spinner" />
      <p>Učitavanje...</p>
    </div>
  );
}

/* ===== EMPTY STATE ===== */
export function Empty({ icon = "📭", message = "Nema podataka", action }) {
  return (
    <div className="empty-wrap">
      <div className="empty-icon">{icon}</div>
      <p>{message}</p>
      {action && <div style={{ marginTop: "1rem" }}>{action}</div>}
    </div>
  );
}

/* ===== STATUS BADGE ===== */
export function StatusBadge({ aktivan }) {
  return (
    <span className={`badge ${aktivan ? "badge-active" : "badge-inactive"}`}>
      {aktivan ? "Aktivan" : "Neaktivan"}
    </span>
  );
}