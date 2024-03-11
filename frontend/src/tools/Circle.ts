import Tool from "./Tool";

export default class Circle extends Tool {
    private mouseDown: boolean | undefined;
    private saved!:  string;
    private startX: number | undefined;
    private startY: number | undefined;


    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = (e: MouseEvent) => this.mouseMoveHandler(e);
        this.canvas.onmousedown = (e: MouseEvent) => this.mouseDownHandler(e);
        this.canvas.onmouseup = (e: MouseEvent) => this.mouseUpHandler(e);
    }

    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true
        let canvasData = this.canvas.toDataURL()
        this.ctx.beginPath()
        const target = e.target as HTMLElement;
        this.startX = e.pageX - target.offsetLeft;
        this.startY = e.pageY - target.offsetTop;
        this.saved = canvasData
    }

    mouseUpHandler(_e: MouseEvent) {
        this.mouseDown = false
    }

    mouseMoveHandler(e: MouseEvent) {
        if(this.mouseDown && this.startX !== undefined && this.startY !== undefined) {
            const target = e.target as HTMLElement;
            let currentX =  e.pageX- target.offsetLeft
            let currentY =  e.pageY- target.offsetTop
            let width = currentX-this.startX
            let height = currentY-this.startY
            let r = Math.sqrt(width**2 + height**2)
            this.draw(this.startX, this.startY, r)
        }
    }

    draw(x: number,y: number,r: number) {
        const img = new Image()
        img.src = this.saved
        img.onload = async () => {
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.arc(x, y, r, 0, 2*Math.PI)
            this.ctx.fill()
            this.ctx.stroke()
        };Circle.bind(this)
    }
}
