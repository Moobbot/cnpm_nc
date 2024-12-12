import { Types } from "mongoose";

export interface ITestList {
    test_list_name: string;
    description: string;
    status: boolean;
    createdAt: Date;
    createdBy: Types.ObjectId;
    updatedAt: Date;
    updatedBy: Types.ObjectId;
    test_list_parent: Types.ObjectId;
    test_index: Types.ObjectId;
}