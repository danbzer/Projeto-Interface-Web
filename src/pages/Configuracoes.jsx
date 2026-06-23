import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import { useTheme } from "../context/ThemeContext";

const LARANJA = "#E06237";

const GENEROS = ["Terror", "Romance", "Fantasia", "Ficção Científica", "Suspense", "Biografia", "HQ", "Mangá", "Policial", "Aventura", "Drama", "Poesia"];
const IDIOMAS = ["Português", "Inglês", "Espanhol", "Francês", "Alemão", "Italiano"];
const TEMAS = ["Claro", "Escuro", "Sistema"];

export default function Configuracoes() {
  const navigate = useNavigate();
  const { tema, setTema } = useTheme();
  const [secaoAberta, setSecaoAberta] = useState("conta");
  const [mostrarAviso, setMostrarAviso] = useState(false);

  // inicia o estado tentando buscar dados prévios do localStorage
  const [config, setConfig] = useState(() => {
    const savedConfig = localStorage.getItem("userConfig");
    if (savedConfig) {
      return JSON.parse(savedConfig);
    }
    return {
      idioma: "Português",
      notificacoes: true,
      notificacoesEmail: false,
      generosPreferidos: ["Terror", "Suspense"],
      metaLeitura: "12",
      exibirAvaliacao: true,
      recomendacoesPersonalizadas: true,
      privacidadeBiblioteca: "publico",
      idiomaApp: "Português",
    };
  });

  const toggleGenero = (g) => {
    setConfig((prev) => ({
      ...prev,
      generosPreferidos: prev.generosPreferidos.includes(g)
        ? prev.generosPreferidos.filter((x) => x !== g)
        : [...prev.generosPreferidos, g],
    }));
  };

  // função para salvar as configurações
  const handleSave = () => {
    try {
      localStorage.setItem("userConfig", JSON.stringify(config));
      setMostrarAviso(true);
      setTimeout(() => setMostrarAviso(false), 3000);
    } catch (error) {
      console.error("Erro ao salvar configurações", error);
    }
  };

  const isDark = tema === "Escuro";

  const secoes = [
    { id: "conta", label: "Conta", icon: "👤" },
    { id: "preferencias", label: "Preferências de Leitura", icon: "📚" },
    { id: "aparencia", label: "Aparência", icon: "🎨" },
    { id: "privacidade", label: "Privacidade", icon: "🔒" },
  ];

  return (
    <div style={{ ...s.page, backgroundColor: isDark ? "#1A202C" : "#FAFAFA", color: isDark ? "#F7FAFC" : "#1A202C" }}>
      <Header showBack showUser />

      <main style={s.main}>
        <h2 style={{ ...s.pageTitle, color: isDark ? "#F7FAFC" : "#1A202C" }}>Configurações</h2>

        <div style={s.layout}>

          {/* MENU LATERAL */}
          <nav style={s.sidebar}>
            {secoes.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setSecaoAberta(sec.id)}
                style={{
                  ...s.sidebarBtn,
                  backgroundColor: secaoAberta === sec.id ? (isDark ? "#2D3748" : "#FFF3EE") : "transparent",
                  color: secaoAberta === sec.id ? LARANJA : isDark ? "#CBD5E0" : "#4A5568",
                  borderLeft: secaoAberta === sec.id ? `3px solid ${LARANJA}` : "3px solid transparent",
                  fontWeight: secaoAberta === sec.id ? "700" : "500",
                }}
              >
                <span>{sec.icon}</span>
                {sec.label}
              </button>
            ))}
          </nav>

          {/* CONTEÚDO */}
          <div style={{ ...s.content, backgroundColor: isDark ? "#2D3748" : "#FFFFFF", borderColor: isDark ? "#4A5568" : "#E2E8F0" }}>

            {/* CONTA */}
            {secaoAberta === "conta" && (
              <div style={s.section}>
                <h3 style={{ ...s.sectionTitle, color: isDark ? "#F7FAFC" : "#1A202C", borderColor: isDark ? "#4A5568" : "#E2E8F0" }}>Informações da Conta</h3>

                <div style={s.field}>
                  <label style={{ ...s.label, color: isDark ? "#E2E8F0" : "#2D3748" }}>Nome de usuário</label>
                  <input style={{ ...s.input, backgroundColor: isDark ? "#1A202C" : "#F8FAFC", color: isDark ? "#F7FAFC" : "#2D3748", borderColor: isDark ? "#4A5568" : "#E2E8F0" }} type="text" placeholder="Seu nome de usuário" defaultValue="Usuário" />
                </div>

                <div style={s.field}>
                  <label style={{ ...s.label, color: isDark ? "#E2E8F0" : "#2D3748" }}>E-mail</label>
                  <input style={{ ...s.input, backgroundColor: isDark ? "#1A202C" : "#F8FAFC", color: isDark ? "#F7FAFC" : "#2D3748", borderColor: isDark ? "#4A5568" : "#E2E8F0" }} type="email" placeholder="seu@email.com" />
                </div>

                <div style={s.field}>
                  <label style={{ ...s.label, color: isDark ? "#E2E8F0" : "#2D3748" }}>Nova senha</label>
                  <input style={{ ...s.input, backgroundColor: isDark ? "#1A202C" : "#F8FAFC", color: isDark ? "#F7FAFC" : "#2D3748", borderColor: isDark ? "#4A5568" : "#E2E8F0" }} type="password" placeholder="Digite uma nova senha" />
                </div>

                <div style={s.field}>
                  <label style={{ ...s.label, color: isDark ? "#E2E8F0" : "#2D3748" }}>Confirmar senha</label>
                  <input style={{ ...s.input, backgroundColor: isDark ? "#1A202C" : "#F8FAFC", color: isDark ? "#F7FAFC" : "#2D3748", borderColor: isDark ? "#4A5568" : "#E2E8F0" }} type="password" placeholder="Confirme a nova senha" />
                </div>

                <div style={s.btnRow}>
                  <button style={s.btnSalvar} onClick={handleSave}>Salvar alterações</button>
                  <button 
                    style={{  ...s.btnPerigo,  backgroundColor: isDark ? "#2D1515" : "#FFF5F5",  borderColor: isDark ? "#E53E3E" : "#FEB2B2" }} 
                    onClick={() => navigate("/")}
                  >
                    Sair da conta
                  </button>
                </div>
              </div>
            )}

            {/* PREFERÊNCIAS DE LEITURA */}
            {secaoAberta === "preferencias" && (
              <div style={s.section}>
                <h3 style={{ ...s.sectionTitle, color: isDark ? "#F7FAFC" : "#1A202C", borderColor: isDark ? "#4A5568" : "#E2E8F0" }}>Preferências de Leitura</h3>

                <div style={s.field}>
                  <label style={{ ...s.label, color: isDark ? "#E2E8F0" : "#2D3748" }}>Gêneros favoritos</label>
                  <p style={s.hint}>Selecione os gêneros que você mais gosta</p>
                  <div style={s.chipRow}>
                    {GENEROS.map((g) => (
                      <button
                        key={g}
                        onClick={() => toggleGenero(g)}
                        style={{
                          ...s.chip,
                          backgroundColor: config.generosPreferidos.includes(g) ? LARANJA : isDark ? "#1A202C" : "#F8FAFC",
                          color: config.generosPreferidos.includes(g) ? "#FFF" : isDark ? "#CBD5E0" : "#4A5568",
                          border: config.generosPreferidos.includes(g) ? "none" : isDark ? "1px solid #4A5568" : "1px solid #E2E8F0",
                        }}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={s.field}>
                  <label style={{ ...s.label, color: isDark ? "#E2E8F0" : "#2D3748" }}>Meta de leitura anual</label>
                  <p style={s.hint}>Quantos livros você quer ler este ano?</p>
                  <input
                    style={{ ...s.input, maxWidth: "120px", backgroundColor: isDark ? "#1A202C" : "#F8FAFC", color: isDark ? "#F7FAFC" : "#2D3748", borderColor: isDark ? "#4A5568" : "#E2E8F0" }}
                    type="number"
                    min="1"
                    max="365"
                    value={config.metaLeitura}
                    onChange={(e) => setConfig((prev) => ({ ...prev, metaLeitura: e.target.value }))}
                  />
                </div>

                <div style={s.field}>
                  <label style={{ ...s.label, color: isDark ? "#E2E8F0" : "#2D3748" }}>Idioma preferido para leitura</label>
                  <div style={s.chipRow}>
                    {IDIOMAS.map((i) => (
                      <button
                        key={i}
                        onClick={() => setConfig((prev) => ({ ...prev, idioma: i }))}
                        style={{
                          ...s.chip,
                          backgroundColor: config.idioma === i ? LARANJA : isDark ? "#1A202C" : "#F8FAFC",
                          color: config.idioma === i ? "#FFF" : isDark ? "#CBD5E0" : "#4A5568",
                          border: config.idioma === i ? "none" : isDark ? "1px solid #4A5568" : "1px solid #E2E8F0",
                        }}
                      >
                        {i}
                      </button>
                    ))}
                  </div>
                </div>

                <Toggle
                  label="Recomendações personalizadas"
                  hint="Receber sugestões baseadas no seu histórico"
                  value={config.recomendacoesPersonalizadas}
                  onChange={() => setConfig((prev) => ({ ...prev, recomendacoesPersonalizadas: !prev.recomendacoesPersonalizadas }))}
                  isDark={isDark}
                />

                <Toggle
                  label="Exibir minha avaliação nos livros"
                  hint="Sua nota aparece na página do livro"
                  value={config.exibirAvaliacao}
                  onChange={() => setConfig((prev) => ({ ...prev, exibirAvaliacao: !prev.exibirAvaliacao }))}
                  isDark={isDark}
                />

                <button style={s.btnSalvar} onClick={handleSave}>Salvar preferências</button>
              </div>
            )}

            {/* APARÊNCIA */}
            {secaoAberta === "aparencia" && (
              <div style={s.section}>
                <h3 style={{ ...s.sectionTitle, color: isDark ? "#F7FAFC" : "#1A202C", borderColor: isDark ? "#4A5568" : "#E2E8F0" }}>Aparência</h3>

                <div style={s.field}>
                  <label style={{ ...s.label, color: isDark ? "#E2E8F0" : "#2D3748" }}>Tema</label>
                  <p style={s.hint}>Escolha o tema visual do aplicativo</p>
                  <div style={s.chipRow}>
                    {TEMAS.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTema(t)}
                        style={{
                          ...s.chip,
                          backgroundColor: tema === t ? LARANJA : isDark ? "#1A202C" : "#F8FAFC",
                          color: tema === t ? "#FFF" : isDark ? "#CBD5E0" : "#4A5568",
                          border: tema === t ? "none" : isDark ? "1px solid #4A5568" : "1px solid #E2E8F0",
                        }}
                      >
                        {t === "Claro" ? "☀️" : t === "Escuro" ? "🌙" : "💻"} {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={s.field}>
                  <label style={{ ...s.label, color: isDark ? "#E2E8F0" : "#2D3748" }}>Idioma do aplicativo</label>
                  <div style={s.chipRow}>
                    {["Português", "Inglês", "Espanhol"].map((i) => (
                      <button
                        key={i}
                        onClick={() => setConfig((prev) => ({ ...prev, idiomaApp: i }))}
                        style={{
                          ...s.chip,
                          backgroundColor: config.idiomaApp === i ? LARANJA : isDark ? "#1A202C" : "#F8FAFC",
                          color: config.idiomaApp === i ? "#FFF" : isDark ? "#CBD5E0" : "#4A5568",
                          border: config.idiomaApp === i ? "none" : isDark ? "1px solid #4A5568" : "1px solid #E2E8F0",
                        }}
                      >
                        {i}
                      </button>
                    ))}
                  </div>
                </div>

                <button style={s.btnSalvar} onClick={handleSave}>Salvar aparência</button>
              </div>
            )}

            {/* PRIVACIDADE */}
            {secaoAberta === "privacidade" && (
              <div style={s.section}>
                <h3 style={{ ...s.sectionTitle, color: isDark ? "#F7FAFC" : "#1A202C", borderColor: isDark ? "#4A5568" : "#E2E8F0" }}>Privacidade</h3>

                <div style={s.field}>
                  <label style={{ ...s.label, color: isDark ? "#E2E8F0" : "#2D3748" }}>Visibilidade da biblioteca</label>
                  <p style={s.hint}>Quem pode ver seus livros?</p>
                  <div style={s.chipRow}>
                    {[
                      { id: "publico", label: "🌍 Público" },
                      { id: "amigos", label: "👥 Amigos" },
                      { id: "privado", label: "🔒 Privado" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setConfig((prev) => ({ ...prev, privacidadeBiblioteca: opt.id }))}
                        style={{
                          ...s.chip,
                          backgroundColor: config.privacidadeBiblioteca === opt.id ? LARANJA : isDark ? "#1A202C" : "#F8FAFC",
                          color: config.privacidadeBiblioteca === opt.id ? "#FFF" : isDark ? "#CBD5E0" : "#4A5568",
                          border: config.privacidadeBiblioteca === opt.id ? "none" : isDark ? "1px solid #4A5568" : "1px solid #E2E8F0",
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <Toggle
                  label="Mostrar avaliações publicamente"
                  hint="Outros usuários podem ver suas notas"
                  value={config.exibirAvaliacao}
                  onChange={() => setConfig((prev) => ({ ...prev, exibirAvaliacao: !prev.exibirAvaliacao }))}
                  isDark={isDark}
                />

                <div style={{ ...s.field, marginTop: "32px", paddingTop: "24px", borderTop: `1px solid ${isDark ? "#4A5568" : "#E2E8F0"}` }}>
                  <label style={{ ...s.label, color: "#E53E3E" }}>Zona de perigo</label>
                  <p style={s.hint}>Essas ações são irreversíveis</p>
                  <div style={s.btnRow}>
                    <button style={{ ...s.btnPerigo, backgroundColor: isDark ? "#2D1515" : "#FFF5F5", borderColor: isDark ? "#E53E3E" : "#FEB2B2" }}>
                      Excluir minha conta
                    </button>
                  </div>
                </div>

                <button style={s.btnSalvar} onClick={handleSave}>Salvar privacidade</button>
              </div>
            )}

          </div>
        </div>

        {/* COMPONENTE DE AVISO (TOAST) */}
        {mostrarAviso && (
          <div style={{
            position: "fixed",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: isDark ? "#2F855A" : "#38A169",
            color: "#FFF",
            padding: "12px 24px",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "14px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: 1000,
            transition: "opacity 0.3s ease-in-out"
          }}>
            Configurações salvas com sucesso!
          </div>
        )}

      </main>
    </div>
  );
}

function Toggle({ label, hint, value, onChange, isDark }) {
  return (
    <div style={s.toggleRow}>
      <div>
        <p style={{ ...s.toggleLabel, color: isDark ? "#E2E8F0" : "#2D3748" }}>{label}</p>
        {hint && <p style={s.hint}>{hint}</p>}
      </div>
      <button onClick={onChange} style={{ ...s.toggleBtn, backgroundColor: value ? LARANJA : "#E2E8F0" }}>
        <span style={{ ...s.toggleThumb, transform: value ? "translateX(20px)" : "translateX(2px)" }} />
      </button>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", fontFamily: "system-ui, sans-serif", display: "flex", flexDirection: "column" },
  main: { maxWidth: "1050px", margin: "0 auto", padding: "32px 24px 80px", width: "100%", boxSizing: "border-box", flex: 1 },
  pageTitle: { fontSize: "26px", fontWeight: "bold", marginBottom: "32px" },
  layout: { display: "grid", gridTemplateColumns: "220px 1fr", gap: "32px" },
  sidebar: { display: "flex", flexDirection: "column", gap: "4px" },
  sidebarBtn: { display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", border: "none", borderRadius: "10px", cursor: "pointer", fontFamily: "inherit", fontSize: "14px", textAlign: "left", transition: "all 0.2s" },
  content: { border: "1px solid", borderRadius: "20px", padding: "32px", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" },
  section: { display: "flex", flexDirection: "column", gap: "24px" },
  sectionTitle: { fontSize: "18px", fontWeight: "700", margin: "0 0 8px 0", paddingBottom: "16px", borderBottom: "1px solid" },
  field: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontSize: "14px", fontWeight: "700" },
  hint: { fontSize: "12px", color: "#A0AEC0", margin: 0 },
  input: { padding: "10px 16px", borderRadius: "10px", border: "1px solid", fontFamily: "inherit", fontSize: "14px", outline: "none" },
  chipRow: { display: "flex", gap: "8px", flexWrap: "wrap" },
  chip: { padding: "6px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: "500", cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" },
  btnRow: { display: "flex", gap: "12px", flexWrap: "wrap" },
  btnSalvar: { padding: "10px 24px", borderRadius: "10px", backgroundColor: LARANJA, color: "#FFF", border: "none", fontFamily: "inherit", fontSize: "14px", fontWeight: "700", cursor: "pointer" },
  btnPerigo: { padding: "10px 24px", borderRadius: "10px", backgroundColor: "#FFF5F5", color: "#E53E3E", border: "1px solid #FEB2B2", fontFamily: "inherit", fontSize: "14px", fontWeight: "700", cursor: "pointer" },
  toggleRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0" },
  toggleLabel: { fontSize: "14px", fontWeight: "600", margin: 0 },
  toggleBtn: { width: "44px", height: "24px", borderRadius: "12px", border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 },
  toggleThumb: { position: "absolute", top: "2px", width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#FFF", boxShadow: "0 1px 4px rgba(0,0,0,0.2)", transition: "transform 0.2s", display: "block" },
};