import { useEffect, useState } from "react"
import axios from "axios"
import { getToken } from "../api/auth"

export default function Contratos() {
  const [contratos, setContratos] = useState([])
  const [familias, setFamilias] = useState([])
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [filtro, setFiltro] = useState("todos")
  const [form, setForm] = useState({
    familia: "",
    fecha_inicio: "",
    horas_semana: "",
    precio_hora: "",
    observaciones: "",
  })

  useEffect(() => {
    cargarContratos()
    cargarFamilias()
  }, [])

  function cargarContratos() {
    axios
      .get("http://localhost:8000/api/contratos/", {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((res) => setContratos(res.data))
      .catch((err) => console.error(err))
  }

  function cargarFamilias() {
    axios
      .get("http://localhost:8000/api/familias/", {
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
      .post("http://localhost:8000/api/contratos/", form, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then(() => {
        setForm({ familia: "", fecha_inicio: "", horas_semana: "", precio_hora: "", observaciones: "" })
        setMostrarFormulario(false)
        cargarContratos()
      })
      .catch((err) => console.error(err))
  }

  function colorEstado(estado) {
    if (estado === "activo") return { background: "#edfaf4", color: "#16a361" }
    if (estado === "finalizado") return { background: "#f3f2ef", color: "#9b9890" }
    return { background: "#fff8e6", color: "#b45309" }
  }

  const contratosFiltrados = filtro === "todos"
    ? contratos
    : contratos.filter((c) => c.estado === filtro)

  function calcularMensual(horas, precio) {
    if (!horas || !precio) return "—"
    return (parseFloat(horas) * parseFloat(precio) * 4.33).toFixed(2) + " €"
  }

  return (
    <div style={{ padding: "32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1>Contratos</h1>
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          style={{ background: "#1a1916", color: "white", border: "none", padding: "9px 18px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}
        >
          {mostrarFormulario ? "Cancelar" : "Nuevo contrato"}
        </button>
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        {["todos", "borrador", "activo", "finalizado"].map((f) => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            style={{
              padding: "5px 14px", borderRadius: "20px", border: "1px solid #e2e0db",
              fontSize: "12px", cursor: "pointer", fontFamily: "inherit",
              background: filtro === f ? "#1a1916" : "white",
              color: filtro === f ? "white" : "#5c5a54"
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {mostrarFormulario && (
        <div style={{ background: "white", border: "1px solid #e2e0db", borderRadius: "10px", padding: "20px", marginBottom: "24px" }}>
          <h3 style={{ marginBottom: "16px", fontSize: "14px" }}>Nuevo contrato</h3>

          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", fontSize: "12px", color: "#666", marginBottom: "4px" }}>Familia</label>
            <select
              name="familia"
              value={form.familia}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px 12px", border: "1px solid #e2e0db", borderRadius: "6px", fontSize: "13px" }}
            >
              <option value="">Seleccionar familia</option>
              {familias.map((f) => (
                <option key={f.id} value={f.id}>{f.nombre_contacto}</option>
              ))}
            </select>
          </div>

          {[
            { name: "fecha_inicio", label: "Fecha de inicio", type: "date" },
            { name: "horas_semana", label: "Horas por semana", type: "number" },
            { name: "precio_hora", label: "Precio por hora (€)", type: "number" },
            { name: "observaciones", label: "Observaciones" },
          ].map((field) => (
            <div key={field.name} style={{ marginBottom: "12px" }}>
              <label style={{ display: "block", fontSize: "12px", color: "#666", marginBottom: "4px" }}>{field.label}</label>
              <input
                name={field.name}
                type={field.type || "text"}
                value={form[field.name]}
                onChange={handleChange}
                style={{ width: "100%", padding: "8px 12px", border: "1px solid #e2e0db", borderRadius: "6px", fontSize: "13px" }}
              />
            </div>
          ))}

          {form.horas_semana && form.precio_hora && (
            <p style={{ fontSize: "12px", color: "#16a361", marginBottom: "12px" }}>
              Importe mensual estimado: <strong>{calcularMensual(form.horas_semana, form.precio_hora)}</strong>
            </p>
          )}

          <button
            onClick={handleGuardar}
            style={{ background: "#16a361", color: "white", border: "none", padding: "9px 18px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}
          >
            Guardar
          </button>
        </div>
      )}

      <div style={{ background: "white", border: "1px solid #e2e0db", borderRadius: "10px", overflow: "hidden" }}>
        {contratosFiltrados.length === 0 ? (
          <p style={{ padding: "24px", color: "#9b9890", fontSize: "13px" }}>No hay contratos registrados todavía.</p>
        ) : (
          contratosFiltrados.map((c) => (
            <div key={c.id} style={{ display: "flex", alignItems: "center", padding: "14px 20px", borderBottom: "1px solid #f3f2ef" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "14px", fontWeight: "600" }}>
                  {familias.find((f) => f.id === c.familia)?.nombre_contacto || "Familia"}
                </div>
                <div style={{ fontSize: "12px", color: "#9b9890", marginTop: "2px" }}>
                  Desde {c.fecha_inicio} · {c.horas_semana}h/sem · {c.precio_hora}€/h · <strong>{calcularMensual(c.horas_semana, c.precio_hora)}/mes</strong>
                </div>
              </div>
              <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "20px", ...colorEstado(c.estado) }}>
                {c.estado.charAt(0).toUpperCase() + c.estado.slice(1)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}