import Employee from "../models/Employee"
import Attendance from "../models/Attendance"
import { Request,Response } from "express"

export const getEmployees= async (req:Request, res:Response)=>{
  try {
    const employees=await Employee.find({ status: "ACTIVE" })
    const today=new Date()
    today.setHours(0, 0, 0, 0)

    const employeesWithStatus=await Promise.all(
      employees.map(async (employee)=>{
        const lastAttendance = await Attendance.findOne({
          employee: employee._id,
          updatedAt: { $gte: today },
        }).sort({ updatedAt: -1 })

        return {
          _id: employee._id,
          name: employee.name,
          email:employee.email,
          phone:employee.phone,
          position: employee.position,
          department: employee.department,
          joinDate:employee.updatedAt,
          status:employee.status,
          isPresent: lastAttendance?.action === "IN",
          lastPunchTime: lastAttendance?.updatedAt,
        }
      }),
    )
    // console.log(employeesWithStatus);

    res.status(200).json({
      success:true,
      message:"Attendance of employees fetched",
      employeesWithStatus
    })
  } catch (error) {
    console.error("Get attendance employees error:", error)
    res.status(500).json({
      success:false,
      message: "Some error occurred" })
  }
}

export const punchAttendance=async (req:Request, res:Response)=>{
  try {
    const {employeeId,action}=req.body

    const employee = await Employee.findById(employeeId);
    if(!employee){
      return res.status(500).json({
        success:false,
        message:"Employee does not exist"
      })
    }
    // console.log("Employee" + employee);

    const attendance = new Attendance({
      employee: employeeId,
      action,
    })
    // console.log(attendance);

    await attendance.save()

    const io=req.app.get("io")
    if (io) {
      io.emit("attendance-update", {
        _id:attendance._id,
        employee:{
          name:employee.name,
          position:employee.position,
          _id:employee._id
        },
        action,
        timestamp: attendance.updatedAt,
      })
    }

    res.status(200).json({
      success:true,
      message: "Attendance recorded successfully",
      timestamp: attendance.updatedAt,
    })
  } catch (error) {
    console.error("Punch error:", error)
    res.status(500).json({ 
      success:false,
      message: "Some error occurred"
     })
  }
}

export const recentAttendance=async(req:Request, res:Response)=>{
  try {
    const records=await Attendance.find().populate("employee", "name position").sort({ updatedAt: -1 }).limit(10)
    // console.log(records);
    res.status(200).json({
      success:true,
      message:"Last 10 records fetched",
      records
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ 
      success:false,
      message: "Some error occurred at getting request" 
    })
  }
}