"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ProgressBar } from "@/components/tests/progress-bar"
import { QuestionCard } from "@/components/tests/question-card"
import { testsMeta } from "@/data/tests-meta"
import type { Test, Question } from "@/types"

export default function TestPage() {
  const { slug } = useParams<{ slug: string }>()
  const router = useRouter()
  const meta = testsMeta.find((t) => t.slug === slug)

  const [test, setTest] = useState<Test | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [form, setForm] = useState({ nom: "", prenom: "", profession: "", niveau_etude: "", telephone: "", email: "" })
  const [started, setStarted] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetch(`/api/tests/${slug}/start`).then((r) => r.json()).then((d) => {
      if (d.error) { setError(d.error); setLoading(false); return }
      setTest(d.test as Test)
      setQuestions(d.questions as Question[])
      setLoading(false)
    })
  }, [slug])

  if (!meta || error) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-on-surface-variant">{error || "Test introuvable"}</p>
    </div>
  )

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-on-surface-variant">Chargement du test…</p>
    </div>
  )

  if (!started) return (
    <main className="min-h-screen py-20 px-4">
      <div className="max-w-xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-heading font-bold text-on-surface">{meta.titre}</h1>
          <p className="text-on-surface-variant">{meta.description}</p>
          {meta.duree_min && (
            <p className="text-sm text-on-surface-variant">Durée estimée : {meta.duree_min} min · {questions.length} questions</p>
          )}
        </div>

        <form onSubmit={async (e) => {
          e.preventDefault()
          if (!form.nom || !form.prenom) return
          setStarted(true)
        }} className="space-y-4 bg-white p-6 rounded-2xl border border-border">
          <h2 className="text-lg font-heading font-semibold">Vos informations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Prénom *</label>
              <input required value={form.prenom} onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-secondary" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Nom *</label>
              <input required value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-secondary" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Profession</label>
            <input value={form.profession} onChange={(e) => setForm({ ...form, profession: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-secondary" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Niveau d'étude</label>
            <select value={form.niveau_etude} onChange={(e) => setForm({ ...form, niveau_etude: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-secondary bg-white">
              <option value="">Sélectionnez…</option>
              <option value="college">Collège</option>
              <option value="lycee">Lycée</option>
              <option value="bac">Baccalauréat</option>
              <option value="bac+2">Bac+2 (BTS, DUT)</option>
              <option value="licence">Licence (Bac+3)</option>
              <option value="master">Master (Bac+5)</option>
              <option value="doctorat">Doctorat (Bac+8)</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Téléphone</label>
              <input type="tel" value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-secondary" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-secondary" />
            </div>
          </div>
          <Button type="submit" size="lg" className="w-full">
            Commencer le test
          </Button>
        </form>
      </div>
    </main>
  )

  const q = questions[currentIdx]
  const isLast = currentIdx === questions.length - 1
  const progress = Object.keys(answers).length

  async function handleSubmit() {
    setSubmitting(true)
    try {
      const res = await fetch(`/api/tests/${slug}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, reponses: answers }),
      })
      const data = await res.json()
      if (data.error) { setError(data.error); return }
      router.push(data.resultUrl)
    } catch {
      setError("Erreur lors de l'envoi du test")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <ProgressBar current={progress} total={questions.length} />

        <QuestionCard
          key={q.id}
          question={q}
          selectedOptionId={answers[q.id] || null}
          onSelect={(optionId) => setAnswers({ ...answers, [q.id]: optionId })}
        />

        <div className="flex justify-between items-center pt-4">
          <Button variant="ghost" disabled={currentIdx === 0} onClick={() => setCurrentIdx(currentIdx - 1)}>
            ← Précédent
          </Button>
          <span className="text-sm text-on-surface-variant">
            Question {currentIdx + 1} sur {questions.length}
          </span>
          {isLast ? (
            <Button onClick={handleSubmit} disabled={progress < questions.length || submitting}>
              {submitting ? "Envoi en cours…" : "Voir mes résultats →"}
            </Button>
          ) : (
            <Button disabled={!answers[q.id]} onClick={() => setCurrentIdx(currentIdx + 1)}>
              Suivant →
            </Button>
          )}
        </div>
      </div>
    </main>
  )
}
