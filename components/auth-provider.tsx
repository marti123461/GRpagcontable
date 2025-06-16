"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  plan: "free" | "medium" | "premium"
  subscriptionStatus: "active" | "expired" | "cancelled"
  subscriptionEnd: string
  paymentId?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: RegisterData) => Promise<boolean>
  logout: () => void
  updateSubscription: (plan: string, paymentId: string) => void
  isAuthenticated: boolean
  hasAccess: (requiredPlan: "free" | "medium" | "premium") => boolean
}

interface RegisterData {
  email: string
  password: string
  name: string
  company?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Base de datos simulada de usuarios (en producción sería una base de datos real)
const DEMO_USERS: User[] = [
  {
    id: "1",
    email: "demo@test.com",
    name: "Usuario Demo",
    plan: "free",
    subscriptionStatus: "active",
    subscriptionEnd: "2025-12-31",
  },
  {
    id: "2",
    email: "premium@test.com",
    name: "Usuario Premium",
    plan: "premium",
    subscriptionStatus: "active",
    subscriptionEnd: "2025-12-31",
    paymentId: "PAYPAL_12345",
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar si hay una sesión guardada
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        // Verificar si la suscripción sigue activa
        if (new Date(userData.subscriptionEnd) > new Date()) {
          setUser(userData)
        } else {
          // Suscripción expirada, cambiar a plan gratuito
          const expiredUser = { ...userData, plan: "free", subscriptionStatus: "expired" }
          setUser(expiredUser)
          localStorage.setItem("user", JSON.stringify(expiredUser))
        }
      } catch (error) {
        console.error("Error loading user session:", error)
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simular autenticación (en producción sería una API real)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Buscar usuario en la base de datos demo
      const foundUser = DEMO_USERS.find((u) => u.email === email)

      if (foundUser && password === "123456") {
        // Verificar estado de suscripción
        const now = new Date()
        const subscriptionEnd = new Date(foundUser.subscriptionEnd)

        let userToSet = foundUser
        if (subscriptionEnd <= now && foundUser.plan !== "free") {
          // Suscripción expirada
          userToSet = {
            ...foundUser,
            plan: "free",
            subscriptionStatus: "expired",
          }
        }

        setUser(userToSet)
        localStorage.setItem("user", JSON.stringify(userToSet))
        return true
      }

      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  // Add payment verification method
  const verifyPayment = async (paymentId: string): Promise<boolean> => {
    try {
      // Verificar el pago con PayPal API
      const response = await fetch("/api/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentId }),
      })

      const result = await response.json()
      return result.verified === true
    } catch (error) {
      console.error("Payment verification error:", error)
      return false
    }
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      // Simular registro (en producción sería una API real)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Verificar si el email ya existe
      const existingUser = DEMO_USERS.find((u) => u.email === userData.email)
      if (existingUser) {
        return false // Email ya registrado
      }

      // Crear nuevo usuario
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        plan: "free", // Todos empiezan con plan gratuito
        subscriptionStatus: "active",
        subscriptionEnd: "2025-12-31",
      }

      // Agregar a la base de datos demo
      DEMO_USERS.push(newUser)

      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      return true
    } catch (error) {
      console.error("Register error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const updateSubscription = async (plan: string, paymentId: string) => {
    if (!user) return

    // Verificar el pago antes de activar la suscripción
    const paymentVerified = await verifyPayment(paymentId)

    if (!paymentVerified) {
      alert("Error: No se pudo verificar el pago. La suscripción no ha sido activada.")
      return
    }

    const updatedUser: User = {
      ...user,
      plan: plan as "free" | "medium" | "premium",
      subscriptionStatus: "active",
      subscriptionEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 días
      paymentId,
    }

    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))

    // Actualizar en la base de datos demo
    const userIndex = DEMO_USERS.findIndex((u) => u.id === user.id)
    if (userIndex !== -1) {
      DEMO_USERS[userIndex] = updatedUser
    }
  }

  const hasAccess = (requiredPlan: "free" | "medium" | "premium"): boolean => {
    if (!user) return false

    const planLevels = { free: 0, medium: 1, premium: 2 }
    const userLevel = planLevels[user.plan]
    const requiredLevel = planLevels[requiredPlan]

    return userLevel >= requiredLevel && user.subscriptionStatus === "active"
  }

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    updateSubscription,
    isAuthenticated: !!user,
    hasAccess,
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
