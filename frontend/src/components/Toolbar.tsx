import '../styles/toolbar.scss';
import toolState from "../store/toolState.ts";
import Brush from "../tools/Brush.ts";
import canvasState from "../store/canvasState.ts";
import Rect from "../tools/Rect.ts";
import Circle from "../tools/Circle.ts";
import Eraser from "../tools/Eraser.ts";
import Line from "../tools/Line.ts";
import React from "react";

const Toolbar = () => {

    const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        toolState.setStrokeColor(e.target.value);
        toolState.setFillColor(e.target.value);
    };

    return (
        <div className="toolbar">
            <button className="toolbar__btn brush" onClick={() => toolState.setTool(new Brush(canvasState.canvas!, canvasState.socket, canvasState.sessionid))}/>
            <button className="toolbar__btn rect" onClick={() => toolState.setTool(new Rect(canvasState.canvas!,canvasState.socket, canvasState.sessionid))}/>
            <button className="toolbar__btn circle" onClick={() => toolState.setTool(new Circle(canvasState.canvas!, canvasState.socket, canvasState.sessionid))}/>
            <button className="toolbar__btn eraser" onClick={() => toolState.setTool(new Eraser(canvasState.canvas!, canvasState.socket, canvasState.sessionid))}/>
            <button className="toolbar__btn line" onClick={() => toolState.setTool(new Line(canvasState.canvas!))}/>
            <input onChange={e => changeColor(e)}  style={{marginLeft:10}} type="color"/>
            <button className="toolbar__btn undo" onClick={() => canvasState.undo()}/>
            <button className="toolbar__btn redo" onClick={() => canvasState.redo()}/>
            <button className="toolbar__btn save"/>
        </div>
    );
};

export default Toolbar;