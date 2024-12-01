import { OccasionSchema } from "@/features/events/helpers/schema";
import { TemplateSchema } from "@/features/template/helpers/schema";
import { z } from "zod";

export const hookReturnSchemaBase = z.object({
    get: z.ZodFunction.arguments().return(z.any),
    getOne: z.ZodFunction.arguments(z.string()).return(z.any),
    create: z.ZodFunction.arguments(z.string()).return(z.any),
    error: z.string().nullable(),
    status: z.object({
        idle: z.boolean(),
        loading: z.boolean(),
        success: z.boolean(),
        error: z.boolean(),
        fetching: z.boolean(),
        posting: z.boolean(),
        deleting: z.boolean()
    })
})


export const StatusEnum = z.enum([
    "idle", "loading", "error", "success", "fetching", "posting", "deleting"
])

export const FetchEnum = z.enum(["get", "getOne", "post", "delete", "update", "getSorted"])


export const occasionHookReturnSchema = hookReturnSchemaBase.extend({
    getSorted: z.ZodFunction.arguments().return(z.any),
    update: z.ZodFunction.arguments(OccasionSchema).return(z.any),
    remove: z.ZodFunction.arguments(z.string()).return(z.any),
    data: z.array(OccasionSchema),
})

export const templateHookReturnSchema = hookReturnSchemaBase.extend({
    data: z.array(TemplateSchema),
})



