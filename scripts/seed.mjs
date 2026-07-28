const { createClient } = require("@supabase/supabase-js")

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase env vars")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const testsMeta = [
  { slug: "riasec-junior", titre: "RIASEC Junior", description: "Test d'orientation destiné aux élèves de 12 à 17 ans.", duree_min: 15, cible: "junior" },
  { slug: "riasec-adulte", titre: "RIASEC Adulte & Reconversion", description: "Analyse des intérêts professionnels pour adultes.", duree_min: 20, cible: "adulte" },
  { slug: "interets-professionnels", titre: "Intérêts Professionnels", description: "Évalue vos domaines d'intérêt professionnel.", duree_min: 12, cible: "tout" },
  { slug: "aptitudes-scolaires", titre: "Aptitudes Scolaires", description: "Mesure vos capacités dans différents domaines académiques.", duree_min: 15, cible: "tout" },
  { slug: "styles-apprentissage", titre: "Styles d'Apprentissage", description: "Identifiez votre mode d'apprentissage préféré.", duree_min: 8, cible: "tout" },
  { slug: "intelligences-multiples", titre: "Intelligences Multiples", description: "Basé sur la théorie de Gardner, révèle vos formes d'intelligence dominantes.", duree_min: 12, cible: "tout" },
  { slug: "personnalite", titre: "Test de Personnalité", description: "Explore les grandes dimensions de votre personnalité.", duree_min: 15, cible: "tout" },
]

const riasecDims = ["R", "I", "A", "S", "E", "C"]
const riasecJuniorQ = riasecDims.map((d) => ({ dimension: d, texte: d }))
const riasecAdulteQ = riasecDims.map((d) => ({ dimension: d, texte: d }))

const optionsTemplate = [
  { texte: "Pas du tout", valeur: 1, ordre: 1 },
  { texte: "Un peu", valeur: 2, ordre: 2 },
  { texte: "Moyennement", valeur: 3, ordre: 3 },
  { texte: "Beaucoup", valeur: 4, ordre: 4 },
  { texte: "Passionnément", valeur: 5, ordre: 5 },
]

async function seed() {
  for (const meta of testsMeta) {
    const { data: existing } = await supabase.from("tests").select("id").eq("slug", meta.slug).single()
    if (existing) {
      console.log(`✓ ${meta.slug} already exists`)
      continue
    }

    const { data: test, error } = await supabase
      .from("tests")
      .insert(meta)
      .select("id")
      .single()

    if (error || !test) {
      console.error(`✗ ${meta.slug}: ${error?.message}`)
      continue
    }
    console.log(`✓ ${meta.slug} created (${test.id})`)
  }

  const { data: dimQuestions } = await supabase
    .from("questions")
    .select("id, test_id, dimension")
    .in("test_id", (await supabase.from("tests").select("id").in("slug", ["riasec-junior", "riasec-adulte"])).data?.map(t => t.id) ?? [])

  console.log(`Questions existantes: ${dimQuestions?.length ?? 0}`)
}

seed().catch(console.error)
