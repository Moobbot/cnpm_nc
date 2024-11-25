import { NextFunction, Request, Response } from "express";

import { ZodError } from "zod";

import HttpException from "../errors/http-exception.error";

const errorHandlerMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const defaultError = {
        statusCode: 500,
        msg: "Something went wrong, try again later",
    };

    if (err instanceof HttpException) {
        defaultError.statusCode = err.statusCode;
        defaultError.msg = err.message;
    } else if (err instanceof ZodError) {
        defaultError.statusCode = 400;
        defaultError.msg = err.errors.map(
            (item) => `${item.path}: ${item.message}`
        )[0];
    } else if (err.name === "ValidationError") {
        defaultError.statusCode = 500;
        defaultError.msg = Object.values(err.errors as { message: string }[])
            .map((item: { message: string }) => item?.message)
            .join(",");
    } else if (err.name === "CastError") {
        defaultError.statusCode = 400;
        defaultError.msg = `Resourse not found. Invalid :${err.path}`;
    } else if (err.name === "MulterError") {
        if (err.message === "File too large") {
            defaultError.statusCode = 413;
            defaultError.msg = err.message;
        } else if (err.message === "Unexpected field") {
            defaultError.statusCode = 400;
            defaultError.msg = "Only 1 image is allowed";
        }
    } else if (err.code && err.code === 11000) {
        defaultError.statusCode = 400;
        defaultError.msg = `${Object.keys(
            err.keyValue
        )} field has to be unique`;
    }

    res.status(defaultError.statusCode).json({
        message: defaultError.msg,
        success: false,
        stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
    });
};

export default errorHandlerMiddleware;