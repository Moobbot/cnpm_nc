import { Types } from "mongoose";

export interface IAppointment {
  doctor_name: string;
  appointment_time: Date;
  appointment_date: Date;
  status: string;
  created_at: Date;
  created_by: Types.ObjectId;
  updated_at: Date;
  updated_by: Types.ObjectId;
  medical_record: Types.ObjectId;
  test_requests: Types.ObjectId[];
}
