import { Navigate } from 'react-router-dom'
import { getToken } from '../api/auth'

export function RutaProtegida({ children }) {
  const token = getToken()
  if (!token) return <Navigate to="/login" />
  return children
}