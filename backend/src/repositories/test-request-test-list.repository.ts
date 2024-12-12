import { ITestRequestTestList } from "../interfaces/test-request-test-list.interface";
import { TestRequestTestListModel } from "../models/test-request-test-list.model";
import { BaseRepository } from "./base.repository";

export class TestRequestTestListRepository extends BaseRepository<ITestRequestTestList> {
    constructor() {
        super(TestRequestTestListModel);
    }
}
