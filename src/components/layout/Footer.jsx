import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>

        <Link to="/" style={styles.brand} title="Voltar ao início">
          <span style={styles.logoIcon}>📚</span>
          <span style={styles.logoText}>Books</span>
        </Link>

        <div style={styles.links}>
          <Link to="/" style={styles.link}>Início</Link>
          <Link to="/home" style={styles.link}>Explorar</Link>
          <Link to="/perfil" style={styles.link}>Meu Perfil</Link>
        </div>

        <div style={styles.socials}>
          <a href="#" style={styles.socialLink} title="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5F0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="#F5F0FF" stroke="none" />
            </svg>
          </a>
          <a href="#" style={styles.socialLink} title="Twitter/X">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#F5F0FF">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a href="#" style={styles.socialLink} title="Facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#F5F0FF">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
        </div>
      </div>

      <div style={styles.copyright}>
        <p style={styles.copyrightText}>&copy; {currentYear} BookSpace. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#301C54",
    padding: "32px 40px 16px",
    marginTop: "auto",
    position: "relative",
    zIndex: 1,
  },
  container: {
    maxWidth: "1920px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "24px",
    paddingBottom: "24px",
    borderBottom: "1px solid rgba(245, 240, 255, 0.15)",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none",
  },
  logoIcon: {
    fontSize: "22px",
  },
  logoText: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#D6C083",
    fontFamily: "'Homemade Apple', cursive",
  },
  links: {
    display: "flex",
    gap: "24px",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "#F5F0FF",
    fontFamily: "'PT Mono', monospace",
    fontSize: "13px",
    opacity: 0.8,
  },
  socials: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },
  socialLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.8,
  },
  copyright: {
    maxWidth: "900px",
    margin: "16px auto 0",
    textAlign: "center",
  },
  copyrightText: {
    fontSize: "11px",
    color: "#F5F0FF",
    opacity: 0.5,
    fontFamily: "'PT Mono', monospace",
    margin: 0,
  },
};