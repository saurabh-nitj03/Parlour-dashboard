"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const database_1 = __importDefault(require("./config/database"));
const auth_1 = __importDefault(require("./routes/auth"));
const employees_1 = __importDefault(require("./routes/employees"));
const tasks_1 = __importDefault(require("./routes/tasks"));
const attendance_1 = __importDefault(require("./routes/attendance"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
// Connect to MongoDB
(0, database_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Make io accessible to routes
app.set("io", io);
// Routes
app.use("/api/auth", auth_1.default);
app.use("/api/employees", employees_1.default);
app.use("/api/tasks", tasks_1.default);
app.use("/api/attendance", attendance_1.default);
app.use("/api/dashboard", dashboard_1.default);
// Socket.IO connection handling
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
    socket.on("attendance-update", (data) => {
        // Broadcast attendance update to all connected clients
        socket.broadcast.emit("attendance-update", data);
    });
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map