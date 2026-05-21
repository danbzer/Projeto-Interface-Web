import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaRegStar } from "react-icons/fa";
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import './bookPage.css';

function BookPage() {
  // Coleta os dados enviados pela home através da rota
  const location = useLocation();
  
  // Se não vier nenhum livro da home, usa dados genéricos de placeholder
  const book = location.state || {
    title: "Título do Livro",
    author: "Autor",
    genre: "Gênero",
    description: "Espaço reservado para a sinopse ou descrição detalhada do livro selecionado."
  };

  const [textoDigitado, setTextoDigitado] = useState('');
  const [textoSalvo, setTextoSalvo] = useState('');

  const handleSalvar = () => {
    console.log("Review salva:", textoDigitado);
    setTextoSalvo(textoDigitado);
  };

  return (
    <div className="book-page-container">
      <Header showBack={true}/>

      <main className='book-main-content'>
        
        {/* COLUNA DA ESQUERDA: CAPA E TAGS */}
        <section className='book-left-col'>
          <div className='cover-wrapper'>
            <button className="book-favorite-button">
              <FaRegStar />
            </button>
            
            {/* Trocado a tag <img> por uma <div> placeholder */}
            <div className="book-page-cover placeholder-cover">
              <span className="cover-text">Capa</span>
            </div>
          </div>
          
          <div className="book-tags">
            <span className="book-tag genre">{book.genre}</span>
            <span className="book-tag author">{book.author}</span>
          </div>
        </section>

        {/* COLUNA DA DIREITA: CAIXAS DE INFORMAÇÃO */}
        <section className="book-right-col">
          
          {/* Caixa de review */}
          <div className="info-card review-card">
            <div className='card-header'>
              <h3>Minha Review</h3>
              <button className='save-review-btn' onClick={handleSalvar}>Salvar</button>
            </div>
            <textarea
              className='input-review-text'
              placeholder='Digite sua review aqui...'
              onChange={(e) => setTextoDigitado(e.target.value)}
              value={textoDigitado}
            ></textarea>
          </div>

          {/* Caixa de nota e status */}
          <div className="info-card status-card">
            <h3>Minha Nota e Status de Leitura</h3>
            <div className="book-rating">
              <span className="book-stars">★★★★<span className="half-star">★</span></span>
              <span className="rating-number">4,5 de 5</span>
            </div>
            <div className="status-select-wrapper">
              <select name="status" id="status" className='book-status-select'>
                <option value="lido">Lido</option>
                <option value="lendo">Lendo</option>
                <option value="queroLer">Quero Ler</option>
                <option value="abandonei">Abandonei</option>
              </select>
            </div>
          </div>

          {/* Caixa de data */}
          <div className="info-card date-card">
            <h3>Data de Término:</h3>
            <div className="date-display">
              <span className="calendar-emoji">&#128197;</span>
              <span className="date-text">15/04/2026</span>
            </div>
          </div>
        </section>
      </main>

      {/* SEÇÃO INFERIOR: DETALHES DA OBRA */}
      <section className="book-description-section">
        <h2 className='book-page-title'>{book.title}</h2>
        <p className='book-description-body'>{book.description}</p>
      </section>

      <Footer />
    </div>
  );
}

export default BookPage;