import p5 from "p5";
import { Direction, GameObject, getRotation } from "./game_object";

export abstract class Mirror extends GameObject{
    private width = 100;
    private height = 10;
    
    private r: number;
    private g: number;
    private b: number;

    constructor(r: number, g: number, b: number, dir = Direction.Right){
        super(dir);
        this.r = r;
        this.g = g;
        this.b = b;
    }

    draw(p: p5) {
        p.push();

        p.rotate(getRotation(this.direction) - 45);
        p.fill(this.r, this.g, this.b);
        p.rect(0, 0, this.width, this.height);

        p.pop();
    }
}