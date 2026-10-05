/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express, { type Response } from 'express';
import getService from '../services/patientService.ts';
import type { DiagnosticPatient, nonSensitiveContent } from '../types/type.ts';
import newPatientValidator from '../utils/middleware.ts';

const patientsRouter = express.Router();

patientsRouter.get('/diagnoses', (_req, res: Response<DiagnosticPatient[]>) => {
    const data = getService.getDiagnosis();
    res.send(data);
});

patientsRouter.get('/patients', (_req, res: Response<nonSensitiveContent[]>) => {
    const data = getService.getPatientsNonSensitive();
    res.send(data);
});

patientsRouter.post('/patients', (req, res) => {
    console.log('ESTO TENEMOS', req.body);

    try {
        console.log('ESTO TENEMOS', req.body);
        const validatedNewPatient = newPatientValidator(req.body);
        const addedPatient = getService.postPatients(validatedNewPatient);
        res.send(addedPatient);
    } catch (error) {
        let errorMessage: string = '';
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        res.status(400).send(errorMessage);
    }
});


export default patientsRouter;