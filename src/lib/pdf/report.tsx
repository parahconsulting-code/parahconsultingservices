import { Document, Page, View, Text } from "@react-pdf/renderer"
import { styles, NAVY, TEAL, ACCENT, LIGHT_GREY, MID_GREY } from "./styles"
import { HorizontalBarChart } from "./chart"
import type { PdfReportData } from "./types"

function Footer({ pageNumber, totalPages }: { pageNumber: number; totalPages: number }) {
  if (pageNumber <= 1) return null
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Rapport d'orientation professionnelle</Text>
      <Text style={styles.footerText}>Page {pageNumber - 1} / {totalPages - 1}</Text>
    </View>
  )
}

export function ReportDocument({ data }: { data: PdfReportData }) {
  return (
    <Document title={data.title}>
      {/* Cover */}
      <Page size="A4" style={[styles.page, styles.coverPage]}>
        <Text style={styles.coverTitle}>{data.title}</Text>
        {data.subtitle && <Text style={styles.coverSubtitle}>{data.subtitle}</Text>}
        <View style={{ height: 24 }} />
        <Text style={styles.coverMeta}>Préparé pour : {data.candidate_name}</Text>
        <Text style={styles.coverMeta}>Date : {data.date}</Text>
      </Page>

      {/* TOC */}
      <Page size="A4" style={styles.page} wrap>
        <Text style={styles.sectionHeading}>Sommaire</Text>
        <View style={styles.hr} />
        {[
          "Introduction",
          ...data.sections.map((s) => s.heading),
          ...(data.synthesis ? [data.synthesis.heading || "Synthèse croisée"] : []),
          ...(data.action_plan ? [data.action_plan.heading || "Plan d'action"] : []),
          "Limites et accompagnement",
        ].map((entry, i) => (
          <Text key={i} style={styles.tocEntry}>{i + 1}. {entry}</Text>
        ))}
        <Footer pageNumber={2} totalPages={99} />
      </Page>

      {/* Introduction */}
      <Page size="A4" style={styles.page} wrap>
        <Text style={styles.sectionHeading}>Introduction</Text>
        {data.intro_paragraphs.map((p, i) => (
          <Text key={i} style={styles.bodyText}>{p}</Text>
        ))}
        <Footer pageNumber={3} totalPages={99} />
      </Page>

      {/* Sections */}
      {data.sections.map((section, si) => (
        <Page key={si} size="A4" style={styles.page} wrap>
          <Text style={styles.sectionHeading}>{section.heading}</Text>
          {section.paragraphs.map((p, pi) => (
            <Text key={pi} style={styles.bodyText}>{p}</Text>
          ))}
          {section.scores && section.scores.length > 0 && (
            <HorizontalBarChart data={section.scores} />
          )}
          {section.bullets && section.bullets.length > 0 && (
            <View style={{ marginTop: 8 }}>
              {section.bullets.map((b, bi) => (
                <View key={bi} style={styles.bullet}>
                  <View style={[styles.bulletDot, { backgroundColor: TEAL }]} />
                  <Text style={[styles.bodyText, { flex: 1, marginBottom: 0 }]}>{b}</Text>
                </View>
              ))}
            </View>
          )}
          <Footer pageNumber={99} totalPages={99} />
        </Page>
      ))}

      {/* Synthesis */}
      {data.synthesis && (
        <Page size="A4" style={styles.page} wrap>
          <Text style={styles.sectionHeading}>{data.synthesis.heading || "Synthèse croisée"}</Text>
          {data.synthesis.paragraphs.map((p, i) => (
            <Text key={i} style={styles.bodyText}>{p}</Text>
          ))}
          <Footer pageNumber={99} totalPages={99} />
        </Page>
      )}

      {/* Action plan */}
      {data.action_plan && (
        <Page size="A4" style={styles.page} wrap>
          <Text style={styles.sectionHeading}>{data.action_plan.heading || "Plan d'action"}</Text>
          {data.action_plan.items.map((item, i) => (
            <View key={i} style={styles.bullet}>
              <View style={[styles.bulletDot, { backgroundColor: ACCENT }]} />
              <Text style={[styles.bodyText, { flex: 1, marginBottom: 0 }]}>{item}</Text>
            </View>
          ))}
          <Footer pageNumber={99} totalPages={99} />
        </Page>
      )}

      {/* Disclaimer */}
      <Page size="A4" style={styles.page} wrap>
        <Text style={styles.sectionHeading}>Limites et accompagnement</Text>
        <Text style={styles.disclaimer}>
          {data.disclaimer || "Ce rapport s'appuie sur des tests d'auto-évaluation à visée d'orientation. Il constitue un outil de réflexion et de dialogue, pas un verdict définitif. Pour une décision d'orientation importante, l'accompagnement d'un conseiller d'orientation ou d'un psychologue du travail est recommandé."}
        </Text>
        <Footer pageNumber={99} totalPages={99} />
      </Page>
    </Document>
  )
}
