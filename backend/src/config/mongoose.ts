import { connect, set } from "mongoose";
import { validateEnv } from "./env.config";
import { logger } from "./logger";

const MONGO_DB_URI = validateEnv()!.MONGO_DB_URI;

// connection to db
export const connectToDB = async () => {
    try {
        set("strictQuery", false);
        const db = await connect(MONGO_DB_URI);
        logger.info(`MongoDB connected to ${db.connection.name}`);
        // console.log("MongoDB connected to", db.connection.name);
        // Emit an event when the connection is successful
    } catch (error) {
        console.error(error);
        // Emit an event when there's an error
    }
};
