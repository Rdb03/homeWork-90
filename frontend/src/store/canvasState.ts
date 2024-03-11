import { makeAutoObservable } from "mobx";

class CanvasState {
    canvas: HTMLCanvasElement | null = null;
    undoList: string[] = [];
    redoList: string[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setCanvas(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    pushToUndo(data: string) {
        this.undoList.push(data);
    }

    pushToRedo(data: string) {
        this.redoList.push(data);
    }

    private applyAction(list: string[], oppositeList: string[]) {
        let ctx = this.canvas?.getContext('2d');
        if (list.length > 0) {
            let dataUrl = list.pop();
            if (dataUrl) {
                oppositeList.push(this.canvas?.toDataURL() || "");
                let img: HTMLImageElement = new Image();
                img.src = dataUrl;
                img.onload = () => {
                    ctx?.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
                    ctx?.drawImage(img, 0, 0, this.canvas!.width, this.canvas!.height);
                };
            }
        } else {
            ctx?.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
        }
    }

    undo() {
        this.applyAction(this.undoList, this.redoList);
    }

    redo() {
        this.applyAction(this.redoList, this.undoList);
    }
}

export default new CanvasState();
