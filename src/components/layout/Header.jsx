import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import logoImg from "../../assets/images/logo.png";

export default function Header({ showBack = false, showUser = false }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { tema } = useTheme();
  const isDark = tema === "Escuro";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          <span style={s.backText}>Voltar</span>
        </button>
      ) : (
        <div style={{ width: 90 }} />
      )}

      {/* logo centralizada */}
      <div style={s.logoContainer} onClick={() => user && navigate("/home")} role="button">
        <img
          src={logoImg}
          alt="Folheando Ícone"
          style={{ height: "32px", width: "auto", objectFit: "contain" }}
        />
        <h1 style={s.logoText}>
          <a
            href="/home"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Folhe<span style={{ color: "#2D3748" }}>ando</span>
          </a>
        </h1>
      </div>

      {/* avatar dropdown */}
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
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {dropdownOpen && (
            <div style={{
              ...s.dropdown,
              backgroundColor: isDark ? "#2D3748" : "#FFFFFF",
              border: `1px solid ${isDark ? "#4A5568" : "#E2E8F0"}`,
            }}>
              {/* clica fora cabeçalho do dropdown */}
              <div style={{
                ...s.dropdownHeader,
                backgroundColor: isDark ? "#1A202C" : "#F8FAFC",
              }}>
                <span style={{ ...s.dropdownName, color: isDark ? "#F7FAFC" : "#1A202C" }}>
                  {user.name || user.username || "Usuário"}
                </span>
                <span style={{ ...s.dropdownEmail, color: isDark ? "#A0AEC0" : "#718096" }}>
                  {user.email}
                </span>
              </div>

              <div style={{ ...s.dropdownDivider, backgroundColor: isDark ? "#4A5568" : "#E2E8F0" }} />

              {menuItems.map((item) => (
                <button
                  key={item.label}
                  style={{
                    ...s.dropdownItem,
                    color: item.danger ? "#E53E3E" : isDark ? "#F7FAFC" : "#2D3748",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDark ? "#4A5568" : "#F8FAFC"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
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
  logoText: { color: "#FFFFFF", fontSize: "26px", fontWeight: "bold", fontFamily: "system-ui, -apple-system, sans-serif", margin: 0, letterSpacing: "0.5px" },
  avatarWrapper: { position: "relative" },
  avatarBtn: { display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "30px", padding: "6px 10px 6px 6px", cursor: "pointer", transition: "background 0.2s" },
  avatarImg: { width: 34, height: 34, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(255,255,255,0.6)" },
  avatarPlaceholder: { width: 34, height: 34, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid rgba(255,255,255,0.6)" },
  avatarInitial: { fontSize: "15px", fontWeight: "700", color: "#FFFFFF" },
  dropdown: { position: "absolute", top: "54px", right: 0, borderRadius: "16px", width: "220px", boxShadow: "0 10px 30px rgba(0,0,0,0.15)", overflow: "hidden", zIndex: 100 },
  dropdownHeader: { padding: "14px 16px", display: "flex", flexDirection: "column", gap: "2px" },
  dropdownName: { fontSize: "14px", fontWeight: "700" },
  dropdownEmail: { fontSize: "12px" },
  dropdownDivider: { height: "1px" },
  dropdownItem: { display: "flex", alignItems: "center", gap: "10px", width: "100%", padding: "12px 16px", border: "none", backgroundColor: "transparent", cursor: "pointer", fontSize: "14px", fontWeight: "500", fontFamily: "inherit", textAlign: "left", transition: "background 0.15s" },
  dropdownIcon: { fontSize: "16px" },
};