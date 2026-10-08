import { type Request, type Response, type NextFunction } from 'express';
import { z } from 'zod';

const baseEntrySchema = z.object({
    id: z.string().uuid(),
    description: z.string(),
    date: z.iso.date(),
    specialist: z.string(),
    diagnosisCodes: z.array(z.string()).optional()
});

const entrySchema = z.discriminatedUnion('type', [
    baseEntrySchema.extend({
        type: z.literal('Hospital'),
        discharge: z.object({
            date: z.iso.date(),
            criteria: z.string()
        })
    }),
    baseEntrySchema.extend({
        type: z.literal('OccupationalHealthcare'),
        employerName: z.string(),
        sickLeave: z.object({
            startDate: z.iso.date(),
            endDate: z.iso.date()
        }).optional()
    }),
    baseEntrySchema.extend({
        type: z.literal('HealthCheck'),
        healthCheckRating: z.number().int().min(0).max(3)
    })
]);

const newPatientSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string(),
    dateOfBirth: z.string(),
    ssn: z.string(),
    gender: z.enum(['male', 'female', 'other']),
    occupation: z.string(),
    entries: z.array(entrySchema)
});

export const patientDataSchema = z.array(newPatientSchema);

export const newPatientValidator = (req: Request, _res: Response, next: NextFunction) => {
    try {
        newPatientSchema.parse(patientDataSchema);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

export const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues.map(i => i.message + ' at Parameter ' + i.path.join('. ')).join(', ') });
    } else {
        next(error);
    }
};