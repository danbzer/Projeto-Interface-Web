import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext"; // Ajuste o caminho se necessário
import { useState } from "react";
import logoImg from "../../assets/images/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { tema } = useTheme();
  const isDark = tema === "Escuro";

  // Estados para controlar o hover dos links (já que estamos usando CSS inline)
  const [hoveredLink, setHoveredLink] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  // Paleta de cores dinâmica baseada no tema do site
  const colors = {
    bg: isDark ? "#111622" : "#F3F4F6",
    text: isDark ? "#9CA3AF" : "#4B5563",
    linkHover: "#E06237", // Tom de laranja padrão do seu projeto
    border: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
    logo: isDark ? "#F7FAFC" : "#1A202C"
  };

  return (
    <footer style={{ ...styles.footer, backgroundColor: colors.bg }}>
      <div style={{ ...styles.container, borderColor: colors.border }}>

        {/* Logo / Brand Flexível */}
        <Link to="/" style={styles.brand} title="Voltar ao início">
          <img
            src={logoImg}
            alt="Folheando Ícone"
            style={{ height: "32px", width: "auto", marginRight: "10px", objectFit: "contain" }}
          />
          <span style={{ ...styles.logoText, color: colors.logo }}>
            Folhe<span style={{ color: "#E06237" }}>ando</span>
          </span>
        </Link>

        {/* Links de Navegação com Hover */}
        <div style={styles.links}>
          {[
            { to: "/", label: "Início" },
            { to: "/home", label: "Explorar" },
            { to: "/perfil", label: "Meu Perfil" }
          ].map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              onMouseEnter={() => setHoveredLink(idx)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{
                ...styles.link,
                color: hoveredLink === idx ? colors.linkHover : colors.text,
                transform: hoveredLink === idx ? "translateY(-1px)" : "none"
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Redes Sociais com Transições Suaves */}
        <div style={styles.socials}>
          {[
            {
              id: "insta",
              title: "Instagram",
              svg: (color) => (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill={color} stroke="none" />
                </svg>
              )
            },
            {
              id: "x",
              title: "Twitter/X",
              svg: (color) => (
                <svg width="18" height="18" viewBox="0 0 24 24" fill={color}>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              )
            }
          ].map((social) => {
            const isHovered = hoveredSocial === social.id;
            const currentColor = isHovered ? colors.linkHover : colors.text;
            return (
              <a
                key={social.id}
                href="#"
                title={social.title}
                onMouseEnter={() => setHoveredSocial(social.id)}
                onMouseLeave={() => setHoveredSocial(null)}
                style={{
                  ...styles.socialLink,
                  backgroundColor: isHovered ? (isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)") : "transparent",
                  transform: isHovered ? "scale(1.1)" : "none"
                }}
              >
                {social.svg(currentColor)}
              </a>
            );
          })}
        </div>
      </div>

      {/* Direitos Autorais Alinhados */}
      <div style={styles.copyright}>
        <p style={{ ...styles.copyrightText, color: colors.text }}>
          &copy; {currentYear} SeuProjeto. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    padding: "40px 24px 24px",
    marginTop: "auto",
    width: "100%",
    boxSizing: "border-box",
    transition: "background-color 0.3s ease",
  },
  container: {
    maxWidth: "1050px", // Alinhado perfeitamente com a largura máxima da sua página de Biblioteca!
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "24px",
    paddingBottom: "32px",
    borderBottom: "1px solid",
    transition: "border-color 0.3s ease",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    textDecoration: "none",
  },
  logoIcon: {
    fontSize: "24px",
  },
  logoText: {
    fontSize: "19px",
    fontWeight: "800",
    letterSpacing: "-0.5px",
    fontFamily: "system-ui, sans-serif",
    transition: "color 0.3s ease",
  },
  links: {
    display: "flex",
    gap: "28px",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    fontFamily: "system-ui, sans-serif",
    transition: "color 0.2s ease, transform 0.2s ease",
  },
  socials: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
  socialLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    transition: "transform 0.2s ease, background-color 0.2s ease",
  },
  copyright: {
    maxWidth: "1050px",
    margin: "24px auto 0",
    textAlign: "center",
  },
  copyrightText: {
    fontSize: "12px",
    opacity: 0.7,
    fontFamily: "system-ui, sans-serif",
    margin: 0,
    lineHeight: "1.5",
    transition: "color 0.3s ease",
  },
};