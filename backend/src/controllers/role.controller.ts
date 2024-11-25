import { Request, Response } from "express";
import BadRequestError from "../errors/bad-request.error";
import NotFoundError from "../errors/not-found.error";
import { RoleService } from "../services/role.service";
import { PermissionService } from "../services/permission.service";
import {
    ChangeRoleStatusSchema,
    CreateRoleSchema,
    UpdateRoleSchema,
} from "../validation/role.validation";

const createRole = async (req: Request, res: Response) => {
    CreateRoleSchema.parse(req.body);

    const { name, grantAll } = req.body;
    const existingRole = await RoleService.findRoleByName(name);

    if (existingRole) {
        throw new BadRequestError("Role already exists");
    }

    const role = await RoleService.createRole({
        name,
        grantAll,
        createdBy: req.userData.userId,
    });
    res.status(201).json({
        message: "Role created successfully",
        success: true,
        data: role,
    });
};

const listAllRoles = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const total = await RoleService.countRoles();

    const roles = await RoleService.findAllRoles(page, limit);

    res.status(200).json({
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        data: roles,
        success: true,
    });
};

const getRoleById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const role = await RoleService.findRoleById(id);
    if (!role) {
        throw new NotFoundError("Role not found");
    }

    res.status(200).json({
        data: role,
        success: true,
    });
};

const updateRole = async (req: Request, res: Response) => {
    const validatedData = UpdateRoleSchema.parse(req.body);

    const { id } = req.params;

    if (validatedData.permissions) {
        const permissions = await PermissionService.findPermissionsByIds(
            validatedData.permissions
        );
        if (permissions.length !== validatedData.permissions.length) {
            throw new BadRequestError("Some permissions are invalid");
        }
    }

    const updatedRole = await RoleService.updateRoleById(id, {
        ...validatedData,
        updatedBy: req.userData?.userId,
    });

    if (!updatedRole) {
        throw new NotFoundError("Role not found");
    }

    res.status(200).json({
        message: "Role updated successfully",
        success: true,
        data: updatedRole,
    });
};

const changeRoleStatus = async (req: Request, res: Response) => {
    ChangeRoleStatusSchema.parse(req.body);

    const { id } = req.params;

    const { status } = req.body;

    const updatedRole = await RoleService.updateRoleById(id, {
        status: status,
        updatedBy: req.userData?.userId,
    });

    if (!updatedRole) {
        throw new NotFoundError("Role not found");
    }

    res.status(200).json({
        message: `Role ${status ? "activated" : "deactivated"} successfully`,
        success: true,
        data: updatedRole,
    });
};

export const RoleController = {
    createRole,
    listAllRoles,
    getRoleById,
    updateRole,
    changeRoleStatus,
};
