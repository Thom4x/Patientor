import diagnosisList from '../data/diagnoses.ts';
import type { DiagnosticPatient } from '../types/type.ts';

const getDiagnosis = (): DiagnosticPatient[] => {
    return diagnosisList;
};



export default {
    getDiagnosis
};