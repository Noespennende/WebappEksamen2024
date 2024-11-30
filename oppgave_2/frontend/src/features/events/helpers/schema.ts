
import { OccasionCategoryEnum, ParticipantSchema } from "@/helpers/schema";
import { z } from "zod";

const OccasionBaseSchema = z.object({
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

export const OccasionSchema = OccasionBaseSchema.extend({
    category: OccasionCategoryEnum,
    participants: z.array(ParticipantSchema).default([]),
    waitinglistParticipants: z.array(ParticipantSchema).default([]),
    recejectedParticipants:  z.array(ParticipantSchema).default([])
})

export const adminParticipantActionEnum = z.enum(
    ["Velg handling", "Godkjenn", "Avslå", "Slett"],
)

export const participantStatusEnum = z.enum(
    ["Deltager", "Venteliste", "Avslått"],
)


export const OcasionCreateSchema = OccasionSchema.omit({ id: true });


/* Validation */

export const validateOccation = (data: unknown) => {
    return OccasionSchema.safeParse(data)
}

export const validateCreateEvent = (data: unknown) => {
    return OcasionCreateSchema.safeParse(data)
}