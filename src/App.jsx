import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ShelfProvider } from "./context/ShelfContext";
import Login from "./pages/Login";
import LoginForm from "./pages/LoginForm";
import Cadastro from "./pages/Cadastro";
import Personalizar from "./pages/Personalizar";
import Home from "./pages/Home";
import BookPage from "./pages/bookPage/BookPage";
import MinhaBiblioteca from "./pages/MinhaBiblioteca";
import Perfil from "./pages/Perfil";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/entrar" element={<LoginForm />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/personalizar" element={<PrivateRoute><Personalizar /></PrivateRoute>} />
      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/livro" element={<PrivateRoute><BookPage /></PrivateRoute>} />
      <Route path="/biblioteca" element={<PrivateRoute><MinhaBiblioteca /></PrivateRoute>} />
      <Route path="/perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ShelfProvider>
        <AppRoutes />
      </ShelfProvider>
    </AuthProvider>
  );
}
