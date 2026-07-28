const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
  "https://mreyyaaroaooyrlwovsl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yZXl5YWFyb2Fvb3lybHdvdnNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxNTEwOTUsImV4cCI6MjEwMDcyNzA5NX0.bSPERn0io6fz2IwK-sk39Cyy1Hg5fZ5IwaRQ_2afUXU"
)

const testsMeta = [
  { slug: "riasec-junior", titre: "RIASEC Junior", description: "Test d'orientation destiné aux élèves de 12 à 17 ans.", duree_min: 15, cible: "junior" },
  { slug: "riasec-adulte", titre: "RIASEC Adulte & Reconversion", description: "Analyse des intérêts professionnels pour adultes.", duree_min: 20, cible: "adulte" },
  { slug: "interets-professionnels", titre: "Intérêts Professionnels", description: "Évalue vos domaines d'intérêt professionnel.", duree_min: 12, cible: "tout" },
  { slug: "aptitudes-scolaires", titre: "Aptitudes Scolaires", description: "Mesure vos capacités académiques.", duree_min: 15, cible: "tout" },
  { slug: "styles-apprentissage", titre: "Styles d'Apprentissage", description: "Identifiez votre mode d'apprentissage préféré.", duree_min: 8, cible: "tout" },
  { slug: "intelligences-multiples", titre: "Intelligences Multiples", description: "Théorie de Gardner, 8 intelligences.", duree_min: 12, cible: "tout" },
  { slug: "personnalite", titre: "Test de Personnalité", description: "Explorez les dimensions de votre personnalité.", duree_min: 15, cible: "tout" },
]

async function seed() {
  for (const m of testsMeta) {
    const { data: existing } = await supabase.from("tests").select("id").eq("slug", m.slug).single()
    if (!existing) {
      const { data, error } = await supabase.from("tests").insert(m).select("id").single()
      if (error) console.log("Error:", m.slug, error.message)
      else console.log("Created:", m.slug)
    } else {
      console.log("Exists:", m.slug)
    }
  }

  const { data: tests } = await supabase.from("tests").select("id, slug")
  for (const t of tests || []) {
    const { count } = await supabase
      .from("questions")
      .select("*", { count: "exact", head: true })
      .eq("test_id", t.id)
    console.log(t.slug + ": " + (count ?? 0) + " questions")
  }
}

seed().catch(console.error)
