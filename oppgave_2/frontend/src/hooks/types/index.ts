import { z } from "zod";
import { FetchEnum, occasionHookReturnSchema, templateHookReturnSchema, StatusEnum } from "../helpers/schema";
import { WeekdayEnum } from "@/helpers/schema";

export type OccasionHookReturn = z.infer<typeof occasionHookReturnSchema>
export type templateHookReturn = z.infer<typeof templateHookReturnSchema>
export type Status = z.infer<typeof StatusEnum>
export type Fetch = z.infer<typeof FetchEnum>
