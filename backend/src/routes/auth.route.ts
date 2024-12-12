import { Router } from "express";
import asyncHandler from "express-async-handler";

import { AuthController } from "../controllers/auth.controller";

import { authMiddleware } from "../middleware/auth.middleware";
import accessHistoryMiddleware from "../middleware/access_log.middleware";
import { upload } from "../middleware/upload.middleware";

const authRouter: Router = Router();
const authController = new AuthController();

authRouter.get(
    "/me",
    [authMiddleware, accessHistoryMiddleware],
    asyncHandler(authController.me)
);
authRouter.post(
    "/login",
    [accessHistoryMiddleware],
    asyncHandler(authController.login)
);
authRouter.post(
    "/logout",
    [authMiddleware, accessHistoryMiddleware],
    asyncHandler(authController.logout)
);
authRouter.post(
    "/check-password",
    [authMiddleware, accessHistoryMiddleware],
    asyncHandler(authController.checkPassword)
);
authRouter.post("/refresh-token", asyncHandler(authController.refreshToken));
authRouter.put(
    "/change-password",
    [authMiddleware, accessHistoryMiddleware],
    asyncHandler(authController.changePassword)
);
authRouter.put(
    "/change-avatar",
    [authMiddleware, accessHistoryMiddleware],
    upload.single("avatar"),
    asyncHandler(authController.changeAvatar)
);

export default authRouter;
