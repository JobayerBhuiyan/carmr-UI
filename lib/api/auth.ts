import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/supabase/types"

export type AuthResult = {
  authenticated: boolean
  userId?: string
  error?: string
}

export async function verifyAuth(request: Request): Promise<AuthResult> {
  const authHeader = request.headers.get("Authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { authenticated: false, error: "Missing authorization header" }
  }

  const token = authHeader.substring(7)

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return { authenticated: false, error: "Server configuration error" }
  }

  const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: { Authorization: `Bearer ${token}` },
    },
  })

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return { authenticated: false, error: "Invalid or expired token" }
  }

  return { authenticated: true, userId: user.id }
}

export function jsonResponse(data: unknown, status: number = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  })
}

export function errorResponse(message: string, status: number = 400): Response {
  return jsonResponse({ error: message }, status)
}
