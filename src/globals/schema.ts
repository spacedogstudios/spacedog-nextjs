import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  email: z.email("Please enter a valid email address").max(254),
  message: z
    .string()
    .trim()
    .min(2, "Message must be at least 2 characters")
    .max(5000, "Message must be at most 5000 characters"),
  // Honeypot: hidden from people, so only bots fill it in.
  website: z.string().max(200).optional(),
});

export type TContactSchema = z.infer<typeof contactSchema>;

export type ContactResponse = {
  success?: boolean;
  errors?: Partial<Record<keyof TContactSchema | "root", { message: string }>>;
};
