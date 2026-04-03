import { z } from "zod";

export const basicDetailsSchema = z.object({
  destination: z.string().min(1, "Destination is required"),

  startDate: z.string().min(1, "Start date is required"),

  endDate: z.string().min(1, "End date is required"),

  travelers: z
    .number()
    .min(1, "At least 1 traveler required")
    .max(10, "Too many travelers"),

  tripType: z.enum(["solo", "couple", "family", "group"]),

  budget: z.number().min(1000, "Minimum budget is ₹1000").optional(),
});
