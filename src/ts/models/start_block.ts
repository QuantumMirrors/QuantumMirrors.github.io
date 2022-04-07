import p5 from "p5";
import { Direction, GameObject, getRotation } from "./game_object";

export class StartPoint extends GameObject {
  private hidden = false;

  addWithSuperposition = false;
  constructor(dir = Direction.Right, hidden = false, addWithSuperposition = false) {
    super(dir);

    this.hidden = hidden;
    this.addWithSuperposition = addWithSuperposition;
  }

  draw(p: p5) {
    if(this.hidden){
      return;
    }

    p.push();

    p.fill(255, 255, 0);
    p.stroke(255);
    p.strokeWeight(4 * this.scale);

    p.rotate(getRotation(this.direction));

    const valOne = 15 * this.scale;
    const valTwo = 30 * this.scale;

    p.beginShape();
    p.vertex(-valOne, -valTwo);
    p.vertex(valOne, -valTwo);
    p.vertex(valTwo, 0);
    p.vertex(valOne, valTwo);
    p.vertex(-valOne, valTwo);
    p.vertex(-valOne, -valTwo);
    p.endShape();

    p.pop();
  }

  getDirections(): Direction[] {
    return [this.direction];
  }
}
