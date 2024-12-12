import { Router } from "express";
import { PermissionController } from "../controllers/permission.controller";
import asyncHandler from "express-async-handler";
import { authMiddleware } from "../middleware/auth.middleware";
import { permissionMiddleware } from "../middleware/permission.middleware";
import { Permissions } from "../enums/permissions.enum";
import accessHistoryMiddleware from "../middleware/access_log.middleware";

const permissionRouter: Router = Router();
const permissionController = new PermissionController();

permissionRouter.get(
    "/:id",
    [
        authMiddleware,
        permissionMiddleware([Permissions.GET_PERMISSION]),
        accessHistoryMiddleware,
    ],
    asyncHandler(permissionController.getPermissionById)
);

permissionRouter.get(
    "/",
    [
        authMiddleware,
        permissionMiddleware([Permissions.LIST_ALL_PERMISSIONS]),
        accessHistoryMiddleware,
    ],
    asyncHandler(permissionController.listAllPermissions)
);

permissionRouter.post(
    "/",
    [
        authMiddleware,
        permissionMiddleware([Permissions.ADD_PERMISSION]),
        accessHistoryMiddleware,
    ],
    asyncHandler(permissionController.createPermission)
);

permissionRouter.put(
    "/:id",
    [
        authMiddleware,
        permissionMiddleware([Permissions.EDIT_PERMISSION]),
        accessHistoryMiddleware,
    ],
    asyncHandler(permissionController.updatePermission)
);

permissionRouter.put(
    "/:id/change-status",
    [
        authMiddleware,
        permissionMiddleware([Permissions.CHANGE_STATUS_PERMISSION]),
        accessHistoryMiddleware,
    ],
    asyncHandler(permissionController.changePermissionStatus)
);

export default permissionRouter;
