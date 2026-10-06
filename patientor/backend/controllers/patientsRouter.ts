import express, { type Request, type Response } from 'express';
import getService from '../services/patientService.ts';
import type { Diagnosis, NonSensitivePatient, Patient, NewPatientEntry } from '../types/type.ts';
import { newPatientParser, errorMiddleware } from '../utils/middleware.ts';

const patientsRouter = express.Router();

patientsRouter.get('/diagnoses', (_req, res: Response<Diagnosis[]>) => {
    const data = getService.getDiagnosis();
    res.send(data);
});

patientsRouter.get('/patients', (_req, res: Response<NonSensitivePatient[]>) => {
    const data = getService.getPatientsNonSensitive();
    res.send(data);
});

patientsRouter.post('/patients', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedPatient = getService.postPatients(req.body);
    res.send(addedPatient);

});

patientsRouter.use(errorMiddleware);

export default patientsRouter;