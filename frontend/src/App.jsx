import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Layout from './components/Layout'
import { RutaProtegida } from './components/RutaProtegida'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <RutaProtegida>
            <Layout>
              <Dashboard />
            </Layout>
          </RutaProtegida>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App