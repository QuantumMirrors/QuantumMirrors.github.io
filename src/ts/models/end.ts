import p5 from "p5";

export class EndPoint {
    private x: number;
    private y: number;
    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    draw(p: p5) {
        p.push();
        p.translate(this.x, this.y);

        p.fill(0, 255, 0);
        p.stroke(255);
        p.strokeWeight(4);

        p.beginShape();
        p.vertex(-15, -30);
        p.vertex(15, -30);
        p.vertex(15, 30);
        p.vertex(-15, 30);
        p.endShape();

        p.arc(-15, 0, 45, 60, 90, 270);

        p.pop();
    }
}