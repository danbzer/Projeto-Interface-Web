import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../services/firebase";
import { collection, doc, getDocs, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";

const ShelfContext = createContext(null);

export function ShelfProvider({ children }) {
  const { user } = useAuth();
  const [shelf, setShelf] = useState([]);

  // Carrega a prateleira do Firestore quando o usuário loga
  useEffect(() => {
    if (!user?.uid) { setShelf([]); return; }
    const load = async () => {
      const snap = await getDocs(collection(db, "users", user.uid, "shelf"));
      setShelf(snap.docs.map((d) => d.data()));
    };
    load();
  }, [user?.uid]);

  const addToShelf = async (book, status = "queroLer") => {
    const ref = doc(db, "users", user.uid, "shelf", book.id);
    const exists = shelf.find((i) => i.book.id === book.id);
    if (exists) {
      await updateDoc(ref, { status });
      setShelf((prev) => prev.map((i) => i.book.id === book.id ? { ...i, status } : i));
    } else {
      // Adicionado 'favorite: false' como padrão para novos livros
      const item = { book, status, review: "", rating: 0, finishedAt: null, favorite: false };
      await setDoc(ref, item);
      setShelf((prev) => [...prev, item]);
    }
  };

  const updateShelfItem = async (bookId, updates) => {
    await updateDoc(doc(db, "users", user.uid, "shelf", bookId), updates);
    setShelf((prev) => prev.map((i) => i.book.id === bookId ? { ...i, ...updates } : i));
  };

  const removeFromShelf = async (bookId) => {
    await deleteDoc(doc(db, "users", user.uid, "shelf", bookId));
    setShelf((prev) => prev.filter((i) => i.book.id !== bookId));
  };

  const getShelfItem = (bookId) => shelf.find((i) => i.book.id === bookId);
  const getByStatus = (status) => status === "todos" ? shelf : shelf.filter((i) => i.status === status);

  const counts = {
    lido: shelf.filter((i) => i.status === "lido").length,
    lendo: shelf.filter((i) => i.status === "lendo").length,
    queroLer: shelf.filter((i) => i.status === "queroLer").length,
    abandonei: shelf.filter((i) => i.status === "abandonei").length,
    favoritos: shelf.filter((i) => i.favorite).length, // Contador de favoritos adicionado
    total: shelf.length,
  };

  return (
    <ShelfContext.Provider value={{ shelf, addToShelf, updateShelfItem, removeFromShelf, getShelfItem, getByStatus, counts }}>
      {children}
    </ShelfContext.Provider>
  );
}

export function useShelf() { return useContext(ShelfContext); }