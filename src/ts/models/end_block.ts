import p5 from "p5";
import { Direction, GameObject, getRotation } from "./game_object";

export class EndPoint extends GameObject {
  constructor(dir = Direction.Right) {
    super(dir);
  }

  draw(p: p5) {
    p.push();

    p.fill(0, 255, 0);
    p.stroke(255);
    p.strokeWeight(4);

    p.rotate(getRotation(this.direction));

    p.beginShape();
    p.vertex(-15, -30);
    p.vertex(15, -30);
    p.vertex(15, 30);
    p.vertex(-15, 30);
    p.endShape();

    p.arc(-15, 0, 45, 60, 90, 270);

    p.pop();
  }

  getDirections(): Direction[] {
    return [];
  }
}
