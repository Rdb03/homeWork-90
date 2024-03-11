import express from 'express';
import expressWs from 'express-ws';
import cors from 'cors';
import {ActiveConnections} from "./types";

const app = express();
expressWs(app);
const port = 8000;

app.use(cors());
const router = express.Router();

router.ws('/chat',  (ws, req) => {
    const id = crypto.randomUUID();
    console.log('client connected! id=', id);
    activeConnections[id] = ws;



    ws.on('close', () => {
        console.log('client disconnected! id=', id);
        delete activeConnections[id];
    });
});

const activeConnections: ActiveConnections = {};


app.use(router);
app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
});