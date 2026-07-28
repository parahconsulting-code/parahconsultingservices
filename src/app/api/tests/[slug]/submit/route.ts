import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/server"
import { testsMeta } from "@/data/tests-meta"

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const meta = testsMeta.find((t) => t.slug === slug)
  if (!meta) {
    return NextResponse.json({ error: "Test introuvable" }, { status: 404 })
  }

  const body = await request.json()
  const { nom, prenom, profession, niveau_etude, telephone, email, reponses } = body

  if (!nom || !prenom || !reponses) {
    return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 })
  }

  const { data: test } = await supabaseAdmin
    .from("tests")
    .select("id")
    .eq("slug", slug)
    .single()

  if (!test) {
    return NextResponse.json({ error: "Test inconnu" }, { status: 404 })
  }

  const { data: participant, error: pErr } = await supabaseAdmin
    .from("participants")
    .insert({ nom, prenom, profession, niveau_etude, telephone, email })
    .select("id")
    .single()

  if (pErr || !participant) {
    console.error("Participant insert error:", pErr)
    return NextResponse.json({ error: "Erreur création participant", detail: pErr?.message }, { status: 500 })
  }

  const scores = await calculateScores(slug, reponses)

  const { data: passage, error: passErr } = await supabaseAdmin
    .from("test_passages")
    .insert({
      participant_id: participant.id,
      test_id: test.id,
      scores,
    })
    .select("id, token_acces")
    .single()

  if (passErr || !passage) {
    return NextResponse.json({ error: "Erreur création passage" }, { status: 500 })
  }

  const reponseRows = Object.entries(reponses as Record<string, string>).map(
    ([questionId, optionId]) => ({
      passage_id: passage.id,
      question_id: questionId,
      option_id: optionId,
    })
  )

  const { error: rErr } = await supabaseAdmin.from("reponses").insert(reponseRows)
  if (rErr) {
    console.error("Erreur sauvegarde réponses:", rErr)
  }

  return NextResponse.json({
    token: passage.token_acces,
    scores,
    resultUrl: `/tests/resultat?token=${passage.token_acces}`,
  })
}

async function calculateScores(slug: string, reponses: Record<string, string>): Promise<Record<string, number>> {
  const questionIds = Object.keys(reponses)
  if (questionIds.length === 0) return {}

  const { data: questions } = await supabaseAdmin
    .from("questions")
    .select("id, dimension, options:question_options(id, valeur)")
    .in("id", questionIds)

  if (!questions || questions.length === 0) return {}

  const optionValues = new Map<string, number>()
  for (const q of questions) {
    for (const opt of (q as any).options || []) {
      optionValues.set(opt.id, opt.valeur)
    }
  }

  const dims: Record<string, { sum: number; count: number }> = {}

  for (const [qId, optId] of Object.entries(reponses)) {
    const q = questions.find((qq) => qq.id === qId)
    const dim = q?.dimension || "Général"
    const val = optionValues.get(optId) || 1

    if (!dims[dim]) dims[dim] = { sum: 0, count: 0 }
    dims[dim].sum += val
    dims[dim].count++
  }

  return Object.fromEntries(
    Object.entries(dims).map(([key, { sum, count }]) => [
      key,
      Math.round((sum / (count * 5)) * 100),
    ])
  )
}
