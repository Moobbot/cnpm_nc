import { Router } from "express";
import { PermissionController } from "../controllers/permission.controller";
import asyncHandler from "express-async-handler";
import { authMiddleware } from "../middleware/auth.middleware";
import { permissionMiddleware } from "../middleware/permission.middleware";
import { Permissions } from "../enums/permissions.enum";
import accessHistoryMiddleware from "../middleware/access_log.middleware";

const permissionRouter: Router = Router();

permissionRouter.get(
    "/:id",
    [authMiddleware, permissionMiddleware([Permissions.GET_PERMISSION]), accessHistoryMiddleware],
    asyncHandler(PermissionController.getPermissionById)
);

permissionRouter.get(
    "/",
    [authMiddleware, permissionMiddleware([Permissions.LIST_ALL_PERMISSIONS]), accessHistoryMiddleware],
    asyncHandler(PermissionController.listAllPermissions)
);

permissionRouter.post(
    "/",
    [authMiddleware, permissionMiddleware([Permissions.ADD_PERMISSION]), accessHistoryMiddleware],
    asyncHandler(PermissionController.createPermission)
);

permissionRouter.put(
    "/:id/change-status",
    [authMiddleware, permissionMiddleware([Permissions.CHANGE_STATUS_PERMISSION]), accessHistoryMiddleware],
    asyncHandler(PermissionController.changePermissionStatus)
);

export default permissionRouter;
