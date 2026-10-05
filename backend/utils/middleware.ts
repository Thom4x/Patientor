import { type Request, type Response, type NextFunction } from 'express';
import { zodPatients } from '../types/type.ts';
import { z } from 'zod';

export const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        zodPatients.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

export const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues.map(i => i.message + ' at Parameter ' + i.path.join('. ')).join(', ') });
    } else {
        next(error);
    }
};
