"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Download, X, Building, Copy, Zap, CheckCircle, CreditCard, Shield, Crown } from "lucide-react"
import { useAuth } from "./auth-provider"
import { ProtectedRoute } from "./protected-route"

interface Transaction {
  id: string
  date: string
  company: string
  description: string
  amount: number
  detectedType: "income" | "expense" | "asset" | "liability" | "equity" | "collection" | "payment" | "discount"
  originalText: string
  clientName?: string
  concept?: string
  paymentTerms?: string
  specificDetail?: string
}

interface JournalEntry {
  date: string
  account: string
  auxiliary: string
  debit: number
  credit: number
  transactionId?: string
}

interface SubscriptionPlan {
  id: string
  name: string
  price: number
  currency: string
  features: string[]
  transactionLimit: number
  color: string
  recommended?: boolean
  paypalPlanId?: string
}

export function AccountingSystem({ onClose }: { onClose: () => void }) {
  const { user, hasAccess, updateSubscription } = useAuth()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [company, setCompany] = useState("")
  const [transactionText, setTransactionText] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPlans, setShowPlans] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState<string>("")
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false)

  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: "free",
      name: "Gratuito",
      price: 0,
      currency: "EUR",
      features: [
        "Hasta 5 transacciones por mes",
        "Extracción básica de datos",
        "Exportación a CSV",
        "Soporte por email",
      ],
      transactionLimit: 5,
      color: "bg-gray-100 border-gray-300 text-gray-800",
    },
    {
      id: "medium",
      name: "Medio",
      price: 25,
      currency: "EUR",
      features: [
        "Hasta 100 transacciones por mes",
        "IA avanzada con precisión mejorada",
        "Exportación a CSV y Excel",
        "Detección automática de clientes",
        "Soporte prioritario",
      ],
      transactionLimit: 100,
      color: "bg-blue-100 border-blue-300 text-blue-800",
      recommended: true,
      paypalPlanId: "P-5ML4271244454362WXNWU5NQ",
    },
    {
      id: "premium",
      name: "Premium",
      price: 50,
      currency: "EUR",
      features: [
        "Transacciones ilimitadas",
        "IA súper inteligente V2.0",
        "Exportación a múltiples formatos",
        "Integración con software contable",
        "Asistente contable personalizado",
        "Soporte 24/7",
      ],
      transactionLimit: Number.POSITIVE_INFINITY,
      color: "bg-yellow-100 border-yellow-300 text-yellow-800",
      paypalPlanId: "P-1GJ4568789604323MXNWU5NQ",
    },
  ]

  const getCurrentPlan = () => {
    return subscriptionPlans.find((p) => p.id === user?.plan) || subscriptionPlans[0]
  }

  const checkTransactionLimit = () => {
    const currentPlan = getCurrentPlan()

    if (transactions.length >= currentPlan.transactionLimit) {
      alert(
        `Has alcanzado el límite de ${currentPlan.transactionLimit} transacciones de tu plan ${currentPlan.name}. Actualiza tu plan para procesar más transacciones.`,
      )
      setShowPlans(true)
      return false
    }
    return true
  }

  const handlePayPalPayment = (planId: string) => {
    const plan = subscriptionPlans.find((p) => p.id === planId)
    if (!plan || plan.price === 0) return

    setIsPaymentProcessing(true)
    setSelectedPlanForPayment(planId)

    // Crear formulario dinámico para PayPal
    const form = document.createElement("form")
    form.method = "POST"
    form.action = "https://www.paypal.com/cgi-bin/webscr"
    form.target = "_blank"

    const fields = {
      cmd: "_xclick",
      business: "martiaveturatejeda@gmail.com",
      item_name: `MiPaginaContable - Plan ${plan.name} (1 mes)`,
      item_number: `${plan.id}_monthly`,
      amount: plan.price.toString(),
      currency_code: "EUR",
      return: `${window.location.origin}?payment=success&plan=${plan.id}`,
      cancel_return: `${window.location.origin}?payment=cancelled`,
      notify_url: `${window.location.origin}/api/paypal-webhook`,
      custom: `user_${user?.id}_plan_${plan.id}_onetime_${Date.now()}`,
    }

    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement("input")
      input.type = "hidden"
      input.name = key
      input.value = value
      form.appendChild(input)
    })

    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)

    // Simular confirmación de pago para demo
    setTimeout(() => {
      setIsPaymentProcessing(false)
      setShowPaymentModal(false)
      setShowPlans(false)
      updateSubscription(planId, `PAYPAL_${Date.now()}`)
      alert(`¡Pago procesado exitosamente! Tu plan ${plan.name} está activo por 30 días.`)
    }, 3000)
  }

  const PaymentModal = () => {
    const plan = subscriptionPlans.find((p) => p.id === selectedPlanForPayment)
    if (!plan || plan.price === 0) return null

    return (
      <div className="fixed inset-0 bg-black/70 z-[10001] flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Actualizar a Plan {plan.name}</h3>
            <button onClick={() => setShowPaymentModal(false)} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mb-6">
            <div className="border rounded-lg p-4 mb-4 bg-blue-50">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Plan {plan.name}</span>
                <span className="font-bold text-lg">
                  {plan.price} {plan.currency}/mes
                </span>
              </div>

              <ul className="text-sm space-y-1">
                {plan.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm text-gray-600">Pago seguro con PayPal</span>
            </div>

            <Button
              onClick={() => handlePayPalPayment(selectedPlanForPayment)}
              disabled={isPaymentProcessing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
            >
              {isPaymentProcessing ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Procesando...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pagar {plan.price}€ con PayPal
                </div>
              )}
            </Button>

            <div className="text-center">
              <img
                src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-200px.png"
                alt="PayPal"
                className="h-8 mx-auto opacity-70"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Resto de las funciones de IA (extractAmount, extractClientName, etc.) - mantener igual
  const extractAmount = (text: string): number => {
    try {
      const cleanText = text.replace(/\s+/g, " ").trim()
      const patterns = [
        /\$\s*([0-9]{1,3}(?:,[0-9]{3})*(?:\.[0-9]{1,2})?)/g,
        /por\s+valor\s+de\s+\$?\s*([0-9]{1,3}(?:,[0-9]{3})*(?:\.[0-9]{1,2})?)/gi,
        /([0-9]{1,3}(?:,[0-9]{3})+(?:\.[0-9]{1,2})?)/g,
      ]

      for (const pattern of patterns) {
        const matches = [...cleanText.matchAll(pattern)]
        for (const match of matches) {
          if (match[1]) {
            const numberStr = match[1].replace(/,/g, "")
            const number = Number.parseFloat(numberStr)
            if (!isNaN(number) && number >= 1000) {
              return number
            }
          }
        }
      }
      return 0
    } catch (error) {
      return 0
    }
  }

  const extractClientName = (text: string): string => {
    try {
      const patterns = [
        /(?:distribuidora|casa|frank|supermercado|tienda|empresa|compañía)\s+([a-záéíóúñ\s]+?)(?:\s+(?:pagó|pago|realizó|abonó|devolvieron)|$)/i,
        /cliente\s+([a-záéíóúñ\s]+?)(?:\s+(?:pagó|pago|por)|$)/i,
        /([a-záéíóúñ\s]{3,25})\s+(?:pagó|pago|realizó|abonó|devolvieron)/i,
      ]

      for (const pattern of patterns) {
        const match = text.match(pattern)
        if (match && match[1]) {
          let name = match[1].trim()
          name = name.replace(/\b(por|de|del|la|el|en|con|para|que|se|un|una|y|a|o)\b/gi, "").trim()
          name = name
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ")

          if (name.length > 2 && name.length < 50) {
            return name
          }
        }
      }
      return ""
    } catch (error) {
      return ""
    }
  }

  const detectTransactionType = (text: string) => {
    if (/abono|abonó|realizó\s+un\s+abono/i.test(text)) return "collection"
    if (/descuento|devolución|devolvieron/i.test(text)) return "discount"
    if (/venta.*crédito|se.*vende|se.*realizó.*venta/i.test(text)) return "income"
    return "income"
  }

  const extractDate = (text: string): string => {
    const today = new Date()
    if (/hoy/i.test(text)) return today.toISOString().split("T")[0]
    return today.toISOString().split("T")[0]
  }

  const extractConcept = (text: string): string => {
    if (/venta.*mercancía/i.test(text)) return "venta de mercancía"
    if (/abono|abonó/i.test(text)) return "abono a cuenta"
    if (/descuento.*devolución/i.test(text)) return "descuento y devolución de venta"
    return "venta de mercancía"
  }

  const extractPaymentTerms = (text: string): string => {
    const match30 = text.match(/30\s*días?/i)
    if (match30) return "30 días"
    if (/contado|efectivo/i.test(text)) return "contado"
    return ""
  }

  const processTransactions = async () => {
    if (!company.trim() || !transactionText.trim()) {
      alert("Por favor completa el nombre de la empresa y las transacciones")
      return
    }

    if (!checkTransactionLimit()) return

    setIsProcessing(true)

    try {
      const currentPlan = getCurrentPlan()
      const processingTime = currentPlan.id === "free" ? 2000 : currentPlan.id === "medium" ? 1000 : 500
      await new Promise((resolve) => setTimeout(resolve, processingTime))

      const lines = transactionText
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 15)

      const newTransactions: Transaction[] = []

      for (let index = 0; index < lines.length; index++) {
        const line = lines[index]
        const amount = extractAmount(line)

        if (amount > 0) {
          const transaction: Transaction = {
            id: `${Date.now()}-${index}-${Math.random()}`,
            date: extractDate(line),
            company: company.trim(),
            description: line,
            amount,
            detectedType: detectTransactionType(line),
            originalText: line,
            clientName: extractClientName(line) || "Cliente General",
            concept: extractConcept(line),
            paymentTerms: extractPaymentTerms(line),
            specificDetail: "",
          }
          newTransactions.push(transaction)
        }
      }

      if (newTransactions.length > 0) {
        const currentPlan = getCurrentPlan()
        if (transactions.length + newTransactions.length > currentPlan.transactionLimit) {
          const canAdd = currentPlan.transactionLimit - transactions.length
          if (canAdd <= 0) {
            alert(
              `Has alcanzado el límite de ${currentPlan.transactionLimit} transacciones de tu plan ${currentPlan.name}.`,
            )
            setShowPlans(true)
          } else {
            const limitedTransactions = newTransactions.slice(0, canAdd)
            setTransactions((prev) => [...prev, ...limitedTransactions])
            alert(`Se procesaron ${limitedTransactions.length} transacciones. Límite alcanzado.`)
            setShowPlans(true)
          }
        } else {
          setTransactions((prev) => [...prev, ...newTransactions])
          setTransactionText("")
          alert(`✅ Se procesaron ${newTransactions.length} transacciones con IA ${currentPlan.name}`)
        }
      } else {
        alert("❌ No se encontraron transacciones válidas.")
      }
    } catch (error) {
      alert("❌ Error procesando transacciones.")
    } finally {
      setIsProcessing(false)
    }
  }

  const removeTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id))
  }

  const generateJournalEntries = (): JournalEntry[] => {
    const entries: JournalEntry[] = []
    transactions.forEach((transaction) => {
      const clientName = transaction.clientName || "Cliente General"
      const amount = transaction.amount

      switch (transaction.detectedType) {
        case "income":
          entries.push({
            date: transaction.date,
            account: "cuenta por cobrar",
            auxiliary: `${clientName} ${amount.toLocaleString("es-DO", { minimumFractionDigits: 2 })}`,
            debit: amount,
            credit: 0,
            transactionId: transaction.id,
          })
          entries.push({
            date: transaction.date,
            account: "venta de mercancía",
            auxiliary: `para registra venta de mercancía a ${clientName.toLowerCase()}`,
            debit: 0,
            credit: amount,
            transactionId: transaction.id,
          })
          break
        // Agregar otros casos según necesidad
      }
    })
    return entries
  }

  const journalEntries = generateJournalEntries()

  const exportToCSV = () => {
    const headers = ["Fecha", "Nombre de la Cuenta", "Auxiliar", "Débito", "Crédito"]
    const csvContent = [
      headers.join(","),
      ...journalEntries.map((entry) =>
        [entry.date, entry.account, entry.auxiliary, entry.debit || "", entry.credit || ""].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `diario-general-${company || "empresa"}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const exampleTexts = [
    `El 1 de mayo se realizó una venta a crédito por valor de $1,230,000.00 a Frank muebles, para pagar en 30 días
El 3 de mayo la tienda distribuidora Corripio realizó un abono de $300,000 a la compra realizada`,
  ]

  return (
    <ProtectedRoute requiredPlan="free" onUpgrade={() => setShowPlans(true)}>
      <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
        {showPaymentModal && <PaymentModal />}
        <div className="bg-white rounded-lg max-w-7xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="h-6 w-6 text-yellow-500" />
              <div>
                <h2 className="text-2xl font-bold">🧠 Sistema Contable Inteligente</h2>
                <p className="text-sm text-gray-600">
                  Usuario: {user?.name} • Plan: {getCurrentPlan().name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Plan {getCurrentPlan().name}</span>
                  <Button variant="outline" size="sm" onClick={() => setShowPlans(true)} className="h-7 px-2 py-1">
                    {getCurrentPlan().id === "free" ? "Actualizar" : "Cambiar"}
                  </Button>
                </div>
                <span className="text-xs text-gray-600">
                  {transactions.length}/
                  {getCurrentPlan().transactionLimit === Number.POSITIVE_INFINITY
                    ? "∞"
                    : getCurrentPlan().transactionLimit}{" "}
                  transacciones
                </span>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Sección de Planes */}
          {showPlans && (
            <div className="p-6 border-b">
              <h3 className="text-xl font-bold mb-4">Planes Disponibles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {subscriptionPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`border rounded-lg p-4 transition-all ${
                      user?.plan === plan.id ? `${plan.color} border-2` : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-lg flex items-center gap-2">
                        {plan.id === "premium" && <Crown className="h-5 w-5 text-yellow-500" />}
                        {plan.name}
                      </h4>
                      {plan.recommended && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Recomendado</span>
                      )}
                    </div>
                    <div className="mb-4">
                      <span className="text-2xl font-bold">{plan.price}</span>
                      <span className="text-gray-600"> {plan.currency}/mes</span>
                    </div>
                    <ul className="space-y-2 mb-4">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.price === 0 ? (
                      <Button
                        className="w-full"
                        variant={user?.plan === plan.id ? "default" : "outline"}
                        disabled={user?.plan === plan.id}
                      >
                        {user?.plan === plan.id ? "Plan Actual" : "Plan Gratuito"}
                      </Button>
                    ) : (
                      <Button
                        className="w-full"
                        onClick={() => {
                          setSelectedPlanForPayment(plan.id)
                          setShowPaymentModal(true)
                        }}
                        disabled={user?.plan === plan.id}
                      >
                        {user?.plan === plan.id ? "Plan Actual" : `Actualizar a ${plan.name}`}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" onClick={() => setShowPlans(false)}>
                  Cerrar
                </Button>
              </div>
            </div>
          )}

          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Entrada de Texto */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Empresa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <input
                    type="text"
                    placeholder="Ej: Consultoría Integral SA"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Transacciones Comerciales
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Plan {getCurrentPlan().name} • {transactions.length}/
                    {getCurrentPlan().transactionLimit === Number.POSITIVE_INFINITY
                      ? "∞"
                      : getCurrentPlan().transactionLimit}{" "}
                    transacciones usadas
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Ingresa tus transacciones aquí..."
                    value={transactionText}
                    onChange={(e) => setTransactionText(e.target.value)}
                    className="min-h-[200px] text-sm"
                  />

                  <Button
                    onClick={processTransactions}
                    className="w-full"
                    disabled={!company.trim() || !transactionText.trim() || isProcessing}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    {isProcessing ? "Procesando..." : `Procesar con IA ${getCurrentPlan().name}`}
                  </Button>
                </CardContent>
              </Card>

              {/* Ejemplos */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">📋 Ejemplos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {exampleTexts.map((example, index) => (
                      <div key={index} className="relative">
                        <div className="p-3 bg-yellow-50 rounded-lg text-sm font-mono whitespace-pre-line border border-yellow-200">
                          {example}
                        </div>
                        <button
                          onClick={() => setTransactionText(example)}
                          className="absolute top-2 right-2 p-1 bg-white rounded shadow hover:bg-yellow-100"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Transacciones Procesadas */}
              {transactions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Transacciones Procesadas ({transactions.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {transactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200"
                        >
                          <div className="flex-1">
                            <div className="font-medium">
                              {transaction.clientName} - ${transaction.amount.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600">{transaction.date}</div>
                          </div>
                          <button
                            onClick={() => removeTransaction(transaction.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Diario General */}
            <div className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">📊 Diario General</CardTitle>
                    <p className="text-sm text-gray-600">Formato profesional listo para auditoría</p>
                  </div>
                  {journalEntries.length > 0 && (
                    <Button onClick={exportToCSV} variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Descargar CSV
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-400 text-sm">
                      <thead>
                        <tr className="bg-blue-100">
                          <th className="border border-gray-400 p-2 text-left font-bold text-xs">FECHA</th>
                          <th className="border border-gray-400 p-2 text-left font-bold text-xs">CUENTA</th>
                          <th className="border border-gray-400 p-2 text-left font-bold text-xs">AUXILIAR</th>
                          <th className="border border-gray-400 p-2 text-right font-bold text-xs">DÉBITO</th>
                          <th className="border border-gray-400 p-2 text-right font-bold text-xs">CRÉDITO</th>
                        </tr>
                      </thead>
                      <tbody>
                        {journalEntries.map((entry, index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-orange-100" : "bg-white"}>
                            <td className="border border-gray-400 p-1 text-xs">{entry.date}</td>
                            <td className="border border-gray-400 p-1 text-xs font-medium">{entry.account}</td>
                            <td className="border border-gray-400 p-1 text-xs">{entry.auxiliary}</td>
                            <td className="border border-gray-400 p-1 text-right text-xs">
                              {entry.debit > 0 ? entry.debit.toLocaleString("es-DO", { minimumFractionDigits: 2 }) : ""}
                            </td>
                            <td className="border border-gray-400 p-1 text-right text-xs">
                              {entry.credit > 0
                                ? entry.credit.toLocaleString("es-DO", { minimumFractionDigits: 2 })
                                : ""}
                            </td>
                          </tr>
                        ))}
                        {journalEntries.length === 0 && (
                          <tr>
                            <td colSpan={5} className="border border-gray-400 p-8 text-center text-gray-500">
                              <div className="space-y-2">
                                <Zap className="h-8 w-8 mx-auto opacity-30" />
                                <p>Procesa transacciones para ver el diario general</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
