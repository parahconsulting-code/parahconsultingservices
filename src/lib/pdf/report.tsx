import { Document, Page, View, Text } from "@react-pdf/renderer"
import { styles, NAVY, GOLD, COMPANY_NAME, COMPANY_ADDRESS, COMPANY_CITY, COMPANY_EMAIL, COMPANY_PHONE } from "./styles"
import { HorizontalBarChart } from "./chart"
import type { PdfReportData } from "./types"

function PageHeader({ title }: { title: string }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{COMPANY_NAME}</Text>
      <Text style={styles.headerSubtext}>{title}</Text>
    </View>
  )
}

function PageFooter({ pageNumber, totalPages }: { pageNumber: number; totalPages: number }) {
  if (pageNumber <= 1) return null
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>{COMPANY_NAME} · {COMPANY_CITY}</Text>
      <Text style={styles.footerText}>Page {pageNumber - 1} / {totalPages - 1}</Text>
    </View>
  )
}

function InnerPage({ children, title, pageNumber, totalPages }: { children: React.ReactNode; title: string; pageNumber: number; totalPages: number }) {
  return (
    <Page size="A4" style={styles.page} wrap>
      <PageHeader title={title} />
      <View style={{ marginTop: "1.2cm" }}>
        {children}
      </View>
      <PageFooter pageNumber={pageNumber} totalPages={totalPages} />
    </Page>
  )
}

export function ReportDocument({ data }: { data: PdfReportData }) {
  const allPages = [
    "cover",
    "toc",
    "intro",
    ...data.sections.map(() => "section"),
    ...(data.synthesis ? ["synthesis"] : []),
    ...(data.action_plan ? ["action_plan"] : []),
    "disclaimer",
    "contact",
  ]
  const totalPages = allPages.length

  return (
    <Document title={data.title}>
      {/* Cover */}
      <Page size="A4" style={[styles.page, styles.coverPage]}>
        <Text style={styles.coverMonogram}>P</Text>
        <Text style={styles.coverTitle}>{data.title}</Text>
        {data.subtitle && <Text style={styles.coverSubtitle}>{data.subtitle}</Text>}
        <View style={{ height: 16 }} />
        <Text style={styles.coverMeta}>Préparé pour : {data.candidate_name}</Text>
        <Text style={styles.coverMeta}>Date : {data.date}</Text>
        <View style={styles.coverFooter}>
          <Text style={styles.coverFooterText}>{COMPANY_NAME}</Text>
          <Text style={[styles.coverFooterText, { fontSize: 8, opacity: 0.8 }]}>{COMPANY_ADDRESS}</Text>
          <Text style={[styles.coverFooterText, { fontSize: 8, opacity: 0.8 }]}>{COMPANY_CITY} · {COMPANY_EMAIL} · {COMPANY_PHONE}</Text>
        </View>
      </Page>

      {/* TOC */}
      <InnerPage title={data.title} pageNumber={2} totalPages={totalPages}>
        <Text style={styles.sectionHeading}>Sommaire</Text>
        <View style={styles.hr} />
        <View style={styles.tocTable}>
          {[
            "Introduction",
            ...data.sections.map((s) => s.heading),
            ...(data.synthesis ? [data.synthesis.heading || "Synthèse croisée"] : []),
            ...(data.action_plan ? [data.action_plan.heading || "Plan d'action"] : []),
            "Limites et accompagnement",
            "Coordonnées",
          ].map((entry, i) => (
            <View key={i} style={styles.tocRow}>
              <Text style={styles.tocNum}>{i + 1}.</Text>
              <Text style={styles.tocLabel}>{entry}</Text>
            </View>
          ))}
        </View>
      </InnerPage>

      {/* Introduction */}
      <InnerPage title={data.title} pageNumber={3} totalPages={totalPages}>
        <Text style={styles.sectionHeading}>Introduction</Text>
        {data.intro_paragraphs.map((p, i) => (
          <Text key={i} style={styles.bodyText}>{p}</Text>
        ))}
      </InnerPage>

      {/* Sections */}
      {data.sections.map((section, si) => (
        <InnerPage key={si} title={data.title} pageNumber={4 + si} totalPages={totalPages}>
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
                  <View style={[styles.bulletDot, { backgroundColor: GOLD }]} />
                  <Text style={[styles.bodyText, { flex: 1, marginBottom: 0 }]}>{b}</Text>
                </View>
              ))}
            </View>
          )}
        </InnerPage>
      ))}

      {/* Synthesis */}
      {data.synthesis && (
        <InnerPage title={data.title} pageNumber={99} totalPages={totalPages}>
          <Text style={styles.sectionHeading}>{data.synthesis.heading || "Synthèse croisée"}</Text>
          {data.synthesis.paragraphs.map((p, i) => (
            <Text key={i} style={styles.bodyText}>{p}</Text>
          ))}
        </InnerPage>
      )}

      {/* Action plan */}
      {data.action_plan && (
        <InnerPage title={data.title} pageNumber={99} totalPages={totalPages}>
          <Text style={styles.sectionHeading}>{data.action_plan.heading || "Plan d'action"}</Text>
          {data.action_plan.items.map((item, i) => (
            <View key={i} style={styles.bullet}>
              <View style={[styles.bulletDot, { backgroundColor: GOLD }]} />
              <Text style={[styles.bodyText, { flex: 1, marginBottom: 0 }]}>{item}</Text>
            </View>
          ))}
        </InnerPage>
      )}

      {/* Disclaimer */}
      <InnerPage title={data.title} pageNumber={99} totalPages={totalPages}>
        <Text style={styles.sectionHeading}>Limites et accompagnement</Text>
        <Text style={styles.disclaimer}>
          {data.disclaimer || "Ce rapport s'appuie sur des tests d'auto-évaluation à visée d'orientation. Il constitue un outil de réflexion et de dialogue, pas un verdict définitif. Pour une décision d'orientation importante, l'accompagnement d'un conseiller d'orientation ou d'un psychologue du travail est recommandé."}
        </Text>
      </InnerPage>

      {/* Contact page */}
      <InnerPage title={data.title} pageNumber={99} totalPages={totalPages}>
        <Text style={styles.sectionHeading}>Coordonnées et accompagnement personnalisé</Text>
        <Text style={styles.bodyText}>
          Pour approfondir vos résultats et bénéficier d'un accompagnement personnalisé dans votre réflexion d'orientation, n'hésitez pas à contacter nos conseillers.
        </Text>
        <View style={styles.contactBlock}>
          <Text style={styles.contactLabel}>Cabinet</Text>
          <Text style={styles.contactLine}>{COMPANY_NAME}</Text>
          <View style={{ height: 8 }} />
          <Text style={styles.contactLabel}>Adresse</Text>
          <Text style={styles.contactLine}>{COMPANY_ADDRESS}</Text>
          <Text style={styles.contactLine}>{COMPANY_CITY}</Text>
          <View style={{ height: 8 }} />
          <Text style={styles.contactLabel}>Email</Text>
          <Text style={styles.contactLine}>{COMPANY_EMAIL}</Text>
          <View style={{ height: 8 }} />
          <Text style={styles.contactLabel}>Téléphone</Text>
          <Text style={styles.contactLine}>{COMPANY_PHONE}</Text>
        </View>
        <Text style={[styles.bodyText, { marginTop: 16 }]}>
          Nos experts sont à votre écoute pour analyser vos besoins et vous guider vers les solutions les mieux adaptées à votre profil.
        </Text>
      </InnerPage>
    </Document>
  )
}
