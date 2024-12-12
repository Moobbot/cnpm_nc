import { IMedicalRecord } from "../interfaces/medical-record.interface";
import { MedicalRecordModel } from "../models/medical-record.model";
import { BaseRepository } from "./base.repository";

export class MedicalRecordRepository extends BaseRepository<IMedicalRecord> {
    constructor() {
        super(MedicalRecordModel);
    }
}