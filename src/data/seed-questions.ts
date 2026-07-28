import type { TestSlug } from "./tests-meta"

export interface SeedQuestion {
  texte: string
  ordre: number
  dimension?: string
  options: { texte: string; valeur: number; ordre: number }[]
}

const riasecDimensions = ["R", "I", "A", "S", "E", "C"]
const riasecLabels: Record<string, string> = {
  R: "Réaliste",
  I: "Investigateur",
  A: "Artistique",
  S: "Social",
  E: "Entreprenant",
  C: "Conventionnel",
}

const standardOptions = [
  { texte: "Pas du tout", valeur: 1, ordre: 1 },
  { texte: "Un peu", valeur: 2, ordre: 2 },
  { texte: "Moyennement", valeur: 3, ordre: 3 },
  { texte: "Assez", valeur: 4, ordre: 4 },
  { texte: "Tout à fait", valeur: 5, ordre: 5 },
]

export const seedData: Record<
  TestSlug,
  { questions: SeedQuestion[] }
> = {
  "riasec-junior": {
    questions: [
      ...riasecDimensions.flatMap((dim, di) =>
        Array.from({ length: 10 }, (_, i) => ({
          texte: getRiasecQuestion(dim, i, "junior"),
          ordre: di * 10 + i + 1,
          dimension: dim,
          options: [
            { texte: "Pas du tout", valeur: 1, ordre: 1 },
            { texte: "Un peu", valeur: 2, ordre: 2 },
            { texte: "Moyennement", valeur: 3, ordre: 3 },
            { texte: "Beaucoup", valeur: 4, ordre: 4 },
            { texte: "Passionnément", valeur: 5, ordre: 5 },
          ],
        }))
      ),
    ],
  },
  "riasec-adulte": {
    questions: [
      ...riasecDimensions.flatMap((dim, di) =>
        Array.from({ length: 10 }, (_, i) => ({
          texte: getRiasecQuestion(dim, i, "adulte"),
          ordre: di * 10 + i + 1,
          dimension: dim,
          options: [
            { texte: "Pas du tout intéressant", valeur: 1, ordre: 1 },
            { texte: "Peu intéressant", valeur: 2, ordre: 2 },
            { texte: "Assez intéressant", valeur: 3, ordre: 3 },
            { texte: "Intéressant", valeur: 4, ordre: 4 },
            { texte: "Très intéressant", valeur: 5, ordre: 5 },
          ],
        }))
      ),
    ],
  },
  "interets-professionnels": {
    questions: Array.from({ length: 40 }, (_, i) => ({
      texte: getInterestQuestion(i),
      ordre: i + 1,
      dimension: getInterestDimension(i),
      options: [
        { texte: "Pas intéressé", valeur: 1, ordre: 1 },
        { texte: "Peu intéressé", valeur: 2, ordre: 2 },
        { texte: "Moyennement intéressé", valeur: 3, ordre: 3 },
        { texte: "Intéressé", valeur: 4, ordre: 4 },
        { texte: "Très intéressé", valeur: 5, ordre: 5 },
      ],
    })),
  },
  "aptitudes-scolaires": {
    questions: Array.from({ length: 40 }, (_, i) => ({
      texte: getAptitudeQuestion(i),
      ordre: i + 1,
      dimension: getAptitudeDimension(i),
      options: [
        { texte: "Pas d'accord", valeur: 1, ordre: 1 },
        { texte: "Plutôt pas d'accord", valeur: 2, ordre: 2 },
        { texte: "Neutre", valeur: 3, ordre: 3 },
        { texte: "Plutôt d'accord", valeur: 4, ordre: 4 },
        { texte: "Tout à fait d'accord", valeur: 5, ordre: 5 },
      ],
    })),
  },
  "styles-apprentissage": {
    questions: [
      ...[...Array(8)].map((_, i) => ({
        texte: getStyleQuestion("visuel", i),
        ordre: i + 1,
        dimension: "Visuel",
        options: standardOptions,
      })),
      ...[...Array(8)].map((_, i) => ({
        texte: getStyleQuestion("auditif", i),
        ordre: i + 9,
        dimension: "Auditif",
        options: standardOptions,
      })),
      ...[...Array(8)].map((_, i) => ({
        texte: getStyleQuestion("kinesthesique", i),
        ordre: i + 17,
        dimension: "Kinesthésique",
        options: standardOptions,
      })),
      ...[...Array(8)].map((_, i) => ({
        texte: getStyleQuestion("lecture", i),
        ordre: i + 25,
        dimension: "Lecture/Écriture",
        options: standardOptions,
      })),
    ],
  },
  "intelligences-multiples": {
    questions: [
      ...[...Array(5)].map((_, i) => ({
        texte: getMIQuestion("linguistique", i),
        ordre: i + 1,
        dimension: "Linguistique",
        options: standardOptions,
      })),
      ...[...Array(5)].map((_, i) => ({
        texte: getMIQuestion("logico-math", i),
        ordre: i + 6,
        dimension: "Logico-mathématique",
        options: standardOptions,
      })),
      ...[...Array(5)].map((_, i) => ({
        texte: getMIQuestion("spatiale", i),
        ordre: i + 11,
        dimension: "Spatiale",
        options: standardOptions,
      })),
      ...[...Array(5)].map((_, i) => ({
        texte: getMIQuestion("musicale", i),
        ordre: i + 16,
        dimension: "Musicale",
        options: standardOptions,
      })),
      ...[...Array(5)].map((_, i) => ({
        texte: getMIQuestion("corporelle", i),
        ordre: i + 21,
        dimension: "Corporelle-kinesthésique",
        options: standardOptions,
      })),
      ...[...Array(5)].map((_, i) => ({
        texte: getMIQuestion("interpersonnelle", i),
        ordre: i + 26,
        dimension: "Interpersonnelle",
        options: standardOptions,
      })),
      ...[...Array(5)].map((_, i) => ({
        texte: getMIQuestion("intrapersonnelle", i),
        ordre: i + 31,
        dimension: "Intrapersonnelle",
        options: standardOptions,
      })),
      ...[...Array(5)].map((_, i) => ({
        texte: getMIQuestion("naturaliste", i),
        ordre: i + 36,
        dimension: "Naturaliste",
        options: standardOptions,
      })),
    ],
  },
  personnalite: {
    questions: Array.from({ length: 50 }, (_, i) => ({
      texte: getPersonalityQuestion(i),
      ordre: i + 1,
      dimension: getPersonalityDimension(i),
      options: [
        { texte: "Pas du tout", valeur: 1, ordre: 1 },
        { texte: "Plutôt non", valeur: 2, ordre: 2 },
        { texte: "Neutre", valeur: 3, ordre: 3 },
        { texte: "Plutôt oui", valeur: 4, ordre: 4 },
        { texte: "Tout à fait", valeur: 5, ordre: 5 },
      ],
    })),
  },
}

