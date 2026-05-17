import { useState } from "react";
import Header from "../components/layout/Header";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={styles.page}>
      <Header showBack={true} />

      <main style={styles.main}>
        <h2 style={styles.title}>Entrar</h2>

        <div style={styles.form}>
          {/* EMAIL */}
          <div style={styles.field}>
            <label style={styles.label}>E-mail</label>
            <input
              type="email"
              placeholder="Digite aqui..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* SENHA */}
          <div style={styles.field}>
            <label style={styles.label}>Senha</label>
            <div style={styles.inputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Digite aqui..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
              <button
                style={styles.eyeBtn}
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Esconder senha" : "Mostrar senha"}
              >
                {showPassword ? "👁️" : "🙈"}
              </button>
            </div>
          </div>

          {/* BOTÃO */}
          <button style={styles.btnSolid}>Entrar</button>
        </div>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#7966CC",
    fontFamily: "'PT Mono', monospace",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 40px",
    gap: "24px",
  },
  title: {
    fontSize: "20px",
    color: "#F5F0FF",
    fontWeight: "400",
    margin: "0",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
    maxWidth: "360px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "14px",
    color: "#F5F0FF",
  },
  inputWrapper: {
    position: "relative",
  },
  input: {
    width: "100%",
    padding: "14px 20px",
    borderRadius: "30px",
    border: "none",
    backgroundColor: "#d0d0d0",
    fontSize: "14px",
    fontFamily: "'PT Mono', monospace",
    color: "#333",
    boxSizing: "border-box",
    outline: "none",
  },
  eyeBtn: {
    position: "absolute",
    right: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
  btnSolid: {
    width: "100%",
    padding: "16px",
    borderRadius: "30px",
    backgroundColor: "#301C54",
    color: "#fff",
    border: "none",
    fontFamily: "'PT Mono', monospace",
    fontSize: "18px",
    cursor: "pointer",
    marginTop: "16px",
  },
};

export default LoginForm;