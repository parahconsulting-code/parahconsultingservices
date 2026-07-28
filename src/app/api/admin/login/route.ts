import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { supabaseAdmin } from "@/lib/supabase/server"
import { createSession } from "@/lib/session"

export async function POST(request: Request) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json({ error: "Email et mot de passe requis" }, { status: 400 })
  }

  const { data: admin } = await supabaseAdmin
    .from("admins")
    .select("id, email, password, nom")
    .eq("email", email.toLowerCase())
    .single()

  if (!admin) {
    return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 })
  }

  const valid = await bcrypt.compare(password, admin.password)
  if (!valid) {
    return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 })
  }

  await createSession({ adminId: admin.id, email: admin.email })

  return NextResponse.json({ success: true, nom: admin.nom })
}
