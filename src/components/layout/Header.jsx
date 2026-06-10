import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Header({ showBack = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header style={s.header}>
      {showBack && (
        <button onClick={() => window.history.back()} style={s.backBtn}>←</button>
      )}

      <div style={s.logo} onClick={() => user && navigate("/home")} role={user ? "button" : undefined}>
        <span style={s.logoIcon}>📚</span>
        <span style={s.logoText}>Books</span>
      </div>

      {user && (
        <div style={s.userArea} ref={menuRef}>
          <button style={s.iconBtn} title="Meu perfil" onClick={() => navigate("/perfil")}>
            {user.photo ? (
              <img src={user.photo} alt="foto" style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" }} />
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D6C083" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            )}
          </button>

          <button style={s.iconBtn} title="Menu" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D6C083" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {menuOpen && (
            <div style={s.dropdown}>
              {[
                { label: "Início", path: "/home" },
                { label: "Minha Biblioteca", path: "/biblioteca" },
                { label: "Perfil", path: "/perfil" },
              ].map(({ label, path }) => (
                <button key={path} style={s.dropdownItem} onClick={() => { navigate(path); setMenuOpen(false); }}>
                  {label}
                </button>
              ))}
              <div style={s.divider} />
              <button style={{ ...s.dropdownItem, color: "#ff6b6b" }} onClick={handleLogout}>Sair</button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

const s = {
  header: { display: "flex", alignItems: "center", justifyContent: "center", padding: "0 32px", height: "64px", backgroundColor: "#301C54", position: "sticky", top: 0, zIndex: 100 },
  backBtn: { position: "absolute", left: "24px", background: "none", border: "none", color: "#D6C083", fontSize: "22px", cursor: "pointer" },
  logo: { display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" },
  logoIcon: { fontSize: "24px" },
  logoText: { fontFamily: "'Homemade Apple', cursive", fontSize: "20px", fontWeight: "700", color: "#D6C083", letterSpacing: "-0.5px" },
  userArea: { position: "absolute", right: "24px", display: "flex", alignItems: "center", gap: "4px" },
  iconBtn: { width: "38px", height: "38px", borderRadius: "50%", border: "none", backgroundColor: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  dropdown: { position: "absolute", top: "48px", right: "0", width: "190px", backgroundColor: "#fff", borderRadius: "14px", padding: "8px", boxShadow: "0 8px 24px rgba(0,0,0,0.15)", zIndex: 200, display: "flex", flexDirection: "column", gap: "2px" },
  dropdownItem: { border: "none", backgroundColor: "transparent", textAlign: "left", cursor: "pointer", padding: "10px 12px", borderRadius: "8px", fontFamily: "'PT Mono', monospace", fontSize: "13px", color: "#301C54", width: "100%" },
  divider: { height: "1px", backgroundColor: "#E8E0F0", margin: "4px 0" },
};
