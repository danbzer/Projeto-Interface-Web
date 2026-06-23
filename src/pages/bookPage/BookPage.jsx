import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa";
import Header from "../../components/layout/Header";
import CoverImg from "../../components/ui/CoverImg";
import { useShelf } from "../../context/ShelfContext";
import { useTheme } from "../../context/ThemeContext";

const STATUS_LABELS = { queroLer: "Quero Ler", lendo: "Lendo", lido: "Lido", abandonei: "Abandonei" };
const STATUS_OPTIONS = Object.entries(STATUS_LABELS);

export default function BookPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { tema } = useTheme();
  const isDark = tema === "Escuro";
  const book = location.state || { id: "placeholder", title: "Título do Livro", author: "Autor", description: "Sinopse do livro.", cover: null, genres: [] };
  const { addToShelf, updateShelfItem, getShelfItem } = useShelf();

  const shelfItem = getShelfItem(book.id);

  const [status, setStatus] = useState(shelfItem?.status || null);
  const [review, setReview] = useState(shelfItem?.review || "");
  const [rating, setRating] = useState(shelfItem?.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [saved, setSaved] = useState(false);
  const [favorite, setFavorite] = useState(shelfItem?.favorite || false);

  const showReview = status === "lido" || status === "abandonei";
  const showDate = status === "lido";
  const LARANJA = "#E06237";
  const GENRE_BG = "#DFF0FF";
  const GENRE_COLOR = "#326A9F";
  const AUTHOR_BG = "#FFE1E8";
  const AUTHOR_COLOR = "#9F3A5B";

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    addToShelf(book, newStatus);
  };

  const handleFavorite = () => {
    const novoFavorito = !favorite;
    setFavorite(novoFavorito);

    if (!shelfItem) {
      if (novoFavorito) {
        // adiciona à estante silenciosamente
        addToShelf(book, "queroLer");
        setTimeout(() => {
          updateShelfItem(book.id, { favorite: true });
        }, 50);
      }
    } else {
      // se já está na estante, apenas atualiza a propriedade favorite
      updateShelfItem(book.id, { favorite: novoFavorito });
    }
  };

  const handleSave = () => {
    updateShelfItem(book.id, { review, rating, favorite, finishedAt: status === "lido" ? new Date().toLocaleDateString("pt-BR") : null });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const finishedAt = shelfItem?.finishedAt || new Date().toLocaleDateString("pt-BR");

  const cardStyle = {
    backgroundColor: isDark ? "#2D3748" : "#FFFFFF",
    border: `1px solid ${isDark ? "#4A5568" : "#E2E8F0"}`,
    borderRadius: "16px",
    padding: "18px 22px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.01)",
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: isDark ? "#1A202C" : "#FAFAFA", fontFamily: "system-ui, sans-serif", color: isDark ? "#F7FAFC" : "#1A202C", display: "flex", flexDirection: "column" }}>
      <Header showBack showUser />

      <main style={{ width: "100%", maxWidth: "1050px", margin: "0 auto", padding: "24px", boxSizing: "border-box", display: "flex", gap: "40px", flex: 1 }}>

        {/* Coluna esquerda - capa */}
        <section style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <button
              style={{ position: "absolute", top: "12px", right: "12px", width: "42px", height: "42px", border: "none", borderRadius: "50%", background: "rgba(255, 255, 255, 0.9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", color: LARANJA, cursor: "pointer", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", zIndex: 2, transition: "transform 0.1s" }}
              onClick={handleFavorite}
              title="Favoritar livro"
            >
              {favorite ? <FaStar /> : <FaRegStar />}
            </button>
            <CoverImg src={book.cover} style={{ width: 220, height: 310, borderRadius: 16, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }} />
          </div>
          <div style={{ display: "flex", gap: "8px", marginTop: "18px", flexWrap: "wrap", justifyContent: "center" }}>
            {(book.genres?.slice(0, 1) || []).map((g) => (
              <span key={g} style={{ padding: "6px 14px", borderRadius: "20px", fontSize: "11px", fontWeight: "bold", backgroundColor: GENRE_BG, color: GENRE_COLOR }}>{g}</span>
            ))}
            <span style={{ padding: "6px 14px", borderRadius: "20px", fontSize: "11px", fontWeight: "bold", backgroundColor: AUTHOR_BG, color: AUTHOR_COLOR }}>{book.author}</span>
          </div>
        </section>

        {/* Coluna direita - cards */}
        <section style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Status de leitura */}
          <div style={cardStyle}>
            <h3 style={{ margin: "0 0 10px 0", fontSize: "12px", color: isDark ? "#A0AEC0" : "#718096", textTransform: "uppercase", letterSpacing: "0.8px", fontWeight: "bold" }}>Status de Leitura</h3>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {STATUS_OPTIONS.map(([val, label]) => (
                <button key={val} onClick={() => handleStatusChange(val)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "20px",
                    border: status === val ? `2px solid ${LARANJA}` : `2px solid ${isDark ? "#4A5568" : "#E2E8F0"}`,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: "12px",
                    fontWeight: status === val ? "700" : "500",
                    backgroundColor: status === val ? (isDark ? "#1A202C" : "#FFF") : (isDark ? "#1A202C" : "#F8FAFC"),
                    color: status === val ? LARANJA : isDark ? "#A0AEC0" : "#4A5568",
                    transition: "all 0.2s",
                  }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Minha nota */}
          <div style={cardStyle}>
            <h3 style={{ margin: "0 0 10px 0", fontSize: "12px", color: isDark ? "#A0AEC0" : "#718096", textTransform: "uppercase", letterSpacing: "0.8px", fontWeight: "bold" }}>Minha Nota</h3>
            <div style={{ display: "flex", gap: "4px" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: "28px", color: (hoverRating || rating) >= star ? "#F2C94C" : isDark ? "#4A5568" : "#E2E8F0", padding: 0, transition: "color 0.1s" }}>
                  ★
                </button>
              ))}
              {rating > 0 && (
                <span style={{ fontSize: "14px", color: isDark ? "#F7FAFC" : "#1A202C", alignSelf: "center", marginLeft: "10px", fontWeight: "bold" }}>
                  {rating} de 5
                </span>
              )}
            </div>
          </div>

          {/* Review */}
          {showReview && (
            <div style={cardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <h3 style={{ margin: 0, fontSize: "12px", color: isDark ? "#A0AEC0" : "#718096", textTransform: "uppercase", letterSpacing: "0.8px", fontWeight: "bold" }}>Minha Review</h3>
                <button onClick={handleSave}
                  style={{ padding: "6px 16px", color: "#FFFFFF", border: "none", borderRadius: "20px", cursor: "pointer", fontSize: "11px", fontWeight: "bold", backgroundColor: saved ? "#34A853" : LARANJA, transition: "background-color 0.2s" }}>
                  {saved ? "Salvo! ✓" : "Salvar"}
                </button>
              </div>
              <textarea
                style={{ width: "100%", minHeight: "80px", padding: "10px", backgroundColor: isDark ? "#1A202C" : "#F8FAFC", border: `1px solid ${isDark ? "#4A5568" : "#E2E8F0"}`, borderRadius: "8px", resize: "none", outline: "none", fontFamily: "inherit", fontSize: "13px", color: isDark ? "#F7FAFC" : "#1A202C", lineHeight: "1.5", boxSizing: "border-box" }}
                placeholder="O que você achou deste livro?"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </div>
          )}

          {/* Data de término */}
          {showDate && (
            <div style={{ ...cardStyle, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontSize: "12px", color: isDark ? "#A0AEC0" : "#718096", textTransform: "uppercase", letterSpacing: "0.8px", fontWeight: "bold" }}>Data de Término</h3>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "16px" }}>📅</span>
                <span style={{ fontSize: "14px", fontWeight: "bold", color: LARANJA }}>{finishedAt}</span>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Descrição */}
      <section style={{ width: "100%", maxWidth: "1050px", margin: "0 auto", padding: "16px 24px 64px", boxSizing: "border-box" }}>
        <h2 style={{ fontSize: "26px", color: isDark ? "#F7FAFC" : "#1A202C", fontWeight: "bold", margin: "0 0 12px 0" }}>{book.title}</h2>
        {book.publishedDate && (
          <p style={{ fontSize: "12px", color: isDark ? "#A0AEC0" : "#718096", margin: 0 }}>
            {book.publishedDate} · {book.pageCount ? `${book.pageCount} páginas` : ""}
          </p>
        )}
        <div
          style={{ fontSize: "15px", lineHeight: "1.7", color: isDark ? "#CBD5E0" : "#4A5568", marginTop: "16px" }}
          dangerouslySetInnerHTML={{ __html: book.description || "Sem descrição disponível." }}
        />
      </section>
    </div>
  );
}