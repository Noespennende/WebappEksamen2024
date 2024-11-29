
import { EventCategoryEnum, ParticipantSchema } from "@/helpers/schema";
import { z } from "zod";

const EventBaseSchema = z.object({
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

export const EventSchema = EventBaseSchema.extend({
    category: EventCategoryEnum,
    participants: z.array(ParticipantSchema),
    waitinglistParticipants: z.array(ParticipantSchema)
})

export const EventCreateSchema = EventSchema.omit({ id: true });


/* Validation */

export const validateEvent = (data: unknown) => {
    return EventSchema.safeParse(data)
}

export const validateCreateEvent = (data: unknown) => {
    return EventCreateSchema.safeParse(data)
}