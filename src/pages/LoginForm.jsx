import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import { useAuth } from "../context/AuthContext";

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    if (!email) e.email = "E-mail é obrigatório.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "E-mail inválido.";
    if (!password) e.password = "Senha é obrigatória.";
    else if (password.length < 6) e.password = "Mínimo 6 caracteres.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    // Mock login — in production, call your auth API here
    login({ name: "Usuário", email, username: "", photo: null, preferences: null });
    navigate("/home");
  };

  return (
    <div style={s.page}>
      <Header showBack />
      <main style={s.main}>
        <h2 style={s.title}>Entrar</h2>
        <div style={s.form}>
          <Field label="E-mail" error={errors.email}>
            <input type="email" placeholder="Digite aqui..." value={email} onChange={(e) => setEmail(e.target.value)} style={{ ...s.input, borderColor: errors.email ? "#ff4d4d" : "transparent" }} />
          </Field>
          <Field label="Senha" error={errors.password}>
            <div style={{ position: "relative" }}>
              <input type={showPassword ? "text" : "password"} placeholder="Digite aqui..." value={password} onChange={(e) => setPassword(e.target.value)} style={{ ...s.input, borderColor: errors.password ? "#ff4d4d" : "transparent" }} />
              <button style={s.eyeBtn} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOffIcon /> : <EyeIcon />}</button>
            </div>
          </Field>
          <button style={s.btnSolid} onClick={handleSubmit}>Entrar</button>
          <p style={s.link}>Não tem conta? <span style={s.linkSpan} onClick={() => navigate("/cadastro")}>Cadastre-se</span></p>
        </div>
      </main>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontSize: "14px", color: "#F5F0FF" }}>{label}</label>
      {children}
      {error && <span style={{ fontSize: "12px", color: "#ff4d4d", paddingLeft: "12px" }}>{error}</span>}
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", backgroundColor: "#7966CC", fontFamily: "'PT Mono', monospace" },
  main: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 40px", gap: "24px" },
  title: { fontSize: "20px", color: "#F5F0FF", fontWeight: "400" },
  form: { display: "flex", flexDirection: "column", gap: "20px", width: "100%", maxWidth: "360px" },
  input: { width: "100%", padding: "14px 20px", borderRadius: "30px", border: "2px solid transparent", backgroundColor: "#d0d0d0", fontSize: "14px", fontFamily: "'PT Mono', monospace", color: "#333", boxSizing: "border-box", outline: "none" },
  eyeBtn: { position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" },
  btnSolid: { width: "100%", padding: "16px", borderRadius: "30px", backgroundColor: "#301C54", color: "#fff", border: "none", fontFamily: "'PT Mono', monospace", fontSize: "16px", cursor: "pointer", marginTop: "8px" },
  link: { fontSize: "13px", color: "#F5F0FF", textAlign: "center" },
  linkSpan: { textDecoration: "underline", cursor: "pointer" },
};
