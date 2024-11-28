import { WeekdayEnum } from "@/helpers/schema";
import { z } from "zod";

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

/* Validation */

export const validateTemplate = (data: unknown) => {
    return TemplateSchema.safeParse(data)
}

export const validateCreateTemplate = (data: unknown) => {
    return TemplateCreateSchema.safeParse(data)
}