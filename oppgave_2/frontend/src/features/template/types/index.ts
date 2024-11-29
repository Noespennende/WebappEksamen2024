import { z } from "zod";
import { TemplateCreateSchema, TemplateSchema } from "../helpers/schema";


export type Template = z.infer<typeof TemplateSchema>;

export type CreateTemplate = z.infer<typeof TemplateSchema>;


/* Validation */

export const validateTemplate = (data: unknown) => {
    return TemplateSchema.safeParse(data)
}

export const validateCreateTemplate = (data: unknown) => {
    return TemplateCreateSchema.safeParse(data)
}