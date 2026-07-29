"use client"

import Link from "next/link"
import { AnimatedSection, StaggerGrid, StaggerItem } from "@/components/ui/animated-section"
import { testsMeta } from "@/data/tests-meta"

const questionCounts: Record<string, number> = {
  "riasec-junior": 60,
  "riasec-adulte": 60,
  "interets-professionnels": 40,
  "aptitudes-scolaires": 40,
  "styles-apprentissage": 32,
  "intelligences-multiples": 40,
  "personnalite": 50,
}

const testIcons: Record<string, string> = {
  "riasec-junior": "school",
  "riasec-adulte": "trending_up",
  "interets-professionnels": "work_history",
  "aptitudes-scolaires": "lightbulb",
  "styles-apprentissage": "visibility",
  "intelligences-multiples": "psychology",
  "personnalite": "diversity_3",
}

const targetLabels: Record<string, string> = {
  junior: "12-17 ans",
  adulte: "Adultes",
  tout: "Tout public",
}

export default function TestsPage() {
  return (
    <div className="pt-20 md:pt-32 pb-20 px-4 sm:px-6 md:px-16 max-w-[1280px] mx-auto w-full">
      <AnimatedSection animation="fade-down" as="div" className="mb-16">
        <h1 className="text-[32px] md:text-5xl font-display font-bold text-primary mb-4 leading-tight">
          Tests d&apos;Orientation
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl font-body leading-relaxed">
          Découvrez votre profil à travers nos tests psychotechniques validés scientifiquement.
          Chaque test vous offre un rapport personnalisé détaillé en PDF.
        </p>
      </AnimatedSection>

      <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testsMeta.map((test, i) => (
          <StaggerItem key={test.slug} index={i}>
            <div
              className="group h-full flex flex-col border border-outline-variant bg-surface-container-lowest transition-all duration-300 hover:shadow-xl hover:border-secondary"
            >
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                  <span
                    className="material-symbols-outlined text-5xl text-primary-fixed-dim transition-transform duration-300 group-hover:scale-110"
                  >
                    {testIcons[test.slug] || "assignment"}
                  </span>
                  <span
                    className={`text-xs font-bold tracking-widest uppercase px-3 py-1 ${
                      test.cible === "junior"
                        ? "bg-tertiary-container text-on-tertiary-container"
                        : test.cible === "adulte"
                          ? "bg-secondary-container text-on-secondary-container"
                          : "bg-surface-container-high text-on-surface-variant"
                    }`}
                  >
                    {targetLabels[test.cible] || test.cible}
                  </span>
                </div>

                <h3 className="font-headline font-semibold text-xl mb-3 text-primary">
                  {test.titre}
                </h3>

                <p className="text-on-surface-variant mb-8 flex-grow font-body text-sm leading-relaxed">
                  {test.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-outline-variant">
                  <div className="flex gap-4 text-sm text-on-surface-variant">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-base">timer</span>
                      {test.duree_min} min
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-base">task_alt</span>
                      {questionCounts[test.slug]} questions
                    </span>
                  </div>
                  <Link
                    href={`/tests/${test.slug}`}
                    className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 font-label text-sm transition-all duration-300 hover:opacity-90 active:scale-95"
                  >
                    Démarrer
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerGrid>
    </div>
  )
}
