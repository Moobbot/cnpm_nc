import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            select: false,
        },
        name: { type: String, required: [true, "Name is required"] },
        roles: [{ type: Schema.Types.ObjectId, ref: "Role" }],
        createdBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
        updatedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
        status: { type: Boolean, default: true },
        avatar: { type: String, default: null },
        refreshToken: { type: String, default: null, select: false },
    },
    { timestamps: true }
);

export const UserModel = model<IUser>("User", userSchema);
