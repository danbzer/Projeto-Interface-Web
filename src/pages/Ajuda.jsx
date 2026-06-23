import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import { useTheme } from "../context/ThemeContext";

const LARANJA = "#E06237";

export default function Ajuda() {
  const navigate = useNavigate();
  const { tema } = useTheme();
  const isDark = tema === "Escuro";
  const [secaoAberta, setSecaoAberta] = useState("faq");
  const [mostrarAviso, setMostrarAviso] = useState(false); 

  const handleEnviarMensagem = (e) => {
    e.preventDefault();
    //aviso
    setMostrarAviso(true);
    // esconde após 3 segundos
    setTimeout(() => setMostrarAviso(false), 3000);
  
    e.target.reset(); 
  };

  const secoes = [
    { id: "faq", label: "Perguntas Frequentes", icon: "❓" },
    { id: "contato", label: "Fale Conosco", icon: "✉️" },
    { id: "sobre", label: "Sobre o Bookou", icon: "ℹ️" },
    { id: "termos", label: "Termos de Uso", icon: "📄" },
  ];

  return (
    <div style={{ ...s.page, backgroundColor: isDark ? "#1A202C" : "#FAFAFA", color: isDark ? "#F7FAFC" : "#1A202C" }}>
      <Header showBack showUser />

      <main style={s.main}>
        <h2 style={{ ...s.pageTitle, color: isDark ? "#F7FAFC" : "#1A202C" }}>Ajuda e Suporte</h2>

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

            {/* FAQ */}
            {secaoAberta === "faq" && (
              <div style={s.section}>
                <h3 style={{ ...s.sectionTitle, color: isDark ? "#F7FAFC" : "#1A202C", borderColor: isDark ? "#4A5568" : "#E2E8F0" }}>Perguntas Frequentes</h3>

                <div style={s.faqItem}>
                  <h4 style={{ ...s.faqQuestion, color: isDark ? "#E2E8F0" : "#2D3748" }}>Como adiciono um livro na minha biblioteca?</h4>
                  <p style={{ ...s.faqAnswer, color: isDark ? "#A0AEC0" : "#718096" }}>Vá até a página do livro desejado e clique em um dos status de leitura (Quero Ler, Lendo, Lido, etc.) ou clique na estrela para favoritar.</p>
                </div>

                <div style={s.faqItem}>
                  <h4 style={{ ...s.faqQuestion, color: isDark ? "#E2E8F0" : "#2D3748" }}>Como altero minhas preferências de gênero?</h4>
                  <p style={{ ...s.faqAnswer, color: isDark ? "#A0AEC0" : "#718096" }}>Acesse as "Configurações" no menu do seu perfil e vá na aba "Preferências de Leitura". Lá você pode marcar e desmarcar seus gêneros favoritos.</p>
                </div>

                <div style={s.faqItem}>
                  <h4 style={{ ...s.faqQuestion, color: isDark ? "#E2E8F0" : "#2D3748" }}>Onde encontro as avaliações que eu fiz?</h4>
                  <p style={{ ...s.faqAnswer, color: isDark ? "#A0AEC0" : "#718096" }}>As avaliações ficam salvas na página do próprio livro quando você o marca como "Lido". Você também pode visualizá-las na aba de livros lidos da sua biblioteca.</p>
                </div>

                <div style={s.faqItem}>
                  <h4 style={{ ...s.faqQuestion, color: isDark ? "#E2E8F0" : "#2D3748" }}>Como ativo o Tema Escuro?</h4>
                  <p style={{ ...s.faqAnswer, color: isDark ? "#A0AEC0" : "#718096" }}>Vá em Configurações &gt; Aparência e selecione a opção "Escuro".</p>
                </div>
              </div>
            )}

            {/* FALE CONOSCO */}
            {secaoAberta === "contato" && (
              <form onSubmit={handleEnviarMensagem} style={s.section}>
                <h3 style={{ ...s.sectionTitle, color: isDark ? "#F7FAFC" : "#1A202C", borderColor: isDark ? "#4A5568" : "#E2E8F0" }}>Fale Conosco</h3>
                <p style={{ ...s.hint, marginBottom: "16px", fontSize: "14px" }}>Teve algum problema ou tem uma sugestão? Mande uma mensagem para a nossa equipe.</p>

                <div style={s.field}>
                  <label style={{ ...s.label, color: isDark ? "#E2E8F0" : "#2D3748" }}>Assunto</label>
                  <input required style={{ ...s.input, backgroundColor: isDark ? "#1A202C" : "#F8FAFC", color: isDark ? "#F7FAFC" : "#2D3748", borderColor: isDark ? "#4A5568" : "#E2E8F0" }} type="text" placeholder="Ex: Problema com a busca" />
                </div>

                <div style={s.field}>
                  <label style={{ ...s.label, color: isDark ? "#E2E8F0" : "#2D3748" }}>Mensagem</label>
                  <textarea required style={{ ...s.input, backgroundColor: isDark ? "#1A202C" : "#F8FAFC", color: isDark ? "#F7FAFC" : "#2D3748", borderColor: isDark ? "#4A5568" : "#E2E8F0", minHeight: "120px", resize: "vertical" }} placeholder="Descreva sua dúvida ou sugestão aqui..." />
                </div>

                <div style={{ marginTop: "8px" }}>
                  <button type="submit" style={s.btnSalvar}>Enviar mensagem</button>
                </div>
              </form>
            )}

            {/* SOBRE O BOOKOU */}
            {secaoAberta === "sobre" && (
              <div style={s.section}>
                <h3 style={{ ...s.sectionTitle, color: isDark ? "#F7FAFC" : "#1A202C", borderColor: isDark ? "#4A5568" : "#E2E8F0" }}>Sobre o Bookou</h3>
                
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "24px 0" }}>
                  <div style={{ fontSize: "48px" }}>📚</div>
                  <h4 style={{ fontSize: "20px", margin: 0, color: isDark ? "#F7FAFC" : "#1A202C" }}>Bookou</h4>
                  <span style={{ fontSize: "12px", color: "#A0AEC0", backgroundColor: isDark ? "#1A202C" : "#F8FAFC", padding: "4px 12px", borderRadius: "12px", border: `1px solid ${isDark ? "#4A5568" : "#E2E8F0"}` }}>
                    Versão 1.0.0
                  </span>
                </div>

                <p style={{ lineHeight: "1.6", color: isDark ? "#CBD5E0" : "#4A5568", fontSize: "15px" }}>
                  O Bookou é seu companheiro ideal para gerenciar leituras, descobrir novos universos literários e acompanhar sua jornada como leitor. Feito com amor por amantes de livros, para amantes de livros.
                </p>
              </div>
            )}

            {/* TERMOS DE USO */}
            {secaoAberta === "termos" && (
              <div style={s.section}>
                <h3 style={{ ...s.sectionTitle, color: isDark ? "#F7FAFC" : "#1A202C", borderColor: isDark ? "#4A5568" : "#E2E8F0" }}>Termos de Privacidade e Uso</h3>
                
                <div style={{ maxHeight: "400px", overflowY: "auto", paddingRight: "12px", display: "flex", flexDirection: "column", gap: "16px" }}>
                  <p style={{ lineHeight: "1.6", color: isDark ? "#CBD5E0" : "#4A5568", fontSize: "14px", margin: 0 }}>
                    <strong>1. Coleta de Dados:</strong> O Bookou coleta informações básicas como nome de usuário, e-mail e preferências de leitura para personalizar sua experiência.
                  </p>
                  <p style={{ lineHeight: "1.6", color: isDark ? "#CBD5E0" : "#4A5568", fontSize: "14px", margin: 0 }}>
                    <strong>2. Uso das Informações:</strong> Seus dados de leitura e reviews são utilizados exclusivamente para gerar recomendações através da nossa API integrada.
                  </p>
                  <p style={{ lineHeight: "1.6", color: isDark ? "#CBD5E0" : "#4A5568", fontSize: "14px", margin: 0 }}>
                    <strong>3. Privacidade:</strong> Você tem o controle sobre a visibilidade da sua biblioteca, podendo torná-la pública ou privada na aba de Configurações. Não vendemos seus dados para terceiros.
                  </p>
                  <p style={{ lineHeight: "1.6", color: isDark ? "#CBD5E0" : "#4A5568", fontSize: "14px", margin: 0 }}>
                    <strong>4. Responsabilidade do Usuário:</strong> É responsabilidade do usuário manter o respeito em reviews públicos. O Bookou se reserva o direito de remover avaliações ofensivas.
                  </p>
                </div>
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
            Mensagem enviada com sucesso! Entraremos em contato em breve.
          </div>
        )}

      </main>
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
  btnSalvar: { padding: "10px 24px", borderRadius: "10px", backgroundColor: LARANJA, color: "#FFF", border: "none", fontFamily: "inherit", fontSize: "14px", fontWeight: "700", cursor: "pointer" },
  faqItem: { display: "flex", flexDirection: "column", gap: "6px", marginBottom: "8px" },
  faqQuestion: { fontSize: "15px", margin: 0, fontWeight: "700" },
  faqAnswer: { fontSize: "14px", margin: 0, lineHeight: "1.5" },
};