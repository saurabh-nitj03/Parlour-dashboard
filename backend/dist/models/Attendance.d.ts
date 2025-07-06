import mongoose from "mongoose";
declare const Attendance: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    employee: mongoose.Types.ObjectId;
    action: "IN" | "OUT";
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    employee: mongoose.Types.ObjectId;
    action: "IN" | "OUT";
}, {}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    employee: mongoose.Types.ObjectId;
    action: "IN" | "OUT";
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
    employee: mongoose.Types.ObjectId;
    action: "IN" | "OUT";
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    employee: mongoose.Types.ObjectId;
    action: "IN" | "OUT";
}>, {}> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    employee: mongoose.Types.ObjectId;
    action: "IN" | "OUT";
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default Attendance;
//# sourceMappingURL=Attendance.d.ts.map