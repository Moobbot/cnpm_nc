import bcrypt from "bcryptjs";
import { Request, Response } from "express";

import BadRequestError from "../errors/bad-request.error";
import NotFoundError from "../errors/not-found.error";

import { RoleRepository } from "../repositories/role.repository";
import { UserRepository } from "../repositories/user.repository";

import {
    ChangeManyUserStatusSchema,
    ChangeUserStatusSchema,
    CreateUserSchema,
    UpdateUserSchema,
} from "../validation/user.validation";
import ConflictError from "../errors/conflict.error";
import { z } from "zod";

export class UserService {
    private readonly userRepository: UserRepository;
    private readonly roleRepository: RoleRepository;

    constructor() {
        this.userRepository = new UserRepository();
        this.roleRepository = new RoleRepository();
    }

    createUser = async (
        userId: string,
        data: z.infer<typeof CreateUserSchema>
    ) => {
        const existingUser = await this.userRepository.findUserByUsername(
            data.username
        );

        if (existingUser) {
            throw new ConflictError("Username already exists");
        }
        const roles = await this.roleRepository.findByIds(data.roles);

        if (roles.length !== data.roles.length) {
            throw new NotFoundError(
                data.roles.length === 1
                    ? "Role not found"
                    : "Some roles not found"
            );
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);

        return await this.userRepository.create({
            username: data.username,
            password: hashedPassword,
            detail_user: data.detail_user,
            roles: roles,
            createdBy: userId,
        });
    };

    getUserById = async (id: string) => {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        return user;
    };

    listAllUsers = async (page: number, limit: number) => {
        const total = await this.userRepository.count();

        const users = await this.userRepository.findAll({});

        return { total, users };
    };

    updateUser = async (
        userId: string,
        id: string,
        data: z.infer<typeof UpdateUserSchema>
    ) => {
        if (data.password) {
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password, salt);
        }

        if (data.roles) {
            const roles = await this.roleRepository.findByIds(data.roles);
            if (roles.length !== data.roles.length) {
                throw new NotFoundError(
                    data.roles.length === 1
                        ? "Role not found"
                        : "Some roles not found"
                );
            }
        }

        const updatedUser = await this.userRepository.updateById(id, {
            ...data,
            updatedBy: userId,
        });

        if (!updatedUser) {
            throw new NotFoundError("User not found");
        }

        return updatedUser;
    };

    changeUserStatus = async (userId: string, id: string, status: boolean) => {
        const updatedUser = await this.userRepository.updateById(id, {
            status,
            updatedBy: userId,
        });

        if (!updatedUser) {
            throw new NotFoundError("User not found");
        }

        return updatedUser;
    };

    changeManyUserStatus = async (
        userId: string,
        ids: string[],
        status: boolean
    ) => {
        return await this.userRepository.updateByIds(ids, {
            status,
            updatedBy: userId,
        });
    };
}
