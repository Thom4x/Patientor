export type Gender = "male" | "female" | "other";

export interface DiagnosticPatient {
    code: string;
    name: string;
    latin?: string;
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
export type NewPatientEntry = Omit<Patient, 'id'>;
