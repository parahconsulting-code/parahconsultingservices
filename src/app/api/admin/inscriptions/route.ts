import { NextResponse } from "next/server"
import { getInscriptions } from "@/lib/inscriptions-store"

export async function GET() {
  return NextResponse.json(await getInscriptions())
}
