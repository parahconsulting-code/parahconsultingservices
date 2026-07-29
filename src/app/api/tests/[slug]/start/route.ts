import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/server"
import { testsMeta } from "@/data/tests-meta"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const meta = testsMeta.find((t) => t.slug === slug)
  if (!meta) {
    return NextResponse.json({ error: "Test introuvable" }, { status: 404 })
  }

  const { data: test } = await supabaseAdmin
    .from("tests")
    .select("id, titre, description, duree_min, cible")
    .eq("slug", slug)
    .single()

  if (!test) {
    return NextResponse.json({ error: "Test non trouvé en base" }, { status: 404 })
  }

  const { data: questions } = await supabaseAdmin
    .from("questions")
    .select("id, texte, ordre, dimension, options:question_options(id, texte, valeur, ordre)")
    .eq("test_id", test.id)
    .order("ordre")

  return NextResponse.json({ test, questions }, {
    headers: { "Cache-Control": "public, max-age=300, s-maxage=600" },
  })
}
