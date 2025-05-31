"use client"

import type { ReactNode } from "react"
import { useAuth } from "./auth-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Crown, Zap, CreditCard } from "lucide-react"

interface ProtectedRouteProps {
  children: ReactNode
  requiredPlan?: "free" | "medium" | "premium"
  fallback?: ReactNode
  onUpgrade?: () => void
}

export function ProtectedRoute({ children, requiredPlan = "free", fallback, onUpgrade }: ProtectedRouteProps) {
  const { user, hasAccess, isAuthenticated } = useAuth()

  // Si no está autenticado, mostrar mensaje de login
  if (!isAuthenticated) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center">
              <Lock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Acceso Restringido</h3>
              <p className="text-gray-600 mb-4">Debes iniciar sesión para acceder a esta funcionalidad.</p>
              <Button onClick={() => window.location.reload()}>Iniciar Sesión</Button>
            </CardContent>
          </Card>
        </div>
      )
    )
  }

  // Si no tiene acceso al plan requerido, mostrar upgrade
  if (!hasAccess(requiredPlan)) {
    const planNames = {
      free: "Gratuito",
      medium: "Medio",
      premium: "Premium",
    }

    const planIcons = {
      free: Lock,
      medium: Zap,
      premium: Crown,
    }

    const PlanIcon = planIcons[requiredPlan]

    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <PlanIcon
              className={`h-12 w-12 mx-auto mb-4 ${
                requiredPlan === "premium"
                  ? "text-yellow-500"
                  : requiredPlan === "medium"
                    ? "text-blue-500"
                    : "text-gray-400"
              }`}
            />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Plan {planNames[requiredPlan]} Requerido</h3>
            <p className="text-gray-600 mb-4">
              Esta funcionalidad requiere el plan {planNames[requiredPlan]} o superior.
            </p>
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-500">
                Tu plan actual: <strong>{planNames[user?.plan || "free"]}</strong>
              </p>
              {user?.subscriptionStatus === "expired" && (
                <p className="text-sm text-red-600">⚠️ Tu suscripción ha expirado</p>
              )}
            </div>
            <Button onClick={onUpgrade} className="w-full">
              <CreditCard className="h-4 w-4 mr-2" />
              Actualizar Plan
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Si tiene acceso, mostrar el contenido
  return <>{children}</>
}
