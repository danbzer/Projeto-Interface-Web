import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CoverImg from "../components/ui/CoverImg";
import StarRating from "../components/ui/StarRating";
import { useAuth } from "../context/AuthContext";
import { useRecommendations } from "../hooks/useBooks";
import { useSearch } from "../hooks/useBooks";

// Fallback featured books caso não haja prefs
const DEFAULT_FEATURED = [
  { id: "f1", title: "O Homem de Giz", author: "C.J. Tudor", cover: "https://covers.openlibrary.org/b/isbn/9780593099247-L.jpg", tags: ["Suspense", "C.J. Tudor"], tagColors: [{ bg: "#DFF0FF", color: "#326A9F" }, { bg: "#FFE1E8", color: "#9F3A5B" }], description: "Em 1986, um grupo de crianças inventa um jogo macabro usando figuras de giz. Décadas depois, os desenhos voltam a aparecer — e os assassinatos recomeçam." },
  { id: "f2", title: "Verity", author: "Colleen Hoover", cover: "https://covers.openlibrary.org/b/isbn/9781538724736-L.jpg", tags: ["Thriller", "Romance"], tagColors: [{ bg: "#E8F5E9", color: "#2E7D32" }, { bg: "#FFF3E0", color: "#E65100" }], description: "Lowen Ashby aceita terminar a série de uma autora renomada. Mas ao chegar à mansão, encontra um manuscrito perturbador." },
  { id: "f3", title: "It Ends with Us", author: "Colleen Hoover", cover: "https://covers.openlibrary.org/b/isbn/9781501110368-L.jpg", tags: ["Romance", "Drama"], tagColors: [{ bg: "#FFE1E8", color: "#9F3A5B" }, { bg: "#EDE7F6", color: "#512DA8" }], description: "Lily jamais imaginaria que o amor da sua vida a colocaria na mesma situação que ela tanto tentou deixar para trás." },
];

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const prefs = user?.preferences;

  const [search, setSearch] = useState("");
  const [featured, setFeatured] = useState(0);
  const rowRef1 = useRef(null);
  const rowRef2 = useRef(null);

  const { byGenre, byAuthor, loading } = useRecommendations(prefs);
  const { results: searchResults, loading: searching } = useSearch(search);

  const scroll = (ref, dir) => ref.current?.scrollBy({ left: dir * 200, behavior: "smooth" });

  const firstName = user?.name?.split(" ")[0] || "Leitor";
  const genres = prefs?.genres || [];
  const authors = prefs?.authors || [];

  return (
    <div style={s.page}>
      <Header />
      <main style={s.main}>

        {/* Busca */}
        <div style={s.searchBox}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A7E99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input style={s.searchInput} type="text" placeholder="Pesquise títulos, gêneros, autores..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {/* Resultados de busca */}
        {search.length > 1 && (
          <section style={s.section}>
            <h2 style={s.sectionTitle}>{searching ? "Buscando..." : `Resultados para "${search}"`}</h2>
            <div style={s.rowWrapper}>
              <div style={s.bookRow}>
                {searchResults.map((book) => (
                  <BookCard key={book.id} book={book} onClick={() => navigate("/livro", { state: book })} />
                ))}
                {!searching && searchResults.length === 0 && <p style={{ color: "#888", fontSize: "13px" }}>Nenhum resultado encontrado.</p>}
              </div>
            </div>
          </section>
        )}

        {!search && (
          <>
            {/* Saudação */}
            <section style={s.greetingSection}>
              <h1 style={s.greeting}>Olá, {firstName}!</h1>
              <p style={s.question}>O que vamos ler hoje?</p>
              {genres.length > 0 && (
                <p style={s.basedText}>
                  Baseado nas suas preferências de{" "}
                  {genres.slice(0, 2).map((g, i) => (
                    <span key={g} style={{ ...s.tag, backgroundColor: i === 0 ? "#DFF0FF" : "#FFE1E8", color: i === 0 ? "#326A9F" : "#9F3A5B" }}>{g}</span>
                  )).reduce((acc, el, i) => i === 0 ? [el] : [...acc, " e ", el], [])}
                </p>
              )}
            </section>

            {/* Destaque */}
            <section style={s.featureSection}>
              <div style={s.featureCard} onClick={() => navigate("/livro", { state: DEFAULT_FEATURED[featured] })}>
                <CoverImg src={DEFAULT_FEATURED[featured].cover} style={s.bigCover} />
                <div style={s.featureInfo}>
                  <div style={s.tagRow}>
                    {DEFAULT_FEATURED[featured].tags.map((tag, i) => (
                      <span key={tag} style={{ ...s.tag, backgroundColor: DEFAULT_FEATURED[featured].tagColors[i]?.bg, color: DEFAULT_FEATURED[featured].tagColors[i]?.color }}>{tag}</span>
                    ))}
                  </div>
                  <h2 style={s.featuredTitle}>{DEFAULT_FEATURED[featured].title}</h2>
                  <p style={s.featuredAuthor}>{DEFAULT_FEATURED[featured].author}</p>
                  <p style={s.featuredDesc}>{DEFAULT_FEATURED[featured].description}</p>
                </div>
              </div>
              <div style={s.dots}>
                {DEFAULT_FEATURED.map((_, i) => (
                  <span key={i} onClick={() => setFeatured(i)} style={i === featured ? { ...s.dot, ...s.dotActive } : s.dot} />
                ))}
              </div>
            </section>

            {/* Por autor favorito */}
            {authors.length > 0 && (
              <section style={s.section}>
                <h2 style={s.sectionTitle}>Porque você gosta de {authors[0]}</h2>
                <ScrollRow books={byAuthor.length > 0 ? byAuthor : []} loading={loading} navigate={navigate} ref={rowRef1} scroll={scroll} rowRef={rowRef1} />
              </section>
            )}

            {/* Por gênero */}
            {genres.length > 0 && (
              <section style={s.section}>
                <h2 style={s.sectionTitle}>Baseados na sua vibe de {genres[0]}</h2>
                <ScrollRow books={byGenre.length > 0 ? byGenre : []} loading={loading} navigate={navigate} rowRef={rowRef2} scroll={scroll} />
              </section>
            )}

            {/* Fallback quando não tem prefs */}
            {!prefs && (
              <section style={s.section}>
                <h2 style={s.sectionTitle}>Personalize seu feed</h2>
                <p style={{ fontSize: "13px", color: "#555", marginBottom: "12px" }}>Defina suas preferências para receber recomendações personalizadas.</p>
                <button onClick={() => navigate("/personalizar")} style={s.prefBtn}>Definir preferências</button>
              </section>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

function BookCard({ book, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <article onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ ...s.smallCard, ...(hovered ? s.smallCardHover : {}) }}>
      <CoverImg src={book.cover} style={s.smallCover} />
      <div style={s.smallInfo}>
        <p style={s.smallTitle}>{book.title}</p>
        <p style={s.smallAuthor}>{book.author}</p>
        {book.averageRating && <StarRating rating={book.averageRating} />}
      </div>
    </article>
  );
}

function ScrollRow({ books, loading, navigate, rowRef, scroll }) {
  return (
    <div style={s.rowWrapper}>
      <button style={s.arrowBtn} onClick={() => scroll(rowRef, -1)}>‹</button>
      <div ref={rowRef} style={s.bookRow}>
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : books.length === 0 ? (
          <p style={{ fontSize: "13px", color: "#888" }}>Nenhum livro encontrado.</p>
        ) : (
          books.map((book) => <BookCard key={book.id} book={book} onClick={() => navigate("/livro", { state: book })} />)
        )}
      </div>
      <button style={s.arrowBtn} onClick={() => scroll(rowRef, 1)}>›</button>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div style={{ ...s.smallCard, cursor: "default" }}>
      <div style={{ ...s.smallCover, backgroundColor: "#E5E0EA" }} />
      <div style={s.smallInfo}>
        <div style={{ height: 10, width: "80%", backgroundColor: "#E5E0EA", borderRadius: 4 }} />
        <div style={{ height: 8, width: "60%", backgroundColor: "#EEE", borderRadius: 4 }} />
      </div>
    </div>
  );
}

const s = {
  page: { width: "100%", minHeight: "100vh", backgroundColor: "#F8F6FF", fontFamily: "'PT Mono', monospace", color: "#301C54", display: "flex", flexDirection: "column" },
  main: { display: "flex", flexDirection: "column", width: "100%", maxWidth: "1050px", margin: "0 auto", padding: "28px 32px 56px", boxSizing: "border-box", flex: 1 },
  searchBox: { display: "flex", alignItems: "center", gap: "10px", height: "42px", backgroundColor: "#E5E0EA", borderRadius: "30px", padding: "0 20px", maxWidth: "540px", margin: "0 auto 32px", boxSizing: "border-box" },
  searchInput: { flex: 1, border: "none", outline: "none", backgroundColor: "transparent", fontFamily: "'PT Mono', monospace", fontSize: "13px", color: "#301C54" },
  greetingSection: { marginBottom: "24px" },
  greeting: { fontSize: "28px", marginBottom: "4px", color: "#1D1D1D", fontFamily: "'PT Mono', monospace" },
  question: { fontSize: "16px", marginBottom: "14px", color: "#1D1D1D" },
  basedText: { fontSize: "13px", color: "#1D1D1D" },
  tag: { display: "inline-block", padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "500", margin: "0 2px" },
  featureSection: { marginBottom: "8px" },
  featureCard: { display: "grid", gridTemplateColumns: "150px 1fr", gap: "20px", backgroundColor: "#FFFFFF", border: "1px solid #E8E0F0", borderRadius: "16px", padding: "18px", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" },
  bigCover: { width: "150px", height: "216px", borderRadius: "10px" },
  featureInfo: { display: "flex", flexDirection: "column", justifyContent: "center", gap: "8px" },
  tagRow: { display: "flex", gap: "8px", flexWrap: "wrap" },
  featuredTitle: { fontSize: "18px", color: "#1D1D1D", fontFamily: "'PT Mono', monospace", fontWeight: "600" },
  featuredAuthor: { fontSize: "13px", color: "#555" },
  featuredDesc: { fontSize: "12px", color: "#555", lineHeight: "1.7", display: "-webkit-box", WebkitLineClamp: 5, WebkitBoxOrient: "vertical", overflow: "hidden" },
  dots: { display: "flex", gap: "10px", margin: "14px 0 0 170px" },
  dot: { width: "36px", height: "4px", borderRadius: "2px", backgroundColor: "#D8D1E4", cursor: "pointer", display: "inline-block", transition: "all 0.3s" },
  dotActive: { width: "52px", backgroundColor: "#301C54" },
  section: { marginTop: "38px" },
  sectionTitle: { fontSize: "14px", fontWeight: "600", color: "#1D1D1D", marginBottom: "14px", fontFamily: "'PT Mono', monospace" },
  rowWrapper: { display: "flex", alignItems: "center", gap: "8px" },
  arrowBtn: { background: "none", border: "none", fontSize: "24px", color: "#7966CC", cursor: "pointer", padding: "4px 6px", flexShrink: 0, lineHeight: 1 },
  bookRow: { display: "flex", gap: "14px", overflowX: "auto", paddingBottom: "10px", scrollbarWidth: "none", flex: 1 },
  smallCard: { minWidth: "190px", maxWidth: "190px", backgroundColor: "#FFFFFF", border: "1px solid #E8E0F0", borderRadius: "12px", padding: "10px", display: "grid", gridTemplateColumns: "64px 1fr", gap: "10px", cursor: "pointer", flexShrink: 0, boxShadow: "0 2px 8px rgba(48, 28, 84, 0.05)", transition: "all 0.25s ease-in-out" },
  smallCardHover: { transform: "translateY(-4px)", boxShadow: "0 8px 20px rgba(121,102,204,0.18)", borderColor: "#7966CC" },
  smallCover: { width: "64px", height: "90px", borderRadius: "8px" },
  smallInfo: { display: "flex", flexDirection: "column", justifyContent: "center", gap: "5px" },
  smallTitle: { fontSize: "11px", fontWeight: "600", color: "#1D1D1D", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: "1.4" },
  smallAuthor: { fontSize: "10px", color: "#777", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" },
  prefBtn: { padding: "12px 24px", borderRadius: "30px", backgroundColor: "#7966CC", color: "#fff", border: "none", fontFamily: "'PT Mono', monospace", fontSize: "13px", cursor: "pointer" },
};
