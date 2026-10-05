import diagnosisList from '../data/diagnoses.ts';
import patientData from '../data/patients.ts';
import type { DiagnosticPatient, nonSensitiveContent, Patient, NewPatientEntry } from '../types/type.ts';
import { v4 as uuidv4 } from 'uuid';

const patients = patientData;

const getDiagnosis = (): DiagnosticPatient[] => {
    return diagnosisList;
};

const getPatientsNonSensitive = (): nonSensitiveContent[] => {
    const nonSensitiveData = patients.map(({ ssn, ...patientData }) => patientData);
    return nonSensitiveData;
};

// const getById = (id: string): Patient | undefined => {
//     const mappedData = patientData.find(u => u.id === id);
//     return mappedData;
// };

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
    getPatientsNonSensitive,
    postPatients
};
