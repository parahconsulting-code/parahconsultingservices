export type TestSlug =
  | "riasec-junior"
  | "riasec-adulte"
  | "interets-professionnels"
  | "aptitudes-scolaires"
  | "styles-apprentissage"
  | "intelligences-multiples"
  | "personnalite"

export interface TestMeta {
  slug: TestSlug
  titre: string
  description: string
  duree_min: number
  cible: string
}

export const testsMeta: TestMeta[] = [
  {
    slug: "riasec-junior",
    titre: "RIASEC Junior",
    description: "Test d'orientation destiné aux élèves de 12 à 17 ans. Identifie les centres d'intérêt selon le modèle de Holland (R,I,A,S,E,C).",
    duree_min: 15,
    cible: "junior",
  },
  {
    slug: "riasec-adulte",
    titre: "RIASEC Adulte & Reconversion",
    description: "Analyse des intérêts professionnels pour adultes en reconversion. Basé sur le modèle de Holland adapté aux profils expérimentés.",
    duree_min: 20,
    cible: "adulte",
  },
  {
    slug: "interets-professionnels",
    titre: "Intérêts Professionnels",
    description: "Évalue vos domaines d'intérêt professionnel parmi 12 secteurs d'activité pour affiner votre projet de carrière.",
    duree_min: 12,
    cible: "tout",
  },
  {
    slug: "aptitudes-scolaires",
    titre: "Aptitudes Scolaires",
    description: "Mesure vos capacités dans différents domaines académiques : logique, langage, abstraction, mémoire, etc.",
    duree_min: 15,
    cible: "tout",
  },
  {
    slug: "styles-apprentissage",
    titre: "Styles d'Apprentissage",
    description: "Identifiez votre mode d'apprentissage préféré (visuel, auditif, kinesthésique, lecture/écriture) pour optimiser vos révisions.",
    duree_min: 8,
    cible: "tout",
  },
  {
    slug: "intelligences-multiples",
    titre: "Intelligences Multiples",
    description: "Basé sur la théorie de Gardner (8 intelligences), ce test révèle vos formes d'intelligence dominantes.",
    duree_min: 12,
    cible: "tout",
  },
  {
    slug: "personnalite",
    titre: "Test de Personnalité",
    description: "Explore les grandes dimensions de votre personnalité pour mieux comprendre vos comportements en milieu professionnel.",
    duree_min: 15,
    cible: "tout",
  },
]
