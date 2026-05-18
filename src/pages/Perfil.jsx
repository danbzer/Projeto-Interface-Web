import { useState, useRef } from "react";
import Header from "../components/layout/Header";
import { useNavigate } from "react-router-dom";

function Perfil() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});
  const inputFileRef = useRef(null);

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhoto(url);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Nome de usuário é obrigatório.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      alert("Perfil salvo com sucesso!");
    }
  };

  return (
    <div style={styles.page}>
      <Header showBack={true} />

      <main style={styles.main}>
        <h2 style={styles.title}>Personalize seu perfil</h2>

        {/* FOTO */}
        <div style={styles.photoArea}>
          <div style={styles.photoBox}>
            {photo ? (
              <img src={photo} alt="Perfil" style={styles.photoImg} />
            ) : (
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="#555" strokeWidth="1.5" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#555" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </div>
          <button style={styles.editBtn} onClick={() => inputFileRef.current.click()} title="Editar foto">
            ✏️
          </button>
          <input
            type="file"
            accept="image/*"
            ref={inputFileRef}
            style={{ display: "none" }}
            onChange={handlePhoto}
          />
        </div>

        <div style={styles.form}>
          {/* NOME DE USUÁRIO */}
          <div style={styles.field}>
            <label style={styles.label}>Nome de Usuário</label>
            <input
              type="text"
              placeholder="Digite aqui..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ ...styles.input, border: errors.username ? "2px solid #ff4d4d" : "none" }}
            />
            {errors.username && <span style={styles.errorMsg}>{errors.username}</span>}
          </div>

          <button style={styles.btnSolid} onClick={handleSubmit}>Salvar</button>
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
    padding: "40px",
    gap: "24px",
  },
  title: {
    fontSize: "20px",
    color: "#F5F0FF",
    fontWeight: "400",
    margin: "0",
  },
  photoArea: {
    position: "relative",
    display: "inline-block",
  },
  photoBox: {
    width: "140px",
    height: "140px",
    borderRadius: "24px",
    backgroundColor: "#d0d0d0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  photoImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  editBtn: {
    position: "absolute",
    bottom: "-8px",
    right: "-8px",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
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

export default Perfil;