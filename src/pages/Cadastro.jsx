import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import { useAuth } from "../context/AuthContext";

export default function Cadastro() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);
  const [errors, setErrors] = useState({});

  const requisitos = [
    { label: "Mínimo 8 caracteres", ok: senha.length >= 8 },
    { label: "Uma letra maiúscula", ok: /[A-Z]/.test(senha) },
    { label: "Um número", ok: /[0-9]/.test(senha) },
    { label: "Um caractere especial (!@#$%^&*)", ok: /[!@#$%^&*]/.test(senha) },
  ];

  const validate = () => {
    const e = {};
    if (!nome) e.nome = "Nome é obrigatório.";
    if (!email) e.email = "E-mail é obrigatório.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "E-mail inválido.";
    if (!senha) e.senha = "Senha é obrigatória.";
    else if (requisitos.some((r) => !r.ok)) e.senha = "A senha não atende aos requisitos.";
    if (!confirmarSenha) e.confirmarSenha = "Confirme sua senha.";
    else if (senha !== confirmarSenha) e.confirmarSenha = "As senhas não coincidem.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const lidarComCadastro = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const usuarioTemporario = { name: nome, email, uid: "temp-user-123" };
    login(usuarioTemporario);
    navigate("/personalizar");
  };

  // Simulação da chamada da API do Google
  const handleGoogleLogin = () => {
    const googleUser = {
      name: "Usuário do Google",
      email: "google@exemplo.com",
      uid: "google-uid-123"
    };
    login(googleUser);
    // Para cadastro com Google, faz sentido ir para /personalizar também!
    navigate("/personalizar"); 
  };

  return (
    <div style={s.page}>
      <div style={s.overlay}>
        <Header showBack />
        <main style={s.main}>
          <div style={s.card}>
            <h2 style={s.titulo}>Crie a sua conta</h2>
            <p style={s.subtitulo}>Comece sua jornada literária personalizada.</p>

            <form onSubmit={lidarComCadastro} style={s.form}>

              {/* nome */}
              <div style={s.inputGroup}>
                <label style={s.label}>Nome Completo</label>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome" required
                  style={{ ...s.input, border: errors.nome ? "2px solid #E53E3E" : "1px solid #E2E8F0" }} />
                {errors.nome && <span style={s.errorMsg}>{errors.nome}</span>}
              </div>

              {/* email */}
              <div style={s.inputGroup}>
                <label style={s.label}>E-mail</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@exemplo.com" required
                  style={{ ...s.input, border: errors.email ? "2px solid #E53E3E" : "1px solid #E2E8F0" }} />
                {errors.email && <span style={s.errorMsg}>{errors.email}</span>}
              </div>

              {/* senha */}
              <div style={s.inputGroup}>
                <label style={s.label}>Senha</label>
                <div style={{ position: "relative" }}>
                  <input type={showSenha ? "text" : "password"} value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Crie uma senha segura" required
                    style={{ ...s.input, border: errors.senha ? "2px solid #E53E3E" : "1px solid #E2E8F0" }} />
                  <button type="button" style={s.eyeBtn} onClick={() => setShowSenha(!showSenha)}>
                    {showSenha ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {errors.senha && <span style={s.errorMsg}>{errors.senha}</span>}

                {/* requisitos de senha */}
                <div style={s.requisitosBox}>
                  {requisitos.map((r) => (
                    <div key={r.label} style={s.requisito}>
                      <span style={{ ...s.requisitoDot, backgroundColor: r.ok ? "#38A169" : "#CBD5E0" }}>
                        {r.ok ? "✓" : "·"}
                      </span>
                      <span style={{ ...s.requisitoText, color: r.ok ? "#38A169" : "#718096" }}>
                        {r.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* confirmar senha */}
              <div style={s.inputGroup}>
                <label style={s.label}>Confirme a Senha</label>
                <div style={{ position: "relative" }}>
                  <input type={showConfirmar ? "text" : "password"} value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    placeholder="Repita a senha" required
                    style={{ ...s.input, border: errors.confirmarSenha ? "2px solid #E53E3E" : confirmarSenha && senha === confirmarSenha ? "2px solid #38A169" : "1px solid #E2E8F0" }} />
                  <button type="button" style={s.eyeBtn} onClick={() => setShowConfirmar(!showConfirmar)}>
                    {showConfirmar ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {errors.confirmarSenha && <span style={s.errorMsg}>{errors.confirmarSenha}</span>}
                {confirmarSenha && senha === confirmarSenha && (
                  <span style={{ ...s.errorMsg, color: "#38A169" }}>✓ Senhas coincidem</span>
                )}
              </div>

              <button type="submit" style={s.btnSolid}>Cadastrar</button>
            </form>

            <div style={s.dividerContainer}>
              <div style={s.dividerLine}></div>
              <span style={s.orText}>ou</span>
              <div style={s.dividerLine}></div>
            </div>

            <button type="button" style={s.btnGoogle} onClick={handleGoogleLogin}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20" style={{ marginRight: "10px" }}>
                <path fill="#EA4335" d="M24 9.5c3.5 0 6.9 1.2 9.5 3.3l7-7C36.3 2.4 30.6 0 24 0 14.6 0 6.7 5.4 3 13l7.7 6c1.8-5.5 7-9.5 13.3-9.5z"/>
                <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.2-.4-4.7H24v9h12.7c-.5 2.9-2.2 5.3-4.7 7l7.4 5.7c4.3-4 7.1-10 7.1-17z"/>
                <path fill="#FBBC05" d="M10.7 29c-1-2.9-1-6 0-9L3 14c-3.2 6.4-3.2 14 0 20.4l7.7-5.4z"/>
                <path fill="#34A853" d="M24 48c6.5 0 12.3-2.1 16.4-5.8l-7.4-5.7c-2.5 1.7-5.7 2.6-9 2.6-6.3 0-11.5-4-13.3-9.5L3 35c3.7 7.6 11.6 13 21 13z"/>
              </svg>
              Registrar com o Google
            </button>

            <p style={s.alternativa}>
              Já possui conta?{" "}
              <span style={s.link} onClick={() => navigate("/entrar")}>Faça login</span>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const s = {
  page: { minHeight: "100vh", backgroundColor: "#FAFAFA", fontFamily: "system-ui, -apple-system, sans-serif", position: "relative", overflow: "hidden" },
  overlay: { position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column" },
  main: { display: "flex", justifyContent: "center", alignItems: "center", padding: "40px 20px", flex: 1, width: "100%" },
  card: { width: "100%", maxWidth: "450px", background: "#FFFFFF", padding: "36px 32px", borderRadius: "24px", boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)" },
  titulo: { fontSize: "24px", color: "#1A202C", textAlign: "center", fontWeight: "700", marginTop: "0", marginBottom: "6px" },
  subtitulo: { fontSize: "14px", color: "#718096", textAlign: "center", marginBottom: "28px" },
  form: { display: "flex", flexDirection: "column", gap: "18px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "14px", color: "#4A5568", fontWeight: "600", textAlign: "left" },
  input: { width: "100%", padding: "12px 44px 12px 16px", borderRadius: "30px", fontSize: "14px", backgroundColor: "#F8FAFC", outline: "none", boxSizing: "border-box", transition: "0.2s" },
  eyeBtn: { position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" },
  errorMsg: { fontSize: "12px", color: "#E53E3E", paddingLeft: "4px", fontWeight: "500" },
  requisitosBox: { backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "10px 14px", display: "flex", flexDirection: "column", gap: "6px", marginTop: "4px" },
  requisito: { display: "flex", alignItems: "center", gap: "8px" },
  requisitoDot: { width: "16px", height: "16px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#fff", fontWeight: "bold", flexShrink: 0, transition: "background-color 0.2s" },
  requisitoText: { fontSize: "12px", fontWeight: "500", transition: "color 0.2s" },
  btnSolid: { width: "100%", padding: "14px", borderRadius: "30px", backgroundColor: "#E06237", color: "#fff", border: "none", fontSize: "16px", fontWeight: "600", cursor: "pointer", transition: "0.2s", marginTop: "8px" },
  dividerContainer: { display: "flex", alignItems: "center", width: "100%", margin: "20px 0" },
  dividerLine: { flex: 1, height: "1px", background: "#E2E8F0" },
  orText: { fontSize: "13px", color: "#A0AEC0", padding: "0 12px", fontWeight: "500" },
  btnGoogle: { width: "100%", padding: "12px", borderRadius: "30px", backgroundColor: "#FFFFFF", color: "#4A5568", border: "1px solid #E2E8F0", fontSize: "15px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "0.2s", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" },
  alternativa: { fontSize: "14px", color: "#718096", textAlign: "center", marginTop: "24px" },
  link: { color: "#E06237", fontWeight: "600", cursor: "pointer", textDecoration: "underline" },
};