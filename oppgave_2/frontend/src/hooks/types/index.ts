import { z } from "zod";
import { hookReturnSchema } from "../helpers/schema";

export type hookReturn = z.infer<typeof hookReturnSchema>