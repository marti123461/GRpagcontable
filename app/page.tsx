"use client"
import { Calculator, ChevronRight, Clock, FileText, BarChart3, Mail, Phone, Star, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserGuide } from "@/components/user-guide"
import { ClientPortal } from "@/components/client-portal"
import { AccountingSystem } from "@/components/accounting-system"
import { useState } from "react"

export default function Home() {
  const [showServiceDetails, setShowServiceDetails] = useState<string | null>(null)
  const [showAccountingSystem, setShowAccountingSystem] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleGetStarted = () => {
    setShowAccountingSystem(true)
    // Añadimos un pequeño timeout para asegurar que el componente esté montado
    setTimeout(() => {
      // Aquí podríamos comunicarnos con el componente AccountingSystem
      // pero para simplificar, mostraremos un mensaje informativo
      alert("¡Bienvenido al Sistema Contable! Selecciona el plan que mejor se adapte a tus necesidades.")
    }, 500)
  }

  const handleLearnMore = () => {
    scrollToSection("servicios")
    alert(
      "Explore nuestros servicios detallados a continuación. ¿Tiene alguna pregunta? Use nuestro chatbot en la esquina inferior derecha.",
    )
  }

  const handleFreeConsultation = () => {
    alert(
      "¡Perfecto! Para su consulta gratuita, contáctenos al 809-448-3593 o martiaveturatejeda@gmail.com. También puede usar nuestro chatbot para programar una cita.",
    )
  }

  const handleServiceClick = (serviceName: string) => {
    setShowServiceDetails(serviceName)
    alert(
      `Información detallada sobre ${serviceName}:\n\n• Consulta inicial gratuita\n• Propuesta personalizada\n• Implementación paso a paso\n• Soporte continuo\n\n¿Desea más información? Contáctenos directamente o use el chatbot.`,
    )
  }

  const handleTeamClick = () => {
    alert(
      `Nuestro Equipo Profesional:\n\n👨‍💼 Jhonson'S Brioso Tejeda - Contador Principal\n• 15+ años de experiencia\n• Certificado en contabilidad pública\n• Especialista en asesoría fiscal\n\n👥 Equipo de apoyo:\n• 5 contadores certificados\n• 3 especialistas en nóminas\n• 2 asesores fiscales\n\n¿Desea conocernos? ¡Contáctenos para programar una reunión!`,
    )
  }

  const handleContactClick = () => {
    alert(
      "Formas de contactarnos:\n\n📞 Teléfono: 809-448-3593\n📧 Email: martiaveturatejeda@gmail.com\n💬 Chatbot: Esquina inferior derecha\n👤 Contador: Jhonson'S Brioso Tejeda\n\n¡Estamos aquí para ayudarle!",
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div
            className="flex items-center gap-2 font-bold text-xl cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            <Calculator className="h-5 w-5" />
            <span>MiPaginaContable</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection("servicios")}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection("nosotros")}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToSection("guia")}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Guía de Uso
            </button>
            <button
              onClick={() => scrollToSection("contacto")}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Contacto
            </button>
          </nav>
          <div className="flex items-center gap-2">
            <ClientPortal />
            <Button variant="outline" className="hidden md:flex" onClick={handleFreeConsultation}>
              Consulta Gratis
            </Button>
          </div>
          <Button variant="outline" size="icon" className="md:hidden">
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section
          id="hero"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    ✨ Servicios Contables Profesionales
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Soluciones contables para su negocio
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl dark:text-gray-400">
                    Ofrecemos servicios contables profesionales para empresas de todos los tamaños. Optimice su gestión
                    financiera con nuestros expertos certificados.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="px-8 bg-blue-600 hover:bg-blue-700" onClick={handleGetStarted}>
                    🚀 Probar Sistema Contable
                  </Button>
                  <Button size="lg" variant="outline" className="px-8" onClick={handleLearnMore}>
                    Conocer más
                  </Button>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">Más de 500 clientes satisfechos</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div
                  className="relative rounded-xl overflow-hidden shadow-2xl cursor-pointer"
                  onClick={() => setShowAccountingSystem(true)}
                >
                  <div className="bg-blue-100 w-full h-64 md:h-80 flex items-center justify-center hover:bg-blue-200 transition-colors">
                    <Calculator className="h-24 w-24 text-blue-500 opacity-30" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 px-4 py-2 rounded-lg">
                      <span className="text-sm font-medium">Probar Sistema</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div
                className="text-center cursor-pointer hover:scale-105 transition-transform"
                onClick={() =>
                  alert("15 años sirviendo a empresas de todos los tamaños con excelencia y profesionalismo.")
                }
              >
                <div className="text-3xl font-bold text-blue-600">15+</div>
                <div className="text-sm text-gray-600">Años de experiencia</div>
              </div>
              <div
                className="text-center cursor-pointer hover:scale-105 transition-transform"
                onClick={() =>
                  alert("Más de 500 empresas confían en nosotros para sus necesidades contables y fiscales.")
                }
              >
                <div className="text-3xl font-bold text-green-600">500+</div>
                <div className="text-sm text-gray-600">Clientes satisfechos</div>
              </div>
              <div
                className="text-center cursor-pointer hover:scale-105 transition-transform"
                onClick={() =>
                  alert("Hemos procesado más de 1000 declaraciones de impuestos con precisión y puntualidad.")
                }
              >
                <div className="text-3xl font-bold text-purple-600">1000+</div>
                <div className="text-sm text-gray-600">Declaraciones procesadas</div>
              </div>
              <div
                className="text-center cursor-pointer hover:scale-105 transition-transform"
                onClick={() => alert("Garantizamos 99% de precisión en todos nuestros servicios contables y fiscales.")}
              >
                <div className="text-3xl font-bold text-orange-600">99%</div>
                <div className="text-sm text-gray-600">Precisión garantizada</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servicios" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Servicios</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Nuestros Servicios Contables</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Ofrecemos una amplia gama de servicios contables y financieros para ayudar a su empresa a crecer.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleServiceClick("Contabilidad General")}
              >
                <div className="aspect-video overflow-hidden bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors">
                  <FileText className="h-16 w-16 text-blue-300" />
                </div>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <FileText className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Contabilidad General</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                    Mantenemos sus libros contables actualizados y precisos, cumpliendo con todas las normativas
                    vigentes.
                  </CardDescription>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Registro de transacciones</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Estados financieros</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Conciliaciones bancarias</span>
                    </div>
                  </div>
                  <button className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-4 hover:underline">
                    Más información
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </CardContent>
              </Card>

              <Card
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleServiceClick("Asesoría Fiscal")}
              >
                <div className="aspect-video overflow-hidden bg-green-50 flex items-center justify-center hover:bg-green-100 transition-colors">
                  <BarChart3 className="h-16 w-16 text-green-300" />
                </div>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <BarChart3 className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Asesoría Fiscal</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                    Optimizamos su carga fiscal y nos aseguramos de que cumpla con todas sus obligaciones tributarias.
                  </CardDescription>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Planificación fiscal</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Declaraciones de impuestos</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Optimización tributaria</span>
                    </div>
                  </div>
                  <button className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-4 hover:underline">
                    Más información
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </CardContent>
              </Card>

              <Card
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleServiceClick("Gestión de Nóminas")}
              >
                <div className="aspect-video overflow-hidden bg-purple-50 flex items-center justify-center hover:bg-purple-100 transition-colors">
                  <Clock className="h-16 w-16 text-purple-300" />
                </div>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Clock className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Nóminas</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                    Gestionamos el proceso completo de nóminas, desde el cálculo hasta la presentación de impuestos.
                  </CardDescription>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Cálculo de salarios</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Deducciones y beneficios</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Reportes de nómina</span>
                    </div>
                  </div>
                  <button className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-4 hover:underline">
                    Más información
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="nosotros" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-700">Nosotros</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Expertos en contabilidad a su servicio
                  </h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Con más de 15 años de experiencia, nuestro equipo de contadores certificados está comprometido con
                    el éxito financiero de su empresa.
                  </p>
                </div>
                <div className="space-y-4">
                  <div
                    className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded"
                    onClick={() =>
                      alert("Todos nuestros contadores están certificados y actualizados con las últimas normativas.")
                    }
                  >
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Contadores públicos certificados</span>
                  </div>
                  <div
                    className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded"
                    onClick={() => alert("Estamos disponibles 24/7 para resolver sus dudas y emergencias contables.")}
                  >
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Atención personalizada 24/7</span>
                  </div>
                  <div
                    className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded"
                    onClick={() =>
                      alert("Utilizamos software contable de última generación para mayor precisión y eficiencia.")
                    }
                  >
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Tecnología de vanguardia</span>
                  </div>
                  <div
                    className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded"
                    onClick={() =>
                      alert("Garantizamos el cumplimiento de todas las normativas fiscales y contables vigentes.")
                    }
                  >
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Cumplimiento normativo garantizado</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button variant="outline" className="px-8" onClick={handleTeamClick}>
                    Conozca a nuestro equipo
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative rounded-xl overflow-hidden shadow-xl cursor-pointer" onClick={handleTeamClick}>
                  <div className="bg-indigo-50 w-full h-64 md:h-80 flex items-center justify-center hover:bg-indigo-100 transition-colors">
                    <div className="grid grid-cols-3 gap-4 opacity-30">
                      <Calculator className="h-12 w-12 text-indigo-400" />
                      <FileText className="h-12 w-12 text-indigo-500" />
                      <BarChart3 className="h-12 w-12 text-indigo-600" />
                      <Clock className="h-12 w-12 text-indigo-700" />
                      <CheckCircle className="h-12 w-12 text-indigo-500" />
                      <Star className="h-12 w-12 text-indigo-400" />
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 px-4 py-2 rounded-lg">
                      <span className="text-sm font-medium">Conocer equipo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* User Guide Section */}
        <section id="guia" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Guía de Uso
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Cómo usar nuestra plataforma</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Sigue estos sencillos pasos para aprovechar al máximo todos nuestros servicios y herramientas.
                </p>
              </div>
            </div>
            <UserGuide />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8">
              <div className="text-center space-y-4">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-700">Contacto</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  ¿Listo para optimizar sus finanzas?
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mx-auto">
                  Contáctenos hoy para una consulta gratuita y descubra cómo podemos ayudarle a mejorar la salud
                  financiera de su negocio.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                {/* Phone Contact */}
                <div
                  className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-shadow text-center"
                  onClick={() => window.open("tel:809-448-3593")}
                >
                  <Phone className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Llámenos</h3>
                  <p className="text-blue-600 font-semibold">809-448-3593</p>
                  <p className="text-sm text-gray-600 mt-2">Disponible 24/7</p>
                </div>

                {/* Email Contact */}
                <div
                  className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-shadow text-center"
                  onClick={() => window.open("mailto:martiaveturatejeda@gmail.com")}
                >
                  <Mail className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Escríbanos</h3>
                  <p className="text-green-600 font-semibold text-sm">martiaveturatejeda@gmail.com</p>
                  <p className="text-sm text-gray-600 mt-2">Respuesta en 24h</p>
                </div>

                {/* Chatbot Contact */}
                <div
                  className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-shadow text-center"
                  onClick={() => setShowChatbot(true)}
                >
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-purple-500 text-xl">💬</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Chat en vivo</h3>
                  <p className="text-purple-600 font-semibold">Chatbot inteligente</p>
                  <p className="text-sm text-gray-600 mt-2">Respuesta inmediata</p>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-blue-50 p-6 rounded-xl shadow-md max-w-md mx-auto">
                  <h3 className="text-lg font-medium mb-2">Contador Principal</h3>
                  <p className="text-blue-600 font-semibold">Jhonson'S Brioso Tejeda</p>
                  <p className="text-sm text-gray-600 mt-2">15+ años de experiencia</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2 font-bold cursor-pointer" onClick={() => scrollToSection("hero")}>
            <Calculator className="h-5 w-5" />
            <span>MiPaginaContable</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2025 MiPaginaContable. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() =>
                alert(
                  "Términos y Condiciones:\n\n• Servicios profesionales garantizados\n• Confidencialidad total\n• Cumplimiento normativo\n• Soporte continuo",
                )
              }
              className="text-gray-500 hover:text-primary dark:text-gray-400"
            >
              Términos
            </button>
            <button
              onClick={() =>
                alert(
                  "Política de Privacidad:\n\n• Sus datos están protegidos\n• No compartimos información\n• Cumplimos con GDPR\n• Máxima confidencialidad",
                )
              }
              className="text-gray-500 hover:text-primary dark:text-gray-400"
            >
              Privacidad
            </button>
          </div>
        </div>
      </footer>

      {/* Sistema de Contabilidad */}
      {showAccountingSystem && <AccountingSystem onClose={() => setShowAccountingSystem(false)} />}
\
      {/* Chatbot Inteligente */}
