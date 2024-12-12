import { Schema, model } from "mongoose";
import { IPatient } from "../interfaces/patient.interface";

const patientSchema = new Schema<IPatient>(
  {
    patient_name: {
      type: String,
      required: [true, "Patient name is required"],
    },
    dob: { type: Date, required: [true, "Date of birth is required"] },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: [true, "Gender is required"],
    },
    address: { type: String, required: [true, "Address is required"] },
    phone: { type: String, required: [true, "Phone number is required"] },
    insurance_info: { type: Schema.Types.Mixed, default: null },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

export const PatientModel = model<IPatient>("Patient", patientSchema);
