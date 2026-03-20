import * as z from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(1, "Email is required")
    .min(3, "Email must be at least 3 characters"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;