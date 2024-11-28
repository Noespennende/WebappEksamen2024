
import { z } from "zod";
import { WeekdayEnum } from "@/helpers/schema";



const TemplateBaseSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    price: z.number(),
    maxParticipants: z.number().default(0),
    private: z.boolean(),
    setPrice: z.boolean(),
    allowSameDayEvent: z.boolean(),
    waitList: z.boolean(),
    limitedParticipants: z.boolean(),
});


export const TemplateSchema = TemplateBaseSchema.extend({
    fixedWeekdays: z.array(WeekdayEnum) 
})

export const TemplateCreateSchema = TemplateSchema.omit({ id: true });


/* Types */

export type Template = z.infer<typeof TemplateSchema>;

export type CreateTemplate = z.infer<typeof TemplateSchema>;


/* Validation */

export const validateTemplate = (data: unknown) => {
    return TemplateSchema.safeParse(data)
}

export const validateCreateTemplate = (data: unknown) => {
    return TemplateCreateSchema.safeParse(data)
}