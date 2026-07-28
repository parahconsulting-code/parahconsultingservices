"use client"

import Link from "next/link"
import { useState } from "react"

const tests = [
  {
    title: "RIASEC Junior",
    desc: "Conçu pour les élèves du secondaire (12-17 ans). Ce test identifie les types de personnalité dominants et suggère des parcours académiques adaptés aux aspirations précoces.",
    duration: "15 min",
    questions: "60",
    badge: "Populaire",
    href: "/tests/riasec-junior",
    colSpan: "md:col-span-8",
  },
  {
    title: "Intelligences Multiples",
    desc: "Identifiez vos 8 formes d'intelligence dominantes pour mieux comprendre comment vous apprenez et collaborez.",
    duration: "10 min",
    questions: "40",
    href: "/tests/intelligences-multiples",
    colSpan: "md:col-span-4",
  },
  {
    title: "RIASEC Adulte & Reconversion",
    desc: "Analyse approfondie pour les professionnels en quête de sens ou de changement de carrière. Basé sur le modèle de Holland, ce test croise vos intérêts avec les réalités du marché du travail actuel.",
    duration: "20 min",
    questions: "60",
    href: "/tests/riasec-adulte",
    colSpan: "md:col-span-12",
    features: ["Certification RH", "Rapport détaillé (PDF)", "Comparatif sectoriel"],
    isWide: true,
  },
]

const services = [
  { icon: "person_search", title: "Débriefing Test RIASEC", sub: "45 min • Entretien individuel" },
  { icon: "psychology_alt", title: "Bilan de Compétences", sub: "90 min • Coaching complet" },
  { icon: "history_edu", title: "Conseil en Orientation Scolaire", sub: "60 min • Parents & Élèves" },
]

export default function RendezVousPage() {
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
    <div className="pt-32 pb-20 px-6 md:px-16 max-w-[1280px] mx-auto w-full">
      <header className="mb-16">
        <h1 className="text-[32px] md:text-5xl font-display font-bold text-primary mb-4 leading-tight">
          Orientation & Carrière
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl font-body leading-relaxed">
          Découvrez votre potentiel à travers nos tests psychotechniques validés et réservez un accompagnement
          personnalisé avec nos experts en ressources humaines.
        </p>
      </header>

      <section className="mb-24">
        <div className="flex items-center gap-3 mb-8">
          <span className="material-symbols-outlined text-secondary text-3xl">psychology</span>
          <h2 className="text-[30px] font-headline font-semibold text-primary leading-tight">Tests d&apos;Orientation</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {tests.map((test) => (
            <div
              key={test.title}
              className={`${test.colSpan} group relative overflow-hidden border border-outline-variant bg-surface-container-lowest transition-all duration-300 hover:shadow-xl hover:border-secondary ${
                test.isWide ? "flex flex-col md:flex-row" : ""
              }`}
            >
              {test.isWide ? (
                <>
                  <div className="md:w-1/3 h-64 md:h-auto bg-cover bg-center bg-[#e0e3e5]" />
                  <div className="p-8 md:w-2/3 flex flex-col justify-center">
                    <h3 className="font-headline font-semibold text-xl mb-2">{test.title}</h3>
                    <p className="text-on-surface-variant mb-6 font-body">{test.desc}</p>
                    <div className="flex flex-wrap gap-6 mb-8">
                      {test.features?.map((f) => (
                        <div key={f} className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-secondary">verified</span>
                          <span className="text-sm font-medium">{f}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href={test.href}
                      className="self-start flex items-center gap-2 bg-primary text-on-primary px-8 py-3 font-label transition-transform active:scale-95"
                    >
                      Évaluer mon profil <span className="material-symbols-outlined">trending_up</span>
                    </Link>
                  </div>
                </>
              ) : (
                <div className="p-8 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    {test.badge && (
                      <span className="bg-secondary-fixed text-on-secondary-fixed px-3 py-1 text-xs font-bold tracking-wider uppercase">
                        {test.badge}
                      </span>
                    )}
                    <span className="material-symbols-outlined text-primary-fixed-dim text-5xl">school</span>
                  </div>
                  <h3 className="font-headline font-semibold text-xl mb-3">{test.title}</h3>
                  <p className="text-on-surface-variant mb-8 flex-grow font-body">{test.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4 text-sm text-on-surface-variant">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">timer</span> {test.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">task_alt</span> {test.questions} questions
                      </span>
                    </div>
                    <Link
                      href={test.href}
                      className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 font-label transition-transform active:scale-95"
                    >
                      Démarrer le test <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface-container-lowest border border-outline-variant overflow-hidden shadow-sm" id="booking-section">
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
