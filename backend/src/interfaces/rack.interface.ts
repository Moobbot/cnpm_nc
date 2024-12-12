import { Types } from "mongoose";

export interface IRack {
    first_position: number;
    last_position: number;
    position_total: number;
    position_used: number;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: Types.ObjectId;
    updatedBy?: Types.ObjectId;
    device: Types.ObjectId;
}