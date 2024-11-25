import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import { validateEnv } from "../config/env.config";

import UnAuthenticatedError from "../errors/unauthenticated.error";
import ForbiddenError from "../errors/forbidden.error";
import NotFoundError from "../errors/not-found.error";

import { IUser } from "../interfaces/user.interface";
import { IRole } from "../interfaces/role.interface";
import { IPermission } from "../interfaces/permission.interface";

import { PermissionService } from "../services/permission.service";
import { TokenService } from "../services/token.service";
import { UserService } from "../services/user.service";

import { extractTokenFromHeader } from "../utils/util";
import { UserDataType } from "../types/express";

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const jwtconfig = validateEnv()?.jwtconfig;
    const token = extractTokenFromHeader(req);
    if (!token) {
        return next(new UnAuthenticatedError("Something went wrong when extracting tokens. Did you forget Bearer?"));
    }
    const tokenBlocked = await TokenService.isTokenBlocked(token as string);
    if (tokenBlocked) {
        return next(new ForbiddenError("Token expires"));
    }

    try {
        const payload = jwt.verify(
            token as string,
            jwtconfig?.accessSecret as string
        ) as UserDataType;

        const user = await UserService.findExtendedUser({
            _id: payload?.userId,
        });

        if (!user) {
            return next(new UnAuthenticatedError("User not found"));
        }

        const hasGrantAll = user?.roles.some((role: IRole) => role.grantAll);
        if (hasGrantAll) {
            req.userData = {
                userId: payload?.userId,
                username: user.username,
                name: user.name,
                grantAll: true,
            };
        } else {
            req.userData = {
                userId: payload?.userId,
                username: user.username,
                name: user.name,
                permissions: new Set(
                    user?.roles.flatMap((role) =>
                        role.permissions.map((permission) => permission.name)
                    )
                ),
            };
        }

        next();
    } catch (err) {
        next(new UnAuthenticatedError("Something went wrong when verifying tokens"));
    }
};
