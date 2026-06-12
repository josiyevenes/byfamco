import axios from 'axios'

const API = import.meta.env.VITE_API_URL

export async function login(email, password) {
  const res = await axios.post(`${API}/auth/login/`, { email, password })
  localStorage.setItem('token', res.data.access)
  return res.data
}

export function getToken() {
  return localStorage.getItem('token')
}

export function logout() {
  localStorage.removeItem('token')
}