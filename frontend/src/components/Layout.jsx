import { Link, useLocation } from "react-router-dom"
import { logout } from "../api/auth"

const secciones = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/familias", label: "Familias" },
  { path: "/contratos", label: "Contratos" },
  { path: "/freelancers", label: "Freelancers" },
  { path: "/calendario", label: "Calendario" },
  { path: "/facturas", label: "Facturación" },
  { path: "/pagos", label: "Pagos" },
  { path: "/gastos", label: "Gastos" },
  { path: "/tareas", label: "Tareas" },
]

export default function Layout({ children }) {
  const location = useLocation()

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: "220px", background: "#1a1916", color: "white", padding: "24px 0", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "0 20px 24px", fontSize: "16px", fontWeight: "600", borderBottom: "1px solid #333" }}>
          byfamco
        </div>
        <nav style={{ flex: 1, padding: "16px 0" }}>
          {secciones.map((s) => (
            <Link
              key={s.path}
              to={s.path}
              style={{
                display: "block",
                padding: "9px 20px",
                fontSize: "13px",
                color: location.pathname === s.path ? "white" : "#9b9890",
                background: location.pathname === s.path ? "#2d2c29" : "transparent",
                textDecoration: "none",
                borderLeft: location.pathname === s.path ? "3px solid white" : "3px solid transparent",
              }}
            >
              {s.label}
            </Link>
          ))}
        </nav>
        <div style={{ padding: "16px 20px", borderTop: "1px solid #333" }}>
          <button
            onClick={() => { logout(); window.location.href = "/login" }}
            style={{ fontSize: "13px", color: "#9b9890", background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            Cerrar sesión
          </button>
        </div>
      </aside>
      <main style={{ flex: 1, background: "#faf9f7" }}>
        {children}
      </main>
    </div>
  )
}