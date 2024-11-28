import { z } from "zod";


export const EventCategoryEnum = z.enum([
    "Sport", "Social", "Meeting", "Other"
])

export const WeekdayEnum = z.enum([
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
])

export const MonthEnum = z.enum([
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
])


export const ParticipantBaseSchema = z.object({
    id: z.string().uuid(),
    date: z.date(),
    email: z.string().email()
});


/* Types */

export const ParticipantSchema = ParticipantBaseSchema.extend({})

export const ParticipantCreateSchema = ParticipantSchema.omit({ id: true });

export type Participant = z.infer<typeof ParticipantSchema>;

export type CreateParticipant = z.infer<typeof ParticipantCreateSchema>;

export type EventCategory = z.infer<typeof EventCategoryEnum>;

export type Weekday = z.infer<typeof WeekdayEnum>

export type Month = z.infer<typeof MonthEnum>


/* Validation */

export const validateParticipant = (data: unknown) => {
    return ParticipantSchema.safeParse(data)
}

export const validateEventCategory = (data: unknown) => {
    return EventCategoryEnum.safeParse(data)
}

export const validateWeekday = (data: unknown) => {
    return WeekdayEnum.safeParse(data)
}

export const validateMonth = (data: unknown) => {
    return MonthEnum.safeParse(data)
}