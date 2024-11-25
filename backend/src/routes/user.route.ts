import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import asyncHandler from "express-async-handler";
import { authMiddleware } from "../middleware/auth.middleware";
import { permissionMiddleware } from "../middleware/permission.middleware";
import { Permissions } from "../enums/permissions.enum";
import accessHistoryMiddleware from "../middleware/access_log.middleware";

const userRouter: Router = Router();

userRouter.get(
    "/:id",
    [authMiddleware, permissionMiddleware([Permissions.GET_USER]), accessHistoryMiddleware],
    asyncHandler(UserController.getUserById)
);

userRouter.get(
    "/",
    [authMiddleware, permissionMiddleware([Permissions.LIST_ALL_USERS]), accessHistoryMiddleware],
    asyncHandler(UserController.listAllUsers)
);

userRouter.post(
    "/",
    [authMiddleware, permissionMiddleware([Permissions.ADD_USER]), accessHistoryMiddleware],
    asyncHandler(UserController.createUser)
);

userRouter.put(
    "/change-many-status",
    [authMiddleware, permissionMiddleware([Permissions.CHANGE_STATUS_USER]), accessHistoryMiddleware],
    asyncHandler(UserController.changeManyUserStatus)
);

userRouter.put(
    "/:id",
    [authMiddleware, permissionMiddleware([Permissions.EDIT_USER]), accessHistoryMiddleware],
    asyncHandler(UserController.updateUser)
);

userRouter.put(
    "/:id/change-status",
    [authMiddleware, permissionMiddleware([Permissions.CHANGE_STATUS_USER]), accessHistoryMiddleware],
    asyncHandler(UserController.changeUserStatus)
);


export default userRouter;
