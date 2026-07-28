const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
  "https://mreyyaaroaooyrlwovsl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yZXl5YWFyb2Fvb3lybHdvdnNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxNTEwOTUsImV4cCI6MjEwMDcyNzA5NX0.bSPERn0io6fz2IwK-sk39Cyy1Hg5fZ5IwaRQ_2afUXU"
)

const DIMS = ["R", "I", "A", "S", "E", "C"]
const opts = [
  { texte: "Pas du tout", valeur: 1, ordre: 1 },
  { texte: "Un peu", valeur: 2, ordre: 2 },
  { texte: "Moyennement", valeur: 3, ordre: 3 },
  { texte: "Beaucoup", valeur: 4, ordre: 4 },
  { texte: "Passionnément", valeur: 5, ordre: 5 },
]

const riasecJuniorLabels = {
  R: [
    "J'aime bricoler ou réparer des objets",
    "Je préfère les activités en extérieur",
    "J'aime comprendre comment fonctionnent les machines",
    "Je suis habile de mes mains",
    "J'aime construire ou assembler des choses",
    "Je préfère les exercices concrets aux théories",
    "J'aime travailler avec des outils",
    "Je suis attiré par les métiers techniques",
    "J'aime les activités manuelles",
    "Je préfère manipuler que réfléchir abstraitement",
  ],
  I: [
    "J'aime résoudre des énigmes et des problèmes",
    "Je suis curieux, je pose beaucoup de questions",
    "J'aime faire des expériences scientifiques",
    "Je préfère comprendre le pourquoi des choses",
    "J'aime lire des documentaires",
    "Je suis passionné par les découvertes",
    "J'aime analyser les situations",
    "Je préfère les jeux de réflexion",
    "Je suis attentif aux détails",
    "J'aime faire des recherches sur des sujets variés",
  ],
  A: [
    "J'aime dessiner, peindre ou créer",
    "J'ai beaucoup d'imagination",
    "J'aime la musique, le théâtre ou la danse",
    "Je préfère les activités créatives",
    "J'exprime souvent mes idées de façon originale",
    "J'aime décorer et organiser mon espace",
    "Je suis sensible à la beauté et à l'esthétique",
    "J'aime écrire des histoires ou des poèmes",
    "Je préfère les projets libres sans consignes strictes",
    "Je suis attiré par les arts visuels",
  ],
  S: [
    "J'aime aider les autres",
    "Je suis à l'écoute de mes camarades",
    "Je préfère le travail en équipe",
    "Je suis sensible aux sentiments des autres",
    "J'aime expliquer les choses à mes camarades",
    "Je me sens bien quand je rends service",
    "Je suis patient avec les autres",
    "J'aime participer à des projets solidaires",
    "Je préfère les activités de groupe",
    "Je suis attentif au bien-être des autres",
  ],
  E: [
    "J'aime être le chef d'équipe",
    "Je n'ai pas peur de prendre des risques",
    "J'aime convaincre les autres",
    "Je suis ambitieux dans mes projets",
    "Je préfère diriger plutôt que suivre",
    "J'aime organiser des événements",
    "Je sais prendre des décisions rapidement",
    "J'aime les compétitions et les défis",
    "Je suis dynamique et énergique",
    "Je préfère créer mon propre projet",
  ],
  C: [
    "J'aime que les choses soient bien rangées",
    "Je suis attentif aux consignes",
    "J'aime suivre des procédures précises",
    "Je suis méthodique dans mon travail",
    "J'aime vérifier et corriger les erreurs",
    "Je suis organisé et discipliné",
    "Je préfère les exercices avec des règles claires",
    "Je suis patient dans les tâches répétitives",
    "J'aime travailler avec des chiffres",
    "Je préfère les consignes détaillées",
  ],
}

const riasecAdulteLabels = {
  R: [
    "J'aime les métiers où je travaille avec mes mains",
    "Je préfère les solutions concrètes aux théories",
    "Je suis attiré par les environnements techniques",
    "Je suis à l'aise avec les outils et équipements",
    "J'aime les activités en extérieur",
    "Je préfère les tâches tangibles aux concepts abstraits",
    "J'apprécie le travail physique",
    "Je suis intéressé par l'agriculture ou le BTP",
    "J'aime comprendre le fonctionnement mécanique des choses",
    "Je préfère un travail structuré avec des résultats visibles",
  ],
  I: [
    "J'aime analyser des données et tirer des conclusions",
    "Je suis curieux intellectuellement",
    "J'apprécie la recherche et l'innovation",
    "Je préfère les métiers où il faut résoudre des problèmes complexes",
    "Je suis attiré par les environnements de laboratoire",
    "J'aime comprendre les causes profondes des phénomènes",
    "Je lis régulièrement des articles scientifiques ou techniques",
    "Je suis méthodique dans mon approche des problèmes",
    "J'aime les défis intellectuels",
    "Je préfère les carrières dans la science ou la technologie",
  ],
  A: [
    "Je suis attiré par les métiers créatifs",
    "J'exprime mes idées de façon créative",
    "J'apprécie les environnements de travail flexibles",
    "Je suis sensible à l'esthétique et au design",
    "J'aime les projets qui me permettent d'innover",
    "Je préfère éviter les tâches trop répétitives",
    "Je suis attiré par l'écriture ou la communication",
    "Je valorise l'originalité et la liberté d'expression",
    "J'aime travailler sans contraintes hiérarchiques strictes",
    "Je suis intéressé par les métiers artistiques",
  ],
  S: [
    "J'aime conseiller, former ou accompagner les autres",
    "Je suis empathique et à l'écoute",
    "Je préfère les métiers où j'ai un impact social",
    "Je suis attiré par l'enseignement ou la formation",
    "Je privilégie le travail en équipe",
    "Je suis sensible aux problèmes des autres",
    "J'aime les métiers dans la santé ou le social",
    "Je suis patient dans les relations humaines",
    "Je valorise la coopération",
    "Je suis intéressé par les RH ou le coaching",
  ],
  E: [
    "J'aime diriger et prendre des initiatives",
    "Je suis ambitieux dans ma carrière",
    "Je n'ai pas peur de prendre des risques calculés",
    "J'aime négocier et convaincre",
    "Je préfère être mon propre patron",
    "Je suis attiré par la vente ou le management",
    "Je suis dynamique et j'aime entreprendre",
    "Je sais motiver les équipes",
    "Je suis intéressé par la création d'entreprise",
    "Je préfère les environnements compétitifs",
  ],
  C: [
    "J'aime organiser et structurer les informations",
    "Je suis rigoureux dans mon travail",
    "Je préfère les tâches claires et bien définies",
    "J'apprécie le travail administratif",
    "Je suis précis et méthodique",
    "Je suis attiré par la comptabilité ou la finance",
    "Je préfère suivre des procédures établies",
    "Je suis à l'aise avec les chiffres et les données",
    "Je valorise la stabilité et la sécurité",
    "Je suis intéressé par la gestion administrative",
  ],
}

