import { Router } from "express";
import asyncHandler from "express-async-handler";

import { AuthController } from "../controllers/auth.controller";

import { authMiddleware } from "../middleware/auth.middleware";
import accessHistoryMiddleware from "../middleware/access_log.middleware";
import { upload } from "../middleware/upload.middleware";

const authRouter: Router = Router();

authRouter.get(
    "/me",
    [authMiddleware, accessHistoryMiddleware],
    asyncHandler(AuthController.me)
);
authRouter.post(
    "/login",
    [accessHistoryMiddleware],
    asyncHandler(AuthController.login)
);
authRouter.post(
    "/logout",
    [authMiddleware, accessHistoryMiddleware],
    asyncHandler(AuthController.logout)
);
authRouter.post(
    "/check-password",
    [authMiddleware, accessHistoryMiddleware],
    asyncHandler(AuthController.checkPassword)
);
authRouter.post("/refresh-token", asyncHandler(AuthController.refreshToken));
authRouter.put(
    "/change-password",
    [authMiddleware, accessHistoryMiddleware],
    asyncHandler(AuthController.changePassword)
);
authRouter.put(
    "/change-avatar",
    [authMiddleware, accessHistoryMiddleware],
    upload.single("avatar"),
    asyncHandler(AuthController.changeAvatar)
);

export default authRouter;
