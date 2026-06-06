import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import { RutaProtegida } from './components/RutaProtegida'
import { logout } from './api/auth'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <RutaProtegida>
            <div className="p-8">
              <p className="mb-4">Dashboard (próximamente)</p>
              <button
                onClick={() => { logout(); window.location.href = '/login' }}
                className="bg-black text-white px-4 py-2 rounded-lg text-sm"
              >
                Cerrar sesión
              </button>
            </div>
          </RutaProtegida>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App