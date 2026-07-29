"use client"

import { useEffect, useState } from "react"

interface Appointment {
  id: string
  service: string
  nom: string
  email: string
  telephone: string | null
  date_souhaitee: string | null
  message: string | null
  statut: string
  created_at: string
}

export default function AdminRendezVousPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    const res = await fetch("/api/admin/rendez-vous")
    const data = await res.json()
    setAppointments(data)
    setLoading(false)
  }

  async function updateStatus(id: string, statut: string) {
    await fetch("/api/admin/rendez-vous", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, statut }),
    })
    load()
  }

  async function remove(id: string) {
    if (!confirm("Supprimer ce rendez-vous ?")) return
    await fetch("/api/admin/rendez-vous", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    load()
  }

  function addToCalendar(a: Appointment) {
    const dateStr = a.date_souhaitee || a.created_at
    const d = new Date(dateStr)
    const start = d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
    const end = new Date(d.getTime() + 60 * 60 * 1000).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
    const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//PARAH Consulting//FR",
      "BEGIN:VEVENT",
      "DTSTART:" + start,
      "DTEND:" + end,
      "DTSTAMP:" + now,
      "UID:" + a.id + "@parahconsulting.com",
      "SUMMARY:Rendez-vous " + a.service + " - " + a.nom,
      "DESCRIPTION:Client: " + a.nom + "\\nEmail: " + a.email + (a.telephone ? "\\nTél: " + a.telephone : "") + (a.message ? "\\nMessage: " + a.message : ""),
      "LOCATION:1567 Rue Noumbi, Brazzaville",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n")
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const aEl = document.createElement("a")
    aEl.href = url
    aEl.download = "rdv-" + a.id + ".ics"
    aEl.click()
    URL.revokeObjectURL(url)
  }

  useEffect(() => { load() }, [])

  const statusConfig: Record<string, { label: string; bg: string; dot: string }> = {
    en_attente: { label: "En attente", bg: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500" },
    confirmé: { label: "Confirmé", bg: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
    annulé: { label: "Annulé", bg: "bg-red-50 text-red-700 border-red-200", dot: "bg-red-500" },
  }

  const counts = {
    total: appointments.length,
    en_attente: appointments.filter(a => a.statut === "en_attente").length,
    confirmé: appointments.filter(a => a.statut === "confirmé").length,
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Rendez-vous</h1>
        <p className="text-gray-500 mt-1">Gestion des demandes de rendez-vous clients</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        {[
          { value: counts.total, label: "Total", icon: "event_available", color: "from-blue-500 to-blue-600" },
          { value: counts.en_attente, label: "En attente", icon: "pending", color: "from-amber-500 to-amber-600" },
          { value: counts.confirmé, label: "Confirmés", icon: "check_circle", color: "from-emerald-500 to-emerald-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <span className="material-symbols-outlined text-white text-lg">{stat.icon}</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-400 text-sm">Chargement…</p>
        </div>
      ) : appointments.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <span className="material-symbols-outlined text-5xl text-gray-300 mb-4">event_busy</span>
          <p className="text-gray-500">Aucun rendez-vous pour l&apos;instant.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {["Date", "Client", "Contact", "Service", "Date souhaitée", "Message", "Statut", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointments.map((a) => {
                  const cfg = statusConfig[a.statut] || statusConfig.en_attente
                  return (
                    <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                        {new Date(a.created_at).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-medium text-gray-900">{a.nom}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-700">{a.email}</div>
                        {a.telephone && <div className="text-xs text-gray-400">{a.telephone}</div>}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{a.service}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                        {a.date_souhaitee ? new Date(a.date_souhaitee).toLocaleDateString("fr-FR") : "—"}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 max-w-[200px] truncate">{a.message || "—"}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${cfg.bg}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1.5">
                          {a.statut === "en_attente" && (
                            <>
                              <button onClick={() => updateStatus(a.id, "confirmé")}
                                className="px-2.5 py-1.5 text-xs font-medium rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors">
                                Confirmer
                              </button>
                              <button onClick={() => updateStatus(a.id, "annulé")}
                                className="px-2.5 py-1.5 text-xs font-medium rounded-md bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition-colors">
                                Annuler
                              </button>
                            </>
                          )}
                          {a.statut === "confirmé" && (
                            <>
                              <button onClick={() => addToCalendar(a)}
                                className="px-2.5 py-1.5 text-xs font-medium rounded-md text-blue-700 hover:bg-blue-50 border border-blue-200 hover:border-blue-300 transition-colors flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">calendar_month</span>
                                Agenda
                              </button>
                              <button onClick={() => updateStatus(a.id, "annulé")}
                                className="px-2.5 py-1.5 text-xs font-medium rounded-md bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition-colors">
                                Annuler
                              </button>
                            </>
                          )}
                          {a.statut === "annulé" && (
                            <button onClick={() => updateStatus(a.id, "en_attente")}
                              className="px-2.5 py-1.5 text-xs font-medium rounded-md bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 transition-colors">
                              Réouvrir
                            </button>
                          )}
                          <button onClick={() => remove(a.id)}
                            className="px-2.5 py-1.5 text-xs font-medium rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 border border-gray-200 hover:border-red-200 transition-colors">
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
