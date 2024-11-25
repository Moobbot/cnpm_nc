import { object, string, boolean, array, Schema } from "zod";

export const CreatePermissionSchema = object({
    name: string({ required_error: "Name is required" }),
});

export const ChangePermissionStatusSchema = object({
    status: boolean({ required_error: "Status is required" }),
});
