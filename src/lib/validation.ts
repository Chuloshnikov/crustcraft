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


// Menu Item Validation

const SizeOptionSchema = z.object({
  name: z.string().min(1, "Size name is required"),
  price: z.number().min(0, "Price must be positive"),
});


const ExtraIngredientSchema = z.object({
  name: z.string().min(1, "Ingredient name is required"),
  price: z.number().min(0, "Price must be positive"),
});


export const MenuItemSchema = z.object({
  image: z.string().url("Invalid image URL").nullable(),
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  description: z.string().min(1, "Description is required").max(500, "Description is too long"),
  basePrice: z.number().min(0.01, "Price must be at least 0.01"),
  category: z.string().min(1, "Category is required"),
  sizes: z.array(SizeOptionSchema).optional(),
  extraIngredients: z.array(ExtraIngredientSchema).optional(),
});

export const AddressSchema = z.object({
  phone: z
    .string()
    .refine((val) => !val || /^\+\d{10,15}$/.test(val), {
      message: "Phone must be in international format (e.g. +1234567890)",
    }),
  streetAddress: z.string().min(1, "Street address is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
});

export type AddressFields = z.infer<typeof AddressSchema>;

export const validateAddress = (data: AddressFields): Partial<Record<keyof AddressFields, string>> => {
  try {
    AddressSchema.parse(data);
    return {};
  } catch (err) {
    if (err instanceof z.ZodError) {
      const fieldErrors: Partial<Record<keyof AddressFields, string>> = {};
      err.errors.forEach((e) => {
        const field = e.path[0] as keyof AddressFields;
        fieldErrors[field] = e.message;
      });
      return fieldErrors;
    }
    return { phone: "Unknown error" }; // fallback
  }
};


export const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(/^\+?[\d\s\-()]{10,20}$/, "Please enter a valid phone number").optional().or(z.literal("")),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
  newsletter: z.boolean().default(false),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

export type FormErrors = {
  [K in keyof ContactFormValues]?: string[]
}

export type MenuItemFormData = z.infer<typeof MenuItemSchema>;