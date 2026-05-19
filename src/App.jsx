import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import LoginForm from './pages/LoginForm'
import Cadastro from './pages/Cadastro'
import Perfil from './pages/Perfil'
import Home from './pages/Home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/entrar" element={<LoginForm />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  )
}

export default App