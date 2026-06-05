function Login() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">byfamco</h1>
        <p className="text-sm text-gray-400 mb-6">Accede a tu cuenta</p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
          <input
            type="email"
            placeholder="tu@correo.com"
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button className="w-full bg-black text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition">
          Entrar
        </button>
      </div>
    </div>
  )
}

export default Login