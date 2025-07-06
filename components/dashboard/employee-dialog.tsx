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
import { useToast } from "@/hooks/use-toast"
import { BACKEND_URL } from "../../lib/config"
import { employeeSchema, type EmployeeFormData } from "@/schemas"

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


interface EmployeeDialogProps {
  open:boolean
  onOpenChange:(open: boolean)=>void
  employee: Employee|null
  onSave:(employee: Employee)=>void
}

export function EmployeeDialog({ open, onOpenChange, employee, onSave }: EmployeeDialogProps) {
  const { toast } = useToast()
  
  const {register,handleSubmit,formState: { errors, isSubmitting },reset} = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      position: "",
      department: "",
      status: "ACTIVE",
    },
  })

  useEffect(() => {
    if (employee) {
      reset({
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        position: employee.position,
        department: employee.department,
        status: employee.status,
      })
    } else {
      reset({
        name: "",
        email: "",
        phone: "",
        position: "",
        department: "",
        status: "ACTIVE",
      })
    }
  }, [employee, reset])

  const onSubmit=async(data: EmployeeFormData)=>{
    try {
      const url=employee ? `${BACKEND_URL}/api/employees/${employee._id}`: `${BACKEND_URL}/api/employees`
      const config={
        headers:{
          "Content-Type":"application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }

      let response
      if (employee){
        response=await axios.put(url, data, config)
      } else {
        response=await axios.post(url, data, config)
      }

      if (response.data.success) {
        const savedEmployee=response.data.employee
        onSave(savedEmployee)
        toast({
          title:employee?"Employee updated" : "Employee created",
          description:`${data.name} has been ${employee ? "updated" : "added"} successfully.`,
        })
      } else {
        throw new Error(response.data?.message || "Failed to save employee")
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || error.message || "Failed to save employee. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{employee ? "Edit Employee" : "Add New Employee"}</DialogTitle>
          <DialogDescription>
            {employee ? "Update employee information" : "Enter the details for the new employee"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" {...register("name")} className="col-span-3" />
              {errors.name && <span className="col-span-4 text-red-500 text-xs">{errors.name.message}</span>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input id="email" type="email" {...register("email")} className="col-span-3" />
              {errors.email && <span className="col-span-4 text-red-500 text-xs">{errors.email.message}</span>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">Phone</Label>
              <Input id="phone" {...register("phone")} className="col-span-3" />
              {errors.phone && <span className="col-span-4 text-red-500 text-xs">{errors.phone.message}</span>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">Position</Label>
              <Input id="position" {...register("position")} className="col-span-3" />
              {errors.position && <span className="col-span-4 text-red-500 text-xs">{errors.position.message}</span>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">Department</Label>
              <Input id="department" {...register("department")} className="col-span-3" />
              {errors.department && <span className="col-span-4 text-red-500 text-xs">{errors.department.message}</span>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">Status</Label>
              <select id="status" {...register("status")} className="col-span-3 rounded-md border px-3 py-2">
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
              {errors.status && <span className="col-span-4 text-red-500 text-xs">{errors.status.message}</span>}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : employee ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
