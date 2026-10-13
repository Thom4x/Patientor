import { type Request, type Response, type NextFunction } from 'express';
import { PatientEntrySchema, EntryWithoutIdSchema } from '../types/type.ts';
import { z } from 'zod';


export const newPatientValidator = (req: Request, _res: Response, next: NextFunction) => {
    try {
        req.body = PatientEntrySchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

export const newEntriesValidator = (req: Request, _res: Response, next: NextFunction) => {
    try {
        req.body = EntryWithoutIdSchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

export const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues.map(issue => issue.path.join('.') + ': ' + issue.message) });
    } else {
        next(error);
    }
};