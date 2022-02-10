import p5 from "p5";

export class StartPoint {
    private x: number;
    private y: number;
    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    draw(p: p5) {
        p.push();
        p.translate(this.x, this.y);

        p.fill(255, 255, 0);
        p.stroke(255);
        p.strokeWeight(4);

        p.beginShape();
        p.vertex(-15, -30);
        p.vertex(15, -30);
        p.vertex(30, 0);
        p.vertex(15, 30);
        p.vertex(-15, 30);
        p.vertex(-15, -30);
        p.endShape();

        p.pop();
    }
}