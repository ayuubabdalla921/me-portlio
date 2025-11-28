import { NextResponse, type NextRequest } from 'next/server'

import {
  clearSession,
  createSession,
  getSessionFromRequest,
  isValidCredentials,
} from '@/lib/auth'

export async function POST(request: NextRequest) {
  const { username, password } = await request.json()

  if (!isValidCredentials(username, password)) {
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
  }

  await createSession(username)

  return NextResponse.json({ message: 'Logged in' })
}

export async function GET(request: NextRequest) {
  const session = await getSessionFromRequest(request)
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  return NextResponse.json({ authenticated: true, user: session.username })
}

export async function DELETE() {
  clearSession()
  return NextResponse.json({ message: 'Logged out' })
}
