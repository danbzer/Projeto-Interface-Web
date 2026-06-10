import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import { useAuth } from "../context/AuthContext";

export default function Cadastro() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const lidarComCadastro = (e) => {
    e.preventDefault();

    const usuarioTemporario = { nome, email, uid: "temp-user-123" };
    localStorage.setItem("user", JSON.stringify(usuarioTemporario));
    localStorage.setItem("token", "mock-token-abc-123");
    login(usuarioTemporario);

    navigate("/personalizar");
  };

  return (
    <div style={s.page}>
      <div style={s.overlay}>
        <Header />

        <main style={s.main}>
          <div style={s.card}>
            <div style={s.voltar} onClick={() => navigate(-1)}>
              &larr; Voltar
            </div>

            <h2 style={s.titulo}>Crie a sua conta</h2>
            <p style={s.subtitulo}>Comece sua jornada literária personalizada.</p>

            <form onSubmit={lidarComCadastro} style={s.form}>
              <div style={s.inputGroup}>
                <label style={s.label}>Nome Completo</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome"
                  required
                  style={s.input}
                />
              </div>

              <div style={s.inputGroup}>
                <label style={s.label}>E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@exemplo.com"
                  required
                  style={s.input}
                />
              </div>

              <div style={s.inputGroup}>
                <label style={s.label}>Senha</label>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  required
                  style={s.input}
                />
              </div>

              <button type="submit" style={s.btnSolid}>
                Cadastrar
              </button>
            </form>

            <div style={s.dividerContainer}>
              <div style={s.dividerLine}></div>
              <span style={s.orText}>ou</span>
              <div style={s.dividerLine}></div>
            </div>

            <button
              type="button"
              style={s.btnGoogle}
              onClick={() => alert("Chamando API do Google Auth...")}
            >
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
              <span style={s.link} onClick={() => navigate("/entrar")}>
                Faça login
              </span>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", backgroundColor: "#FAFAFA", fontFamily: "system-ui, -apple-system, sans-serif", position: "relative", overflow: "hidden" },
  overlay: { position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column" },
  main: { display: "flex", justifyContent: "center", alignItems: "center", padding: "40px 20px", flex: 1, width: "100%" },
  card: { width: "100%", maxWidth: "450px", background: "#FFFFFF", padding: "36px 32px", borderRadius: "24px", boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)", position: "relative" },
  voltar: { position: "absolute", top: "20px", left: "24px", fontSize: "14px", color: "#718096", cursor: "pointer", fontWeight: "500", transition: "0.2s" },
  titulo: { fontSize: "24px", color: "#1A202C", textAlign: "center", fontWeight: "700", marginTop: "16px", marginBottom: "6px" },
  subtitulo: { fontSize: "14px", color: "#718096", textAlign: "center", marginBottom: "28px", fontWeight: "400" },
  form: { display: "flex", flexDirection: "column", gap: "18px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "14px", color: "#4A5568", fontWeight: "600", textAlign: "left" },
  input: { width: "100%", padding: "12px 16px", borderRadius: "30px", border: "1px solid #E2E8F0", fontSize: "14px", backgroundColor: "#F8FAFC", outline: "none", boxSizing: "border-box", transition: "0.2s" },
  btnSolid: { width: "100%", padding: "14px", borderRadius: "30px", backgroundColor: "#E06237", color: "#fff", border: "none", fontSize: "16px", fontWeight: "600", cursor: "pointer", transition: "0.2s", textAlign: "center", marginTop: "8px" },
  dividerContainer: { display: "flex", alignItems: "center", width: "100%", margin: "20px 0" },
  dividerLine: { flex: 1, height: "1px", background: "#E2E8F0" },
  orText: { fontSize: "13px", color: "#A0AEC0", padding: "0 12px", fontWeight: "500" },
  btnGoogle: { width: "100%", padding: "12px", borderRadius: "30px", backgroundColor: "#FFFFFF", color: "#4A5568", border: "1px solid #E2E8F0", fontSize: "15px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "0.2s", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" },
  alternativa: { fontSize: "14px", color: "#718096", textAlign: "center", marginTop: "24px", fontWeight: "400" },
  link: { color: "#E06237", fontWeight: "600", cursor: "pointer", textDecoration: "underline" },
};