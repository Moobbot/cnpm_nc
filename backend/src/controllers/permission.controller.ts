import { Request, Response } from "express";
import NotFoundError from "../errors/not-found.error";
import { PermissionService } from "../services/permission.service";
import BadRequestError from "../errors/bad-request.error";
import {
    ChangePermissionStatusSchema,
    CreatePermissionSchema,
} from "../validation/permission.validation";

const createPermission = async (req: Request, res: Response) => {
    CreatePermissionSchema.parse(req.body);

    const { name } = req.body;

    const existingPermission = await PermissionService.findPermissionByName(
        name
    );

    if (existingPermission) {
        throw new BadRequestError("Permission already exists");
    }

    const permission = await PermissionService.createPermission({
        name,
        createdBy: req.userData.userId,
    });

    res.status(201).json({
        message: "Permission created successfully",
        success: true,
        data: permission,
    });
};

const listAllPermissions = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const total = await PermissionService.countPermissions();

    const permissions = await PermissionService.findAllPermissions(page, limit);
    res.status(200).json({
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        permissions,
        success: true,
    });
};

const getPermissionById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const permission = await PermissionService.findPermissionById(id);
    if (!permission) {
        throw new NotFoundError("Permission not found");
    }

    res.status(200).json({
        data: permission,
        success: true,
    });
};

const changePermissionStatus = async (req: Request, res: Response) => {
    ChangePermissionStatusSchema.parse(req.body);

    const { id } = req.params;

    const { status } = req.body;

    const updatedPermission = await PermissionService.updatePermissionById(id, {
        status,
        updatedBy: req.userData?.userId,
    });

    if (!updatedPermission) {
        throw new NotFoundError("Permission not found");
    }

    res.status(200).json({
        message: `Permission ${
            status ? "activated" : "deactivated"
        } successfully`,
        success: true,
        data: updatedPermission,
    });
};

export const PermissionController = {
    createPermission,
    listAllPermissions,
    getPermissionById,
    changePermissionStatus,
};
