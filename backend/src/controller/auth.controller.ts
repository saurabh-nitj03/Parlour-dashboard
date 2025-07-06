import { Request,Response } from "express"
import User from "../models/User"
import { loginSchema } from "../schemas"
import jwt from "jsonwebtoken"

export const login=async (req:Request, res:Response)=>{
  try {
    const validationResult = loginSchema.safeParse(req.body)
    if (!validationResult.success) {
      return res.status(500).json({ 
        success:false,
        message: "Schema Validation failed", 
        errors: validationResult.error.errors 
      })
    }

    const { email, password } = validationResult.data
    // console.log(email, password);

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(500).json({
        success:false,
        message: "No user exists with this email" })
    }
    // console.log(user);
    // console.log(password,user.password);
    const isMatch = password === user.password;
    // console.log(isMatch)
    if (!isMatch) {
      return res.status(500).json({
        success:false,
        message: "Wrong Password" 
      })
    }
    const token = jwt.sign({userId:user._id }, process.env.JWT_SECRET || "fallback-secret", { expiresIn: "7d" })

    res.status(200).json({
      success:true,
      message:"User logged in successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ 
      success:false,
      message: "Some Internal error occurred" 
    })
  }
}

export const verify=async (req:Request, res:Response) => {
  try {
    const user = req.user
    res.status(200).json({
      success:true,
      message:"User authenticated successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    })
  } catch (error) {
    console.error( error)
    res.status(500).json({ 
      success:false,
      message: " Error ocurred while verifying"
    })
  }
}