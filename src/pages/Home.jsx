import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import CoverImg from "../components/ui/CoverImg";
import StarRating from "../components/ui/StarRating";
import { useAuth } from "../context/AuthContext";
import { useRecommendations, useSearch } from "../hooks/useBooks";

// Livros de backup para garantir que a tela NUNCA fique vazia se o hook falhar
const BACKUP_BOOKS_AUTHOR = [
  { id: "b1", title: "O Iluminado", author: "Stephen King", cover: "https://covers.openlibrary.org/b/isbn/9780345806789-M.jpg", averageRating: 4.8 },
  { id: "b2", title: "It: A Coisa", author: "Stephen King", cover: "https://covers.openlibrary.org/b/isbn/9781501142970-M.jpg", averageRating: 4.7 },
  { id: "b3", title: "Misery", author: "Stephen King", cover: "https://covers.openlibrary.org/b/isbn/9781501156748-M.jpg", averageRating: 4.6 },
];

const BACKUP_BOOKS_GENRE = [
  { id: "b4", title: "Drácula", author: "Bram Stoker", cover: "https://covers.openlibrary.org/b/isbn/9780486411095-M.jpg", averageRating: 4.5 },
  { id: "b5", title: "Frankenstein", author: "Mary Shelley", cover: "https://covers.openlibrary.org/b/isbn/97804 Dover-M.jpg", averageRating: 4.4 },
  { id: "b6", title: "O Corvo", author: "Edgar Allan Poe", cover: "https://covers.openlibrary.org/b/isbn/9780785834434-M.jpg", averageRating: 4.9 },
];

