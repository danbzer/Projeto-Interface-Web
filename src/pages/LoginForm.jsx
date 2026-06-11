import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import { useAuth } from "../context/AuthContext";

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

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!email) e.email = "O e-mail é obrigatório.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Formato de e-mail inválido.";
    if (!password) e.password = "A senha é obrigatória.";
    else if (password.length < 6) e.password = "A senha deve ter no mínimo 6 caracteres.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    login({ name: "Usuário", email, username: "", photo: null, preferences: null });
    navigate("/home");
  };

  // Simulação da chamada da API do Google
  const handleGoogleLogin = () => {
    const googleUser = {
      name: "Usuário do Google",
      email: "google@exemplo.com",
      uid: "google-uid-123"
    };
    login(googleUser);
    navigate("/home");
  };

  return (
    <div style={s.page}>
      <Header showBack />
      <main style={s.main}>
        <div style={s.cardForm}>
          <h2 style={s.title}>Entrar no Bookou</h2>
          <p style={s.subtitle}>Acesse sua conta para gerenciar suas leituras</p>
          
          <div style={s.form}>
            <Field label="E-mail" error={errors.email}>
              <input 
                type="email" 
                placeholder="exemplo@email.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                style={{ ...s.input, border: errors.email ? "2px solid #E53E3E" : "1px solid #E2E8F0" }} 
              />
            </Field>

            <Field label="Senha" error={errors.password}>
              <div style={{ position: "relative" }}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Sua senha secreta" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  style={{ ...s.input, border: errors.password ? "2px solid #E53E3E" : "1px solid #E2E8F0" }} 
                />
                <button type="button" style={s.eyeBtn} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </Field>

            <button style={s.btnSolid} onClick={handleSubmit}>Entrar</button>

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
              Entrar com o Google
            </button>
            
            <p style={s.link}>
              Não tem uma conta? <span style={s.linkSpan} onClick={() => navigate("/cadastro")}>Cadastre-se</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontSize: "14px", color: "#4A5568", fontWeight: "600" }}>{label}</label>
      {children}
      {error && <span style={{ fontSize: "12px", color: "#E53E3E", paddingLeft: "4px", fontWeight: "500" }}>{error}</span>}
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", backgroundColor: "#FAFAFA", fontFamily: "system-ui, -apple-system, sans-serif" },
  main: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 20px" },
  cardForm: { background: "#FFFFFF", padding: "40px 32px", borderRadius: "24px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", width: "100%", maxWidth: "400px" },
  title: { fontSize: "24px", color: "#1A202C", fontWeight: "700", textAlign: "center", marginBottom: "6px" },
  subtitle: { fontSize: "14px", color: "#718096", textAlign: "center", marginBottom: "28px" },
  form: { display: "flex", flexDirection: "column", gap: "16px" },
  input: { width: "100%", padding: "12px 18px", borderRadius: "30px", backgroundColor: "#F7FAFC", fontSize: "14px", color: "#2D3748", boxSizing: "border-box", outline: "none", transition: "0.2s" },
  eyeBtn: { position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" },
  btnSolid: { width: "100%", padding: "14px", borderRadius: "30px", backgroundColor: "#E06237", color: "#fff", border: "none", fontSize: "16px", fontWeight: "600", cursor: "pointer", marginTop: "4px", transition: "0.2s" },
  dividerContainer: { display: "flex", alignItems: "center", width: "100%", margin: "4px 0" },
  dividerLine: { flex: 1, height: "1px", background: "#E2E8F0" },
  orText: { fontSize: "13px", color: "#A0AEC0", padding: "0 12px", fontWeight: "500" },
  btnGoogle: { width: "100%", padding: "12px", borderRadius: "30px", backgroundColor: "#FFFFFF", color: "#4A5568", border: "1px solid #E2E8F0", fontSize: "15px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "0.2s", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" },
  link: { fontSize: "14px", color: "#718096", textAlign: "center", marginTop: "8px" },
  linkSpan: { color: "#E06237", fontWeight: "600", cursor: "pointer", textDecoration: "underline" },
};