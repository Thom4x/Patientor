import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import PingRouter from "./controllers/ping.ts";
import patientsRouter from './controllers/patientsRouter.ts';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api', PingRouter);
app.use('/api', patientsRouter);

const PORT = 3000;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});