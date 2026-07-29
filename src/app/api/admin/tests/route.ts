import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/server"

export async function GET() {
  const [testsResult, countsResult] = await Promise.all([
    supabaseAdmin.from("tests").select("id, slug, titre, description").order("titre"),
    supabaseAdmin.from("questions").select("test_id", { count: "exact", head: false }),
  ])

  const { data: tests } = testsResult
  if (!tests) return NextResponse.json([])

  const countMap: Record<string, number> = {}
  for (const q of countsResult.data || []) {
    const tid = q.test_id as string
    countMap[tid] = (countMap[tid] || 0) + 1
  }

  const result = tests.map((t) => ({
    ...t,
    question_count: countMap[t.id] || 0,
  }))

  return NextResponse.json(result, {
    headers: { "Cache-Control": "public, max-age=60, s-maxage=120" },
  })
}
