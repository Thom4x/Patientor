import express from 'express';
import cors from 'cors';
import PingRouter from "./controllers/ping.ts";
import diagnosisRouter from './controllers/diaries.ts';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', PingRouter);
app.use('/api/diagnoses', diagnosisRouter);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});