import z from "zod";

export const UserSchema = z.object({
    firstname: z.string()
        .min(1, "Firstname is required"),
    lastname: z.string()
        .min(1, "Lastname is required"),
    email: z.string()
        .email("Invalid email address"),
});

export type UserFormData = z.infer<typeof UserSchema>;