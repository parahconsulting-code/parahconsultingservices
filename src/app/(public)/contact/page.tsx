"use client"

import { useState } from "react"

const services = [
  { icon: "person_search", title: "Débriefing Test RIASEC", sub: "45 min • Entretien individuel" },
  { icon: "psychology_alt", title: "Bilan de Compétences", sub: "90 min • Coaching complet" },
  { icon: "history_edu", title: "Conseil en Orientation Scolaire", sub: "60 min • Parents & Élèves" },
]

export default function ContactPage() {
  const [form, setForm] = useState({ service: "", nom: "", email: "", telephone: "", date_souhaitee: "", message: "" })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.service || !form.nom || !form.email) return
    setSubmitting(true)
    setError("")
    try {
      const res = await fetch("/api/rendez-vous", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.error) { setError(data.error); return }
      setDone(true)
    } catch {
      setError("Erreur réseau")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="pt-20 md:pt-32 pb-20 px-4 sm:px-6 md:px-16 max-w-[1280px] mx-auto w-full">
      <header className="mb-12">
        <h1 className="text-[32px] md:text-5xl font-display font-bold text-primary mb-4 leading-tight">
          Contact
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl font-body leading-relaxed">
          Besoin d&apos;un accompagnement personnalisé ? Remplissez le formulaire ci-dessous et
          nous vous recontacterons dans les plus brefs délais.
        </p>
      </header>

      <section className="bg-surface-container-lowest border border-outline-variant overflow-hidden shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-outline-variant bg-surface-container-low">
              <div className="flex items-center gap-3 mb-10">
                <span className="material-symbols-outlined text-secondary text-3xl">event_available</span>
                <h2 className="font-headline font-semibold text-xl text-primary">Prendre Rendez-vous</h2>
              </div>
              <div className="space-y-8">
                <div>
                  <label className="block font-label text-on-surface-variant mb-3">1. CHOISIR UN SERVICE *</label>
                  <div className="space-y-3">
                    {services.map((s) => (
                      <button
                        key={s.title}
                        type="button"
                        onClick={() => setForm({ ...form, service: s.title })}
                        className={`w-full text-left p-4 border transition-all flex items-center gap-4 ${
                          form.service === s.title
                            ? "border-secondary bg-secondary/5"
                            : "border-outline-variant hover:border-secondary"
                        }`}
                      >
                        <span className="material-symbols-outlined text-on-surface-variant">{s.icon}</span>
                        <div>
                          <div className="font-bold text-sm">{s.title}</div>
                          <div className="text-xs text-on-surface-variant">{s.sub}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-label text-on-surface-variant mb-3">2. VOS INFORMATIONS</label>
                  <div className="space-y-3">
                    <input required placeholder="Nom complet *" value={form.nom}
                      onChange={(e) => setForm({ ...form, nom: e.target.value })}
                      className="w-full px-4 py-3 border border-outline-variant bg-white focus:border-secondary outline-none transition-colors" />
                    <input required type="email" placeholder="Email *" value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 border border-outline-variant bg-white focus:border-secondary outline-none transition-colors" />
                    <input type="tel" placeholder="Téléphone" value={form.telephone}
                      onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                      className="w-full px-4 py-3 border border-outline-variant bg-white focus:border-secondary outline-none transition-colors" />
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 p-8 md:p-12">
              <div className="space-y-6">
                <div>
                  <label className="block font-label text-on-surface-variant mb-3">3. DATE SOUHAITÉE</label>
                  <input type="date" value={form.date_souhaitee}
                    onChange={(e) => setForm({ ...form, date_souhaitee: e.target.value })}
                    className="w-full px-4 py-3 border border-outline-variant bg-white focus:border-secondary outline-none transition-colors" />
                </div>
                <div>
                  <label className="block font-label text-on-surface-variant mb-3">4. MESSAGE (OPTIONNEL)</label>
                  <textarea rows={4} placeholder="Précisez votre besoin…" value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 border border-outline-variant bg-white focus:border-secondary outline-none transition-colors resize-none" />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {done ? (
                  <div className="bg-green-50 border border-green-200 p-6 text-center">
                    <span className="material-symbols-outlined text-green-500 text-4xl mb-2">check_circle</span>
                    <p className="font-bold text-green-700">Demande envoyée !</p>
                    <p className="text-sm text-green-600 mt-1">Nous vous recontacterons dans les plus brefs délais.</p>
                  </div>
                ) : (
                  <button type="submit" disabled={submitting || !form.service || !form.nom || !form.email}
                    className="w-full bg-primary text-on-primary px-10 py-4 font-label transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed">
                    {submitting ? "Envoi en cours…" : "Demander un rendez-vous"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  )
}
