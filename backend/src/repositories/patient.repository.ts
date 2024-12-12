import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { IPatient } from "../interfaces/patient.interface";
import { PatientModel } from "../models/patient.model";
import { BaseRepository } from "./base.repository";

export class PatientRepository extends BaseRepository<IPatient> {
    constructor() {
        super(PatientModel);
    }
}
