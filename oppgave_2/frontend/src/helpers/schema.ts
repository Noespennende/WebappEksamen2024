import { z } from "zod";


export const OccasionCategoryEnum = z.enum([
    "Sport", "Social", "Meeting", "Other"
])

export const WeekdayEnum = z.enum([
   "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
])

export const MonthEnum = z.enum([
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
])

export const OccasionStatusEnum = z.enum([
    "Ledig", "Fullt", "Venteliste"
])

export const participantAprovalStatusEnum = z.enum(
    ["Godkjent", "Avslått", "Ingen",],
)

export const ParticipantBaseSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(2),
    email: z.string().email(),
    registerDate: z.date(),
    aprovalDate: z.date().nullable(),
});

export const ParticipantSchema = ParticipantBaseSchema.extend({
    aprovalStatus: participantAprovalStatusEnum,
})

export const ParticipantCreateSchema = ParticipantSchema.omit({ id: true });


/* Validation */

export const validateParticipant = (data: unknown) => {
    return ParticipantSchema.safeParse(data)
}

export const validateOccationCategory = (data: unknown) => {
    return OccasionCategoryEnum.safeParse(data)
}

export const validateWeekday = (data: unknown) => {
    return WeekdayEnum.safeParse(data)
}

export const validateMonth = (data: unknown) => {
    return MonthEnum.safeParse(data)
}