import { z } from "zod";

export const registrationSchema = z.object({
  full_name: z.string().min(3),

  email: z.string().email(),

  enrollment_number: z.string().min(5),

  whatsapp_number: z
    .string()
    .regex(/^[6-9]\d{9}$/),

  gender: z.string(),

  transaction_id: z.string().min(3),

  payment_sender_name: z.string().min(2),
});

export type RegistrationType =
  z.infer<typeof registrationSchema>;