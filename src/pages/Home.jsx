import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import CoverImg from "../components/ui/CoverImg";
import StarRating from "../components/ui/StarRating";
import { useAuth } from "../context/AuthContext";
import { useRecommendations, useSearch } from "../hooks/useBooks";
import { useTheme } from "../context/ThemeContext";

const BACKUP_BOOKS_AUTHOR = [
  { id: "b1", title: "O Iluminado", author: "Stephen King", cover: "https://covers.openlibrary.org/b/isbn/9780345806789-M.jpg", averageRating: 4.8 },
  { id: "b2", title: "It: A Coisa", author: "Stephen King", cover: "https://covers.openlibrary.org/b/isbn/9781501142970-M.jpg", averageRating: 4.7 },
  { id: "b3", title: "Misery", author: "Stephen King", cover: "https://covers.openlibrary.org/b/isbn/9781501156748-M.jpg", averageRating: 4.6 },
];

const BACKUP_BOOKS_GENRE = [
  { id: "b4", title: "Drácula", author: "Bram Stoker", cover: "https://covers.openlibrary.org/b/isbn/9780486411095-M.jpg", averageRating: 4.5 },
  { id: "b5", title: "Frankenstein", author: "Mary Shelley", cover: "https://covers.openlibrary.org/b/isbn/9780486282114-M.jpg", averageRating: 4.4 },
  { id: "b6", title: "O Corvo", author: "Edgar Allan Poe", cover: "https://covers.openlibrary.org/b/isbn/9780785834434-M.jpg", averageRating: 4.9 },
];

const DEFAULT_FEATURED = [
  { id: "f1", title: "O Homem de Giz", author: "C.J. Tudor", cover: "https://covers.openlibrary.org/b/isbn/9780593099247-L.jpg", tags: ["Suspense", "C.J. Tudor"], tagColors: [{ bg: "#DFF0FF", color: "#326A9F" }, { bg: "#FFE1E8", color: "#9F3A5B" }], description: "Em 1986, um grupo de crianças inventa um jogo macabro usando figuras de giz. Décadas depois, os desenhos voltam a aparecer — e os assassinatos recomeçam." },
  { id: "f2", title: "Verity", author: "Colleen Hoover", cover: "https://covers.openlibrary.org/b/isbn/9781538724736-L.jpg", tags: ["Thriller", "Romance"], tagColors: [{ bg: "#E8F5E9", color: "#2E7D32" }, { bg: "#FFF3E0", color: "#E65100" }], description: "Lowen Ashby aceita terminar a série de uma autora renomada. Mas ao chegar à mansão, encontra um manuscrito perturbador." },
  { id: "f3", title: "It Ends with Us", author: "Colleen Hoover", cover: "https://covers.openlibrary.org/b/isbn/9781501110368-L.jpg", tags: ["Romance", "Drama"], tagColors: [{ bg: "#FFE1E8", color: "#9F3A5B" }, { bg: "#EDE7F6", color: "#512DA8" }], description: "Lily jamais imaginaria que o amor da sua vida a colocaria na mesma situação que ela tanto tentou deixar para trás." },
];

const FILTER_OPTIONS = {
  genero: ["Terror", "Romance", "Fantasia", "Ficção Científica", "Suspense", "Biografia", "HQ", "Mangá"],
  avaliacao: ["3+", "4+", "4.5+"],
  idioma: ["Português", "Inglês", "Espanhol"],
  ordenar: ["Relevância", "Mais avaliados", "Mais recentes"],
};

