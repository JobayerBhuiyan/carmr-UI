"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type User = {
  id: string
  email: string
  name: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signUp: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const storedUser = localStorage.getItem("carmr_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem("carmr_user")
      }
    }
    setIsLoading(false)
  }, [])

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Demo authentication - in production, this would call an API
    if (!email || !password) {
      return { success: false, error: "Email and password are required" }
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Demo: accept any valid-looking email with password length >= 6
    if (password.length < 6) {
      return { success: false, error: "Invalid credentials" }
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      email,
      name: email.split("@")[0],
    }

    setUser(newUser)
    localStorage.setItem("carmr_user", JSON.stringify(newUser))
    return { success: true }
  }

  const signUp = async (
    email: string,
    password: string,
    name: string,
  ): Promise<{ success: boolean; error?: string }> => {
    // Demo registration - in production, this would call an API
    if (!email || !password || !name) {
      return { success: false, error: "All fields are required" }
    }

    if (password.length < 6) {
      return { success: false, error: "Password must be at least 6 characters" }
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const newUser: User = {
      id: crypto.randomUUID(),
      email,
      name,
    }

    setUser(newUser)
    localStorage.setItem("carmr_user", JSON.stringify(newUser))
    return { success: true }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("carmr_user")
  }

  return <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
