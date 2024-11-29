import { OccasionCategoryEnum, OccasionStatusEnum as OccasionStatusEnum, FetchEnum, LoadingStatusEnum, MonthEnum, ParticipantCreateSchema, ParticipantSchema, WeekdayEnum } from "@/helpers/schema";
import { z } from "zod";

export type Participant = z.infer<typeof ParticipantSchema>;

export type CreateParticipant = z.infer<typeof ParticipantCreateSchema>;

export type OccasionCategory = z.infer<typeof OccasionCategoryEnum>;

export type Weekday = z.infer<typeof WeekdayEnum>

export type Month = z.infer<typeof MonthEnum>

export type OccasionStatus = z.infer<typeof OccasionStatusEnum>

export type LoadingStatus = z.infer<typeof LoadingStatusEnum>

export type Fetch = z.infer<typeof FetchEnum>
