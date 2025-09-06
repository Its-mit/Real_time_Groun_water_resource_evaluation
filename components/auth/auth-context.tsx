"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface User {
  email: string
  role: "farmer" | "resident" | "industry" | "researcher" | "policymaker"
}

interface AuthContextType {
  user: User | null
  login: (email: string, role: string) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = (email: string, role: string) => {
    setUser({
      email,
      role: role as User["role"],
    })
  }

  const logout = () => {
    setUser(null)
  }

  const isAuthenticated = !!user

  return <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
