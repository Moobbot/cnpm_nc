import { Types } from "mongoose";

export interface INormalValues {
    man: string;
    woman: string;
    baby: string;
}

export interface ITestIndex {
    index_code: string;
    index_name: string;
    alias: string;
    unit: string;
    limit: number;
    value_type: string;
    display_order: number;
    normal_values: INormalValues;
    createdAt: Date;
    createdBy: Types.ObjectId;
    updatedAt: Date;
    updatedBy: Types.ObjectId;
}