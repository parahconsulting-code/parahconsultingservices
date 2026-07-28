export interface Participant {
  id: string
  nom: string
  prenom: string
  profession?: string | null
  niveau_etude?: string | null
  telephone?: string | null
  email?: string | null
  created_at: string
}

export interface Test {
  id: string
  slug: string
  titre: string
  description?: string | null
  duree_min?: number | null
  cible?: string | null
}

export interface Question {
  id: string
  test_id: string
  texte: string
  ordre: number
  dimension?: string | null
  options: QuestionOption[]
}

export interface QuestionOption {
  id: string
  question_id: string
  texte: string
  valeur: number
  ordre: number
}

export interface TestPassage {
  id: string
  participant_id: string
  test_id: string
  scores: Record<string, number>
  interpretation?: string | null
  token_acces?: string | null
  created_at: string
}

export interface Reponse {
  id: string
  passage_id: string
  question_id: string
  option_id: string
}
