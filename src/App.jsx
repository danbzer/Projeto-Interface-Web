import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import LoginForm from './pages/LoginForm'
import BookPage from './pages/bookPage/BookPage'
import Cadastro from './pages/Cadastro'
import Perfil from './pages/Perfil'
import Home from './pages/Home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/entrar" element={<LoginForm />} />
      <Route path="/livro" element={<BookPage />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/home" element={<Home />} />
      <Route path="/book" element={<BookPage />} />
    </Routes>
  )
}

export default App