import { NextResponse } from "next/server"
import { getFormations, createFormation, updateFormation, deleteFormation } from "@/lib/formations-store"

export async function GET() {
  return NextResponse.json(await getFormations(), {
    headers: { "Cache-Control": "private, max-age=30" },
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  const formation = await createFormation(body)
  return NextResponse.json(formation, { status: 201 })
}

export async function PATCH(request: Request) {
  const { id, ...data } = await request.json()
  if (!id) return NextResponse.json({ error: "id requis" }, { status: 400 })
  const updated = await updateFormation(id, data)
  if (!updated) return NextResponse.json({ error: "Formation introuvable" }, { status: 404 })
  return NextResponse.json(updated)
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  if (!id) return NextResponse.json({ error: "id requis" }, { status: 400 })
  const ok = await deleteFormation(id)
  if (!ok) return NextResponse.json({ error: "Formation introuvable" }, { status: 404 })
  return NextResponse.json({ success: true })
}
