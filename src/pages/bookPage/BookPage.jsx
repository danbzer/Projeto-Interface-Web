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

  // controla o que o usuário escreve agora
  const [textoDigitado, setTextoDigitado] = useState('');
  // guarda o que foi confirmado no botão
  const [textoSalvo, setTextoSalvo] = useState('');
  
  // Estado para controlar o status de leitura atual (Inicia como 'lido')
  const [statusLeitura, setStatusLeitura] = useState('lido');

  const handleSalvar = () => {
    // segurança extra da regra de negócio RN02
    if (statusLeitura !== 'lido') return;
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
            
            {/* Trocado a tag <img> por uma <div> placeholder para a capa */}
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
          <div className="info-card review-card" style={{ opacity: statusLeitura === 'lido' ? 1 : 0.6, transition: 'opacity 0.2s' }}>
            <div className='card-header'>
              <h3>Minha Review</h3>
              <button 
                className='save-review-btn' 
                onClick={handleSalvar}
                disabled={statusLeitura !== 'lido'}
                style={{ 
                  cursor: statusLeitura === 'lido' ? 'pointer' : 'not-allowed',
                  backgroundColor: statusLeitura === 'lido' ? '#301C54' : '#999' 
                }}
              >
                Salvar
              </button>
            </div>
            <textarea
              className='input-review-text'
              placeholder={statusLeitura === 'lido' ? 'Digite sua review aqui...' : ''}
              onChange={(e) => setTextoDigitado(e.target.value)}
              value={statusLeitura === 'lido' ? textoDigitado : ''}
              disabled={statusLeitura !== 'lido'}
              style={{ cursor: statusLeitura === 'lido' ? 'text' : 'not-allowed' }}
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
              <select 
                name="status" 
                id="status" 
                className='book-status-select'
                value={statusLeitura}
                onChange={(e) => setStatusLeitura(e.target.value)}
              >
                <option value="lido">Lido</option>
                <option value="lendo">Lendo</option>
                <option value="queroLer">Quero Ler</option>
                <option value="abandonei">Abandonei</option>
              </select>
            </div>
          </div>

          {/* Caixa de data: só mostra a data de término se o livro foi concluído */}
          {statusLeitura === 'lido' && (
            <div className="info-card date-card" style={{ animation: 'fadeIn 0.3s' }}>
              <h3>Data de Término:</h3>
              <div className="date-display">
                <span className="calendar-emoji">&#128197;</span>
                <span className="date-text">15/04/2026</span>
              </div>
            </div>
          )}
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