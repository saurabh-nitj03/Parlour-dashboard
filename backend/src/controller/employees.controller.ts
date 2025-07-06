import { Request,Response } from "express"
import Employee from "../models/Employee"
import { employeeSchema } from "../schemas"

export const getEmployees=async(req:Request, res:Response)=>{
  try {
    const employees=await Employee.find().sort({ updatedAt: -1 })
    res.status(200).json({
      success:true,
      message:"Employeees fetched successfully",
      employees
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success:false,
      message: "Some error Occurred" })
  }
}

export const createEmployee=async(req:Request, res:Response)=>{
  try {
    const validationResult=employeeSchema.safeParse(req.body)
    if (!validationResult.success) {
      return res.status(500).json({ 
        success:false,
        message: "Schema Validation failed", 
        errors: validationResult.error.errors 
      })
    }

    const employee = new Employee(validationResult.data)
    await employee.save()
    res.status(200).json({
      success:true,
      message:"Employee is added",
      employee
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success:false,
      message: "Some error ocurred while add employees" })
  }
}

export const updateEmployee=async(req:Request, res:Response)=>{
  try {
    const validationResult=employeeSchema.safeParse(req.body)
    if (!validationResult.success) {
      return res.status(500).json({ 
        success:false,
        message: "Schema Validation failed", 
        errors: validationResult.error.errors 
      })
    }

    const employee=await Employee.findByIdAndUpdate(req.params.id, validationResult.data, { new: true, runValidators: true })

    if (!employee) {
      return res.status(500).json({
        success:false,
        message: "Employee not found with this id" })
    }

    res.status(200).json({
      success:true,
      message:"Update done",
      employee
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ 
      success:false,
      message: "Some error ocurred at updating employees" })
  }
}

export const deleteEmployee=async(req:Request, res:Response)=>{
  try {
    const employee=await Employee.findByIdAndDelete(req.params.id)

    if (!employee) {
      return res.status(500).json({
        success:false,
        message:"Employee not found with this id" })
    }

    res.status(200).json({
      success:false,
      message: "Employee deleted successfully"
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Some error ocurred at Deleting employee" })
  }
}