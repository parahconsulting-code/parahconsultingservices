"use client"

import { useEffect, useState } from "react"

interface Inscription {
  id: string
  formation: string
  nom: string
  email: string
  telephone: string
  message: string
  created_at: string
}

export default function AdminInscriptionsPage() {
  const [items, setItems] = useState<Inscription[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/inscriptions")
      .then((r) => r.json())
      .then((data) => { setItems(data); setLoading(false) })
  }, [])

  const counts = {
    total: items.length,
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Inscriptions aux formations</h1>
        <p className="text-gray-500 mt-1">Demandes d&apos;inscription reçues</p>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-lg">school</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{counts.total}</p>
          <p className="text-sm text-gray-500 mt-1">Total des inscriptions</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-400 text-sm">Chargement…</p>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <span className="material-symbols-outlined text-5xl text-gray-300 mb-4">assignment</span>
          <p className="text-gray-500">Aucune inscription pour l&apos;instant.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {["Date", "Formation", "Nom", "Email", "Téléphone", "Message"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                      {new Date(item.created_at).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.formation}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{item.nom}</td>
                    <td className="px-4 py-3 text-sm text-blue-600">{item.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{item.telephone || "—"}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 max-w-[250px] truncate">{item.message || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
