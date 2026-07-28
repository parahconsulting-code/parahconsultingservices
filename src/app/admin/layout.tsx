import { getSession, destroySession } from "@/lib/session"
import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session) redirect("/admin/login")

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex">
      <AdminSidebar email={session.email} />
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white border-b border-gray-200 px-8 h-16 flex items-center justify-end gap-4 sticky top-0 z-20">
          <form action={async () => {
            "use server"
            await destroySession()
            redirect("/admin/login")
          }}>
            <button type="submit" className="text-sm text-gray-500 hover:text-red-600 transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">logout</span>
              Déconnexion
            </button>
          </form>
        </header>
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
