
import { z } from "zod";
import { OccassionSchema, OccationCreateSchema } from "../helpers/schema";

export type Occation = z.infer<typeof OccassionSchema>;

export type CreateOccation = z.infer<typeof OccationCreateSchema>;

export type Participant = z.infer<typeof ParticipantSchema>;

export type CreateParticipant = z.infer<typeof ParticipantCreateSchema>;

export type OccasionCategory = z.infer<typeof OccasionCategoryEnum>;

export type Weekday = z.infer<typeof WeekdayEnum>

export type Month = z.infer<typeof MonthEnum>

export type OccasionStatus = z.infer<typeof OccasionStatusEnum>
