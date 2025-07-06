"use client"
import { useAuth } from "@/hooks/use-auth"
import { useSocket } from "@/hooks/use-socket"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, ClipboardList, Clock, UserCheck } from "lucide-react"
import { useEffect, useState } from "react"
import { AttendanceLog } from "@/components/dashboard/attendance-log"
import { BACKEND_URL } from "@/lib/config"
import axios from "axios"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface DashboardStats {
  totalEmployees: number
  totalTasks: number
  presentToday: number
  pendingTasks: number
}

export default function DashboardPage() {
  const { user } = useAuth()
  const { socket } = useSocket()
  const router=useRouter();
  const [isLoading,setIsLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    totalTasks: 0,
    presentToday: 0,
    pendingTasks: 0,
  })

  useEffect(()=>{
    fetchStats()
  }, [])

  const fetchStats=async()=>{
    try {
      const response=await axios.get(`${BACKEND_URL}/api/dashboard/stats`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      if (response.data.success) {
        const data=response.data.stats
        setStats(data)
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error)
    }
  }

    if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
        </div>
        <Badge variant={user?.role === "SUPER_ADMIN" ? "default" : "secondary"}>
          {user?.role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">Active employees</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTasks}</div>
            <p className="text-xs text-muted-foreground">All assigned tasks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.presentToday}</div>
            <p className="text-xs text-muted-foreground">Employees checked in</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingTasks}</div>
            <p className="text-xs text-muted-foreground">Tasks to complete</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceLog />

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {user?.role === "SUPER_ADMIN" && (
              <>
              <Link href="/dashboard/employees">
                  <div className="mt-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => router.push("/dasboard/employees")}>
                    <h3 className="font-medium">Add New Employee</h3>
                    <p className="text-sm text-gray-600">Register a new team member</p>
                  </div>
              </Link>
              <Link href="/dashboard/tasks">
                <div className="mt-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => router.push("/dasboard/tasks")}>
                  <h3 className="font-medium">Create Task</h3>
                  <p className="text-sm text-gray-600">Assign a new task to employees</p>
                </div>
              </Link>
              </>
            )}
            <div className="mt-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <h3 className="font-medium">View Reports</h3>
              <p className="text-sm text-gray-600">Check attendance and task reports</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
