import { z } from "zod";
import { EventCreateSchema, EventSchema } from "../helpers/schema";


export type Event = z.infer<typeof EventSchema>;

export type CreateEvent = z.infer<typeof EventCreateSchema>;