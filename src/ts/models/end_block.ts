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
    p.strokeWeight(4);

    p.rotate(getRotation(this.direction));

    p.beginShape();
    p.vertex(-15, -30);
    p.vertex(15, -30);
    p.vertex(15, 30);
    p.vertex(-15, 30);
    p.endShape();

    p.arc(-15, 0, 45, 60, 90, 270);

    //percentage ring
    p.strokeWeight(6);
    p.noFill();
    p.stroke(255);
    p.arc(0, 0, 100, 100, 0, 360 * this.percentage);

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
