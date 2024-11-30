import { z } from "zod";
import { FetchEnum, hookOccasionReturnSchema, hookTemplateReturnSchema, LoadingStatusEnum } from "../helpers/schema";

export type hookOccasionReturn = z.infer<typeof hookOccasionReturnSchema>
export type hookTemplateReturn = z.infer<typeof hookTemplateReturnSchema>
export type LoadingStatus = z.infer<typeof LoadingStatusEnum>
export type Fetch = z.infer<typeof FetchEnum>