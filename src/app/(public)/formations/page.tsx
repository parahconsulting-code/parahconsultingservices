"use client"

import Link from "next/link"
import { AnimatedSection } from "@/components/ui/animated-section"

const formations = [
  {
    category: "Management",
    color: "bg-secondary text-on-secondary",
    title: "Leadership Stratégique & Gouvernance",
    duration: "5 Jours",
    mode: "Présentiel",
    modeIcon: "groups",
    desc: "Maîtrisez les outils de pilotage de la performance et apprenez à fédérer vos équipes autour d'une vision commune et transformative.",
    price: "450.000 FCFA",
  },
  {
    category: "RH & Recrutement",
    color: "bg-on-tertiary-container text-on-tertiary",
    title: "Optimisation de la Marque Employeur",
    duration: "3 Jours",
    mode: "Hybride",
    modeIcon: "laptop_mac",
    desc: "Attirez et retenez les meilleurs talents en transformant votre culture d'entreprise en un avantage concurrentiel majeur.",
    price: "325.000 FCFA",
  },
  {
    category: "Entrepreneurship",
    color: "bg-secondary text-on-secondary",
    title: "Business Model & Pitch Performance",
    duration: "4 Jours",
    mode: "Intensif",
    modeIcon: "workspace_premium",
    desc: "De l'idée au marché : structurez votre business model et maîtrisez l'art de convaincre les investisseurs institutionnels.",
    price: "500.000 FCFA",
  },
  {
    category: "Management",
    color: "bg-on-tertiary-container text-on-tertiary",
    title: "Gestion de Projets Agiles (Scrum)",
    duration: "2 Jours",
    mode: "Certifiant",
    modeIcon: "verified",
    desc: "Apprenez à diviser vos objectifs complexes en sprints gérables pour augmenter la vélocité et la qualité de vos livrables.",
    price: "275.000 FCFA",
  },
]

export default function FormationsPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-16 max-w-[1280px] mx-auto">
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
          <div className="flex items-center gap-4 text-on-surface-variant bg-surface-container p-1">
            {["Tous", "Certification", "Workshop"].map((filter) => (
              <button
                key={filter}
                className={`px-4 py-2 font-label transition-all duration-300 ${
                  filter === "Tous" ? "bg-surface shadow-sm text-primary font-semibold" : "hover:bg-surface/50 hover:scale-105"
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
                {["Management", "RH & Recrutement", "Entrepreneurship", "Stratégie Digitale"].map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      defaultChecked={cat === "Management"}
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
                href="/rendez-vous"
                className="block w-full py-2 bg-on-primary text-primary font-bold text-center hover:bg-surface transition-colors"
              >
                Contactez-nous
              </Link>
            </section>
          </div>
        </aside>

        <section className="flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formations.map((f, i) => {
              const citations = ["citation-esprit-critique.webp", "citation-connaissance-de-soi.webp", "citation-ecoute-1.webp", "citation-autoevaluation.webp"]
              return (
              <div
                key={f.title}
                className="border border-outline-variant bg-surface overflow-hidden transition-all duration-500 flex flex-col h-full hover:-translate-y-2 hover:shadow-xl animate-fade-up"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="h-48 overflow-hidden relative">
                  <div className={`absolute top-4 left-4 z-10 px-3 py-1 font-label ${f.color} transition-transform hover:scale-105`}>
                    {f.category}
                  </div>
                  <div className="w-full h-full bg-cover bg-center hover:scale-110 transition-transform duration-700" style={{ backgroundImage: `url('/images/${citations[i]}')` }} />
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
                  <p className="text-on-surface-variant mb-6 line-clamp-3 font-body leading-relaxed">{f.desc}</p>
                  <div className="mt-auto pt-6 border-t border-outline-variant flex items-center justify-between">
                    <div className="text-primary font-bold text-xl">{f.price}</div>
                    <button
                      className="bg-primary text-on-primary px-5 py-2 font-label hover:bg-on-primary-fixed-variant hover:scale-105 transition-all duration-300"
                      onClick={() => alert("Inscription enregistrée !")}
                    >
                      S&apos;inscrire
                    </button>
                  </div>
                </div>
              </div>
              );})}
          </div>
          <AnimatedSection animation="fade-up" className="mt-16 flex justify-center">
            <button className="flex items-center gap-2 px-8 py-3 border-2 border-outline text-primary font-bold hover:bg-primary hover:text-on-primary hover:scale-105 transition-all duration-300">
              Charger plus de formations <span className="material-symbols-outlined">expand_more</span>
            </button>
          </AnimatedSection>
        </section>
      </div>
    </div>
  )
}
