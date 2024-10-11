import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Invalid Email Address").trim().min(1, "Email is required"),
    password: z.string().min(1, "Password must be at least 8 characters"),
})

export const registerSchema = z.object({
    email: z.string().email("Invalid Email Address").trim().min(1, "Email is required"),
    password: z.string().min(1, "Password must be at least 8 characters"),
    name: z.string().min(1, "Name is required"),
})