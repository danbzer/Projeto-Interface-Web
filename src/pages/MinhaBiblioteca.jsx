import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import CoverImg from "../components/ui/CoverImg";
import StarRating from "../components/ui/StarRating";
import { useShelf } from "../context/ShelfContext";
import { useTheme } from "../context/ThemeContext";

const LARANJA = "#E06237";

export default function Biblioteca() {
  const navigate = useNavigate();
  const { shelf } = useShelf();
  const { tema } = useTheme();
  const isDark = tema === "Escuro";
  const [filter, setFilter] = useState("todos");

  const filteredShelf = shelf.filter((item) => {
    if (filter === "todos") return true;
    if (filter === "favoritos") return item.favorite; // Filtra pela propriedade boolean
    return item.status === filter;
  });

  return (
    <div style={{ ...s.page, backgroundColor: isDark ? "#1A202C" : "#FAFAFA", color: isDark ? "#F7FAFC" : "#1A202C" }}>
      <Header showBack showUser />

      <main style={s.main}>
        <div style={s.titleContainer}>
          <h2 style={{ ...s.pageTitle, color: isDark ? "#F7FAFC" : "#1A202C" }}>Minha Biblioteca</h2>
          <p style={{ ...s.pageSubtitle, color: isDark ? "#A0AEC0" : "#718096" }}>Você tem {shelf.length} livros organizados na sua estante.</p>
        </div>

        <div style={{ ...s.filterBar, borderColor: isDark ? "#4A5568" : "#E2E8F0" }}>
          {[
            { id: "todos", label: "Todos" },
            { id: "favoritos", label: "Favoritos" },
            { id: "lendo", label: "Lendo" },
            { id: "queroLer", label: "Quero Ler" },
            { id: "lido", label: "Lidos" },
            { id: "abandonei", label: "Abandonei" },
          ].map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                style={{
                  ...s.filterBtn,
                  backgroundColor: isActive ? (isDark ? "#2D3748" : "#FFF") : "transparent",
                  color: isActive ? LARANJA : isDark ? "#A0AEC0" : "#718096",
                  border: isActive ? `2px solid ${LARANJA}` : "2px solid transparent",
                  fontWeight: isActive ? "700" : "500",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {filteredShelf.length === 0 ? (
          <div style={s.emptyState}>
            <span style={s.emptyIcon}>📚</span>
            <p style={{ ...s.emptyText, color: isDark ? "#A0AEC0" : "#718096" }}>Nenhum livro encontrado nesta categoria.</p>
            <button style={s.exploreBtn} onClick={() => navigate("/home")}>
              Explarar novos livros
            </button>
          </div>
        ) : (
          <div style={s.grid}>
            {filteredShelf.map(({ book, status, rating, favorite }) => (
              <div key={book.id} style={s.bookCard} onClick={() => navigate("/livro", { state: book })}>
                <div style={{ ...s.coverWrapper, backgroundColor: isDark ? "#2D3748" : "#EDF2F7" }}>
                  <CoverImg src={book.cover} style={s.cover} />
                  
                  {/* Estrela indicadora no card*/}
                  {favorite && (
                    <span style={{ position: "absolute", top: "8px", right: "8px", color: "#F2C94C", fontSize: "16px", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}>
                      ★
                    </span>
                  )}

                  <span style={{ ...s.statusBadge, backgroundColor: getStatusColor(status) }}>
                    {getStatusLabel(status)}
                  </span>
                </div>
                <div style={s.bookInfo}>
                  <h4 style={{ ...s.bookTitle, color: isDark ? "#F7FAFC" : "#1A202C" }}>{book.title}</h4>
                  <p style={{ ...s.bookAuthor, color: isDark ? "#A0AEC0" : "#718096" }}>{book.author}</p>
                  {rating > 0 && (
                    <div style={s.ratingRow}>
                      <StarRating rating={rating} size="12px" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function getStatusLabel(status) {
  if (status === "lendo") return "Lendo";
  if (status === "queroLer") return "Quero Ler";
  if (status === "lido") return "Lido";
  return "Abandonei";
}

function getStatusColor(status) {
  if (status === "lendo") return "#3182CE";
  if (status === "queroLer") return "#E06237";
  if (status === "lido") return "#38A169";
  return "#E53E3E";
}

const s = {
  page: { minHeight: "100vh", fontFamily: "system-ui, sans-serif", display: "flex", flexDirection: "column" },
  main: { maxWidth: "1050px", margin: "0 auto", padding: "32px 24px 80px", width: "100%", boxSizing: "border-box", flex: 1, display: "flex", flexDirection: "column" },
  titleContainer: { marginBottom: "24px" },
  pageTitle: { fontSize: "26px", fontWeight: "bold", margin: 0 },
  pageSubtitle: { fontSize: "14px", margin: "4px 0 0 0" },
  filterBar: { display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "12px", marginBottom: "24px", borderBottom: "1px solid" },
  filterBtn: { padding: "8px 18px", borderRadius: "20px", cursor: "pointer", fontSize: "13px", fontFamily: "inherit", transition: "all 0.2s", whiteSpace: "nowrap" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "28px 20px" },
  bookCard: { display: "flex", flexDirection: "column", cursor: "pointer", transition: "transform 0.2s" },
  coverWrapper: { position: "relative", width: "100%", aspectRatio: "2/3", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.06)" },
  cover: { width: "100%", height: "100%", objectFit: "cover" },
  statusBadge: { position: "absolute", bottom: "8px", left: "8px", padding: "3px 8px", borderRadius: "12px", color: "#FFF", fontSize: "10px", fontWeight: "bold", boxShadow: "0 2px 4px rgba(0,0,0,0.15)" },
  bookInfo: { marginTop: "10px", display: "flex", flexDirection: "column", gap: "2px" },
  bookTitle: { fontSize: "14px", fontWeight: "700", margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: "1.3" },
  bookAuthor: { fontSize: "12px", margin: 0, display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" },
  ratingRow: { marginTop: "4px" },
  emptyState: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 20px", textAlign: "center", flex: 1 },
  emptyIcon: { fontSize: "48px", marginBottom: "16px" },
  emptyText: { fontSize: "15px", marginBottom: "16px", margin: 0 },
  exploreBtn: { padding: "10px 24px", borderRadius: "20px", backgroundColor: LARANJA, color: "#FFF", border: "none", fontSize: "13px", fontWeight: "bold", cursor: "pointer" },
};