async function seedQuestionsForTest(slug, questionsByDim, fetchExisting) {
  const { data: test } = await supabase.from("tests").select("id").eq("slug", slug).single()
  if (!test) {
    console.log(`Test ${slug} not found`)
    return
  }

  if (fetchExisting) {
    const { data: existing } = await supabase.from("questions").select("id").eq("test_id", test.id)
    for (const q of existing || []) {
      await supabase.from("question_options").delete().eq("question_id", q.id)
    }
    await supabase.from("questions").delete().eq("test_id", test.id)
  }

  let order = 0
  for (const dim of Object.keys(questionsByDim)) {
    for (const texte of questionsByDim[dim]) {
      order++
      const { data: q, error: qe } = await supabase
        .from("questions")
        .insert({ test_id: test.id, texte, ordre: order, dimension: dim })
        .select("id")
        .single()

      if (qe) {
        console.log(`Error inserting question for ${slug}/${dim}: ${qe.message}`)
        continue
      }

      const { error: oe } = await supabase.from("question_options").insert(
        opts.map((o) => ({ question_id: q.id, ...o }))
      )
      if (oe) console.log(`Error inserting options: ${oe.message}`)
    }
  }
  console.log(`${slug}: ${order} questions seeded`)
}

async function seedInterets() {
  const { data: test } = await supabase.from("tests").select("id").eq("slug", "interets-professionnels").single()
  if (!test) return
  await supabase.from("questions").delete().eq("test_id", test.id)

  const qs = [
    "Analyser des données statistiques", "Organiser des événements culturels",
    "Travailler dans le secteur médical", "Participer à des projets humanitaires",
    "Gérer un budget", "Créer des applications mobiles",
    "Enseigner ou former des adultes", "Travailler dans l'agriculture",
    "Faire du conseil juridique", "Concevoir des campagnes marketing",
    "Travailler dans l'hôtellerie", "Faire de la recherche en laboratoire",
    "Gérer des ressources humaines", "Travailler dans les médias ou le journalisme",
    "Faire du commerce international", "Travailler dans la protection de l'environnement",
    "Conduire des audits financiers", "Créer une entreprise innovante",
    "Travailler dans l'éducation nationale", "Exercer un métier d'art",
    "Travailler dans la logistique", "Faire de la programmation informatique",
    "Accompagner des personnes en difficulté", "Travailler dans le secteur bancaire",
    "Concevoir des sites web", "Faire du lobbying ou des relations publiques",
    "Travailler dans le sport professionnel", "Exercer la médecine vétérinaire",
    "Faire de l'import-export", "Travailler dans le design d'intérieur",
    "Gérer une équipe commerciale", "Faire de la traduction",
    "Travailler dans le secteur énergétique", "Exercer un métier artisanal",
    "Faire de la psychologie ou du coaching", "Travailler dans l'aéronautique",
    "Gérer des projets de construction", "Faire de la communication digitale",
    "Travailler dans le secteur pharmaceutique", "Exercer dans la fonction publique",
  ]

  for (let i = 0; i < qs.length; i++) {
    const { data: q } = await supabase
      .from("questions")
      .insert({ test_id: test.id, texte: qs[i], ordre: i + 1 })
      .select("id")
      .single()
    if (q) {
      await supabase.from("question_options").insert(
        opts.map((o) => ({ question_id: q.id, ...o }))
      )
    }
  }
  console.log(`interets-professionnels: ${qs.length} questions seeded`)
}

async function main() {
  await seedQuestionsForTest("riasec-junior", riasecJuniorLabels, true)
  await seedQuestionsForTest("riasec-adulte", riasecAdulteLabels, true)
  await seedInterets()
  
  const { data: tests } = await supabase.from("tests").select("id, slug")
  for (const t of tests || []) {
    const { count } = await supabase
      .from("questions")
      .select("*", { count: "exact", head: true })
      .eq("test_id", t.id)
    console.log(`  ${t.slug}: ${count} questions`)
  }
}

main().catch(console.error)
