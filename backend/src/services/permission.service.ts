import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { IPermission } from "../interfaces/permission.interface";
import { PermissionModel } from "../models/permission.model";

const findAllPermissions = (page: number, limit: number) => {
    const startIndex = (page - 1) * limit;

    return PermissionModel.find().skip(startIndex).limit(limit);
};

const findPermissionById = (id: string) => {
    return PermissionModel.findById(id);
};

const findPermissionsByIds = (ids: string[]) => {
    return PermissionModel.find({ _id: { $in: ids } });
}

const findPermissionByName = (name: string) => {
    return PermissionModel.findOne({ name });
};

// const findPermissions = (
//     filter: FilterQuery<IPermission>,
//     options: QueryOptions = { lean: true }
// ) => {
//     return PermissionModel.find(filter, {}, options);
// };

const createPermission = (permissionData: Partial<IPermission>) => {
    return PermissionModel.create(permissionData);
};

const deletePermissionById = (id: string) => {
    return PermissionModel.findByIdAndDelete(id);
};

const updatePermissionById = (
    id: string,
    permissionData: UpdateQuery<IPermission>,
    options: QueryOptions = { new: true }
) => {
    return PermissionModel.findByIdAndUpdate(id, permissionData, options);
};

const countPermissions = () => {
    return PermissionModel.countDocuments();
}

export const PermissionService = {
    findAllPermissions,
    findPermissionById,
    findPermissionsByIds,
    findPermissionByName,
    // findPermissions,
    createPermission,
    deletePermissionById,
    updatePermissionById,
    countPermissions,
};
