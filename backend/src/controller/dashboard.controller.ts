import { Request,Response } from "express"
import Employee from "../models/Employee"
import Task from "../models/Task"
import Attendance from "../models/Attendance"

export const getStats=async(req:Request, res:Response)=>{
  try {
    const totalEmployees=await Employee.countDocuments({status:"ACTIVE"})
    const totalTasks = await Task.countDocuments()
    const pendingTasks = await Task.countDocuments({status:"PENDING"})
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const todayAttendance = await Attendance.aggregate([
      {
        $match: { updatedAt:{$gte:today },},
      },
      { $sort: {updatedAt:-1 },},
      {
        $group: {
          _id:"$employee",
          lastAction:{$first:"$action" },
        },
      },
      { $match: {lastAction:"IN",},},
    ])

    const presentToday = todayAttendance.length

    res.status(200).json({
      success:true,
      message:"Dashboard stats fetched successfully",
      stats:{
        totalEmployees,
        totalTasks,
        pendingTasks,
      }
    })
  } catch (error) {
    console.error( error)
    res.status(500).json({ 
      success:false,
      message: "Some error occurred" })
  }
}