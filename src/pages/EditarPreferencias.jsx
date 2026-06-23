import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const GENRES = [
  "Terror", "Romance", "Ficção Científica", "Fantasia", 
  "Biografia", "Suspense", "Mangá", "HQ", "Policial", "Drama", "Aventura", "Poesia"
];

const LARANJA = "#E06237";

export default function EditarPreferencias() {
  const navigate = useNavigate();
  const { tema } = useTheme();
  const isDark = tema === "Escuro";
  
  const auth = useAuth();
  const updatePreferences = auth ? auth.updatePreferences : null;
  const preferenciasAtuais = auth?.user?.preferences || { genres: [], authors: [] };

  const [selectedGenres, setSelectedGenres] = useState(preferenciasAtuais.genres || []);
  const [selectedAuthors, setSelectedAuthors] = useState(preferenciasAtuais.authors || []);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [dynamicAuthors, setDynamicAuthors] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setDynamicAuthors([]);
      return;
    }

    setIsSearching(true);
    const delayDebounceFn = setTimeout(async () => {
      try {
        const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_KEY;
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&maxResults=10&key=${apiKey}`);
        const data = await res.json();

        if (data.items) {
          const uniqueAuthorNames = new Set();
          const extractedAuthors = [];
          
          data.items.forEach(item => {
            const autores = item.volumeInfo.authors;
            if (autores) {
              autores.forEach(nome => {
                if (!uniqueAuthorNames.has(nome) && nome !== "Autor Desconhecido") {
                  uniqueAuthorNames.add(nome);
                  extractedAuthors.push({
                    name: nome,
                    img: `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=E06237&color=fff&size=150`
                  });
                }
              });
            }
          });
          setDynamicAuthors(extractedAuthors);
        } else {
          setDynamicAuthors([]);
        }
      } catch (error) {
        console.error("Erro ao buscar autores:", error);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const toggleAuthor = (authorObj) => {
    setSelectedAuthors((prev) => {
      const exists = prev.some(a => (typeof a === "object" ? a.name : a) === authorObj.name);
      if (exists) {
        return prev.filter((a) => (typeof a === "object" ? a.name : a) !== authorObj.name);
      } else {
        return [...prev, authorObj];
      }
    });
  };

  const removeAuthor = (authorName) => {
    setSelectedAuthors((prev) => prev.filter((a) => (typeof a === "object" ? a.name : a) !== authorName));
  };

  const handleSave = () => {
    if (updatePreferences) {
      updatePreferences({ genres: selectedGenres, authors: selectedAuthors });
    }
    navigate(-1);
  };

  return (
    <div style={{ ...s.page, backgroundColor: isDark ? "#1A202C" : "#FAFAFA", color: isDark ? "#F7FAFC" : "#1A202C" }}>
      <Header showBack showUser />
      
      <main style={s.main}>
        <div style={s.header}>
          <h2 style={{ ...s.title, color: isDark ? "#F7FAFC" : "#1A202C" }}>Editar Preferências</h2>
          <p style={{ ...s.subtitle, color: isDark ? "#A0AEC0" : "#718096" }}>
            Atualize seus gêneros favoritos e os autores que você deseja acompanhar.
          </p>
        </div>

        <div style={{ ...s.section, backgroundColor: isDark ? "#2D3748" : "#FFFFFF", borderColor: isDark ? "#4A5568" : "#E2E8F0" }}>
          <h3 style={{ ...s.sectionTitle, color: isDark ? "#E2E8F0" : "#2D3748" }}>Gêneros Favoritos</h3>
          <div style={s.chipGrid}>
            {GENRES.map((g) => {
              const isSel = selectedGenres.includes(g);
              return (
                <button key={g} onClick={() => toggleGenre(g)} style={{ ...s.chip, backgroundColor: isSel ? LARANJA : isDark ? "#1A202C" : "#F8FAFC", color: isSel ? "#FFF" : isDark ? "#CBD5E0" : "#4A5568", borderColor: isSel ? LARANJA : isDark ? "#4A5568" : "#E2E8F0" }}>
                  {g}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ ...s.section, backgroundColor: isDark ? "#2D3748" : "#FFFFFF", borderColor: isDark ? "#4A5568" : "#E2E8F0" }}>
          <h3 style={{ ...s.sectionTitle, color: isDark ? "#E2E8F0" : "#2D3748" }}>Escritores Favoritos</h3>
          
          {selectedAuthors.length > 0 && (
            <div style={{ ...s.chipGrid, marginBottom: "20px" }}>
              {selectedAuthors.map((a) => {
                const isObject = typeof a === "object" && a !== null;
                const authorName = isObject ? a.name : a;
                const authorImg = isObject ? a.img : null;
                return (
                  <div key={authorName} style={{ ...s.authorChip, backgroundColor: isDark ? "#1A202C" : "#F8FAFC", borderColor: isDark ? "#4A5568" : "#E2E8F0" }}>
                    {authorImg ? (
                      <img src={authorImg} alt={authorName} style={s.authorChipImg} />
                    ) : (
                      <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: LARANJA, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "bold" }}>
                        {authorName[0].toUpperCase()}
                      </div>
                    )}
                    <span style={{ color: isDark ? "#F7FAFC" : "#2D3748", fontSize: "14px", fontWeight: "500", marginLeft: "8px" }}>{authorName}</span>
                    <button onClick={() => removeAuthor(authorName)} style={s.removeBtn}>✕</button>
                  </div>
                );
              })}
            </div>
          )}

          <div style={{ ...s.searchBox, backgroundColor: isDark ? "#1A202C" : "#F8FAFC", borderColor: isDark ? "#4A5568" : "#E2E8F0" }}>
            <span style={{ fontSize: "16px" }}>🔍</span>
            <input style={{ ...s.searchInput, color: isDark ? "#F7FAFC" : "#2D3748" }} type="text" placeholder="Pesquise para adicionar novos autores..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>

          {searchQuery && (
            <div style={{ marginTop: "16px" }}>
              {isSearching ? (
                <p style={{ color: isDark ? "#A0AEC0" : "#718096", fontSize: "14px" }}>Buscando autores...</p>
              ) : dynamicAuthors.length > 0 ? (
                <div style={s.authorGrid}>
                  {dynamicAuthors.map((a) => {
                    const isSel = selectedAuthors.some((sel) => (typeof sel === "object" ? sel.name : sel) === a.name);
                    return (
                      <div key={a.name} onClick={() => toggleAuthor(a)} style={{ ...s.authorResult, borderColor: isSel ? LARANJA : isDark ? "#4A5568" : "#E2E8F0", backgroundColor: isDark ? "#1A202C" : "#FFFFFF" }}>
                        <img src={a.img} alt={a.name} style={s.authorResultImg} />
                        <p style={{ ...s.authorResultName, color: isDark ? "#F7FAFC" : "#2D3748" }}>{a.name}</p>
                        {isSel && <div style={s.checkBadge}>✓</div>}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p style={{ color: isDark ? "#A0AEC0" : "#718096", fontSize: "14px" }}>Nenhum autor encontrado.</p>
              )}
            </div>
          )}
        </div>

        <div style={s.actions}>
          <button style={s.btnSave} onClick={handleSave}>Salvar Alterações</button>
          <button style={{ ...s.btnCancel, color: isDark ? "#A0AEC0" : "#718096" }} onClick={() => navigate(-1)}>Cancelar</button>
        </div>
      </main>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" },
  main: { maxWidth: "800px", margin: "0 auto", padding: "40px 24px 80px", display: "flex", flexDirection: "column", gap: "24px" },
  header: { marginBottom: "8px" },
  title: { fontSize: "28px", fontWeight: "800", margin: "0 0 8px 0", letterSpacing: "-0.5px" },
  subtitle: { fontSize: "15px", margin: 0, lineHeight: "1.5" },
  
  section: { border: "1px solid", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" },
  sectionTitle: { fontSize: "14px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 20px 0" },
  
  chipGrid: { display: "flex", flexWrap: "wrap", gap: "12px" },
  chip: { padding: "8px 18px", borderRadius: "24px", border: "1px solid", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit" },
  
  authorChip: { display: "flex", alignItems: "center", gap: "8px", padding: "6px 12px 6px 6px", border: "1px solid", borderRadius: "30px" },
  authorChipImg: { width: "24px", height: "24px", borderRadius: "50%" },
  removeBtn: { background: "none", border: "none", color: "#E53E3E", cursor: "pointer", fontSize: "14px", fontWeight: "bold", marginLeft: "4px", padding: "0 4px" },

  searchBox: { display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", border: "1px solid", borderRadius: "12px" },
  searchInput: { flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "15px", fontFamily: "inherit" },

  authorGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "16px" },
  authorResult: { display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", padding: "16px", border: "2px solid", borderRadius: "12px", cursor: "pointer", position: "relative", transition: "all 0.2s" },
  authorResultImg: { width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover" },
  authorResultName: { fontSize: "13px", fontWeight: "600", textAlign: "center", margin: 0 },
  checkBadge: { position: "absolute", top: "8px", right: "8px", width: "22px", height: "22px", borderRadius: "50%", backgroundColor: LARANJA, color: "#fff", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" },

  actions: { display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", marginTop: "16px" },
  btnSave: { width: "100%", maxWidth: "300px", padding: "14px", borderRadius: "30px", backgroundColor: LARANJA, color: "#FFF", border: "none", fontSize: "16px", fontWeight: "700", cursor: "pointer", transition: "opacity 0.2s" },
  btnCancel: { background: "none", border: "none", fontSize: "15px", fontWeight: "600", cursor: "pointer" },
};