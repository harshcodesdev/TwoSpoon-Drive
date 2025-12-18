import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            TwoSpoonDrive
          </h1>
          <form
            action={async () => {
              "use server"
              await signOut({ redirectTo: "/" })
            }}
          >
            <Button type="submit" variant="outline">
              Sign Out
            </Button>
          </form>
        </div>
      </header>
      <main className="container mx-auto flex flex-1 items-center justify-center px-4 py-16">
        <div className="text-center">
          <h2 className="mb-4 text-4xl font-bold text-slate-900 dark:text-slate-100">
            Dashboard
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Welcome, {session.user?.name || session.user?.email}!
          </p>
        </div>
      </main>
    </div>
  )
}

