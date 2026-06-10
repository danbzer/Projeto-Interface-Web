import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import { useAuth } from "../context/AuthContext";
import CoverImg from "../components/ui/CoverImg";
import { useSearch } from "../hooks/useBooks";

const GENRES = [
  { name: "Terror", img: "https://covers.openlibrary.org/b/isbn/9780385121675-M.jpg" },
  { name: "Romance", img: "https://covers.openlibrary.org/b/isbn/9781501110368-M.jpg" },
  { name: "Ficção Científica", img: "https://covers.openlibrary.org/b/isbn/9780441013593-M.jpg" },
  { name: "Fantasia", img: "https://covers.openlibrary.org/b/isbn/9780439708180-M.jpg" },
  { name: "Biografia", img: "https://covers.openlibrary.org/b/isbn/9781501156700-M.jpg" },
  { name: "Suspense", img: "https://covers.openlibrary.org/b/isbn/9780593099247-M.jpg" },
  { name: "Mangá", img: "https://covers.openlibrary.org/b/isbn/9781421521794-M.jpg" },
  { name: "HQ", img: "https://covers.openlibrary.org/b/isbn/9780785124399-M.jpg" },
];

const AUTHORS = [
  { name: "Colleen Hoover", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Colleen_Hoover_%282022%29.jpg/200px-Colleen_Hoover_%282022%29.jpg" },
  { name: "Stephen King", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Stephen_King%2C_Comicon.jpg/200px-Stephen_King%2C_Comicon.jpg" },
  { name: "Jane Austen", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/CassandraAusten-JaneAusten%28c.1810%29_hires.jpg/200px-CassandraAusten-JaneAusten%28c.1810%29_hires.jpg" },
  { name: "Rick Riordan", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Rick_Riordan_2011_1.jpg/200px-Rick_Riordan_2011_1.jpg" },
  { name: "Sally Rooney", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Sally_Rooney.jpg/200px-Sally_Rooney.jpg" },
  { name: "Clarice Lispector", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Clarice_Lispector.jpg/200px-Clarice_Lispector.jpg" },
];

export default function Personalizar() {
  const navigate = useNavigate();
  const { updatePreferences } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const { results: searchResults, loading: searching } = useSearch(searchQuery);

  const MIN_SELECTIONS = 5;
  const total = selectedGenres.length + selectedAuthors.length + selectedBooks.length;

  const toggle = (list, setList, item) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleContinue = () => {
    if (total < MIN_SELECTIONS) return;
    updatePreferences({ genres: selectedGenres, authors: selectedAuthors, books: selectedBooks });
    navigate("/home");
  };

  const isSelected = (list, item) => list.includes(item);

  return (
    <div style={s.page}>
      <Header showBack />
      <main style={s.main}>
        <div style={s.header}>
          <p style={s.tagline}>Você já está cadastrado.</p>
          <h2 style={s.title}>Vamos começar definindo suas preferências.</h2>
          <p style={s.subtitle}>Escolha pelo menos {MIN_SELECTIONS} opções entre Livros, Gêneros, Autores...</p>
          <p style={s.counter}>{total} / {MIN_SELECTIONS} selecionados</p>
        </div>

        {/* Busca */}
        <div style={s.searchBox}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A7E99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input style={s.searchInput} type="text" placeholder="Pesquise aqui..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
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
                  }} style={{ ...s.bookItem, outline: sel ? "3px solid #7966CC" : "none" }}>
                    <CoverImg src={book.cover} style={{ width: 60, height: 88, borderRadius: 8 }} />
                    <p style={s.bookLabel}>{book.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Sugestões de livros baseadas no design */}
        {!searchQuery && (
          <div style={s.section}>
            <h3 style={s.sectionTitle}>Sugestões</h3>
            <p style={{ ...s.sectionTitle, fontSize: "12px", color: "#555", marginBottom: "10px" }}>Livros</p>
            <SuggestedBooks selectedBooks={selectedBooks} setSelectedBooks={setSelectedBooks} />
          </div>
        )}

        {/* Gêneros */}
        <div style={s.section}>
          <h3 style={s.sectionTitle}>Gêneros</h3>
          <div style={s.genreGrid}>
            {GENRES.map((g) => {
              const sel = isSelected(selectedGenres, g.name);
              return (
                <div key={g.name} onClick={() => toggle(selectedGenres, setSelectedGenres, g.name)} style={{ ...s.genreItem, outline: sel ? "3px solid #7966CC" : "none" }}>
                  <CoverImg src={g.img} style={{ width: "100%", height: 80, borderRadius: 10 }} />
                  <p style={s.genreLabel}>{g.name}</p>
                  {sel && <div style={s.checkBadge}>✓</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Escritores */}
        <div style={s.section}>
          <h3 style={s.sectionTitle}>Escritores</h3>
          <div style={s.authorGrid}>
            {AUTHORS.map((a) => {
              const sel = isSelected(selectedAuthors, a.name);
              return (
                <div key={a.name} onClick={() => toggle(selectedAuthors, setSelectedAuthors, a.name)} style={{ ...s.authorItem, outline: sel ? "3px solid #7966CC" : "none" }}>
                  <img src={a.img} alt={a.name} style={{ width: 70, height: 70, borderRadius: "50%", objectFit: "cover" }} onError={(e) => e.target.src = "https://via.placeholder.com/70"} />
                  <p style={s.authorLabel}>{a.name}</p>
                  {sel && <div style={s.checkBadge}>✓</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Botões */}
        <div style={s.actions}>
          <button style={{ ...s.btn, backgroundColor: total >= MIN_SELECTIONS ? "#301C54" : "#999", cursor: total >= MIN_SELECTIONS ? "pointer" : "not-allowed" }} onClick={handleContinue} disabled={total < MIN_SELECTIONS}>
            Continuar ({total}/{MIN_SELECTIONS})
          </button>
          <button style={{ ...s.btn, backgroundColor: "transparent", color: "#555", border: "1px solid #ccc" }} onClick={() => navigate("/home")}>
            Pular
          </button>
        </div>
      </main>
    </div>
  );
}

// Livros sugeridos hardcoded para a tela de preferências
const SUGGESTED_BOOKS = [
  { id: "s1", title: "It", author: "Stephen King", cover: "https://covers.openlibrary.org/b/isbn/9781501142970-M.jpg" },
  { id: "s2", title: "1984", author: "George Orwell", cover: "https://covers.openlibrary.org/b/isbn/9780451524935-M.jpg" },
  { id: "s3", title: "Harry Potter", author: "J.K. Rowling", cover: "https://covers.openlibrary.org/b/isbn/9780439708180-M.jpg" },
  { id: "s4", title: "Verity", author: "Colleen Hoover", cover: "https://covers.openlibrary.org/b/isbn/9781538724736-M.jpg" },
  { id: "s5", title: "O Alquimista", author: "Paulo Coelho", cover: "https://covers.openlibrary.org/b/isbn/9780062315007-M.jpg" },
  { id: "s6", title: "Duna", author: "Frank Herbert", cover: "https://covers.openlibrary.org/b/isbn/9780441013593-M.jpg" },
];

function SuggestedBooks({ selectedBooks, setSelectedBooks }) {
  return (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      {SUGGESTED_BOOKS.map((book) => {
        const sel = selectedBooks.some((b) => b.id === book.id);
        return (
          <div key={book.id} onClick={() => setSelectedBooks((prev) => sel ? prev.filter((b) => b.id !== book.id) : [...prev, book])}
            style={{ position: "relative", cursor: "pointer", outline: sel ? "3px solid #7966CC" : "none", borderRadius: 10, overflow: "hidden" }}>
            <CoverImg src={book.cover} style={{ width: 60, height: 88 }} />
            {sel && <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(121,102,204,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "#fff" }}>✓</div>}
          </div>
        );
      })}
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", backgroundColor: "#F8F6FF", fontFamily: "'PT Mono', monospace", color: "#301C54" },
  main: { maxWidth: "900px", margin: "0 auto", padding: "32px 24px 80px", display: "flex", flexDirection: "column", gap: "28px" },
  header: { display: "flex", flexDirection: "column", gap: "6px" },
  tagline: { fontSize: "14px", color: "#7966CC", fontWeight: "600" },
  title: { fontSize: "22px", color: "#1D1D1D", fontWeight: "600" },
  subtitle: { fontSize: "13px", color: "#555" },
  counter: { fontSize: "13px", color: "#7966CC", fontWeight: "600" },
  searchBox: { display: "flex", alignItems: "center", gap: "10px", height: "40px", backgroundColor: "#E5E0EA", borderRadius: "30px", padding: "0 16px", maxWidth: "480px" },
  searchInput: { flex: 1, border: "none", outline: "none", backgroundColor: "transparent", fontFamily: "'PT Mono', monospace", fontSize: "13px", color: "#301C54" },
  section: {},
  sectionTitle: { fontSize: "14px", fontWeight: "600", color: "#1D1D1D", marginBottom: "14px" },
  bookGrid: { display: "flex", gap: "12px", flexWrap: "wrap" },
  bookItem: { cursor: "pointer", borderRadius: 10, overflow: "hidden", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 },
  bookLabel: { fontSize: "10px", color: "#301C54", textAlign: "center", maxWidth: 60, lineHeight: 1.3 },
  genreGrid: { display: "flex", gap: "14px", flexWrap: "wrap" },
  genreItem: { width: 100, cursor: "pointer", borderRadius: 12, overflow: "hidden", position: "relative", display: "flex", flexDirection: "column", alignItems: "center" },
  genreLabel: { fontSize: "11px", color: "#301C54", textAlign: "center", marginTop: 6 },
  authorGrid: { display: "flex", gap: "20px", flexWrap: "wrap" },
  authorItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer", position: "relative", borderRadius: "50%", padding: 2 },
  authorLabel: { fontSize: "11px", color: "#301C54", textAlign: "center", maxWidth: 80 },
  checkBadge: { position: "absolute", top: 2, right: 2, width: 20, height: 20, borderRadius: "50%", backgroundColor: "#7966CC", color: "#fff", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" },
  actions: { display: "flex", flexDirection: "column", gap: "12px", maxWidth: 360, margin: "0 auto", width: "100%" },
  btn: { width: "100%", padding: "14px", borderRadius: "30px", border: "none", fontFamily: "'PT Mono', monospace", fontSize: "15px", color: "#fff", transition: "opacity 0.2s" },
};
