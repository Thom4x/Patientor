import { z } from 'zod';

export type Gender = "male" | "female" | "other";

export interface DiagnosticPatient {
    code: string;
    name: string;
    latin?: string;
}

export const zodPatients = z.object({
    name: z.string(),
    dateOfBirth: z.iso.date(),
    ssn: z.string(),
    gender: z.enum(["male", "female", "other"]),
    occupation: z.string()
});

export type NewPatientEntry = z.infer<typeof zodPatients>;

export interface PatientEntry extends NewPatientEntry {
    id: string;
}


export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string
    gender: Gender,
    occupation: string

};

export type nonSensitiveContent = Omit<Patient, "ssn">;
// export type NewPatientEntry = Omit<Patient, 'id'>;
