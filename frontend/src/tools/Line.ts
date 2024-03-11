import Tool from "./Tool";

export default class Line extends Tool {
    private currentX: number | undefined;
    private currentY: number | undefined;
    private mouseDown: boolean | undefined;
    private saved!: string;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.listen();
    }

    listen() {
        this.canvas.onmousemove = (e: MouseEvent) => this.mouseMoveHandler(e);
        this.canvas.onmousedown = (e: MouseEvent) => this.mouseDownHandler(e);
        this.canvas.onmouseup = (e: MouseEvent) => this.mouseUpHandler(e);
    }

    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true;
        const target = e.target as HTMLElement;
        this.currentX = e.pageX - target.offsetLeft;
        this.currentY = e.pageY - target.offsetTop;
        this.ctx.beginPath();
        this.ctx.moveTo(this.currentX, this.currentY);
        this.saved = this.canvas.toDataURL();
    }

    mouseUpHandler(_e: MouseEvent) {
        this.mouseDown = false;
    }

    mouseMoveHandler(e: MouseEvent) {
        if (this.mouseDown) {
            const target = e.target as HTMLElement;
            this.draw(e.pageX - target.offsetLeft, e.pageY - target.offsetTop);
        }
    }

    draw(x: number, y: number) {
        const img = new Image();
        img.src = this.saved;
        img.onload = async () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            if (typeof this.currentX === "number" && typeof this.currentY === "number") {
                this.ctx.moveTo(this.currentX, this.currentY);
            }
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        };
    }
}
