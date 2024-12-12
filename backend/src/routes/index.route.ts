import { Router } from "express";
import { Request, Response } from "express";

import accessHistoryMiddleware from "../middleware/access_log.middleware";

import authRouter from "./auth.route";
import permissionRouter from "./permission.route";
import roleRouter from "./role.route";
import userRouter from "./user.route";
import accessHistoryRouter from "./access-history.route";

const rootRouter: Router = Router();

rootRouter.use("/permissions", permissionRouter);
rootRouter.use("/roles", roleRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/access-history", accessHistoryRouter);

rootRouter.get(
  "/",
  [accessHistoryMiddleware],
  (req: Request, res: Response) => {
    res.send("Hello World!!! This is the root route of the application.");
  }
);

export default rootRouter;
