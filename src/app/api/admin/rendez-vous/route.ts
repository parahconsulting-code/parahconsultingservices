import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/server"

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("appointments")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PATCH(request: Request) {
  const { id, statut } = await request.json()
  if (!id || !statut) {
    return NextResponse.json({ error: "id et statut requis" }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from("appointments")
    .update({ statut })
    .eq("id", id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  if (!id) return NextResponse.json({ error: "id requis" }, { status: 400 })

  const { error } = await supabaseAdmin.from("appointments").delete().eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
