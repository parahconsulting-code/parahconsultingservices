import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/server"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ testId: string }> }
) {
  const { testId } = await params

  const { data: questions } = await supabaseAdmin
    .from("questions")
    .select("id, texte, ordre, dimension, options:question_options(id, texte, valeur, ordre)")
    .eq("test_id", testId)
    .order("ordre")

  return NextResponse.json(questions || [], {
    headers: { "Cache-Control": "public, max-age=300, s-maxage=600" },
  })
}
