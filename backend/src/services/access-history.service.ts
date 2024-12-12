import { IAccessHistory } from "../interfaces/access-history.interface";
import { AccessHistoryRepository } from "../repositories/access-history.repository";

export class AccessHistoryService {
    private readonly accessHistoryRepository: AccessHistoryRepository;

    constructor() {
        this.accessHistoryRepository = new AccessHistoryRepository();
    }

    createAccessHistory = async (accessData: Partial<IAccessHistory>) => {
        return await this.accessHistoryRepository.create(accessData);
    };

    listAllAccessHistory = async (page: number, limit: number) => {
        const total = await this.accessHistoryRepository.count();

        const history = await this.accessHistoryRepository.findAll(
            {},
            page,
            limit
        );

        return {
            total,
            history,
        };
    };
}
