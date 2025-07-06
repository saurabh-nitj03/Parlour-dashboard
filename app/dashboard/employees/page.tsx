"use client"
import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Mail, Phone } from "lucide-react"
import { EmployeeDialog } from "@/components/dashboard/employee-dialog"
import { useToast } from "@/hooks/use-toast"
import { BACKEND_URL } from "@/lib/config"
import axios from "axios"

interface Employee {
  _id: string
  name: string
  email: string
  phone: string
  position: string
  department: string
  joinDate: string
  status: "ACTIVE" | "INACTIVE",
  isPresent?:boolean,
  lastPunchTime?:string
}

export default function EmployeesPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

  const canEdit = user?.role === "SUPER_ADMIN"

  useEffect(() => {
    fetchEmployees()
  }, [employees])

  const fetchEmployees=async()=>{
    try {
      const response = await axios.get(`${BACKEND_URL}/api/employees`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      if (response.data.success) {
        const data=response.data.employeesWithStatus
        // console.log(data);
        setEmployees(data)
        // console.log(employees);
      }
    } catch (error) {
      console.error("Failed to fetch employees:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!canEdit) return

    if (confirm("Are you sure you want to delete this employee?")) {
      try {
        const response = await axios.delete(`${BACKEND_URL}/api/employees/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })

        if (response.data.success) {
          setEmployees(employees.filter((emp) => emp._id !== id))
          toast({
            title: "Employee deleted",
            description: "Employee has been successfully removed.",
          })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete employee.",
          variant: "destructive",
        })
      }
    }
  }

  const handleEdit = (employee: Employee) => {
    if (!canEdit) return
    setSelectedEmployee(employee)
    setDialogOpen(true)
  }

  const handleAdd = () => {
    if (!canEdit) return
    setSelectedEmployee(null)
    setDialogOpen(true)
  }

  const handleSave = (employee: Employee) => {
    if (selectedEmployee) {
      setEmployees(employees.map((emp) => (emp._id === employee._id ? employee : emp)))
    } else {
      setEmployees([...employees, employee])
    }
    setDialogOpen(false)
    setSelectedEmployee(null)
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
          <p className="text-gray-600">Manage your team members</p>
        </div>
        {canEdit && (
          <Button onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees?.length>0 && employees.map((employee) => (
          <Card key={employee._id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{employee.name}</CardTitle>
                <Badge variant={employee.status === "ACTIVE" ? "default" : "secondary"}>{employee.status}</Badge>
              </div>
              <CardDescription>{employee.position}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="mr-2 h-4 w-4" />
                {employee.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="mr-2 h-4 w-4" />
                {employee.phone}
              </div>
              <div className="text-sm text-gray-600">
                <strong>Department:</strong> {employee.department}
              </div>
              <div className="text-sm text-gray-600">
                <strong>Joined:</strong> {new Date(employee.joinDate).toLocaleDateString()}
              </div>

              {canEdit && (
                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(employee)}>
                    <Edit className="mr-1 h-3 w-3" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(employee._id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="mr-1 h-3 w-3" />
                    Delete
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {canEdit && (
        <EmployeeDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          employee={selectedEmployee}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