function getRiasecQuestion(dim: string, i: number, version: string): string {
  const r: Record<string, string[]> = {
    R: version === "junior"
      ? [
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
        ]
      : [
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
    I: version === "junior"
      ? [
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
        ]
      : [
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
    A: version === "junior"
      ? [
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
        ]
      : [
          "Je suis attiré par les métiers créatifs (design, arts, musique...)",
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
    S: version === "junior"
      ? [
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
        ]
      : [
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
    E: version === "junior"
      ? [
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
        ]
      : [
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
    C: version === "junior"
      ? [
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
        ]
      : [
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
  return r[dim]?.[i] ?? "Question par défaut"
}

function getInterestQuestion(i: number): string {
  const questions = [
    "Analyser des données statistiques",
    "Organiser des événements culturels",
    "Travailler dans le secteur médical",
    "Participer à des projets humanitaires",
    "Gérer un budget",
    "Créer des applications mobiles",
    "Enseigner ou former des adultes",
    "Travailler dans l'agriculture",
    "Faire du conseil juridique",
    "Concevoir des campagnes marketing",
    "Travailler dans l'hôtellerie ou le tourisme",
    "Faire de la recherche en laboratoire",
    "Gérer des ressources humaines",
    "Travailler dans les médias ou le journalisme",
    "Faire du commerce international",
    "Travailler dans la protection de l'environnement",
    "Conduire des audits financiers",
    "Créer une entreprise innovante",
    "Travailler dans l'éducation nationale",
    "Exercer un métier d'art (peinture, sculpture...)",
    "Travailler dans la logistique et le transport",
    "Faire de la programmation informatique",
    "Accompagner des personnes en difficulté",
    "Travailler dans le secteur bancaire",
    "Concevoir des sites web",
    "Faire du lobbying ou des relations publiques",
    "Travailler dans le sport professionnel",
    "Exercer la médecine vétérinaire",
    "Faire de l'import-export",
    "Travailler dans le design d'intérieur",
    "Gérer une équipe commerciale",
    "Faire de la traduction ou de l'interprétariat",
    "Travailler dans le secteur énergétique",
    "Exercer un métier artisanal",
    "Faire de la psychologie ou du coaching",
    "Travailler dans l'aéronautique",
    "Gérer des projets de construction",
    "Faire de la communication digitale",
    "Travailler dans le secteur pharmaceutique",
    "Exercer dans la fonction publique",
  ]
  return questions[i] ?? "Question par défaut"
}

function getInterestDimension(i: number): string {
  const dims = [
    "Données", "Culture", "Santé", "Social", "Finance", "Tech",
    "Éducation", "Environnement", "Juridique", "Marketing",
    "Tourisme", "Recherche", "RH", "Média", "Commerce",
    "Environnement", "Finance", "Entrepreneuriat", "Éducation",
    "Art", "Logistique", "Tech", "Social", "Finance", "Tech",
    "Communication", "Sport", "Santé", "Commerce", "Art",
    "Commerce", "Communication", "Énergie", "Artisanat",
    "Social", "Transport", "BTP", "Marketing", "Santé", "Public",
  ]
  return dims[i] ?? "Général"
}

function getAptitudeQuestion(i: number): string {
  const questions = [
    "Je comprends facilement les consignes écrites",
    "Je sais organiser mes idées clairement",
    "J'apprends facilement les langues étrangères",
    "J'ai une bonne mémoire des dates et des faits",
    "Je sais exprimer mes idées à l'oral",
    "Je comprends rapidement les textes complexes",
    "J'ai un bon vocabulaire",
    "Je sais argumenter et défendre un point de vue",
    "La grammaire et l'orthographe me sont faciles",
    "J'aime lire des livres longs et détaillés",
    "Les maths sont faciles pour moi",
    "Je sais résoudre des problèmes logiques",
    "Je comprends rapidement les concepts abstraits",
    "Les jeux de chiffres et d'énigmes me passionnent",
    "Je sais repérer les incohérences dans un raisonnement",
    "Je suis bon en calcul mental",
    "Les sciences (physique, chimie) m'intéressent",
    "Je sais analyser des graphiques et tableaux",
    "J'aime les exercices qui demandent de la réflexion",
    "Je suis à l'aise avec les formules mathématiques",
    "J'ai le sens de l'orientation",
    "Je sais lire des plans et des cartes",
    "Je me souviens bien des visages",
    "J'apprends mieux avec des images ou des schémas",
    "Je sais estimer des distances et des proportions",
    "Je suis attentif aux détails visuels",
    "Je sais organiser des informations dans un tableau",
    "J'ai une bonne coordination œil-main",
    "Je préfère les présentations visuelles",
    "Je sais bien dessiner ou schématiser",
    "Je suis capable de rester concentré longtemps",
    "Je termine toujours ce que je commence",
    "Je gère bien mon temps de travail",
    "Je travaille mieux dans un environnement calme",
    "Je sais classer et organiser mes documents",
    "Je suis discipliné dans mes révisions",
    "Je supporte bien la pression des examens",
    "Je sais travailler en équipe",
    "Je suis persévérant face aux difficultés",
    "Je m'adapte facilement aux changements de planning",
  ]
  return questions[i] ?? "Question par défaut"
}

function getAptitudeDimension(i: number): string {
  if (i < 10) return "Verbal"
  if (i < 20) return "Logico-mathématique"
  if (i < 30) return "Spatiale"
  return "Méthodologique"
}

function getStyleQuestion(style: string, i: number): string {
  const q: Record<string, string[]> = {
    visuel: [
      "Je retiens mieux les informations présentées en schémas ou en graphiques",
      "Je préfère lire des instructions plutôt que les écouter",
      "J'utilise des surligneurs et des couleurs pour étudier",
      "Je me souviens bien des visages des personnes rencontrées",
      "Je préfère les présentations avec des supports visuels",
      "Je note ou dessine pendant que j'écoute",
      "Je visualise mentalement les informations pour les retenir",
      "L'ordre et la présentation visuelle sont importants pour moi",
    ],
    auditif: [
      "Je retiens mieux ce que j'entends en cours",
      "Je préfère écouter un podcast plutôt que lire un article",
      "J'apprends en répétant à voix haute",
      "Je me souviens bien des noms mais moins des visages",
      "Je préfère les explications orales aux consignes écrites",
      "Je suis sensible aux intonations et au rythme de la voix",
      "Je participe volontiers aux discussions et débats",
      "J'aime travailler en musique ou en fond sonore",
    ],
    kinesthesique: [
      "J'apprends mieux en faisant des activités pratiques",
      "Je bouge ou me déplace quand je réfléchis",
      "Je préfère les expériences concrètes aux théories",
      "J'ai besoin de manipuler des objets pour comprendre",
      "Je retiens mieux ce que j'ai vécu physiquement",
      "Je n'aime pas rester assis trop longtemps",
      "J'apprends par la pratique et l'expérimentation",
      "Les jeux de rôle et simulations m'aident à apprendre",
    ],
    "lecture": [
      "Je préfère lire des livres et articles détaillés",
      "J'apprends mieux en prenant des notes écrites",
      "Je relis mes notes plusieurs fois pour mémoriser",
      "Je préfère les consignes écrites détaillées",
      "J'aime faire des listes et des résumés",
      "Je cherche des informations complémentaires par écrit",
      "Je souligne ou surligne les passages importants",
      "Je retiens mieux ce que j'écris à la main",
    ],
  }
  return q[style]?.[i] ?? "Question par défaut"
}

function getMIQuestion(dimension: string, i: number): string {
  const q: Record<string, string[]> = {
    linguistique: [
      "J'aime lire des livres variés (romans, essais, articles)",
      "J'ai un bon vocabulaire et je m'exprime avec précision",
      "J'écris facilement et j'aime raconter des histoires",
      "J'apprécie les jeux de mots et les calembours",
      "Je retiens facilement des citations ou des paroles de chansons",
    ],
    "logico-math": [
      "Je résous facilement des problèmes logiques",
      "Je suis attiré par les chiffres et les calculs",
      "J'aime classer, catégoriser et trouver des patterns",
      "Je raisonne de façon structurée et séquentielle",
      "Je suis curieux des causes et conséquences des phénomènes",
    ],
    spatiale: [
      "J'ai le sens de l'orientation et je lis bien les cartes",
      "Je visualise facilement les objets en 3D",
      "J'aime le dessin, la peinture ou la photographie",
      "Je remarque les détails visuels que d'autres ne voient pas",
      "Je préfère les instructions avec schémas plutôt que du texte",
    ],
    musicale: [
      "Je reconnais facilement les mélodies et les rythmes",
      "Je joue d'un instrument ou j'aime chanter",
      "Je me souviens des paroles des chansons facilement",
      "Je suis sensible aux bruits ambiants et aux sonorités",
      "Le rythme et les répétitions m'aident à mémoriser",
    ],
    corporelle: [
      "J'ai une bonne coordination et je bouge avec aisance",
      "J'apprends mieux en faisant des choses physiquement",
      "Je pratique régulièrement un sport ou une activité physique",
      "Je m'exprime avec mes mains et mon corps",
      "J'ai une bonne mémoire musculaire (gestes, mouvements)",
    ],
    interpersonnelle: [
      "Je comprends facilement les émotions des autres",
      "J'aime travailler en groupe et collaborer",
      "Je sais écouter et conseiller les personnes autour de moi",
      "Je suis à l'aise dans les nouvelles rencontres",
      "Je sais gérer les conflits et trouver des compromis",
    ],
    intrapersonnelle: [
      "Je connais mes forces et mes faiblesses",
      "J'aime réfléchir seul et prendre du recul",
      "Je suis autonome dans mon apprentissage",
      "Je tiens un journal ou je réfléchis régulièrement à mes objectifs",
      "Je suis capable de me fixer des objectifs et de les suivre",
    ],
    naturaliste: [
      "Je suis sensible à la nature et aux animaux",
      "Je sais reconnaître différentes espèces (plantes, animaux)",
      "J'aime jardiner, faire des randonnées ou observer la nature",
      "Je m'intéresse aux questions environnementales",
      "Je préfère les activités en extérieur",
    ],
  }
  return q[dimension]?.[i] ?? "Question par défaut"
}

function getPersonalityQuestion(i: number): string {
  const questions = [
    "J'aime être au centre de l'attention",
    "Je préfère travailler en groupe plutôt que seul",
    "Je suis généralement optimiste et de bonne humeur",
    "Je prends facilement des décisions",
    "Je suis souvent en avance aux rendez-vous",
    "Je préfère suivre un planning structuré",
    "Je suis sensible aux critiques",
    "J'ai tendance à stresser facilement",
    "Je préfère les situations familières aux nouveautés",
    "Je fais confiance facilement aux autres",
    "J'ai besoin de tout planifier à l'avance",
    "Je suis spontané et j'aime l'imprévu",
    "Je termine ce que je commence",
    "Je suis facilement distrait par mon environnement",
    "Je préfère les conversations profondes aux bavardages",
    "Je suis à l'aise pour parler en public",
    "J'aime prendre des risques",
    "Je suis perfectionniste dans mon travail",
    "Je préfère écouter plutôt que parler",
    "Je suis sensible à l'humeur des autres",
    "J'ai besoin de temps seul pour me ressourcer",
    "Je suis compétitif et j'aime gagner",
    "Je suis indulgent avec mes erreurs",
    "J'aime essayer de nouvelles expériences",
    "Je préfère la stabilité à l'aventure",
    "Je suis souvent préoccupé par l'avenir",
    "Je réagis rapidement aux situations d'urgence",
    "Je suis diplomate dans mes relations",
    "J'ai une grande confiance en moi",
    "Je préfère la théorie à la pratique",
    "Je suis méticuleux et organisé",
    "Je m'ennuie facilement dans la routine",
    "Je suis loyal envers mes collègues et amis",
    "J'exprime facilement mes émotions",
    "Je préfère réfléchir avant d'agir",
    "Je suis curieux de tout",
    "Je supporte mal l'injustice",
    "Je suis flexible et m'adapte facilement",
    "Je suis exigeant avec moi-même",
    "Je me laisse facilement influencer",
    "Je préfère les missions claires et précises",
    "Je suis créatif et imaginatif",
    "Je suis plutôt réservé en société",
    "Je sais garder mon calme sous pression",
    "Je préfère les relations stables et durables",
    "Je suis ambitieux dans mes projets",
    "J'ai besoin d'être rassuré régulièrement",
    "Je suis ouvert aux critiques constructives",
    "Je préfère travailler à mon propre rythme",
    "Je suis reconnaissant pour ce que j'ai",
  ]
  return questions[i] ?? "Question par défaut"
}

function getPersonalityDimension(i: number): string {
  if (i < 10) return "Extraversion"
  if (i < 20) return "Conscience"
  if (i < 30) return "Neuroticisme"
  if (i < 40) return "Ouverture"
  return "Agréabilité"
}
