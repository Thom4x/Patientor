import express from 'express';
const PingRouter = express.Router();
PingRouter.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});
export default PingRouter;
