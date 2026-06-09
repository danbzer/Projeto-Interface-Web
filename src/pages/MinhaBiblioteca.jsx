import { useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import "./MinhaBiblioteca.css";

function MinhaBiblioteca() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");

  const categorias = [
    { nome: "Todos", quantidade: 0 },
    { nome: "Lendo", quantidade: 0 },
    { nome: "Lidos", quantidade: 0 },
    { nome: "Quero Ler", quantidade: 0 },
    { nome: "Favoritos", quantidade: 0 },
    { nome: "Abandonei", quantidade: 0 },
  ];

  return (
    <div className="biblioteca-page">
      <Header />

      <main className="biblioteca-main">
        <section className="biblioteca-topo">
          <div>
            <h1>Minha Biblioteca</h1>
            <p>O que vamos ler hoje?</p>
          </div>

          <button className="btn-adicionar">
            + Adicionar
          </button>
        </section>

        <section className="status-cards">
          <div className="status-card">
            <span>(0)</span>
            <p>Lidos</p>
          </div>

          <div className="status-card">
            <span>(0)</span>
            <p>Lendo</p>
          </div>

          <div className="status-card">
            <span>(0)</span>
            <p>Quero Ler</p>
          </div>
        </section>

        <section className="filtros">
          <select
            value={categoriaSelecionada}
            onChange={(e) => setCategoriaSelecionada(e.target.value)}
          >
            {categorias.map((categoria) => (
              <option
                key={categoria.nome}
                value={categoria.nome}
              >
                {categoria.nome} ({categoria.quantidade})
              </option>
            ))}
          </select>
        </section>

        <section className="estado-vazio">
          <div className="livro-icone">
            📖
          </div>

          <p>
            Nenhum livro nesta categoria ainda.
          </p>

          <button className="btn-encontrar">
            Encontrar livros
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default MinhaBiblioteca;