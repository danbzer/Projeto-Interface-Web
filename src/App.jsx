import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import LoginForm from './pages/LoginForm'
import BookPage from './pages/bookPage/BookPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/entrar" element={<LoginForm />} />
      <Route path="/livro" element={<BookPage />} />
    </Routes>
  )
}

export default App