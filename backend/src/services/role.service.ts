import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { IRole } from "../interfaces/role.interface";
import { RoleModel } from "../models/role.model";
import { count } from "console";

const findAllRoles = (page: number, limit: number) => {
    const startIndex = (page - 1) * limit;

    return RoleModel.find().skip(startIndex).limit(limit);
};

const findRoleById = (id: string) => {
    return RoleModel.findById(id);
};

const findRolesByIds = (ids: string[]) => {
    return RoleModel.find({ _id: { $in: ids } });
}

const findRoleByName = (name: string) => {
    return RoleModel.findOne({ name: name });
};

// const findRoles = (
//     filter: FilterQuery<IRole>,
//     options: QueryOptions = { lean: true }
// ) => {
//     return RoleModel.find(filter, {}, options);
// };

const createRole = (roleData: Partial<IRole>) => {
    return RoleModel.create(roleData);
};

const deleteRoleById = (id: string) => {
    return RoleModel.deleteOne({ _id: id });
};

const updateRoleById = (
    id: string,
    update: UpdateQuery<IRole>,
    options: QueryOptions = { new: true }
) => {
    return RoleModel.findByIdAndUpdate(id, update, options);
};

const countRoles = () => {
    return RoleModel.countDocuments();
};

export const RoleService = {
    findAllRoles,
    findRoleById,
    findRolesByIds,
    findRoleByName,
    // findRoles,
    createRole,
    deleteRoleById,
    updateRoleById,
    countRoles,
};
