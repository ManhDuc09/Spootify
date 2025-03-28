
import Home from './pages/Home'
import Login from './pages/Login'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
