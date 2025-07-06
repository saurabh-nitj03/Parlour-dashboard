import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import User from "../models/User"

export const authenticate=async (req: any, res: Response, next: NextFunction)=>{
  try {
    const token=req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
      return res.status(500).json({
        success:false,
        message: "No token present" 
      })
    }
    // console.log(token)
    const JWT_SECRET=process.env.JWT_SECRET;
    if(!JWT_SECRET) {
      return res.status(500).json({
        success:false,
        message:"NO JWT found"
      })
    }
    const decoded=jwt.verify(token,JWT_SECRET ) as { userId: string }
    const user = await User.findById(decoded.userId).select("-password")
  //  console.log(decoded); 
  //  console.log(user);

    if (!user) {
      return res.status(500).json({
        success:false,
        message: "Token is not valid" })
    }

    req.user = user
    next()
  } catch (error) {
    res.status(500).json({
      success:false,
      message: "Token is invalid" })
  }
}

export const authorize = (role:string) => { return (req: any, res: Response, next: NextFunction) => {
    if (role!==req.user.role) {
      return res.status(500).json({
        success:false,
        message: "Access denied"
      })
    }
    next()
  }
}
