import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header({ isLoggedIn = false, user = null, showBack = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header style={styles.header}>

      {/* Botão voltar */}
      {showBack && (
        <button onClick={() => window.history.back()} style={styles.backBtn}>
          ←
        </button>
      )}

      {/* Logo — sempre centralizada */}
      <div style={styles.logo}>
        <span style={styles.logoIcon}>📚</span>
        <span style={styles.logoText}>Books</span>
      </div>

      {/* Área do usuário (só quando logado) */}
      {isLoggedIn && (
        <div style={styles.userArea} ref={menuRef}>

          {/* Ícone de perfil */}
          <button style={styles.iconBtn} title="Meu perfil" onClick={() => navigate("/perfil")}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D6C083" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </button>

          {/* Ícone de menu */}
          <button style={styles.iconBtn} title="Menu" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D6C083" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <div style={styles.dropdown}>
              <button style={styles.dropdownItem} onClick={() => { navigate("/home"); setMenuOpen(false); }}>
                Início
              </button>
              <button style={styles.dropdownItem} onClick={() => { navigate("/discover"); setMenuOpen(false); }}>
                Explorar
              </button>
              <button style={styles.dropdownItem} onClick={() => { navigate("/shelf"); setMenuOpen(false); }}>
                Minha Estante
              </button>
              <div style={styles.divider} />
              <button style={{ ...styles.dropdownItem, color: "#ff6b6b" }} onClick={() => navigate("/")}>
                Sair
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 32px",
    height: "64px",
    backgroundColor: "#301C54",
    borderBottom: "1px solid #e0e0d8",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  backBtn: {
    position: "absolute",
    left: "24px",
    background: "none",
    border: "none",
    color: "#D6C083",
    fontSize: "22px",
    cursor: "pointer",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoIcon: { fontSize: "24px" },
  logoText: {
    fontFamily: "'Homemade Apple', cursive",
    fontSize: "20px",
    fontWeight: "700",
    color: "#D6C083",
    letterSpacing: "-0.5px",
  },
  userArea: {
    position: "absolute",
    right: "24px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  iconBtn: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    backgroundColor: "#2c2c2c",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.2s",
  },
  dropdown: {
    position: "absolute",
    top: "48px",
    right: "0",
    width: "190px",
    backgroundColor: "#fff",
    borderRadius: "14px",
    padding: "8px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    zIndex: 200,
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  dropdownItem: {
    border: "none",
    backgroundColor: "transparent",
    textAlign: "left",
    cursor: "pointer",
    padding: "10px 12px",
    borderRadius: "8px",
    fontFamily: "'PT Mono', monospace",
    fontSize: "13px",
    color: "#301C54",
    width: "100%",
  },
  divider: {
    height: "1px",
    backgroundColor: "#E8E0F0",
    margin: "4px 0",
  },
};

export default Header;
