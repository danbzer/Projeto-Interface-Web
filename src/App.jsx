import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import LoginForm from './pages/LoginForm'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/entrar" element={<LoginForm />} />
    </Routes>
  )
}

export default App