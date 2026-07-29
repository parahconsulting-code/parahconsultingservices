import { supabaseAdmin } from "@/lib/supabase/server"

export interface Formation {
  id: string
  title: string
  category: string
  type: string
  duration: string
  mode: string
  modeIcon: string
  description: string
  price: string
  color: string
  image: string | null
  active: boolean
  ordre: number
  created_at?: string
}

interface DbFormation {
  id: string
  title: string
  category: string
  type: string
  duration: string
  mode: string
  mode_icon: string
  description: string
  price: string
  color: string
  image: string | null
  active: boolean
  ordre: number
  created_at?: string
}

function toCamel(db: DbFormation): Formation {
  const { mode_icon, ...rest } = db
  return { ...rest, modeIcon: mode_icon }
}

function toSnake(f: Partial<Formation>): Record<string, unknown> {
  const { modeIcon, ...rest } = f
  return { ...rest, mode_icon: modeIcon }
}

const TABLE = "formations"

export async function getFormations(): Promise<Formation[]> {
  const { data } = await supabaseAdmin.from(TABLE).select("*").order("ordre", { ascending: true })
  return ((data as DbFormation[]) || []).map(toCamel)
}

export async function getFormation(id: string): Promise<Formation | null> {
  const { data } = await supabaseAdmin.from(TABLE).select("*").eq("id", id).single()
  if (!data) return null
  return toCamel(data as DbFormation)
}

export async function createFormation(input: Omit<Formation, "id" | "created_at">): Promise<Formation> {
  const { data } = await supabaseAdmin.from(TABLE).insert(toSnake(input)).select().single()
  return toCamel(data as DbFormation)
}

export async function updateFormation(id: string, input: Partial<Formation>): Promise<Formation | null> {
  const { data } = await supabaseAdmin.from(TABLE).update(toSnake(input)).eq("id", id).select().single()
  if (!data) return null
  return toCamel(data as DbFormation)
}

export async function deleteFormation(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin.from(TABLE).delete().eq("id", id)
  return !error
}
