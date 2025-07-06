"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Calendar, User } from "lucide-react"
import { TaskDialog } from "@/components/dashboard/task-dialog"
import { useToast } from "@/hooks/use-toast"
import { BACKEND_URL } from "@/lib/config"
import axios from "axios"

interface Task {
  _id: string
  title: string
  description: string
  assignedTo: {
    _id:string,
    name: string
  }
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED"
  dueDate: string
  createdAt: string
}

export default function TasksPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const canEdit = user?.role === "SUPER_ADMIN"

  useEffect(() => {
    fetchTasks()
  }, [tasks])

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      if (response.data.success) {
        const data = response.data.tasks
        setTasks(data)
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!canEdit) return

    if (confirm("Are you sure you want to delete this task?")) {
      try {
        const response = await axios.delete(`${BACKEND_URL}/api/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })

        if (response.data.status) {
          setTasks(tasks.filter((task) => task._id !== id))
          toast({
            title: "Task deleted",
            description: "Task has been successfully removed.",
          })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete task.",
          variant: "destructive",
        })
      }
    }
  }

  const handleEdit = (task: Task) => {
    if (!canEdit) return
    setSelectedTask(task)
    setDialogOpen(true)
  }

  const handleAdd = () => {
    if (!canEdit) return
    setSelectedTask(null)
    setDialogOpen(true)
  }

  const handleSave = (task: Task) => {
    if (selectedTask) {
      setTasks(tasks.map((t) => (t._id === task._id ? task : t)))
    } else {
      setTasks([...tasks, task])
    }
    setDialogOpen(false)
    setSelectedTask(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "default"
      case "IN_PROGRESS":
        return "default"
      case "PENDING":
        return "secondary"
      default:
        return "secondary"
    }
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600">Manage employee tasks and assignments</p>
        </div>
        {canEdit && (
          <Button onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks?.length>0 && tasks.map((task) => (
          <Card key={task._id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{task.title}</CardTitle>
                <div className="flex space-x-1">
                  <Badge variant={getStatusColor(task.status)}>{task.status}</Badge>
                </div>
              </div>
              <CardDescription className="line-clamp-2">{task.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <User className="mr-2 h-4 w-4" />
                {task.assignedTo.name}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="mr-2 h-4 w-4" />
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-600">
                <strong>Created:</strong> {new Date(task.createdAt).toLocaleDateString()}
              </div>

              {canEdit && (
                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(task)}>
                    <Edit className="mr-1 h-3 w-3" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(task._id)}
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

      {canEdit && <TaskDialog open={dialogOpen} onOpenChange={setDialogOpen} task={selectedTask} onSave={handleSave} />}
    </div>
  )
}
