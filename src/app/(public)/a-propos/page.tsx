export default function AProposPage() {
  return (
    <div className="pt-20 md:pt-32 pb-20 px-4 sm:px-6 md:px-16 max-w-[1280px] mx-auto w-full">
      <header className="mb-16">
        <h1 className="text-[32px] md:text-5xl font-display font-bold text-primary mb-4 leading-tight">
          À Propos
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl font-body leading-relaxed">
          Découvrez PARAH Consulting & Services, votre partenaire stratégique pour l&apos;excellence opérationnelle
          et humaine en Afrique Centrale.
        </p>
      </header>

      <section className="mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="text-secondary font-label tracking-widest uppercase mb-4 block">Notre Mission</span>
            <h2 className="text-[30px] font-headline font-semibold text-primary mb-6 leading-tight">
              Transformer vos idées en projets viables
            </h2>
            <p className="text-on-surface-variant font-body leading-relaxed mb-6">
              PARAH Consulting & Services est un cabinet de conseil basé à Brazzaville, République du Congo.
              Nous accompagnons les entreprises et les institutions dans leur quête de performance opérationnelle
              et de croissance durable à travers trois piliers d&apos;excellence : le consulting stratégique,
              les services opérationnels et le capital humain.
            </p>
            <p className="text-on-surface-variant font-body leading-relaxed">
              Forts d&apos;une équipe d&apos;experts séniors, nous combinons une connaissance approfondie des
              réalités locales avec les meilleures pratiques internationales pour offrir des solutions sur mesure
              à chaque client.
            </p>
          </div>
          <div className="relative aspect-square">
            <div className="absolute inset-0 border border-outline-variant translate-x-4 translate-y-4" />
            <div className="relative w-full h-full bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700"
              style={{ backgroundImage: "url('/images/consulting.jpg')" }} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: "visibility", title: "Vision", desc: "Être le leader régional du conseil stratégique et de l'accompagnement opérationnel en Afrique Centrale." },
            { icon: "flag", title: "Mission", desc: "Accompagner les organisations dans leur transformation en alliant expertise locale et standards internationaux." },
            { icon: "diamond", title: "Valeurs", desc: "Intégrité, Excellence, Innovation, et Engagement durable envers nos clients et nos équipes." },
          ].map((item) => (
            <div key={item.title} className="bg-surface-bright border border-outline-variant p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <span className="material-symbols-outlined text-4xl text-secondary mb-4">{item.icon}</span>
              <h3 className="font-headline font-semibold text-xl text-primary mb-3">{item.title}</h3>
              <p className="text-on-surface-variant font-body leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-primary-container p-10 md:p-14 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl font-headline font-semibold text-white mb-4">Nos Coordonnées</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary-fixed">location_on</span>
                  <p className="font-body">1567, Rue Noumbi, Plateaux des 15 ans, derrière l&apos;école 8 Mars<br />Brazzaville, République du Congo</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary-fixed">mail</span>
                  <p className="font-body">parahconsulting@gmail.com</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary-fixed">call</span>
                  <p className="font-body">00242 04 434 33 33</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 p-8 text-center">
              <span className="material-symbols-outlined text-5xl text-secondary-fixed mb-4">support_agent</span>
              <h4 className="font-headline font-semibold text-lg text-white mb-2">Besoin d&apos;accompagnement ?</h4>
              <p className="font-body mb-6">Nos experts sont à votre écoute pour analyser vos besoins.</p>
              <a href="/contact" className="inline-block bg-secondary text-white px-8 py-3 font-label hover:opacity-90 transition-opacity">
                Prendre rendez-vous
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
