import p5 from "p5";
import { Direction } from "./game_object";

export class NewParticle {
    private size = 30;
    private phase_shifted = false;
    private superposition = false;
    private spin = 0;

    private x: number;
    private y: number;
    private direction: Direction;

    constructor(x: number, y: number, dir: Direction = Direction.Right) {
        this.x = x;
        this.y = y;
        this.direction = dir;
    }

    draw(p: p5) {
        p.push();
        p.translate(this.x, this.y);

        p.noFill();
        p.strokeWeight(2);

        const x = this.size;
        const y = this.phase_shifted ? this.size : -this.size;

        if (this.phase_shifted) {
            p.stroke(0, 0, 255);
        } else {
            p.stroke(255, 0, 0);
        }

        p.bezier(-x, 0, 0, y * -2, 0, y * 2, x, 0);


        if (this.superposition) {
            this.spin += 360 / 60;
            p.stroke(255, 0, 0);
            p.arc(0, 0, this.size * 2, this.size * 2, 0 + this.spin, 90 + this.spin);
            p.arc(0, 0, x * 2, y * 2, 180 + this.spin, 270 + this.spin);
            p.stroke(0, 0, 255);
            p.arc(0, 0, x * 2, y * 2, 90 + this.spin, 180 + this.spin);
            p.arc(0, 0, x * 2, y * 2, 270 + this.spin, 0 + this.spin);
            if (this.spin >= 360) {
                this.spin = 0;
            }
        } else {
            p.stroke(255, 255, 0);
            p.circle(0, 0, this.size * 2);
        }

        p.pop();
    }

    move() {
        switch (this.direction) {
            case Direction.Up: this.y--; break;
            case Direction.Left: this.x--; break;
            case Direction.Down: this.y++; break;
            case Direction.Right: this.x++; break;
        }
    }

    setSuperposition(bool: boolean) {
        this.superposition = bool;
    }

    setPhase(bool: boolean){
        this.phase_shifted = bool;
    }

    getPhase(): boolean{
        return this.phase_shifted;
    }

    shiftPhase() {
        this.phase_shifted = !this.phase_shifted;
    }

    checkFlipped(): boolean {
        return this.phase_shifted;
    }

    //true if out of bounds, false if inside grid
    checkOutOfBounds(p: p5): boolean {
        return this.x < -this.size || this.x > p.width + this.size || this.y < -this.size || this.y > p.height + this.size;
    }

    setDirection(dir: Direction){
        this.direction = dir;
    }

    getDirection(): Direction{
        return this.direction;
    }

    getXY(): [number, number] {
        return [this.x, this.y];
    }
}