import * as z from 'zod'

export const RegisterFormSchema = z.object({
  name: z
    .string()
    .min(3, 'Full Name must be at least 3 characters!')
    .max(50, 'Full Name must be up to 50 characters!'),
  email: z.string().email('Invalid email address!'),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid phone number'),
  birthDate: z.date().optional(),
  gender: z.custom<Gender>().optional(),
  address: z.string(),
  occupation: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactNumber: z.string().optional(),
  primaryPhysician: z.string().optional(),
  insuranceProvider: z.string().optional(),
  insurancePolicyNumber: z.string().optional(),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom().optional(),
  privacyConsent: z.boolean(),
})
