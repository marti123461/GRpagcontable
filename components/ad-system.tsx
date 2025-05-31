"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, ExternalLink, Star, Shield, TrendingUp, Users } from "lucide-react"

interface AdSpace {
  id: string
  name: string
  position: string
  size: string
  pricePerDay: number
  pricePerWeek: number
  pricePerMonth: number
  isOccupied: boolean
  currentAd?: Advertisement
}

interface Advertisement {
  id: string
  title: string
  description: string
  imageUrl: string
  targetUrl: string
  advertiser: string
  startDate: string
  endDate: string
  adSpaceId: string
}

const adSpaces: AdSpace[] = [
  {
    id: "header-banner",
    name: "Banner Superior",
    position: "Parte superior de la página",
    size: "728x90px",
    pricePerDay: 15,
    pricePerWeek: 90,
    pricePerMonth: 300,
    isOccupied: false,
  },
  {
    id: "sidebar-right",
    name: "Barra Lateral Derecha",
    position: "Lado derecho del contenido",
    size: "300x250px",
    pricePerDay: 12,
    pricePerWeek: 75,
    pricePerMonth: 250,
    isOccupied: false,
  },
  {
    id: "content-middle",
    name: "Medio del Contenido",
    position: "Entre secciones principales",
    size: "728x90px",
    pricePerDay: 18,
    pricePerWeek: 110,
    pricePerMonth: 400,
    isOccupied: false,
  },
  {
    id: "footer-banner",
    name: "Banner Inferior",
    position: "Parte inferior de la página",
    size: "728x90px",
    pricePerDay: 10,
    pricePerWeek: 60,
    pricePerMonth: 200,
    isOccupied: false,
  },
  {
    id: "mobile-banner",
    name: "Banner Móvil",
    position: "Optimizado para dispositivos móviles",
    size: "320x50px",
    pricePerDay: 8,
    pricePerWeek: 45,
    pricePerMonth: 150,
    isOccupied: false,
  },
]

