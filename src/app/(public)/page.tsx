"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { AnimatedSection } from "@/components/ui/animated-section"

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [val, setVal] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el) } },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    let frame = 0
    const totalFrames = 60
    const animate = () => {
      frame++
      const progress = Math.min(frame / totalFrames, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setVal(Math.round(eased * target))
      if (frame < totalFrames) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [visible, target])

  return <div ref={ref} className="text-4xl md:text-5xl font-display font-bold text-secondary-fixed mb-2">{val}{suffix}</div>
}

export default function HomePage() {
  return (
    <>
      <section className="relative h-[500px] md:h-[921px] min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-black/85 via-[#131b2e]/40 to-black/85">
          <div
            className="absolute inset-0 opacity-40 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/hero-group.jpg')" }}
          />
        </div>
        <div className="absolute top-8 left-6 md:left-16 z-10">
          <img src="/images/logo-parah.png" alt="PARAH Consulting" className="h-12 md:h-16 opacity-90" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 md:px-16 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-[32px] md:text-5xl font-display font-bold text-white mb-6 leading-tight animate-fade-down">
              Transformez vos idées en <span className="text-secondary-fixed">projets viables</span>.
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-xl font-body leading-relaxed animate-fade-up animate-delay-200">
              Expertise stratégique et accompagnement opérationnel pour les entreprises en quête de transformation et de
              croissance durable en Afrique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animate-delay-400">
              <Link
                href="/rendez-vous"
                className="bg-secondary-container text-on-secondary px-8 py-4 font-label flex items-center justify-center gap-2 hover:opacity-90 hover:scale-105 transition-all duration-300"
              >
                Prendre RDV <span className="material-symbols-outlined">calendar_today</span>
              </Link>
              <Link
                href="/services"
                className="border-2 border-white text-white px-8 py-4 font-label hover:bg-white hover:text-primary hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Nos Services <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AnimatedSection animation="fade-up" className="py-12 bg-surface-container-low border-b border-outline-variant">
        <div className="container mx-auto px-4 sm:px-6 md:px-16">
          <p className="text-center font-label text-outline mb-8 tracking-widest uppercase">ILS NOUS FONT CONFIANCE</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            <img src="/images/confiance-1.png" alt="Partenaire 1" className="h-14 md:h-16 w-auto object-contain animate-float" style={{ animationDelay: "0s" }} />
            <img src="/images/confiance-2.png" alt="Partenaire 2" className="h-14 md:h-16 w-auto object-contain animate-float" style={{ animationDelay: "0.4s" }} />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection animation="fade-up" className="py-24 bg-surface">
        <div className="container mx-auto px-4 sm:px-6 md:px-16">
          <div className="mb-16 max-w-2xl animate-fade-up">
            <h2 className="text-3xl md:text-[30px] font-headline font-semibold text-primary mb-4 leading-tight">
              Nos Piliers d&apos;Accompagnement
            </h2>
            <p className="text-lg text-on-surface-variant font-body leading-relaxed">
              Une approche holistique pour sécuriser votre croissance et optimiser vos performances organisationnelles.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Consulting Stratégique",
                desc: "Analyse de marché, définition de business model et planification stratégique pour naviguer dans des environnements complexes.",
                icon: "strategy",
                href: "/services",
              },
              {
                title: "Services Opérationnels",
                desc: "Optimisation des processus, gestion de projet et accompagnement technique pour une exécution sans faille de vos ambitions.",
                icon: "settings_applications",
                href: "/services",
              },
              {
                title: "Capital Humain",
                desc: "Formation, recrutement stratégique et développement du leadership pour bâtir les équipes de demain.",
                icon: "groups",
                href: "/formations",
              },
            ].map((pillar, i) => (
              <div
                key={pillar.title}
                className="bg-surface-bright p-8 border border-outline-variant flex flex-col h-full transition-all duration-500 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-xl animate-fade-up"
                style={{ animationDelay: `${0.1 + i * 0.15}s` }}
              >
                <span className="material-symbols-outlined text-4xl text-secondary mb-6 animate-float">{pillar.icon}</span>
                <h3 className="text-2xl font-headline font-semibold text-primary mb-4">{pillar.title}</h3>
                <p className="font-body text-on-surface-variant mb-8 flex-grow leading-relaxed">{pillar.desc}</p>
                <Link
                  className="inline-flex items-center text-secondary font-bold hover:gap-3 transition-all duration-300 group"
                  href={pillar.href}
                >
                  En savoir plus <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">chevron_right</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-20 bg-primary-container text-white overflow-hidden relative">
        <div className="container mx-auto px-4 sm:px-6 md:px-16 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {[
              { value: 120, suffix: "+", label: "Clients Accompagnés" },
              { value: 350, suffix: "+", label: "Projets Réalisés" },
              { value: 98, suffix: "%", label: "Taux de Réussite" },
              { value: 15, suffix: "+", label: "Experts Séniors" },
            ].map((stat, i) => (
              <div key={i} className="text-center animate-fade-up" style={{ animationDelay: `${i * 0.15}s` }}>
                <CountUp target={stat.value} suffix={stat.suffix} />
                <div className="font-label uppercase tracking-widest text-on-primary-container">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection animation="fade-up" className="py-24 bg-surface-container-lowest">
        <div className="container mx-auto px-4 sm:px-6 md:px-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-[30px] font-headline font-semibold text-primary mb-4 leading-tight">
              Ce que disent nos partenaires
            </h2>
            <div className="w-20 h-1.5 bg-secondary mx-auto animate-scale-in"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                quote:
                  "L'approche de PARAH Consulting a radicalement transformé notre gestion opérationnelle. Leur compréhension des enjeux locaux couplée à une expertise internationale est un atout majeur.",
                name: "Jean-Marc B.",
                role: "Directeur Général, AgriTech Solutions",
              },
              {
                quote:
                  "Un partenaire de confiance qui ne se contente pas de conseiller, mais qui s'immerge réellement dans nos problématiques pour co-créer des solutions viables et pérennes.",
                name: "Fatou K.",
                role: "Fondatrice, Innov'Africa",
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="p-10 bg-white border border-outline-variant shadow-sm relative transition-all duration-500 hover:-translate-y-1 hover:shadow-lg animate-fade-up"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <span className="material-symbols-outlined text-6xl text-secondary-fixed opacity-40 absolute top-6 right-6">
                  format_quote
                </span>
                <p className="text-lg italic mb-8 relative z-10 font-body leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center">
                    <span className="material-symbols-outlined">person</span>
                  </div>
                  <div>
                    <div className="font-bold text-primary">{testimonial.name}</div>
                    <div className="text-sm text-on-surface-variant">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection animation="fade-up" className="py-24 bg-white border-t border-outline-variant">
        <div className="container mx-auto px-4 sm:px-6 md:px-16">
          <div className="bg-primary-container p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center gap-12">
            <div className="absolute left-0 bottom-0 w-64 h-64 bg-secondary-container/20 blur-3xl rounded-full animate-float" />
            <div className="flex-1 relative z-10">
              <h2 className="text-[32px] md:text-[30px] font-headline font-semibold text-white mb-4 leading-tight">
                Restez informé de nos analyses
              </h2>
              <p className="text-on-primary-container font-body leading-relaxed">
                Inscrivez-vous à notre newsletter pour recevoir nos études de cas et insights stratégiques mensuels.
              </p>
            </div>
            <div className="flex-1 w-full max-w-md relative z-10">
              <form
                className="flex flex-col sm:flex-row gap-3"
                onSubmit={(e) => {
                  e.preventDefault()
                  alert("Merci pour votre inscription !")
                }}
              >
                <input
                  className="flex-grow px-6 py-4 bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:bg-white focus:text-primary focus:scale-[1.02] transition-all duration-300 outline-none"
                  placeholder="Votre email professionnel"
                  type="email"
                />
                <button
                  type="submit"
                  className="bg-secondary-container text-on-secondary px-8 py-4 font-bold whitespace-nowrap hover:opacity-90 hover:scale-105 transition-all duration-300"
                >
                  S&apos;inscrire
                </button>
              </form>
              <p className="text-xs text-white/40 mt-4 italic">
                Nous respectons votre vie privée. Désabonnement possible à tout moment.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </>
  )
}
