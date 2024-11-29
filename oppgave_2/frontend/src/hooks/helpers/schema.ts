import { OccasionSchema } from "@/features/events/helpers/schema";
import { z } from "zod";

export const hookReturnSchema = z.object({
    get: z.ZodFunction.arguments().return(z.any),
    getOne: z.ZodFunction.arguments(z.string()).return(z.any),
    update: z.ZodFunction.arguments(OccasionSchema).return(z.any),
    remove: z.ZodFunction.arguments(z.string()).return(z.any),
    data: z.array(OccasionSchema),
    error: z.boolean(),
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
