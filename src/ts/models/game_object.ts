import p5 from "p5";

export class GameObject {
    constructor() {

    }

    draw(p: p5){
        p.push();

        p.circle(0, 0, 5);

        p.pop();
    }
}