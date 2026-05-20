import React from 'react';
import './bookPage.css';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { FaRegStar } from "react-icons/fa";
import { useState } from 'react';

function BookPage() {
    // controla o que o usuário escreve agora
  const [textoDigitado, setTextoDigitado] = useState('');
    // guarda o que foi confirmado no botão
  const [textoSalvo, setTextoSalvo] = useState('');

  const handleSalvar = () => {
    console.log("Review salva:", textoDigitado);
    setTextoSalvo(textoDigitado);
  };

  return (
    <div className="container">
      <Header showBack={true}/>

      <div className='main-content'>
        <div className='book-container'>
          <button className="favorite-button"><FaRegStar /></button>
          <div>
            <img src="../src/assets/O_HOMEM_DE_GIZ.webp" alt="Capa do livro O Homem de Giz" className="book-cover" />
          </div>
          <div className="tags">
            <span className="tag suspense">Suspense</span>
            <span className="tag author">C.J. Tudor</span>
          </div>
        </div>

        <div className="details-right-col">
          <div className="info-box review-box">
            <div className='review-box-header'>
              <h3>Minha Review</h3>
              <button className='save-review' onClick={handleSalvar}>Salvar</button>
            </div>
            <textarea
              name="review"
              id=""
              className='input-review'
              placeholder='Digite sua review aqui...'
              onChange={(e) => setTextoDigitado(e.target.value)}
              value={textoDigitado}
            ></textarea>
          </div>
          <div className="info-box status-box">
            <h3>Minha Nota e Status de Leitura</h3>
            <div className="rating">
              <span className="stars">★★★★<span className="half-star">★</span></span>
              <span className="rating-text">4,5 de 5</span>
            </div>
            <div className="select-wrapper">
              <select name="status" id="status" className='status-select'>
                <option className='select-item' value="lido">Lido</option>
                <option className='select-item' value="lendo">Lendo</option>
                <option className='select-item' value="queroLer">Quero Ler</option>
                <option className='select-item' value="abandonei">Abandonei</option>
              </select>
            </div>
          </div>
          <div className="info-box date-box">
            <h3>Data de Término:</h3>
            <div className="date-content">
              <span className="calendar-icon">&#128197;</span>
              <span className="date">15/04/2026</span>
            </div>
          </div>
        </div>
      </div>

      <section className="book-description">
        <h3 className='book-title'>O homem de giz</h3>
        <p className='book-description-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </section>

      <Footer />
    </div>
  );
}

export default BookPage;