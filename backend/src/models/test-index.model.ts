import { model, Schema } from "mongoose";
import { INormalValues, ITestIndex } from "../interfaces/test-index.interface";

const normalValuesSchema = new Schema<INormalValues>({
    man: { type: String, required: [true, "Man normal value is required"] },
    woman: { type: String, required: [true, "Woman normal value is required"] },
    baby: { type: String, required: [true, "Baby normal value is required"] },
}, { _id: false });

const testIndexSchema = new Schema<ITestIndex>({
    index_code: { type: String, required: [true, "Index code is required"] },
    index_name: { type: String, required: [true, "Index name is required"] },
    alias: { type: String, required: [true, "Alias is required"] },
    unit: { type: String, required: [true, "Unit is required"] },
    limit: { type: Number, required: [true, "Limit is required"] },
    value_type: { type: String, required: [true, "Value type is required"] },
    display_order: { type: Number, required: [true, "Display order is required"] },
    normal_values: { type: normalValuesSchema, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
}, {timestamps: true});

export const TestIndexModel = model<ITestIndex>("TestIndex", testIndexSchema);