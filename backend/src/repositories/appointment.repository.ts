import { IAppointment } from "../interfaces/appointment.interface";
import { AppointmentModel } from "../models/appointment.model";
import { BaseRepository } from "./base.repository";

export class AppointmentRepository extends BaseRepository<IAppointment> {
  constructor() {
    super(AppointmentModel);
  }
}