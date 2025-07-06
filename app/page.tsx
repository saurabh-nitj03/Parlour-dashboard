import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ClipboardList, Clock, Shield, Crown, ArrowRight, CheckCircle, Sparkles } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: Users,
      title: "Employee Management",
      description: "Manage your team members with comprehensive employee profiles and records.",
    },
    {
      icon: ClipboardList,
      title: "Task Assignment",
      description: "Assign and track tasks efficiently with priority levels and due dates.",
    },
    {
      icon: Clock,
      title: "Live Attendance",
      description: "Real-time punch in/out system with instant dashboard updates.",
    },
    {
      icon: Shield,
      title: "Role-Based Access",
      description: "Secure access control with Super Admin and Admin role permissions.",
    },
  ]

  const benefits = [
    "Real-time attendance tracking",
    "Role-based permission system",
    "Task management & assignment",
    "Employee profile management",
    "Live dashboard updates",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
                 <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
                 </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Parlour Dashboard</h1>
                <p className="text-sm text-gray-600">Management System</p>
              </div>
            </div>
            <Link href="/login">
              <Button className="bg-pink-600 hover:bg-pink-700">
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Streamline Your
            <span className="text-pink-600 block">Parlour Operations</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Comprehensive dashboard system for managing employees, tasks, and attendance with real-time updates and
            role-based access control.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Manage Your Parlour</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our comprehensive system provides all the tools you need to efficiently manage your parlour business
              operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-0 bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-pink-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 bg-white/60 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">Why Choose Our System?</CardTitle>
              <CardDescription className="text-gray-600">
                Built specifically for parlour businesses with modern technology
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Role-Based Access Control</h2>
            <p className="text-gray-600">Different permission levels for different team members</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 bg-white/60 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Crown className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Super Admin</CardTitle>
                    <CardDescription>Full system access</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Create, edit, delete employees
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Assign and manage tasks
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  View all attendance records
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Full dashboard access
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/60 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Admin</CardTitle>
                    <CardDescription>View-only access</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  View employee information
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  View assigned tasks
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Monitor attendance logs
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Dashboard overview
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </div>
  )
}