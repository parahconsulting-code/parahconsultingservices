import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { supabaseAdmin } from "@/lib/supabase/server"

export async function POST(request: Request) {
  const { email, password, nom } = await request.json()

  if (!email || !password || !nom) {
    return NextResponse.json({ error: "email, password, nom requis" }, { status: 400 })
  }

  const { data: existing } = await supabaseAdmin
    .from("admins")
    .select("id")
    .eq("email", email.toLowerCase())
    .single()

  if (existing) {
    return NextResponse.json({ error: "Cet admin existe déjà" }, { status: 409 })
  }

  const hashed = await bcrypt.hash(password, 12)

  const { error } = await supabaseAdmin.from("admins").insert({
    email: email.toLowerCase(),
    password: hashed,
    nom,
  })

  if (error) {
    return NextResponse.json({ error: "Erreur création admin" }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
