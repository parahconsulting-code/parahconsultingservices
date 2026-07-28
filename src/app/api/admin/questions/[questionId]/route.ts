import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/server"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ questionId: string }> }
) {
  const { questionId } = await params
  const body = await request.json()

  const updates: Record<string, any> = {}
  if (body.texte !== undefined) updates.texte = body.texte
  if (body.dimension !== undefined) updates.dimension = body.dimension
  if (body.ordre !== undefined) updates.ordre = body.ordre

  if (Object.keys(updates).length > 0) {
    const { error } = await supabaseAdmin.from("questions").update(updates).eq("id", questionId)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (body.options) {
    await supabaseAdmin.from("question_options").delete().eq("question_id", questionId)
    const opts = body.options.map((o: any) => ({
      question_id: questionId,
      texte: o.texte,
      valeur: o.valeur,
      ordre: o.ordre,
    }))
    await supabaseAdmin.from("question_options").insert(opts)
  }

  return NextResponse.json({ success: true })
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ questionId: string }> }
) {
  const { questionId } = await params

  await supabaseAdmin.from("question_options").delete().eq("question_id", questionId)
  const { error } = await supabaseAdmin.from("questions").delete().eq("id", questionId)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
