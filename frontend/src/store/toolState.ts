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
}

export default new ToolState();