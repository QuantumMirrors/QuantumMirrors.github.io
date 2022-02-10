import p5 from "p5";

export class Particle {
    private x: number;
    private y: number;

    private horizontalMove = true;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    draw(p: p5) {
        p.push();
        p.translate(this.x, this.y);

        p.noFill();
        p.strokeWeight(2);
        p.stroke(255, 255, 0);
        p.circle(0, 0, 60);

        p.pop();
    }

    move() {
        if(this.horizontalMove){
            this.x++;
        } else {
            this.y--;
        }
    }

    setHorizontal(bool: boolean){
        this.horizontalMove = bool;
    }

    checkObstacle(x:number, y: number): boolean{
        return this.x == x && this.y == y;
    }
}