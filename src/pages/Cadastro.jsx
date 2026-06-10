import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import { useAuth } from "../context/AuthContext";

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export default function Cadastro() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({ nome: "", dataNascimento: "", email: "", senha: "", confirmarSenha: "" });
  const [errors, setErrors] = useState({});

  const set = (field, value) => setForm((p) => ({ ...p, [field]: value }));

  const validate = () => {
    const e = {};
    if (!form.nome) e.nome = "Nome é obrigatório.";
    if (!form.dataNascimento) {
      e.dataNascimento = "Data de nascimento é obrigatória.";
    } else {
      const nascimento = new Date(form.dataNascimento);
      const hoje = new Date();

      if (isNaN(nascimento.getTime())) {
        e.dataNascimento = "Data inválida.";
      } else if (nascimento > hoje) {
        e.dataNascimento = "A data não pode ser futura.";
      }
    }
    if (!form.email) e.email = "E-mail é obrigatório.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "E-mail inválido.";
    if (!form.senha) e.senha = "Senha é obrigatória.";
    else if (form.senha.length < 8) e.senha = "Mínimo 8 caracteres.";
    else if (!/[A-Z]/.test(form.senha)) e.senha = "Precisa de uma letra maiúscula.";
    else if (!/[0-9]/.test(form.senha)) e.senha = "Precisa de um número.";
    if (!form.confirmarSenha) e.confirmarSenha = "Confirme sua senha.";
    else if (form.senha !== form.confirmarSenha) e.confirmarSenha = "As senhas não coincidem.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    login({ name: form.nome, email: form.email, username: "", photo: null, preferences: null });
    navigate("/personalizar");
  };

  const maskDate = (value) => {
    let v = value.replace(/\D/g, "");
    if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
    if (v.length > 5) v = v.slice(0, 5) + "/" + v.slice(5);
    return v.slice(0, 10);
  };

  return (
    <div style={s.page}>
      <Header showBack />
      <main style={s.main}>
        <h2 style={s.title}>Dados cadastrais</h2>
        <div style={s.form}>
          <Field label="Nome completo" error={errors.nome}>
            <input type="text" placeholder="Digite aqui..." value={form.nome} onChange={(e) => set("nome", e.target.value)} style={{ ...s.input, borderColor: errors.nome ? "#ff4d4d" : "transparent" }} />
          </Field>
          <Field label="Data de Nascimento" error={errors.dataNascimento}>
            <input
              type="date"
              value={form.dataNascimento}
              onChange={(e) => set("dataNascimento", e.target.value)}
              style={{
                ...s.input,
                borderColor: errors.dataNascimento ? "#ff4d4d" : "transparent",
              }}
            />
          </Field>
          <Field label="E-mail" error={errors.email}>
            <input type="email" placeholder="Digite aqui..." value={form.email} onChange={(e) => set("email", e.target.value)} style={{ ...s.input, borderColor: errors.email ? "#ff4d4d" : "transparent" }} />
          </Field>
          <Field label="Senha" error={errors.senha}>
            <div style={{ position: "relative" }}>
              <input type={showPassword ? "text" : "password"} placeholder="Digite aqui..." value={form.senha} onChange={(e) => set("senha", e.target.value)} style={{ ...s.input, borderColor: errors.senha ? "#ff4d4d" : "transparent" }} />
              <button style={s.eyeBtn} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOffIcon /> : <EyeIcon />}</button>
            </div>
          </Field>
          <Field label="Confirme a Senha" error={errors.confirmarSenha}>
            <div style={{ position: "relative" }}>
              <input type={showConfirm ? "text" : "password"} placeholder="Digite aqui..." value={form.confirmarSenha} onChange={(e) => set("confirmarSenha", e.target.value)} style={{ ...s.input, borderColor: errors.confirmarSenha ? "#ff4d4d" : "transparent" }} />
              <button style={s.eyeBtn} onClick={() => setShowConfirm(!showConfirm)}>{showConfirm ? <EyeOffIcon /> : <EyeIcon />}</button>
            </div>
          </Field>
          <button style={s.btnSolid} onClick={handleSubmit}>Cadastrar</button>
          <p style={s.link}>Já tem conta? <span style={s.linkSpan} onClick={() => navigate("/entrar")}>Entrar</span></p>
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
  main: { display: "flex", flexDirection: "column", alignItems: "center", padding: "40px", gap: "24px" },
  title: { fontSize: "20px", color: "#F5F0FF", fontWeight: "400" },
  form: { display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "380px" },
  input: { width: "100%", padding: "14px 20px", borderRadius: "30px", border: "2px solid transparent", backgroundColor: "#d0d0d0", fontSize: "14px", fontFamily: "'PT Mono', monospace", color: "#333", boxSizing: "border-box", outline: "none" },
  eyeBtn: { position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" },
  btnSolid: { width: "100%", padding: "16px", borderRadius: "30px", backgroundColor: "#301C54", color: "#fff", border: "none", fontFamily: "'PT Mono', monospace", fontSize: "16px", cursor: "pointer", marginTop: "8px" },
  link: { fontSize: "13px", color: "#F5F0FF", textAlign: "center" },
  linkSpan: { textDecoration: "underline", cursor: "pointer" },
};
