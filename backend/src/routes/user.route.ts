import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import asyncHandler from "express-async-handler";
import { authMiddleware } from "../middleware/auth.middleware";
import { permissionMiddleware } from "../middleware/permission.middleware";
import { Permissions } from "../enums/permissions.enum";
import accessHistoryMiddleware from "../middleware/access_log.middleware";

const userRouter: Router = Router();
const userController = new UserController();

userRouter.get(
    "/:id",
    [
        authMiddleware,
        permissionMiddleware([Permissions.GET_USER]),
        accessHistoryMiddleware,
    ],
    asyncHandler(userController.getUserById)
);

userRouter.get(
    "/",
    [
        authMiddleware,
        permissionMiddleware([Permissions.LIST_ALL_USERS]),
        accessHistoryMiddleware,
    ],
    asyncHandler(userController.listAllUsers)
);

userRouter.post(
    "/",
    [
        authMiddleware,
        permissionMiddleware([Permissions.ADD_USER]),
        accessHistoryMiddleware,
    ],
    asyncHandler(userController.createUser)
);

userRouter.put(
    "/change-many-status",
    [
        authMiddleware,
        permissionMiddleware([Permissions.CHANGE_STATUS_USER]),
        accessHistoryMiddleware,
    ],
    asyncHandler(userController.changeManyUserStatus)
);

userRouter.put(
    "/:id",
    [
        authMiddleware,
        permissionMiddleware([Permissions.EDIT_USER]),
        accessHistoryMiddleware,
    ],
    asyncHandler(userController.updateUser)
);

userRouter.put(
    "/:id/change-status",
    [
        authMiddleware,
        permissionMiddleware([Permissions.CHANGE_STATUS_USER]),
        accessHistoryMiddleware,
    ],
    asyncHandler(userController.changeUserStatus)
);

export default userRouter;
