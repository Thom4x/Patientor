import express, { type Response } from 'express';
import getService from '../services/diaryService.ts';
import type { DiagnosticPatient } from '../types/type.ts';

const diagnosisRouter = express.Router();

diagnosisRouter.get('/', (_req, res: Response<DiagnosticPatient[]>) => {
    const data = getService.getDiagnosis();
    res.send(data);
});


export default diagnosisRouter;