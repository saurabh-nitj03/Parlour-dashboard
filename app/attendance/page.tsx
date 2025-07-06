"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarClock, LogIn, LogOut } from "lucide-react"
import { useSocket } from "@/hooks/use-socket"
import { useToast } from "@/hooks/use-toast"
import { BACKEND_URL } from "@/lib/config"
import axios from "axios"

interface Employee {
  _id: string
  name: string
  position: string
  department: string
  isPresent: boolean
  lastPunchTime?: string
}

export default function AttendancePage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { socket } = useSocket()
  const { toast } = useToast()

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/attendance/employees`)
      // console.log(response);
      if (response.data.success) {
        const data = response.data.employeesWithStatus
        // console.log(data);
        setEmployees(data)
        // console.log(data);
      }
    } catch (error) {
      console.error("Failed to fetch employees:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePunch = async (employeeId: string, action: "IN" | "OUT") => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/attendance/punch`, {
        employeeId,
        action
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.data.success) {
        const data = response.data

        setEmployees(
          employees.map((emp) =>
            emp._id === employeeId ? { ...emp, isPresent: action === "IN", lastPunchTime: data.timestamp } : emp,
          ),
        )

        if (socket) {
          socket.emit("attendance-update", {
            employeeId,
            action,
            timestamp: data.timestamp,
            employeeName: employees.find((emp) => emp._id === employeeId)?.name,
          })
        }
        toast({
          title:`Punch ${action} successful`,
          description: `${employees.find((emp) => emp._id === employeeId)?.name} has punched ${action.toLowerCase()}`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record attendance",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Employee Attendance</h1>
          <p className="text-gray-600">Punch in/out system for all employees</p>
          <div className="flex items-center justify-center mt-4 text-lg font-medium text-gray-700">
            <CalendarClock className="mr-2 h-5 w-5" />
            {new Date().toLocaleString()}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees?.length > 0  && employees.map((employee) => (
            <Card key={employee._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{employee.name}</CardTitle>
                  <Badge variant={employee.isPresent ? "default" : "secondary"}>
                    {employee.isPresent ? "Present" : "Absent"}
                  </Badge>
                </div>
                <p className="text-gray-600">{employee.position}</p>
                <p className="text-sm text-gray-500">{employee.department}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {employee.lastPunchTime && (
                  <div className="text-sm text-gray-600">
                    <strong>Last Activity:</strong> {new Date(employee.lastPunchTime).toLocaleString()}
                  </div>
                )}
                {!employee.lastPunchTime && (
                  <div className="text-sm text-gray-600">
                    <strong>Last Activity:</strong> 
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button
                    onClick={() => handlePunch(employee._id, "IN")}
                    disabled={employee.isPresent}
                    className="flex-1"
                    variant={employee.isPresent ? "secondary" : "default"}
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Punch In
                  </Button>
                  <Button
                    onClick={() => handlePunch(employee._id, "OUT")}
                    disabled={!employee.isPresent}
                    className="flex-1"
                    variant={!employee.isPresent ? "secondary" : "outline"}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Punch Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
