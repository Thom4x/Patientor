import express, { type Request, type Response } from 'express';
import getService from '../services/patientService.ts';
import type { Diagnosis, NonSensitivePatient, Patient, PatientEntry, EntryWithoutId, Entry } from '../types/type.ts';
import { newEntriesValidator, newPatientValidator } from '../utils/middleware.ts';
import { z } from 'zod';

const idSchema = z.object({
    id: z.string()
});

const patientsRouter = express.Router();

patientsRouter.get('/diagnosis', (_req, res: Response<Diagnosis[]>) => {
    const data = getService.getDiagnosis();
    res.send(data);
});

patientsRouter.get('/patients/:id', (req: Request, res: Response<Patient | { error: string }>) => {

    const { id } = idSchema.parse(req.params);
    const patientById = getService.getOnlyPatient(id);

    if (patientById) {
        res.send(patientById);
    } else {
        res.status(404).send({ error: 'Patient not found' });
    }
});

patientsRouter.post('/patients/:id/entries', newEntriesValidator, (req: Request<unknown, unknown, EntryWithoutId>, res: Response<Entry>) => {
    const { id } = idSchema.parse(req.params);
    const addedPatient = getService.postByIdEntryes(id, req.body);
    res.send(addedPatient);

});

patientsRouter.get('/patients', (_req, res: Response<NonSensitivePatient[]>) => {
    const data = getService.getPatientsNonSensitive();
    res.send(data);
});

patientsRouter.post('/patients', newPatientValidator, (req: Request<unknown, unknown, PatientEntry>, res: Response<Patient>) => {
    const addedPatient = getService.postPatients(req.body);
    res.send(addedPatient);
});

export default patientsRouter;