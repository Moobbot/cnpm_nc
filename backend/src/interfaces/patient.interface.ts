import { Types } from "mongoose";

export interface IPatient {
  patient_name: string;
  dob: Date;
  gender: string;
  address: string;
  phone: string;
  insurance_info?: any;
  createdAt: Date;
  createdBy?: Types.ObjectId;
  updatedAt: Date;
  updatedBy?: Types.ObjectId;
}
