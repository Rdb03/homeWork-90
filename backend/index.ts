import express from 'express';
import expressWs from 'express-ws';
import cors from 'cors';

const app = express();
const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss();
expressWs(app);
const port = 8000;

app.use(cors());
const router = express.Router();

router.ws('/paint', (ws, _req) => {
    ws.on('message', (msg: string) => {
        try {
            const parsedMsg = JSON.parse(msg);
            console.log('Received message:', parsedMsg)
            switch (parsedMsg.method) {
                case "connection":
                    connectionHandler(ws, parsedMsg);
                    break;
                case "draw":
                    broadcastConnection(ws, parsedMsg);
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error("Error parsing message:", error);
        }
    });
});

app.use(router);
app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
});

const connectionHandler = (ws: any, msg: any) => {
    ws.id = msg.id;
    broadcastConnection(ws, msg);
}

const broadcastConnection = (ws: any, msg: any) => {
    aWss.clients.forEach((client: any) => {
        if (client.id === msg.id) {
            client.send(JSON.stringify(msg));
        }
    });
}
