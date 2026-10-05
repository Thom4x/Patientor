import express, { type Response } from 'express';
import getService from '../services/patientService.ts';
import type { DiagnosticPatient, nonSensitiveContent } from '../types/type.ts';

const patientsRouter = express.Router();

patientsRouter.get('/diagnoses', (_req, res: Response<DiagnosticPatient[]>) => {
    const data = getService.getDiagnosis();
    res.send(data);
});

patientsRouter.get('/patients', (_req, res: Response<nonSensitiveContent[]>) => {
    const data = getService.getPatientsNonSensitive();
    res.send(data);
});

export default patientsRouter;