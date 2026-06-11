import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Header({ showBack = false, showUser = false }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    { icon: "📚", label: "Minha Biblioteca", action: () => navigate("/biblioteca") },
    { icon: "👤", label: "Meu Perfil", action: () => navigate("/perfil") },
    { icon: "⚙️", label: "Configurações", action: () => navigate("/configuracoes") },
    { icon: "❓", label: "Ajuda", action: () => navigate("/ajuda") },
    { icon: "🚪", label: "Sair", action: handleLogout, danger: true },
  ];

  return (
    <header style={s.header}>
      {/* botão voltar */}
      {showBack ? (
        <button style={s.backBtn} onClick={() => navigate(-1)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          <span style={s.backText}>Voltar</span>
        </button>
      ) : (
        <div style={{ width: 90 }} />
      )}

      {/* logo centralizada */}
      <div style={s.logoContainer} onClick={() => user && navigate("/home")} role="button">
        <div style={s.iconContainer}>
          <span style={{ ...s.bookIcon, backgroundColor: "#6366F1", transform: "rotate(-12deg) translate(-4px, 2px)" }} />
          <span style={{ ...s.bookIcon, backgroundColor: "#F59E0B", transform: "rotate(4deg) translate(0px, -2px)" }} />
          <span style={{ ...s.bookIcon, backgroundColor: "#10B981", transform: "rotate(-4deg) translate(4px, 1px)" }} />
        </div>
        <h1 style={s.logoText}>Bookou</h1>
      </div>

      {/* avatar dropdown (só quando logado) */}
      {showUser && user ? (
        <div style={s.avatarWrapper} ref={dropdownRef}>
          <button style={s.avatarBtn} onClick={() => setDropdownOpen(!dropdownOpen)}>
            {user.photo ? (
              <img src={user.photo} alt="avatar" style={s.avatarImg} />
            ) : (
              <div style={s.avatarPlaceholder}>
                <span style={s.avatarInitial}>
                  {(user.name || user.username || "U")[0].toUpperCase()}
                </span>
              </div>
            )}
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ transition: "transform 0.2s", transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>

          {dropdownOpen && (
            <div style={s.dropdown}>
              {/* cabeçalho do dropdown */}
              <div style={s.dropdownHeader}>
                <span style={s.dropdownName}>{user.name || user.username || "Usuário"}</span>
                <span style={s.dropdownEmail}>{user.email}</span>
              </div>
              <div style={s.dropdownDivider} />
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  style={{ ...s.dropdownItem, color: item.danger ? "#E53E3E" : "#2D3748" }}
                  onClick={() => { item.action(); setDropdownOpen(false); }}
                >
                  <span style={s.dropdownIcon}>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div style={{ width: 90 }} />
      )}
    </header>
  );
}

const s = {
  header: { backgroundColor: "#E06237", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", boxSizing: "border-box", position: "relative" },
  backBtn: { display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "20px", padding: "7px 14px", cursor: "pointer", color: "#FFFFFF", transition: "background 0.2s" },
  backText: { fontSize: "14px", fontWeight: "600", color: "#FFFFFF", fontFamily: "system-ui, -apple-system, sans-serif" },
  logoContainer: { display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" },
  iconContainer: { position: "relative", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center" },
  bookIcon: { position: "absolute", width: "12px", height: "16px", borderRadius: "2px", border: "1px solid rgba(255,255,255,0.6)" },
  logoText: { color: "#FFFFFF", fontSize: "28px", fontWeight: "bold", fontFamily: "'Pacifico', cursive, sans-serif", margin: 0, letterSpacing: "0.5px" },
  avatarWrapper: { position: "relative" },
  avatarBtn: { display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "30px", padding: "6px 10px 6px 6px", cursor: "pointer", transition: "background 0.2s" },
  avatarImg: { width: 34, height: 34, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(255,255,255,0.6)" },
  avatarPlaceholder: { width: 34, height: 34, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid rgba(255,255,255,0.6)" },
  avatarInitial: { fontSize: "15px", fontWeight: "700", color: "#FFFFFF" },
  dropdown: { position: "absolute", top: "54px", right: 0, backgroundColor: "#FFFFFF", borderRadius: "16px", width: "220px", boxShadow: "0 10px 30px rgba(0,0,0,0.12)", overflow: "hidden", zIndex: 100, border: "1px solid #E2E8F0" },
  dropdownHeader: { padding: "14px 16px", display: "flex", flexDirection: "column", gap: "2px", backgroundColor: "#F8FAFC" },
  dropdownName: { fontSize: "14px", fontWeight: "700", color: "#1A202C" },
  dropdownEmail: { fontSize: "12px", color: "#718096" },
  dropdownDivider: { height: "1px", backgroundColor: "#E2E8F0" },
  dropdownItem: { display: "flex", alignItems: "center", gap: "10px", width: "100%", padding: "12px 16px", border: "none", backgroundColor: "transparent", cursor: "pointer", fontSize: "14px", fontWeight: "500", fontFamily: "inherit", textAlign: "left", transition: "background 0.15s" },
  dropdownIcon: { fontSize: "16px" },
};