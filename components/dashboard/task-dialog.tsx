"use client"
import type React from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { BACKEND_URL } from "../../lib/config"
import { taskSchema, type TaskFormData } from "@/schemas"

interface Task {
  _id: string
  title: string
  description: string
  assignedTo: {
    _id:string,
    name: string
  }
  status: "PENDING" |"IN_PROGRESS" |"COMPLETED"
  dueDate: string
  createdAt: string
}

interface Employee {
  _id: string
  name: string
  department:string
  email:string
  isPresent:boolean
  joinDate:string
  lastPunchTime:string
  phone:string
  position:string
  status:"ACTIVE" | "INACTIVE"
}

interface TaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task: Task | null
  onSave: (task: Task) => void
}

export function TaskDialog({ open, onOpenChange, task, onSave }: TaskDialogProps) {
  const { toast } = useToast()
  const [employees, setEmployees] = useState<Employee[]>([])
  const {register,handleSubmit,formState: { errors, isSubmitting },reset,setValue,watch,} = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      assignedTo: "",
      status: "PENDING",
      dueDate: "",
    },
  })

  const assignedTo = watch("assignedTo")

  useEffect(() => {
    if (open) {
      fetchEmployees()
    }
  }, [open])

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description,
        assignedTo: task.assignedTo?._id,
        status: task.status,
        dueDate: task.dueDate.split("T")[0],
      })
    } else {
      reset({
        title: "",
        description: "",
        assignedTo: "",
        status: "PENDING",
        dueDate: "",
      })
    }
  }, [task, reset])

  const fetchEmployees=async()=>{
    try {
      const response=await axios.get(`${BACKEND_URL}/api/employees`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      // console.log(response)
      if(response.data.success) {
        const data:Employee[]=response.data.employeesWithStatus
        // console.log(data)
        const filtereData=data.filter((d:any)=> d.status !== "INACTIVE")
        setEmployees(filtereData)
      }
    } catch(error) {
      console.error("Failed to fetch employees:", error)
    }
  }

  const onSubmit=async(data: TaskFormData)=>{
    try {
      const url = task?`${BACKEND_URL}/api/tasks/${task._id}` : `${BACKEND_URL}/api/tasks`
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }

      let response
      if (task) {
        response=await axios.put(url, data, config)
      } else {
        response=await axios.post(url, data, config)
      }

      if (response.data.success) {
        const savedTask=response.data.populatedTask
        onSave(savedTask)
        toast({
          title:task?"Task updated":"Task created",
          description: `${data.title} has been ${task ? "updated" : "created"} successfully.`,
        })
      } else {
        throw new Error(response.data?.message || "Failed to save task")
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || error.message || "Failed to save task. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{task ? "Edit Task" : "Create New Task"}</DialogTitle>
          <DialogDescription>
            {task ? "Update task information" : "Enter the details for the new task"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input id="title" {...register("title")} className="col-span-3" />
              {errors.title && <span className="col-span-4 text-red-500 text-xs">{errors.title.message}</span>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Textarea id="description" {...register("description")} className="col-span-3" />
              {errors.description && <span className="col-span-4 text-red-500 text-xs">{errors.description.message}</span>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="assignedTo" className="text-right">Assign To</Label>
              <Select value={assignedTo} onValueChange={(value) => setValue("assignedTo", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee._id} value={employee._id}>
                      {employee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.assignedTo && <span className="col-span-4 text-red-500 text-xs">{errors.assignedTo.message}</span>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">Status</Label>
              <select id="status" {...register("status")} className="col-span-3 rounded-md border px-3 py-2">
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
              {errors.status && <span className="col-span-4 text-red-500 text-xs">{errors.status.message}</span>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dueDate" className="text-right">Due Date</Label>
              <Input id="dueDate" type="date" {...register("dueDate")} className="col-span-3" />
              {errors.dueDate && <span className="col-span-4 text-red-500 text-xs">{errors.dueDate.message}</span>}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : task ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
