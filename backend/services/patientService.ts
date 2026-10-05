import diagnosisList from '../data/diagnoses.ts';
import patientData from '../data/patients.ts';
import type { DiagnosticPatient, nonSensitiveContent } from '../types/type.ts';

const getDiagnosis = (): DiagnosticPatient[] => {
    return diagnosisList;
};

const getPatientsNonSensitive = (): nonSensitiveContent[] => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const nonSensitiveData = patientData.map(({ ssn, ...patientData }) => patientData);
    return nonSensitiveData;
};



export default {
    getDiagnosis,
    getPatientsNonSensitive
};
