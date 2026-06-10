import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import CoverImg from "../components/ui/CoverImg";
import StarRating from "../components/ui/StarRating";
import { useAuth } from "../context/AuthContext";
import { useShelf } from "../context/ShelfContext";

// Cores das tags baseadas na Home
const GENRE_COLORS = ["#DFF0FF", "#FFE1E8", "#E8F5E9", "#FFF3E0"];
const GENRE_TEXT = ["#326A9F", "#9F3A5B", "#2E7D32", "#E65100"];
const LARANJA = "#E06237"; // Nosso Laranja Oficial

export default function Perfil() {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const { shelf, counts } = useShelf();
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

  // Função para pegar o primeiro nome
  const getFirstName = () => {
    const fullName = user?.username || user?.name || "Leitor";
    return fullName.split(" ")[0];
  };

  return (
    <div style={s.page}>
      <Header showBack />
      <main style={s.main}>

        {/* Header do perfil */}
        <div style={s.profileHeader}>
          <div style={s.photoArea}>
            {photo ? (
              <img src={photo} alt="Perfil" style={s.photoImg} />
            ) : (
              <div style={s.photoPlaceholder}>
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
              <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nome de usuário" style={s.usernameInput} />
            ) : (
              <h2 style={s.username}>{user?.username || user?.name || "Usuário"}</h2>
            )}
            <p style={s.email}>{user?.email}</p>
            <div style={s.statsRow}>
              <span style={s.stat}><b>{counts?.lido || 0}</b> lidos</span>
              <span style={s.statDot}>·</span>
              <span style={s.stat}><b>{counts?.lendo || 0}</b> lendo</span>
            </div>
            {editing ? (
              <div style={{ display: "flex", gap: 8, marginTop: "6px" }}>
                <button style={s.saveBtn} onClick={handleSave}>Salvar</button>
                <button style={{ ...s.saveBtn, backgroundColor: "#E2E8F0", color: "#4A5568" }} onClick={() => setEditing(false)}>Cancelar</button>
              </div>
            ) : (
              <button style={s.editBtn} onClick={() => setEditing(true)}>✏️ Editar Perfil</button>
            )}
          </div>
        </div>

        {/* Preferências */}
        {prefs && (
          <>
            {prefs.genres?.length > 0 && (
              <section style={s.section}>
                <div style={s.sectionHeader}>
                  <h3 style={s.sectionTitle}>Gêneros Favoritos</h3>
                  <button style={s.addLink} onClick={() => navigate("/personalizar")}>Editar</button>
                </div>
                <div style={s.tagsRow}>
                  {prefs.genres.map((g, i) => (
                    <span key={g} style={{ ...s.genreTag, backgroundColor: GENRE_COLORS[i % GENRE_COLORS.length], color: GENRE_TEXT[i % GENRE_TEXT.length] }}>{g}</span>
                  ))}
                </div>
              </section>
            )}

            {prefs.authors?.length > 0 && (
              <section style={s.section}>
                <div style={s.sectionHeader}>
                  <h3 style={s.sectionTitle}>Escritores Favoritos</h3>
                  <button style={s.addLink} onClick={() => navigate("/personalizar")}>Editar</button>
                </div>
                <div style={s.authorsRow}>
                  {prefs.authors.map((a) => (
                    <div key={a} style={s.authorChip}>
                      <div style={s.authorAvatar}>{a[0].toUpperCase()}</div>
                      <span style={s.authorName}>{a}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {!prefs && (
          <section style={s.section}>
            <div style={s.sectionHeader}>
              <h3 style={s.sectionTitle}>Preferências</h3>
            </div>
            <p style={{ fontSize: "13px", color: "#718096", marginBottom: "12px", margin: 0 }}>Você ainda não definiu suas preferências.</p>
            <button style={s.prefBtn} onClick={() => navigate("/personalizar")}>Definir preferências</button>
          </section>
        )}

        {/* Atividade Recente */}
        <section style={s.section}>
          <div style={s.sectionHeader}>
            <h3 style={s.sectionTitle}>Atividade Recente</h3>
            <button style={s.addLink} onClick={() => navigate("/biblioteca")}>Ver estante inteira →</button>
          </div>
          {recentBooks.length === 0 ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0" }}>
              <button style={s.addCircle} onClick={() => navigate("/biblioteca")}>+</button>
              <span style={{ fontSize: "13px", color: "#A0AEC0" }}>Estante vazia. Adicione livros!</span>
            </div>
          ) : (
            <div style={s.booksRow}>
              {recentBooks.map(({ book, rating }) => (
                <div key={book.id} style={s.miniBook} onClick={() => navigate("/livro", { state: book })}>
                  <div style={s.miniCoverWrapper}>
                    <CoverImg src={book.cover} style={{ width: 64, height: 92, borderRadius: 8 }} />
                  </div>
                  <p style={s.miniTitle}>{book.title}</p>
                  <p style={s.miniAuthor}>{book.author}</p>
                  {rating > 0 && <StarRating rating={rating} size="10px" />}
                </div>
              ))}
              <div style={{ ...s.miniBook, justifyContent: "center", alignItems: "center" }} onClick={() => navigate("/biblioteca")}>
                <button style={s.addCircle}>+</button>
                <span style={{ fontSize: "11px", color: LARANJA, fontWeight: "bold", marginTop: "4px" }}>Ver mais</span>
              </div>
            </div>
          )}
        </section>

        {/* Minhas Reviews */}
        {shelf.filter((i) => i.review).length > 0 && (
          <section style={s.section}>
            <h3 style={s.sectionTitle}>Minhas Críticas & Reviews</h3>
            <div style={s.reviewsList}>
              {shelf.filter((i) => i.review).slice(0, 3).map(({ book, review, rating }) => (
                <div key={book.id} style={s.reviewCard} onClick={() => navigate("/livro", { state: book })}>
                  <CoverImg src={book.cover} style={{ width: 48, height: 68, borderRadius: 6, flexShrink: 0, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "14px", fontWeight: "bold", color: "#1A202C", marginBottom: "2px", margin: 0 }}>{book.title}</p>
                    {rating > 0 && <div style={{ marginBottom: "6px" }}><StarRating rating={rating} size="11px" /></div>}
                    <p style={s.reviewText}>"{review}"</p>
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

// Estilos limpos e Laranjas
const s = {
  page: { minHeight: "100vh", backgroundColor: "#FAFAFA", fontFamily: "system-ui, sans-serif", color: "#1A202C", display: "flex", flexDirection: "column" },
  main: { maxWidth: "800px", margin: "0 auto", padding: "32px 24px 60px", flex: 1, width: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "24px" },
  profileHeader: { display: "flex", gap: 24, alignItems: "center", backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 20, padding: "24px", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" },
  photoArea: { position: "relative", flexShrink: 0 },
  photoImg: { width: 90, height: 90, borderRadius: "50%", objectFit: "cover", border: `2px solid ${LARANJA}` },
  photoPlaceholder: { width: 90, height: 90, borderRadius: "50%", backgroundColor: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center" },
  editPhotoBtn: { position: "absolute", bottom: 0, right: 0, width: 28, height: 28, borderRadius: "50%", backgroundColor: "#fff", border: "1px solid #E2E8F0", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" },
  profileInfo: { flex: 1, display: "flex", flexDirection: "column", gap: 4 },
  username: { fontSize: "22px", color: "#1A202C", fontWeight: 700, margin: 0 },
  usernameInput: { padding: "6px 12px", borderRadius: 20, border: `1px solid ${LARANJA}`, fontFamily: "inherit", fontSize: "14px", color: "#1A202C", outline: "none", maxWidth: 240 },
  email: { fontSize: "13px", color: "#718096", margin: 0 },
  statsRow: { display: "flex", alignItems: "center", gap: 8, fontSize: "13px", color: "#4A5568", margin: "4px 0" },
  statDot: { color: LARANJA, fontWeight: "bold" },
  editBtn: { padding: "6px 14px", borderRadius: "20px", backgroundColor: "#F1F5F9", border: "none", fontFamily: "inherit", fontSize: "11px", fontWeight: "bold", color: "#4A5568", cursor: "pointer", alignSelf: "flex-start", marginTop: "4px", transition: "0.2s" },
  saveBtn: { padding: "6px 14px", borderRadius: "20px", backgroundColor: LARANJA, border: "none", fontFamily: "inherit", fontSize: "11px", fontWeight: "bold", color: "#fff", cursor: "pointer" },
  section: { backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 20, padding: "24px", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" },
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" },
  sectionTitle: { fontSize: "14px", fontWeight: 700, color: "#1A202C", margin: 0, textTransform: "uppercase", letterSpacing: "0.5px" },
  addLink: { fontSize: "12px", color: LARANJA, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontWeight: "bold" },
  tagsRow: { display: "flex", gap: 8, flexWrap: "wrap" },
  genreTag: { padding: "6px 14px", borderRadius: 20, fontSize: "11px", fontWeight: "bold" },
  authorsRow: { display: "flex", gap: 10, flexWrap: "wrap" },
  authorChip: { display: "flex", alignItems: "center", gap: 8, padding: "4px 12px", backgroundColor: "#F8FAFC", borderRadius: 20, border: "1px solid #E2E8F0" },
  authorAvatar: { width: 24, height: 24, borderRadius: "50%", backgroundColor: LARANJA, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700 },
  authorName: { fontSize: "12px", color: "#1A202C", fontWeight: "500" },
  prefBtn: { padding: "10px 20px", borderRadius: 20, backgroundColor: LARANJA, color: "#fff", border: "none", fontFamily: "inherit", fontSize: "12px", fontWeight: "bold", cursor: "pointer" },
  booksRow: { display: "flex", gap: 20, flexWrap: "wrap" },
  miniBook: { display: "flex", flexDirection: "column", gap: 4, cursor: "pointer", width: "76px" },
  miniCoverWrapper: { width: "64px", height: "92px", borderRadius: "8px", overflow: "hidden", boxShadow: "0 4px 10px rgba(0,0,0,0.08)" },
  miniTitle: { fontSize: "11px", fontWeight: 700, color: "#1A202C", margin: "4px 0 0 0", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" },
  miniAuthor: { fontSize: "10px", color: "#718096", margin: 0, display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" },
  addCircle: { width: 64, height: 92, borderRadius: 8, backgroundColor: "#F8FAFC", border: "2px dashed #E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", color: "#CBD5E0", cursor: "pointer" },
  reviewsList: { display: "flex", flexDirection: "column", gap: 12 },
  reviewCard: { display: "flex", gap: 14, alignItems: "flex-start", padding: "14px", backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 16, cursor: "pointer" },
  reviewText: { fontSize: "12px", color: "#4A5568", marginTop: "2px", lineHeight: "1.5", fontStyle: "italic", margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" },
};