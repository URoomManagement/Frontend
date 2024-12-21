import * as z from "zod";

export const reservationSchema = z.object({
  purpose: z
    .string()
    .min(1, "Purpose is required")
    .max(100, "Purpose must not exceed 100 characters"),
  date: z.object({
    from: z.date({ required_error: "Start date is required" }),
    to: z.date({ required_error: "End date is required" }),
  }).refine((data) => data.to > data.from, {
    message: "End date must be after start date",
    path: ["to"],
  }),
});

export type ReservationFormData = z.infer<typeof reservationSchema>;
