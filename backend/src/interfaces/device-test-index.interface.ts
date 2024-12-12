import { Types } from "mongoose";

export interface IDeviceTestIndex {
    device_test_index: string;
    convert_to: number;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    createdBy?: Types.ObjectId;
    updatedBy?: Types.ObjectId;
    test_index: Types.ObjectId;
    device: Types.ObjectId;
}