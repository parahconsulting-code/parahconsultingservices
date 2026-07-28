"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

interface Option {
  id?: string
  texte: string
  valeur: number
  ordre: number
}

interface Question {
  id: string
  texte: string
  ordre: number
  dimension: string | null
  options: Option[]
}

export default function QuestionEditorPage() {
  const { testId } = useParams<{ testId: string }>()
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)

  const [newTexte, setNewTexte] = useState("")
  const [newDimension, setNewDimension] = useState("")
  const [editId, setEditId] = useState<string | null>(null)
  const [editTexte, setEditTexte] = useState("")
  const [editDimension, setEditDimension] = useState("")

  async function loadQuestions() {
    const res = await fetch(`/api/admin/tests/${testId}/questions`)
    const data = await res.json()
    setQuestions(data)
    setLoading(false)
  }

  useEffect(() => { loadQuestions() }, [testId])

  async function addQuestion() {
    if (!newTexte.trim()) return
    await fetch("/api/admin/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ test_id: testId, texte: newTexte.trim(), dimension: newDimension.trim() || null }),
    })
    setNewTexte("")
    setNewDimension("")
    await loadQuestions()
  }

  async function deleteQuestion(id: string) {
    if (!confirm("Supprimer cette question ?")) return
    await fetch(`/api/admin/questions/${id}`, { method: "DELETE" })
    await loadQuestions()
  }

  function startEdit(q: Question) {
    setEditId(q.id)
    setEditTexte(q.texte)
    setEditDimension(q.dimension || "")
  }

  async function saveEdit() {
    if (!editId || !editTexte.trim()) return
    await fetch(`/api/admin/questions/${editId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texte: editTexte.trim(), dimension: editDimension.trim() || null }),
    })
    setEditId(null)
    await loadQuestions()
  }

  async function moveQuestion(id: string, direction: number) {
    const idx = questions.findIndex((q) => q.id === id)
    const target = idx + direction
    if (target < 0 || target >= questions.length) return

    const q = questions[idx]
    const t = questions[target]
    await fetch(`/api/admin/questions/${q.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ordre: t.ordre }),
    })
    await fetch(`/api/admin/questions/${t.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ordre: q.ordre }),
    })
    await loadQuestions()
  }

  if (loading) return (
    <div className="text-center py-12">
      <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
      <p className="text-gray-400 text-sm">Chargement…</p>
    </div>
  )

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <a href="/admin/questions" className="text-sm text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1">
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Tests
        </a>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Éditeur de questions</h1>
          <p className="text-gray-500 mt-1">{questions.length} questions · Test #{testId.slice(0, 8)}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-lg text-blue-600">add_circle</span>
          Ajouter une question
        </h2>
        <div className="flex gap-3">
          <input placeholder="Texte de la question" value={newTexte} onChange={(e) => setNewTexte(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm" />
          <input placeholder="Dimension (optionnel)" value={newDimension} onChange={(e) => setNewDimension(e.target.value)}
            className="w-44 px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm" />
          <button onClick={addQuestion} disabled={!newTexte.trim()}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            Ajouter
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {questions.map((q, i) => (
          <div key={q.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {editId === q.id ? (
              <div className="p-4 space-y-3">
                <input value={editTexte} onChange={(e) => setEditTexte(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm" />
                <div className="flex gap-2">
                  <input value={editDimension} onChange={(e) => setEditDimension(e.target.value)} placeholder="Dimension"
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm" />
                  <button onClick={saveEdit} disabled={!editTexte.trim()}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50">
                    Sauver
                  </button>
                  <button onClick={() => setEditId(null)}
                    className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                    Annuler
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-stretch">
                <div className="flex flex-col items-center justify-center gap-1 px-3 py-4 bg-gray-50 border-r border-gray-200 w-12">
                  <button onClick={() => moveQuestion(q.id, -1)} disabled={i === 0}
                    className="text-gray-400 hover:text-gray-700 disabled:opacity-20 transition-colors">
                    <span className="material-symbols-outlined text-base">keyboard_arrow_up</span>
                  </button>
                  <span className="text-xs font-medium text-gray-500">{i + 1}</span>
                  <button onClick={() => moveQuestion(q.id, 1)} disabled={i === questions.length - 1}
                    className="text-gray-400 hover:text-gray-700 disabled:opacity-20 transition-colors">
                    <span className="material-symbols-outlined text-base">keyboard_arrow_down</span>
                  </button>
                </div>
                <div className="flex-1 p-4">
                  <p className="text-sm text-gray-900 leading-relaxed">{q.texte}</p>
                  <div className="flex gap-3 mt-2">
                    {q.dimension && (
                      <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full font-medium">{q.dimension}</span>
                    )}
                    <span className="text-xs text-gray-400">{q.options.length} options</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 pr-3">
                  <button onClick={() => startEdit(q)}
                    className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">edit</span>
                    Modifier
                  </button>
                  <button onClick={() => deleteQuestion(q.id)}
                    className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">delete</span>
                    Suppr.
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {questions.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <span className="material-symbols-outlined text-5xl text-gray-300 mb-4">help_outline</span>
            <p className="text-gray-500">Aucune question — ajoutez-en une ci-dessus.</p>
          </div>
        )}
      </div>
    </div>
  )
}
