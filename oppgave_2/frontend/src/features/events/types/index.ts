import { z } from "zod";
import { EventCreateSchema, OccasionSchema } from "../helpers/schema";


export type Occasion = z.infer<typeof OccasionSchema>;

export type CreateEvent = z.infer<typeof EventCreateSchema>;