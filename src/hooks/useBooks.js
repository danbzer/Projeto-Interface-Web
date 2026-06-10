import { useState, useEffect } from "react";
import { searchBooks, getBooksByGenre, getBooksByAuthor } from "../services/api";

export function useSearch(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    const timer = setTimeout(async () => {
      const data = await searchBooks(query);
      if (!cancelled) {
        setResults(data);
        setLoading(false);
      }
    }, 400);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  return { results, loading };
}

export function useRecommendations(preferences) {
  const [byGenre, setByGenre] = useState([]);
  const [byAuthor, setByAuthor] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!preferences) return;
    const { genres = [], authors = [] } = preferences;

    async function load() {
      setLoading(true);
      const [genre1, genre2] = genres;
      const [author1] = authors;

      const [genreBooks, authorBooks] = await Promise.all([
        genre1 ? getBooksByGenre(genre1, 8) : Promise.resolve([]),
        author1 ? getBooksByAuthor(author1, 8) : Promise.resolve([]),
      ]);

      setByGenre(genreBooks);
      setByAuthor(authorBooks);
      setLoading(false);
    }

    load();
  }, [JSON.stringify(preferences)]);

  return { byGenre, byAuthor, loading };
}