const DEFAULT_FEATURED = [
  { id: "f1", title: "O Homem de Giz", author: "C.J. Tudor", cover: "https://covers.openlibrary.org/b/isbn/9780593099247-L.jpg", tags: ["Suspense", "C.J. Tudor"], tagColors: [{ bg: "#DFF0FF", color: "#326A9F" }, { bg: "#FFE1E8", color: "#9F3A5B" }], description: "Em 1986, um grupo de crianças inventa um jogo macabro usando figuras de giz. Décadas depois, os desenhos voltam a aparecer — e os assassinatos recomeçam." },
  { id: "f2", title: "Verity", author: "Colleen Hoover", cover: "https://covers.openlibrary.org/b/isbn/9781538724736-L.jpg", tags: ["Thriller", "Romance"], tagColors: [{ bg: "#E8F5E9", color: "#2E7D32" }, { bg: "#FFF3E0", color: "#E65100" }], description: "Lowen Ashby aceita terminar a série de uma autora renomada. Mas ao chegar à mansão, encontra um manuscrito perturbador." },
  { id: "f3", title: "It Ends with Us", author: "Colleen Hoover", cover: "https://covers.openlibrary.org/b/isbn/9781501110368-L.jpg", tags: ["Romance", "Drama"], tagColors: [{ bg: "#FFE1E8", color: "#9F3A5B" }, { bg: "#EDE7F6", color: "#512DA8" }], description: "Lily jamais imaginaria que o amor da sua vida a colocaria na mesma situação que ela tanto tentou deixar para trás." },
];

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [menuAberto, setMenuAberto] = useState(false);
  const [search, setSearch] = useState("");
  const [featured, setFeatured] = useState(0);
  
  const rowRef1 = useRef(null);
  const rowRef2 = useRef(null);

  // Força uma leitura limpa das preferências
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

  // Tenta chamar os hooks
  const recHook = useRecommendations(activePrefs) || { byGenre: [], byAuthor: [], loading: false };
  const searchHook = useSearch(search) || { results: [], loading: false };

  const loading = recHook.loading;
  const searching = searchHook.loading;
  
  // Pegamos os resultados do Hook
  let searchResults = searchHook.results || [];

  // LÓGICA DE CORREÇÃO AQUI: Se a API não achou nada, fazemos a busca nas listas locais
  if (!searching && searchResults.length === 0 && search.length > 1) {
    const termo = search.toLowerCase();
    const todosOsLivrosLocais = [...BACKUP_BOOKS_AUTHOR, ...BACKUP_BOOKS_GENRE, ...DEFAULT_FEATURED];
    
    searchResults = todosOsLivrosLocais.filter((livro) => 
      livro.title.toLowerCase().includes(termo) ||
      livro.author.toLowerCase().includes(termo) ||
      (livro.tags && livro.tags.some(tag => tag.toLowerCase().includes(termo)))
    );

    // Remove livros duplicados caso existam nas duas listas
    searchResults = Array.from(new Map(searchResults.map(b => [b.id, b])).values());
  }

  // Se o hook não trouxer nada da API para as prateleiras, usamos a nossa lista local
  const booksByAuthor = recHook.byAuthor && recHook.byAuthor.length > 0 ? recHook.byAuthor : BACKUP_BOOKS_AUTHOR;
  const booksByGenre = recHook.byGenre && recHook.byGenre.length > 0 ? recHook.byGenre : BACKUP_BOOKS_GENRE;

  const scroll = (ref, dir) => ref.current?.scrollBy({ left: dir * 200, behavior: "smooth" });

  const firstName = user?.name?.split(" ")[0] || "Leitor";
  const genres = activePrefs?.genres || ["Terror"];
  const authors = activePrefs?.authors || ["Stephen King"];

  return (
    <div style={s.page}>
      <Header />
      
      <main style={s.main}>

        {/* Barra de Busca + Botão Menu 3 Pontinhos */}
        <div style={s.searchContainer}>
          <div style={s.searchBox}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A0AEC0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input style={s.searchInput} type="text" placeholder="Pesquise títulos, gêneros, autores..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          {/* Botão de 3 Pontinhos */}
          <div style={s.menuWrapper}>
            <button style={s.dotsBtn} onClick={() => setMenuAberto(!menuAberto)}>
              &#8942;
            </button>
            
            {/* Menu Flutuante Dropdown */}
            {menuAberto && (
              <div style={s.dropdownMenu}>
                <div style={s.dropdownItem} onClick={() => { navigate("/biblioteca"); setMenuAberto(false); }}>
                  📚 Minha Biblioteca
                </div>
                <div style={s.dropdownItem} onClick={() => { navigate("/perfil"); setMenuAberto(false); }}>
                  👤 Meu Perfil
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Fechar menu ao clicar fora */}
        {menuAberto && <div style={s.menuOverlay} onClick={() => setMenuAberto(false)} />}

        {/* Resultados de busca */}
        {search.length > 1 && (
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
                  <p style={s.featuredAuthor}>por {DEFAULT_FEATURED[featured].author}</p>
                  <p style={s.featuredDesc}>{DEFAULT_FEATURED[featured].description}</p>
                </div>
              </div>
              <div style={s.dots}>
                {DEFAULT_FEATURED.map((_, i) => (
                  <span key={i} onClick={() => setFeatured(i)} style={i === featured ? { ...s.dot, ...s.dotActive } : s.dot} />
                ))}
              </div>
            </section>

            {/* Carrossel de Autores */}
            <section style={s.section}>
              <h2 style={s.sectionTitle}>Porque você gosta de {authors[0]}</h2>
              <ScrollRow books={booksByAuthor} loading={loading} navigate={navigate} rowRef={rowRef1} scroll={scroll} />
            </section>

            {/* Carrossel de Gêneros */}
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
  page: { width: "100%", minHeight: "100vh", backgroundColor: "#FAFAFA", fontFamily: "system-ui, -apple-system, sans-serif", color: "#1A202C", display: "flex", flexDirection: "column" },
  main: { display: "flex", flexDirection: "column", width: "100%", maxWidth: "1050px", margin: "0 auto", padding: "32px 24px 60px", boxSizing: "border-box", flex: 1 },
  searchContainer: { display: "flex", alignItems: "center", gap: "12px", maxWidth: "580px", margin: "0 auto 32px", width: "100%", position: "relative" },
  searchBox: { display: "flex", alignItems: "center", gap: "12px", height: "46px", backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "30px", padding: "0 20px", flex: 1, boxSizing: "border-box", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" },
  searchInput: { flex: 1, border: "none", outline: "none", backgroundColor: "transparent", fontFamily: "inherit", fontSize: "14px", color: "#2D3748" },
  menuWrapper: { position: "relative", zIndex: 10 },
  dotsBtn: { background: "#FFFFFF", border: "1px solid #E2E8F0", width: "46px", height: "46px", borderRadius: "50%", fontSize: "22px", color: "#4A5568", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.02)", transition: "0.2s" },
  dropdownMenu: { position: "absolute", top: "54px", right: "0", backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "14px", width: "180px", boxShadow: "0 10px 25px rgba(0,0,0,0.08)", overflow: "hidden", zIndex: 11 },
  dropdownItem: { padding: "12px 16px", fontSize: "14px", color: "#2D3748", cursor: "pointer", fontWeight: "500", transition: "0.2s", textAlign: "left" },
  menuOverlay: { position: "fixed", inset: 0, zIndex: 5 },
  greetingSection: { marginBottom: "28px" },
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
  dotActive: { width: "52px", backgroundColor: "#E06237" },
  section: { marginTop: "40px" },
  sectionTitle: { fontSize: "18px", fontWeight: "700", color: "#1A202C", marginBottom: "16px" },
  rowWrapper: { display: "flex", alignItems: "center", gap: "4px" },
  arrowBtn: { background: "none", border: "none", fontSize: "32px", color: "#E06237", cursor: "pointer", padding: "0 10px", flexShrink: 0, lineHeight: 1, fontWeight: "bold", transition: "transform 0.2s" },
  bookRow: { display: "flex", gap: "16px", overflowX: "auto", paddingBottom: "14px", scrollbarWidth: "none", flex: 1 },
  smallCard: { minWidth: "210px", maxWidth: "210px", backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", padding: "12px", display: "grid", gridTemplateColumns: "68px 1fr", gap: "12px", cursor: "pointer", flexShrink: 0, boxShadow: "0 4px 10px rgba(0, 0, 0, 0.02)", transition: "all 0.25s ease-in-out" },
  smallCardHover: { transform: "translateY(-4px)", boxShadow: "0 8px 24px rgba(224, 98, 55, 0.12)", borderColor: "#E06237" },
  smallCover: { width: "68px", height: "96px", borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" },
  smallInfo: { display: "flex", flexDirection: "column", justifyContent: "center", gap: "6px" },
  smallTitle: { fontSize: "13px", fontWeight: "700", color: "#1A202C", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: "1.4", margin: 0 },
  smallAuthor: { fontSize: "11px", color: "#718096", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden", margin: 0 },
};