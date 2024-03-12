import Tool from "./Tool";

export default class Rect extends Tool {
    private mouseDown: boolean | undefined;
    private saved!:  string;
    private startX: number | undefined;
    private startY: number | undefined;
    private width: any;
    private height: any;


    constructor(canvas: HTMLCanvasElement, socket: any, id: any) {
        super(canvas, socket, id);
        this.listen();
    }

    listen() {
        this.canvas.onmousemove = (e: MouseEvent) => this.mouseMoveHandler(e);
        this.canvas.onmousedown = (e: MouseEvent) => this.mouseDownHandler(e);
        this.canvas.onmouseup = (e: MouseEvent) => this.mouseUpHandler(e);
    }

    mouseUpHandler(_e: MouseEvent) {
        this.mouseDown = false;
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'rect',
                x: this.startX,
                y: this.startY,
                width: this.width,
                height: this.height,
            }
        }))
    }

    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true;
        this.ctx.beginPath();
        const target = e.target as HTMLElement;
        this.startX = e.pageX - target.offsetLeft;
        this.startY = e.pageY - target.offsetTop;
        this.saved = this.canvas.toDataURL();
    }

    mouseMoveHandler(e: MouseEvent) {
        if (this.mouseDown && this.startX !== undefined && this.startY !== undefined) {
            const target = e.target as HTMLElement;
            const currentX = e.pageX - target.offsetLeft;
            const currentY = e.pageY - target.offsetTop;
            this.width = currentX - this.startX;
            this.height = currentY - this.startY;
            this.draw(this.startX, this.startY, this.width, this.height);
        }
    }

    draw(x: number, y: number, w: number, n: number) {

        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0, 0 , this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.rect(x, y, w, n)
            this.ctx.fill()
            this.ctx.stroke()
        }
    }

    static staticDraw(ctx: any, x: number, y: number, w: number, h: number, color:any) {
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.rect(x, y, w, h)
        ctx.fill()
        ctx.stroke()
    }
}
