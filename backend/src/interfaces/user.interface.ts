import { ObjectId } from "mongoose";
import { IRole } from "./role.interface";

export interface IUser {
    _id: ObjectId;
    username: string;
    password: string;
    name: string;
    roles: IRole[];
    createdAt: Date;
    createdBy?: string;
    updatedAt: Date;
    updatedBy?: string;
    status: boolean;
    avatar?: string;
    refreshToken?: string;
}
