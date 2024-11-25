import { object, string, array, TypeOf, union, boolean } from "zod";

export const CreateUserSchema = object({
    username: string({ required_error: "Name is required" }),
    password: string({ required_error: "Password is required" }).min(
        6,
        "Password must be at least 6 characters"
    ),
    name: string({ required_error: "Name is required" }),
    roles: array(string()).min(1, "At least one role is required"),
});

export const UpdateUserSchema = object({
    name: string().optional(),
    password: string()
        .min(6, "Password must be at least 6 characters")
        .optional(),
    roles: array(string()).min(1, "At least one role is required").optional(),
});

export const ChangeUserStatusSchema = object({
    status: boolean({ required_error: "Status is required" }),
});

export const ChangeManyUserStatusSchema = object({
    userIds: array(string()).min(1, "At least one user is required"),
    status: boolean({ required_error: "Status is required" }),
});
