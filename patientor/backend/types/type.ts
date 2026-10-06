import { z } from 'zod';

// 1. Array constante: Usamos camelCase. 
const genderOptions = ["male", "female", "other"] as const;

export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.enum(genderOptions),
    occupation: z.string()
});

// 3. Tipos inferidos (PascalCase)
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