import bcrypt from "bcryptjs";
import { Request, Response } from "express";

import BadRequestError from "../errors/bad-request.error";
import NotFoundError from "../errors/not-found.error";

import { RoleService } from "../services/role.service";
import { UserService } from "../services/user.service";

import {
    ChangeManyUserStatusSchema,
    ChangeUserStatusSchema,
    CreateUserSchema,
    UpdateUserSchema,
} from "../validation/user.validation";

/**
 * Creates a new user in the system with specific roles.
 * - Validates user input using `CreateUserSchema`
 * - Checks for existing username and valid roles
 * - Hashes password and saves user data through `UserService`
 * @param req - Express request object
 * @param res - Express response object
 * @returns JSON response with new user data or error message
 */
const createUser = async (req: Request, res: Response) => {
    const validatedData = CreateUserSchema.parse(req.body);

    const existingUser = await UserService.findUserByName(
        validatedData.username
    );

    if (existingUser) {
        throw new BadRequestError("User already exists");
    }
    const roles = await RoleService.findRolesByIds(validatedData.roles);

    if (roles.length !== validatedData.roles.length) {
        throw new NotFoundError(
            validatedData.roles.length === 1
                ? "Role not found"
                : "Some roles not found"
        );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(validatedData.password, salt);

    const newUser = await UserService.createUser({
        username: validatedData.username,
        password: hashedPassword,
        name: validatedData.name,
        roles: roles,
        createdBy: req.userData.userId,
    });

    res.status(201).json({
        message: "User created successfully",
        success: true,
        data: newUser,
    });
};

const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await UserService.findExtendedUser({ _id: id });
    if (!user) {
        throw new BadRequestError("User not found");
    }

    res.status(200).json({
        data: user,
        success: true,
    });
};

const listAllUsers = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const total = await UserService.countUsers();

    const users = await UserService.findAllUsers(page, limit);

    res.status(200).json({
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        data: users,
        success: true,
    });
};

const updateUser = async (req: Request, res: Response) => {
    const validatedData = UpdateUserSchema.parse(req.body);

    const { id } = req.params;

    if (validatedData.password) {
        const salt = await bcrypt.genSalt(10);
        validatedData.password = await bcrypt.hash(
            validatedData.password,
            salt
        );
    }

    if (validatedData.roles) {
        const roles = await RoleService.findRolesByIds(validatedData.roles);
        if (roles.length !== validatedData.roles.length) {
            throw new NotFoundError(
                validatedData.roles.length === 1
                    ? "Role not found"
                    : "Some roles not found"
            );
        }
    }

    const updatedUser = await UserService.updateUserById(id, {
        ...validatedData,
        updatedBy: req.userData?.userId,
    });

    res.status(200).json({
        message: "User updated successfully",
        success: true,
        data: updatedUser,
    });
};

const changeUserStatus = async (req: Request, res: Response) => {
    const validatedData = ChangeUserStatusSchema.parse(req.body);

    const { id } = req.params;

    const { status } = validatedData;

    const updatedUser = await UserService.updateUserById(id, {
        status,
        updatedBy: req.userData?.userId,
    });

    res.status(200).json({
        message: `User ${status ? "activated" : "deactivated"} successfully`,
        success: true,
        data: updatedUser,
    });
};

const changeManyUserStatus = async (req: Request, res: Response) => {
    const validatedData = ChangeManyUserStatusSchema.parse(req.body);

    const { userIds, status } = validatedData;

    const updatedUsers = await UserService.updateUserByIds(userIds, {
        status,
        updatedBy: req.userData?.userId,
    });

    res.status(200).json({
        message: `Users ${status ? "activated" : "deactivated"} successfully`,
        success: true,
        data: updatedUsers,
    });
};

export const UserController = {
    createUser,
    getUserById,
    listAllUsers,
    updateUser,
    changeUserStatus,
    changeManyUserStatus,
};
