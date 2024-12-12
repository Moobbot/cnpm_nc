import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { ITestRequest } from "../interfaces/test_request.interface";
import { TestRequestModel } from "../models/test_request.model";
import { BaseRepository } from "./base.repository";

export class TestRequestRepository extends BaseRepository<ITestRequest> {
    constructor() {
        super(TestRequestModel);
    }
}
