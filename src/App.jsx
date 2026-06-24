import { Routes, Route, Navigate, Outlet } from "react-router-dom";
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
import Configuracoes from './pages/Configuracoes';
import Ajuda from "./pages/Ajuda";
import Footer from "./components/layout/Footer";
import EditarPreferencias from "./pages/EditarPreferencias";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
}

//Estrutura que envolve as páginas internas e coloca o Footer
function LayoutComFooter() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1 }}>
        <Outlet /> {/* Nessa parte, o React renderiza a página atual (Home, Biblioteca, etc.) */}
      </div>
      <Footer />
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Telas externas sem rodapé */}
      <Route path="/" element={<Login />} />
      <Route path="/entrar" element={<LoginForm />} />
      <Route path="/cadastro" element={<Cadastro />} />
      
      {/* CORRIGIDO: Liberado temporariamente o acesso direto sem PrivateRoute para você conseguir testar e criar as preferências */}
      <Route path="/personalizar" element={<Personalizar />} />
      
      {/* Telas internas com Footer automaticamente através do LayoutComFooter) */}
      <Route element={<LayoutComFooter />}>
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/livro" element={<PrivateRoute><BookPage /></PrivateRoute>} />
        <Route path="/biblioteca" element={<PrivateRoute><MinhaBiblioteca /></PrivateRoute>} />
        <Route path="/perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
        <Route path="/configuracoes" element={<Configuracoes />} />
        <Route path="/ajuda" element={<Ajuda />} />
        <Route path="/editar-preferencias" element={<EditarPreferencias />} />
      </Route>

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