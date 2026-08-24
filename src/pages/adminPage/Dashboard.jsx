import { useState, useEffect } from "react";
import { api } from "./services/api";
import { Loading } from "../../components/adminComponents/UI";
import { IoHome, IoPersonOutline, IoBed, IoRestaurantOutline, IoCalendarOutline, IoImages, IoLogOut } from "react-icons/io5";
import { MdNordicWalking, MdEmail, MdWallet } from "react-icons/md";
import { LuNotebookText, LuSettings2 } from "react-icons/lu";

export default function Dashboard({ setPage }) {
  const [stats, setStats]   = useState(null);
  const [poruke, setPoruke] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/smjestaji?per_page=1"),
      api.get("/restorani?per_page=1"),
      api.get("/dogadjaji?per_page=1"),
      api.get("/blog-postovi?per_page=1"),
      api.get("/poruke?per_page=5"),
      api.get("/turisticki-sadrzaji?per_page=1"),
    ])
      .then(([smj, rest, dog, blog, por, tur]) => {
        setStats({
          smjestaj:  smj.meta?.total  ?? 0,
          restorani: rest.meta?.total ?? 0,
          dogadjaji: dog.meta?.total  ?? 0,
          blog:      blog.meta?.total ?? 0,
          staze:     tur.meta?.total  ?? 0,
        });
        setPoruke(por.data ?? []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  const STAT_CARDS = [
    { icon: <IoBed/>, label: "Smještaj",     value: stats?.smjestaj,  page: "smjestaj"           },
    { icon: <IoRestaurantOutline/>, label: "Restorani",    value: stats?.restorani, page: "restorani"          },
    { icon: <MdNordicWalking/>, label: "Staze",        value: stats?.staze,     page: "turisticki-sadrzaj" },
    { icon: <IoCalendarOutline/>, label: "Događaji",     value: stats?.dogadjaji, page: "dogadjaji"          },
    { icon: <LuNotebookText/>, label: "Blog postovi", value: stats?.blog,      page: "blog"               },
  ];

  return (
    <div>
      <div className="stats-grid">
        {STAT_CARDS.map((s) => (
          <div
            key={s.page}
            className="stat-card"
            style={{ cursor: "pointer" }}
            onClick={() => setPage(s.page)}
          >
            <div className="stat-card__icon">{s.icon}</div>
            <div>
              <div className="stat-card__value">{s.value ?? "–"}</div>
              <div className="stat-card__label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">✉️ Zadnje poruke</span>
          <button className="btn btn-outline btn-sm" onClick={() => setPage("poruke")}>
            Sve poruke →
          </button>
        </div>
        {poruke.length === 0 ? (
          <p style={{ color: "var(--clr-muted)", fontSize: "0.88rem" }}>Nema novih poruka.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Od</th><th>Naslov</th><th>Datum</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {poruke.map((p) => (
                  <tr key={p.id}>
                    <td>{p.ime_prezime}</td>
                    <td>{p.naslov}</td>
                    <td>{p.datum}</td>
                    <td><span className={`badge badge-${p.status}`}>{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}