import p5 from "p5";
import { Direction, GameObject, getRotation } from "./game_object";

export class EndPoint extends GameObject {
  private counter: { [index: number]: number };
  private index: number;
  private percentage = 0;

  constructor(dir = Direction.Right) {
    super(dir);
  }

  draw(p: p5) {
    p.push();

    p.fill(0, 255, 0);
    p.stroke(255);
    p.strokeWeight(4 * this.scale);

    p.rotate(getRotation(this.direction));

    const valOne = 15 * this.scale;
    const valTwo = 30 * this.scale;

    p.beginShape();
    p.vertex(-valOne, -valTwo);
    p.vertex(valOne, -valTwo);
    p.vertex(valOne, valTwo);
    p.vertex(-valOne, valTwo);
    p.endShape();

    p.arc(-valOne, 0, 45 * this.scale, 60 * this.scale, 90, 270);

    //percentage ring
    p.strokeWeight(6 * this.scale);
    p.noFill();
    p.stroke(255);
    p.arc(0, 0, 100 * this.scale, 100 * this.scale, 0, 360 * this.percentage);

    p.pop();

    if (this.counter[this.index]) {
      this.calcNewPercentage();
    }
  }

  setCounter(counter: { [index: number]: number }, index: number) {
    this.counter = counter;
    this.index = index;
  }

  addToCounter() {
    if (this.counter[this.index]) {
      this.counter[this.index]++;
    } else {
      this.counter[this.index] = 1;
    }
  }

  private calcNewPercentage() {
    const sum = Object.values(this.counter).reduce((prev, cur) => prev + cur);
    this.percentage = this.counter[this.index] / sum;
  }

  getDirections(): Direction[] {
    return [];
  }
}