const LARANJA = "#E06237";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [featured, setFeatured] = useState(0);
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);
  const [filtros, setFiltros] = useState({ genero: [], avaliacao: "", idioma: "", ordenar: "" });
  const rowRef1 = useRef(null);
  const rowRef2 = useRef(null);
  const { tema } = useTheme();
  const isDark = tema === "Escuro";

  const totalFiltrosAtivos = filtros.genero.length + (filtros.avaliacao ? 1 : 0) + (filtros.idioma ? 1 : 0) + (filtros.ordenar ? 1 : 0);

  const toggleGenero = (g) => {
    setFiltros((prev) => ({
      ...prev,
      genero: prev.genero.includes(g) ? prev.genero.filter((x) => x !== g) : [...prev.genero, g],
    }));
  };

  const limparFiltros = () => setFiltros({ genero: [], avaliacao: "", idioma: "", ordenar: "" });

  const [activePrefs] = useState(() => {
    if (user?.preferences) return user.preferences;
    try {
      const localUser = localStorage.getItem("user");
      if (localUser) {
        const parsed = JSON.parse(localUser);
        if (parsed.preferences) return parsed.preferences;
      }
    } catch (e) {}
    return { genres: ["Terror"], authors: ["Stephen King"] };
  });

  const recHook = useRecommendations(activePrefs) || { byGenre: [], byAuthor: [], loading: false };
  const searchHook = useSearch(search) || { results: [], loading: false };

  const loading = recHook.loading;
  const searching = searchHook.loading;
  const searchResults = searchHook.results || [];

  const booksByAuthor = recHook.byAuthor?.length > 0 ? recHook.byAuthor : BACKUP_BOOKS_AUTHOR;
  const booksByGenre = recHook.byGenre?.length > 0 ? recHook.byGenre : BACKUP_BOOKS_GENRE;

  const scroll = (ref, dir) => ref.current?.scrollBy({ left: dir * 200, behavior: "smooth" });

  const firstName = user?.name?.split(" ")[0] || "Leitor";
  const genres = activePrefs?.genres || ["Terror"];
  const authors = activePrefs?.authors || ["Stephen King"];

  const featuredList = recHook.byGenre?.length > 0 
    ? recHook.byGenre.slice(0, 3).map((book, index) => ({
        ...book,
        tags: [genres[0] || "Recomendado", index === 0 ? "Em Alta" : "Destaque"],
        tagColors: [
          { bg: "#DFF0FF", color: "#326A9F" },
          { bg: "#FFE1E8", color: "#9F3A5B" }
        ],
        description: book.description || "Uma excelente leitura recomendada especialmente para você com base nas suas preferências atuais."
      }))
    : DEFAULT_FEATURED;

  const currentFeatured = featuredList[featured] || featuredList[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setFeatured((prev) => (prev + 1) % featuredList.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredList.length]);

  return (
    <div style={{ ...s.page, backgroundColor: isDark ? "#1A202C" : "#FAFAFA", color: isDark ? "#F7FAFC" : "#1A202C" }}>
      <Header showUser />

      <main style={s.main}>

        {/* Barra de Busca + Botão Filtros */}
        <div style={s.searchContainer}>
          <div style={s.searchBox}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A0AEC0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input 
              style={s.searchInput} 
              type="text" 
              placeholder="Pesquise títulos, gêneros, autores..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
            />
            {search.length > 0 && (
              <button 
                onClick={() => setSearch("")} 
                style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: "4px" }}
                title="Limpar pesquisa"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A0AEC0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>

          <button style={{ ...s.filtrosBtn, backgroundColor: totalFiltrosAtivos > 0 ? LARANJA : "#FFFFFF", color: totalFiltrosAtivos > 0 ? "#FFFFFF" : "#4A5568", border: totalFiltrosAtivos > 0 ? "none" : "1px solid #E2E8F0" }} onClick={() => setFiltrosAbertos(!filtrosAbertos)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
            Filtros
            {totalFiltrosAtivos > 0 && (
              <span style={s.filtrosBadge}>{totalFiltrosAtivos}</span>
            )}
          </button>
        </div>

        {/* Painel de Filtros */}
        {filtrosAbertos && (
          <div style={s.filtrosPanel}>
            <div style={s.filtroGrupo}>
              <p style={s.filtroLabel}>Gênero</p>
              <div style={s.filtroOpcoes}>
                {FILTER_OPTIONS.genero.map((g) => (
                  <button key={g} onClick={() => toggleGenero(g)}
                    style={{ ...s.filtroChip, backgroundColor: filtros.genero.includes(g) ? LARANJA : "#F8FAFC", color: filtros.genero.includes(g) ? "#FFF" : "#4A5568", border: filtros.genero.includes(g) ? "none" : "1px solid #E2E8F0" }}>
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div style={s.filtroDivider} />

            <div style={s.filtroGrupo}>
              <p style={s.filtroLabel}>Avaliação mínima</p>
              <div style={s.filtroOpcoes}>
                {FILTER_OPTIONS.avaliacao.map((a) => (
                  <button key={a} onClick={() => setFiltros((prev) => ({ ...prev, avaliacao: prev.avaliacao === a ? "" : a }))}
                    style={{ ...s.filtroChip, backgroundColor: filtros.avaliacao === a ? LARANJA : "#F8FAFC", color: filtros.avaliacao === a ? "#FFF" : "#4A5568", border: filtros.avaliacao === a ? "none" : "1px solid #E2E8F0" }}>
                    ⭐ {a}
                  </button>
                ))}
              </div>
            </div>

            <div style={s.filtroDivider} />

            <div style={s.filtroGrupo}>
              <p style={s.filtroLabel}>Idioma</p>
              <div style={s.filtroOpcoes}>
                {FILTER_OPTIONS.idioma.map((i) => (
                  <button key={i} onClick={() => setFiltros((prev) => ({ ...prev, idioma: prev.idioma === i ? "" : i }))}
                    style={{ ...s.filtroChip, backgroundColor: filtros.idioma === i ? LARANJA : "#F8FAFC", color: filtros.idioma === i ? "#FFF" : "#4A5568", border: filtros.idioma === i ? "none" : "1px solid #E2E8F0" }}>
                    {i}
                  </button>
                ))}
              </div>
            </div>

            <div style={s.filtroDivider} />

            <div style={s.filtroGrupo}>
              <p style={s.filtroLabel}>Ordenar por</p>
              <div style={s.filtroOpcoes}>
                {FILTER_OPTIONS.ordenar.map((o) => (
                  <button key={o} onClick={() => setFiltros((prev) => ({ ...prev, ordenar: prev.ordenar === o ? "" : o }))}
                    style={{ ...s.filtroChip, backgroundColor: filtros.ordenar === o ? LARANJA : "#F8FAFC", color: filtros.ordenar === o ? "#FFF" : "#4A5568", border: filtros.ordenar === o ? "none" : "1px solid #E2E8F0" }}>
                    {o}
                  </button>
                ))}
              </div>
            </div>

            {totalFiltrosAtivos > 0 && (
              <>
                <div style={s.filtroDivider} />
                <div style={{ display: "flex", justifyContent: "flex-end", padding: "4px 0" }}>
                  <button onClick={limparFiltros} style={{ background: "none", border: "none", color: "#718096", fontSize: "13px", cursor: "pointer", fontFamily: "inherit", fontWeight: "600" }}>
                    Limpar filtros
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Resultados de busca */}
        {search.length > 0 && (
          <section style={s.section}>
            <h2 style={s.sectionTitle}>{searching ? "Buscando..." : `Resultados para "${search}"`}</h2>
            <div style={s.rowWrapper}>
              <div style={s.bookRow}>
                {searchResults.map((book) => (
                  <BookCard key={book.id} book={book} onClick={() => navigate("/livro", { state: book })} />
                ))}
                {!searching && searchResults.length === 0 && <p style={{ color: "#718096", fontSize: "14px" }}>Nenhum resultado encontrado.</p>}
              </div>
            </div>
          </section>
        )}

        {!search && (
          <>
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

            <section style={s.featureSection}>
              <div style={s.featureCard} onClick={() => navigate("/livro", { state: currentFeatured })}>
                <CoverImg src={currentFeatured.cover} style={s.bigCover} />
                <div style={s.featureInfo}>
                  <div style={s.tagRow}>
                    {currentFeatured.tags?.map((tag, i) => (
                      <span key={tag} style={{ ...s.tag, backgroundColor: currentFeatured.tagColors[i]?.bg, color: currentFeatured.tagColors[i]?.color }}>{tag}</span>
                    ))}
                  </div>
                  <h2 style={s.featuredTitle}>{currentFeatured.title}</h2>
                  <p style={s.featuredAuthor}>por {currentFeatured.author}</p>
                  <p style={s.featuredDesc}>{currentFeatured.description}</p>
                </div>
              </div>
              <div style={s.dots}>
                {featuredList.map((_, i) => (
                  <span key={i} onClick={() => setFeatured(i)} style={i === featured ? { ...s.dot, ...s.dotActive } : s.dot} />
                ))}
              </div>
            </section>

            <section style={s.section}>
              <h2 style={s.sectionTitle}>Porque você gosta de {authors[0]}</h2>
              <ScrollRow books={booksByAuthor} loading={loading} navigate={navigate} rowRef={rowRef1} scroll={scroll} />
            </section>

            <section style={s.section}>
              <h2 style={s.sectionTitle}>Baseados na sua vibe de {genres[0]}</h2>
              <ScrollRow books={booksByGenre} loading={loading} navigate={navigate} rowRef={rowRef2} scroll={scroll} />
            </section>
          </>
        )}
      </main>
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

function ScrollRow({ books = [], loading, navigate, rowRef, scroll }) {
  return (
    <div style={s.rowWrapper}>
      <button style={s.arrowBtn} onClick={() => scroll(rowRef, -1)}>‹</button>
      <div ref={rowRef} style={s.bookRow}>
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : books.length === 0 ? (
          <p style={{ fontSize: "14px", color: "#718096" }}>Nenhum livro encontrado.</p>
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
      <div style={{ ...s.smallCover, backgroundColor: "#E2E8F0" }} />
      <div style={s.smallInfo}>
        <div style={{ height: 10, width: "80%", backgroundColor: "#E2E8F0", borderRadius: 4 }} />
        <div style={{ height: 8, width: "60%", backgroundColor: "#EDF2F7", borderRadius: 4 }} />
      </div>
    </div>
  );
}

const s = {
  page: { width: "100%", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif", display: "flex", flexDirection: "column" },
  main: { display: "flex", flexDirection: "column", width: "100%", maxWidth: "1050px", margin: "0 auto", padding: "32px 24px 60px", boxSizing: "border-box", flex: 1 },
  searchContainer: { display: "flex", alignItems: "center", gap: "12px", maxWidth: "580px", margin: "0 auto 16px", width: "100%" },
  searchBox: { display: "flex", alignItems: "center", gap: "12px", height: "46px", backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "30px", padding: "0 20px", flex: 1, boxSizing: "border-box", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" },
  searchInput: { flex: 1, border: "none", outline: "none", backgroundColor: "transparent", fontFamily: "inherit", fontSize: "14px", color: "#2D3748" },
  filtrosBtn: { display: "flex", alignItems: "center", gap: "6px", padding: "0 16px", height: "46px", borderRadius: "30px", fontSize: "14px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit", flexShrink: 0, transition: "all 0.2s", boxShadow: "0 2px 8px rgba(0,0,0,0.02)", position: "relative" },
  filtrosBadge: { backgroundColor: "#FFFFFF", color: LARANJA, borderRadius: "50%", width: "18px", height: "18px", fontSize: "11px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center" },
  filtrosPanel: { maxWidth: "580px", margin: "0 auto 24px", width: "100%", backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "20px", padding: "20px", boxShadow: "0 8px 24px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column", gap: "16px" },
  filtroGrupo: { display: "flex", flexDirection: "column", gap: "10px" },
  filtroLabel: { fontSize: "13px", fontWeight: "700", color: "#1A202C", margin: 0, textTransform: "uppercase", letterSpacing: "0.5px" },
  filtroOpcoes: { display: "flex", gap: "8px", flexWrap: "wrap" },
  filtroChip: { padding: "6px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: "500", cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" },
  filtroDivider: { height: "1px", backgroundColor: "#F1F5F9" },
  greetingSection: { marginBottom: "28px", marginTop: "16px" },
  greeting: { fontSize: "28px", marginBottom: "6px", color: "#1A202C", fontWeight: "700" },
  question: { fontSize: "16px", marginBottom: "14px", color: "#4A5568", fontWeight: "500" },
  basedText: { fontSize: "14px", color: "#718096" },
  tag: { display: "inline-block", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", margin: "0 2px" },
  featureSection: { marginBottom: "16px" },
  featureCard: { display: "grid", gridTemplateColumns: "150px 1fr", gap: "24px", backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "20px", padding: "20px", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" },
  bigCover: { width: "150px", height: "216px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.08)" },
  featureInfo: { display: "flex", flexDirection: "column", justifyContent: "center", gap: "10px" },
  tagRow: { display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "4px" },
  featuredTitle: { fontSize: "22px", color: "#1A202C", fontWeight: "700", margin: 0 },
  featuredAuthor: { fontSize: "14px", color: "#718096", fontWeight: "500", margin: 0 },
  featuredDesc: { fontSize: "14px", color: "#4A5568", lineHeight: "1.6", display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden", margin: 0 },
  dots: { display: "flex", gap: "10px", margin: "16px 0 0 174px" },
  dot: { width: "36px", height: "5px", borderRadius: "3px", backgroundColor: "#E2E8F0", cursor: "pointer", display: "inline-block", transition: "all 0.3s" },
  dotActive: { width: "52px", backgroundColor: LARANJA },
  section: { marginTop: "40px" },
  sectionTitle: { fontSize: "18px", fontWeight: "700", color: "#1A202C", marginBottom: "16px" },
  rowWrapper: { display: "flex", alignItems: "center", gap: "4px" },
  arrowBtn: { background: "none", border: "none", fontSize: "32px", color: LARANJA, cursor: "pointer", padding: "0 10px", flexShrink: 0, lineHeight: 1, fontWeight: "bold" },
  bookRow: { display: "flex", gap: "16px", overflowX: "auto", paddingBottom: "14px", scrollbarWidth: "none", flex: 1 },
  smallCard: { minWidth: "210px", maxWidth: "210px", backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "12px", display: "grid", gridTemplateColumns: "68px 1fr", gap: "12px", cursor: "pointer", flexShrink: 0, boxShadow: "0 4px 10px rgba(0,0,0,0.02)", transition: "all 0.25s ease-in-out" },
  smallCardHover: { transform: "translateY(-4px)", boxShadow: "0 8px 24px rgba(224,98,55,0.12)", borderColor: LARANJA },
  smallCover: { width: "68px", height: "96px", borderRadius: "8px" },
  smallInfo: { display: "flex", flexDirection: "column", justifyContent: "center", gap: "6px" },
  smallTitle: { fontSize: "13px", fontWeight: "700", color: "#1A202C", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: "1.4", margin: 0 },
  smallAuthor: { fontSize: "11px", color: "#718096", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden", margin: 0 },
};
