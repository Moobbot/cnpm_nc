import {Types} from 'mongoose';

export interface IMiscellany {
    doctor_name: string;
    department: string;
    diagnosis: string;
}

export interface ITestRequest {
    id_external_system: string;
    request_date: Date;
    test_request_test_list: Types.ObjectId[];
    miscellany: IMiscellany;
    priority: boolean;
    status: string;
    notes: string;
    created_at: Date;
    created_by: Types.ObjectId;
    updated_at: Date;
    updated_by: Types.ObjectId;
}