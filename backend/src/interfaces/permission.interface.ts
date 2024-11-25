import { ObjectId } from "mongoose";

export interface IPermission {
    _id: ObjectId;
    name: string;
    createdAt: Date;
    createdBy?: string;
    updatedAt: Date;
    updatedBy?: string;
    status: boolean;
}