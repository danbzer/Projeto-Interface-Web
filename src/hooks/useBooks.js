import { useState, useEffect } from "react";

// puxo do arquivo .env
const API_KEY = import.meta.env.VITE_API_URL; 
const BASE_URL = "https://www.googleapis.com/books/v1/volumes";


function formatBook(item) {
  return {
    id: item.id,
    title: item.volumeInfo.title,
    author: item.volumeInfo.authors?.[0] || "Autor Desconhecido",
    // O replace garante que a imagem carregue em https (evita erros no navegador)
    cover: item.volumeInfo.imageLinks?.thumbnail?.replace("http:", "https:") || "https://via.placeholder.com/150x200?text=Sem+Capa",
    averageRating: item.volumeInfo.averageRating || null,
    description: item.volumeInfo.description || "Nenhuma descrição disponível.",
  };
}

export function useSearch(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}?q=${query}&maxResults=12&key=${API_KEY}`);
        const data = await res.json();
        setResults(data.items?.map(formatBook) || []);
      } catch (error) {
        console.error("Erro na busca:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchBooks, 500);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return { results, loading };
}

export function useRecommendations(prefs) {
  const [byAuthor, setByAuthor] = useState([]);
  const [byGenre, setByGenre] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecs = async () => {
      setLoading(true);
      try {
        const author = prefs?.authors?.[0] || "Stephen King";
        const genre = prefs?.genres?.[0] || "Terror";

        const [resAuthor, resGenre] = await Promise.all([
          fetch(`${BASE_URL}?q=inauthor:"${author}"&maxResults=10&key=${API_KEY}`),
          fetch(`${BASE_URL}?q=subject:"${genre}"&maxResults=10&key=${API_KEY}`)
        ]);

        const dataAuthor = await resAuthor.json();
        const dataGenre = await resGenre.json();

        setByAuthor(dataAuthor.items?.map(formatBook) || []);
        setByGenre(dataGenre.items?.map(formatBook) || []);
      } catch (error) {
        console.error("Erro ao buscar recomendações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecs();
  }, [prefs]);

  return { byAuthor, byGenre, loading };
}