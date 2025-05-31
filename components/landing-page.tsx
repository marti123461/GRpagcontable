"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Calculator,
  FileText,
  Clock,
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  Phone,
  Mail,
  MessageCircle,
  Star,
  BarChart3,
  FileCheck,
  UserCheck,
  Upload,
  Download,
  DollarSign,
} from "lucide-react"
import { AccountingSystem } from "../accounting-system"
import { IntelligentChatbot } from "./intelligent-chatbot"
import { AdSystem } from "./ad-system"
import { AdBanner } from "./ad-banner"

export function LandingPage() {
  const [showAccountingSystem, setShowAccountingSystem] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)
  const [showAdSystem, setShowAdSystem] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Calculator className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">MiPaginaContable</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#inicio" className="text-gray-900 hover:text-blue-600">
                Inicio
              </a>
              <a href="#servicios" className="text-gray-700 hover:text-blue-600">
                Servicios
              </a>
              <a href="#nosotros" className="text-gray-700 hover:text-blue-600">
                Nosotros
              </a>
              <a href="#guia" className="text-gray-700 hover:text-blue-600">
                Guía de Uso
              </a>
              <a href="#contacto" className="text-gray-700 hover:text-blue-600">
                Contacto
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <UserCheck className="h-4 w-4 mr-2" />
                Portal Cliente
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAdSystem(true)}
                className="bg-green-50 border-green-300 text-green-700 hover:bg-green-100"
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Anunciar Aquí
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Consulta Gratis
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Banner Publicitario Superior */}
      <div className="bg-gray-50 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdBanner position="header" size="728x90" />
        </div>
      </div>

      {/* Banner Móvil */}
      <div className="md:hidden bg-gray-50 py-2">
        <div className="px-4">
          <AdBanner position="mobile" size="320x50" />
        </div>
      </div>

      {/* Hero Section */}
      <section id="inicio" className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-6">
                <Award className="h-4 w-4 mr-2" />
                Servicios Contables Profesionales
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Soluciones contables para su negocio
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Ofrecemos servicios contables profesionales para empresas de todos los tamaños. Optimice su gestión
                financiera con nuestros expertos certificados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => setShowAccountingSystem(true)}
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  Probar Sistema Contable
                </Button>
                <Button variant="outline" size="lg">
                  Conocer más
                </Button>
              </div>
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">Más de 500 clientes satisfechos</span>
              </div>
            </div>

            {/* Sidebar Publicitario */}
            <div className="lg:col-span-1">
              <AdBanner position="sidebar" size="300x250" />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-gray-600">Años de experiencia</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Clientes satisfechos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">1000+</div>
              <div className="text-gray-600">Documentos procesados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">99%</div>
              <div className="text-gray-600">Índice de satisfacción</div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Publicitario en Contenido */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdBanner position="content" size="728x90" />
        </div>
      </div>

      {/* Services Section */}
      <section id="servicios" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestros Servicios Contables</h2>
            <p className="text-xl text-gray-600">
              Ofrecemos una gama completa de servicios contables y financieros para ayudar a su empresa a crecer.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Contabilidad General</h3>
              <p className="text-gray-600 mb-4">
                Mantenemos sus libros contables actualizados y precisos. Cumplimiento con todas las normativas fiscales.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Libros contables
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Estados financieros
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Conciliaciones bancarias
                </li>
              </ul>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Asesoría Fiscal</h3>
              <p className="text-gray-600 mb-4">
                Optimizamos su carga fiscal y nos aseguramos del cumplimiento con todas las obligaciones tributarias.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Declaraciones de impuestos
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Optimización tributaria
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Reportes de cumplimiento
                </li>
              </ul>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Nóminas</h3>
              <p className="text-gray-600 mb-4">
                Gestionamos el proceso completo de nóminas, desde el cálculo hasta la declaración ante las autoridades.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Cálculo de nóminas
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Liquidaciones y finiquitos
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Reportes de nómina
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="nosotros" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Expertos en contabilidad a su servicio</h2>
            <p className="text-xl text-gray-600">
              Con más de 15 años de experiencia, nuestro equipo de contadores certificados está comprometido con el
              éxito financiero de su empresa.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">Contadores públicos certificados</h4>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">Atención personalizada 24/7</h4>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">Tecnología de vanguardia</h4>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="font-semibold mb-2">Conocimiento normativo garantizado</h4>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Platform */}
      <section id="guia" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cómo usar nuestra plataforma</h2>
            <p className="text-xl text-gray-600">
              Sigue estos sencillos pasos para aprovechar al máximo todos nuestros servicios y herramientas.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-3">Explora nuestros servicios</h3>
              <p className="text-gray-600 text-sm">
                Descubre todos los servicios que ofrecemos para tu empresa y elige los que mejor se adapten a tus
                necesidades.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-3">Usa el Chatbot Inteligente</h3>
              <p className="text-gray-600 text-sm">
                Nuestro chatbot te ayudará a resolver dudas básicas y te conectará con nuestros especialistas cuando sea
                necesario.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-3">Accede al Portal de Cliente</h3>
              <p className="text-gray-600 text-sm">
                Desde tu portal personalizado podrás acceder a todos tus documentos, reportes y comunicarte con tu
                contador asignado.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Upload className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-3">Gestiona tus documentos</h3>
              <p className="text-gray-600 text-sm">
                Sube tus documentos de forma segura. Nuestro sistema los organizará automáticamente para un
                procesamiento eficiente.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileCheck className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="font-semibold mb-3">Revisa tus servicios</h3>
              <p className="text-gray-600 text-sm">
                Accede a reportes en tiempo real sobre el estado de tus servicios contables y el progreso de tus
                trámites.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Download className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold mb-3">Contacta directamente</h3>
              <p className="text-gray-600 text-sm">
                Comunícate directamente con tu contador asignado a través de múltiples canales: chat, email o teléfono.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">¿Listo para optimizar sus finanzas?</h2>
            <p className="text-xl text-blue-100">
              Contáctanos hoy mismo y descubre cómo nuestros expertos contables pueden ayudarte a mejorar la salud
              financiera de su negocio.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-white font-semibold mb-2">Llámanos</h3>
              <p className="text-blue-100">809-555-0123</p>
              <p className="text-blue-100 text-sm">Lunes a Viernes 8:00 AM - 6:00 PM</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-white font-semibold mb-2">Escríbenos</h3>
              <p className="text-blue-100">contacto@mipaginacontable.com</p>
              <p className="text-blue-100 text-sm">Respuesta en menos de 24 horas</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-white font-semibold mb-2">Chat en vivo</h3>
              <p className="text-blue-100">Chatbot inteligente</p>
              <p className="text-blue-100 text-sm">Disponible 24/7</p>
            </div>
          </div>

          {/* Información de Publicidad */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-green-100 text-green-800 mb-4">
              <DollarSign className="h-5 w-5 mr-2" />
              <span className="font-medium">¿Quieres promocionar tu negocio aquí?</span>
            </div>
            <p className="text-blue-100 mb-4">
              Llega a más de 15,000 visitantes mensuales especializados en contabilidad y finanzas
            </p>
            <Button onClick={() => setShowAdSystem(true)} className="bg-green-600 hover:bg-green-700 text-white">
              <TrendingUp className="h-4 w-4 mr-2" />
              Ver Espacios Publicitarios
            </Button>
          </div>

          <div className="text-center">
            <Card className="inline-block p-6">
              <h4 className="font-semibold mb-2">Contador Principal</h4>
              <p className="text-gray-600 mb-2">Germán Gómez Tejada</p>
              <p className="text-sm text-gray-500">CPA certificado con 15+ años de experiencia</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Banner Publicitario Inferior */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdBanner position="footer" size="728x90" />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">MiPaginaContable</span>
            </div>
            <p className="text-gray-400 mb-4">© 2025 MiPaginaContable. Todos los derechos reservados.</p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400 mb-4">
              <a href="#" className="hover:text-white">
                Términos
              </a>
              <a href="#" className="hover:text-white">
                Privacidad
              </a>
              <a href="#" className="hover:text-white">
                Cookies
              </a>
              <button onClick={() => setShowAdSystem(true)} className="hover:text-white text-green-400">
                Anunciar Aquí
              </button>
            </div>
            <div className="flex justify-center items-center">
              <img
                src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-200px.png"
                alt="PayPal"
                className="h-6 opacity-70"
              />
              <span className="ml-2 text-xs text-gray-500">Pagos seguros</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modales */}
      {showAccountingSystem && <AccountingSystem onClose={() => setShowAccountingSystem(false)} />}
      {showChatbot && <IntelligentChatbot onClose={() => setShowChatbot(false)} />}
      {showAdSystem && <AdSystem onClose={() => setShowAdSystem(false)} />}

      {/* Floating Chatbot Button */}
      <button
        onClick={() => setShowChatbot(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 animate-pulse"
        title="¿Necesitas ayuda? ¡Pregúntame!"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  )
}
