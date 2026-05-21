import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import "./Home.css"; // Importando o novo arquivo de estilos

function Home() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const bookPlaceholders = [1, 2, 3, 4, 5];

  // Fecha o menu ao clicar fora dele
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="home-page">
      <Header />

      <main className="home-main">
        {/* BARRA SUPERIOR */}
        <section className="top-area">
          <div className="search-box">
            {/* Sugestão: Troque por um ícone de verdade usando lucide-react ou phosphor-react */}
            <span className="search-icon">⌕</span>
            <input
              className="search-input"
              type="text"
              placeholder="Pesquise títulos, gêneros, autores..."
            />
          </div>

          <div className="user-area" ref={menuRef}>
            <button className="profile-button" title="Meu perfil">👤</button>

            <button
              className="menu-button"
              onClick={() => setMenuOpen(!menuOpen)}
              title="Abrir menu"
            >
              ☰
            </button>

            {menuOpen && (
              <div className="dropdown-menu">
                <button className="dropdown-item">Meu perfil</button>
                <button className="dropdown-item">Minha biblioteca</button>
                <button className="dropdown-item">Minhas preferências</button>
                <button 
                  className="dropdown-item danger" 
                  onClick={() => navigate('/')}
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        </section>

        {/* SAUDAÇÃO */}
        <section className="greeting-section">
          <h1 className="greeting-title">Olá, Xxxxxxxx!</h1>
          <p className="greeting-question">O que vamos ler hoje?</p>
          <p className="greeting-based-on">
            Baseado nas suas leituras recentes de{" "}
            <span className="tag-blue">Ficção</span> e{" "}
            <span className="tag-pink">Tolkien</span>
          </p>
        </section>

        {/* DESTAQUE PRINCIPAL */}
        <section className="feature-section">
          <div className="feature-card" onClick={() => navigate('/livro')}>
            <div className="big-cover">
              <span className="cover-text">Capa</span>
            </div>

            <div className="feature-info">
              <div className="skeleton-title"></div>
              <div className="skeleton-author"></div>
              <div className="skeleton-text-lines">
                <div className="skeleton-line"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line short"></div>
              </div>
            </div>
          </div>

          <div className="carousel-dots">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </section>

        {/* CARROSSEL 1 */}
        <section className="books-section">
          <h2 className="section-title">Porque você gosta de [Autor]</h2>
          <div className="book-row">
            {bookPlaceholders.map((item) => (
              <article
                className="small-card"
                key={`autor-${item}`}
                onClick={() => navigate('/livro')}
              >
                <div className="small-cover">
                  <span className="cover-text">Capa</span>
                </div>
                <div className="small-info">
                  <div className="skeleton-small-title"></div>
                  <div className="skeleton-small-author"></div>
                  <div className="small-stars">★★★★★</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CARROSSEL 2 */}
        <section className="books-section">
          <h2 className="section-title">Baseados na sua vibe</h2>
          <div className="book-row">
            {bookPlaceholders.map((item) => (
              <article
                className="small-card"
                key={`vibe-${item}`}
                onClick={() => navigate('/livro')}
              >
                <div className="small-cover">
                  <span className="cover-text">Capa</span>
                </div>
                <div className="small-info">
                  <div className="skeleton-small-title"></div>
                  <div className="skeleton-small-author"></div>
                  <div className="small-stars">★★★★★</div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;

import "./Home.css";