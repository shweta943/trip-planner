import { z } from "zod";

export const preferencesSchema = z.object({
  interests: z.array(z.string()).min(1, "Select at least one interest"),
  vibe: z.string().min(1, "Select a vibe"),
});
