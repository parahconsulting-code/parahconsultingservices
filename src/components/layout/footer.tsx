import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-primary-container py-16 px-6 md:px-16 grid grid-cols-1 md:grid-cols-4 gap-gutter text-on-primary-container">
      <div className="col-span-1">
        <img src="/images/logo-parah.png" alt="PARAH Consulting" className="h-10 mb-6" />
        <p className="opacity-80 mb-6 font-body">
          Votre partenaire stratégique pour l&apos;excellence opérationnelle et humaine en Afrique Centrale.
        </p>
        <div className="flex gap-4">
          <a
            className="w-10 h-10 border border-on-primary-container/20 flex items-center justify-center hover:bg-secondary transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined text-sm">public</span>
          </a>
          <a
            className="w-10 h-10 border border-on-primary-container/20 flex items-center justify-center hover:bg-secondary transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined text-sm">mail</span>
          </a>
        </div>
      </div>
      <div>
        <h4 className="font-label uppercase tracking-widest text-white mb-6">Expertise</h4>
        <ul className="space-y-4 font-body">
          <li>
            <Link className="opacity-80 hover:opacity-100 hover:text-secondary-fixed transition-opacity" href="/services">
              Audit Stratégique
            </Link>
          </li>
          <li>
            <Link className="opacity-80 hover:opacity-100 hover:text-secondary-fixed transition-opacity" href="/services">
              Sourcing International
            </Link>
          </li>
          <li>
            <Link className="opacity-80 hover:opacity-100 hover:text-secondary-fixed transition-opacity" href="/formations">
              Formation Continue
            </Link>
          </li>
          <li>
            <Link className="opacity-80 hover:opacity-100 hover:text-secondary-fixed transition-opacity" href="/tests">
              Tests d&apos;Orientation
            </Link>
          </li>
          <li>
            <Link className="opacity-80 hover:opacity-100 hover:text-secondary-fixed transition-opacity" href="/services">
              Coaching Dirigeant
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-label uppercase tracking-widest text-white mb-6">Entreprise</h4>
        <ul className="space-y-4 font-body">
          <li>
            <a className="opacity-80 hover:opacity-100 hover:text-secondary-fixed transition-opacity" href="#">
              À Propos
            </a>
          </li>
          <li>
            <a className="opacity-80 hover:opacity-100 hover:text-secondary-fixed transition-opacity" href="#">
              Blog & Actualités
            </a>
          </li>
          <li>
            <a className="opacity-80 hover:opacity-100 hover:text-secondary-fixed transition-opacity" href="#">
              Carrières
            </a>
          </li>
          <li>
            <a className="opacity-80 hover:opacity-100 hover:text-secondary-fixed transition-opacity" href="#">
              FAQ
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-label uppercase tracking-widest text-white mb-6">Contact</h4>
        <p className="opacity-80 mb-4 font-body">Brazzaville, République du Congo</p>
        <p className="opacity-80 mb-4 font-body">contact@parahconsulting.com</p>
        <p className="opacity-80 font-body">+242 06 000 00 00</p>
      </div>
      <div className="col-span-1 md:col-span-4 pt-12 mt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="opacity-60 font-body">&copy; 2024 PARAH Consulting & Services. All rights reserved.</p>
        <div className="flex gap-8 opacity-60 font-body">
          <a className="hover:text-secondary-fixed transition-colors" href="#">
            Privacy Policy
          </a>
          <a className="hover:text-secondary-fixed transition-colors" href="#">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  )
}
