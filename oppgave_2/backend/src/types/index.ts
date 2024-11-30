import { MonthEnum, OccasionCategoryEnum, OccasionStatusEnum, ParticipantCreateSchema, ParticipantSchema, WeekdayEnum } from "@/helpers/schema";
import { z } from "zod";
import type { StatusCode } from "hono/utils/http-status";
import { Context } from "hono";

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

//Type tatt fra https://github.com/mariuswallin/hiof-webapp-2024/blob/main/v5-next/backend/src/lib/error.ts
const Errors = z.enum([
  "BAD_REQUEST",
  "FORBIDDEN",
  "INTERNAL_SERVER_ERROR",
  "NOT_FOUND",
  "NOT_UNIQUE",
  "RATE_LIMITED",
  "UNAUTHORIZED",
  "METHOD_NOT_ALLOWED",
]);



export type ErrorCode = z.infer<typeof Errors>;


export type Result<T> = Success<T> | Failure;


/* Types */

export type Participant = z.infer<typeof ParticipantSchema>;

export type CreateParticipant = z.infer<typeof ParticipantCreateSchema>;

export type OccasionCategory = z.infer<typeof OccasionCategoryEnum>;

export type Weekday = z.infer<typeof WeekdayEnum>

export type Month = z.infer<typeof MonthEnum>

export type OccasionStatus = z.infer<typeof OccasionStatusEnum>



