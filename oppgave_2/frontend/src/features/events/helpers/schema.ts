
import { OccasionCategoryEnum, ParticipantSchema } from "@/helpers/schema";
import { z } from "zod";

const OccasionBaseSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    slug: z.string(),
    price: z.number(),
    date: z.date(),
    address: z.string(),
    body: z.array(z.string()),
    waitinglist: z.boolean(),
    template: z.string().uuid().optional(),
    maxParticipants: z.number().optional()
});

export const OccasionSchema = OccasionBaseSchema.extend({
    category: OccasionCategoryEnum,
    participants: z.array(ParticipantSchema),
    waitinglistParticipants: z.array(ParticipantSchema)
})

export const EventCreateSchema = OccasionSchema.omit({ id: true });


/* Validation */

export const validateEvent = (data: unknown) => {
    return OccasionSchema.safeParse(data)
}

export const validateCreateEvent = (data: unknown) => {
    return EventCreateSchema.safeParse(data)
}