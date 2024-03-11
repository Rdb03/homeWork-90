import "../styles/canvas.scss"
import {useEffect, useRef} from "react";
import canvasState from "../store/canvasState.ts";
import {observer} from "mobx-react-lite";
import toolState from "../store/toolState.ts";
import Brush from "../tools/Brush";

const Canvas = observer(() => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasState) {
            canvasState.setCanvas(canvasRef.current!);
            toolState.setTool(new Brush(canvasRef.current!))
        }
    }, []);

    return (
        <div className="canvas">
            <canvas ref={canvasRef} width={600} height={400}/>
        </div>
    );
});

export default Canvas;