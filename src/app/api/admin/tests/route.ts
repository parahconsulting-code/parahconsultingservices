import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/server"

export async function GET() {
  const { data: tests } = await supabaseAdmin
    .from("tests")
    .select("id, slug, titre, description")
    .order("titre")

  if (!tests) return NextResponse.json([])

  const result = await Promise.all(
    tests.map(async (t) => {
      const { count } = await supabaseAdmin
        .from("questions")
        .select("*", { count: "exact", head: true })
        .eq("test_id", t.id)
      return { ...t, question_count: count || 0 }
    })
  )

  return NextResponse.json(result)
}
