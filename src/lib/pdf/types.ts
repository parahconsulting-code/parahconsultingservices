export interface PdfSectionScore {
  label: string
  value: number
}

export interface PdfSection {
  heading: string
  paragraphs: string[]
  scores?: PdfSectionScore[]
  bullets?: string[]
}

export interface PdfReportData {
  title: string
  subtitle?: string
  candidate_name: string
  date: string
  intro_paragraphs: string[]
  sections: PdfSection[]
  synthesis?: {
    heading?: string
    paragraphs: string[]
  }
  action_plan?: {
    heading?: string
    items: string[]
  }
  disclaimer?: string
}