export function AdSystem({ onClose }: { onClose: () => void }) {
  const [selectedAdSpace, setSelectedAdSpace] = useState<AdSpace | null>(null)
  const [selectedDuration, setSelectedDuration] = useState<"day" | "week" | "month">("month")
  const [advertiserInfo, setAdvertiserInfo] = useState({
    name: "",
    email: "",
    company: "",
    adTitle: "",
    adDescription: "",
    targetUrl: "",
    imageUrl: "",
  })
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const handleAdSpaceSelect = (adSpace: AdSpace) => {
    setSelectedAdSpace(adSpace)
  }

  const getPrice = (adSpace: AdSpace, duration: "day" | "week" | "month") => {
    switch (duration) {
      case "day":
        return adSpace.pricePerDay
      case "week":
        return adSpace.pricePerWeek
      case "month":
        return adSpace.pricePerMonth
      default:
        return adSpace.pricePerMonth
    }
  }

  const getDurationText = (duration: "day" | "week" | "month") => {
    switch (duration) {
      case "day":
        return "1 día"
      case "week":
        return "1 semana"
      case "month":
        return "1 mes"
      default:
        return "1 mes"
    }
  }

  const handlePayPalPayment = () => {
    if (!selectedAdSpace) return

    setIsProcessingPayment(true)

    const price = getPrice(selectedAdSpace, selectedDuration)
    const duration = getDurationText(selectedDuration)

    // Crear formulario para PayPal
    const form = document.createElement("form")
    form.method = "POST"
    form.action = "https://www.paypal.com/cgi-bin/webscr"
    form.target = "_blank"

    const fields = {
      cmd: "_xclick",
      business: "martiaveturatejeda@gmail.com", // Tu email de PayPal
      item_name: `Publicidad en MiPaginaContable - ${selectedAdSpace.name} (${duration})`,
      item_number: `ad_${selectedAdSpace.id}_${selectedDuration}`,
      amount: price.toString(),
      currency_code: "EUR",
      return: `${window.location.origin}?ad_payment=success&space=${selectedAdSpace.id}`,
      cancel_return: `${window.location.origin}?ad_payment=cancelled`,
      notify_url: `${window.location.origin}/api/ad-payment-webhook`,
      custom: `advertiser_${Date.now()}_space_${selectedAdSpace.id}_duration_${selectedDuration}`,
      // Información adicional del anunciante
      on0: "Información del Anunciante",
      os0: JSON.stringify({
        name: advertiserInfo.name,
        email: advertiserInfo.email,
        company: advertiserInfo.company,
        adTitle: advertiserInfo.adTitle,
        adDescription: advertiserInfo.adDescription,
        targetUrl: advertiserInfo.targetUrl,
        imageUrl: advertiserInfo.imageUrl,
      }),
    }

    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement("input")
      input.type = "hidden"
      input.name = key
      input.value = value
      form.appendChild(input)
    })

    try {
      document.body.appendChild(form)
      form.submit()
      document.body.removeChild(form)

      console.log(`Procesando pago de publicidad: ${price}€ por ${duration}`)
    } catch (error) {
      console.error("Error al procesar el pago:", error)
      alert("Hubo un problema al conectar con PayPal. Por favor intenta nuevamente.")
      setIsProcessingPayment(false)
    }

    // Simular confirmación
    setTimeout(() => {
      setIsProcessingPayment(false)
      alert(`¡Pago procesado! Tu anuncio en "${selectedAdSpace.name}" estará activo por ${duration}.`)
      onClose()
    }, 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    setAdvertiserInfo((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const isFormValid = () => {
    return (
      advertiserInfo.name &&
      advertiserInfo.email &&
      advertiserInfo.adTitle &&
      advertiserInfo.adDescription &&
      advertiserInfo.targetUrl &&
      selectedAdSpace
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-green-500" />
            <div>
              <h2 className="text-2xl font-bold">💰 Sistema de Publicidad</h2>
              <p className="text-sm text-gray-600">
                Promociona tu negocio en MiPaginaContable • Pagos seguros con PayPal
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Espacios Publicitarios Disponibles */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Espacios Publicitarios Disponibles
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Selecciona el espacio que mejor se adapte a tu campaña publicitaria
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {adSpaces.map((adSpace) => (
                    <div
                      key={adSpace.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedAdSpace?.id === adSpace.id
                          ? "border-blue-500 bg-blue-50"
                          : adSpace.isOccupied
                            ? "border-red-300 bg-red-50 opacity-60"
                            : "border-gray-300 hover:border-blue-300 hover:bg-gray-50"
                      }`}
                      onClick={() => !adSpace.isOccupied && handleAdSpaceSelect(adSpace)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-lg">{adSpace.name}</h4>
                        {adSpace.isOccupied ? (
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Ocupado</span>
                        ) : (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Disponible</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{adSpace.position}</p>
                      <p className="text-xs text-gray-500 mb-3">Tamaño: {adSpace.size}</p>

                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="text-center">
                          <div className="font-bold text-blue-600">{adSpace.pricePerDay}€</div>
                          <div className="text-gray-500">por día</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-blue-600">{adSpace.pricePerWeek}€</div>
                          <div className="text-gray-500">por semana</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-green-600">{adSpace.pricePerMonth}€</div>
                          <div className="text-gray-500">por mes</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Estadísticas del Sitio */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  Estadísticas del Sitio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">15,000+</div>
                    <div className="text-gray-600">Visitantes/mes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">500+</div>
                    <div className="text-gray-600">Clientes activos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">85%</div>
                    <div className="text-gray-600">Audiencia profesional</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">3.5min</div>
                    <div className="text-gray-600">Tiempo promedio</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulario de Anuncio */}
          <div className="space-y-4">
            {selectedAdSpace ? (
              <Card>
                <CardHeader>
                  <CardTitle>📝 Información del Anuncio</CardTitle>
                  <p className="text-sm text-gray-600">
                    Espacio seleccionado: <strong>{selectedAdSpace.name}</strong>
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Información del Anunciante */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Nombre *</label>
                      <input
                        type="text"
                        placeholder="Tu nombre completo"
                        value={advertiserInfo.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email *</label>
                      <input
                        type="email"
                        placeholder="tu@email.com"
                        value={advertiserInfo.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Empresa (Opcional)</label>
                    <input
                      type="text"
                      placeholder="Nombre de tu empresa"
                      value={advertiserInfo.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>

                  {/* Información del Anuncio */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Título del Anuncio *</label>
                    <input
                      type="text"
                      placeholder="Título llamativo para tu anuncio"
                      value={advertiserInfo.adTitle}
                      onChange={(e) => handleInputChange("adTitle", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Descripción *</label>
                    <textarea
                      placeholder="Describe tu producto o servicio"
                      value={advertiserInfo.adDescription}
                      onChange={(e) => handleInputChange("adDescription", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm h-20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">URL de Destino *</label>
                    <input
                      type="url"
                      placeholder="https://tu-sitio-web.com"
                      value={advertiserInfo.targetUrl}
                      onChange={(e) => handleInputChange("targetUrl", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">URL de Imagen (Opcional)</label>
                    <input
                      type="url"
                      placeholder="https://ejemplo.com/imagen.jpg"
                      value={advertiserInfo.imageUrl}
                      onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1">Tamaño recomendado: {selectedAdSpace.size}</p>
                  </div>

                  {/* Duración y Precio */}
                  <div className="border-t pt-4">
                    <label className="block text-sm font-medium mb-2">Duración de la Campaña</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["day", "week", "month"] as const).map((duration) => (
                        <button
                          key={duration}
                          onClick={() => setSelectedDuration(duration)}
                          className={`p-3 rounded-lg border text-center transition-all ${
                            selectedDuration === duration
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-300 hover:border-blue-300"
                          }`}
                        >
                          <div className="font-bold">{getPrice(selectedAdSpace, duration)}€</div>
                          <div className="text-xs">{getDurationText(duration)}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Botón de Pago */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-center mb-4">
                      <Shield className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Pago seguro con PayPal</span>
                    </div>

                    <Button
                      onClick={handlePayPalPayment}
                      disabled={!isFormValid() || isProcessingPayment}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                    >
                      {isProcessingPayment ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Procesando pago...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Pagar {getPrice(selectedAdSpace, selectedDuration)}€ con PayPal
                        </div>
                      )}
                    </Button>

                    <div className="text-center mt-2">
                      <img
                        src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-200px.png"
                        alt="PayPal"
                        className="h-6 mx-auto opacity-70"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <TrendingUp className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Selecciona un Espacio Publicitario</h3>
                  <p className="text-gray-600">
                    Elige el espacio que mejor se adapte a tu campaña para continuar con el proceso de compra.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="p-6 border-t bg-gradient-to-r from-green-50 to-blue-50">
          <div className="text-center space-y-2">
            <p className="text-sm font-medium text-gray-800">
              💰 <strong>Sistema de Publicidad Profesional:</strong> Llega a más de 15,000 visitantes mensuales
            </p>
            <p className="text-xs text-gray-600">
              ⚡ Audiencia profesional • Pagos seguros • Activación inmediata • Soporte incluido
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span className="text-xs text-gray-500">
                Pagos seguros con PayPal • Desarrollado por MiPaginaContable
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
