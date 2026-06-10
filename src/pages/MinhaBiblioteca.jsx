import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CoverImg from "../components/ui/CoverImg";
import StarRating from "../components/ui/StarRating";
import { useShelf } from "../context/ShelfContext";
import { useSearch } from "../hooks/useBooks";

const STATUS_LABELS = { todos: "Todos", lido: "Lidos", lendo: "Lendo", queroLer: "Quero Ler", abandonei: "Abandonei" };

export default function MinhaBiblioteca() {
  const navigate = useNavigate();
  const { getByStatus, counts, addToShelf } = useShelf();
  const [filter, setFilter] = useState("todos");
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { results, loading } = useSearch(showSearch ? searchQuery : "");

  const books = getByStatus(filter);

  return (
    <div style={s.page}>
      <Header />
      <main style={s.main}>

        {/* Topo */}
        <div style={s.topRow}>
          <div>
            <h1 style={s.title}>Minha Biblioteca</h1>
            <p style={s.subtitle}>O que vamos ler hoje?</p>
          </div>
          <button style={s.addBtn} onClick={() => setShowSearch(!showSearch)}>+ Adicionar</button>
        </div>

        {/* Modal de busca para adicionar livro */}
        {showSearch && (
          <div style={s.searchModal}>
            <div style={s.searchBox}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A7E99" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input style={s.searchInput} type="text" placeholder="Buscar livro para adicionar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} autoFocus />
              <button onClick={() => { setShowSearch(false); setSearchQuery(""); }} style={s.closeBtn}>✕</button>
            </div>
            {searchQuery.length > 1 && (
              <div style={s.searchResults}>
                {loading && <p style={s.loadingText}>Buscando...</p>}
                {!loading && results.map((book) => (
                  <div key={book.id} style={s.searchResultItem}>
                    <CoverImg src={book.cover} style={{ width: 40, height: 58, borderRadius: 6 }} />
                    <div style={{ flex: 1 }}>
                      <p style={s.resultTitle}>{book.title}</p>
                      <p style={s.resultAuthor}>{book.author}</p>
                    </div>
                    <select defaultValue="" onChange={(e) => { if (e.target.value) { addToShelf(book, e.target.value); setShowSearch(false); setSearchQuery(""); } }}
                      style={s.statusSelect}>
                      <option value="" disabled>Adicionar como...</option>
                      <option value="queroLer">Quero Ler</option>
                      <option value="lendo">Lendo</option>
                      <option value="lido">Lido</option>
                    </select>
                  </div>
                ))}
                {!loading && results.length === 0 && searchQuery.length > 1 && <p style={s.loadingText}>Nenhum resultado.</p>}
              </div>
            )}
          </div>
        )}

        {/* Contadores */}
        <div style={s.counters}>
          {[["lido", "Lidos"], ["lendo", "Lendo"], ["queroLer", "Quero Ler"]].map(([key, label]) => (
            <button key={key} onClick={() => setFilter(key)} style={{ ...s.counterCard, backgroundColor: filter === key ? "#301C54" : "rgba(255,255,255,0.6)", color: filter === key ? "#fff" : "#301C54" }}>
              <span style={s.counterNum}>({counts[key]})</span>
              <span style={s.counterLabel}>{label}</span>
            </button>
          ))}
        </div>

        {/* Filtro dropdown */}
        <div style={s.filterRow}>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} style={s.filterSelect}>
            {Object.entries(STATUS_LABELS).map(([val, label]) => (
              <option key={val} value={val}>{label} ({val === "todos" ? counts.total : counts[val] || 0})</option>
            ))}
          </select>
        </div>

        {/* Lista de livros */}
        {books.length === 0 ? (
          <div style={s.empty}>
            <span style={{ fontSize: 64 }}>📖</span>
            <p style={{ fontSize: 14, color: "#777" }}>Nenhum livro nesta categoria ainda.</p>
            <button style={s.findBtn} onClick={() => navigate("/home")}>Encontrar livros</button>
          </div>
        ) : (
          <div style={s.bookList}>
            {books.map(({ book, status, rating }) => (
              <div key={book.id} style={s.bookRow} onClick={() => navigate("/livro", { state: book })}>
                <CoverImg src={book.cover} style={{ width: 56, height: 80, borderRadius: 8 }} />
                <div style={s.bookInfo}>
                  <p style={s.bookTitle}>{book.title}</p>
                  <p style={s.bookAuthor}>{book.author}</p>
                  {rating > 0 && <StarRating rating={rating} />}
                </div>
                <span style={{ ...s.statusBadge, backgroundColor: statusColor(status) }}>{STATUS_LABELS[status]}</span>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

function statusColor(status) {
  return { lido: "#D4EDDA", lendo: "#D1ECF1", queroLer: "#FFF3CD", abandonei: "#F8D7DA" }[status] || "#E5E0EA";
}

const s = {
  page: { minHeight: "100vh", backgroundColor: "#F8F6FF", fontFamily: "'PT Mono', monospace", color: "#301C54", display: "flex", flexDirection: "column" },
  main: { maxWidth: "1050px", margin: "0 auto", padding: "32px 32px 56px", flex: 1, width: "100%", boxSizing: "border-box" },
  topRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" },
  title: { fontSize: "32px", color: "#1D1D1D", fontFamily: "'PT Mono', monospace" },
  subtitle: { fontSize: "14px", color: "#555", marginTop: 4 },
  addBtn: { padding: "10px 20px", borderRadius: 30, backgroundColor: "#301C54", color: "#fff", border: "none", fontFamily: "'PT Mono', monospace", fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" },
  searchModal: { backgroundColor: "#fff", border: "1px solid #E8E0F0", borderRadius: 16, padding: "16px", marginBottom: 24, boxShadow: "0 4px 20px rgba(48,28,84,0.08)" },
  searchBox: { display: "flex", alignItems: "center", gap: "10px", height: "40px", backgroundColor: "#E5E0EA", borderRadius: "30px", padding: "0 16px" },
  searchInput: { flex: 1, border: "none", outline: "none", backgroundColor: "transparent", fontFamily: "'PT Mono', monospace", fontSize: "13px", color: "#301C54" },
  closeBtn: { background: "none", border: "none", cursor: "pointer", color: "#888", fontSize: 16 },
  searchResults: { marginTop: 12, display: "flex", flexDirection: "column", gap: 10, maxHeight: 300, overflowY: "auto" },
  searchResultItem: { display: "flex", gap: 12, alignItems: "center", padding: "8px", borderRadius: 10, backgroundColor: "#F8F6FF" },
  resultTitle: { fontSize: 13, fontWeight: 600, color: "#1D1D1D" },
  resultAuthor: { fontSize: 11, color: "#777" },
  loadingText: { fontSize: 13, color: "#888", textAlign: "center", padding: 12 },
  statusSelect: { padding: "6px 10px", borderRadius: 8, border: "1px solid #E8E0F0", fontFamily: "'PT Mono', monospace", fontSize: 11, cursor: "pointer", backgroundColor: "#fff" },
  counters: { display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" },
  counterCard: { padding: "16px 24px", borderRadius: 16, border: "1px solid #E8E0F0", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, transition: "all 0.2s", minWidth: 100 },
  counterNum: { fontSize: 20, fontWeight: 700 },
  counterLabel: { fontSize: 12 },
  filterRow: { marginBottom: 24 },
  filterSelect: { padding: "10px 16px", borderRadius: 10, border: "1px solid #E8E0F0", fontFamily: "'PT Mono', monospace", fontSize: 13, backgroundColor: "#fff", color: "#301C54", cursor: "pointer" },
  empty: { display: "flex", flexDirection: "column", alignItems: "center", gap: 16, marginTop: 80 },
  findBtn: { padding: "12px 28px", borderRadius: 30, backgroundColor: "#7966CC", color: "#fff", border: "none", fontFamily: "'PT Mono', monospace", fontSize: 13, cursor: "pointer" },
  bookList: { display: "flex", flexDirection: "column", gap: 12 },
  bookRow: { display: "flex", gap: 16, alignItems: "center", backgroundColor: "#fff", border: "1px solid #E8E0F0", borderRadius: 14, padding: "12px 16px", cursor: "pointer", transition: "box-shadow 0.2s" },
  bookInfo: { flex: 1 },
  bookTitle: { fontSize: 14, fontWeight: 600, color: "#1D1D1D", marginBottom: 2 },
  bookAuthor: { fontSize: 12, color: "#777" },
  statusBadge: { padding: "4px 12px", borderRadius: 20, fontSize: 11, color: "#333", fontWeight: 600, whiteSpace: "nowrap" },
};
