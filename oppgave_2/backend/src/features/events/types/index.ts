
import { z } from "zod";
import { OccassionSchema, OccationCreateSchema } from "../helpers/schema";

export type Occation = z.infer<typeof OccassionSchema>;

export type CreateOccation = z.infer<typeof OccationCreateSchema>;
