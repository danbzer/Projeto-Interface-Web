import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mockUser = { name: "Maria" };

const featuredBooks = [
  {
    id: 1,
    title: "O Homem de Giz",
    author: "C.J. Tudor",
    cover: "https://covers.openlibrary.org/b/isbn/9780593099247-L.jpg",
    tags: ["Suspense", "C.J. Tudor"],
    tagColors: [
      { bg: "#DFF0FF", color: "#326A9F" },
      { bg: "#FFE1E8", color: "#9F3A5B" },
    ],
    description:
      "Em 1986, um grupo de crianças inventa um jogo macabro usando figuras de giz para marcar os corpos das vítimas. Décadas depois, os desenhos voltam a aparecer — e os assassinatos recomeçam.",
  },
  {
    id: 2,
    title: "Verity",
    author: "Colleen Hoover",
    cover: "https://covers.openlibrary.org/b/isbn/9781538724736-L.jpg",
    tags: ["Thriller", "Romance"],
    tagColors: [
      { bg: "#E8F5E9", color: "#2E7D32" },
      { bg: "#FFF3E0", color: "#E65100" },
    ],
    description:
      "Lowen Ashby é uma escritora sem dinheiro que aceita terminar a série de uma autora renomada. Mas ao chegar à mansão, encontra um manuscrito perturbador — e começa a questionar tudo ao seu redor.",
  },
  {
    id: 3,
    title: "It Ends with Us",
    author: "Colleen Hoover",
    cover: "https://covers.openlibrary.org/b/isbn/9781501110368-L.jpg",
    tags: ["Romance", "Drama"],
    tagColors: [
      { bg: "#FFE1E8", color: "#9F3A5B" },
      { bg: "#EDE7F6", color: "#512DA8" },
    ],
    description:
      "Lily jamais imaginaria que o amor da sua vida a colocaria na mesma situação que ela tanto tentou deixar para trás. Uma história corajosa sobre escolhas impossíveis e força interior.",
  },
];

const booksByAuthor = [
  {
    id: 1,
    title: "É Assim que Começa",
    author: "Colleen Hoover",
    rating: 4.5,
    cover: "https://covers.openlibrary.org/b/isbn/9781476790107-M.jpg",
  },
  {
    id: 2,
    title: "Verity",
    author: "Colleen Hoover",
    rating: 4.7,
    cover: "https://covers.openlibrary.org/b/isbn/9781538724736-M.jpg",
  },
  {
    id: 3,
    title: "Tudo a Rio",
    author: "Carla Medeiros",
    rating: 4.3,
    cover: "https://covers.openlibrary.org/b/isbn/9788501115591-M.jpg",
  },
  {
    id: 4,
    title: "Além da Capa",
    author: "Colleen Hoover",
    rating: 4.7,
    cover: "https://covers.openlibrary.org/b/isbn/9781501171345-M.jpg",
  },
  {
    id: 5,
    title: "Ugly Love",
    author: "Colleen Hoover",
    rating: 4.4,
    cover: "https://covers.openlibrary.org/b/isbn/9781476753188-M.jpg",
  },
];

const vibeBooks = [
  {
    id: 1,
    title: "Por Baixo de Capa",
    author: "Andressa Almeida",
    rating: 4.3,
    cover: "https://covers.openlibrary.org/b/isbn/9786555010329-M.jpg",
  },
  {
    id: 2,
    title: "Apostando no Amor",
    author: "Lynn Painter",
    rating: 4.6,
    cover: "https://covers.openlibrary.org/b/isbn/9781668002520-M.jpg",
  },
  {
    id: 3,
    title: "E Todos as suas (Im)perfeições",
    author: "Colleen Hoover",
    rating: 4.8,
    cover: "https://covers.openlibrary.org/b/isbn/9781501193323-M.jpg",
  },
  {
    id: 4,
    title: "November 9",
    author: "Colleen Hoover",
    rating: 4.6,
    cover: "https://covers.openlibrary.org/b/isbn/9781501110344-M.jpg",
  },
  {
    id: 5,
    title: "Sorrir",
    author: "Raina Telgemeier",
    rating: 4.5,
    cover: "https://covers.openlibrary.org/b/isbn/9780545132053-M.jpg",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span style={{ fontSize: "11px", color: "#F2C94C", letterSpacing: "1px" }}>
      {"★".repeat(full)}
      {half ? "½" : ""}
      {"☆".repeat(5 - full - (half ? 1 : 0))}
      <span style={{ color: "#888", marginLeft: "4px", fontSize: "10px" }}>{rating}</span>
    </span>
  );
}

