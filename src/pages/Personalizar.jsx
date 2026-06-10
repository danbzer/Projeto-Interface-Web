import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import { useAuth } from "../context/AuthContext";
import CoverImg from "../components/ui/CoverImg";
import { useSearch } from "../hooks/useBooks";

const GENRES = [
  { name: "Terror", img: "https://images.unsplash.com/photo-1505635552518-3448ff116af3?w=200&auto=format&fit=crop&q=60" },
  { name: "Romance", img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=200&auto=format&fit=crop&q=60" },
  { name: "Ficção Científica", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&auto=format&fit=crop&q=60" },
  { name: "Fantasia", img: "https://images.unsplash.com/photo-1514894780887-121968d00567?w=200&auto=format&fit=crop&q=60" },
  { name: "Biografia", img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=200&auto=format&fit=crop&q=60" },
  { name: "Suspense", img: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=200&auto=format&fit=crop&q=60" },
  { name: "Mangá", img: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&auto=format&fit=crop&q=60" },
  { name: "HQ", img: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=200&auto=format&fit=crop&q=60" },
];

const AUTHORS = [
  { name: "Colleen Hoover", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80" },
  { name: "Stephen King", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
  { name: "Jane Austen", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" },
  { name: "Rick Riordan", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" },
  { name: "Sally Rooney", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" },
  { name: "Clarice Lispector", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80" },
];

const SUGGESTED_BOOKS = [
  { id: "s1", title: "It", author: "Stephen King", cover: "https://covers.openlibrary.org/b/isbn/9781501142970-M.jpg" },
  { id: "s2", title: "1984", author: "George Orwell", cover: "https://covers.openlibrary.org/b/isbn/9780451524935-M.jpg" },
  { id: "s3", title: "Harry Potter", author: "J.K. Rowling", cover: "https://covers.openlibrary.org/b/isbn/9780439708180-M.jpg" },
  { id: "s4", title: "Verity", author: "Colleen Hoover", cover: "https://covers.openlibrary.org/b/isbn/9781538724736-M.jpg" },
  { id: "s5", title: "O Alquimista", author: "Paulo Coelho", cover: "https://covers.openlibrary.org/b/isbn/9780062315007-M.jpg" },
  { id: "s6", title: "Duna", author: "Frank Herbert", cover: "https://covers.openlibrary.org/b/isbn/9780441013593-M.jpg" },
];

// Movi o componente para cima para garantir que o React o conheça antes de renderizar
function SuggestedBooks({ selectedBooks = [], setSelectedBooks }) {
  return (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      {SUGGESTED_BOOKS.map((book) => {
        const sel = selectedBooks ? selectedBooks.some((b) => b.id === book.id) : false;
        return (
          <div 
            key={book.id} 
            onClick={() => setSelectedBooks((prev) => sel ? prev.filter((b) => b.id !== book.id) : [...prev, book])}
            style={{ position: "relative", cursor: "pointer", border: sel ? "3px solid #E06237" : "3px solid transparent", borderRadius: 10, overflow: "hidden", height: 96, transition: "0.2s", transform: sel ? "scale(1.05)" : "none" }}
          >
            <CoverImg src={book.cover} style={{ width: 66, height: 96 }} />
            {sel && <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(224,98,55,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "#fff", fontWeight: "bold" }}>✓</div>}
          </div>
        );
      })}
    </div>
  );
}

export default function Personalizar() {
  const navigate = useNavigate();
  
  // Tratativa preventiva para caso o useAuth retorne undefined durante os testes
  const auth = useAuth();
  const updatePreferences = auth ? auth.updatePreferences : null;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  
  const searchHook = useSearch(searchQuery);
  const searchResults = searchHook ? searchHook.results || [] : [];

  const MIN_SELECTIONS = 5;
  const total = (selectedGenres?.length || 0) + (selectedAuthors?.length || 0) + (selectedBooks?.length || 0);

  const toggle = (list, setList, item) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleContinue = () => {
    if (total < MIN_SELECTIONS) return;
    if (updatePreferences) {
      updatePreferences({ genres: selectedGenres, authors: selectedAuthors, books: selectedBooks });
    }
    navigate("/home");
  };

  const isSelected = (list, item) => list.includes(item);

  return (
    <div style={s.page}>
      <Header showBack />
      <main style={s.main}>
        <div style={s.header}>
          <p style={s.tagline}>Você já está cadastrado!</p>
          <h2 style={s.title}>Vamos começar definindo suas preferências.</h2>
          <p style={s.subtitle}>Escolha pelo menos {MIN_SELECTIONS} opções entre Livros, Gêneros ou Autores...</p>
          <div style={s.counterWrapper}>
            <span style={{ 
              ...s.counter, 
              color: total >= MIN_SELECTIONS ? "#34A853" : "#E06237",
              backgroundColor: total >= MIN_SELECTIONS ? "#E6F4EA" : "#FCE8E6"
            }}>
              {total} de {MIN_SELECTIONS} selecionados {total >= MIN_SELECTIONS && "🎉"}
            </span>
          </div>
        </div>

        {/* Busca */}
        <div style={s.searchBox}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A0AEC0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input style={s.searchInput} type="text" placeholder="Pesquise por livros específicos..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>

        {/* Resultados da busca */}
        {searchResults.length > 0 && (
          <div style={s.section}>
            <h3 style={s.sectionTitle}>Resultados da Busca</h3>
            <div style={s.bookGrid}>
              {searchResults.slice(0, 6).map((book) => {
                const sel = selectedBooks.some((b) => b.id === book.id);
                return (
                  <div key={book.id} onClick={() => {
                    setSelectedBooks((prev) => sel ? prev.filter((b) => b.id !== book.id) : [...prev, book]);
                  }} style={{ ...s.bookItem, border: sel ? "2px solid #E06237" : "2px solid transparent", transform: sel ? "scale(1.03)" : "none" }}>
                    <CoverImg src={book.cover} style={{ width: 64, height: 92, borderRadius: 8 }} />
                    <p style={s.bookLabel}>{book.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Sugestões de livros */}
        {!searchQuery && (
          <div style={s.section}>
            <h3 style={s.sectionTitle}>Sugestões de Livros</h3>
            <SuggestedBooks selectedBooks={selectedBooks} setSelectedBooks={setSelectedBooks} />
          </div>
        )}

        {/* Gêneros */}
        <div style={s.section}>
          <h3 style={s.sectionTitle}>Seus Gêneros Favoritos</h3>
          <div style={s.genreGrid}>
            {GENRES.map((g) => {
              const sel = isSelected(selectedGenres, g.name);
              return (
                <div key={g.name} onClick={() => toggle(selectedGenres, setSelectedGenres, g.name)} 
                     style={{ ...s.genreItem, border: sel ? "2px solid #E06237" : "2px solid #E2E8F0", transform: sel ? "scale(1.03)" : "none", boxShadow: sel ? "0 8px 16px rgba(224,98,55,0.15)" : "none" }}>
                  <div style={s.genreImgWrapper}>
                    <img src={g.img} alt={g.name} style={s.genreImg} />
                    <div style={s.genreOverlay}></div>
                    <p style={s.genreLabel}>{g.name}</p>
                  </div>
                  {sel && <div style={s.checkBadge}>✓</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Escritores */}
        <div style={s.section}>
          <h3 style={s.sectionTitle}>Autores que você acompanha</h3>
          <div style={s.authorGrid}>
            {AUTHORS.map((a) => {
              const sel = isSelected(selectedAuthors, a.name);
              return (
                <div key={a.name} onClick={() => toggle(selectedAuthors, setSelectedAuthors, a.name)} 
                     style={{ ...s.authorItem, transform: sel ? "scale(1.05)" : "none" }}>
                  <div style={{ ...s.authorImgContainer, border: sel ? "3px solid #E06237" : "3px solid #E2E8F0" }}>
                    <img src={a.img} alt={a.name} style={s.authorImg} />
                  </div>
                  <p style={{ ...s.authorLabel, color: sel ? "#E06237" : "#2D3748", fontWeight: sel ? "700" : "600" }}>{a.name}</p>
                  {sel && <div style={s.checkBadgeAuthor}>✓</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Botões */}
        <div style={s.actions}>
          <button 
            style={{ 
              ...s.btn, 
              backgroundColor: total >= MIN_SELECTIONS ? "#E06237" : "#CBD5E0", 
              cursor: total >= MIN_SELECTIONS ? "pointer" : "not-allowed",
              boxShadow: total >= MIN_SELECTIONS ? "0 4px 14px rgba(224, 98, 55, 0.3)" : "none"
            }} 
            onClick={handleContinue} 
            disabled={total < MIN_SELECTIONS}
          >
            Continuar
          </button>
          <button style={{ ...s.btn, backgroundColor: "transparent", color: "#718096", border: "1px solid #E2E8F0", cursor: "pointer" }} onClick={() => navigate("/home")}>
            Pular esta etapa
          </button>
        </div>
      </main>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", backgroundColor: "#FAFAFA", fontFamily: "system-ui, -apple-system, sans-serif", color: "#1A202C" },
  main: { maxWidth: "840px", margin: "0 auto", padding: "40px 24px 100px", display: "flex", flexDirection: "column", gap: "36px" },
  header: { display: "flex", flexDirection: "column", gap: "8px" },
  tagline: { fontSize: "14px", color: "#E06237", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" },
  title: { fontSize: "26px", color: "#1A202C", fontWeight: "800", margin: 0, letterSpacing: "-0.5px" },
  subtitle: { fontSize: "15px", color: "#4A5568", margin: 0 },
  counterWrapper: { marginTop: "6px" },
  counter: { fontSize: "13px", fontWeight: "700", padding: "6px 14px", borderRadius: "20px", display: "inline-block" },
  searchBox: { display: "flex", alignItems: "center", gap: "12px", height: "48px", backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "30px", padding: "0 20px", maxWidth: "480px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" },
  searchInput: { flex: 1, border: "none", outline: "none", backgroundColor: "transparent", fontFamily: "inherit", fontSize: "14px", color: "#2D3748" },
  section: {},
  sectionTitle: { fontSize: "18px", fontWeight: "700", color: "#1A202C", marginBottom: "16px", letterSpacing: "-0.3px" },
  bookGrid: { display: "flex", gap: "16px", flexWrap: "wrap" },
  bookItem: { cursor: "pointer", borderRadius: 10, overflow: "hidden", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, transition: "0.2s", padding: 2 },
  bookLabel: { fontSize: "11px", color: "#2D3748", textAlign: "center", maxWidth: 64, lineHeight: 1.3, fontWeight: "500" },
  genreGrid: { display: "flex", gap: "16px", flexWrap: "wrap" },
  genreItem: { width: "120px", cursor: "pointer", borderRadius: "14px", overflow: "hidden", position: "relative", transition: "0.2s", background: "#fff", boxSizing: "border-box" },
  genreImgWrapper: { width: "100%", height: "76px", position: "relative" },
  genreImg: { width: "100%", height: "100%", objectFit: "cover" },
  genreOverlay: { position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.65))" },
  genreLabel: { position: "absolute", bottom: "8px", left: "0", right: "0", fontSize: "13px", color: "#FFFFFF", textAlign: "center", margin: 0, fontWeight: "700", padding: "0 4px", textShadow: "0 1px 2px rgba(0,0,0,0.5)" },
  authorGrid: { display: "flex", gap: "24px", flexWrap: "wrap" },
  authorItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: 10, cursor: "pointer", position: "relative", transition: "0.2s" },
  authorImgContainer: { width: "76px", height: "76px", borderRadius: "50%", overflow: "hidden", padding: "2px", transition: "0.2s", boxSizing: "border-box" },
  authorImg: { width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" },
  authorLabel: { fontSize: "12px", textAlign: "center", maxWidth: "86px", margin: 0, transition: "0.2s" },
  checkBadge: { position: "absolute", top: "6px", right: "6px", width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#E06237", color: "#fff", fontSize: "11px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" },
  checkBadgeAuthor: { position: "absolute", top: "2px", right: "4px", width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#E06237", color: "#fff", fontSize: "11px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" },
  actions: { display: "flex", flexDirection: "column", gap: "12px", maxWidth: "360px", margin: "50px auto 0", width: "100%" },
  btn: { width: "100%", padding: "14px", borderRadius: "30px", border: "none", fontSize: "16px", fontWeight: "700", transition: "0.2s", textAlign: "center", color: "#fff" },
};