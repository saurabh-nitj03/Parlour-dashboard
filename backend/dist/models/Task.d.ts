import mongoose from "mongoose";
declare const Task: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description: string;
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    title: string;
    assignedTo: mongoose.Types.ObjectId;
    dueDate: NativeDate;
    createdBy: mongoose.Types.ObjectId;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description: string;
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    title: string;
    assignedTo: mongoose.Types.ObjectId;
    dueDate: NativeDate;
    createdBy: mongoose.Types.ObjectId;
}, {}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description: string;
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    title: string;
    assignedTo: mongoose.Types.ObjectId;
    dueDate: NativeDate;
    createdBy: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description: string;
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    title: string;
    assignedTo: mongoose.Types.ObjectId;
    dueDate: NativeDate;
    createdBy: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description: string;
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    title: string;
    assignedTo: mongoose.Types.ObjectId;
    dueDate: NativeDate;
    createdBy: mongoose.Types.ObjectId;
}>, {}> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    description: string;
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    title: string;
    assignedTo: mongoose.Types.ObjectId;
    dueDate: NativeDate;
    createdBy: mongoose.Types.ObjectId;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default Task;
//# sourceMappingURL=Task.d.ts.map