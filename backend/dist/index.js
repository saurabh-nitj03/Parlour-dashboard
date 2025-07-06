"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const db_1 = __importDefault(require("./config/db"));
const auth_1 = __importDefault(require("./routes/auth"));
const employees_1 = __importDefault(require("./routes/employees"));
const tasks_1 = __importDefault(require("./routes/tasks"));
const attendance_1 = __importDefault(require("./routes/attendance"));
const dashboard_1 = __importDefault(require("./routes/dashboard"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// console.log(process.env.FRONTEND_URL);
// console.log(process.env.PORT);
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || '*',
        methods: ["GET", "POST"],
    },
});
(0, db_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || '*',
}));
app.use(express_1.default.json());
app.set("io", io);
app.use("/api/auth", auth_1.default);
app.use("/api/employees", employees_1.default);
app.use("/api/tasks", tasks_1.default);
app.use("/api/attendance", attendance_1.default);
app.use("/api/dashboard", dashboard_1.default);
function validateToken(token) {
    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        return decoded;
    }
    catch (error) {
        return null;
    }
}
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (validateToken(token)) {
        next();
    }
    else {
        next(new Error("Unauthorized"));
    }
});
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
    socket.on("attendance-update", (data) => {
        socket.broadcast.emit("attendance-update", data);
    });
});
const PORT = process.env.PORT || 5000;
app.listen(500);
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map