import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";

function Login() {
  const navigate = useNavigate();

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80",
      text: "Descubra novos livros e expanda seus horizontes.",
    },
    {
      image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&q=80",
      text: "Acompanhe suas leituras e organize sua estante.",
    },
    {
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&q=80",
      text: "Compartilhe recomendações com amigos.",
    },
    {
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80",
      text: "Encontre sua próxima leitura favorita.",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.page}>
      <Header />
      <main style={styles.main}>

        {/* LADO ESQUERDO - Carrossel */}
        <div style={styles.left}>
          <div style={styles.carouselPlaceholder}>
            <img src={slides[current].image} alt="slide" style={styles.carouselImg} />
          </div>
          <p style={styles.carouselText}>{slides[current].text}</p>
          <div style={styles.dots}>
            {slides.map((_, i) => (
              <span
                key={i}
                onClick={() => setCurrent(i)}
                style={i === current ? { ...styles.dot, ...styles.dotActive } : styles.dot}
              />
            ))}
          </div>
        </div>

        {/* LADO DIREITO - Botões */}
        <div style={styles.right}>
          <p style={styles.subtitle}>
            Escolha uma das opções abaixo<br />para continuar
          </p>
          <button style={styles.btnSolid} onClick={() => navigate('/entrar')}>Entrar</button>
          <button style={styles.btnOutline}>Cadastrar</button>
          <p style={styles.orText}>Ou continue com</p>
          <div style={styles.socialButtons}>
            <button style={styles.socialBtn} title="Google">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>
            <button style={styles.socialBtn} title="Facebook">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            <button style={styles.socialBtn} title="X">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="#000" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </button>
          </div>
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
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "80px",
    padding: "60px 40px",
    maxWidth: "900px",
    margin: "0 auto",
    alignItems: "center",
  },
  left: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    height: "420px",
    justifyContent: "center",
  },
  right: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    minWidth: "280px",
    height: "420px",
    justifyContent: "center",
  },
  carouselPlaceholder: {
    width: "300px",
    height: "280px",
    backgroundColor: "#d0d0d0",
    borderRadius: "16px",
    overflow: "hidden",
  },
  carouselImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  carouselText: {
    fontSize: "13px",
    color: "#F5F0FF",
    textAlign: "center",
    lineHeight: "1.6",
    height: "48px",
    overflow: "hidden",
  },
  dots: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
  dot: {
    width: "32px",
    height: "4px",
    borderRadius: "2px",
    backgroundColor: "#ccc",
    cursor: "pointer",
  },
  dotActive: {
    backgroundColor: "#301C54",
    width: "48px",
  },
  subtitle: {
    fontSize: "15px",
    color: "#F5F0FF",
    textAlign: "center",
    lineHeight: "1.6",
    marginBottom: "8px",
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
  },
  btnOutline: {
    width: "100%",
    padding: "16px",
    borderRadius: "30px",
    backgroundColor: "#301C54",
    color: "#fff",
    border: "none",
    fontFamily: "'PT Mono', monospace",
    fontSize: "18px",
    cursor: "pointer",
  },
  orText: {
    fontSize: "13px",
    color: "#F5F0FF",
    margin: "4px 0",
  },
  socialButtons: {
    display: "flex",
    gap: "16px",
  },
  socialBtn: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    border: "1px solid #e0e0e0",
    backgroundColor: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default Login;