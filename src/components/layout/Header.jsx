import { useState } from "react";

function Header({ isLoggedIn = false, user = null, showBack = false }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={styles.header}>
        {showBack && (
            <button
                onClick={() => window.history.back()}
                style={styles.backBtn}
            >
                ←
            </button>
            )}
      {/* LOGO */}
      <div style={styles.logo}>
        <div style={styles.logoIcon}>📚</div>
        <span style={styles.logoText}>Books</span>
      </div>

      {/* MENU só aparece quando logado */}
      {isLoggedIn && (
        <div style={styles.userArea}>
          <nav style={{ display: menuOpen ? "flex" : "none", ...styles.nav }}>
            <a href="/" style={styles.navLink}>Início</a>
            <a href="/discover" style={styles.navLink}>Explorar</a>
            <a href="/shelf" style={styles.navLink}>Minha Estante</a>
          </nav>
          <button
            style={styles.avatar}
            onClick={() => setMenuOpen(!menuOpen)}
            title="Menu"
          >
            {user?.photo ? (
              <img src={user.photo} alt="Foto do usuário" style={styles.avatarImg} />
            ) : (
              <span style={styles.avatarPlaceholder}>
                {user?.name?.charAt(0) || "U"}
              </span>
            )}
          </button>
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
  logoIcon: {
    fontSize: "24px",
  },
  logoText: {
    fontFamily: "'Homemade Apple', cursive",
    fontSize: "20px",
    fontWeight: "700",
    color: "#D6C083",
    letterSpacing: "-0.5px",
  },
  userArea: {
    position: "absolute",
    right: "32px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  nav: {
    flexDirection: "row",
    gap: "24px",
    alignItems: "center",
  },
  navLink: {
    textDecoration: "none",
    color: "#2c2c2c",
    fontSize: "14px",
    fontWeight: "500",
  },
  avatar: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    backgroundColor: "#2c2c2c",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  avatarPlaceholder: {
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
  },
};

export default Header;