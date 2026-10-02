import express from 'express';
import PingRouter from "./controllers/ping.ts";
const app = express();
app.use(express.json());
app.use('/api', PingRouter);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
