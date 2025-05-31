"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MessageCircle, UserCheck, Upload, FileCheck, Download, CheckCircle, ArrowRight } from "lucide-react"

export function UserGuide() {
  const steps = [
    {
      number: 1,
      title: "Explora nuestros servicios",
      description:
        "Descubre todos los servicios que ofrecemos para tu empresa y elige los que mejor se adapten a tus necesidades.",
      icon: Search,
      color: "bg-blue-100 text-blue-600",
      badge: "Inicio",
    },
    {
      number: 2,
      title: "Usa el Chatbot Inteligente",
      description:
        "Nuestro chatbot te ayudará a resolver dudas básicas y te conectará con nuestros especialistas cuando sea necesario.",
      icon: MessageCircle,
      color: "bg-green-100 text-green-600",
      badge: "Consulta",
    },
    {
      number: 3,
      title: "Accede al Portal de Cliente",
      description:
        "Desde tu portal personalizado podrás acceder a todos tus documentos, reportes y comunicarte con tu contador asignado.",
      icon: UserCheck,
      color: "bg-purple-100 text-purple-600",
      badge: "Acceso",
    },
    {
      number: 4,
      title: "Gestiona tus documentos",
      description:
        "Sube tus documentos de forma segura. Nuestro sistema los organizará automáticamente para un procesamiento eficiente.",
      icon: Upload,
      color: "bg-orange-100 text-orange-600",
      badge: "Documentos",
    },
    {
      number: 5,
      title: "Revisa tus servicios",
      description:
        "Accede a reportes en tiempo real sobre el estado de tus servicios contables y el progreso de tus trámites.",
      icon: FileCheck,
      color: "bg-red-100 text-red-600",
      badge: "Seguimiento",
    },
    {
      number: 6,
      title: "Contacta directamente",
      description:
        "Comunícate directamente con tu contador asignado a través de múltiples canales: chat, email o teléfono.",
      icon: Download,
      color: "bg-indigo-100 text-indigo-600",
      badge: "Soporte",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
      {steps.map((step, index) => (
        <Card key={step.number} className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${step.color}`}>
                <step.icon className="h-6 w-6" />
              </div>
              <Badge variant="secondary">{step.badge}</Badge>
            </div>
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-300">{step.number}</span>
              {step.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-sm leading-relaxed">{step.description}</CardDescription>

            {/* Indicador de progreso */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-xs text-green-600 font-medium">Paso {step.number}</span>
              </div>
              {index < steps.length - 1 && <ArrowRight className="h-4 w-4 text-gray-400" />}
            </div>
          </CardContent>

          {/* Número de paso en el fondo */}
          <div className="absolute top-4 right-4 text-6xl font-bold text-gray-100 opacity-50 pointer-events-none">
            {step.number}
          </div>
        </Card>
      ))}
    </div>
  )
}
