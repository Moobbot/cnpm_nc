import { Request, Response } from "express";
import { TestRequestRepository } from "../repositories/test-request.repository";

export class TestRequestService {
    private readonly testRequestRepository: TestRequestRepository;

    constructor() {
        this.testRequestRepository = new TestRequestRepository();
    }
}