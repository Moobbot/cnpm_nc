import { Types } from "mongoose";

export interface ISampleType {
    type_name: string;
    storage_conditions: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: Types.ObjectId;
    updatedBy?: Types.ObjectId;
}