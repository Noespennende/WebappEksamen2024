
import { z } from "zod";
import { EventCategoryEnum, ParticipantSchema } from "@/helpers/schema";


const EventBaseSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    slug: z.string(),
    price: z.number(),
    date: z.date(),
    address: z.string(),
    body: z.array(z.string()),
    waitinglist: z.boolean(),
    template: z.string().uuid().optional()
});

export const EventSchema = EventBaseSchema.extend({
    category: EventCategoryEnum,
    participants: z.array(ParticipantSchema),
    waitinglistParticipants: z.array(ParticipantSchema)
})

export const EventCreateSchema = EventSchema.omit({ id: true });


/* Types */

export type Event = z.infer<typeof EventSchema>;

export type CreateEvent = z.infer<typeof EventCreateSchema>;


/* Validation */

export const validateEvent = (data: unknown) => {
    return EventSchema.safeParse(data)
}

export const validateCreateEvent = (data: unknown) => {
    return EventCreateSchema.safeParse(data)
}