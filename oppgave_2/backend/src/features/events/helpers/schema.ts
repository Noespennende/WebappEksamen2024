
import { z } from "zod";
import { OccasionCategoryEnum, ParticipantSchema } from "@/helpers/schema";


const OccassionBaseSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(3),
    slug: z.string(),
    price: z.number(),
    date: z.date(),
    address: z.string(),
    body: z.array(z.string()),
    waitinglist: z.boolean(),
    template: z.string().uuid().optional(),
    maxParticipants: z.number().min(1).optional()
});

export const OccassionSchema = OccassionBaseSchema.extend({
    category: OccasionCategoryEnum,
    participants: z.array(ParticipantSchema).default([]),
    waitinglistParticipants: z.array(ParticipantSchema).default([]),
    recejectedParticipants:  z.array(ParticipantSchema).default([])
})

export const OccationCreateSchema = OccassionSchema.omit({ id: true });

/* Enums */

export const ParticipantStatusEnum = z.enum(
    ["Deltager", "Venteliste", "Avslått"],
)


/* Validation */

export const validateOccation = (data: unknown) => {
    return OccassionSchema.safeParse(data)
}

export const validateCreateOccation = (data: unknown) => {
    return OccationCreateSchema.safeParse(data)
}