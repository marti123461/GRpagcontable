// Mejorar el manejo del webhook de PayPal para mayor seguridad y robustez

import { NextResponse } from "next/server"

// Función para verificar la autenticidad del webhook de PayPal
async function verifyPayPalWebhook(body: string): Promise<boolean> {
  try {
    // En producción, aquí verificarías la autenticidad con PayPal
    // https://developer.paypal.com/docs/api-basics/notifications/ipn/IPNImplementation/

    // Para esta implementación, simplemente registramos y devolvemos true
    console.log("Verificando webhook de PayPal")
    return true
  } catch (error) {
    console.error("Error verificando webhook:", error)
    return false
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.text()
    console.log("PayPal Webhook recibido:", body)

    // Verificar la autenticidad del webhook
    const isValid = await verifyPayPalWebhook(body)
    if (!isValid) {
      console.error("Webhook no válido")
      return NextResponse.json({ error: "Webhook no válido" }, { status: 400 })
    }

    // Procesar la notificación de PayPal
    const params = new URLSearchParams(body)
    const paymentStatus = params.get("payment_status")
    const txnType = params.get("txn_type")
    const custom = params.get("custom")
    const payerEmail = params.get("payer_email")
    const mcGross = params.get("mc_gross")
    const receiverEmail = params.get("receiver_email")

    console.log("Detalles del pago:", {
      paymentStatus,
      txnType,
      custom,
      payerEmail,
      mcGross,
      receiverEmail,
    })

    // Verificar que el receptor sea correcto
    if (receiverEmail !== "martiaveturatejeda@gmail.com") {
      console.error("Email de receptor incorrecto:", receiverEmail)
      return NextResponse.json({ error: "Receptor no válido" }, { status: 400 })
    }

    // Actualizar la suscripción del usuario
    if (paymentStatus === "Completed") {
      // Aquí actualizarías la base de datos del usuario
      console.log("Pago completado exitosamente")

      // Extraer información del campo custom
      if (custom) {
        const customParts = custom.split("_")
        if (customParts.length >= 4) {
          const userId = customParts[1]
          const planId = customParts[3]
          console.log(`Activando plan ${planId} para usuario ${userId}`)

          // Aquí actualizarías la base de datos
        }
      }

      // Enviar confirmación al cliente (en un sistema real)
      console.log("Enviando confirmación al cliente")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error procesando webhook de PayPal:", error)
    return NextResponse.json({ error: "Error procesando webhook" }, { status: 500 })
  }
}
