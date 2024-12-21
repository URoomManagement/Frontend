import * as z from "zod"

// Common field schemas
const emailSchema = z.string()
  .email("Invalid email format")
  .min(1, "Email is required")

const passwordSchema = z.string()
  .min(6, "Password must be at least 6 characters")

const strongPasswordSchema = passwordSchema
  .min(6, "Password must be at least 6 characters")
  .max(32, "Password is too long")
  // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  // .regex(/[0-9]/, "Password must contain at least one number")
  // .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")

const usernameSchema = z.string()
  .min(1, "Username is required")
  .regex(/^[a-zA-Z]/, "Username must start with a letter")

// Form schemas
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema
})

export const userProfileSchema = z.object({
  name: usernameSchema,
  email: emailSchema,
  password: strongPasswordSchema
})

export const userUpdateSchema = z.object({
  email: emailSchema,
  name: usernameSchema
});

export const passwordUpdateSchema = z.object({
  currentPassword: z.string().min(6, "Password must be at least 6 characters"),
  newPassword: z.string().min(6, "Password must be at least 6 characters").max(32, "Password is too long"),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Type inference for our schemas
export type LoginFormData = z.infer<typeof loginSchema>
export type UserProfileData = z.infer<typeof userProfileSchema>
export type UserUpdateData = z.infer<typeof userUpdateSchema>;
export type PasswordUpdateData = z.infer<typeof passwordUpdateSchema>;