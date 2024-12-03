import { z } from "zod";
import { adminParticipantActionEnum, OccassionSchema, OccationCreateSchema, participantStatusEnum } from "../helpers/schema";
import { participantAprovalStatusEnum } from "@/helpers/schema";


export type Occasion = z.infer<typeof OccassionSchema>;

export type CreateOccation = z.infer<typeof OccationCreateSchema>;

export type adminParticipantAction = z.infer<typeof adminParticipantActionEnum>

export type participantStatus = z.infer<typeof participantStatusEnum>

export type participantApprovalStatus = z.infer<typeof participantAprovalStatusEnum>

