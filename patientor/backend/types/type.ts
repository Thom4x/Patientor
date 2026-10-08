import { z } from 'zod';

const genderOptions = ["male", "female", "other"] as const;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const EntrySchema = z.object({});

export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.enum(genderOptions),
    occupation: z.string(),
    entries: z.array(EntrySchema)
});

// Tipos inferidos 
export type NewPatientEntry = z.infer<typeof NewPatientSchema>;
export type Gender = z.infer<typeof NewPatientSchema.shape.gender>;

export interface Patient extends NewPatientEntry {
    id: string;
}

export type NonSensitivePatient = Omit<Patient, "ssn">;

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}