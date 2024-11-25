import { createWriteStream, existsSync, mkdirSync } from "fs";
import morgan from "morgan";
import path from "path";
import { validateEnv } from "./env.config";

const nodeEnv = validateEnv()?.env;
const getIPFormat = () => (nodeEnv === "production" ? ":remote-addr - " : "");

// Ensure the logs directory exists
const logsDir = path.join(__dirname, "..", "logs");
if (!existsSync(logsDir)) {
    mkdirSync(logsDir);
}

// Generate log filename with current date
const getFormattedDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}_${month}_${day}`;
};

const logFileName = `${getFormattedDate()}_access.log`;
const accessLogStream = createWriteStream(
    path.join(logsDir, logFileName),
    { flags: "a" }
);

const successResponseFormat = `${getIPFormat()} :method :url :status :response-time ms :user-agent :date`;
const successHandler = morgan(successResponseFormat, {
    stream: accessLogStream,
    skip: (req, res) => res.statusCode >= 400,
});

const errorResponseFormat = `${getIPFormat()} :method :url :status :response-time ms :user-agent :date`;
const errorHandler = morgan(errorResponseFormat, {
    stream: accessLogStream,
    skip: (req, res) => res.statusCode < 400,
});

export { errorHandler, successHandler };
