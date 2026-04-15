import { z } from "zod";

export const preferencesSchema = z.object({
  interests: z.array(z.string()).optional(),
  vibe: z.string().optional()
});
