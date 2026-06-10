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
  form: { display: "flex", flexDirection: "column", gap: "20px" },
  input: { width: "100%", padding: "12px 18px", borderRadius: "30px", backgroundColor: "#F7FAFC", fontSize: "14px", color: "#2D3748", boxSizing: "border-box", outline: "none", transition: "0.2s" },
  eyeBtn: { position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" },
  btnSolid: { width: "100%", padding: "14px", borderRadius: "30px", backgroundColor: "#E06237", color: "#fff", border: "none", fontSize: "16px", fontWeight: "600", cursor: "pointer", marginTop: "10px", transition: "0.2s" },
  link: { fontSize: "14px", color: "#718096", textAlign: "center", marginTop: "4px" },
  linkSpan: { color: "#E06237", fontWeight: "600", cursor: "pointer", textDecoration: "underline" },
};