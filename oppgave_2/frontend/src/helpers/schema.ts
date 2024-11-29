import { z } from "zod";


export const OccasionCategoryEnum = z.enum([
    "Sport", "Social", "Meeting", "Other"
])

export const WeekdayEnum = z.enum([
    "Monday", "Tuesday", "Wednesday", "Thursday", 
    "Friday", "Saturday", "Sunday"
])

export const MonthEnum = z.enum([
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
])

export const OccasionStatusEnum = z.enum([
    "Ledig", "Fullt", "Vente liste"
])

export const LoadingStatusEnum = z.enum([
    "idle", "loading", "error", "success", "fetching", "posting", "deleting"
])

export const FetchEnum = z.enum(["get", "getOne", "post", "delete", "update"])


export const ParticipantBaseSchema = z.object({
    id: z.string().uuid(),
    date: z.date(),
    email: z.string().email()
});


export const ParticipantSchema = ParticipantBaseSchema.extend({})

export const ParticipantCreateSchema = ParticipantSchema.omit({ id: true });


/* Validation */

export const validateParticipant = (data: unknown) => {
    return ParticipantSchema.safeParse(data)
}

export const validateEventCategory = (data: unknown) => {
    return OccasionCategoryEnum.safeParse(data)
}

export const validateWeekday = (data: unknown) => {
    return WeekdayEnum.safeParse(data)
}

export const validateMonth = (data: unknown) => {
    return MonthEnum.safeParse(data)
}