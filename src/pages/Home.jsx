import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";

function Home() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const bookPlaceholders = [1, 2, 3, 4, 5];

  return (
    <div style={styles.page}>
      <Header />

      <main style={styles.main}>
        {/* ÁREA SUPERIOR: busca + menu */}
        <section style={styles.topArea}>
          <div style={styles.searchBox}>
            <span style={styles.searchIcon}>⌕</span>
            <input
              style={styles.searchInput}
              type="text"
              placeholder="Pesquise títulos, gêneros, autores..."
            />
          </div>

          <div style={styles.userArea}>
            <button style={styles.profileButton} title="Meu perfil">
              👤
            </button>

            <button
              style={styles.menuButton}
              onClick={() => setMenuOpen(!menuOpen)}
              title="Abrir menu"
            >
              ☰
            </button>

            {menuOpen && (
              <div style={styles.dropdown}>
                <button style={styles.dropdownItem}>Meu perfil</button>
                <button style={styles.dropdownItem}>Minha biblioteca</button>
                <button style={styles.dropdownItem}>Minhas preferências</button>
                <button style={{ ...styles.dropdownItem, color: "#ff4d4d" }} onClick={() => navigate('/')}>
                  Sair
                </button>
              </div>
            )}
          </div>
        </section>

        {/* SAUDAÇÃO */}
        <section style={styles.greetingSection}>
          <h1 style={styles.greeting}>Olá, Xxxxxxxx!</h1>
          <p style={styles.question}>O que vamos ler hoje?</p>

          <p style={styles.basedText}>
            Baseado nas suas leituras recentes de{" "}
            <span style={styles.tagBlue}>Gênero</span>{" "}
            e{" "}
            <span style={styles.tagPink}>Autor</span>
          </p>
        </section>

        {/* CARD PRINCIPAL */}
        <section style={styles.featureSection}>
          <div style={styles.featureCard}>
            <div style={styles.bigCover}>
              <span style={styles.coverText}>Capa</span>
            </div>

            <div style={styles.featureInfo}>
              <div style={styles.skeletonTitle}></div>
              <div style={styles.skeletonAuthor}></div>

              <div style={styles.textLines}>
                <div style={styles.skeletonLine}></div>
                <div style={styles.skeletonLine}></div>
                <div style={{ ...styles.skeletonLine, width: "70%" }}></div>
              </div>
            </div>
          </div>

          <div style={styles.dots}>
            <span style={styles.dotActive}></span>
            <span style={styles.dot}></span>
            <span style={styles.dot}></span>
            <span style={styles.dot}></span>
          </div>
        </section>

        {/* SEÇÃO 1 */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Porque você gosta de [Autor Escolhido]</h2>

          <div style={styles.bookRow}>
            {bookPlaceholders.map((item) => (
              <article style={styles.smallCard} key={`autor-${item}`}>
                <div style={styles.smallCover}>
                  <span style={styles.smallCoverText}>Capa</span>
                </div>

                <div style={styles.smallInfo}>
                  <div style={styles.smallTitle}></div>
                  <div style={styles.smallAuthor}></div>
                  <div style={styles.smallStars}>★★★★★</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SEÇÃO 2 */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Baseados na sua vibe</h2>

          <div style={styles.bookRow}>
            {bookPlaceholders.map((item) => (
              <article style={styles.smallCard} key={`vibe-${item}`}>
                <div style={styles.smallCover}>
                  <span style={styles.smallCoverText}>Capa</span>
                </div>

                <div style={styles.smallInfo}>
                  <div style={styles.smallTitle}></div>
                  <div style={styles.smallAuthor}></div>
                  <div style={styles.smallStars}>★★★★★</div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#F8F6FF",
    fontFamily: "'PT Mono', monospace",
    color: "#301C54",
  },
  main: {
    width: "100%",
    maxWidth: "1050px",
    margin: "0 auto",
    padding: "28px 32px 56px",
    boxSizing: "border-box",
  },
  topArea: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    marginBottom: "34px",
    position: "relative",
  },
  searchBox: {
    flex: 1,
    maxWidth: "520px",
    height: "38px",
    backgroundColor: "#E5E0EA",
    borderRadius: "30px",
    display: "flex",
    alignItems: "center",
    padding: "0 18px",
    boxSizing: "border-box",
    margin: "0 auto",
  },
  searchIcon: {
    color: "#8A7E99",
    fontSize: "18px",
    marginRight: "8px",
  },
  searchInput: {
    width: "100%",
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    fontFamily: "'PT Mono', monospace",
    fontSize: "12px",
    color: "#301C54",
  },
  userArea: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    position: "relative",
  },
  profileButton: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#E5E0EA",
    cursor: "pointer",
  },
  menuButton: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#E5E0EA",
    color: "#301C54",
    cursor: "pointer",
    fontSize: "16px",
  },
  dropdown: {
    position: "absolute",
    top: "42px",
    right: "0",
    width: "180px",
    backgroundColor: "#D5D0DA",
    borderRadius: "14px",
    padding: "10px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  dropdownItem: {
    border: "none",
    backgroundColor: "transparent",
    textAlign: "left",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "8px",
    fontFamily: "'PT Mono', monospace",
    fontSize: "11px",
    color: "#301C54",
  },
  greetingSection: {
    marginBottom: "22px",
  },
  greeting: {
    fontSize: "28px",
    margin: "0 0 4px",
    color: "#1D1D1D",
  },
  question: {
    fontSize: "16px",
    margin: "0 0 18px",
    color: "#1D1D1D",
  },
  basedText: {
    fontSize: "12px",
    color: "#1D1D1D",
    margin: 0,
  },
  tagBlue: {
    backgroundColor: "#DFF0FF",
    color: "#326A9F",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "11px",
  },
  tagPink: {
    backgroundColor: "#FFE1E8",
    color: "#9F3A5B",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "11px",
  },
  featureSection: {
    marginBottom: "34px",
  },
  featureCard: {
    display: "grid",
    gridTemplateColumns: "150px 1fr",
    gap: "20px",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E8E0F0",
    borderRadius: "16px",
    padding: "18px",
    boxSizing: "border-box",
    maxWidth: "650px",
  },
  bigCover: {
    height: "210px",
    borderRadius: "10px",
    backgroundColor: "#301C54",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  coverText: {
    color: "#F5F0FF",
    fontSize: "13px",
  },
  featureInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "10px",
  },
  skeletonTitle: {
    width: "70%",
    height: "18px",
    backgroundColor: "#D8D1E4",
    borderRadius: "8px",
  },
  skeletonAuthor: {
    width: "42%",
    height: "12px",
    backgroundColor: "#E8E0F0",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  textLines: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  skeletonLine: {
    width: "100%",
    height: "10px",
    backgroundColor: "#E8E0F0",
    borderRadius: "8px",
  },
  dots: {
    display: "flex",
    gap: "10px",
    marginTop: "18px",
    marginLeft: "210px",
  },
  dotActive: {
    width: "48px",
    height: "4px",
    backgroundColor: "#301C54",
    borderRadius: "20px",
    display: "block",
  },
  dot: {
    width: "36px",
    height: "4px",
    backgroundColor: "#D8D1E4",
    borderRadius: "20px",
    display: "block",
  },
  section: {
    marginTop: "34px",
  },
  sectionTitle: {
    fontSize: "14px",
    color: "#1D1D1D",
    marginBottom: "16px",
  },
  bookRow: {
    display: "flex",
    gap: "16px",
    overflowX: "auto",
    paddingBottom: "10px",
  },
  smallCard: {
    minWidth: "180px",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E8E0F0",
    borderRadius: "12px",
    padding: "10px",
    boxSizing: "border-box",
    display: "grid",
    gridTemplateColumns: "60px 1fr",
    gap: "10px",
  },
  smallCover: {
    width: "60px",
    height: "86px",
    backgroundColor: "#301C54",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  smallCoverText: {
    color: "#F5F0FF",
    fontSize: "10px",
  },
  smallInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "8px",
  },
  smallTitle: {
    width: "90%",
    height: "10px",
    backgroundColor: "#D8D1E4",
    borderRadius: "8px",
  },
  smallAuthor: {
    width: "65%",
    height: "8px",
    backgroundColor: "#E8E0F0",
    borderRadius: "8px",
  },
  smallStars: {
    fontSize: "10px",
    color: "#F2C94C",
    letterSpacing: "1px",
  },
};

export default Home;