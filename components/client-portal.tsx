"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock, User, LogOut, FileText, Calendar, DollarSign } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface AuthFormProps {
  onLogin: (user: any) => void
}

function AuthForm({ onLogin }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    password: "",
    confirmPassword: "",
  })

  // Usuarios demo para pruebas
  const demoUsers = [
    {
      id: "1",
      name: "Juan Pérez",
      email: "juan@empresa.com",
      phone: "809-123-4567",
      company: "Empresa Demo SA",
      password: "123456",
    },
    {
      id: "2",
      name: "María González",
      email: "maria@negocio.com",
      phone: "809-987-6543",
      company: "Negocio González",
      password: "123456",
    },
  ]

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simular autenticación
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Buscar usuario en la base de datos demo
      const user = demoUsers.find((u) => u.email === loginData.email && u.password === loginData.password)

      if (user) {
        const { password, ...userWithoutPassword } = user
        onLogin(userWithoutPassword)
        alert(`¡Bienvenido ${user.name}!`)
      } else {
        alert("Email o contraseña incorrectos")
      }
    } catch (error) {
      alert("Hubo un problema al iniciar sesión")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validaciones
      if (registerData.password !== registerData.confirmPassword) {
        alert("Las contraseñas no coinciden")
        return
      }

      if (registerData.password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres")
        return
      }

      // Simular registro
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const newUser = {
        id: Date.now().toString(),
        name: registerData.name,
        email: registerData.email,
        phone: registerData.phone,
        company: registerData.company,
      }

      onLogin(newUser)
      alert(`¡Bienvenido ${newUser.name}! Tu cuenta ha sido creada.`)
    } catch (error) {
      alert("Hubo un problema al crear la cuenta")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRegisterData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Portal de Clientes</CardTitle>
        <CardDescription>Accede a tu área personal de MiPaginaContable</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-1 rounded-lg bg-muted p-1">
            <button
              onClick={() => setIsRegister(false)}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                !isRegister ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => setIsRegister(true)}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isRegister ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Registrarse
            </button>
          </div>

          {!isRegister ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Correo Electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="login-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Tu contraseña"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
              <div className="text-center text-sm text-gray-500 space-y-1">
                <p>Usuarios demo:</p>
                <p>juan@empresa.com / 123456</p>
                <p>maria@negocio.com / 123456</p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Nombre Completo</Label>
                <Input
                  id="register-name"
                  name="name"
                  placeholder="Tu nombre completo"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Correo Electrónico</Label>
                <Input
                  id="register-email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-phone">Teléfono (Opcional)</Label>
                <Input
                  id="register-phone"
                  name="phone"
                  placeholder="809-123-4567"
                  value={registerData.phone}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-company">Empresa (Opcional)</Label>
                <Input
                  id="register-company"
                  name="company"
                  placeholder="Nombre de tu empresa"
                  value={registerData.company}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Contraseña</Label>
                <Input
                  id="register-password"
                  name="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-confirm-password">Confirmar Contraseña</Label>
                <Input
                  id="register-confirm-password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirma tu contraseña"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
              </Button>
            </form>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function ClientDashboard({ user, onLogout }: { user: any; onLogout: () => void }) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Bienvenido, {user.name}</h2>
          <p className="text-gray-600">{user.company || "Cliente Individual"}</p>
        </div>
        <Button onClick={onLogout} variant="outline">
          <LogOut className="h-4 w-4 mr-2" />
          Cerrar Sesión
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documentos Pendientes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Requieren tu atención</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próxima Cita</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 Feb</div>
            <p className="text-xs text-muted-foreground">Revisión mensual</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estado de Cuenta</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Al día</div>
            <p className="text-xs text-muted-foreground">Último pago: 1 Feb</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Servicios Activos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Contabilidad General</span>
              <Badge variant="default">Activo</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Asesoría Fiscal</span>
              <Badge variant="default">Activo</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Nóminas</span>
              <Badge variant="secondary">Pendiente</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Progreso del Mes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm">
                <span>Documentos Procesados</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="mt-2" />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm">
                <span>Declaraciones</span>
                <span>100%</span>
              </div>
              <Progress value={100} className="mt-2" />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm">
                <span>Reportes</span>
                <span>50%</span>
              </div>
              <Progress value={50} className="mt-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Declaración de ITBIS procesada - 1 Feb 2025</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Estado financiero generado - 28 Ene 2025</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm">Documentos subidos para revisión - 25 Ene 2025</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function ClientPortal() {
  const [user, setUser] = useState<any>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleLogin = (userData: any) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <User className="h-4 w-4 mr-2" />
          Portal Cliente
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{user ? "Panel de Cliente" : "Acceso al Portal"}</DialogTitle>
        </DialogHeader>
        {user ? <ClientDashboard user={user} onLogout={handleLogout} /> : <AuthForm onLogin={handleLogin} />}
      </DialogContent>
    </Dialog>
  )
}
