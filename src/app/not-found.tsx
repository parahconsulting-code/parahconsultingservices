import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center pt-16 md:pt-20 px-4 sm:px-6">
        <div className="text-center max-w-lg">
          <div className="text-[120px] md:text-[160px] font-display font-bold text-primary/10 leading-none mb-4">
            404
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-primary mb-4">
            Page introuvable
          </h1>
          <p className="text-on-surface-variant font-body mb-8">
            La page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="bg-primary text-on-primary px-8 py-3 font-label hover:opacity-90 transition-opacity"
            >
              Retour à l&apos;accueil
            </Link>
            <Link
              href="/contact"
              className="border border-primary text-primary px-8 py-3 font-label hover:bg-primary hover:text-on-primary transition-all"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
