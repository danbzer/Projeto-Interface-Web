import { createContext, useContext, useState, useEffect } from "react";

const ShelfContext = createContext(null);

// status: 'queroLer' | 'lendo' | 'lido' | 'abandonei'
export function ShelfProvider({ children }) {
  const [shelf, setShelf] = useState(() => {
  const savedShelf = localStorage.getItem("shelf");

  try {
    return savedShelf ? JSON.parse(savedShelf) : [];
  } catch {
    return [];
  }
});
  // item shape: { book: {...googleBooksData}, status, review, rating, finishedAt }

  useEffect(() => {
  localStorage.setItem("shelf", JSON.stringify(shelf));
}, [shelf]);

  const addToShelf = (book, status = "queroLer") => {
    setShelf((prev) => {
      const exists = prev.find((i) => i.book.id === book.id);
      if (exists) return prev.map((i) => i.book.id === book.id ? { ...i, status } : i);
      return [...prev, { book, status, review: "", rating: 0, finishedAt: null }];
    });
  };

  const updateShelfItem = (bookId, updates) => {
    setShelf((prev) =>
      prev.map((i) => i.book.id === bookId ? { ...i, ...updates } : i)
    );
  };

  const removeFromShelf = (bookId) => {
    setShelf((prev) => prev.filter((i) => i.book.id !== bookId));
  };

  const getShelfItem = (bookId) => shelf.find((i) => i.book.id === bookId);

  const getByStatus = (status) => {
    if (status === "todos") return shelf;
    return shelf.filter((i) => i.status === status);
  };

  const counts = {
    lido: shelf.filter((i) => i.status === "lido").length,
    lendo: shelf.filter((i) => i.status === "lendo").length,
    queroLer: shelf.filter((i) => i.status === "queroLer").length,
    abandonei: shelf.filter((i) => i.status === "abandonei").length,
    total: shelf.length,
  };

  return (
    <ShelfContext.Provider value={{ shelf, addToShelf, updateShelfItem, removeFromShelf, getShelfItem, getByStatus, counts }}>
      {children}
    </ShelfContext.Provider>
  );
}

export function useShelf() {
  return useContext(ShelfContext);
}
