import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/server"

export async function GET() {
  const { data: passages } = await supabaseAdmin
    .from("test_passages")
    .select("id, scores, created_at, token_acces, participant:participants(nom, prenom, profession, niveau_etude, telephone, email), test:tests(titre, slug)")
    .order("created_at", { ascending: false })

  if (!passages || passages.length === 0) {
    return new NextResponse("Aucune donnée", { status: 200 })
  }

  const headers = [
    "Date", "Participant", "Email", "Téléphone", "Profession",
    "Niveau d'étude", "Test", "Slug",
    "Scores (JSON)", "Token",
  ]

  const rows = passages.map((p: any) => [
    new Date(p.created_at).toISOString(),
    `"${p.participant?.nom || ""} ${p.participant?.prenom || ""}"`,
    p.participant?.email || "",
    p.participant?.telephone || "",
    `"${p.participant?.profession || ""}"`,
    `"${p.participant?.niveau_etude || ""}"`,
    `"${p.test?.titre || ""}"`,
    p.test?.slug || "",
    `"${JSON.stringify(p.scores)}"`,
    p.token_acces || "",
  ])

  const csv = [headers.join(","), ...rows.map((r: string[]) => r.join(","))].join("\n")

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="resultats-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  })
}
