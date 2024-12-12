import { Request, Response } from "express";
import { TestRequestService } from "../services/test-request.service";

export class TestRequestController {
    private readonly testRequestService: TestRequestService;

    constructor() {
        this.testRequestService = new TestRequestService();
    }
}