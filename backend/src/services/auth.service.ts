import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { validateEnv } from "../config/env.config";
import ForbiddenError from "../errors/forbidden.error";
import NotFoundError from "../errors/not-found.error";
import BadRequestError from "../errors/bad-request.error";
import { IRole } from "../interfaces/role.interface";
import { UserRepository } from "../repositories/user.repository";
import { signJwt } from "../utils/jwt";
import { addTokenToBlockList } from "../utils/token-cache";


export class AuthService {
    private readonly userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    login = async (username: string, password: string) => {
        const user = await this.userRepository.findExtendedUserByUsername(
            username,
            true,
            true
        );

        // console.log(user);

        if (!user) {
            throw new ForbiddenError("User does not exist");
        }

        const userData: any = {
            _id: user._id,
            username: user.username,
            detail_user: user.detail_user,
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

        const accessToken = signJwt(
            { userId: user._id },
            accessSecret as string,
            {
                expiresIn: accessExpiration,
            }
        );

        const refreshToken = signJwt(
            { userId: user._id },
            refreshAccessSecret as string,
            {
                expiresIn: refreshAccessExpiration,
            }
        );

        await this.userRepository.updateUserRefreshToken(
            user._id.toString(),
            refreshToken
        );

        delete (user as { password?: string }).password;

        return { userData, accessToken, refreshToken };
    };

    logout = async (userId: string, token: string) => {
        await addTokenToBlockList(
            token,
            validateEnv()?.jwtconfig?.accessExpiration as string
        );

        await this.userRepository.updateUserRefreshToken(userId, "");
    };

    changePassword = async (
        userId: string,
        oldPassword: string,
        newPassword: string
    ) => {
        const user = await this.userRepository.findUserWithPasswordById(userId);

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

        await this.userRepository.updateById(userId, {
            password: hashPassword,
            updatedBy: userId,
        });

        return true;
    };

    checkPassword = async (userId: string, password: string) => {
        const user = await this.userRepository.findUserWithPasswordById(userId);

        if (!user) {
            throw new NotFoundError("User not found");
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new BadRequestError("Incorrect password");
        }
    };

    changeAvatar = async (userId: string, avatar: string) => {
        await this.userRepository.updateById(userId, {
            detail_user: { avatar },
            updatedBy: userId,
        });
    };

    refreshToken = async (refreshToken: string) => {
        const accessSecret = validateEnv()?.jwtconfig?.accessSecret as string;
        const accessExpiration = validateEnv()?.jwtconfig
            ?.accessExpiration as string;
        const refreshAccessSecret = validateEnv()?.jwtconfig
            ?.refreshAccessSecret as string;
        const refreshAccessExpiration = validateEnv()?.jwtconfig
            ?.refreshAccessExpiration as string;

        try {
            jwt.verify(refreshToken, refreshAccessSecret);

            const user = await this.userRepository.findUserByRefreshToken(
                refreshToken
            );

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

            await this.userRepository.updateUserRefreshToken(
                user._id.toString(),
                newRefreshToken
            );

            return { accessToken, newRefreshToken };
        } catch (err) {
            throw new ForbiddenError("Invalid refresh token");
        }
    };
}
