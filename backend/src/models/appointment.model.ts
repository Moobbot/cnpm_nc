import { Schema, model } from "mongoose";
import { IAppointment } from "../interfaces/appointment.interface";

const appointmentSchema = new Schema<IAppointment>(
  {
    doctor_name: { type: String, required: [true, "Doctor name is required"] },
    appointment_time: {
      type: Date,
      required: [true, "Appointment time is required"],
    },
    appointment_date: {
      type: Date,
      required: [true, "Appointment date is required"],
    },
    status: { type: String, required: [true, "Status is required"] },
    medical_record: {
      type: Schema.Types.ObjectId,
      ref: "MedicalRecord",
      required: true,
    },
    test_requests: [{ type: Schema.Types.ObjectId, ref: "TestRequest" }],
    created_by: { type: Schema.Types.ObjectId, ref: "User", default: null },
    updated_by: { type: Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

export const AppointmentModel = model<IAppointment>("Appointment", appointmentSchema);