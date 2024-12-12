import { Schema, model } from "mongoose";
import { ITestRequest } from "../interfaces/test_request.interface";

const miscellanySchema = new Schema(
  {
    doctor_name: { type: String, required: [true, "Doctor name is required"] },
    department: { type: String, required: [true, "Department is required"] },
    diagnosis: { type: String, required: [true, "Diagnosis is required"] },
  },
  { _id: false }
);

const testRequestSchema = new Schema<ITestRequest>(
    {
        id_external_system: {
            type: String,
            required: [true, "External system ID is required"],
        },
        request_date: {
            type: Date,
            default: Date.now,
        },
        test_request_test_list: {
            type: [{ type: Schema.Types.ObjectId, ref: "TestRequestList" }],
            required: [true, "Test request list is required"],
        },
        miscellany: { type: miscellanySchema, required: [true, "Miscellany is required"] },
        priority: { type: Boolean, required: [true, "Priority is required"] },
        status: { type: String, required: [true, "Status is required"] },
        notes: { type: String, required: [true, "Notes is required"] },
        created_by: {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        updated_by: {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    }, { timestamps: true }
);

export const TestRequestModel = model<ITestRequest>(
    "TestRequest",
    testRequestSchema
);