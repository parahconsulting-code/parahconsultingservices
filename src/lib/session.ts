import { SignJWT, jwtVerify, type JWTPayload } from "jose"
import { cookies } from "next/headers"

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "fallback-secret-change-me")
const COOKIE_NAME = "admin_session"

export interface SessionPayload extends JWTPayload {
  adminId: string
  email: string
}

export async function createSession(payload: { adminId: string; email: string }) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(SECRET)

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8,
    path: "/",
  })
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, SECRET)
    return payload as SessionPayload
  } catch {
    return null
  }
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, "", { httpOnly: true, path: "/", maxAge: 0 })
}
