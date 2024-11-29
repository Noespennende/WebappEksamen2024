import { z } from "zod";
import { adminParticipantActionEnum, OcasionCreateSchema, OccasionSchema, participantStatusEnum } from "../helpers/schema";
import { participantAprovalStatusEnum } from "@/helpers/schema";


export type Occasion = z.infer<typeof OccasionSchema>;

export type CreateOccation = z.infer<typeof OcasionCreateSchema>;

export type adminParticipantAction = z.infer<typeof adminParticipantActionEnum>

export type participantStatus = z.infer<typeof participantStatusEnum>

export type participantApprovalStatus = z.infer<typeof participantAprovalStatusEnum>

