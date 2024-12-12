import { Types } from "mongoose";

export interface ITestRequestTestList {
    status: string;
    test_list_name: string;
    barcode: string;
    test_request: Types.ObjectId;
    samples: Types.ObjectId[];
    test_list: Types.ObjectId;
}