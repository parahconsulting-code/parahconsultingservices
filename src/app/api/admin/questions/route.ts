import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/server"

export async function POST(request: Request) {
  const body = await request.json()
  const { test_id, texte, dimension, options } = body

  if (!test_id || !texte) {
    return NextResponse.json({ error: "test_id et texte requis" }, { status: 400 })
  }

  const { count } = await supabaseAdmin
    .from("questions")
    .select("*", { count: "exact", head: true })
    .eq("test_id", test_id)

  const { data: question, error: qErr } = await supabaseAdmin
    .from("questions")
    .insert({ test_id, texte, dimension: dimension || null, ordre: (count || 0) + 1 })
    .select("id")
    .single()

  if (qErr || !question) {
    return NextResponse.json({ error: "Erreur création question" }, { status: 500 })
  }

  const defaultOptions = [
    { texte: "Pas du tout", valeur: 1, ordre: 1 },
    { texte: "Un peu", valeur: 2, ordre: 2 },
    { texte: "Moyennement", valeur: 3, ordre: 3 },
    { texte: "Beaucoup", valeur: 4, ordre: 4 },
    { texte: "Passionnément", valeur: 5, ordre: 5 },
  ]

  const opts = (options || defaultOptions).map((o: any) => ({
    question_id: question.id,
    texte: o.texte,
    valeur: o.valeur,
    ordre: o.ordre,
  }))

  await supabaseAdmin.from("question_options").insert(opts)

  return NextResponse.json({ success: true, id: question.id })
}
