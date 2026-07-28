import React from "react"
import { renderToStream } from "@react-pdf/renderer"
import { ReportDocument } from "./report"
import type { PdfReportData, PdfSection } from "./types"
import type { TestPassage, Test, Participant } from "@/types"

function getSectionInterpretation(slug: string, scores: Record<string, number>): PdfSection[] {
  const sections: Record<string, PdfSection> = {}

  const top3 = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)

  const dimNames: Record<string, string> = {
    R: "Réaliste", I: "Investigateur", A: "Artistique",
    S: "Social", E: "Entreprenant", C: "Conventionnel",
  }

  if (slug.startsWith("riasec")) {
    const ordered = Object.entries(scores).map(([d, v]) => ({
      label: dimNames[d] || d,
      value: v,
    }))

    const topLabels = top3.map(([d]) => dimNames[d] || d).join(", ")

    sections["riasec"] = {
      heading: "Profil RIASEC",
      paragraphs: [
        `Votre profil RIASEC met en avant les dimensions suivantes : ${topLabels}.`,
        "Le code RIASEC est un modèle qui permet d'identifier vos centres d'intérêt professionnels selon six dimensions.",
      ],
      scores: ordered,
      bullets: [
        `${top3[0] ? "Dimension dominante : " + (dimNames[top3[0][0]] || top3[0][0]) + " (" + Math.round(top3[0][1]) + "%)" : ""}`,
        `${top3[1] ? "Deuxième dimension : " + (dimNames[top3[1][0]] || top3[1][0]) + " (" + Math.round(top3[1][1]) + "%)" : ""}`,
        `${top3[2] ? "Troisième dimension : " + (dimNames[top3[2][0]] || top3[2][0]) + " (" + Math.round(top3[2][1]) + "%)" : ""}`,
      ],
    }
  } else if (slug === "intelligences-multiples") {
    const ordered = Object.entries(scores).map(([label, value]) => ({ label, value }))
    sections["mi"] = {
      heading: "Intelligences Multiples",
      paragraphs: [
        "Vos scores aux huit intelligences multiples révèlent votre profil cognitif unique.",
        "Théorisée par Howard Gardner, cette approche reconnaît que chaque personne possède une combinaison unique d'intelligences.",
      ],
      scores: ordered,
    }
  } else {
    const ordered = Object.entries(scores).map(([label, value]) => ({ label, value }))
    sections["general"] = {
      heading: "Résultats détaillés",
      paragraphs: ["Voici le détail de vos scores pour chaque dimension évaluée."],
      scores: ordered,
    }
  }

  return Object.values(sections)
}

export function buildReportData(
  passage: TestPassage,
  test: Test,
  participant: Participant
): PdfReportData {
  const scores = (passage.scores || {}) as Record<string, number>
  const sectionData = getSectionInterpretation(test.slug, scores)

  return {
    title: "Rapport d'orientation professionnelle",
    subtitle: test.titre,
    candidate_name: `${participant.prenom} ${participant.nom}`,
    date: new Date(passage.created_at || Date.now()).toLocaleDateString("fr-FR"),
    intro_paragraphs: [
      `Ce rapport personnalisé a été généré à la suite du test "${test.titre}" passé par ${participant.prenom} ${participant.nom}.`,
      "Il présente vos résultats sous forme de scores détaillés, accompagnés d'une interprétation pour vous guider dans votre réflexion d'orientation professionnelle.",
    ],
    sections: sectionData,
    synthesis: {
      heading: "Synthèse",
      paragraphs: [
        "Les résultats de ce test constituent une photographie de votre profil à un instant donné. Ils ne sont pas figés et peuvent évoluer avec vos expériences et votre développement personnel.",
        "Nous vous recommandons d'utiliser ces informations comme une base de réflexion pour votre projet d'orientation, en complément d'échanges avec un conseiller.",
      ],
    },
    action_plan: {
      heading: "Plan d'action",
      items: [
        "Explorez les métiers liés à vos dimensions dominantes en consultant des fiches métiers ou en réalisant des stages d'observation.",
        "Discutez de vos résultats avec un conseiller d'orientation pour approfondir l'interprétation.",
        "Identifiez les formations qui correspondent à votre profil et préparez un projet professionnel cohérent.",
        "Repassez ce test dans 6 à 12 mois pour observer l'évolution de votre profil.",
      ],
    },
  }
}

export async function generatePdfBuffer(data: PdfReportData): Promise<Buffer> {
  const stream = await renderToStream(<ReportDocument data={data} />)
  const chunks: Buffer[] = []
  for await (const chunk of stream as unknown as AsyncIterable<Buffer>) {
    chunks.push(chunk)
  }
  return Buffer.concat(chunks)
}
