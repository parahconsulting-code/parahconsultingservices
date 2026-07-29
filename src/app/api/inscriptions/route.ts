import { NextResponse } from "next/server"
import { createInscription } from "@/lib/inscriptions-store"

export async function POST(request: Request) {
  const body = await request.json()
  if (!body.nom || !body.email || !body.formation) {
    return NextResponse.json({ error: "nom, email et formation requis" }, { status: 400 })
  }
  const item = await createInscription(body)
  return NextResponse.json(item, { status: 201 })
}
