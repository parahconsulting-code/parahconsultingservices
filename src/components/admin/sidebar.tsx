"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/questions", label: "Questions", icon: "quiz" },
  { href: "/admin/resultats", label: "Résultats", icon: "bar_chart" },
  { href: "/admin/rendez-vous", label: "Rendez-vous", icon: "event_available" },
]

export function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const sidebarContent = (
    <div className="w-64 bg-[#1a1f36] text-white flex flex-col h-full">
      <div className="px-6 py-8 border-b border-white/10">
        <Link href="/admin" onClick={() => setMobileOpen(false)}>
          <img src="/images/logo-footer.png" alt="PARAH Consulting" width="160" height="52" className="h-10 w-auto" />
        </Link>
        <p className="text-xs text-white/40 mt-1">Espace Administration</p>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                isActive
                  ? "bg-[#4f7cff] text-white shadow-lg shadow-[#4f7cff]/25"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="px-6 py-6 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#4f7cff] flex items-center justify-center text-sm font-bold">
            {email.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{email}</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed bottom-4 right-4 z-50 lg:hidden w-12 h-12 rounded-full bg-[#4f7cff] text-white shadow-lg flex items-center justify-center"
        aria-label="Menu"
      >
        <span className="material-symbols-outlined">{mobileOpen ? "close" : "menu"}</span>
      </button>

      <aside className="hidden lg:block flex-shrink-0">
        {sidebarContent}
      </aside>

      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
          <aside className="fixed inset-y-0 left-0 z-50 lg:hidden shadow-xl">
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  )
}
