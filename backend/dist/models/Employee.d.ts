import mongoose from "mongoose";
declare const Employee: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    email: string;
    position: string;
    phone: string;
    department: string;
    status: "ACTIVE" | "INACTIVE";
    joinDate: NativeDate;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    email: string;
    position: string;
    phone: string;
    department: string;
    status: "ACTIVE" | "INACTIVE";
    joinDate: NativeDate;
}, {}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    email: string;
    position: string;
    phone: string;
    department: string;
    status: "ACTIVE" | "INACTIVE";
    joinDate: NativeDate;
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
    name: string;
    email: string;
    position: string;
    phone: string;
    department: string;
    status: "ACTIVE" | "INACTIVE";
    joinDate: NativeDate;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    email: string;
    position: string;
    phone: string;
    department: string;
    status: "ACTIVE" | "INACTIVE";
    joinDate: NativeDate;
}>, {}> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    email: string;
    position: string;
    phone: string;
    department: string;
    status: "ACTIVE" | "INACTIVE";
    joinDate: NativeDate;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default Employee;
//# sourceMappingURL=Employee.d.ts.map