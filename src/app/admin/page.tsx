import Link from "next/link"

const cards = [
  { href: "/admin/questions", icon: "quiz", title: "Questions", desc: "Ajouter, modifier, supprimer des questions par test", color: "from-blue-500 to-blue-600", shadow: "shadow-blue-500/20" },
  { href: "/admin/resultats", icon: "bar_chart", title: "Résultats", desc: "Consulter les tests passés et exporter les données", color: "from-emerald-500 to-emerald-600", shadow: "shadow-emerald-500/20" },
  { href: "/admin/rendez-vous", icon: "event_available", title: "Rendez-vous", desc: "Gérer les demandes de rendez-vous clients", color: "from-violet-500 to-violet-600", shadow: "shadow-violet-500/20" },
]

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Bienvenue dans votre espace d&apos;administration</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link key={card.href} href={card.href}
            className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} ${card.shadow} flex items-center justify-center mb-4`}>
              <span className="material-symbols-outlined text-white text-2xl">{card.icon}</span>
            </div>
            <h2 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">{card.title}</h2>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
