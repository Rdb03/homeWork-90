import {makeAutoObservable} from "mobx";
import Tool from "../tools/Tool.ts";

class ToolState {
    tool: Tool | null = null
    constructor() {
        makeAutoObservable(this)
    }

    setTool(tool: Tool) {
        this.tool = tool
    }

    setFillColor(color: string | CanvasGradient | CanvasPattern) {
        this.tool!.fillColor = color
    }
    setStrokeColor(color: string | CanvasGradient | CanvasPattern) {
        this.tool!.strokeColor = color
    }
    setLineWidth(width: string | number) {
        if (typeof width === 'number') {
            this.tool!.lineWidth = width;
        } else {
            this.tool!.lineWidth = parseFloat(width);
        }
    }
}

export default new ToolState();