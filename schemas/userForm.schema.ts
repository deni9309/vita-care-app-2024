import * as z from 'zod'

export const UserFormSchema = z.object({
  name: z.string()
    .min(3, 'Full Name must be at least 3 characters!')
    .max(50, 'Full Name must be up to 50 characters!'),
  email: z.string()
    .email('Invalid email address!'),
  phone: z.string()
    .refine(phone => /^\+?[1-9]\d{1,14$/.test(phone), {}),
})
