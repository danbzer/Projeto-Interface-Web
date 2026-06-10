import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import CoverImg from "../../components/ui/CoverImg";
import { useShelf } from "../../context/ShelfContext";
import "./bookPage.css";

const STATUS_LABELS = { queroLer: "Quero Ler", lendo: "Lendo", lido: "Lido", abandonei: "Abandonei" };
const STATUS_OPTIONS = Object.entries(STATUS_LABELS);

export default function BookPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state || { id: "placeholder", title: "Título do Livro", author: "Autor", description: "Sinopse do livro.", cover: null, genres: [] };
  const { addToShelf, updateShelfItem, getShelfItem } = useShelf();

  const shelfItem = getShelfItem(book.id);
  const [status, setStatus] = useState(shelfItem?.status || "queroLer");
  const [review, setReview] = useState(shelfItem?.review || "");
  const [rating, setRating] = useState(shelfItem?.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [saved, setSaved] = useState(false);

  const showReview = status === "lido" || status === "abandonei";
  const showDate = status === "lido";

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    addToShelf(book, newStatus);
  };

  const handleSave = () => {
    updateShelfItem(book.id, { review, rating, finishedAt: status === "lido" ? new Date().toLocaleDateString("pt-BR") : null });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const finishedAt = shelfItem?.finishedAt || new Date().toLocaleDateString("pt-BR");

  return (
    <div className="book-page-container">
      <Header showBack />

      <main className="book-main-content">
        {/* Coluna esquerda: capa + tags */}
        <section className="book-left-col">
          <div className="cover-wrapper">
            <button className="book-favorite-button" onClick={() => handleStatusChange("queroLer")} title="Adicionar à lista">
              {shelfItem ? <FaStar style={{ color: "#F2C94C" }} /> : <FaRegStar />}
            </button>
            <CoverImg src={book.cover} style={{ width: 220, height: 310, borderRadius: 16, boxShadow: "0 8px 24px rgba(48,28,84,0.12)" }} />
          </div>
          <div className="book-tags">
            {(book.genres?.slice(0, 1) || []).map((g) => <span key={g} className="book-tag genre">{g}</span>)}
            <span className="book-tag author">{book.author}</span>
          </div>
        </section>

        {/* Coluna direita: infos */}
        <section className="book-right-col">

          {/* Status */}
          <div className="info-card status-card">
            <h3>Status de Leitura</h3>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {STATUS_OPTIONS.map(([val, label]) => (
                <button key={val} onClick={() => handleStatusChange(val)}
                  style={{ padding: "8px 16px", borderRadius: 20, border: "none", cursor: "pointer", fontFamily: "'PT Mono', monospace", fontSize: 12, backgroundColor: status === val ? "#7966CC" : "#E5E0EA", color: status === val ? "#fff" : "#301C54", transition: "all 0.2s" }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Avaliação */}
          <div className="info-card">
            <h3>Minha Nota</h3>
            <div style={{ display: "flex", gap: 4 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} onClick={() => setRating(star)}
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: 24, color: (hoverRating || rating) >= star ? "#F2C94C" : "#D8D1E4", padding: 0, transition: "color 0.1s" }}>
                  ★
                </button>
              ))}
              {rating > 0 && <span style={{ fontSize: 13, color: "#555", alignSelf: "center", marginLeft: 8 }}>{rating} de 5</span>}
            </div>
          </div>

          {/* Review (só para lido/abandonei) */}
          {showReview && (
            <div className="info-card review-card" style={{ animation: "fadeIn 0.3s" }}>
              <div className="card-header">
                <h3>Minha Review</h3>
                <button className="save-review-btn" onClick={handleSave} style={{ backgroundColor: saved ? "#27ae60" : "#301C54" }}>
                  {saved ? "Salvo! ✓" : "Salvar"}
                </button>
              </div>
              <textarea className="input-review-text" placeholder="Escreva sua review aqui..." value={review} onChange={(e) => setReview(e.target.value)} />
            </div>
          )}

          {/* Data de término */}
          {showDate && (
            <div className="info-card date-card" style={{ animation: "fadeIn 0.3s" }}>
              <h3>Data de Término</h3>
              <div className="date-display">
                <span className="calendar-emoji">📅</span>
                <span className="date-text">{finishedAt}</span>
              </div>
            </div>
          )}

          {/* Adicionar à biblioteca */}
          {!shelfItem && (
            <button onClick={() => { addToShelf(book, "queroLer"); setStatus("queroLer"); }}
              style={{ padding: "12px 24px", borderRadius: 30, border: "none", backgroundColor: "#7966CC", color: "#fff", fontFamily: "'PT Mono', monospace", fontSize: 13, cursor: "pointer" }}>
              + Adicionar à Biblioteca
            </button>
          )}
        </section>
      </main>

      {/* Descrição */}
      <section className="book-description-section">
        <h2 className="book-page-title">{book.title}</h2>
        {book.publishedDate && <p style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>{book.publishedDate} · {book.pageCount ? `${book.pageCount} páginas` : ""}</p>}
        <p className="book-description-body" dangerouslySetInnerHTML={{ __html: book.description || "Sem descrição disponível." }} />
      </section>

      <Footer />
    </div>
  );
}
