const GOOGLE_BOOKS_BASE = "https://www.googleapis.com/books/v1";
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_KEY;
 
function buildUrl(path, params = {}) {
  const url = new URL(`${GOOGLE_BOOKS_BASE}${path}`);
  if (API_KEY) url.searchParams.set("key", API_KEY);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  return url.toString();
}
 
export async function searchBooks(query, maxResults = 10) {
  if (!query || query.trim().length < 2) return [];
  try {
    const res = await fetch(
      buildUrl("/volumes", { q: query, maxResults, langRestrict: "pt", printType: "books" })
    );
    const data = await res.json();
    return (data.items || []).map(normalizeBook);
  } catch {
    return [];
  }
}
 
export async function getBooksByGenre(genre, maxResults = 10) {
  return searchBooks(`subject:${genre}`, maxResults);
}
 
export async function getBooksByAuthor(author, maxResults = 10) {
  return searchBooks(`inauthor:${author}`, maxResults);
}
 
export async function getBookById(id) {
  try {
    const res = await fetch(buildUrl(`/volumes/${id}`));
    const data = await res.json();
    return normalizeBook(data);
  } catch {
    return null;
  }
}
 
export function normalizeBook(item) {
  const info = item.volumeInfo || {};
  return {
    id: item.id,
    title: info.title || "Título desconhecido",
    author: (info.authors || ["Autor desconhecido"]).join(", "),
    description: info.description || "",
    cover:
      info.imageLinks?.thumbnail?.replace("http://", "https://") ||
      info.imageLinks?.smallThumbnail?.replace("http://", "https://") ||
      null,
    genres: info.categories || [],
    publishedDate: info.publishedDate || "",
    pageCount: info.pageCount || null,
    averageRating: info.averageRating || null,
    ratingsCount: info.ratingsCount || 0,
    language: info.language || "pt",
  };
}