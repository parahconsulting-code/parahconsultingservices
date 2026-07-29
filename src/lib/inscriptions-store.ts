import { supabaseAdmin } from "@/lib/supabase/server"

export interface Inscription {
  id: string
  formation: string
  nom: string
  email: string
  telephone: string
  message: string
  created_at: string
}

const TABLE = "inscriptions"

export async function getInscriptions(): Promise<Inscription[]> {
  const { data } = await supabaseAdmin.from(TABLE).select("*").order("created_at", { ascending: false })
  return (data as Inscription[]) || []
}

export async function createInscription(input: Omit<Inscription, "id" | "created_at">): Promise<Inscription> {
  const { data } = await supabaseAdmin.from(TABLE).insert(input).select().single()
  return data as Inscription
}
