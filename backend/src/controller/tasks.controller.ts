import { Request,Response } from "express"
import Task from "../models/Task"
import { taskSchema } from "../schemas"

export const getTasks=async(req:Request, res:Response)=>{
  try {
    const tasks=await Task.find().populate("assignedTo", "_id name").populate("createdBy", "name").sort({ createdAt: -1 })
    res.status(200).json({
      success:true,
      message:"Tasks fetched successfully",
      tasks
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success:false,
      message: "Some error ocurred" })
  }
}

export const createTask=async(req:Request, res:Response) => {
  try {
    const validationResult=taskSchema.safeParse(req.body)
    if (!validationResult.success) {
      return res.status(500).json({ 
        success:false,
        message: "Schema Validation failed", 
        errors: validationResult.error.errors 
      })
    }

    const task=new Task({...validationResult.data,createdBy: req.user._id,})
    await task.save()
    const populatedTask=await Task.findById(task._id).populate("assignedTo", "name").populate("createdBy", "name")

    res.status(200).json({
      success:true,
      message:'Task added successfully',
      populatedTask
    })
  } catch (error) {
    console.error( error)
    res.status(500).json({
      success:false,
      message: "Some error ocurred at adding task" })
  }
}

export const updateTask=async(req:Request, res:Response)=>{
  try {
    const validationResult=taskSchema.safeParse(req.body)
    if (!validationResult.success) {
      return res.status(400).json({ 
        success:false,
        message: "Validation failed", 
        errors: validationResult.error.errors 
      })
    }

    const populatedTask=await Task.findByIdAndUpdate(req.params.id, validationResult.data, { new: true, runValidators: true })
      .populate("assignedTo", "name")
      .populate("createdBy", "name")

    if (!populatedTask) {
      return res.status(500).json({ 
        success:false,
        message: "Task not found"
      })
    }

    res.status(200).json({
      success:true,
      message:"Task added successfully",
      populatedTask
    })
  }catch(error) {
    console.error(error)
    res.status(500).json({ 
      success:false,
      message: "Some error ocurred while updating" })
  }
}
export const deleteTask=async(req:Request, res:Response)=>{
  try {
    const task=await Task.findByIdAndDelete(req.params.id)
    if (!task) {
      return res.status(500).json({ 
        success:false,
        message: "Task not found with this id"
      })
    }

    res.status(200).json({ 
     success:true,
     message: "Task deleted successfully"
    })
  } catch (error) {
    console.error( error)
    res.status(500).json({
      success:false,
      message: "Some error occurred" })
  }
}