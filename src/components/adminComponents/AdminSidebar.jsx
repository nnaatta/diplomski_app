import { useAuth } from "../../pages/adminPage/context/AuthContext";
import "./AdminSidebar.css";
import { IoHome, IoPersonOutline, IoBed, IoRestaurantOutline, IoCalendarOutline, IoImages, IoLogOut } from "react-icons/io5";
import { MdNordicWalking, MdEmail } from "react-icons/md";
import { LuNotebookText, LuSettings2 } from "react-icons/lu";

const NAV = [
  {
    label: "Pregled",
    items: [
      { icon: <IoHome/>, label: "Dashboard",      page: "dashboard" },
      { icon: <IoPersonOutline/>, label: "Moj profil",     page: "profil"    },
    ],
  },
  {
    label: "Sadržaj",
    items: [
      { icon: <IoBed/>, label: "Smještaj",         page: "smjestaj"           },
      { icon: <IoRestaurantOutline/>, label: "Restorani",        page: "restorani"          },
      { icon: <MdNordicWalking/>, label: "Turističke staze", page: "turisticki-sadrzaj" },
      { icon: <IoCalendarOutline/>, label: "Događaji",         page: "dogadjaji"          },
      { icon: <LuNotebookText/>, label: "Blog",             page: "blog"               },
      { icon: <IoImages/>, label: "Galerija",         page: "galerija"           },
    ],
  },
  {
    label: "Ostalo",
    items: [
      { icon: <MdEmail/>, label: "Poruke",    page: "poruke"    },
      { icon: <LuSettings2/>, label: "Šifarnici", page: "sifarnici" },
    ],
  },
];

export default function AdminSidebar({ activePage, setPage }) {
  const { user, logout } = useAuth();

  const initials = user
    ? `${user.ime_prezime?.split(" ")[0]?.[0] ?? ""}${user.ime_prezime?.split(" ")[1]?.[0] ?? ""}`
    : "A";

  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <div className="sidebar__logo-badge">Admin</div>
        <div className="sidebar__logo-title">Han Pijesak</div>
        <div className="sidebar__logo-sub">Turistička organizacija</div>
      </div>

      <nav className="sidebar__nav">
        {NAV.map((section) => (
          <div key={section.label}>
            <div className="sidebar__section-label">{section.label}</div>
            {section.items.map((item) => (
              <button
                key={item.page}
                className={`sidebar__link ${activePage === item.page ? "active" : ""}`}
                onClick={() => setPage(item.page)}
              >
                <span className="sidebar__link-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__user">
          <div className="sidebar__avatar">{initials}</div>
          <div className="sidebar__user-info">
            <div className="sidebar__user-name">{user?.ime_prezime ?? "Admin"}</div>
            <div className="sidebar__user-role">Administrator</div>
          </div>
        </div>
        <button className="sidebar__logout" onClick={logout}>
          <span><IoLogOut/></span> Odjava
        </button>
      </div>
    </aside>
  );
}