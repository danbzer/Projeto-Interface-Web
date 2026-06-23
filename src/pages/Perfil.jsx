import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import CoverImg from "../components/ui/CoverImg";
import StarRating from "../components/ui/StarRating";
import { useAuth } from "../context/AuthContext";
import { useShelf } from "../context/ShelfContext";
import { useTheme } from "../context/ThemeContext";

const GENRE_COLORS = ["#DFF0FF", "#FFE1E8", "#E8F5E9", "#FFF3E0"];
const GENRE_TEXT = ["#326A9F", "#9F3A5B", "#2E7D32", "#E65100"];
const LARANJA = "#E06237";

export default function Perfil() {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const { shelf, counts } = useShelf();
  const { tema } = useTheme();
  const isDark = tema === "Escuro";
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [photo, setPhoto] = useState(user?.photo || null);
  const inputFileRef = useRef(null);

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  const handleSave = () => {
    updateProfile({ username, photo });
    setEditing(false);
  };

  const prefs = user?.preferences;
  const recentBooks = shelf.slice(-3).reverse();

  const cardStyle = {
    backgroundColor: isDark ? "#2D3748" : "#FFFFFF",
    border: `1px solid ${isDark ? "#4A5568" : "#E2E8F0"}`,
    borderRadius: 20,
    padding: "24px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
  };

  return (
    <div style={{ ...s.page, backgroundColor: isDark ? "#1A202C" : "#FAFAFA", color: isDark ? "#F7FAFC" : "#1A202C" }}>
      <Header showBack showUser />
      <main style={s.main}>

        {/* Card do perfil */}
        <div style={cardStyle}>
          <div style={s.profileHeader}>
            <div style={s.photoArea}>
              {photo ? (
                <img src={photo} alt="Perfil" style={s.photoImg} />
              ) : (
                <div style={{ ...s.photoPlaceholder, backgroundColor: isDark ? "#4A5568" : "#F1F5F9" }}>
                  <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="4" stroke="#A0AEC0" strokeWidth="1.5" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#A0AEC0" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              )}
              {editing && (
                <>
                  <button style={s.editPhotoBtn} onClick={() => inputFileRef.current.click()}>✏️</button>
                  <input type="file" accept="image/*" ref={inputFileRef} style={{ display: "none" }} onChange={handlePhoto} />
                </>
              )}
            </div>

            <div style={s.profileInfo}>
              {editing ? (
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nome de usuário"
                  style={{ ...s.usernameInput, backgroundColor: isDark ? "#1A202C" : "#FFF", color: isDark ? "#F7FAFC" : "#1A202C" }}
                />
              ) : (
                <h2 style={{ ...s.username, color: isDark ? "#F7FAFC" : "#1A202C" }}>{user?.username || user?.name || "Usuário"}</h2>
              )}
              <p style={{ ...s.email, color: isDark ? "#A0AEC0" : "#718096" }}>{user?.email}</p>
              <div style={s.statsRow}>
                <span style={{ color: isDark ? "#CBD5E0" : "#4A5568" }}><b>{counts?.lido || 0}</b> lidos</span>
                <span style={{ color: LARANJA, fontWeight: "bold" }}>·</span>
                <span style={{ color: isDark ? "#CBD5E0" : "#4A5568" }}><b>{counts?.lendo || 0}</b> lendo</span>
              </div>
              {editing ? (
                <div style={{ display: "flex", gap: 8, marginTop: "6px" }}>
                  <button style={s.saveBtn} onClick={handleSave}>Salvar</button>
                  <button style={{ ...s.saveBtn, backgroundColor: isDark ? "#4A5568" : "#E2E8F0", color: isDark ? "#F7FAFC" : "#4A5568" }} onClick={() => setEditing(false)}>Cancelar</button>
                </div>
              ) : (
                <button
                  style={{ ...s.editBtn, backgroundColor: isDark ? "#4A5568" : "#F1F5F9", color: isDark ? "#F7FAFC" : "#4A5568" }}
                  onClick={() => setEditing(true)}
                >
                  ✏️ Editar Perfil
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Gêneros favoritos */}
        {prefs?.genres?.length > 0 && (
          <section style={cardStyle}>
            <div style={s.sectionHeader}>
              <h3 style={{ ...s.sectionTitle, color: isDark ? "#A0AEC0" : "#1A202C" }}>Gêneros Favoritos</h3>
              <button style={s.addLink} onClick={() => navigate("/editar-preferencias")}>Editar</button>
            </div>
            <div style={s.tagsRow}>
              {prefs.genres.map((g, i) => (
                <span key={g} style={{
                  ...s.genreTag,
                  backgroundColor: isDark ? "rgba(255,255,255,0.08)" : GENRE_COLORS[i % GENRE_COLORS.length],
                  color: isDark ? "#CBD5E0" : GENRE_TEXT[i % GENRE_TEXT.length],
                  border: isDark ? "1px solid #4A5568" : "none",
                }}>
                  {g}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Escritores favoritos */}
        {prefs?.authors?.length > 0 && (
          <section style={cardStyle}>
            <div style={s.sectionHeader}>
              <h3 style={{ ...s.sectionTitle, color: isDark ? "#A0AEC0" : "#1A202C" }}>Escritores Favoritos</h3>
              <button style={s.addLink} onClick={() => navigate("/editar-preferencias")}>Editar</button>
            </div>
            <div style={s.authorsRow}>
              {prefs.authors.map((a, index) => {
                // A mágica anti-crash: verifica se o autor é texto (antigo) ou objeto (novo)
                const isObject = typeof a === "object" && a !== null;
                const authorName = isObject ? a.name : a;
                const authorImg = isObject ? a.img : null;
                
                return (
                  <div key={authorName || index} style={{
                    ...s.authorChip,
                    backgroundColor: isDark ? "#1A202C" : "#F8FAFC",
                    border: `1px solid ${isDark ? "#4A5568" : "#E2E8F0"}`,
                  }}>
                    {authorImg ? (
                      <img src={authorImg} alt={authorName} style={{ width: 24, height: 24, borderRadius: "50%" }} />
                    ) : (
                      <div style={s.authorAvatar}>{authorName ? authorName[0].toUpperCase() : "?"}</div>
                    )}
                    <span style={{ ...s.authorName, color: isDark ? "#F7FAFC" : "#1A202C" }}>{authorName}</span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Sem preferências */}
        {!prefs && (
          <section style={cardStyle}>
            <div style={s.sectionHeader}>
              <h3 style={{ ...s.sectionTitle, color: isDark ? "#A0AEC0" : "#1A202C" }}>Preferências</h3>
            </div>
            <p style={{ fontSize: "13px", color: isDark ? "#A0AEC0" : "#718096", margin: 0 }}>Você ainda não definiu suas preferências.</p>
            <button style={{ ...s.prefBtn, marginTop: "12px" }} onClick={() => navigate("/editar-preferencias")}>Definir preferências</button>
          </section>
        )}

        {/* Atividade recente */}
        <section style={cardStyle}>
          <div style={s.sectionHeader}>
            <h3 style={{ ...s.sectionTitle, color: isDark ? "#A0AEC0" : "#1A202C" }}>Atividade Recente</h3>
            <button style={s.addLink} onClick={() => navigate("/biblioteca")}>Ver estante inteira →</button>
          </div>
          {recentBooks.length === 0 ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0" }}>
              <button
                style={{ ...s.addCircle, backgroundColor: isDark ? "#1A202C" : "#F8FAFC", borderColor: isDark ? "#4A5568" : "#E2E8F0" }}
                onClick={() => navigate("/biblioteca")}
              >+</button>
              <span style={{ fontSize: "13px", color: "#A0AEC0" }}>Estante vazia. Adicione livros!</span>
            </div>
          ) : (
            <div style={s.booksRow}>
              {recentBooks.map(({ book, rating }) => (
                <div key={book.id} style={s.miniBook} onClick={() => navigate("/livro", { state: book })}>
                  <div style={s.miniCoverWrapper}>
                    <CoverImg src={book.cover} style={{ width: 64, height: 92, borderRadius: 8 }} />
                  </div>
                  <p style={{ ...s.miniTitle, color: isDark ? "#F7FAFC" : "#1A202C" }}>{book.title}</p>
                  <p style={{ ...s.miniAuthor, color: isDark ? "#A0AEC0" : "#718096" }}>{book.author}</p>
                  {rating > 0 && <StarRating rating={rating} size="10px" />}
                </div>
              ))}
              <div style={{ ...s.miniBook, justifyContent: "center", alignItems: "center" }} onClick={() => navigate("/biblioteca")}>
                <button style={{ ...s.addCircle, backgroundColor: isDark ? "#1A202C" : "#F8FAFC", borderColor: isDark ? "#4A5568" : "#E2E8F0" }}>+</button>
                <span style={{ fontSize: "11px", color: LARANJA, fontWeight: "bold", marginTop: "4px" }}>Ver mais</span>
              </div>
            </div>
          )}
        </section>

        {/* Reviews */}
        {shelf.filter((i) => i.review).length > 0 && (
          <section style={cardStyle}>
            <h3 style={{ ...s.sectionTitle, color: isDark ? "#A0AEC0" : "#1A202C", marginBottom: "16px" }}>Minhas Críticas & Reviews</h3>
            <div style={s.reviewsList}>
              {shelf.filter((i) => i.review).slice(0, 3).map(({ book, review, rating }) => (
                <div
                  key={book.id}
                  style={{ ...s.reviewCard, backgroundColor: isDark ? "#1A202C" : "#F8FAFC", border: `1px solid ${isDark ? "#4A5568" : "#E2E8F0"}` }}
                  onClick={() => navigate("/livro", { state: book })}
                >
                  <CoverImg src={book.cover} style={{ width: 48, height: 68, borderRadius: 6, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "14px", fontWeight: "bold", color: isDark ? "#F7FAFC" : "#1A202C", margin: 0 }}>{book.title}</p>
                    {rating > 0 && <div style={{ margin: "4px 0 6px" }}><StarRating rating={rating} size="11px" /></div>}
                    <p style={{ ...s.reviewText, color: isDark ? "#A0AEC0" : "#4A5568" }}>"{review}"</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", fontFamily: "system-ui, sans-serif", display: "flex", flexDirection: "column" },
  main: { maxWidth: "800px", margin: "0 auto", padding: "32px 24px 60px", flex: 1, width: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "24px" },
  profileHeader: { display: "flex", gap: 24, alignItems: "center" },
  photoArea: { position: "relative", flexShrink: 0 },
  photoImg: { width: 90, height: 90, borderRadius: "50%", objectFit: "cover", border: `2px solid ${LARANJA}` },
  photoPlaceholder: { width: 90, height: 90, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" },
  editPhotoBtn: { position: "absolute", bottom: 0, right: 0, width: 28, height: 28, borderRadius: "50%", backgroundColor: "#fff", border: "1px solid #E2E8F0", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" },
  profileInfo: { flex: 1, display: "flex", flexDirection: "column", gap: 4 },
  username: { fontSize: "22px", fontWeight: 700, margin: 0 },
  usernameInput: { padding: "6px 12px", borderRadius: 20, border: `1px solid ${LARANJA}`, fontFamily: "inherit", fontSize: "14px", outline: "none", maxWidth: 240 },
  email: { fontSize: "13px", margin: 0 },
  statsRow: { display: "flex", alignItems: "center", gap: 8, fontSize: "13px", margin: "4px 0" },
  editBtn: { padding: "6px 14px", borderRadius: "20px", border: "none", fontFamily: "inherit", fontSize: "11px", fontWeight: "bold", cursor: "pointer", alignSelf: "flex-start", marginTop: "4px" },
  saveBtn: { padding: "6px 14px", borderRadius: "20px", backgroundColor: LARANJA, border: "none", fontFamily: "inherit", fontSize: "11px", fontWeight: "bold", color: "#fff", cursor: "pointer" },
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" },
  sectionTitle: { fontSize: "14px", fontWeight: 700, margin: 0, textTransform: "uppercase", letterSpacing: "0.5px" },
  addLink: { fontSize: "12px", color: LARANJA, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontWeight: "bold" },
  tagsRow: { display: "flex", gap: 8, flexWrap: "wrap" },
  genreTag: { padding: "6px 14px", borderRadius: 20, fontSize: "11px", fontWeight: "bold" },
  authorsRow: { display: "flex", gap: 10, flexWrap: "wrap" },
  authorChip: { display: "flex", alignItems: "center", gap: 8, padding: "4px 12px", borderRadius: 20 },
  authorAvatar: { width: 24, height: 24, borderRadius: "50%", backgroundColor: LARANJA, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700 },
  authorName: { fontSize: "12px", fontWeight: "500" },
  prefBtn: { padding: "10px 20px", borderRadius: 20, backgroundColor: LARANJA, color: "#fff", border: "none", fontFamily: "inherit", fontSize: "12px", fontWeight: "bold", cursor: "pointer" },
  booksRow: { display: "flex", gap: 20, flexWrap: "wrap" },
  miniBook: { display: "flex", flexDirection: "column", gap: 4, cursor: "pointer", width: "76px" },
  miniCoverWrapper: { width: "64px", height: "92px", borderRadius: "8px", overflow: "hidden" },
  miniTitle: { fontSize: "11px", fontWeight: 700, margin: "4px 0 0 0", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" },
  miniAuthor: { fontSize: "10px", margin: 0, display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" },
  addCircle: { width: 64, height: 92, borderRadius: 8, border: "2px dashed", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", color: "#CBD5E0", cursor: "pointer" },
  reviewsList: { display: "flex", flexDirection: "column", gap: 12 },
  reviewCard: { display: "flex", gap: 14, alignItems: "flex-start", padding: "14px", borderRadius: 16, cursor: "pointer" },
  reviewText: { fontSize: "12px", lineHeight: "1.5", fontStyle: "italic", margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" },
};