import Link from "next/link"
import { supabaseAdmin } from "@/lib/supabase/server"

export default async function AdminQuestionsPage() {
  const [testsResult, countsResult] = await Promise.all([
    supabaseAdmin.from("tests").select("id, slug, titre").order("titre"),
    supabaseAdmin.from("questions").select("test_id", { count: "exact", head: false }),
  ])

  const tests = testsResult.data || []
  const countMap: Record<string, number> = {}
  for (const q of countsResult.data || []) {
    const tid = q.test_id as string
    countMap[tid] = (countMap[tid] || 0) + 1
  }

  const result = tests.map((t) => ({ ...t, question_count: countMap[t.id] || 0 }))

  const testIcons: Record<string, string> = {
    riasec: "radio_button_checked",
    interets: "work_history",
    aptitudes: "lightbulb",
    styles: "visibility",
    intelligences: "psychology",
    personnalite: "diversity_3",
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des questions</h1>
        <p className="text-gray-500 mt-1">Sélectionnez un test pour modifier ses questions</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {result.map((test) => {
          const iconKey = Object.keys(testIcons).find((k) => test.slug.startsWith(k))
          return (
            <Link
              key={test.id}
              href={`/admin/questions/${test.id}`}
              className="group bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-blue-200 transition-all duration-300 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-blue-600">{testIcons[iconKey || ""] || "quiz"}</span>
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{test.titre}</h2>
                <p className="text-sm text-gray-500">/{test.slug}</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                  {test.question_count} Q
                </span>
              </div>
            </Link>
          )
        })}
        {result.length === 0 && (
          <p className="text-gray-400 text-center py-12 col-span-2">Aucun test trouvé</p>
        )}
      </div>
    </div>
  )
}
