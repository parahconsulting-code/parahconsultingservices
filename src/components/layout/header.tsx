"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/formations", label: "Formations" },
  { href: "/tests", label: "Tests" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-40 flex justify-between items-center px-4 sm:px-6 md:px-16 bg-surface backdrop-blur-md border-b border-outline-variant transition-all duration-300",
          scrolled ? "py-2 shadow-sm" : "py-4"
        )}
      >
        <Link href="/">
          <img src="/images/logo-header.png" alt="PARAH Consulting &amp; Services" width="160" height="52" className="h-10 md:h-12 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors duration-200",
                pathname === link.href
                  ? "text-secondary font-bold border-b-2 border-secondary"
                  : "text-on-surface hover:text-secondary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="bg-primary text-on-primary px-4 sm:px-6 py-2 font-label scale-95 active:scale-90 transition-transform text-sm sm:text-base"
          >
            Prendre RDV
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-on-surface hover:text-secondary transition-colors"
            aria-label="Menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <nav className="absolute top-0 left-0 h-full w-72 max-w-[80vw] bg-white shadow-2xl flex flex-col pt-24 pb-8 px-6 overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "py-4 text-lg font-medium transition-colors duration-200 border-b border-gray-100",
                  pathname === link.href
                    ? "text-secondary font-bold"
                    : "text-gray-800 hover:text-secondary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
