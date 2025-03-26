import { z } from "zod";

export const registerSchema = z.object({
    displayName: z.string().min(1, {message: "Display name is required"}),
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6, {message: "Password must be at least 6 characters long"}),
});

export type RegisterSchema = z.infer<typeof registerSchema>;