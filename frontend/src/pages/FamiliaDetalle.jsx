import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { getToken } from "../api/auth"

export default function FamiliaDetalle() {
  const { id } = useParams()
  const [familia, setFamilia] = useState(null)
  const [mostrarFormBebe, setMostrarFormBebe] = useState(false)
  const [formBebe, setFormBebe] = useState({
    nombre: "",
    fecha_nacimiento: "",
    observaciones: "",
  })

  useEffect(() => {
    cargarFamilia()
  }, [id])

  function cargarFamilia() {
    axios
      .get(`http://localhost:8000/api/familias/${id}/`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((res) => setFamilia(res.data))
      .catch((err) => console.error(err))
  }

  function handleChange(e) {
    setFormBebe({ ...formBebe, [e.target.name]: e.target.value })
  }

  function handleGuardarBebe() {
    axios
      .post("http://localhost:8000/api/bebes/", { ...formBebe, familia: id }, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then(() => {
        setFormBebe({ nombre: "", fecha_nacimiento: "", observaciones: "" })
        setMostrarFormBebe(false)
        cargarFamilia()
      })
      .catch((err) => console.error(err))
  }

  if (!familia) return <div style={{ padding: "32px" }}>Cargando...</div>

  return (
    <div style={{ padding: "32px" }}>
      <h1 style={{ marginBottom: "4px" }}>{familia.nombre_contacto}</h1>
      <p style={{ fontSize: "13px", color: "#9b9890", marginBottom: "24px" }}>
        {familia.telefono} · {familia.email}
      </p>

      <div style={{ background: "white", border: "1px solid #e2e0db", borderRadius: "10px", padding: "20px", marginBottom: "24px" }}>
        <p style={{ fontSize: "13px", color: "#666" }}><strong>Dirección:</strong> {familia.direccion || "No registrada"}</p>
        <p style={{ fontSize: "13px", color: "#666", marginTop: "6px" }}>
          <strong>Estado:</strong>{" "}
          <span style={{ color: familia.activa ? "#16a361" : "#9b9890" }}>
            {familia.activa ? "Activa" : "Inactiva"}
          </span>
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h2 style={{ fontSize: "16px" }}>Bebés</h2>
        <button
          onClick={() => setMostrarFormBebe(!mostrarFormBebe)}
          style={{ background: "#1a1916", color: "white", border: "none", padding: "7px 16px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}
        >
          {mostrarFormBebe ? "Cancelar" : "Agregar bebé"}
        </button>
      </div>

      {mostrarFormBebe && (
        <div style={{ background: "white", border: "1px solid #e2e0db", borderRadius: "10px", padding: "20px", marginBottom: "16px" }}>
          {[
            { name: "nombre", label: "Nombre" },
            { name: "fecha_nacimiento", label: "Fecha de nacimiento", type: "date" },
            { name: "observaciones", label: "Observaciones" },
          ].map((field) => (
            <div key={field.name} style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "12px", color: "#666", marginBottom: "4px" }}>{field.label}</label>
              <input
                name={field.name}
                type={field.type || "text"}
                value={formBebe[field.name]}
                onChange={handleChange}
                style={{ width: "100%", padding: "8px 12px", border: "1px solid #e2e0db", borderRadius: "6px", fontSize: "13px" }}
              />
            </div>
          ))}
          <button
            onClick={handleGuardarBebe}
            style={{ background: "#16a361", color: "white", border: "none", padding: "9px 18px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}
          >
            Guardar
          </button>
        </div>
      )}

      <div style={{ background: "white", border: "1px solid #e2e0db", borderRadius: "10px", overflow: "hidden" }}>
        {familia.bebes && familia.bebes.length === 0 ? (
          <p style={{ padding: "24px", color: "#9b9890", fontSize: "13px" }}>No hay bebés registrados todavía.</p>
        ) : (
          familia.bebes && familia.bebes.map((b) => (
            <div key={b.id} style={{ padding: "14px 20px", borderBottom: "1px solid #f3f2ef" }}>
              <div style={{ fontSize: "14px", fontWeight: "600" }}>{b.nombre}</div>
              <div style={{ fontSize: "12px", color: "#9b9890", marginTop: "2px" }}>
                {b.fecha_nacimiento ? `Nacimiento: ${b.fecha_nacimiento}` : "Sin fecha de nacimiento"}
              </div>
              {b.observaciones && <div style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>{b.observaciones}</div>}
            </div>
          ))
        )}
      </div>
    </div>
  )
}