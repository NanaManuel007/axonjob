import { z } from 'zod';

export const clientSchema = z.object({
    companyName: z.string().min(1, 'Company name is required'),
    ceoFirstName: z.string().min(1, 'CEO first name is required'),
    ceoLastName: z.string().min(1, 'CEO last name is required'),
    jobTitle: z.string().optional(),
    companyEmail: z.string().email('Invalid email address'),
    companyNumber: z.string().min(10, 'Phone number must be at least 10 digits').max(10),
    companyAddress: z.string().min(1, 'Company address is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
    registrationNumber: z.string().min(1, 'Registration number is required'),
    website: z.string().url('Invalid website URL').optional().or(z.literal('')),
    linkedin: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
    latitude: z.string().optional(),
    longitude: z.string().optional(),
    mapsLocation: z.string().min(1, 'Location is required'),
});

export type ClientFormData = z.infer<typeof clientSchema>;