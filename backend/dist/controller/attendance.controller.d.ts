import { Request, Response } from "express";
export declare const getEmployees: (req: Request, res: Response) => Promise<void>;
export declare const punchAttendance: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const recentAttendance: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=attendance.controller.d.ts.map