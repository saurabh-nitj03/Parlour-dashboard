import mongoose from "mongoose";
declare const User: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    email: string;
    password: string;
    role: "SUPER_ADMIN" | "ADMIN";
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    email: string;
    password: string;
    role: "SUPER_ADMIN" | "ADMIN";
}, {}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    email: string;
    password: string;
    role: "SUPER_ADMIN" | "ADMIN";
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
    password: string;
    role: "SUPER_ADMIN" | "ADMIN";
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    email: string;
    password: string;
    role: "SUPER_ADMIN" | "ADMIN";
}>, {}> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    email: string;
    password: string;
    role: "SUPER_ADMIN" | "ADMIN";
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default User;
//# sourceMappingURL=User.d.ts.map