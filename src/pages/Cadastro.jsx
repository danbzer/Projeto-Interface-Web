import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

function Cadastro() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    dataNascimento: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.nome) newErrors.nome = "Nome é obrigatório.";

    if (!form.dataNascimento) {
      newErrors.dataNascimento = "Data de nascimento é obrigatória.";
    } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(form.dataNascimento)) {
      newErrors.dataNascimento = "Data inválida. Use DD/MM/AAAA.";
    }

    if (!form.email) {
      newErrors.email = "E-mail é obrigatório.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "E-mail inválido.";
    }

    if (!form.senha) {
      newErrors.senha = "Senha é obrigatória.";
    } else if (form.senha.length < 8) {
      newErrors.senha = "Senha deve ter pelo menos 8 caracteres.";
    } else if (!/[A-Z]/.test(form.senha)) {
      newErrors.senha = "Senha deve ter pelo menos uma letra maiúscula.";
    } else if (!/[0-9]/.test(form.senha)) {
      newErrors.senha = "Senha deve ter pelo menos um número.";
    } else if (!/[!@#$%^&*]/.test(form.senha)) {
      newErrors.senha = "Senha deve ter pelo menos um caractere especial (!@#$%^&*).";
    }

    if (!form.confirmarSenha) {
      newErrors.confirmarSenha = "Confirme sua senha.";
    } else if (form.senha !== form.confirmarSenha) {
      newErrors.confirmarSenha = "As senhas não coincidem.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      navigate('/perfil');
    }
  };

  return (
    <div style={styles.page}>
      <Header showBack={true} />

      <main style={styles.main}>
        <h2 style={styles.title}>Dados cadastrais</h2>

        <div style={styles.form}>

          <div style={styles.field}>
            <label style={styles.label}>Nome completo</label>
            <input
              type="text"
              placeholder="Digite aqui..."
              value={form.nome}
              onChange={(e) => handleChange("nome", e.target.value)}
              style={{ ...styles.input, border: errors.nome ? "2px solid #ff4d4d" : "none" }}
            />
            {errors.nome && <span style={styles.errorMsg}>{errors.nome}</span>}
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Data de Nascimento</label>
            <input
              type="text"
              placeholder="DD/MM/AAAA"
              value={form.dataNascimento}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "");
                if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
                if (value.length > 5) value = value.slice(0, 5) + "/" + value.slice(5);
                if (value.length > 10) value = value.slice(0, 10);
                handleChange("dataNascimento", value);
              }}
              style={{ ...styles.input, border: errors.dataNascimento ? "2px solid #ff4d4d" : "none" }}
            />
            {errors.dataNascimento && <span style={styles.errorMsg}>{errors.dataNascimento}</span>}
          </div>

          <div style={styles.field}>
            <label style={styles.label}>E-mail</label>
            <input
              type="email"
              placeholder="Digite aqui..."
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              style={{ ...styles.input, border: errors.email ? "2px solid #ff4d4d" : "none" }}
            />
            {errors.email && <span style={styles.errorMsg}>{errors.email}</span>}
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Senha</label>
            <div style={styles.inputWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Digite aqui..."
                value={form.senha}
                onChange={(e) => handleChange("senha", e.target.value)}
                style={{ ...styles.input, border: errors.senha ? "2px solid #ff4d4d" : "none" }}
              />
              <button style={styles.eyeBtn} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {errors.senha && <span style={styles.errorMsg}>{errors.senha}</span>}
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Confirme a Senha</label>
            <div style={styles.inputWrapper}>
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Digite aqui..."
                value={form.confirmarSenha}
                onChange={(e) => handleChange("confirmarSenha", e.target.value)}
                style={{ ...styles.input, border: errors.confirmarSenha ? "2px solid #ff4d4d" : "none" }}
              />
              <button style={styles.eyeBtn} onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {errors.confirmarSenha && <span style={styles.errorMsg}>{errors.confirmarSenha}</span>}
          </div>

          <button style={styles.btnSolid} onClick={handleSubmit}>Cadastrar</button>

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
    padding: "40px 40px",
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
    gap: "16px",
    width: "100%",
    maxWidth: "380px",
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0",
  },
  errorMsg: {
    fontSize: "12px",
    color: "#ff4d4d",
    paddingLeft: "12px",
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
    marginTop: "8px",
  },
};

export default Cadastro;
