import {
    FilterQuery,
    QueryOptions,
    Schema,
    Types,
    UpdateQuery,
} from "mongoose";
import { IUser } from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";

/**
 * Fetches a paginated list of users from the database, along with their associated roles
 * and the users who created or last updated them.
 *
 * @param {number} page - The current page number (1-based index).
 * @param {number} limit - The maximum number of users to retrieve per page.
 * @returns {Promise} - A promise that resolves to the paginated list of users.
 */
const findAllUsers = (page: number, limit: number) => {
    // Calculate the starting index for pagination
    const startIndex = (page - 1) * limit;

    // Query the UserModel to find users, populate associated data, and apply pagination
    return UserModel.find()
        // Populate the "roles" field, selecting only "id" and "name"
        .populate({
            path: "roles",
            select: "id name",
        })
        .populate({
            path: "createdBy",
            select: "id username",
        })
        .populate({
            path: "updatedBy",
            select: "id username",
        })
        // Skip records to implement pagination
        .skip(startIndex)
        // Limit the number of records to retrieve per page
        .limit(limit);
};

const findUserById = (id: string) => {
    return UserModel.findById(id);
};

const findUsersByIds = (ids: string[]) => {
    return UserModel.find({ _id: { $in: ids } });
};

const findUserByName = (username: string) => {
    return UserModel.findOne({ username });
};

const findUserByRefreshToken = (refreshToken: string) => {
    return UserModel.findOne({ refreshToken, status: true });
};

const updateUserRefreshToken = (
    userId: string | Types.ObjectId,
    refreshToken: string
) => {
    return UserModel.findByIdAndUpdate(
        userId,
        { refreshToken },
        { timestamps: false }
    );
};

const findUser = (query: FilterQuery<IUser>, options: QueryOptions = {}) => {
    return UserModel.findOne(query, {}, options).lean();
};

const findExtendedUser = (
    query: FilterQuery<IUser>,
    options: QueryOptions = {},
    activeOnly: boolean = false
) => {
    const match = activeOnly ? { status: true } : {};
    return UserModel.findOne(query, {}, options).populate({
        path: "roles",
        match,
        select: "id name grantAll",
        populate: {
            path: "permissions",
            match,
            select: "id name",
        },
    });
};

const createUser = (userData: Partial<IUser>) => {
    return UserModel.create(userData);
};

const updateUserById = (
    id: string,
    update: UpdateQuery<IUser>,
    options: QueryOptions = { new: true }
) => {
    return UserModel.findByIdAndUpdate(id, update, options);
};

const updateUserByIds = (ids: string[], update: UpdateQuery<IUser>) => {
    return UserModel.updateMany({ _id: { $in: ids } }, update);
};

const deleteUserById = (id: string) => {
    return UserModel.deleteOne({ _id: id });
};

const countUsers = () => {
    return UserModel.countDocuments();
};

export const UserService = {
    findAllUsers,
    findUserById,
    findUsersByIds,
    findUserByName,
    findExtendedUser,
    findUserByRefreshToken,
    updateUserRefreshToken,
    findUser,
    createUser,
    updateUserById,
    updateUserByIds,
    deleteUserById,
    countUsers,
};
