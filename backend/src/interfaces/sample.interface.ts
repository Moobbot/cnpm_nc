import { Types } from "mongoose";

export interface ISample {
    sample_code: string;
    sample_date: Date;
    createdAt: Date;
    createdBy?: Types.ObjectId;
    updatedAt: Date;
    updatedBy?: Types.ObjectId;
    rack: Types.ObjectId;
    sample_type: Types.ObjectId;
}
