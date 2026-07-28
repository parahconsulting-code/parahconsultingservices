import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/server"

export async function POST(request: Request) {
  const body = await request.json()
  const { service, nom, email, telephone, date_souhaitee, message } = body

  if (!service || !nom || !email) {
    return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from("appointments")
    .insert({ service, nom, email, telephone, date_souhaitee, message, statut: "en_attente" })
    .select("id")
    .single()

  if (error) {
    console.error("Appointment insert error:", error)
    return NextResponse.json({ error: "Erreur lors de la réservation" }, { status: 500 })
  }

  return NextResponse.json({ success: true, id: data.id })
}
