
import { OccasionCategoryEnum, ParticipantSchema } from "@/helpers/schema";
import { z } from "zod";

const bodyEntry = z.object({
    id: z.string(),
    content: z.string(),
    occasionId: z.string()
})

const OccassionBaseSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(3),
    slug: z.string(),
    price: z.number(),
    date: z.date(),
    address: z.string(),
    waitinglist: z.boolean(),
    template: z.string().uuid().optional(),
    maxParticipants: z.number().min(1).optional(),
    createdAt: z.date()
});

export const OccassionSchema = OccassionBaseSchema.extend({
    category: OccasionCategoryEnum,
    participants: z.array(ParticipantSchema).default([]),
    waitinglistParticipants: z.array(ParticipantSchema).default([]),
    rejectedParticipants:  z.array(ParticipantSchema).default([]),
    body: z.array(bodyEntry),
})

export const OccationCreateSchema = OccassionSchema.omit({ id: true, body:true }).extend({
    body: z.array(z.string())
});

export const adminParticipantActionEnum = z.enum(
    ["Velg handling", "Godkjenn", "Avslå", "Slett"],
)

export const participantStatusEnum = z.enum(
    ["Deltager", "Venteliste", "Avslått"],
)

/* Validation */

export const validateOccation = (data: unknown) => {
    return OccassionSchema.safeParse(data)
}

export const validateCreateEvent = (data: unknown) => {
    return OccationCreateSchema.safeParse(data)
}