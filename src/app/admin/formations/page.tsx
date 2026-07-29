"use client"

import { useEffect, useState } from "react"

interface Formation {
  id: string
  title: string
  category: string
  type: string
  duration: string
  mode: string
  modeIcon: string
  description: string
  price: string
  color: string
  image: string | null
  active: boolean
  ordre: number
}

const emptyForm: Omit<Formation, "id"> = {
  title: "", category: "Management", type: "Formation", duration: "", mode: "",
  modeIcon: "groups", description: "", price: "", color: "bg-secondary text-on-secondary",
  image: null, active: true, ordre: 0,
}

const colorOptions = [
  { value: "bg-secondary text-on-secondary", label: "Bleu" },
  { value: "bg-on-tertiary-container text-on-tertiary", label: "Ambre" },
]

const iconOptions = [
  { value: "groups", label: "Groupe" },
  { value: "laptop_mac", label: "Laptop" },
  { value: "workspace_premium", label: "Premium" },
  { value: "verified", label: "Certifié" },
  { value: "school", label: "École" },
  { value: "trending_up", label: "Tendance" },
]

export default function AdminFormationsPage() {
  const [formations, setFormations] = useState<Formation[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<Omit<Formation, "id">>(emptyForm)
  const [showForm, setShowForm] = useState(false)

  async function load() {
    const res = await fetch("/api/admin/formations")
    setFormations(await res.json())
    setLoading(false)
  }

  async function save() {
    if (editingId) {
      await fetch("/api/admin/formations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...form }),
      })
    } else {
      await fetch("/api/admin/formations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
    }
    setShowForm(false)
    setEditingId(null)
    setForm(emptyForm)
    load()
  }

  async function remove(id: string) {
    if (!confirm("Supprimer cette formation ?")) return
    await fetch("/api/admin/formations", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    load()
  }

  function startEdit(f: Formation) {
    setForm({ ...f })
    setEditingId(f.id)
    setShowForm(true)
  }

  useEffect(() => { load() }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Formations</h1>
          <p className="text-gray-500 mt-1">Gérer le catalogue de formations</p>
        </div>
        <button onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(!showForm) }}
          className="flex items-center gap-2 bg-[#4f7cff] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#3d6ae8] transition-colors">
          <span className="material-symbols-outlined text-lg">{showForm ? "close" : "add"}</span>
          {showForm ? "Fermer" : "Nouvelle formation"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{editingId ? "Modifier" : "Nouvelle"} formation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Titre</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#4f7cff] focus:ring-2 focus:ring-[#4f7cff]/20 outline-none text-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Catégorie</label>
              <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#4f7cff] focus:ring-2 focus:ring-[#4f7cff]/20 outline-none text-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#4f7cff] focus:ring-2 focus:ring-[#4f7cff]/20 outline-none text-sm">
                {["Formation", "Certification", "Workshop"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Durée</label>
              <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#4f7cff] focus:ring-2 focus:ring-[#4f7cff]/20 outline-none text-sm" placeholder="5 Jours" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Mode</label>
              <input value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#4f7cff] focus:ring-2 focus:ring-[#4f7cff]/20 outline-none text-sm" placeholder="Présentiel" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Icône</label>
              <select value={form.modeIcon} onChange={(e) => setForm({ ...form, modeIcon: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#4f7cff] focus:ring-2 focus:ring-[#4f7cff]/20 outline-none text-sm">
                {iconOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Prix</label>
              <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#4f7cff] focus:ring-2 focus:ring-[#4f7cff]/20 outline-none text-sm" placeholder="450.000 FCFA" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Couleur</label>
              <select value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#4f7cff] focus:ring-2 focus:ring-[#4f7cff]/20 outline-none text-sm">
                {colorOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Ordre</label>
              <input type="number" value={form.ordre} onChange={(e) => setForm({ ...form, ordre: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#4f7cff] focus:ring-2 focus:ring-[#4f7cff]/20 outline-none text-sm" />
            </div>
            <div className="space-y-1.5 flex items-center gap-3 pt-6">
              <input type="checkbox" id="active" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 text-[#4f7cff] focus:ring-[#4f7cff]" />
              <label htmlFor="active" className="text-sm font-medium text-gray-700">Active</label>
            </div>
          </div>
          <div className="space-y-1.5 mt-4">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#4f7cff] focus:ring-2 focus:ring-[#4f7cff]/20 outline-none text-sm" />
          </div>
          <button onClick={save}
            className="mt-4 bg-[#4f7cff] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#3d6ae8] transition-colors">
            {editingId ? "Enregistrer" : "Créer"}
          </button>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-[#4f7cff] border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-400 text-sm">Chargement…</p>
        </div>
      ) : formations.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <span className="material-symbols-outlined text-5xl text-gray-300 mb-4">school</span>
          <p className="text-gray-500">Aucune formation pour l&apos;instant.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {["Ordre", "Titre", "Catégorie", "Type", "Durée", "Prix", "Statut", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {formations.sort((a, b) => a.ordre - b.ordre).map((f) => (
                  <tr key={f.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-500">{f.ordre}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{f.title}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${f.color}`}>{f.category}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{f.type}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{f.duration}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{f.price}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${f.active ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-gray-50 text-gray-500 border-gray-200"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${f.active ? "bg-emerald-500" : "bg-gray-400"}`} />
                        {f.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        <button onClick={() => startEdit(f)}
                          className="px-2.5 py-1.5 text-xs font-medium rounded-md text-blue-700 hover:bg-blue-50 border border-blue-200 transition-colors">
                          Modifier
                        </button>
                        <button onClick={() => remove(f.id)}
                          className="px-2.5 py-1.5 text-xs font-medium rounded-md text-red-700 hover:bg-red-50 border border-red-200 transition-colors">
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </td>
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
