import { object, string } from "zod";

export const CreateTestRequestSchema = object({
    id_external_system: string({ required_error: "External system ID is required" }),
    
})