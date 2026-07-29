import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/server"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1"))
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get("limit") || "50")))
  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data, error } = await supabaseAdmin
    .from("appointments")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, {
    headers: { "Cache-Control": "private, max-age=30" },
  })
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
