import { Types } from "mongoose";

export interface IMedicalRecord {
  diagnosis: string;
  allergies: string;
  created_at: Date;
  created_by: Types.ObjectId;
  updated_at: Date;
  updated_by: Types.ObjectId;
  patient: Types.ObjectId;
}
