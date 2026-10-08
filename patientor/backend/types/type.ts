export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}


interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>
}



const HealthCheckRating = {
    Healthy: 0,
    LowRisk: 1,
    HighRisk: 2,
    CriticalRisk: 3,
} as const;

type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare",
    employerName: string,
    sickLeave?: {
        startDate: string,
        endDate: string
    }
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital",
    discharge: {
        date: string,
        criteria: string
    }
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

// ---------------------------------------------------

export type genderOption = "male" | "female" | "other";

export interface PatientEntry {
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: genderOption;
    occupation: string;
    entries?: Entry[];
}

// Tipos inferidos 
//export type NewPatientEntry = z.infer<typeof NewPatientSchema>;
//export type Gender = z.infer<typeof NewPatientSchema.shape.gender>;

export interface Patient extends PatientEntry {
    id: string;
}

export type NonSensitivePatient = Omit<Patient, "ssn">;

