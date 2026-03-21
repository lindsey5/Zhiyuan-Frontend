import z from "zod";

export const UserSchema = z.object({
    firstname: z.string()
        .min(1, "Firstname is required")
        .max(50, "Firstname must not exceed 50 characters"),

    lastname: z.string()
        .min(1, "Lastname is required")
        .max(50, "Lastname must not exceed 50 characters"),

    email: z.string()
        .min(1, "Email is required")
        .email("Invalid email address")
        .max(100, "Email must not exceed 100 characters"),
});

export type UserFormData = z.infer<typeof UserSchema>;