import { ITestIndex } from "../interfaces/test-index.interface";
import { TestIndexModel } from "../models/test-index.model";
import { BaseRepository } from "./base.repository";

export class TestIndexRepository extends BaseRepository<ITestIndex> {
    constructor() {
        super(TestIndexModel);
    }
}
