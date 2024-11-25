import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import { validateEnv } from "../config/env.config";
import ForbiddenError from "../errors/forbidden.error";
import NotFoundError from "../errors/not-found.error";
import BadRequestError from "../errors/bad-request.error";
import { IRole } from "../interfaces/role.interface";
import { TokenService } from "../services/token.service";
import { UserService } from "../services/user.service";
import { signJwt } from "../utils/jwt";
import { extractTokenFromHeader } from "../utils/util";
import {
    ChangeOldPasswordSchema,
    LoginUserSchema,
} from "../validation/auth.validation";


const login = async (req: Request, res: Response) => {
    LoginUserSchema.parse(req.body);

    const { username, password } = req.body;

    const user = await UserService.findExtendedUser(
        { username, status: true },
        { select: "+password" },
        true
    );

    if (!user) {
        throw new ForbiddenError("User does not exist");
    }

    const userData: any = {
        _id: user._id,
        username: user.username,
        name: user.name,
        avatar: user.avatar,
    };

    const hasGrantAll = user?.roles.some((role: IRole) => role.grantAll);
    if (hasGrantAll) {
        userData.grantAll = true;
    } else {
        userData.permissions = Array.from(
            new Set(
                user?.roles.flatMap((role) =>
                    role.permissions.map((permission) => permission.name)
                )
            )
        );
    }

    const accessSecret = validateEnv()?.jwtconfig?.accessSecret as string;
    const accessExpiration = validateEnv()?.jwtconfig
        ?.accessExpiration as string;
    const refreshAccessSecret = validateEnv()?.jwtconfig
        ?.refreshAccessSecret as string;
    const refreshAccessExpiration = validateEnv()?.jwtconfig
        ?.refreshAccessExpiration as string;

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new ForbiddenError("Invalid credentials");
    }

    const accessToken = signJwt({ userId: user._id }, accessSecret as string, {
        expiresIn: accessExpiration,
    });

    const refreshToken = signJwt(
        { userId: user._id },
        refreshAccessSecret as string,
        {
            expiresIn: refreshAccessExpiration,
        }
    );

    await UserService.updateUserRefreshToken(user._id.toString(), refreshToken);

    delete (user as { password?: string }).password;

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
    })
        .status(200)
        .json({
            success: true,
            data: userData,
            message: "Logged in successfully",
            accessToken,
        });
};

const logout = async (req: Request, res: Response) => {
    await TokenService.addTokenToBlockList(
        extractTokenFromHeader(req) as string,
        validateEnv()?.jwtconfig?.accessExpiration as string
    );

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        throw new ForbiddenError("Refresh token is required");
    }

    await UserService.updateUserRefreshToken(req.userData.userId, "");

    res.clearCookie("refreshToken").status(200).json({
        success: true,
        message: "Logged out successfully",
    });
};

const changePassword = async (req: Request, res: Response) => {
    ChangeOldPasswordSchema.parse(req.body);
    const { oldPassword, newPassword } = req.body;

    const user = await UserService.findUser(
        { _id: req.userData.userId, status: true },
        { select: "+password" }
    );

    if (!user) {
        throw new NotFoundError("User not found");
    }

    const match = await bcrypt.compare(oldPassword, user.password);

    if (!match) {
        throw new BadRequestError("Incorrect password");
    }

    // Generate a new hashed password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    await UserService.updateUserById(req.userData.userId, {
        password: hashPassword,
        updatedBy: req.userData?.userId,
    });

    res.status(200).json({
        message: "Password changed successfully",
        success: true,
    });
};

const me = async (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        data: {
            userId: req.userData.userId,
            username: req.userData.username,
            name: req.userData.name,
            grantAll: req.userData.grantAll,
            permissions: req.userData.permissions
                ? Array.from(req.userData.permissions)
                : undefined,
        },
    });
};

export const checkPassword = async (req: Request, res: Response) => {
    const { password } = req.body;
    const user = await UserService.findUser(
        { _id: req.userData.userId, status: true },
        { select: "+password" }
    );

    if (!user) {
        throw new NotFoundError("User not found");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new BadRequestError("Incorrect password");
    }

    res.status(200).json({
        success: true,
        message: "Password is correct",
    });
};

const changeAvatar = async (req: Request, res: Response) => {
    if (!req.file) {
        throw new BadRequestError("Only png, jpg, jpeg files are allowed");
    }

    const avatar = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
        "base64"
    )}`;

    await UserService.updateUserById(req.userData.userId, {
        avatar,
        updatedBy: req.userData?.userId,
    });

    res.status(200).json({
        message: "Avatar updated successfully",
        success: true,
    });
};

export const refreshToken = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        throw new ForbiddenError("Refresh token is required");
    }

    const accessSecret = validateEnv()?.jwtconfig?.accessSecret as string;
    const accessExpiration = validateEnv()?.jwtconfig
        ?.accessExpiration as string;
    const refreshAccessSecret = validateEnv()?.jwtconfig
        ?.refreshAccessSecret as string;
    const refreshAccessExpiration = validateEnv()?.jwtconfig
        ?.refreshAccessExpiration as string;

    try {
        jwt.verify(refreshToken as string, refreshAccessSecret);

        const user = await UserService.findUserByRefreshToken(refreshToken);

        if (!user) {
            throw new ForbiddenError("Invalid refresh token");
        }

        const accessToken = signJwt(
            { userId: user._id },
            accessSecret as string,
            {
                expiresIn: accessExpiration,
            }
        );

        const newRefreshToken = signJwt(
            { userId: user._id },
            refreshAccessSecret as string,
            {
                expiresIn: refreshAccessExpiration,
            }
        );

        await UserService.updateUserRefreshToken(
            user._id.toString(),
            newRefreshToken
        );

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            sameSite: "strict",
        })
            .status(200)
            .json({
                success: true,
                message: "Token refreshed successfully",
                accessToken,
            });
    } catch (err) {
        throw new ForbiddenError("Invalid refresh token");
    }
};

export const AuthController = {
    login,
    logout,
    changePassword,
    me,
    checkPassword,
    changeAvatar,
    refreshToken,
};
