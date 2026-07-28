import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/server"
import { buildReportData, generatePdfBuffer } from "@/lib/pdf"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get("token")

  if (!token) {
    return NextResponse.json({ error: "Token manquant" }, { status: 400 })
  }

  const { data: passage, error: pErr } = await supabaseAdmin
    .from("test_passages")
    .select("*, test:tests(*), participant:participants(*)")
    .eq("token_acces", token)
    .single()

  if (pErr || !passage) {
    return NextResponse.json({ error: "Résultats non trouvés" }, { status: 404 })
  }

  const test = (passage as any).test
  const participant = (passage as any).participant

  const reportData = buildReportData(passage as any, test, participant as any)

  try {
    const pdfBuffer = await generatePdfBuffer(reportData)
    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="rapport-orientation-${token?.slice(0, 8)}.pdf"`,
      },
    })
  } catch (err) {
    console.error("PDF generation error:", err)
    return NextResponse.json({ error: "Erreur lors de la génération du PDF" }, { status: 500 })
  }
}
