import { useEffect, useState } from "react"
import axios from "axios"

export default function Dashboard() {
  const [stats, setStats] = useState({
    familias_activas: 0,
    cobros_pendientes: 0,
    pagos_pendientes: 0,
  })

  useEffect(() => {
    const token = localStorage.getItem("access")
    axios
      .get("http://localhost:8000/api/dashboard/stats/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <div style={{ padding: "32px" }}>
      <h1>Dashboard</h1>
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