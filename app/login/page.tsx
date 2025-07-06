"use client"

import type React from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { AuthProvider } from "@/components/providers/auth-provider"
import { loginSchema, type LoginFormData } from "@/schemas"

export default function LoginPage(){
  const {register,handleSubmit,formState:{ errors, isSubmitting }, } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const { login }=useAuth()
  const { toast }=useToast()
  const router=useRouter()

  const onSubmit=async (data:LoginFormData)=>{
    try {
      await login(data.email, data.password)
      toast({
        title:"Login successful",
        description:"Welcome to the parlour dashboard",
      })
      router.push("/dashboard")
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      })
    }
  }

  

  return (
    <AuthProvider>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-pink-600">Parlour Admin</CardTitle>
            <CardDescription>Sign in to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@parlour.com"
                  {...register("email")}
                />
                {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password")}
                />
                {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
              </div>
              <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AuthProvider>
  )
}
