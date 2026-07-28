"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (data.error) {
      setError(data.error)
      setLoading(false)
    } else {
      router.push("/admin")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1f36] via-[#1a1f36] to-[#2d3250] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white font-display">
            PARAH<span className="text-[#4f7cff]">.</span>
          </h1>
          <p className="text-white/50 mt-2 text-sm">Espace Administration</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-gray-900">Connexion</h2>
            <p className="text-sm text-gray-500">Accédez à votre tableau de bord</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">error</span>
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <span className="material-symbols-outlined text-lg">mail</span>
                </span>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#4f7cff] focus:ring-2 focus:ring-[#4f7cff]/20 outline-none transition-all text-sm"
                  placeholder="admin@parahconsulting.com" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Mot de passe</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <span className="material-symbols-outlined text-lg">lock</span>
                </span>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#4f7cff] focus:ring-2 focus:ring-[#4f7cff]/20 outline-none transition-all text-sm"
                  placeholder="••••••••" />
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-[#4f7cff] text-white py-3 rounded-lg font-medium text-sm hover:bg-[#3d6ae8] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {loading ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                Connexion…
              </>
            ) : (
              "Se connecter"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
