import { EventCategoryEnum, EventStatusEnum, MonthEnum, ParticipantCreateSchema, ParticipantSchema, WeekdayEnum } from "@/helpers/schema";
import { z } from "zod";

export type Participant = z.infer<typeof ParticipantSchema>;

export type CreateParticipant = z.infer<typeof ParticipantCreateSchema>;

export type EventCategory = z.infer<typeof EventCategoryEnum>;

export type Weekday = z.infer<typeof WeekdayEnum>

export type Month = z.infer<typeof MonthEnum>

export type EventStatus = z.infer<typeof EventStatusEnum>