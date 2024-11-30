import { z } from "zod";
import { TemplateSchema } from "./services/helpers/schema";


export type Template = z.infer<typeof TemplateSchema>;

export type CreateTemplate = z.infer<typeof TemplateSchema>;