import { ObjectId } from "mongoose";
import { IUser } from "./user.interface";

export interface IAccessHistory {
    _id?: ObjectId;
    username?: string;
    actionName?: string;
    functionName?: string;
    api?: string;
    ip?: string;
    deviceName?: string;
    deviceModel?: string;
    deviceType?: string;
    osName?: string;
    osVer?: string;
    osType?: string;
    browserName?: string;
    browserVer?: string;
    browserType?: string;
    miscellaneous?: any;
    createdAt?: Date;
    updatedAt?: Date;
}
