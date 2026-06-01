import { z } from "zod";

// Highly Scalable Enterprise User Signup Request Validation Schema Data Pipeline
export const registerSchema = z.object({
  email: z.string().email({
    message:
      "Provided input format value must be a valid email string address!",
  }),

  phone: z
    .string()
    .min(10, {
      message:
        "Phone string pattern tracking constraints validation requires minimum 10 digits!",
    })
    .max(20, {
      message:
        "Phone string length boundary constraint thresholds maximum bounds limit error!",
    }),

  password: z
    .string()
    .min(8, {
      message:
        "Security protocol compliance rules mandate password sequence array limit boundary must cross minimum 8 characters string length threshold data bounds!",
    })
    .max(255, {
      message:
        "Password maximum character limit restrictions exceeded bounds threshold!",
    }),

  firstName: z.string().max(100).optional(),
  lastName: z.string().max(100).optional(),
});
