import { useEffect, useState } from "react"
import axios from "axios"

function getEmailFromToken() {
  const token = localStorage.getItem("token")
  if (!token) return ""
  const payload = JSON.parse(atob(token.split(".")[1]))
  return payload.email || ""
}

function getIndicadorDia() {
  const dia = new Date().getDay()
  if (dia === 5) return "Hoy es viernes — revisar cobros pendientes"
  if (dia === 1) return "Hoy es lunes — revisar pagos pendientes"
  return null
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    familias_activas: 0,
    cobros_pendientes: 0,
    pagos_pendientes: 0,
  })
  const email = getEmailFromToken()
  const indicador = getIndicadorDia()

  useEffect(() => {
    const token = localStorage.getItem("token")
    axios
      .get("http://localhost:8000/api/dashboard/stats/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div style={{ padding: "32px" }}>
      <h1>Bienvenida, {email}</h1>

      {indicador && (
        <div style={{ background: "#fff8e6", border: "1px solid #fde68a", borderRadius: "8px", padding: "10px 16px", marginTop: "16px", fontSize: "13px", color: "#b45309" }}>
          {indicador}
        </div>
      )}

      <div style={{ display: "flex", gap: "16px", marginTop: "24px" }}>
        <div style={{ background: "#f3f2ef", padding: "24px", borderRadius: "10px", minWidth: "160px" }}>
          <div style={{ fontSize: "28px", fontWeight: "600" }}>{stats.familias_activas}</div>
          <div style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}>Familias activas</div>
        </div>
        <div style={{ background: "#f3f2ef", padding: "24px", borderRadius: "10px", minWidth: "160px" }}>
          <div style={{ fontSize: "28px", fontWeight: "600" }}>{stats.cobros_pendientes}</div>
          <div style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}>Cobros pendientes</div>
        </div>
        <div style={{ background: "#f3f2ef", padding: "24px", borderRadius: "10px", minWidth: "160px" }}>
          <div style={{ fontSize: "28px", fontWeight: "600" }}>{stats.pagos_pendientes}</div>
          <div style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}>Pagos pendientes</div>
        </div>
      </div>
    </div>
  )
}