"use client"

import { useAuth } from "@/hooks/use-auth"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Sidebar,SidebarContent,SidebarFooter,SidebarGroup,SidebarGroupContent,SidebarGroupLabel,SidebarHeader, SidebarMenu,SidebarMenuButton,SidebarMenuItem} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, ClipboardList, Clock, LogOut, Crown, Shield } from "lucide-react"

const navigation=[
  {
    name:"Dashboard",
    href:"/dashboard",
    icon:LayoutDashboard,
  },
  {
    name:"Employees",
    href:"/dashboard/employees",
    icon:Users,
  },
  {
    name:"Tasks",
    href:"/dashboard/tasks",
    icon:ClipboardList,
  },
  {
    name:"Attendance",
    href:"/attendance",
    icon:Clock,
  },
]

export function DashboardSidebar() {
  const {user,logout}=useAuth()
  const pathname=usePathname()

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Parlour Admin</h2>
            <p className="text-sm text-gray-600">Management System</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
         <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
           <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
              {user?.role === "SUPER_ADMIN" ? (
                <Crown className="h-4 w-4 text-pink-600" />
              ) : (
                <Shield className="h-4 w-4 text-blue-600" />
              )}
             </div>
            <div className="flex-1 min-w-0">
             <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
             <p className="text-xs text-gray-500">{user?.role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}</p>
            </div>
          </div>
          <Button variant="outline" className="w-full bg-transparent" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
