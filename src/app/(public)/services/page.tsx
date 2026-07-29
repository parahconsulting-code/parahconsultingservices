"use client"

import Link from "next/link"
import { AnimatedSection } from "@/components/ui/animated-section"

export default function ServicesPage() {
  return (
    <>
      <section className="relative h-[420px] md:h-[614px] flex items-center overflow-hidden bg-gradient-to-br from-[#131b2e] to-black">
        <div
          className="absolute inset-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/dg-micro.jpg')" }}
        />
        <div className="relative container mx-auto px-4 sm:px-6 md:px-16 z-10">
          <div className="max-w-3xl">
            <h1 className="text-[32px] md:text-5xl font-display font-bold text-white mb-6 leading-tight animate-fade-down">
              Expertise, Fiabilité et Transformation Stratégique.
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl font-body leading-relaxed animate-fade-up animate-delay-200">
              Nous accompagnons les entreprises et les institutions dans leur quête de performance opérationnelle et de
              croissance durable à travers trois piliers d&apos;excellence.
            </p>
            <Link
              className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-4 font-label hover:bg-secondary-container hover:scale-105 transition-all duration-300 animate-fade-up animate-delay-400"
              href="#consulting"
            >
              Découvrir nos solutions <span className="material-symbols-outlined text-sm">arrow_downward</span>
            </Link>
          </div>
        </div>
      </section>

      <AnimatedSection animation="slide-left" className="py-24 bg-white border-b border-outline-variant" id="consulting">
        <div className="container mx-auto px-4 sm:px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <span className="text-secondary font-label tracking-widest uppercase mb-4 block">Pilier 01</span>
              <h2 className="text-[30px] md:text-5xl font-display font-bold text-primary mb-6 leading-tight">
                Consulting Stratégique
              </h2>
              <p className="text-lg text-on-surface-variant mb-10 font-body leading-relaxed">
                Donnez une direction claire à vos ambitions. Nous transformons vos visions en plans d&apos;actions
                concrets pour assurer votre compétitivité sur le marché congolais et international.
              </p>
              <div className="space-y-6 mb-10">
                {[
                  {
                    icon: "analytics",
                    title: "Diagnostic & Audit",
                    desc: "Analyse approfondie de votre structure pour identifier les leviers de croissance cachés.",
                  },
                  {
                    icon: "business_center",
                    title: "Business Plan & Modélisation",
                    desc: "Conception de stratégies robustes et de prévisions financières pour vos investissements.",
                  },
                  {
                    icon: "digital_wellbeing",
                    title: "Transformation Digitale",
                    desc: "Accompagnement dans l'adoption d'outils numériques pour optimiser vos processus.",
                  },
                ].map((item, i) => (
                  <div key={item.title} className="flex gap-4 animate-fade-up" style={{ animationDelay: `${0.2 + i * 0.15}s` }}>
                    <div className="w-12 h-12 bg-primary-container flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-on-primary-container">{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-headline font-semibold text-lg text-primary">{item.title}</h4>
                      <p className="text-on-surface-variant font-body">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/contact"
                className="bg-primary text-on-primary px-8 py-4 font-label hover:opacity-90 hover:scale-105 transition-all duration-300 inline-block"
              >
                Demander un devis
              </Link>
            </div>
            <div className="relative aspect-square animate-fade-up animate-delay-300">
              <div className="absolute inset-0 border border-outline-variant translate-x-4 translate-y-4" />
              <div
                className="relative w-full h-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 bg-cover bg-center hover:scale-105"
                style={{ backgroundImage: "url('/images/consulting.jpg')" }}
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-24 bg-surface-bright" id="operationnel">
        <div className="container mx-auto px-4 sm:px-6 md:px-16">
          <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-up">
            <span className="text-secondary font-label tracking-widest uppercase mb-4 block">Pilier 02</span>
            <h2 className="text-[30px] md:text-5xl font-display font-bold text-primary mb-4 leading-tight">
              Services Opérationnels
            </h2>
            <p className="text-lg text-on-surface-variant font-body leading-relaxed">
              Optimisez votre chaîne de valeur et sécurisez vos approvisionnements grâce à notre expertise logistique et
              commerciale.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "search_insights",
                title: "Sourcing & Achats",
                desc: "Identification de fournisseurs fiables et négociation des meilleures conditions tarifaires pour vos intrants.",
                points: ["Audit fournisseurs", "Optimisation des coûts"],
              },
              {
                icon: "hub",
                title: "Centrale d'Achats",
                desc: "Mutualisation des commandes pour bénéficier d'économies d'échelle significatives et d'une logistique simplifiée.",
                points: ["Gestion des stocks", "Consolidation logistique"],
              },
              {
                icon: "public",
                title: "Import / Export",
                desc: "Gestion complète des formalités douanières et du transit international pour vos marchandises.",
                points: ["Conformité douanière", "Suivi d'expédition"],
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className="bg-surface-bright p-8 border border-outline-variant flex flex-col h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-secondary animate-fade-up"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <span className="material-symbols-outlined text-4xl text-secondary mb-6">{item.icon}</span>
                <h3 className="font-headline font-semibold text-xl mb-4">{item.title}</h3>
                <p className="text-on-surface-variant mb-8 flex-grow font-body">{item.desc}</p>
                <ul className="space-y-3 mb-8">
                  {item.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2 text-sm">
                      <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center animate-fade-up animate-delay-300">
            <Link
              href="/rendez-vous"
              className="bg-primary text-on-primary px-8 py-4 font-label hover:bg-on-surface hover:scale-105 transition-all duration-300 inline-block"
            >
              Demander un devis opérationnel
            </Link>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection animation="fade-up" className="py-24 bg-primary text-on-primary" id="humain">
        <div className="container mx-auto px-4 sm:px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
            <div className="lg:col-span-5">
              <span className="text-secondary-fixed-dim font-label tracking-widest uppercase mb-4 block">Pilier 03</span>
              <h2 className="text-[30px] md:text-5xl font-display font-bold mb-6 leading-tight">Capital Humain</h2>
              <p className="text-lg text-on-primary-container mb-10 font-body leading-relaxed">
                L&apos;humain est le moteur de votre croissance. Nous formons les leaders de demain et optimisons le
                potentiel de vos équipes.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                {[
                  { title: "Orientation", desc: "Guidage stratégique pour les carrières et les transitions professionnelles." },
                  { title: "Formations", desc: "Programmes sur mesure pour renforcer les compétences techniques et managériales." },
                  { title: "Coaching", desc: "Accompagnement individuel ou collectif pour libérer le leadership." },
                  { title: "RH Management", desc: "Externalisation et conseil pour une gestion RH moderne et efficace." },
                ].map((item, i) => (
                  <div key={item.title} className="animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                    <h4 className="font-headline font-semibold text-lg mb-2 text-white">{item.title}</h4>
                    <p className="text-sm text-on-primary-container">{item.desc}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/formations"
                className="bg-secondary text-white px-8 py-4 font-label hover:bg-secondary-container hover:scale-105 transition-all duration-300 inline-block"
              >
                Démarrer un programme
              </Link>
            </div>
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div
                  className="aspect-[3/4] w-full overflow-hidden bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{ backgroundImage: "url('/images/citation-leader.webp')" }}
                />
                <div className="bg-secondary p-6 aspect-square flex flex-col justify-end transition-transform duration-300 hover:scale-[1.02]">
                  <p className="text-4xl font-display font-bold">+500</p>
                  <p className="font-label">Professionnels Formés</p>
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="bg-on-primary-container/20 p-6 aspect-square flex flex-col justify-end border border-white/10 transition-transform duration-300 hover:scale-[1.02]">
                  <p className="text-4xl font-display font-bold">15+</p>
                  <p className="font-label">Programmes Experts</p>
                </div>
                <div
                  className="aspect-[3/4] w-full overflow-hidden bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{ backgroundImage: "url('/images/citation-creativite.webp')" }}
                />
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection animation="fade-up" className="py-24 bg-surface">
        <div className="container mx-auto px-4 sm:px-6 md:px-16">
          <div className="bg-white border border-outline-variant p-12 md:p-20 text-center relative overflow-hidden transition-all duration-500 hover:shadow-xl">
            <div className="absolute top-0 left-0 w-1 h-full bg-secondary" />
            <h2 className="text-[30px] font-headline font-semibold mb-6 leading-tight">
              Prêt à transformer votre activité ?
            </h2>
            <p className="text-lg text-on-surface-variant max-w-2xl mx-auto mb-10 font-body leading-relaxed">
              Nos experts sont à votre disposition pour analyser vos besoins et vous proposer des solutions
              personnalisées adaptées à votre réalité locale.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="bg-primary text-on-primary px-10 py-5 font-label hover:opacity-90 hover:scale-105 transition-all duration-300"
              >
                Obtenir un devis personnalisé
              </Link>
              <a
                href="#"
                className="border border-primary text-primary px-10 py-5 font-label hover:bg-primary hover:text-on-primary hover:scale-105 transition-all duration-300"
              >
                Consulter notre Blog
              </a>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </>
  )
}
