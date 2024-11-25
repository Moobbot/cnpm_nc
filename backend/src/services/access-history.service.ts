import { IAccessHistory } from "../interfaces/access-history.interface";
import { AccessHistoryModel } from "../models/access-history.model";

const createAccessHistory = (accessHistoryData: Partial<IAccessHistory>) => {
    return AccessHistoryModel.create(accessHistoryData);
};

export const AccessHistoryService = {
    createAccessHistory,
};
