import { Request, Response } from "express";
import { AccessHistoryService } from "../services/access-history.service";

export class AccessHistoryController {
    private readonly accessHistoryService: AccessHistoryService;

    constructor() {
        this.accessHistoryService = new AccessHistoryService();
    }

    listAllAccessHistory = async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const { total, history } = await this.accessHistoryService.listAllAccessHistory(
            page,
            limit
        );

        res.status(200).json({
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
            data: history,
            success: true,
        });
    };
}
