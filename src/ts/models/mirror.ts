import p5 from "p5";
import { GameObject } from "./game_object";

export abstract class Mirror extends GameObject{
    private width = 100;
    private height = 10;
    private direction = -1; // -1 (bottom-left to top-right) or 1 (top-left to bottom-right)
    
    private r: number;
    private g: number;
    private b: number;

    private x: number;
    private y: number;


    constructor(x:number, y:number, r: number, g: number, b: number){
        super();
        this.r = r;
        this.g = g;
        this.b = b;

        this.x = x;
        this.y = y;
    }

    draw(p: p5) {
        p.push();
        p.translate(this.x, this.y);

        p.rotate(45 * this.direction);
        p.fill(this.r, this.g, this.b);
        p.rect(0, 0, this.width, this.height);

        p.pop();
    }
}