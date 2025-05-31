"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, ExternalLink } from "lucide-react"

interface AdBannerProps {
  position: "header" | "sidebar" | "content" | "footer" | "mobile"
  size: string
  className?: string
}

interface Ad {
  id: string
  title: string
  description: string
  imageUrl?: string
  targetUrl: string
  advertiser: string
}

// Anuncios de ejemplo (en producción vendrían de tu base de datos)
const sampleAds: Record<string, Ad> = {
  header: {
    id: "header-1",
    title: "🚀 Impulsa tu Negocio con Marketing Digital",
    description: "Aumenta tus ventas hasta 300% con nuestras estrategias probadas",
    imageUrl: "/placeholder.svg?height=90&width=728",
    targetUrl: "https://ejemplo-marketing.com",
    advertiser: "Marketing Pro",
  },
  sidebar: {
    id: "sidebar-1",
    title: "💼 Software Contable Profesional",
    description: "La solución completa para tu contabilidad empresarial",
    imageUrl: "/placeholder.svg?height=250&width=300",
    targetUrl: "https://ejemplo-software.com",
    advertiser: "ContaSoft",
  },
  content: {
    id: "content-1",
    title: "📊 Consultoría Financiera Especializada",
    description: "Optimiza tus finanzas con expertos certificados",
    imageUrl: "/placeholder.svg?height=90&width=728",
    targetUrl: "https://ejemplo-consultoria.com",
    advertiser: "FinanceExperts",
  },
  footer: {
    id: "footer-1",
    title: "🏦 Créditos Empresariales Rápidos",
    description: "Financia tu crecimiento con tasas preferenciales",
    imageUrl: "/placeholder.svg?height=90&width=728",
    targetUrl: "https://ejemplo-creditos.com",
    advertiser: "BancoEmpresarial",
  },
  mobile: {
    id: "mobile-1",
    title: "📱 App Contable Móvil",
    description: "Gestiona tu contabilidad desde cualquier lugar",
    targetUrl: "https://ejemplo-app.com",
    advertiser: "MobileAccounting",
  },
}

export function AdBanner({ position, size, className = "" }: AdBannerProps) {
  const [ad, setAd] = useState<Ad | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [impressionLogged, setImpressionLogged] = useState(false)

  useEffect(() => {
    // Cargar anuncio para esta posición
    const currentAd = sampleAds[position]
    if (currentAd) {
      setAd(currentAd)
    }
  }, [position])

  useEffect(() => {
    // Registrar impresión del anuncio (para estadísticas)
    if (ad && isVisible && !impressionLogged) {
      logAdImpression(ad.id, position)
      setImpressionLogged(true)
    }
  }, [ad, isVisible, impressionLogged, position])

  const logAdImpression = async (adId: string, position: string) => {
    try {
      // En producción, esto enviaría datos a tu servidor
      console.log(`Impresión registrada: Anuncio ${adId} en posición ${position}`)

      // Aquí podrías enviar datos a Google Analytics o tu sistema de tracking
      // fetch('/api/ad-impression', {
      //   method: 'POST',
      //   body: JSON.stringify({ adId, position, timestamp: new Date() })
      // })
    } catch (error) {
      console.error("Error registrando impresión:", error)
    }
  }

  const handleAdClick = () => {
    if (ad) {
      // Registrar clic del anuncio
      console.log(`Clic registrado: Anuncio ${ad.id}`)

      // En producción, esto enviaría datos a tu servidor para facturación
      // fetch('/api/ad-click', {
      //   method: 'POST',
      //   body: JSON.stringify({ adId: ad.id, position, timestamp: new Date() })
      // })

      // Abrir enlace en nueva pestaña
      window.open(ad.targetUrl, "_blank", "noopener,noreferrer")
    }
  }

  const handleCloseAd = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsVisible(false)
  }

  if (!ad || !isVisible) {
    return null
  }

  const getAdStyles = () => {
    const baseStyles =
      "relative border border-gray-200 rounded-lg overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50 hover:shadow-lg transition-all duration-300 cursor-pointer"

    switch (position) {
      case "header":
        return `${baseStyles} w-full max-w-4xl mx-auto h-24`
      case "sidebar":
        return `${baseStyles} w-full max-w-sm h-64`
      case "content":
        return `${baseStyles} w-full max-w-4xl mx-auto h-24 my-8`
      case "footer":
        return `${baseStyles} w-full max-w-4xl mx-auto h-20`
      case "mobile":
        return `${baseStyles} w-full h-16 md:hidden`
      default:
        return baseStyles
    }
  }

  return (
    <div className={`${getAdStyles()} ${className}`} onClick={handleAdClick}>
      {/* Botón de cerrar */}
      <button
        onClick={handleCloseAd}
        className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white rounded-full p-1 transition-colors"
        title="Cerrar anuncio"
      >
        <X className="h-3 w-3 text-gray-600" />
      </button>

      {/* Etiqueta de anuncio */}
      <div className="absolute top-2 left-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
        Anuncio
      </div>

      <div className="flex items-center h-full p-4">
        {/* Imagen del anuncio (si existe) */}
        {ad.imageUrl && position !== "mobile" && (
          <div className="flex-shrink-0 mr-4">
            <img
              src={ad.imageUrl || "/placeholder.svg"}
              alt={ad.title}
              className="w-16 h-16 object-cover rounded-lg"
              onError={(e) => {
                // Si la imagen falla, ocultarla
                e.currentTarget.style.display = "none"
              }}
            />
          </div>
        )}

        {/* Contenido del anuncio */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-sm md:text-base truncate">{ad.title}</h3>
          <p className="text-gray-600 text-xs md:text-sm mt-1 line-clamp-2">{ad.description}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500">por {ad.advertiser}</span>
            <ExternalLink className="h-3 w-3 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Efecto hover */}
      <div className="absolute inset-0 bg-blue-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  )
}
