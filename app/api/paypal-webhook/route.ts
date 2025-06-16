// Mejorar el manejo del webhook de PayPal para mayor seguridad y robustez

import { NextResponse } from "next/server"

// Función para verificar la autenticidad del webhook de PayPal
async function verifyPayPalWebhook(body: string, headers: any): Promise<boolean> {
  try {
    // Verificar la firma del webhook de PayPal
    const webhookId = process.env.PAYPAL_WEBHOOK_ID
    const paypalSignature = headers["paypal-transmission-sig"]
    const paypalCertId = headers["paypal-cert-id"]
    const paypalTransmissionId = headers["paypal-transmission-id"]
    const paypalTransmissionTime = headers["paypal-transmission-time"]

    if (!webhookId || !paypalSignature) {
      console.error("Missing webhook verification data")
      return false
    }

    // En producción, verificar la firma con PayPal
    // https://developer.paypal.com/docs/api-basics/notifications/webhooks/verification/

    const verificationData = {
      auth_algo: headers["paypal-auth-algo"] || "SHA256withRSA",
      cert_id: paypalCertId,
      transmission_id: paypalTransmissionId,
      transmission_sig: paypalSignature,
      transmission_time: paypalTransmissionTime,
      webhook_id: webhookId,
      webhook_event: JSON.parse(body),
    }

    const verifyResponse = await fetch("https://api.paypal.com/v1/notifications/verify-webhook-signature", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PAYPAL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(verificationData),
    })

    const verifyResult = await verifyResponse.json()
    return verifyResult.verification_status === "SUCCESS"
  } catch (error) {
    console.error("Error verificando webhook:", error)
    return false
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const headers = Object.fromEntries(request.headers.entries())

    console.log("PayPal Webhook recibido")

    // Verificar la autenticidad del webhook
    const isValid = await verifyPayPalWebhook(body, headers)
    if (!isValid) {
      console.error("Webhook no válido - firma no verificada")
      return NextResponse.json({ error: "Webhook no válido" }, { status: 401 })
    }

    const webhookEvent = JSON.parse(body)
    const eventType = webhookEvent.event_type
    const resource = webhookEvent.resource

    console.log("Evento verificado:", eventType)

    // Procesar diferentes tipos de eventos
    switch (eventType) {
      case "PAYMENT.CAPTURE.COMPLETED":
        // Pago completado exitosamente
        const paymentId = resource.id
        const amount = resource.amount.value
        const currency = resource.amount.currency_code
        const customId = resource.custom_id
        const receiverEmail = resource.seller_receivable_breakdown[0].paypal_account_id

        console.log(`Pago completado: ${paymentId}, Monto: ${amount} ${currency}`)

        if (receiverEmail !== "martiaveturatejeda@gmail.com") {
          console.error("Correo electrónico del receptor no coincide")
          return NextResponse.json({ error: "Correo electrónico del receptor no coincide" }, { status: 401 })
        }

        // Activar suscripción del usuario
        if (customId) {
          const customParts = customId.split("_")
          if (customParts.length >= 4) {
            const userId = customParts[1]
            const planId = customParts[3]
            console.log(`Activando plan ${planId} para usuario ${userId}`)

            // Aquí actualizarías la base de datos real
            // await updateUserSubscription(userId, planId, paymentId)
          }
        }
        break

      case "PAYMENT.CAPTURE.DENIED":
      case "PAYMENT.CAPTURE.REFUNDED":
        // Pago denegado o reembolsado
        console.log("Pago denegado o reembolsado:", resource.id)
        // Desactivar suscripción si es necesario
        break

      default:
        console.log("Evento no manejado:", eventType)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error procesando webhook de PayPal:", error)
    return NextResponse.json({ error: "Error procesando webhook" }, { status: 500 })
  }
}
