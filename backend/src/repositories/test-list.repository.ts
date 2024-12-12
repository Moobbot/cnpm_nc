import { ITestList } from "../interfaces/test-list.interface";
import { TestListModel } from "../models/test-list.model";
import { BaseRepository } from "./base.repository";

export class TestListRepository extends BaseRepository<ITestList> {
    constructor() {
        super(TestListModel);
    }
}
