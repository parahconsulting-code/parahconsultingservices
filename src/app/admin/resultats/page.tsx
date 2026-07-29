import { supabaseAdmin } from "@/lib/supabase/server"

export default async function AdminResultatsPage() {
  const [{ count: totalPassages }, { count: totalParticipants }, testsResult, passagesResult] = await Promise.all([
    supabaseAdmin.from("test_passages").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("participants").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("tests").select("id, titre"),
    supabaseAdmin.from("test_passages").select("test_id", { count: "exact", head: false }),
  ])

  const tests = testsResult.data || []
  const testCounts: Record<string, number> = {}
  for (const p of passagesResult.data || []) {
    const tid = p.test_id as string
    const test = tests.find((t: { id: string }) => t.id === tid)
    if (test) testCounts[test.titre] = (testCounts[test.titre] || 0) + 1
  }

  const { data: recentPassages } = await supabaseAdmin
    .from("test_passages")
    .select("id, scores, created_at, token_acces, participant:participants(nom, prenom), test:tests(titre)")
    .order("created_at", { ascending: false })
    .limit(20)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Résultats</h1>
          <p className="text-gray-500 mt-1">Statistiques et données des tests</p>
        </div>
        <a href="/api/admin/resultats/export"
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          <span className="material-symbols-outlined text-lg">download</span>
          Exporter CSV
        </a>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        {[
          { value: totalPassages || 0, label: "Tests complétés", icon: "checklist", color: "from-blue-500 to-blue-600" },
          { value: totalParticipants || 0, label: "Participants", icon: "people", color: "from-emerald-500 to-emerald-600" },
          { value: tests?.length || 0, label: "Tests disponibles", icon: "assignment", color: "from-violet-500 to-violet-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <span className="material-symbols-outlined text-white text-lg">{stat.icon}</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg text-emerald-500">trending_up</span>
            Tests populaires
          </h2>
          <div className="space-y-3">
            {Object.entries(testCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([titre, count]) => (
                <div key={titre} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <span className="text-sm text-gray-700">{titre}</span>
                  <span className="text-sm font-semibold text-blue-600">{count} passages</span>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg text-violet-500">history</span>
            Derniers passages
          </h2>
          <div className="space-y-3">
            {(recentPassages || []).map((p) => {
              const participant = p as any
              return (
                <div key={p.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="material-symbols-outlined text-sm text-gray-500">person</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {participant.participant?.prenom} {participant.participant?.nom}
                      </p>
                      <p className="text-xs text-gray-500">{participant.test?.titre}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(p.created_at).toLocaleDateString("fr-FR")}
                  </span>
                </div>
              )
            })}
            {(!recentPassages || recentPassages.length === 0) && (
              <p className="text-gray-400 text-center py-4 text-sm">Aucun passage pour l&apos;instant</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
