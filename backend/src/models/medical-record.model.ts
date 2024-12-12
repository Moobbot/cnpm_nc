import { Schema, model } from "mongoose";
import { IMedicalRecord } from "../interfaces/medical-record.interface";
import { PatientModel } from "./patient.model";

const medicalRecordSchema = new Schema<IMedicalRecord>(
  {
    diagnosis: { type: String, required: [true, "Diagnosis is required"] },
    allergies: { type: String, required: [true, "Allergies is required"] },
    created_by: { type: Schema.Types.ObjectId, ref: "User", default: null },
    updated_by: { type: Schema.Types.ObjectId, ref: "User", default: null },
    patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  },
  { timestamps: true }
);

export const MedicalRecordModel = model<IMedicalRecord>(
  "MedicalRecord",
  medicalRecordSchema
);