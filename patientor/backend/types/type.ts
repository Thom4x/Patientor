import { z } from "zod";

export const diagnosisSchema = z.object({
    code: z.string(),
    name: z.string(),
    latin: z.string().optional()
});

export type Diagnosis = z.infer<typeof diagnosisSchema>;

export const BaseEntrySchema = z.object({
    description: z.string(),
    date: z.iso.date(),
    specialist: z.string(),
    diagnosisCodes: z.array(diagnosisSchema.shape.code).optional()
});

const HealthCheckRating = {
    Healthy: 0,
    LowRisk: 1,
    HighRisk: 2,
    CriticalRisk: 3,
} as const;

export const HealthCheckRatingSchema = z.union([
    z.literal(HealthCheckRating.Healthy),
    z.literal(HealthCheckRating.LowRisk),
    z.literal(HealthCheckRating.HighRisk),
    z.literal(HealthCheckRating.CriticalRisk),
]);

const HealthCheckEntry =
    BaseEntrySchema.extend({
        type: z.literal("HealthCheck"),
        healthCheckRating: HealthCheckRatingSchema
    });

const OccupationalHealthcareEntry =
    BaseEntrySchema.extend({
        type: z.literal("OccupationalHealthcare"),
        employerName: z.string(),
        sickLeave: z.object({
            startDate: z.iso.date(),
            endDate: z.iso.date()
        }).optional()
    });

const HospitalEntry =
    BaseEntrySchema.extend({
        type: z.literal("Hospital"),
        discharge: z.object({
            date: z.iso.date(),
            criteria: z.string()
        })
    });

export const EntrySchema = z.discriminatedUnion('type', [
    HealthCheckEntry,
    OccupationalHealthcareEntry,
    HospitalEntry
]);

// Inferimos el type completo : Entry con id
export type Entry = z.infer<typeof EntrySchema>;

// Inferimos el type completo : Entry sin id
export const EntryWithoutIdSchema = EntrySchema;
export type EntryWithoutId = z.infer<typeof EntryWithoutIdSchema>;

export const EntrySchemaById = z.intersection(
    EntrySchema,
    z.object({ id: z.string() })
);



// ---------------------------------------------------

export const GenderOptionSchema = z.enum(["male", "female", "other"]);
export type GenderOption = z.infer<typeof GenderOptionSchema>;

export const PatientEntrySchema = z.object({
    name: z.string(),
    dateOfBirth: z.iso.date(),
    ssn: z.string(),
    gender: GenderOptionSchema,
    occupation: z.string(),
    entries: z.array(EntrySchemaById).optional()
});

export type PatientEntry = z.infer<typeof PatientEntrySchema>;

// Tipos inferidos 
//export type Gender = z.infer<typeof PatientEntrySchema.shape.gender>;

const Patient =
    PatientEntrySchema.extend({
        id: z.string()
    });

export type Patient = z.infer<typeof Patient>;


export const PatientWithoutSsn = Patient.omit({
    ssn: true,
});

export type NonSensitivePatient = z.infer<typeof PatientWithoutSsn>;

