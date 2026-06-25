import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import fundoImg from "../assets/images/fundo.jpg";

const slides = [
  { image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80", text: "Descubra novos livros e expanda seus horizontes." },
  { image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&q=80", text: "Acompanhe suas leituras e organize sua estante." },
  { image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&q=80", text: "Compartilhe recomendações com amigos." },
  { image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80", text: "Encontre sua próxima leitura favorita." }
];

export default function Login() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 4000);
    return () => clearInterval(timer);
  }, []);

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
          </div>
        </main>

      </div>
    </div>
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
  btnOutline: { width: "100%", padding: "12px", borderRadius: "30px", backgroundColor: "transparent", color: "#4A5568", border: "2px solid #E2E8F0", fontSize: "16px", fontWeight: "600", cursor: "pointer", transition: "0.2s", textAlign: "center" }
};