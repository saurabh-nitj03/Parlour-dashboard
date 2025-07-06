"use client"

import type React from "react"

import { useAuth } from "@/hooks/use-auth"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

export default function DashboardLayout({ children,}: {
  children: React.ReactNode 
}) {
  const { user, isLoading } =  useAuth()
  const router = useRouter()
  
  // console.log(user)
  // console.log(isLoading)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6 bg-gray-50">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
