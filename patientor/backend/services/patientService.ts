import diagnosisList from '../data/diagnoses.ts';
import patientData from '../data/patients.ts';
import type { Diagnosis, NonSensitivePatient, Patient, NewPatientEntry } from '../types/type.ts';
import { v4 as uuidv4 } from 'uuid';

const patients = patientData;

const getDiagnosis = (): Diagnosis[] => {
    return diagnosisList;
};

const getOnlyPatient = (id: string): Patient | undefined => {
    const patientFind = patients.find(pt => pt.id === id);
    return patientFind;
};

const getNormalPatients = (): Patient[] => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return patients;
};

const getPatientsNonSensitive = (): NonSensitivePatient[] => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const nonSensitiveData = patients.map(({ ssn, ...patientData }) => patientData);
    return nonSensitiveData;
};

const postPatients = (args: NewPatientEntry): Patient => {
    const randomId = uuidv4();
    const newPatientEntry: Patient = {
        id: randomId,
        ...args
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};


export default {
    getDiagnosis,
    getOnlyPatient,
    getPatientsNonSensitive,
    postPatients,
    getNormalPatients
};
