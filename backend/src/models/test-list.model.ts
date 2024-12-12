import { model, Schema } from "mongoose";
import { ITestList } from "../interfaces/test-list.interface";

const testListSchema = new Schema<ITestList>({
    test_list_name: { type: String, required: [true, "Test list name is required"] },
    description: { type: String, required: [true, "Description is required"] },
    status: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    test_list_parent: { type: Schema.Types.ObjectId, ref: "TestList", default: null },
    test_index: { type: Schema.Types.ObjectId, ref: "TestIndex", required: true },
});

export const TestListModel = model<ITestList>("TestList", testListSchema);