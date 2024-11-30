import { MonthEnum, OccasionCategoryEnum, OccasionStatusEnum, ParticipantCreateSchema, ParticipantSchema, WeekdayEnum } from "@/helpers/schema";
import { z } from "zod";

export type Success<T> = {
  success: true;
  data: T;
};

export type Failure = {
  success: false;
  error: {
    code: string;
    message: string;
  };
};

export type Result<T> = Success<T> | Failure;


/* Types */

export type Participant = z.infer<typeof ParticipantSchema>;

export type CreateParticipant = z.infer<typeof ParticipantCreateSchema>;

export type OccasionCategory = z.infer<typeof OccasionCategoryEnum>;

export type Weekday = z.infer<typeof WeekdayEnum>

export type Month = z.infer<typeof MonthEnum>

export type OccasionStatus = z.infer<typeof OccasionStatusEnum>



