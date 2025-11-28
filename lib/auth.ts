import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { SignJWT, jwtVerify, type JWTPayload } from 'jose'

export const SESSION_COOKIE_NAME = 'portfolio_session'

const AUTH_USERNAME = process.env.ADMIN_USERNAME ?? 'ayuub257'
const AUTH_PASSWORD = process.env.ADMIN_PASSWORD ?? 'ayuub257'
const AUTH_SECRET =
  process.env.AUTH_SECRET ??
  'change-me-to-a-secure-random-string-for-production-use-only'

type SessionPayload = JWTPayload & {
  username: string
}

const getSecretKey = () => new TextEncoder().encode(AUTH_SECRET)

export const isValidCredentials = (username: string, password: string) =>
  username === AUTH_USERNAME && password === AUTH_PASSWORD

export async function signSession(username: string) {
  return new SignJWT({ username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecretKey())
}

export async function verifySessionToken(token?: string | null): Promise<SessionPayload | null> {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, getSecretKey())
    return payload as SessionPayload
  } catch (error) {
    return null
  }
}

export async function createSession(username: string) {
  const token = await signSession(username)
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
  return token
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}

export async function getSessionFromCookies() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value
  return verifySessionToken(token)
}

export async function getSessionFromRequest(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value
  return verifySessionToken(token)
}
