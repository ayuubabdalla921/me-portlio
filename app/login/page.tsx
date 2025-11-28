import { redirect } from 'next/navigation'

import { LoginForm } from '@/components/forms/login-form'
import { getSessionFromCookies } from '@/lib/auth'

export const metadata = {
  title: 'Admin Login | Portfolio Dashboard',
  description: 'Secure admin-only login for the portfolio dashboard.',
}

export default async function LoginPage() {
  const session = await getSessionFromCookies()
  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background/90 to-primary/10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute right-[-20%] top-40 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[10%] h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
      </div>
      <div className="container relative mx-auto flex min-h-screen items-center justify-center px-4 py-10">
        <div className="flex flex-col items-center gap-10 text-center">
          <div className="space-y-2">
            <p className="inline-flex items-center rounded-full border border-border/60 bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              Secure admin area
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Welcome back, Ayuub</h1>
            <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
              Sign in with your admin credentials to access the portfolio dashboard, manage projects, and update your
              work in real time.
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
