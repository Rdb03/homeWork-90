import Tool from "./Tool";

export default class Brush extends Tool {
    private mouseDown: boolean | undefined;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.listen();
    }

    listen() {
        this.canvas.onmousemove = (e: MouseEvent) => this.mouseMoveHandler(e);
        this.canvas.onmousedown = (e: MouseEvent) => this.mouseDownHandler(e);
        this.canvas.onmouseup = (e: MouseEvent) => this.mouseUpHandler(e);
    }

    mouseUpHandler(_e: MouseEvent) {
        this.mouseDown = false;
    }

    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true;
        const target = e.target as HTMLElement;
        this.ctx.beginPath();
        this.ctx.moveTo(e.pageX - target.offsetLeft, e.pageY - target.offsetTop);
    }

    mouseMoveHandler(e: MouseEvent) {
        if (this.mouseDown) {
            const target = e.target as HTMLElement;
            this.draw(e.pageX - target.offsetLeft, e.pageY - target.offsetTop);
        }
    }

    draw(x: number, y: number) {
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    }
}
