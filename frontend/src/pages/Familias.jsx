import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { getToken } from "../api/auth"

const API = import.meta.env.VITE_API_URL

export default function Familias() {
  const [familias, setFamilias] = useState([])
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [form, setForm] = useState({
    nombre_contacto: "",
    telefono: "",
    email: "",
    direccion: "",
  })
  const navigate = useNavigate()

  useEffect(() => {
    cargarFamilias()
  }, [])

  function cargarFamilias() {
    axios
      .get(`${API}/familias/`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((res) => setFamilias(res.data))
      .catch((err) => console.error(err))
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleGuardar() {
    axios
      .post(`${API}/familias/`, form, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then(() => {
        setForm({ nombre_contacto: "", telefono: "", email: "", direccion: "" })
        setMostrarFormulario(false)
        cargarFamilias()
      })
      .catch((err) => console.error(err))
  }

  return (
    <div style={{ padding: "32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1>Familias</h1>
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          style={{ background: "#1a1916", color: "white", border: "none", padding: "9px 18px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}
        >
          {mostrarFormulario ? "Cancelar" : "Nueva familia"}
        </button>
      </div>

      {mostrarFormulario && (
        <div style={{ background: "white", border: "1px solid #e2e0db", borderRadius: "10px", padding: "20px", marginBottom: "24px" }}>
          <h3 style={{ marginBottom: "16px", fontSize: "14px" }}>Nueva familia</h3>
          {[
            { name: "nombre_contacto", label: "Nombre de contacto" },
            { name: "telefono", label: "Teléfono" },
            { name: "email", label: "Email" },
            { name: "direccion", label: "Dirección" },
          ].map((field) => (
            <div key={field.name} style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "12px", color: "#666", marginBottom: "4px" }}>{field.label}</label>
              <input
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                style={{ width: "100%", padding: "8px 12px", border: "1px solid #e2e0db", borderRadius: "6px", fontSize: "13px" }}
              />
            </div>
          ))}
          <button
            onClick={handleGuardar}
            style={{ background: "#16a361", color: "white", border: "none", padding: "9px 18px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}
          >
            Guardar
          </button>
        </div>
      )}

 <div style={{ background: "white", border: "1px solid #e2e0db", borderRadius: "10px", overflow: "hidden" }}>
        {familias.length === 0 ? (
          <p style={{ padding: "24px", color: "#9b9890", fontSize: "13px" }}>No hay familias registradas todavía.</p>
        ) : (
          familias.map((f) => (
            <div key={f.id}
              onClick={() => navigate(`/familias/${f.id}`)}
              style={{ display: "flex", alignItems: "center", padding: "14px 20px", borderBottom: "1px solid #f3f2ef", cursor: "pointer" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "14px", fontWeight: "600" }}>{f.nombre_contacto}</div>
                <div style={{ fontSize: "12px", color: "#9b9890", marginTop: "2px" }}>{f.telefono} · {f.email}</div>
              </div>
              <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "20px", background: f.activa ? "#edfaf4" : "#f3f2ef", color: f.activa ? "#16a361" : "#9b9890" }}>
                {f.activa ? "Activa" : "Inactiva"}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}