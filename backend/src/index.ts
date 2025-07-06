declare global{
  namespace Express{
      export interface Request{
          user?:any;
      }
  }
}
import express from "express"
import cors from "cors"
import { createServer } from "http"
import { Server } from "socket.io"
import db from "./config/db"
import authRoutes from "./routes/auth"
import employeeRoutes from "./routes/employees"
import taskRoutes from "./routes/tasks"
import attendanceRoutes from "./routes/attendance"
import dashboardRoutes from "./routes/dashboard"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"


dotenv.config()

// console.log(process.env.FRONTEND_URL);
// console.log(process.env.PORT);

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || '*',
    methods: ["GET", "POST"],
  },
})

db()

app.use(cors({
  origin:process.env.FRONTEND_URL || '*',
}))
app.use(express.json())
app.set("io", io)

app.use("/api/auth", authRoutes)
app.use("/api/employees", employeeRoutes)
app.use("/api/tasks", taskRoutes)
app.use("/api/attendance", attendanceRoutes)
app.use("/api/dashboard", dashboardRoutes)


function validateToken(token: string) {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (validateToken(token)) {
    next();
  } else {
    next(new Error("Unauthorized"));
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id)

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id)
  })

  socket.on("attendance-update", (data) => {
    socket.broadcast.emit("attendance-update", data)
  })
})

const PORT=process.env.PORT || 5000

app.listen(500)

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
