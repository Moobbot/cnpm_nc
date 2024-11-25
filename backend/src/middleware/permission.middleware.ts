import { Request, Response, NextFunction } from "express";
import ForbiddenError from "../errors/forbidden.error";

export const permissionMiddleware = (permissions: string[], type: string = "AND") => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.userData.grantAll) {
            return next();
        }

        let hasPermission;
        if (type === 'OR') {
            hasPermission = permissions.some((permission) =>
                req.userData.permissions?.has(permission)
            );
        } else {
            hasPermission = permissions.every((permission) =>
                req.userData.permissions?.has(permission)
            );
        }

        if (!hasPermission) {
            return next(new ForbiddenError("You don't have required permission"));
        }

        next();
    };
};
