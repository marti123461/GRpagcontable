import { NextResponse } from "next/server"

// Función para verificar la autenticidad del webhook de PayPal
async function verifyPayPalWebhook(body: string): Promise<boolean> {
  try {
    // En producción, aquí verificarías la autenticidad con PayPal
    console.log("Verificando webhook de pago publicitario")
    return true
  } catch (error) {
    console.error("Error verificando webhook:", error)
    return false
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.text()
    console.log("Webhook de pago publicitario recibido:", body)

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
    const itemName = params.get("item_name")
    const itemNumber = params.get("item_number")
    const advertiserInfo = params.get("os0") // Información del anunciante

    console.log("Detalles del pago publicitario:", {
      paymentStatus,
      txnType,
      custom,
      payerEmail,
      mcGross,
      receiverEmail,
      itemName,
      itemNumber,
    })

    // Verificar que el receptor sea correcto
    if (receiverEmail !== "martiaveturatejeda@gmail.com") {
      console.error("Email de receptor incorrecto:", receiverEmail)
      return NextResponse.json({ error: "Receptor no válido" }, { status: 400 })
    }

    // Procesar el pago publicitario
    if (paymentStatus === "Completed") {
      console.log("Pago publicitario completado exitosamente")

      // Extraer información del campo custom
      if (custom) {
        const customParts = custom.split("_")
        if (customParts.length >= 6) {
          const advertiserId = customParts[1]
          const adSpaceId = customParts[3]
          const duration = customParts[5]

          console.log(`Activando anuncio para espacio ${adSpaceId} por ${duration}`)

          // Aquí procesarías la información del anunciante
          if (advertiserInfo) {
            try {
              const advertiser = JSON.parse(advertiserInfo)
              console.log("Información del anunciante:", advertiser)

              // Aquí guardarías el anuncio en tu base de datos
              // y lo activarías en el espacio publicitario correspondiente
            } catch (error) {
              console.error("Error parseando información del anunciante:", error)
            }
          }

          // Enviar confirmación al anunciante
          console.log("Enviando confirmación al anunciante")

          // Aquí podrías enviar un email de confirmación
          // await sendAdvertiserConfirmation(payerEmail, adSpaceId, duration)
        }
      }

      // Registrar ingresos por publicidad
      const revenue = Number.parseFloat(mcGross || "0")
      console.log(`Ingresos por publicidad: ${revenue}€`)

      // Aquí actualizarías tus estadísticas de ingresos
      // await updateAdRevenue(revenue, adSpaceId, duration)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error procesando webhook de pago publicitario:", error)
    return NextResponse.json({ error: "Error procesando webhook" }, { status: 500 })
  }
}
