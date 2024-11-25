import { User } from "@prisma/client";
// import express  from "express";

export interface UserDataType {
    userId: string;
    username: string;
    name: string;
    grantAll?: boolean;
    permissions?: Set<string>;
}

declare module "express-serve-static-core" {
    export interface Request {
        userData: UserDataType;
    }
}
