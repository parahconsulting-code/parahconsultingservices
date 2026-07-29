"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AnimatedSection } from "@/components/ui/animated-section"

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

const citations = ["citation-esprit-critique.webp", "citation-connaissance-de-soi.webp", "citation-ecoute-1.webp", "citation-autoevaluation.webp"]

export default function FormationsPage() {
  const [formations, setFormations] = useState<Formation[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["Tous"])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [inscription, setInscription] = useState<{ formation: string; nom: string; email: string; telephone: string; message: string; sending: boolean; done: boolean } | null>(null)

  useEffect(() => {
    fetch("/api/admin/formations")
      .then((r) => r.json())
      .then((data) => {
        const active = (data as Formation[]).filter((f) => f.active).sort((a, b) => a.ordre - b.ordre)
        setFormations(active)
        setSelectedCategories([...new Set(active.map((f) => f.category))])
      })
  }, [])

  const filtered = formations.filter((f) => {
    const typeMatch = selectedTypes.includes("Tous") || selectedTypes.includes(f.type)
    const catMatch = selectedCategories.includes(f.category)
    return typeMatch && catMatch
  })

  const categories = [...new Set(formations.map((f) => f.category))]
  const types = [...new Set(formations.map((f) => f.type))]

  return (
    <div className="pt-20 md:pt-32 pb-24 px-4 sm:px-6 md:px-16 max-w-[1280px] mx-auto">
      <header className="mb-16 animate-fade-down">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-[32px] md:text-5xl font-display font-bold text-primary mb-4 leading-tight">
              Catalogue des Formations
            </h1>
            <p className="text-lg text-on-surface-variant max-w-2xl font-body leading-relaxed">
              Développez vos compétences stratégiques avec nos programmes d&apos;excellence conçus pour les leaders de
              demain.
            </p>
          </div>
          <div className="flex items-center gap-4 text-on-surface-variant bg-surface-container p-1 flex-wrap">
            {["Tous", ...types].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedTypes(filter === "Tous" ? ["Tous"] : [filter])}
                className={`px-4 py-2 font-label transition-all duration-300 ${
                  (filter === "Tous" && selectedTypes.includes("Tous")) || selectedTypes.includes(filter) ? "bg-surface shadow-sm text-primary font-semibold" : "hover:bg-surface/50 hover:scale-105"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="w-full lg:w-64 flex-shrink-0 animate-fade-up animate-delay-100">
          <div className="sticky top-32 space-y-8">
            <section>
              <h3 className="font-headline font-semibold text-xl text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined">filter_list</span> Catégories
              </h3>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      checked={selectedCategories.includes(cat)}
                      onChange={() => setSelectedCategories((prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat])}
                      className="w-5 h-5 rounded border-outline text-secondary focus:ring-secondary"
                      type="checkbox"
                    />
                    <span className="text-on-surface-variant group-hover:text-primary transition-colors font-body">
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </section>
            <section className="p-6 bg-primary-container text-on-primary transition-all duration-300 hover:scale-[1.02]">
              <p className="font-label mb-2 text-on-primary-container">Besoin d&apos;aide ?</p>
              <p className="mb-4 opacity-80 font-body">Nos conseillers vous orientent vers le meilleur parcours.</p>
              <Link
                href="/contact"
                className="block w-full py-2 bg-on-primary text-primary font-bold text-center hover:bg-surface transition-colors"
              >
                Contactez-nous
              </Link>
            </section>
          </div>
        </aside>

        <section className="flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((f, i) => (
              <div
                key={f.id}
                className="border border-outline-variant bg-surface overflow-hidden transition-all duration-500 flex flex-col h-full hover:-translate-y-2 hover:shadow-xl animate-fade-up"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="h-48 overflow-hidden relative">
                  <div className={`absolute top-4 left-4 z-10 px-3 py-1 font-label ${f.color} transition-transform hover:scale-105`}>
                    {f.category}
                  </div>
                  <div className="w-full h-full bg-cover bg-center hover:scale-110 transition-transform duration-700" style={{ backgroundImage: `url('/images/${citations[i % citations.length]}')` }} />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="font-headline font-semibold text-xl text-primary leading-tight mb-3">{f.title}</h2>
                  <div className="flex items-center gap-4 text-on-surface-variant mb-4 font-label">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px]">schedule</span> {f.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px]">{f.modeIcon}</span> {f.mode}
                    </span>
                  </div>
                  <p className="text-on-surface-variant mb-6 line-clamp-3 font-body leading-relaxed">{f.description}</p>
                  <div className="mt-auto pt-6 border-t border-outline-variant flex items-center justify-between">
                    <div className="text-primary font-bold text-xl">{f.price}</div>
                    <button
                      className="bg-primary text-on-primary px-5 py-2 font-label hover:bg-on-primary-fixed-variant hover:scale-105 transition-all duration-300"
                      onClick={() => setInscription({ formation: f.title, nom: "", email: "", telephone: "", message: "", sending: false, done: false })}
                    >
                      S&apos;inscrire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-5xl text-gray-300 mb-4">search_off</span>
              <p className="text-gray-500 font-body">Aucune formation ne correspond à vos filtres.</p>
            </div>
          )}
          <AnimatedSection animation="fade-up" className="mt-16 flex justify-center">
            <button className="flex items-center gap-2 px-8 py-3 border-2 border-outline text-primary font-bold hover:bg-primary hover:text-on-primary hover:scale-105 transition-all duration-300">
              Charger plus de formations <span className="material-symbols-outlined">expand_more</span>
            </button>
          </AnimatedSection>
        </section>
      </div>

      {inscription && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={() => !inscription.sending && setInscription(null)}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-8" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setInscription(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>

            {inscription.done ? (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-5xl text-emerald-500 mb-4">check_circle</span>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Inscription envoyée !</h3>
                <p className="text-gray-500 font-body">Nous vous recontacterons rapidement.</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Inscription</h3>
                <p className="text-sm text-gray-500 mb-6 font-body">{inscription.formation}</p>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Nom & Prénom *</label>
                    <input value={inscription.nom} onChange={(e) => setInscription({ ...inscription, nom: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#4f7cff] focus:ring-2 focus:ring-[#4f7cff]/20 outline-none text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Email *</label>
                    <input type="email" value={inscription.email} onChange={(e) => setInscription({ ...inscription, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#4f7cff] focus:ring-2 focus:ring-[#4f7cff]/20 outline-none text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Téléphone</label>
                    <input type="tel" value={inscription.telephone} onChange={(e) => setInscription({ ...inscription, telephone: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#4f7cff] focus:ring-2 focus:ring-[#4f7cff]/20 outline-none text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Message</label>
                    <textarea rows={3} value={inscription.message} onChange={(e) => setInscription({ ...inscription, message: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-[#4f7cff] focus:ring-2 focus:ring-[#4f7cff]/20 outline-none text-sm" />
                  </div>
                  <button onClick={async () => {
                    setInscription({ ...inscription, sending: true })
                    await fetch("/api/inscriptions", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ formation: inscription.formation, nom: inscription.nom, email: inscription.email, telephone: inscription.telephone, message: inscription.message }),
                    })
                    setInscription({ ...inscription, sending: false, done: true })
                  }} disabled={inscription.sending || !inscription.nom || !inscription.email}
                    className="w-full bg-primary text-on-primary py-3 rounded-lg font-medium text-sm hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {inscription.sending ? (
                      <><div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> Envoi…</>
                    ) : "Envoyer ma demande"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
