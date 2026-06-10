import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CoverImg from "../components/ui/CoverImg";
import StarRating from "../components/ui/StarRating";
import { useAuth } from "../context/AuthContext";
import { useShelf } from "../context/ShelfContext";

const GENRE_COLORS = ["#DFF0FF", "#FFE1E8", "#E8F5E9", "#FFF3E0", "#EDE7F6", "#F3E5F5", "#E8F5E9", "#FFF8E1"];
const GENRE_TEXT = ["#326A9F", "#9F3A5B", "#2E7D32", "#E65100", "#512DA8", "#7B1FA2", "#1B5E20", "#F57F17"];

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
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="#aaa" strokeWidth="1.5" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round" />
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
              <span style={s.stat}>{counts.lido} lidos</span>
              <span style={s.statDot}>·</span>
              <span style={s.stat}>{counts.lendo} lendo</span>
            </div>
            {editing ? (
              <div style={{ display: "flex", gap: 8 }}>
                <button style={s.saveBtn} onClick={handleSave}>Salvar</button>
                <button style={{ ...s.saveBtn, backgroundColor: "#E5E0EA", color: "#301C54" }} onClick={() => setEditing(false)}>Cancelar</button>
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
                  <h3 style={s.sectionTitle}>Gêneros</h3>
                  <button style={s.addLink} onClick={() => navigate("/personalizar")}>+ Adicionar</button>
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
                  <h3 style={s.sectionTitle}>Escritores</h3>
                  <button style={s.addLink} onClick={() => navigate("/personalizar")}>+ Adicionar</button>
                </div>
                <div style={s.authorsRow}>
                  {prefs.authors.map((a) => (
                    <div key={a} style={s.authorChip}>
                      <div style={s.authorAvatar}>{a[0]}</div>
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
            <p style={{ fontSize: 13, color: "#777", marginBottom: 12 }}>Você ainda não definiu suas preferências.</p>
            <button style={s.prefBtn} onClick={() => navigate("/personalizar")}>Definir preferências</button>
          </section>
        )}

        {/* Minha Biblioteca */}
        <section style={s.section}>
          <div style={s.sectionHeader}>
            <h3 style={s.sectionTitle}>Livros</h3>
            <button style={s.addLink} onClick={() => navigate("/biblioteca")}>Ver todos</button>
          </div>
          {recentBooks.length === 0 ? (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button style={s.addCircle} onClick={() => navigate("/biblioteca")}>+</button>
              <span style={{ fontSize: 13, color: "#888" }}>Adicionar Livros</span>
            </div>
          ) : (
            <div style={s.booksRow}>
              {recentBooks.map(({ book, rating }) => (
                <div key={book.id} style={s.miniBook} onClick={() => navigate("/livro", { state: book })}>
                  <CoverImg src={book.cover} style={{ width: 56, height: 80, borderRadius: 8 }} />
                  <p style={s.miniTitle}>{book.title}</p>
                  <p style={s.miniAuthor}>{book.author}</p>
                  {rating > 0 && <StarRating rating={rating} size="10px" />}
                </div>
              ))}
              <div style={{ ...s.miniBook, cursor: "pointer", justifyContent: "center" }} onClick={() => navigate("/biblioteca")}>
                <button style={s.addCircle}>+</button>
                <span style={{ fontSize: 11, color: "#888" }}>Ver mais</span>
              </div>
            </div>
          )}
        </section>

        {/* Minhas Reviews */}
        {shelf.filter((i) => i.review).length > 0 && (
          <section style={s.section}>
            <h3 style={s.sectionTitle}>Minhas Reviews</h3>
            <div style={s.reviewsList}>
              {shelf.filter((i) => i.review).slice(0, 3).map(({ book, review, rating }) => (
                <div key={book.id} style={s.reviewCard} onClick={() => navigate("/livro", { state: book })}>
                  <CoverImg src={book.cover} style={{ width: 48, height: 68, borderRadius: 6, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#1D1D1D", marginBottom: 4 }}>{book.title}</p>
                    {rating > 0 && <StarRating rating={rating} size="11px" />}
                    <p style={{ fontSize: 12, color: "#555", marginTop: 4, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{review}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", backgroundColor: "#F8F6FF", fontFamily: "'PT Mono', monospace", color: "#301C54", display: "flex", flexDirection: "column" },
  main: { maxWidth: "800px", margin: "0 auto", padding: "32px 24px 80px", flex: 1, width: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", gap: "28px" },
  profileHeader: { display: "flex", gap: 24, alignItems: "flex-start", backgroundColor: "#fff", border: "1px solid #E8E0F0", borderRadius: 20, padding: "24px" },
  photoArea: { position: "relative", flexShrink: 0 },
  photoImg: { width: 100, height: 100, borderRadius: "50%", objectFit: "cover" },
  photoPlaceholder: { width: 100, height: 100, borderRadius: "50%", backgroundColor: "#E5E0EA", display: "flex", alignItems: "center", justifyContent: "center" },
  editPhotoBtn: { position: "absolute", bottom: 0, right: 0, width: 28, height: 28, borderRadius: "50%", backgroundColor: "#fff", border: "1px solid #E8E0F0", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" },
  profileInfo: { flex: 1, display: "flex", flexDirection: "column", gap: 6 },
  username: { fontSize: 20, color: "#1D1D1D", fontWeight: 600 },
  usernameInput: { padding: "8px 14px", borderRadius: 20, border: "1px solid #E8E0F0", fontFamily: "'PT Mono', monospace", fontSize: 14, color: "#301C54", outline: "none", maxWidth: 240 },
  email: { fontSize: 12, color: "#888" },
  statsRow: { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#555" },
  stat: {},
  statDot: { color: "#ccc" },
  editBtn: { padding: "8px 16px", borderRadius: 20, backgroundColor: "#E5E0EA", border: "none", fontFamily: "'PT Mono', monospace", fontSize: 12, color: "#301C54", cursor: "pointer", alignSelf: "flex-start", marginTop: 4 },
  saveBtn: { padding: "8px 16px", borderRadius: 20, backgroundColor: "#7966CC", border: "none", fontFamily: "'PT Mono', monospace", fontSize: 12, color: "#fff", cursor: "pointer" },
  section: { backgroundColor: "#fff", border: "1px solid #E8E0F0", borderRadius: 16, padding: "20px" },
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  sectionTitle: { fontSize: 14, fontWeight: 600, color: "#1D1D1D" },
  addLink: { fontSize: 12, color: "#7966CC", background: "none", border: "none", cursor: "pointer", fontFamily: "'PT Mono', monospace" },
  tagsRow: { display: "flex", gap: 8, flexWrap: "wrap" },
  genreTag: { padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 500 },
  authorsRow: { display: "flex", gap: 12, flexWrap: "wrap" },
  authorChip: { display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", backgroundColor: "#F8F6FF", borderRadius: 20, border: "1px solid #E8E0F0" },
  authorAvatar: { width: 28, height: 28, borderRadius: "50%", backgroundColor: "#7966CC", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600 },
  authorName: { fontSize: 12, color: "#301C54" },
  prefBtn: { padding: "10px 20px", borderRadius: 20, backgroundColor: "#7966CC", color: "#fff", border: "none", fontFamily: "'PT Mono', monospace", fontSize: 13, cursor: "pointer" },
  booksRow: { display: "flex", gap: 16, flexWrap: "wrap" },
  miniBook: { display: "flex", flexDirection: "column", gap: 4, cursor: "pointer", maxWidth: 80 },
  miniTitle: { fontSize: 10, fontWeight: 600, color: "#1D1D1D", lineHeight: 1.3 },
  miniAuthor: { fontSize: 9, color: "#888" },
  addCircle: { width: 56, height: 80, borderRadius: 8, backgroundColor: "#E5E0EA", border: "2px dashed #ccc", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: "#aaa", cursor: "pointer" },
  reviewsList: { display: "flex", flexDirection: "column", gap: 12 },
  reviewCard: { display: "flex", gap: 12, alignItems: "flex-start", padding: "12px", backgroundColor: "#F8F6FF", borderRadius: 12, cursor: "pointer" },
};
