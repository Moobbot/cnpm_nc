import { Router } from "express";
import { RoleController } from "../controllers/role.controller";
import asyncHandler from "express-async-handler";
import { authMiddleware } from "../middleware/auth.middleware";
import { permissionMiddleware } from "../middleware/permission.middleware";
import { Permissions } from "../enums/permissions.enum";
import accessHistoryMiddleware from "../middleware/access_log.middleware";

const roleRouter: Router = Router();

roleRouter.get(
    "/",
    [authMiddleware, permissionMiddleware([Permissions.LIST_ALL_ROLES]), accessHistoryMiddleware],
    asyncHandler(RoleController.listAllRoles)
);

roleRouter.get(
    "/:id",
    [authMiddleware, permissionMiddleware([Permissions.GET_ROLE]), accessHistoryMiddleware],
    asyncHandler(RoleController.getRoleById)
);

roleRouter.post(
    "/",
    [authMiddleware, permissionMiddleware([Permissions.ADD_ROLE]), accessHistoryMiddleware],
    asyncHandler(RoleController.createRole)
);

roleRouter.put(
    "/:id",
    [authMiddleware, permissionMiddleware([Permissions.EDIT_ROLE]), accessHistoryMiddleware],
    asyncHandler(RoleController.updateRole)
);

roleRouter.put(
    "/:id/change-status",
    [authMiddleware, permissionMiddleware([Permissions.CHANGE_STATUS_ROLE]), accessHistoryMiddleware],
    asyncHandler(RoleController.changeRoleStatus)
);

export default roleRouter;
