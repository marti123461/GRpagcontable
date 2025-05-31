import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    // Aquí normalmente enviarías un email usando un servicio como Resend, SendGrid, etc.
    // Por ejemplo con Resend:
    //
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'onboarding@resend.dev',
    //   to: 'martiaveturatejeda@gmail.com',
    //   subject: `Nueva consulta de ${name}`,
    //   html: `
    //     <h2>Nueva consulta desde el chatbot</h2>
    //     <p><strong>Nombre:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
    //     <p><strong>Mensaje:</strong> ${message}</p>
    //   `,
    // });

    // Simulamos un retraso para demostración
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Error sending email" }, { status: 500 })
  }
}
