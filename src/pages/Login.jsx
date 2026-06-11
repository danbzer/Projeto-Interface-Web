import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import fundoImg from "../assets/images/fundo.jpg";
import { useAuth } from "../context/AuthContext";

const slides = [
  { image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80", text: "Descubra novos livros e expanda seus horizons." },
  { image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&q=80", text: "Acompanhe suas leituras e organize sua estante." },
  { image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&q=80", text: "Compartilhe recomendações com amigos." },
  { image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80", text: "Encontre sua próxima leitura favorita." }
];

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 4000);
    return () => clearInterval(timer);
  }, []);

  // Simulação da chamada da API do Google
  const handleGoogleLogin = () => {
    // Aqui entrará o seu código real (ex: signInWithPopup do Firebase)
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
      <div style={{ ...s.bgImage, backgroundImage: "url(" + fundoImg + ")" }} />
      <div style={s.overlay}>
        <Header />
        
        <main style={s.main}>
          {/* Lado Esquerdo: Carrossel */}
          <div style={s.left}>
            <div style={s.carouselBox}>
              <img src={slides[current].image} alt="slide" style={s.carouselImg} />
            </div>
            <p style={s.carouselText}>{slides[current].text}</p>
            <div style={s.dots}>
              {slides.map((_, i) => (
                <span 
                  key={i} 
                  onClick={() => setCurrent(i)} 
                  style={i === current ? { ...s.dot, ...s.dotActive } : s.dot} 
                />
              ))}
            </div>
          </div>

          {/* Lado Direito: Ações de Entrada */}
          <div style={s.right}>
            <p style={s.subtitle}>Escolha uma das opções abaixo para continuar</p>
            
            <button style={s.btnSolid} onClick={() => navigate("/entrar")}>
              Entrar
            </button>
            
            <button style={s.btnOutline} onClick={() => navigate("/cadastro")}>
              Criar Conta
            </button>
            
            <div style={s.dividerContainer}>
              <div style={s.dividerLine}></div>
              <span style={s.orText}>ou continue com</span>
              <div style={s.dividerLine}></div>
            </div>

            <div style={s.socialRow}>
              <SocialBtn title="Google" onClick={handleGoogleLogin}>
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </SocialBtn>
              <SocialBtn title="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </SocialBtn>
              <SocialBtn title="X">
                <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#1A202C" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </SocialBtn>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}

// O componente agora recebe onClick
function SocialBtn({ title, children, onClick }) {
  return (
    <button title={title} style={s.socialBtn} onClick={onClick}>
      {children}
    </button>
  );
}

const s = {
  page: { minHeight: "100vh", backgroundColor: "#FAFAFA", fontFamily: "system-ui, -apple-system, sans-serif", position: "relative", overflow: "hidden" },
  bgImage: { position: "absolute", inset: 0, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.03, zIndex: 0 },
  overlay: { position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column" },
  main: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", padding: "40px", maxWidth: "1000px", margin: "0 auto", alignItems: "center", width: "100%", flex: 1 },
  left: { display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", background: "#FFFFFF", padding: "32px", borderRadius: "24px", boxShadow: "0 10px 25px rgba(0, 0, 0, 0.03)" },
  right: { display: "flex", flexDirection: "column", alignItems: "stretch", gap: "18px", background: "#FFFFFF", padding: "40px 32px", borderRadius: "24px", boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)" },
  carouselBox: { width: "100%", height: "260px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" },
  carouselImg: { width: "100%", height: "100%", objectFit: "cover" },
  carouselText: { fontSize: "15px", color: "#4A5568", textAlign: "center", lineHeight: "1.6", fontWeight: "500", margin: "4px 0" },
  dots: { display: "flex", gap: "8px" },
  dot: { width: "12px", height: "6px", borderRadius: "3px", backgroundColor: "#E2E8F0", cursor: "pointer", transition: "all 0.3s" },
  dotActive: { backgroundColor: "#E06237", width: "24px" },
  subtitle: { fontSize: "16px", color: "#718096", textAlign: "center", lineHeight: "1.5", marginBottom: "8px", fontWeight: "500" },
  btnSolid: { width: "100%", padding: "14px", borderRadius: "30px", backgroundColor: "#E06237", color: "#fff", border: "none", fontSize: "16px", fontWeight: "600", cursor: "pointer", transition: "0.2s", textAlign: "center" },
  btnOutline: { width: "100%", padding: "12px", borderRadius: "30px", backgroundColor: "transparent", color: "#4A5568", border: "2px solid #E2E8F0", fontSize: "16px", fontWeight: "600", cursor: "pointer", transition: "0.2s", textAlign: "center" },
  dividerContainer: { display: "flex", alignItems: "center", width: "100%", margin: "8px 0" },
  dividerLine: { flex: 1, height: "1px", background: "#E2E8F0" },
  orText: { fontSize: "13px", color: "#A0AEC0", padding: "0 12px", fontWeight: "500" },
  socialRow: { display: "flex", gap: "16px", justifyContent: "center" },
  socialBtn: { width: "50px", height: "50px", borderRadius: "50%", border: "1px solid #E2E8F0", backgroundColor: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "0.2s", boxShadow: "0 2px 5px rgba(0,0,0,0.02)" }
};