import Tool from "./Tool";

export default class Brush extends Tool {
    private mouseDown: boolean | undefined;

    constructor(canvas: HTMLCanvasElement, socket: any, id: any) {
        super(canvas, socket, id);
        this.listen();
    }

    listen() {
        this.canvas.addEventListener('mousemove', (e: MouseEvent) => this.mouseMoveHandler(e));
        this.canvas.addEventListener('mousedown', (e: MouseEvent) => this.mouseDownHandler(e));
        this.canvas.addEventListener('mouseup', (e: MouseEvent) => this.mouseUpHandler(e));
    }

    mouseUpHandler(_e: MouseEvent) {
        this.mouseDown = false
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'finish',
            }
        }))
    }

    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true;
        const target = e.target as HTMLElement;
        this.ctx.beginPath();
        this.ctx.moveTo(e.pageX - target.offsetLeft, e.pageY - target.offsetTop);
    }

    mouseMoveHandler(e: MouseEvent) {
        if (this.mouseDown && this.socket) {
            const target = e.target as HTMLElement;
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'brush',
                    x: e.pageX - target.offsetLeft,
                    y: e.pageY - target.offsetTop
                }
            }))
        }
    }

    static draw(ctx: any, x: number, y: number) {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

