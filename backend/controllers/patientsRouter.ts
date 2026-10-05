/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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

patientsRouter.post('/patients', (req, res: Response<nonSensitiveContent>) => {
    const { name, dateOfBirth, gender, occupation, ssn } = req.body;
    const newData = getService.postPatients({
        name,
        dateOfBirth,
        gender,
        occupation,
        ssn,
    });
    //getService.postPatients(newData);
    //console.log('newData', newData);
    res.send(newData);
});


export default patientsRouter;