function CoverImg({ src, style }) {
  const [error, setError] = useState(false);
  return error ? (
    <div style={{ ...style, backgroundColor: "#301C54", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ color: "#F5F0FF", fontSize: "11px" }}>📚</span>
    </div>
  ) : (
    <img
      src={src}
      alt="capa"
      style={{ ...style, objectFit: "cover" }}
      onError={() => setError(true)}
    />
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [featured, setFeatured] = useState(0);
  const rowRef1 = useRef(null);
  const rowRef2 = useRef(null);

  const scroll = (ref, dir) => {
    if (ref.current) ref.current.scrollBy({ left: dir * 200, behavior: "smooth" });
  };

  return (
    <div style={styles.page}>
      <Header isLoggedIn={true} user={mockUser} />

      <main style={styles.main}>

<<<<<<< HEAD
        {/* ── Search ── */}
        <div style={styles.searchBox}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8A7E99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            style={styles.searchInput}
            type="text"
            placeholder="Pesquise títulos, gêneros, autores..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* ── Greeting ── */}
        <section style={styles.greetingSection}>
          <h1 style={styles.greeting}>Olá, {mockUser.name}!</h1>
          <p style={styles.question}>O que vamos ler hoje?</p>
          <p style={styles.basedText}>
=======
          <div className="user-area" ref={menuRef}>
            {/* BOTÃO DO EMOJI DE USUÁRIO CONECTADO AO PERFIL */}
            <button 
              className="profile-button" 
              title="Meu perfil"
              onClick={() => navigate('/perfil')}
            >
              👤
            </button>

            <button
              className="menu-button"
              onClick={() => setMenuOpen(!menuOpen)}
              title="Abrir menu"
            >
              ☰
            </button>

            {menuOpen && (
              <div className="dropdown-menu">
                {/* BOTÃO DO MENU DROPDOWN TAMBÉM CONECTADO AO PERFIL */}
                <button className="dropdown-item" onClick={() => navigate('/perfil')}>
                  Meu perfil
                </button>
                <button className="dropdown-item">Minha biblioteca</button>
                <button className="dropdown-item">Minhas preferências</button>
                <button 
                  className="dropdown-item danger" 
                  onClick={() => navigate('/')}
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        </section>

        {/* SAUDAÇÃO */}
        <section className="greeting-section">
          <h1 className="greeting-title">Olá, Marcos!</h1>
          <p className="greeting-question">O que vamos ler hoje?</p>
          <p className="greeting-based-on">
>>>>>>> e795a4208479e6cd064e1b3e08311f1c1dd2a2f4
            Baseado nas suas leituras recentes de{" "}
            <span style={{ ...styles.tag, backgroundColor: "#DFF0FF", color: "#326A9F" }}>Suspense</span>
            {" "}e{" "}
            <span style={{ ...styles.tag, backgroundColor: "#FFE1E8", color: "#9F3A5B" }}>Stephen King</span>
          </p>
        </section>

        {/* ── Featured Book ── */}
        <section style={styles.featureSection}>
          <div style={styles.featureCard} onClick={() => navigate("/livro")}>

            <CoverImg
              src={featuredBooks[featured].cover}
              style={styles.bigCover}
            />

            <div style={styles.featureInfo}>
              <div style={styles.tagRow}>
                {featuredBooks[featured].tags.map((tag, i) => (
                  <span
                    key={tag}
                    style={{
                      ...styles.tag,
                      backgroundColor: featuredBooks[featured].tagColors[i]?.bg ?? "#EEE",
                      color: featuredBooks[featured].tagColors[i]?.color ?? "#333",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 style={styles.featuredTitle}>{featuredBooks[featured].title}</h2>
              <p style={styles.featuredAuthor}>{featuredBooks[featured].author}</p>
              <p style={styles.featuredDesc}>{featuredBooks[featured].description}</p>
            </div>
          </div>

          {/* dots */}
          <div style={styles.dots}>
            {featuredBooks.map((_, i) => (
              <span
                key={i}
                onClick={() => setFeatured(i)}
                style={i === featured ? { ...styles.dot, ...styles.dotActive } : styles.dot}
              />
            ))}
          </div>
        </section>

        {/* ── Books by Author ── */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Porque você gosta de Colleen Hoover</h2>
          <div style={styles.rowWrapper}>
            <button style={styles.arrowBtn} onClick={() => scroll(rowRef1, -1)}>‹</button>
            <div ref={rowRef1} style={styles.bookRow}>
              {booksByAuthor.map((book) => (
                <article key={book.id} style={styles.smallCard} onClick={() => navigate("/livro")}>
                  <CoverImg src={book.cover} style={styles.smallCover} />
                  <div style={styles.smallInfo}>
                    <p style={styles.smallTitle}>{book.title}</p>
                    <p style={styles.smallAuthor}>{book.author}</p>
                    <StarRating rating={book.rating} />
                  </div>
                </article>
              ))}
            </div>
            <button style={styles.arrowBtn} onClick={() => scroll(rowRef1, 1)}>›</button>
          </div>
        </section>

        {/* ── Vibe Books ── */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Baseados na sua vibe</h2>
          <div style={styles.rowWrapper}>
            <button style={styles.arrowBtn} onClick={() => scroll(rowRef2, -1)}>‹</button>
            <div ref={rowRef2} style={styles.bookRow}>
              {vibeBooks.map((book) => (
                <article key={book.id} style={styles.smallCard} onClick={() => navigate("/livro")}>
                  <CoverImg src={book.cover} style={styles.smallCover} />
                  <div style={styles.smallInfo}>
                    <p style={styles.smallTitle}>{book.title}</p>
                    <p style={styles.smallAuthor}>{book.author}</p>
                    <StarRating rating={book.rating} />
                  </div>
                </article>
              ))}
            </div>
            <button style={styles.arrowBtn} onClick={() => scroll(rowRef2, 1)}>›</button>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

<<<<<<< HEAD
// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#F8F6FF",
    fontFamily: "'PT Mono', monospace",
    color: "#301C54",
    display: "flex",
    flexDirection: "column",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "1050px",
    margin: "0 auto",
    padding: "28px 32px 56px",
    boxSizing: "border-box",
    flex: 1,
  },

  // Search
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    height: "42px",
    backgroundColor: "#E5E0EA",
    borderRadius: "30px",
    padding: "0 20px",
    maxWidth: "540px",
    margin: "0 auto 32px",
    boxSizing: "border-box",
  },
  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    fontFamily: "'PT Mono', monospace",
    fontSize: "13px",
    color: "#301C54",
  },

  // Greeting
  greetingSection: { marginBottom: "24px" },
  greeting: { fontSize: "28px", margin: "0 0 4px", color: "#1D1D1D", fontFamily: "'PT Mono', monospace" },
  question: { fontSize: "16px", margin: "0 0 14px", color: "#1D1D1D" },
  basedText: { fontSize: "13px", color: "#1D1D1D", margin: 0 },
  tag: {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "500",
  },

  // Featured
  featureSection: { marginBottom: "8px" },
  featureWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    maxWidth: "740px",
    margin: "0 auto",
  },
  featureArrow: {
    background: "none",
    border: "none",
    fontSize: "32px",
    color: "#7966CC",
    cursor: "pointer",
    padding: "4px 8px",
    flexShrink: 0,
    lineHeight: 1,
    userSelect: "none",
    opacity: 0.7,
    transition: "opacity 0.2s",
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
    flex: 1,
    cursor: "pointer",
  },
  bigCover: {
    width: "150px",
    height: "216px",
    borderRadius: "10px",
  },
  featureInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "8px",
  },
  tagRow: { display: "flex", gap: "8px", flexWrap: "wrap" },
  featuredTitle: {
    fontSize: "18px",
    margin: 0,
    color: "#1D1D1D",
    fontFamily: "'PT Mono', monospace",
    fontWeight: "600",
  },
  featuredAuthor: { fontSize: "13px", margin: 0, color: "#555" },
  featuredDesc: {
    fontSize: "12px",
    color: "#555",
    lineHeight: "1.7",
    margin: 0,
    display: "-webkit-box",
    WebkitLineClamp: 5,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },

  // Dots
  dots: {
    display: "flex",
    gap: "10px",
    maxWidth: "740px",
    margin: "14px auto 0",
    paddingLeft: "208px",   // seta(48px) + capa(150px) + gap(10px)
  },
  dot: {
    width: "36px",
    height: "4px",
    borderRadius: "2px",
    backgroundColor: "#D8D1E4",
    cursor: "pointer",
    display: "inline-block",
    transition: "all 0.3s",
  },
  dotActive: {
    width: "52px",
    backgroundColor: "#301C54",
  },

  // Sections
  section: { marginTop: "38px" },
  sectionTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1D1D1D",
    marginBottom: "14px",
    fontFamily: "'PT Mono', monospace",
  },
  rowWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  arrowBtn: {
    background: "none",
    border: "none",
    fontSize: "24px",
    color: "#7966CC",
    cursor: "pointer",
    padding: "4px 6px",
    flexShrink: 0,
    lineHeight: 1,
  },
  bookRow: {
    display: "flex",
    gap: "14px",
    overflowX: "auto",
    paddingBottom: "10px",
    scrollbarWidth: "none",
    flex: 1,
  },
  smallCard: {
    minWidth: "190px",
    maxWidth: "190px",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E8E0F0",
    borderRadius: "12px",
    padding: "10px",
    boxSizing: "border-box",
    display: "grid",
    gridTemplateColumns: "64px 1fr",
    gap: "10px",
    cursor: "pointer",
    flexShrink: 0,
    transition: "box-shadow 0.2s",
  },
  smallCover: {
    width: "64px",
    height: "90px",
    borderRadius: "8px",
  },
  smallInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "5px",
  },
  smallTitle: {
    fontSize: "11px",
    fontWeight: "600",
    color: "#1D1D1D",
    margin: 0,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    lineHeight: "1.4",
  },
  smallAuthor: {
    fontSize: "10px",
    color: "#777",
    margin: 0,
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
};

export default Home;
=======
export default Home;
>>>>>>> e795a4208479e6cd064e1b3e08311f1c1dd2a2f4
