import { Express } from "express";
import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import rootRouter from "./routes/index.route";
import notFoundMiddleware from "./middleware/notFound.middleware";
import errorHandlerMiddleware from "./middleware/error-handler.middleware";
import ExpressMongoSanitize from "express-mongo-sanitize";
import { corsOptions } from "./config/cors-options";
import { errorHandler, successHandler } from "./config/morgan";
config();

export const bootstrapExpress = (app: Express) => {
    app.use(successHandler);
    app.use(errorHandler);
    app.use(ExpressMongoSanitize());
    app.use(morgan("dev"));
    app.use(helmet());
    app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
    app.use(helmet.xssFilter());
    app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'trusted-cdn.com'"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
        },
    }));
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
    app.use("/api/", rootRouter);
    app.use(notFoundMiddleware);
    app.use(errorHandlerMiddleware);
}