import * as z from "zod";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageURL?: string;
}

export const UserSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email"),
  imageURL: z.string().optional(),
});
