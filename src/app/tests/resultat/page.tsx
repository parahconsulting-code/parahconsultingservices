"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { TestPassage, Test, Participant } from "@/types"

function ResultatContent() {
  const token = useSearchParams().get("token")
  const [passage, setPassage] = useState<TestPassage | null>(null)
  const [test, setTest] = useState<Test | null>(null)
  const [participant, setParticipant] = useState<Participant | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!token) { setError("Token manquant"); setLoading(false); return }

    supabase.rpc("get_passage_complet", { p_token: token }).then(({ data, error: err }) => {
      if (err || !data?.passage) { setError("Résultats non trouvés"); setLoading(false); return }
      setPassage(data.passage as unknown as TestPassage)
      setTest(data.test as Test)
      setParticipant(data.participant as Participant)
      setLoading(false)
    })
  }, [token])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-on-surface-variant">Chargement des résultats…</p>
    </div>
  )

  if (error || !passage) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <p className="text-on-surface-variant">{error || "Résultats non disponibles"}</p>
        <Link href="/tests"><Button variant="outline">Retour aux tests</Button></Link>
      </div>
    </div>
  )

  return (
    <main className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-heading font-bold text-on-surface">Vos résultats</h1>
          {participant && (
            <p className="text-on-surface-variant">
              {participant.prenom} {participant.nom} · {test?.titre}
            </p>
          )}
        </div>

        {passage.scores && Object.keys(passage.scores).length > 0 && (
          <div className="bg-white p-6 rounded-2xl border border-border space-y-4">
            {Object.entries(passage.scores).map(([dim, score]) => (
              <div key={dim} className="space-y-1">
                <div className="flex justify-between text-sm font-medium">
                  <span>{dim}</span>
                  <span>{Math.round(score)}%</span>
                </div>
                <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full transition-all" style={{ width: `${Math.min(100, score)}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="bg-surface-container-low p-6 rounded-2xl border border-border text-center space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={`/api/pdf?token=${token}`}>
              <Button>Télécharger le rapport PDF</Button>
            </a>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/tests"><Button variant="outline">Autres tests</Button></Link>
            <Link href="/contact"><Button variant="ghost">Prendre rendez-vous</Button></Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function ResultatPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-on-surface-variant">Chargement…</p>
      </div>
    }>
      <ResultatContent />
    </Suspense>
  )
}
