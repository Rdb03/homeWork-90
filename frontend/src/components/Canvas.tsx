import "../styles/canvas.scss"
import {useEffect, useRef, useState} from "react";
import canvasState from "../store/canvasState.ts";
import {observer} from "mobx-react-lite";
import toolState from "../store/toolState.ts";
import Brush from "../tools/Brush";
import {Button, Modal} from "react-bootstrap";
import {useParams} from "react-router-dom";
import Rect from "../tools/Rect.ts";

const Canvas = observer(() => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const [modal, setModal] = useState(true);
    const params = useParams();

    useEffect(() => {
        if (canvasState) {
            canvasState.setCanvas(canvasRef.current!);
        }
    }, []);



    useEffect( () => {
        if (canvasState.username) {
            const socket = new WebSocket(`ws://localhost:8000/paint`);
            canvasState.setSocket(socket);
            canvasState.setSessionId(params.id);
            toolState.setTool(new Brush(canvasRef.current!, socket, params.id));
            socket.onopen = () => {
                socket.send(JSON.stringify({
                    id: params.id,
                    username: canvasState.username,
                    method: "connection"
                }));
            }
            socket.onmessage = (event) => {
                try {
                    let msg = JSON.parse(event.data);
                    console.log(msg);
                    switch (msg.method) {
                        case "message":
                            console.log(`пользователь ${msg.username} присоединился`);
                            break;
                        case "draw":
                            drawHandler(msg);
                            break;
                    }
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                }
            };
        }
    }, [canvasState.username]);


    const drawHandler = (msg: any) => {
        const figure = msg.figure
        const ctx = canvasRef.current!.getContext('2d')
        switch (figure.type) {
            case "brush":
                Brush.draw(ctx, figure.x, figure.y)
                break
            case "rect":
                Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color)
                break
            case "finish":
                ctx!.beginPath()
                break
        }
    };


    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current!.toDataURL())
    }

    const connectionHandler = () => {
        canvasState.setUsername(usernameRef.current!.value);
        setModal(false);
    }

    return (
        <div className="canvas">
            <Modal show={modal} onHide={() => {}}>
                <Modal.Header closeButton>
                    <Modal.Title>Ведите ваше имя</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" ref={usernameRef}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => connectionHandler()}>
                        Войти
                    </Button>
                </Modal.Footer>
            </Modal>
            <canvas onMouseDown={() => mouseDownHandler()} ref={canvasRef} width={600} height={400}/>
        </div>
    );
});

export default Canvas;