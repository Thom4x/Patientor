import diagnosisList from '../data/diagnoses.ts';
import patientData from '../data/patients.ts';
import type { Diagnosis, NonSensitivePatient, Patient, PatientEntry, EntryWithoutId } from '../types/type.ts';
import { v4 as uuidv4 } from 'uuid';

const patients = patientData;

const getDiagnosis = (): Diagnosis[] => {
    return diagnosisList;
};

const getOnlyPatient = (id: string): Patient | undefined => {
    const patientFind = patients.find(pt => pt.id === id);
    return patientFind;
};

const postByIdEntryes = (id: string, object: EntryWithoutId): Patient | undefined => {
    const patientFind = patients.find(pt => pt.id === id);
    if (!patientFind) {
        return undefined;
    }

    const newEntry = {
        id: uuidv4(),
        ...object
    };
    if (!patientFind.entries) {
        patientFind.entries = [];
    }
    patientFind.entries.push(newEntry);
    return patientFind;
};


const getNormalPatients = (): Patient[] => {
    return patients;
};

const getPatientsNonSensitive = (): NonSensitivePatient[] => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const nonSensitiveData = patients.map(({ ssn, ...patientData }) => patientData);
    return nonSensitiveData;
};

const postPatients = (args: PatientEntry): Patient => {
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
    getNormalPatients,
    postByIdEntryes
};
