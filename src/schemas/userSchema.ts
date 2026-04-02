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

export const CreateUserSchema = z.object({
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
    
    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .max(100, "Password must not exceed 100 characters"),

    confirmPassword: z.string()
        .min(1, "Confirm password is required"),

    role_id: z.string().min(1, "Role is required")
})
.superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  }
});

export type CreateUserFormData = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = z.object({
    firstname: z.string().min(1, "Firstname is required").max(50),

    lastname: z.string().min(1, "Lastname is required").max(50),

    email: z.string().min(1, "Email is required").email().max(100),

    password: z
        .string()
        .transform((val) => (val === "" ? undefined : val))
        .optional()
        .refine((val) => !val || val.length >= 6, {
        message: "Password must be at least 6 characters",
        }),

    confirmPassword: z
        .string()
        .transform((val) => (val === "" ? undefined : val))
        .optional(),

    role_id: z.string().min(1, "Role is required"),
})
.superRefine((data, ctx) => {
    if (data.password || data.confirmPassword) {
        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Passwords do not match",
                path: ["confirmPassword"],
            });
        }
    }
});

export type UpdateUserFormData = z.infer<typeof UpdateUserSchema>;