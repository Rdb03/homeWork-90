export default class Tool {
    canvas: any;
    ctx: CanvasRenderingContext2D;
    socket: any;
    id: any;

    constructor(canvas: HTMLCanvasElement, socket: any, id: any) {
        this.canvas = canvas;
        this.socket = socket;
        this.id = id;
        this.ctx = canvas.getContext('2d')!;
        this.destroyEvents();
    }

    set fillColor(color: string | CanvasGradient | CanvasPattern) {
        this.ctx.fillStyle = color
    }
    set strokeColor(color: string | CanvasGradient | CanvasPattern) {
        this.ctx.strokeStyle = color
    }

    set lineWidth(width: number) {
        this.ctx.lineWidth = width
    }

    destroyEvents() {
        this.canvas.onmousemove = null
        this.canvas.onmousedown =  null
        this.canvas.onmouseup =  null
    }
}

