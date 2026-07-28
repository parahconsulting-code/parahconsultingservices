import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/server"
import { testsMeta } from "@/data/tests-meta"
import { seedData } from "@/data/seed-questions"

export async function GET() {
  const results: Record<string, string> = {}

  for (const meta of testsMeta) {
    const { data: existing } = await supabaseAdmin.from("tests").select("id").eq("slug", meta.slug).single()

    if (existing) {
      results[meta.slug] = "already exists"
      continue
    }

    const { data: test, error: testErr } = await supabaseAdmin
      .from("tests")
      .insert({
        slug: meta.slug,
        titre: meta.titre,
        description: meta.description,
        duree_min: meta.duree_min,
        cible: meta.cible,
      })
      .select("id")
      .single()

    if (testErr || !test) {
      results[meta.slug] = `error creating test: ${testErr?.message}`
      continue
    }

    const questions = seedData[meta.slug].questions
    let qCount = 0

    for (const q of questions) {
      const { data: question, error: qErr } = await supabaseAdmin
        .from("questions")
        .insert({
          test_id: test.id,
          texte: q.texte,
          ordre: q.ordre,
          dimension: q.dimension ?? null,
        })
        .select("id")
        .single()

      if (qErr || !question) continue

      const options = q.options.map((o) => ({
        question_id: question.id,
        texte: o.texte,
        valeur: o.valeur,
        ordre: o.ordre,
      }))

      const { error: optErr } = await supabaseAdmin.from("question_options").insert(options)
      if (optErr) continue
      qCount++
    }

    results[meta.slug] = `${qCount} questions seeded`
  }

  return NextResponse.json({ results })
}
