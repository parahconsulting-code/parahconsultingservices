"use client"

import { cn } from "@/lib/utils"
import type { Question, QuestionOption } from "@/types"

interface QuestionCardProps {
  question: Question
  selectedOptionId: string | null
  onSelect: (optionId: string) => void
}

export function QuestionCard({ question, selectedOptionId, onSelect }: QuestionCardProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      {question.dimension && (
        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium">
          {question.dimension}
        </span>
      )}
      <h2 className="text-xl md:text-2xl font-heading text-on-surface leading-relaxed">
        {question.texte}
      </h2>
      <div className="space-y-3">
        {question.options.map((opt: QuestionOption) => (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className={cn(
              "w-full text-left px-5 py-4 rounded-xl border-2 transition-all",
              selectedOptionId === opt.id
                ? "border-secondary bg-secondary/10 text-secondary font-medium"
                : "border-border text-on-surface hover:border-secondary/50 hover:bg-surface-container"
            )}
          >
            <span className="text-base">{opt.texte}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
