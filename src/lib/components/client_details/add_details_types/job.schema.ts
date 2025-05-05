import { z } from 'zod';
import { JobType, PaymentType } from '$houdini';

export const jobSchema = z.object({
    title: z.string().min(1, "Job title is required"),
    jobType: z.nativeEnum(JobType),
    temporaryType: z.string().optional(),
    paymentType: z.nativeEnum(PaymentType),
    paymentAmount: z.number().min(1, "Payment amount is required"),
    duties: z.array(z.string()).min(1).refine((duties) => duties[0].length > 0, {
        message: "At least one duty is required"
    }),
    requirements: z.array(z.string()),
    jobHours: z.string().min(1, "Job hours are required"),
    location: z.string().min(1, "Location is required"),
    published: z.boolean(),
    startDate: z.string().min(1, "Start date is required"),
    numberOfRoles: z.string().min(1, "Number of roles is required"),
    workingHours: z.object({
        sunday: z.object({ start: z.string(), end: z.string(), enabled: z.boolean() }),
        monday: z.object({ start: z.string(), end: z.string(), enabled: z.boolean() }),
        tuesday: z.object({ start: z.string(), end: z.string(), enabled: z.boolean() }),
        wednesday: z.object({ start: z.string(), end: z.string(), enabled: z.boolean() }),
        thursday: z.object({ start: z.string(), end: z.string(), enabled: z.boolean() }),
        friday: z.object({ start: z.string(), end: z.string(), enabled: z.boolean() }),
        saturday: z.object({ start: z.string(), end: z.string(), enabled: z.boolean() })
    }).optional()
});