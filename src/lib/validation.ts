import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const UserProfileSchema = z.object({
  email: z.string().email("Email is not correct"),
  firstName: z.string().min(1, { message: "First name is required" }).max(50, "First name must be at most 50 characters"),
  lastName: z.string().min(1, { message: "Last name is required" }).max(50, "Last name must be at most 50 characters"),
  avatarUrl: z.string().url("Avatar URL must be a valid URL").optional().or(z.literal("")),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\+\d{10,15}$/.test(val), { message: "Phone number must be in international format (e.g. +1234567890)" }),
  address: z.string().max(200, "Address must be at most 200 characters").optional().or(z.literal("")),
  dateOfBirth: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{4}-\d{2}-\d{2}$/.test(val), { message: "Date of birth must be in YYYY-MM-DD format" })
});

export type UserProfileType = z.infer<typeof UserProfileSchema>;

export const validateUserProfile = (data: UserProfileType): string[] => {
  try {
    UserProfileSchema.parse(data);
    return [];
  } catch (err) {
    if (err instanceof z.ZodError) {
      return err.errors.map((error) => `${error.path[0]}: ${error.message}`);
    }
    return ["Unknown validation error"];
  }
};
