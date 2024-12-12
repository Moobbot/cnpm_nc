import { Schema, model } from "mongoose";
import { ITestRequestTestList } from "../interfaces/test-request-test-list.interface";

const testRequestTestListSchema = new Schema<ITestRequestTestList>({
    status: { type: String, required: [true, "Status is required"] },
    test_list_name: { type: String, required: [true, "Test list name is required"] },
    barcode: { type: String, required: [true, "Barcode is required"] },
    test_request: { type: Schema.Types.ObjectId, ref: "TestRequest", required: true },
    samples: [{ type: Schema.Types.ObjectId, ref: "Sample" }],
    test_list: { type: Schema.Types.ObjectId, ref: "TestList", required: true },
});

export const TestRequestTestListModel = model<ITestRequestTestList>("TestRequestTestList", testRequestTestListSchema);