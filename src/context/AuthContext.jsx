import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updatePassword
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // aguarda o Firebase verificar a sessão

  // Firebase avisa automaticamente se o usuário já estava logado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // busca os dados extras (preferências, prateleira) do Firestore
        const snap = await getDoc(doc(db, "users", firebaseUser.uid));
        setUser({ uid: firebaseUser.uid, email: firebaseUser.email, ...snap.data() });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Cadastro com email/senha
  const register = async (name, email, password) => {
    const { user: fbUser } = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", fbUser.uid), { name, email, preferences: null });
    setUser({ uid: fbUser.uid, name, email, preferences: null });
  };

  // Login com email/senha
  const login = async (email, password) => {
    const { user: fbUser } = await signInWithEmailAndPassword(auth, email, password);
    const snap = await getDoc(doc(db, "users", fbUser.uid));
    setUser({ uid: fbUser.uid, email: fbUser.email, ...snap.data() });
  };

  // Login com Google
  const loginWithGoogle = async () => {
    const { user: fbUser } = await signInWithPopup(auth, googleProvider);
    const ref = doc(db, "users", fbUser.uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      // primeiro acesso com Google: cria o documento
      await setDoc(ref, { name: fbUser.displayName, email: fbUser.email, preferences: null });
    }
    const data = (await getDoc(ref)).data();
    setUser({ uid: fbUser.uid, email: fbUser.email, ...data });
  };

  // Logout
  const logout = () => signOut(auth);

  // Salva preferências (gêneros, autores, livros)
  const updatePreferences = async (preferences) => {
    await updateDoc(doc(db, "users", user.uid), { preferences });
    setUser((prev) => ({ ...prev, preferences }));
  };

  // Atualiza perfil (nome, foto, etc.)
  const updateProfile = async (profileData) => {
    await updateDoc(doc(db, "users", user.uid), profileData);
    setUser((prev) => ({ ...prev, ...profileData }));
  };

  const updateUserPassword = async (newPassword) => {
    if (auth.currentUser) {
      await updatePassword(auth.currentUser, newPassword);
    } else {
      throw new Error("Nenhum usuário logado no Firebase.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, loginWithGoogle, logout, updatePreferences, updateProfile, updateUserPassword }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}