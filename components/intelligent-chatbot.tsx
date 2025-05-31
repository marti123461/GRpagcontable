"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Send, Bot, User, Lightbulb, Sparkles } from "lucide-react"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  suggestions?: string[]
}

interface ChatbotProps {
  onClose: () => void
}

export function IntelligentChatbot({ onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "¡Hola! 👋 Soy **ContaBot**, tu asistente contable inteligente. Estoy aquí para ayudarte con todas tus dudas sobre contabilidad, impuestos, finanzas y más. \n\n¿En qué puedo ayudarte hoy?",
      isBot: true,
      timestamp: new Date(),
      suggestions: [
        "¿Cómo registro una venta?",
        "¿Qué impuestos debo pagar?",
        "¿Cómo hago un balance?",
        "¿Qué es un asiento contable?",
      ],
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Base de conocimiento contable inteligente
  const getIntelligentResponse = (userMessage: string): { text: string; suggestions?: string[] } => {
    const message = userMessage.toLowerCase()

    // Saludos y cortesía
    if (message.includes("hola") || message.includes("buenos") || message.includes("buenas")) {
      return {
        text: "¡Hola! 😊 Me da mucho gusto saludarte. Soy ContaBot, tu experto en contabilidad virtual. Tengo más de 15 años de conocimiento contable programado para ayudarte. \n\n¿Qué tema contable te interesa explorar hoy?",
        suggestions: ["Registrar transacciones", "Calcular impuestos", "Estados financieros", "Nóminas"],
      }
    }

    // Preguntas sobre ventas
    if (message.includes("venta") || message.includes("registrar venta") || message.includes("factura")) {
      return {
        text: "📊 **Registro de Ventas - Guía Completa:**\n\n**Para ventas al contado:**\n• Débito: Efectivo/Banco\n• Crédito: Ventas\n\n**Para ventas a crédito:**\n• Débito: Cuentas por Cobrar\n• Crédito: Ventas\n\n**Documentos necesarios:**\n✅ Factura de venta\n✅ Comprobante de pago (si es contado)\n✅ Registro en libro de ventas\n\n¿Te gustaría que te explique algún tipo específico de venta?",
        suggestions: ["Venta con descuento", "Venta a crédito", "Venta con IVA", "Devoluciones"],
      }
    }

    // Preguntas sobre impuestos
    if (
      message.includes("impuesto") ||
      message.includes("itbis") ||
      message.includes("isr") ||
      message.includes("tributario")
    ) {
      return {
        text: "💰 **Guía de Impuestos en República Dominicana:**\n\n**ITBIS (18%):**\n• Se aplica a bienes y servicios\n• Declaración mensual hasta el 20\n• Formulario IR-2\n\n**ISR (Impuesto Sobre la Renta):**\n• Personas físicas: 0% a 25%\n• Empresas: 27%\n• Declaración anual en marzo\n\n**Otros impuestos:**\n• Impuesto a los Activos\n• Impuesto Selectivo al Consumo\n\n¿Necesitas ayuda con algún impuesto específico?",
        suggestions: ["Calcular ITBIS", "Declaración ISR", "Retenciones", "Formularios DGII"],
      }
    }

    // Preguntas sobre asientos contables
    if (
      message.includes("asiento") ||
      message.includes("débito") ||
      message.includes("crédito") ||
      message.includes("partida doble")
    ) {
      return {
        text: "📝 **Asientos Contables - Principios Fundamentales:**\n\n**Regla de Oro:**\n• **Débito** = Lo que entra o aumenta\n• **Crédito** = Lo que sale o disminuye\n\n**Ejemplo práctico:**\nVenta por $100,000:\n```\nCuentas por Cobrar    $100,000  (Débito)\n    Ventas                      $100,000  (Crédito)\n```\n\n**Verificación:**\n✅ Débitos = Créditos\n✅ Ecuación contable balanceada\n\n¿Quieres que te ayude con un asiento específico?",
        suggestions: ["Asiento de compra", "Asiento de pago", "Asiento de nómina", "Corrección de errores"],
      }
    }

    // Preguntas sobre balance
    if (
      message.includes("balance") ||
      message.includes("estado financiero") ||
      message.includes("activo") ||
      message.includes("pasivo")
    ) {
      return {
        text: "📊 **Estados Financieros - Guía Completa:**\n\n**Balance General:**\n• **Activos** = Pasivos + Patrimonio\n• Muestra la situación financiera en una fecha\n\n**Estado de Resultados:**\n• Ingresos - Gastos = Utilidad\n• Muestra rentabilidad del período\n\n**Flujo de Efectivo:**\n• Actividades operativas\n• Actividades de inversión\n• Actividades de financiamiento\n\n**¿Sabías que?** 💡\nNuestro sistema genera estos reportes automáticamente.\n\n¿Qué estado financiero te interesa más?",
        suggestions: ["Balance General", "Estado de Resultados", "Flujo de Efectivo", "Análisis financiero"],
      }
    }

    // Preguntas sobre nómina
    if (
      message.includes("nómina") ||
      message.includes("salario") ||
      message.includes("empleado") ||
      message.includes("sueldo")
    ) {
      return {
        text: "👥 **Gestión de Nóminas - Todo lo que necesitas saber:**\n\n**Componentes del salario:**\n• Salario base\n• Horas extras (doble tiempo)\n• Bonificaciones\n• Comisiones\n\n**Descuentos obligatorios:**\n• Seguro Social (2.87%)\n• AFP (2.87%)\n• ISR (según escala)\n\n**Prestaciones laborales:**\n• Vacaciones\n• Regalía\n• Cesantía\n\n**Fechas importantes:**\n• Pago: Antes del 25 de cada mes\n• TSS: Antes del 30\n\n¿Necesitas ayuda con algún cálculo específico?",
        suggestions: ["Calcular ISR", "Liquidación empleado", "Prestaciones laborales", "Registro contable nómina"],
      }
    }

    // Preguntas sobre el sistema
    if (
      message.includes("sistema") ||
      message.includes("plataforma") ||
      message.includes("software") ||
      message.includes("usar")
    ) {
      return {
        text: "🚀 **Nuestro Sistema Contable Inteligente:**\n\n**Características principales:**\n• 🧠 IA que lee transacciones automáticamente\n• 📊 Genera asientos contables perfectos\n• 📈 Reportes financieros en tiempo real\n• 🔒 100% seguro y confiable\n\n**¿Cómo funciona?**\n1. Escribes las transacciones en lenguaje natural\n2. La IA extrae montos, clientes y conceptos\n3. Genera el diario general automáticamente\n4. Exportas a Excel listo para auditoría\n\n¿Te gustaría probarlo ahora mismo?",
        suggestions: ["Probar sistema", "Ver demo", "Precios", "Contactar asesor"],
      }
    }

    // Preguntas sobre precios/costos
    if (
      message.includes("precio") ||
      message.includes("costo") ||
      message.includes("cuanto") ||
      message.includes("tarifa")
    ) {
      return {
        text: "💼 **Nuestros Servicios y Tarifas:**\n\n**Paquetes disponibles:**\n\n🥉 **Básico** - RD$15,000/mes\n• Contabilidad general\n• Declaraciones básicas\n• Soporte por email\n\n🥈 **Profesional** - RD$25,000/mes\n• Todo lo anterior +\n• Nóminas incluidas\n• Asesoría fiscal\n• Soporte telefónico\n\n🥇 **Empresarial** - RD$40,000/mes\n• Todo lo anterior +\n• Auditorías internas\n• Consultor dedicado\n• Reportes personalizados\n\n**¡Primera consulta GRATIS!** 🎁\n\n¿Te interesa algún paquete en particular?",
        suggestions: ["Consulta gratis", "Comparar paquetes", "Contactar asesor", "Ver beneficios"],
      }
    }

    // Preguntas sobre contacto
    if (
      message.includes("contacto") ||
      message.includes("teléfono") ||
      message.includes("email") ||
      message.includes("hablar")
    ) {
      return {
        text: "📞 **¡Estamos aquí para ayudarte!**\n\n**Contacto directo:**\n• 📱 **Teléfono:** 809-448-3593\n• 📧 **Email:** martiaveturatejeda@gmail.com\n• 💬 **WhatsApp:** 809-448-3593\n\n**Horarios de atención:**\n• Lunes a Viernes: 8:00 AM - 6:00 PM\n• Sábados: 9:00 AM - 1:00 PM\n\n**Contador Principal:**\n👨‍💼 **Jhonson'S Brioso Tejeda, CPA**\n• 15+ años de experiencia\n• Especialista en PYMES\n• Certificado DGII\n\n¿Prefieres que te contactemos nosotros?",
        suggestions: ["Solicitar llamada", "Agendar cita", "WhatsApp", "Email directo"],
      }
    }

    // Respuesta por defecto inteligente
    return {
      text: "🤔 Entiendo tu consulta, pero me gustaría ayudarte de la mejor manera posible. \n\n**Soy experto en:**\n• 📊 Contabilidad general\n• 💰 Impuestos y tributación\n• 👥 Nóminas y recursos humanos\n• 📈 Estados financieros\n• 🔧 Corrección de errores\n• 💼 Asesoría empresarial\n\n¿Podrías ser más específico sobre tu consulta? O si prefieres, puedes contactar directamente a nuestro equipo humano para una asesoría personalizada.",
      suggestions: ["Hablar con contador", "Ver temas disponibles", "Contacto directo", "Ejemplos de consultas"],
    }
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")
    setIsTyping(true)

    // Simular tiempo de procesamiento de IA
    setTimeout(() => {
      const response = getIntelligentResponse(inputText)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isBot: true,
        timestamp: new Date(),
        suggestions: response.suggestions,
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-[80vh] flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Header */}
        <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bot className="h-8 w-8" />
                <Sparkles className="h-4 w-4 absolute -top-1 -right-1 text-yellow-300" />
              </div>
              <div>
                <h2 className="text-xl font-bold">ContaBot IA</h2>
                <p className="text-blue-100 text-sm">Tu asistente contable inteligente • Disponible 24/7</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
              <div className={`max-w-[80%] ${message.isBot ? "order-2" : "order-1"}`}>
                <div className={`flex items-start gap-2 ${message.isBot ? "" : "flex-row-reverse"}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.isBot
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {message.isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </div>
                  <div
                    className={`rounded-lg p-3 ${
                      message.isBot
                        ? "bg-white border border-blue-200 text-gray-800"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    }`}
                  >
                    <div className="whitespace-pre-line text-sm leading-relaxed">
                      {message.text
                        .split("**")
                        .map((part, index) => (index % 2 === 1 ? <strong key={index}>{part}</strong> : part))}
                    </div>
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>

                {/* Suggestions */}
                {message.suggestions && (
                  <div className="mt-2 ml-10 flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-full transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-white border border-blue-200 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu consulta contable aquí... (ej: ¿Cómo registro una venta?)"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-center mt-2 text-xs text-gray-500">
            <Lightbulb className="h-3 w-3 mr-1" />
            Pregúntame sobre contabilidad, impuestos, nóminas, estados financieros y más
          </div>
        </div>
      </Card>
    </div>
  )
}
